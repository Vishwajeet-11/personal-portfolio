"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, Calendar, Clock, Flame, Github, RefreshCw } from "lucide-react";

type Day = { date: string; count: number };
type Repo = { name: string; stars: number; language: string | null; updatedAt: string; url: string };
type Payload = { connected: boolean; message?: string; username?: string; repositories?: Repo[]; calendar?: Day[] | null };
type MonthBucket = { key: string; label: string; count: number };
type Focus =
  | { type: "level"; level: number }
  | { type: "month"; key: string }
  | { type: "weekday"; index: number }
  | null;

const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekdayLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const shades = ["#161b22", "#0e4429", "#006d32", "#26a641", "#3ddc84"];

function utcDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`);
}

function levelIndex(count: number) {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function monthKey(iso: string) {
  return iso.slice(0, 7);
}

function monthShort(iso: string) {
  return utcDate(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
}

function formatDay(iso: string) {
  return utcDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function formatBest(iso: string) {
  return utcDate(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function formatRange(start: string, end: string) {
  if (!start) return "";
  if (start === end) return formatDay(start);
  const sameYear = utcDate(start).getUTCFullYear() === utcDate(end).getUTCFullYear();
  const right = utcDate(end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
    ...(sameYear ? {} : { year: "numeric" })
  });
  return `${formatDay(start)} – ${right}`;
}

function summarize(days: Day[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0;
  let longestStart = "";
  let longestEnd = "";
  let run = 0;
  let runStart = "";
  for (const day of sorted) {
    if (day.count > 0) {
      if (run === 0) runStart = day.date;
      run += 1;
      if (run > longest) {
        longest = run;
        longestStart = runStart;
        longestEnd = day.date;
      }
    } else {
      run = 0;
    }
  }

  let current = 0;
  let currentStart = "";
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    if (sorted[i].count > 0) {
      current += 1;
      currentStart = sorted[i].date;
    } else if (i === sorted.length - 1) continue;
    else break;
  }

  const best = sorted.reduce((top, day) => (day.count > top.count ? day : top), sorted[0]);
  const byWeekday = Array.from({ length: 7 }, () => 0);
  const byMonth: MonthBucket[] = [];
  for (const day of sorted) {
    const date = utcDate(day.date);
    byWeekday[date.getUTCDay()] += day.count;
    const key = monthKey(day.date);
    const bucket = byMonth.find(item => item.key === key);
    if (bucket) bucket.count += day.count;
    else byMonth.push({ key, label: monthShort(day.date), count: day.count });
  }

  return {
    total: sorted.reduce((sum, day) => sum + day.count, 0),
    activeDays: sorted.filter(day => day.count > 0).length,
    longest,
    longestStart,
    longestEnd,
    current,
    currentStart,
    best,
    byWeekday,
    byMonth
  };
}

function weeksOf(days: Day[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const weeks: Day[][] = [];
  let week: Day[] = [];
  for (const day of sorted) {
    if (utcDate(day.date).getUTCDay() === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  }
  if (week.length) weeks.push(week);
  return weeks;
}

function monthMarks(weeks: Day[][]) {
  const marks: { index: number; label: string; key: string; synthetic?: boolean }[] = [];
  weeks.forEach((week, index) => {
    const firstOfMonth = week.find(day => Number(day.date.slice(8, 10)) === 1);
    const anchor = firstOfMonth ?? (index === 0 ? week[0] : undefined);
    if (!anchor) return;
    marks.push({
      index,
      label: monthShort(anchor.date),
      key: monthKey(anchor.date),
      synthetic: !firstOfMonth
    });
  });
  return marks.filter((mark, index) => {
    if (!mark.synthetic) return true;
    const next = marks[index + 1];
    return !next || next.index - mark.index >= 3;
  });
}

function dayMatches(day: Day, focus: Focus) {
  if (!focus) return true;
  if (focus.type === "level") return levelIndex(day.count) === focus.level;
  if (focus.type === "month") return monthKey(day.date) === focus.key;
  return utcDate(day.date).getUTCDay() === focus.index;
}

export function GitHubActivity() {
  const [data, setData] = useState<Payload | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [focus, setFocus] = useState<Focus>(null);
  const [tip, setTip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then(res => res.json())
      .then(json => { if (active) setData(json); })
      .catch(() => { if (active) setData({ connected: false, message: "GitHub data could not be loaded." }); });
    return () => { active = false; };
  }, []);

  async function refresh() {
    setRefreshing(true);
    try {
      const json = await fetch("/api/github?fresh=1", { cache: "no-store" }).then(res => res.json());
      setData(json);
    } catch {
      setData({ connected: false, message: "GitHub data could not be loaded." });
    } finally {
      setRefreshing(false);
    }
  }

  const calendar = data?.calendar ?? [];
  const stats = useMemo(() => (calendar.length ? summarize(calendar) : null), [calendar]);
  const weeks = useMemo(() => weeksOf(calendar), [calendar]);
  const marks = useMemo(() => monthMarks(weeks), [weeks]);
  const peakWeekday = stats ? stats.byWeekday.indexOf(Math.max(...stats.byWeekday)) : 0;
  const peakMonth = stats?.byMonth.reduce((best, item) => (item.count > best.count ? item : best), stats.byMonth[0]);

  function showTip(event: React.MouseEvent<HTMLButtonElement>, day: Day) {
    const card = graphRef.current?.getBoundingClientRect();
    const cell = event.currentTarget.getBoundingClientRect();
    if (!card) return;
    setTip({
      x: cell.left - card.left + cell.width / 2,
      y: cell.top - card.top,
      date: day.date,
      count: day.count
    });
  }

  const hoveredWeekday = focus?.type === "weekday" ? focus.index : null;
  const hoveredMonth = focus?.type === "month" ? focus.key : null;
  const weekdayIndex = hoveredWeekday ?? peakWeekday;
  const weekdayCaption = stats
    ? `${weekdayLong[weekdayIndex]} · ${stats.byWeekday[weekdayIndex].toLocaleString()}${weekdayIndex === peakWeekday ? " · peak" : ""}`
    : "";
  const activeMonth = (hoveredMonth && stats?.byMonth.find(item => item.key === hoveredMonth)) || peakMonth;
  const monthCaption = activeMonth
    ? `${activeMonth.label} · ${activeMonth.count.toLocaleString()}${activeMonth.key === peakMonth?.key ? " · peak" : ""}`
    : "";

  const cards = [
    { label: "Contributions", icon: Activity, value: stats ? stats.total.toLocaleString() : "—", note: stats ? `${stats.activeDays.toLocaleString()} active days` : "waiting for GitHub" },
    { label: "Longest streak", icon: Flame, value: stats ? `${stats.longest}d` : "—", note: stats?.longestStart ? formatRange(stats.longestStart, stats.longestEnd) : "needs a token" },
    { label: "Current streak", icon: Clock, value: stats ? `${stats.current}d` : "—", note: stats ? (stats.currentStart ? `since ${formatDay(stats.currentStart)}` : "no active streak") : "set GITHUB_USERNAME" },
    { label: "Best day", icon: Calendar, value: stats?.best.count ? String(stats.best.count) : "—", note: stats?.best.date ? formatBest(stats.best.date) : "no calendar yet" }
  ];

  return (
    <section className="my-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="mb-1 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-xl font-bold text-transparent">GitHub Activity</h2>
          <p className="text-sm text-neutral-400">Hover the tiles, legend, months or bars to explore the year</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" aria-label="Refresh GitHub activity" onClick={refresh} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-neutral-600 hover:text-white">
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          </button>
          {data?.username && (
            <a href={`https://github.com/${data.username}`} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-800 px-2.5 text-xs text-neutral-300 transition hover:border-neutral-600 hover:text-white">
              <Github size={14} />
              @{data.username}
            </a>
          )}
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(card => (
          <div key={card.label} className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-500">
              <card.icon size={12} />
              {card.label}
            </div>
            <div className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-white">{card.value}</div>
            <div className="mt-1 truncate text-xs text-neutral-500">{card.note}</div>
          </div>
        ))}
      </div>

      <div ref={graphRef} className="relative rounded-lg border border-neutral-800 bg-neutral-900/50 p-4" onMouseLeave={() => { setTip(null); setFocus(current => (current?.type === "level" ? null : current)); }}>
        {weeks.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="flex min-w-[720px]">
              <div className="mr-2 grid w-7 shrink-0 grid-rows-7 gap-[3px] pt-5 text-[10px] leading-none text-neutral-500">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((label, index) => (
                  <span key={index} className="flex items-center">{label}</span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="relative mb-1 h-4">
                  {marks.map(mark => (
                    <button
                      key={`${mark.key}-${mark.index}`}
                      type="button"
                      className={`absolute top-0 whitespace-nowrap text-[10px] leading-4 ${hoveredMonth === mark.key ? "text-white" : "text-neutral-500"}`}
                      style={{ left: `${(mark.index / weeks.length) * 100}%` }}
                      onMouseEnter={() => setFocus({ type: "month", key: mark.key })}
                      onMouseLeave={() => setFocus(current => (current?.type === "month" && current.key === mark.key ? null : current))}
                    >
                      {mark.label}
                    </button>
                  ))}
                </div>
                <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
                  {weeks.map((week, index) => (
                    <div key={week[0]?.date ?? index} className="grid grid-rows-7 gap-[3px]">
                      {Array.from({ length: 7 }, (_, row) => {
                        const day = week.find(item => utcDate(item.date).getUTCDay() === row);
                        if (!day) return <span key={row} className="aspect-square w-full" />;
                        const dimmed = !dayMatches(day, focus);
                        return (
                          <button
                            key={day.date}
                            type="button"
                            aria-label={`${formatBest(day.date)}, ${day.count} contributions`}
                            className={`aspect-square w-full rounded-[2px] transition-opacity ${dimmed ? "opacity-25" : "opacity-100"}`}
                            style={{ backgroundColor: shades[levelIndex(day.count)] }}
                            onMouseEnter={event => showTip(event, day)}
                            onMouseLeave={() => setTip(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">{data === null ? "Loading GitHub activity…" : data.message ?? "Add GITHUB_TOKEN in .env to load the contribution calendar."}</p>
        )}
        <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
          <span>{stats ? `${stats.total.toLocaleString()} contributions in the last year` : "Contribution colors need GITHUB_TOKEN"}</span>
          <span className="flex items-center gap-1">
            Less
            {shades.map((color, level) => (
              <button
                key={color}
                type="button"
                aria-label={`Highlight contribution level ${level}`}
                className={`h-2.5 w-2.5 rounded-[2px] ${focus?.type === "level" && focus.level === level ? "ring-1 ring-white" : ""}`}
                style={{ backgroundColor: color }}
                onMouseEnter={() => setFocus({ type: "level", level })}
                onMouseLeave={() => setFocus(current => (current?.type === "level" ? null : current))}
              />
            ))}
            More
          </span>
        </div>
        {tip && (
          <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md border border-neutral-700 bg-neutral-950 px-2.5 py-1.5 text-xs shadow-lg" style={{ left: tip.x, top: tip.y }}>
            <div className="whitespace-nowrap text-white">{formatBest(tip.date)}</div>
            <div className="whitespace-nowrap text-neutral-400">{tip.count.toLocaleString()} {tip.count === 1 ? "contribution" : "contributions"}</div>
          </div>
        )}
      </div>

      {stats && (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4" onMouseLeave={() => setFocus(current => (current?.type === "weekday" ? null : current))}>
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[11px] uppercase tracking-wider text-neutral-500">By weekday</h3>
              <p className="text-xs text-neutral-300">{weekdayCaption}</p>
            </div>
            <div className="flex h-24 items-end justify-between gap-2">
              {stats.byWeekday.map((count, index) => {
                const selected = hoveredWeekday === index;
                const dimmed = hoveredWeekday !== null && !selected;
                const height = count === 0 ? 0 : Math.max(4, (count / Math.max(...stats.byWeekday, 1)) * 100);
                return (
                  <button key={weekdayShort[index]} type="button" className="flex h-full min-w-0 flex-1 flex-col items-center justify-end" onMouseEnter={() => setFocus({ type: "weekday", index })}>
                    <span className={`block w-3.5 rounded-t-[3px] bg-[#3ddc84] transition-opacity sm:w-5 ${dimmed ? "opacity-30" : "opacity-100"}`} style={{ height: `${height}%` }} />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between gap-2">
              {weekdayShort.map((label, index) => (
                <span key={label} className={`flex-1 text-center text-[11px] ${hoveredWeekday === index ? "text-white" : "text-neutral-500"}`}>{label}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4" onMouseLeave={() => setFocus(current => (current?.type === "month" ? null : current))}>
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[11px] uppercase tracking-wider text-neutral-500">By month</h3>
              <p className="text-xs text-neutral-300">{monthCaption}</p>
            </div>
            <div className="flex h-24 items-end justify-between gap-1.5">
              {stats.byMonth.map(item => {
                const selected = hoveredMonth === item.key;
                const dimmed = hoveredMonth !== null && !selected;
                const height = item.count === 0 ? 0 : Math.max(4, (item.count / Math.max(peakMonth?.count ?? 1, 1)) * 100);
                return (
                  <button key={item.key} type="button" aria-label={`${item.label}, ${item.count} contributions`} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end" onMouseEnter={() => setFocus({ type: "month", key: item.key })}>
                    <span className="flex w-full flex-1 items-end justify-center">
                      <span className={`block w-2.5 rounded-t-[3px] bg-[#3ddc84] transition-opacity sm:w-3.5 ${dimmed ? "opacity-30" : "opacity-100"}`} style={{ height: `${height}%` }} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
