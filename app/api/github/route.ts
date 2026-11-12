import { NextResponse } from "next/server";

type Repo = { name: string; description: string | null; url: string; stars: number; language: string | null; updatedAt: string };
type Day = { date: string; count: number };

const calendarQuery = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

async function loadCalendar(username: string, token: string, fresh: boolean): Promise<Day[] | null> {
  let response: Response;
  try {
    response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: calendarQuery, variables: { login: username } }),
      ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 3600 } })
    });
  } catch {
    return null;
  }
  if (!response.ok) return null;
  const payload = await response.json();
  const weeks = payload?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) return null;
  return weeks.flatMap((week: { contributionDays?: { date: string; contributionCount: number }[] }) =>
    (week.contributionDays ?? []).map(day => ({ date: day.date, count: day.contributionCount }))
  );
}

export async function GET(request: Request) {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return NextResponse.json({ connected: false, message: "Set GITHUB_USERNAME to enable GitHub data." });

  const fresh = new URL(request.url).searchParams.get("fresh") === "1";
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let response: Response;
  try {
    response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
      headers,
      ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 3600 } })
    });
  } catch {
    return NextResponse.json({ connected: false, message: "GitHub API request failed." }, { status: 502 });
  }
  if (!response.ok) return NextResponse.json({ connected: false, message: "GitHub API request failed." }, { status: 502 });

  const repos = await response.json();
  if (!Array.isArray(repos)) return NextResponse.json({ connected: false, message: "GitHub API request failed." }, { status: 502 });

  const repositories: Repo[] = repos.map((repo: { name: string; description: string | null; html_url: string; stargazers_count: number; language: string | null; updated_at: string }) => ({
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    updatedAt: repo.updated_at
  }));

  const calendar = process.env.GITHUB_TOKEN ? await loadCalendar(username, process.env.GITHUB_TOKEN, fresh) : null;
  return NextResponse.json({ connected: true, username, repositories, calendar });
}
