import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience timeline of Vishwajeet Bharadia across backend engineering, microservices, payments, and real-time systems."
};

export default function ExperiencePage() {
  return (
    <div className="pb-10">
      <div className="pb-2 pt-2">
        <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
          Experience
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
          {experiences.length} engineering roles from recent to earlier — building backend services, distributed systems, payment lifecycles, and real-time media infrastructure.
        </p>
      </div>

      <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3.5">
          <p className="text-[11px] uppercase tracking-wider text-neutral-500">Roles</p>
          <p className="mt-1 font-mono text-lg font-semibold text-white">{String(experiences.length).padStart(2, "0")}</p>
          <p className="text-xs text-neutral-500">Software Engineer</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3.5">
          <p className="text-[11px] uppercase tracking-wider text-neutral-500">Timeline</p>
          <p className="mt-1 font-mono text-lg font-semibold text-white">2023 – Now</p>
          <p className="text-xs text-neutral-500">Recent to older</p>
        </div>
        <div className="col-span-2 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3.5 sm:col-span-1">
          <p className="text-[11px] uppercase tracking-wider text-neutral-500">Core Focus</p>
          <p className="mt-1 font-mono text-lg font-semibold text-mint">Backend &amp; Scale</p>
          <p className="text-xs text-neutral-500">APIs, Kafka, Payments, Media</p>
        </div>
      </div>

      <div className="mt-8">
        <ExperienceTimeline />
      </div>
    </div>
  );
}
