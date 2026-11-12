import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { articles } from "@/data/blog";

export const metadata: Metadata = { title: "Blogs", description: "Technical notes and engineering learnings by Vishwajeet Bharadia." };

export default function BlogsPage() {
  return (
    <div className="pb-10">
      <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">Blogs</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">{articles.length} planned notes on backend engineering, payments, and infrastructure. These are drafts, not published essays.</p>
      <div className="mt-8">
        <BlogList />
      </div>
    </div>
  );
}
