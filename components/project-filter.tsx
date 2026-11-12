"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export function ProjectFilter({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => active === "All" ? projects : projects.filter(project => project.category === active), [active]);
  const featured = projects.filter(project => project.featured).length;
  const kinds = new Set(projects.map(project => project.kind)).size;

  return (
    <section className="my-16">
      {heading && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-1 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-xl font-bold text-transparent">Projects</h2>
            <p className="text-sm text-neutral-400">Click a topic to filter. Open a card for the write-up.</p>
          </div>
          <Link href="/projects" className="inline-flex h-8 shrink-0 items-center rounded-lg border border-neutral-800 px-3 text-xs text-neutral-300 hover:border-neutral-600 hover:text-white">View all</Link>
        </div>
      )}
      <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Projects", String(projects.length).padStart(2, "0"), "case studies on this site"],
          ["Featured", String(featured).padStart(2, "0"), "selected for the home page"],
          ["Topics", String(categories.length - 1).padStart(2, "0"), "problem areas"],
          ["Kinds", String(kinds).padStart(2, "0"), "professional and engineering work"]
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-left">
            <div className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</div>
            <div className="mt-2 text-2xl font-semibold tabular-nums text-white">{value}</div>
            <div className="mt-0.5 truncate text-xs text-neutral-500">{note}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 sm:p-5">
        <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {categories.map(category => (
            <button key={category} type="button" onClick={() => setActive(category)} className={`inline-flex h-8 shrink-0 items-center rounded-lg border px-2.5 text-xs transition-colors ${active === category ? "border-mint/40 bg-mint/10 text-mint" : "border-neutral-800 text-neutral-400 hover:text-white"}`}>
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </section>
  );
}
