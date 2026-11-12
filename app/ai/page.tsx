import { profile, stack } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";

export const metadata = { title: "AI profile" };

export default function AIPage() {
  return (
    <div className="pb-10">
      <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">AI profile</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">A structured overview for assistants that need my background, stack, and selected work.</p>
      <div className="mt-8 space-y-6 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 text-sm leading-relaxed text-neutral-300">
        <section>
          <h2 className="text-base font-medium text-white">Profile</h2>
          <p className="mt-2">{profile.name} is a {profile.role.toLowerCase()} based in {profile.location}, with {profile.experience} of professional experience. {profile.intro}</p>
        </section>
        <section>
          <h2 className="text-base font-medium text-white">Focus</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">{profile.focus.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h2 className="text-base font-medium text-white">Technology</h2>
          {stack.map(group => <p key={group.title} className="mt-2"><span className="text-white">{group.title}:</span> {group.items.join(", ")}</p>)}
        </section>
        <section>
          <h2 className="text-base font-medium text-white">Experience</h2>
          {experiences.map(item => (
            <div key={item.slug} className="mt-3 border-t border-neutral-800 pt-3">
              <h3 className="text-white">{item.company} — {item.role}</h3>
              <p className="text-xs text-neutral-400">{item.period} · {item.location}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {item.highlights.map(point => (
                  <li key={point}>{point.replace(/\*\*/g, "")}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-base font-medium text-white">Projects</h2>
          {projects.map(project => (
            <div key={project.slug} className="mt-3 border-t border-neutral-800 pt-3">
              <h3 className="text-white">{project.name}</h3>
              <p className="mt-1">{project.summary}</p>
              <p className="mt-1 text-xs text-mint">{project.technologies.join(" · ")}</p>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-base font-medium text-white">Contact</h2>
          <p className="mt-2">Email: {profile.email}<br />Website: {profile.website}<br />LinkedIn: {profile.linkedin}</p>
        </section>
      </div>
    </div>
  );
}
