import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-800 pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">{profile.name}</p>
          <p className="mt-1 text-xs text-neutral-500">Software engineer building reliable backend systems.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-xs text-neutral-400">
          <Link href="/experience" className="hover:text-white">Experience</Link>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/ai" className="hover:text-white">AI profile</Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
        </nav>
      </div>
      <p className="mt-6 text-[11px] text-neutral-600">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}
