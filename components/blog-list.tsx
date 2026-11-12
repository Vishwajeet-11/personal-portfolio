import Link from "next/link";
import { articles } from "@/data/blog";

export function BlogList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? articles.slice(0, limit) : articles;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map(article => (
        <Link key={article.slug} href="/blogs" className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 transition-all hover:-translate-y-0.5 hover:border-neutral-600">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-md border border-neutral-800 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-400">{tag}</span>)}
          </div>
          <h3 className="text-lg font-semibold leading-snug text-white">{article.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">{article.excerpt}</p>
          <p className="mt-4 text-xs text-neutral-500">{article.date} · {article.readTime} read · Planned draft</p>
        </Link>
      ))}
    </div>
  );
}
