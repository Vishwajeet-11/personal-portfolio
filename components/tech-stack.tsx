import { stack } from "@/data/profile";

const brands: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#E76F00",
  SQL: "#a3a3a3",
  "Node.js": "#5FA04E",
  Express: "#e5e5e5",
  "Next.js": "#e5e5e5",
  "REST APIs": "#a3a3a3",
  Microservices: "#4FA3B8",
  WebSockets: "#a3a3a3",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Redis: "#FF4438",
  Kafka: "#e5e5e5",
  RabbitMQ: "#FF6600",
  Prisma: "#e5e5e5",
  AWS: "#FF9900",
  Docker: "#2496ED",
  Nginx: "#009639",
  PM2: "#2B037A",
  Cloudflare: "#F38020",
  "CI/CD": "#a3a3a3",
  Linux: "#FCC624",
  React: "#61DAFB",
  "Tailwind CSS": "#06B6D4",
  HTML: "#E34F26",
  CSS: "#1572B6",
  OpenAI: "#e5e5e5",
  LangChain: "#1C3C3C",
  LangGraph: "#1C3C3C",
  Twilio: "#F22F46",
  Stripe: "#635BFF",
  Razorpay: "#0C2451",
  Agora: "#099DFD"
};

export function TechStack() {
  return (
    <section className="my-16">
      <div className="mb-6">
        <h2 className="mb-1 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-xl font-bold text-transparent">Tech Stack</h2>
        <p className="text-sm text-neutral-400">Technologies I work with</p>
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {stack.map(group => (
          <div key={group.title} className="mb-4 break-inside-avoid rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-4 transition-all hover:border-neutral-700/50">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{group.title}</h3>
              <span className="font-mono text-[10px] text-neutral-600">{String(group.items.length).padStart(2, "0")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map(item => {
                const brand = brands[item] ?? "#a3a3a3";
                return (
                  <div key={item} style={{ ["--brand" as string]: brand }} className="group flex cursor-default items-center gap-2 rounded-lg border border-neutral-700/30 bg-neutral-800/50 px-3 py-1.5 transition-all hover:border-[color-mix(in_srgb,var(--brand)_45%,transparent)] hover:bg-neutral-800 hover:shadow-[0_0_14px_-4px_var(--brand)]">
                    <span className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-110" style={{ background: brand }} />
                    <span className="text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
