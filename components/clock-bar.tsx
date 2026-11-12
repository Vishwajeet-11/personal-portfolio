"use client";

import { useEffect, useState } from "react";

const zones = [
  { label: "Indore", zone: "Asia/Kolkata", offset: "GMT+5:30" },
  { label: "UTC", zone: "UTC", offset: "GMT+0" }
];

function format(zone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(new Date());
}

export function ClockBar() {
  const [now, setNow] = useState<string[] | null>(null);

  useEffect(() => {
    const tick = () => setNow(zones.map(z => format(z.zone)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-4 my-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono font-medium text-mint/80 md:mx-7">
      {zones.map((zone, i) => (
        <span key={zone.label} className="flex items-baseline gap-1.5">
          {i > 0 && <span className="mr-1.5 text-xs text-neutral-700">·</span>}
          <span className="text-xs tabular-nums md:text-sm">{now?.[i] ?? "--:--:-- --"}</span>
          <span className="text-[11px] text-neutral-500 md:text-xs">{zone.label}</span>
          <span className="hidden text-xs text-neutral-600 md:inline">({zone.offset})</span>
        </span>
      ))}
    </div>
  );
}
