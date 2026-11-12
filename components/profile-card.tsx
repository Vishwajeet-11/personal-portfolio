"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, FileText, Linkedin, Mail, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: profile.upwork, label: "Upwork", icon: Briefcase },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail }
];

export function ProfileCard() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="px-0">
      <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint/[0.05] blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="relative shrink-0">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg ring-1 ring-neutral-700/60">
                <Image src="/profile.png" alt="Vishwajeet Bharadia" fill sizes="80px" priority className="object-cover object-[center_72%]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-neutral-900">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </span>
            </div>
            <div className="flex min-w-0 flex-col items-start gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-xl font-semibold text-transparent">Vishwajeet</h1>
                <span className="flex items-center gap-1 rounded-md border border-blue-500/50 bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                  Available
                </span>
              </div>
              <p className="text-sm text-neutral-300">{profile.role} <span className="text-neutral-500">·</span> <span className="text-mint">Indore</span></p>
              <div className="flex min-w-0 max-w-full items-center gap-1.5 text-sm text-neutral-400">
                <Mail size={14} className="shrink-0" />
                <a href={`mailto:${profile.email}`} className="truncate hover:text-white">{profile.email}</a>
                <button type="button" aria-label="Copy email" onClick={copyEmail} className="shrink-0 rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white">
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {socials.map(item => (
              <a key={item.label} href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={item.label} className="group relative grid h-9 w-9 place-items-center rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-all hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-800 hover:text-white">
                <item.icon size={16} />
                <span className="pointer-events-none absolute -bottom-8 left-1/2 z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[11px] text-neutral-200 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">{item.label}</span>
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noreferrer" className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-3 text-sm font-medium text-yellow-300 shadow-[0_0_18px_-6px_rgba(250,204,21,0.7)] transition-all hover:-translate-y-0.5 hover:border-yellow-400/70 hover:bg-yellow-400/20">
              <FileText size={14} />
              Resume
            </a>
          </div>
        </div>
        <div className="relative z-10 my-5 border-t border-neutral-800" />
        <div className="relative z-10 text-sm leading-relaxed text-neutral-300">
          <p>Hi, I&apos;m <span className="font-medium text-white">Vishwajeet</span>, a backend-focused software engineer from Indore, India.</p>
          <p className="mt-3">I build systems that <span className="font-medium text-white underline decoration-mint/40 decoration-1 underline-offset-4">stay reliable under load</span>, <span className="font-medium text-white underline decoration-mint/40 decoration-1 underline-offset-4">keep payment flows consistent</span>, and <span className="font-medium text-white underline decoration-mint/40 decoration-1 underline-offset-4">ship as products</span>. From APIs and distributed services to real-time media and cloud infrastructure, I turn messy workflows into software that holds up in production.</p>
          <p className="mt-3 text-neutral-400">You can reach me on <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-white transition-colors hover:text-mint">LinkedIn</a> or <a href={`mailto:${profile.email}`} className="text-white transition-colors hover:text-mint">Email</a>.</p>
        </div>
      </div>
    </section>
  );
}
