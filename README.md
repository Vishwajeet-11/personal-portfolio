# Vishwajeet Bharadia — Developer Portfolio

A Next.js App Router + TypeScript portfolio starter, visually inspired by the supplied reference site.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Before publishing

1. Set `GITHUB_USERNAME` in `.env.local`. Add `GITHUB_TOKEN` for authenticated GitHub API access and higher rate limits.
2. Add the correct GitHub profile URL in `data/profile.ts`.
3. Verify project descriptions, ownership/attribution, technologies, and public links in `data/projects.ts`. Professional work is intentionally not presented as open-source work.
4. Replace planned blog drafts in `data/blog.ts` with real articles. The blog page labels them as planned drafts so it does not imply published writing.
5. Add a real resume URL and booking link if desired.
6. Add screenshots, architecture diagrams, and case-study evidence for projects where disclosure is permitted.
7. Review all claims before deployment.

## Routes

- `/` — portfolio home
- `/projects` — filterable project index and case studies
- `/blogs` — writing index
- `/ai` — machine-readable profile
- `/api/github` — public repository metadata endpoint
- `/sitemap.xml` and `/robots.txt`

## GitHub integration note

The included API route fetches public repository metadata. The contribution heatmap is a visual placeholder until a GitHub account and a contribution-data source are configured. GitHub's contribution calendar requires GraphQL authentication; do not expose a token in client-side code.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide icons

## Design

Dark editorial layout, muted green accent, compact navigation, large typographic hero, grouped technology cards, contribution activity panel, project explorer, writing index, and contact CTA. It is a clean implementation based on observable public behavior—not copied source code or assets.
