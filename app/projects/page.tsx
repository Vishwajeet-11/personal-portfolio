import type { Metadata } from "next";
import { ProjectFilter } from "@/components/project-filter";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects", description: "Selected software projects and engineering case studies by Vishwajeet Bharadia." };

export default function ProjectsPage() {
  return (
    <div>
      <div className="pb-2 pt-2">
        <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">Projects</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">Product engineering, backend systems, integrations, and infrastructure.</p>
      </div>
      <ProjectFilter heading={false} />
      <div className="border-t border-neutral-800">
        {projects.map((project, index) => (
          <article id={project.slug} key={project.slug} className="scroll-mt-24 border-b border-neutral-800 py-8">
            <p className="text-[11px] uppercase tracking-wider text-neutral-500">{String(index + 1).padStart(2, "0")} · {project.category} · {project.kind}</p>
            <h2 className="mt-2 text-2xl font-medium text-white">{project.name}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-400">{project.details}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map(tech => <span key={tech} className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-[11px] text-neutral-300">{tech}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
