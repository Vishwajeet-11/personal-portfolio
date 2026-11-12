import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import { TechStack } from "@/components/tech-stack";
import { GitHubActivity } from "@/components/github-activity";
import { ProjectFilter } from "@/components/project-filter";
import { BlogList } from "@/components/blog-list";
import { ContactPanel } from "@/components/contact-panel";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <ProfileCard />
      <section className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-300">AI agent reading this portfolio?</p>
        <Link href="/ai" className="mt-3 inline-flex items-center justify-center rounded-md border border-mint/40 bg-mint/10 px-4 py-2 text-sm font-medium text-mint hover:bg-mint/20 sm:mt-0">Open AI profile</Link>
      </section>
      <TechStack />
      <GitHubActivity />
      <ProjectFilter />
      <section className="my-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-xl font-bold text-transparent">Recent Blogs</h2>
            <p className="mt-1 text-sm text-neutral-400">Notes I plan to publish</p>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-600 hover:text-white">View all</Link>
        </div>
        <BlogList limit={2} />
      </section>
      <ContactPanel />
    </div>
  );
}
