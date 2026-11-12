import Link from "next/link";
import type { Project } from "@/data/projects";

const tones: Record<string, string> = {
  "Real-time & Media": "#00ffd1",
  "Payments & Fintech": "#f5c16c",
  "Product Engineering": "#6ac8ff",
  "Full Stack": "#c4b5fd",
  "Distributed Systems": "#86efac"
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tone = tones[project.category] ?? "#6ac8ff";
  const points = project.details.split(/(?<=\.)\s+/).slice(0, 3);
  return (
    <Link href={`/projects#${project.slug}`} className="group block h-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all hover:-translate-y-0.5 hover:border-neutral-600">
      <div className="relative h-52 overflow-hidden border-b border-neutral-800 bg-[#0b0b0b] sm:h-56">
        <div className="flex h-full flex-col font-mono text-[11.5px] leading-relaxed" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
          <div className="flex items-center gap-1.5 border-b border-neutral-800 bg-neutral-950/70 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-2 truncate text-[10.5px] text-neutral-500">~/{project.slug}</span>
          </div>
          <div className="flex-1 space-y-1 overflow-hidden px-4 py-3">
            <p className="truncate text-neutral-300"><span className="text-mint">$</span> open {project.slug}</p>
            <p className="truncate text-neutral-300"><span className="text-mint">$</span> cat README.md</p>
            <p className="hidden pt-1 text-neutral-500 sm:block"><span className="line-clamp-2"># {project.summary}</span></p>
            {points.map(point => (
              <p key={point} className="flex gap-2 text-neutral-400"><span style={{ color: tone }}>→</span><span className="line-clamp-2">{point}</span></p>
            ))}
            <span className="inline-block h-3.5 w-[7px] translate-y-0.5 bg-mint/80 motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-500">
          <span className="inline-flex items-center gap-1.5" style={{ color: tone }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
            {project.category}
          </span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="mt-1 text-lg font-semibold leading-snug text-white">{project.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-400">{project.summary}</p>
      </div>
    </Link>
  );
}
