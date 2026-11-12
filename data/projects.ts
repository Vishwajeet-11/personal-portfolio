export type Project = {
  slug: string; name: string; category: string; summary: string;
  details: string; technologies: string[]; featured: boolean;
  kind: "professional" | "personal" | "engineering";
  links?: { live?: string; repo?: string; caseStudy?: string };
};

export const projects: Project[] = [
  {
    slug: "linkme", name: "LinkMe", category: "Real-time & Media",
    summary: "Creator platform with live streaming, onboarding, identity verification, and integrated workflows.",
    details: "Worked across backend services and product integrations for creator onboarding, document capture, facial verification, and live streaming. The KYC flow uses a dedicated Python service with computer-vision tooling, while real-time streaming is integrated through Agora.",
    technologies: ["Node.js", "TypeScript", "Python", "FastAPI", "OpenCV", "InsightFace", "Agora", "WebRTC"],
    featured: true, kind: "professional"
  },
  {
    slug: "booking-escrow", name: "Booking, Payments & Escrow",
    category: "Payments & Fintech",
    summary: "A transaction lifecycle spanning booking, payment confirmation, escrow, completion, refunds, and payouts.",
    details: "Architecture work covering booking state transitions, payment webhooks, seller acceptance, escrow holds and releases, dispute freezes, ledger entries, idempotency, and asynchronous payout processing.",
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Kafka", "Stripe", "Webhooks"],
    featured: true, kind: "engineering"
  },
  {
    slug: "gobanter", name: "GoBanter",
    category: "Product Engineering",
    summary: "Backend services and deployment infrastructure for a creator-focused product.",
    details: "Backend engineering and infrastructure work spanning API deployment, staging and production environments, Nginx reverse proxy configuration, SSL, process management, and a dedicated KYC service.",
    technologies: ["Node.js", "TypeScript", "MongoDB", "Python", "FastAPI", "PM2", "Nginx", "AWS", "Hostinger"],
    featured: true, kind: "professional"
  },
  {
    slug: "agami-astro", name: "Agami Astro",
    category: "Full Stack",
    summary: "Astrology application with user journeys, birth-chart workflows, AI interactions, and payments.",
    details: "Full-stack product work involving backend APIs, user account workflows, birth-chart generation flows, payment integration, and application behavior across the customer journey.",
    technologies: ["Node.js", "TypeScript", "React", "MongoDB", "Payments", "AI integrations"],
    featured: true, kind: "professional"
  },
  {
    slug: "zernflow", name: "Zernflow",
    category: "Full Stack",
    summary: "Next.js application integrated with Supabase and deployed across local and server environments.",
    details: "Application setup, backend integration, environment configuration, and deployment work for a Next.js application using Supabase.",
    technologies: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL"],
    featured: false, kind: "professional"
  },
  {
    slug: "microservices-platform", name: "Event-driven Microservices",
    category: "Distributed Systems",
    summary: "Independent backend services coordinated through asynchronous messaging and shared infrastructure.",
    details: "Architecture patterns involving service boundaries, event-driven communication, background processing, analytics, and reliable integration between independently deployed services.",
    technologies: ["Node.js", "TypeScript", "Kafka", "Redis", "RabbitMQ", "PostgreSQL", "Docker"],
    featured: false, kind: "engineering"
  }
];

export const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];