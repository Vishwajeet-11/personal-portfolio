import { Calendar, MapPin } from "lucide-react";
import { experiences } from "@/data/experience";

function renderHighlight(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-neutral-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function ExperienceTimeline({ limit, maxHighlights }: { limit?: number; maxHighlights?: number }) {
  const items = typeof limit === "number" ? experiences.slice(0, limit) : experiences;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-mint/60 via-neutral-800 to-neutral-900"
      />
      <ol className="space-y-6">
        {items.map((item, idx) => {
          const shownHighlights = typeof maxHighlights === "number" ? item.highlights.slice(0, maxHighlights) : item.highlights;
          return (
            <li key={item.slug} id={item.slug} className="group relative scroll-mt-24 pl-7 sm:pl-9">
              <span
                aria-hidden
                className={`absolute left-0 top-6 flex h-[15px] w-[15px] items-center justify-center rounded-full border ${
                  item.current
                    ? "border-mint/60 bg-neutral-950 shadow-[0_0_12px_rgba(0,255,209,0.45)]"
                    : "border-neutral-700 bg-neutral-950 transition-colors group-hover:border-mint/50"
                }`}
              >
                <span
                  className={`h-[5px] w-[5px] rounded-full ${
                    item.current ? "bg-mint motion-safe:animate-pulse" : "bg-neutral-500 transition-colors group-hover:bg-mint/80"
                  }`}
                />
              </span>

              <article className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-neutral-700 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] text-neutral-500">{String(idx + 1).padStart(2, "0")}</span>
                      <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">{item.company}</h3>
                      {item.current && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-mint/40 bg-mint/10 px-2 py-0.5 text-[11px] font-medium text-mint">
                          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                          Present
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-neutral-300">{item.role}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-neutral-400 sm:flex-col sm:items-end sm:gap-1">
                    <span className="inline-flex items-center gap-1.5 text-neutral-300">
                      <Calendar size={12} className="text-mint/80" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-neutral-500">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5 border-t border-neutral-800/80 pt-4 text-sm leading-relaxed text-neutral-400">
                  {shownHighlights.map(point => (
                    <li key={point} className="flex gap-2.5">
                      <span aria-hidden className="mt-[2px] shrink-0 font-mono text-xs text-mint/80">
                        →
                      </span>
                      <span>{renderHighlight(point)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="rounded-md border border-neutral-800 bg-neutral-950/60 px-2 py-0.5 text-[11px] text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
