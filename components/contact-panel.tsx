"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { profile } from "@/data/profile";

const prompts = [
  { title: "Want to bounce an idea?", body: "Send a note and we can talk through the system, the constraints, and what to build first.", color: "#00ffd1" },
  { title: "Looking to ship a backend?", body: "APIs, payments, realtime products, and the infrastructure around them.", color: "#6ac8ff" },
  { title: "In Indore, or remote?", body: "Happy to meet locally, or work across time zones.", color: "#ff9f66" }
];

const shades = ["#1a1a1a", "rgba(229,229,229,0.18)", "rgba(229,229,229,0.42)", "rgba(229,229,229,0.8)"];
const bandNames = ["Asleep", "Early", "Around", "Working"];

type Place = {
  id: string;
  label: string;
  zone: string;
  color: string;
  flag: string;
  work: [number, number];
  around: number[];
  early: number[];
};

const indore: Place = {
  id: "indore",
  label: "Indore",
  zone: "Asia/Kolkata",
  color: "#ff9f66",
  flag: "🇮🇳",
  work: [10, 18],
  around: [8, 9, 19, 20],
  early: [7, 21, 22]
};

const utcPlace: Place = {
  id: "utc",
  label: "UTC",
  zone: "UTC",
  color: "#6ac8ff",
  flag: "🌐",
  work: [9, 16],
  around: [8, 17],
  early: [7, 18, 19]
};

function offsetMinutes(timeZone: string, date: Date) {
  const utc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const zoned = new Date(date.toLocaleString("en-US", { timeZone }));
  return Math.round((zoned.getTime() - utc.getTime()) / 60000);
}

function clock(timeZone: string, date: Date) {
  return new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(date);
}

function hourIn(timeZone: string, date: Date) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(date));
}

function hourThere(columnHour: number, visitorOffset: number, placeOffset: number) {
  const minutes = columnHour * 60 + (placeOffset - visitorOffset);
  return Math.floor((((minutes % 1440) + 1440) % 1440) / 60);
}

function band(hour: number, place: Place) {
  if (hour >= place.work[0] && hour <= place.work[1]) return 3;
  if (place.around.includes(hour)) return 2;
  if (place.early.includes(hour)) return 1;
  return 0;
}

function aheadText(deltaMinutes: number) {
  if (deltaMinutes === 0) return "You are on Indore time";
  const abs = Math.abs(deltaMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const span = minutes ? `${hours}h ${minutes}m` : `${hours}h`;
  return deltaMinutes > 0 ? `Indore runs ${span} ahead of you` : `You run ${span} ahead of Indore`;
}

function hourLabel(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const value = hour % 12 || 12;
  return `${value} ${suffix}`;
}

export function ContactPanel() {
  const [now, setNow] = useState<Date | null>(null);
  const [zone, setZone] = useState("UTC");
  const [activePrompt, setActivePrompt] = useState<number | null>(null);
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [bandFilter, setBandFilter] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    setZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  const you: Place = useMemo(() => ({
    id: "you",
    label: "You",
    zone,
    color: "#00ffd1",
    flag: "You",
    work: [9, 17],
    around: [8, 18, 19],
    early: [7, 20, 21]
  }), [zone]);

  const places = [indore, utcPlace, you];
  const date = now ?? new Date(0);
  const visitorOffset = now ? offsetMinutes(zone, date) : 0;
  const indoreOffset = now ? offsetMinutes(indore.zone, date) : 330;
  const sameClock = now ? visitorOffset === indoreOffset : false;
  const currentHour = now ? hourIn(zone, date) : null;
  const focusHour = selectedHour ?? currentHour;

  const indorePoint = { x: 214, y: 72 };
  const youPoint = useMemo(() => {
    const deltaHours = (visitorOffset - indoreOffset) / 60;
    return {
      x: Math.min(268, Math.max(36, 214 + deltaHours * 16)),
      y: Math.min(108, Math.max(36, 72 - Math.min(Math.abs(deltaHours), 8) * 3))
    };
  }, [visitorOffset, indoreOffset]);

  const route = `M${youPoint.x} ${youPoint.y} Q ${(youPoint.x + indorePoint.x) / 2} ${Math.min(youPoint.y, indorePoint.y) - 46} ${indorePoint.x} ${indorePoint.y}`;

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function moveHour(step: number) {
    setSelectedHour(hour => ((hour ?? currentHour ?? 0) + step + 24) % 24);
  }

  return (
    <section id="contact" className="my-16">
      <div className="grid overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 md:grid-cols-2">
        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="mb-2 text-xs uppercase tracking-wider text-neutral-400">Start here</p>
          <h2 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-xl font-medium leading-tight text-transparent md:text-2xl">
            Let&apos;s hop on a quick call and see if we&apos;ve got the <span className="italic text-neutral-300">right chemistry</span>.
          </h2>
          <div className="-ml-1 mt-4 space-y-4" onMouseLeave={() => { setActivePrompt(null); setActivePlace(null); }}>
            {prompts.map((prompt, index) => {
              const active = activePrompt === index;
              return (
                <button
                  key={prompt.title}
                  type="button"
                  onMouseEnter={() => { setActivePrompt(index); setActivePlace(index === 2 ? "indore" : null); }}
                  onFocus={() => { setActivePrompt(index); setActivePlace(index === 2 ? "indore" : null); }}
                  className="group relative block w-full rounded-sm py-1 pl-4 text-left focus-visible:outline-none"
                >
                  <span className="absolute bottom-1 left-0 top-1 w-[2px] overflow-hidden rounded-full bg-neutral-800">
                    <span className="absolute inset-x-0 top-0 rounded-full transition-all duration-300 ease-out" style={{ height: active ? "100%" : "0%", backgroundColor: prompt.color, boxShadow: active ? `0 0 8px ${prompt.color}` : "none" }} />
                  </span>
                  <span className="mb-1 flex items-center gap-1.5 text-sm font-medium" style={{ color: prompt.color }}>
                    {prompt.title}
                    <ArrowRight size={13} className={`transition-all duration-300 ${active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
                  </span>
                  <span className="block text-sm text-neutral-400 transition-colors group-hover:text-neutral-300">{prompt.body}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-6 hidden text-xs text-neutral-600 md:block">Hover a prompt to see it on the clock below, or Indore on the map.</p>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-neutral-800 bg-gradient-to-b from-[#0f1b2f] via-[#0d1526] to-[#0c121f] p-6 md:border-l md:border-t-0 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1 text-xs text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Online now <span className="text-neutral-500">· {now ? clock(indore.zone, date) : "--:--"} in Indore</span>
          </div>

          <div className="relative mt-5 aspect-[300/140] w-full max-w-sm select-none">
            <svg viewBox="0 0 300 140" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <pattern id="contact-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.7" fill="#ffffff" opacity="0.14" />
                </pattern>
                <radialGradient id="contact-fade" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <mask id="contact-mask">
                  <rect width="300" height="140" fill="url(#contact-fade)" />
                </mask>
                <linearGradient id="contact-route" gradientUnits="userSpaceOnUse" x1={youPoint.x} y1={youPoint.y} x2={indorePoint.x} y2={indorePoint.y}>
                  <stop offset="0%" stopColor="#00ffd1" />
                  <stop offset="100%" stopColor="#ff9f66" />
                </linearGradient>
              </defs>
              <rect width="300" height="140" fill="url(#contact-dots)" mask="url(#contact-mask)" />
              {now && !sameClock && (
                <>
                  <path d={route} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="5" strokeLinecap="round" />
                  <path d={route} fill="none" stroke="url(#contact-route)" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round">
                    {!reducedMotion && <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />}
                  </path>
                  {!reducedMotion && (
                    <circle r="2.2" fill="#ffffff">
                      <animateMotion dur="4.2s" repeatCount="indefinite" path={route} />
                    </circle>
                  )}
                </>
              )}
              <MapPin x={indorePoint.x} y={indorePoint.y} color={indore.color} hot={activePlace === "indore"} />
              {now && !sameClock && <MapPin x={youPoint.x} y={youPoint.y} color={you.color} hot={activePlace === "you"} />}
            </svg>
            <CityChip point={indorePoint} label="Indore" flag="🇮🇳" time={now ? clock(indore.zone, date) : "--:--"} day={now ? hourIn(indore.zone, date) >= 6 && hourIn(indore.zone, date) < 18 : false} hot={activePlace === "indore"} onEnter={() => setActivePlace("indore")} onLeave={() => setActivePlace(null)} />
            {now && !sameClock && (
              <CityChip point={youPoint} label="You" flag="" time={clock(zone, date)} day={hourIn(zone, date) >= 6 && hourIn(zone, date) < 18} hot={activePlace === "you"} onEnter={() => setActivePlace("you")} onLeave={() => setActivePlace(null)} align="end" />
            )}
          </div>

          <p className="mb-6 mt-8 text-center text-[11px] text-neutral-500">{now ? aheadText(indoreOffset - visitorOffset) : "Comparing Indore with your timezone"}</p>

          <div className="mb-5 text-center">
            <h3 className="mb-2 text-lg font-medium text-white">Ready to chat?</h3>
            <p className="text-sm text-neutral-400">Email me about an idea, a stack, or something you want built.</p>
          </div>
          <a href={`mailto:${profile.email}`} className="group relative inline-flex items-center gap-3 rounded-lg bg-[#0f1827] px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-[#132030] hover:shadow-[0_0_24px_-8px_rgba(0,255,209,0.8)]">
            Start a conversation
            <Mail size={14} className="text-mint" />
          </a>
          <div className="mt-6 w-full border-t border-white/10 pt-4">
            <p className="text-center text-[11px] uppercase tracking-wider text-neutral-500">I usually reply within a day</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <div className="flex min-w-0 items-center gap-1.5 text-sm text-neutral-400">
                <Mail size={14} className="shrink-0" />
                <a href={`mailto:${profile.email}`} className="truncate hover:text-white">{profile.email}</a>
                <button type="button" aria-label="Copy email" onClick={copyEmail} className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-800 hover:text-white">
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-white">
                <Linkedin size={13} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 p-4 sm:p-6 md:col-span-2">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-[11px] uppercase tracking-wider text-neutral-500">When our days overlap</h3>
              <p className="mt-1 text-xs text-neutral-600">Next 24 hours in your timezone · <span className="sm:hidden">tap an hour</span><span className="hidden sm:inline">hover an hour or use ← →</span></p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
              <span>Asleep</span>
              {shades.map((color, level) => (
                <button
                  key={bandNames[level]}
                  type="button"
                  aria-label={`Show ${bandNames[level].toLowerCase()} hours`}
                  aria-pressed={bandFilter === level}
                  onMouseEnter={() => setBandFilter(level)}
                  onMouseLeave={() => setBandFilter(null)}
                  onFocus={() => setBandFilter(level)}
                  onBlur={() => setBandFilter(null)}
                  className={`h-3 w-3 rounded-[3px] transition-transform hover:scale-125 ${bandFilter === level ? "ring-1 ring-white" : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <span>Working</span>
            </div>
          </div>

          <div
            role="group"
            aria-label="24-hour timezone overlap. Use the left and right arrow keys to move between hours."
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === "ArrowRight") { event.preventDefault(); moveHour(1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); moveHour(-1); }
            }}
            className="grid grid-cols-[52px_1fr] gap-x-2 rounded-md pt-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint/40 sm:grid-cols-[124px_1fr] sm:gap-x-3"
          >
            <div className="flex flex-col gap-1.5">
              {places.map(place => (
                <button key={place.id} type="button" onMouseEnter={() => setActivePlace(place.id)} onMouseLeave={() => setActivePlace(null)} className={`flex h-5 items-center gap-2 text-left transition-opacity sm:h-7 ${activePlace && activePlace !== place.id ? "opacity-40" : "opacity-100"}`}>
                  <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block" style={{ backgroundColor: place.color }} />
                  <span className="text-[11px] leading-none text-neutral-400 sm:hidden">{place.flag}</span>
                  <span className="hidden min-w-0 flex-col leading-tight sm:flex">
                    <span className="truncate text-xs text-neutral-200">{place.label}</span>
                    <span className="min-h-3 truncate text-[10px] text-neutral-500">
                      {focusHour !== null && now ? hourLabel(hourThere(focusHour, visitorOffset, offsetMinutes(place.zone, date))) : ""}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="relative">
              {focusHour !== null && (
                <span className="pointer-events-none absolute -top-5 -translate-x-1/2 text-[10px] text-neutral-400" style={{ left: `${((focusHour + 0.5) / 24) * 100}%` }}>{hourLabel(focusHour)}</span>
              )}
              <div className="flex flex-col gap-1.5">
                {places.map(place => {
                  const placeOffset = now ? offsetMinutes(place.zone, date) : 0;
                  return (
                    <div key={place.id} className="grid gap-[2px] sm:gap-[3px]" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
                      {Array.from({ length: 24 }, (_, column) => {
                        const localHour = now ? hourThere(column, visitorOffset, placeOffset) : column;
                        const level = band(localHour, place);
                        const dimmed = (bandFilter !== null && bandFilter !== level) || (activePlace !== null && activePlace !== place.id);
                        const current = currentHour === column;
                        return (
                          <button
                            key={column}
                            type="button"
                            aria-label={`${place.label} ${hourLabel(localHour)}, ${bandNames[level]}`}
                            onMouseEnter={() => setSelectedHour(column)}
                            onFocus={() => setSelectedHour(column)}
                            className={`h-5 rounded-[3px] transition-opacity sm:h-7 ${current ? "ring-1 ring-white/80" : ""} ${selectedHour === column ? "ring-1 ring-mint" : ""}`}
                            style={{ backgroundColor: shades[level], opacity: dimmed ? 0.25 : 1 }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPin({ x, y, color, hot }: { x: number; y: number; color: string; hot: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={hot ? 7 : 4.5} fill="none" stroke={color} strokeWidth="1" opacity="0.8">
        <animate attributeName="r" values="4;13" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r={hot ? 6 : 4.5} fill={color} />
      <circle cx={x} cy={y} r="1.7" fill="#0c121f" />
    </g>
  );
}

function CityChip({ point, label, flag, time, day, hot, align = "start", onEnter, onLeave }: { point: { x: number; y: number }; label: string; flag: string; time: string; day: boolean; hot: boolean; align?: "start" | "end"; onEnter: () => void; onLeave: () => void }) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={`absolute translate-y-3 rounded-md border bg-neutral-950/70 px-2 py-1 text-left backdrop-blur-sm transition ${hot ? "border-white/30" : "border-white/10"} ${align === "end" ? "-translate-x-[78%]" : "-translate-x-[28%]"}`}
      style={{ left: `${(point.x / 300) * 100}%`, top: `${(point.y / 140) * 100}%` }}
    >
      <span className="flex items-center gap-1 whitespace-nowrap text-[10px] uppercase tracking-wider text-neutral-400">
        {flag && <span aria-hidden="true">{flag}</span>}
        {label}
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium tabular-nums text-white">
        {time}
        {day ? <Sun size={11} className="text-amber-300" /> : <Moon size={11} className="text-indigo-300" />}
      </span>
    </button>
  );
}
