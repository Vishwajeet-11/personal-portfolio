export type ExperienceItem = {
  slug: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
  technologies: string[];
};

export const experiences: ExperienceItem[] = [
  {
    slug: "purple-merit",
    company: "Purple Merit",
    role: "Software Engineer",
    period: "Jun. 2025 – Present",
    location: "India",
    current: true,
    highlights: [
      "Designed and extended **modular Node.js/TypeScript backend services** for booking, payments, and creator workflows, defining clear service boundaries and versioned REST API contracts.",
      "Implemented reliable **OTP-based authentication** by integrating Twilio, with server-side validation, expiry handling, and safeguards against repeated verification attempts.",
      "Engineered booking and payment lifecycle workflows covering **payment confirmation, seller acceptance, completion, cancellation, refunds, and disputes**, with idempotent state transitions and webhook-driven updates.",
      "Integrated **real-time live-streaming capabilities** using Agora and WebRTC-related workflows; investigated streaming delivery options including RTMP and MediaMTX for reliable creator broadcasts.",
      "Built and integrated a **Python FastAPI KYC microservice** using OpenCV and InsightFace for selfie/face verification, connecting asynchronous verification results to the core application.",
      "Configured **Cloudflare R2 object storage** for media assets and managed deployment infrastructure using Linux, Nginx, PM2, SSL certificates, and environment-specific staging/production configurations."
    ],
    technologies: ["Node.js", "TypeScript", "Python", "FastAPI", "Twilio", "Agora", "WebRTC", "RTMP", "MediaMTX", "OpenCV", "InsightFace", "Cloudflare R2", "Nginx", "PM2", "Linux"]
  },
  {
    slug: "idea-usher",
    company: "Idea Usher",
    role: "Software Engineer",
    period: "Sep. 2024 – Jun. 2025",
    location: "India, Remote",
    highlights: [
      "Cut deployment time from **30–40 min to 5–10 min** by leading the migration of a **monolith into 5 independent microservices**, so teams could ship without blocking each other.",
      "Reduced API response time from **500–800 ms to 100–300 ms** by moving the **notification service** from synchronous processing to **Kafka-based async processing**, while platform traffic grew from **100K to 500K requests/day**.",
      "Cut **p95 latency by 75% (800 ms → 200 ms)** through indexing, query tuning, and **read replicas**.",
      "Reduced cache hot-spot incidents from **5–10/month to 0–1/month** by implementing **consistent hashing across 12+ cache nodes**.",
      "Reduced duplicate transactions from **20–100/month to 0–2/month** by building **idempotent workflows** with exactly-once processing, and accelerated root-cause analysis of cross-service failures with **distributed tracing and correlation IDs**."
    ],
    technologies: ["Microservices", "Kafka", "Read Replicas", "Consistent Hashing", "Idempotency", "Distributed Tracing"]
  },
  {
    slug: "unanime-planet",
    company: "Unanime Planet",
    role: "Software Engineer",
    period: "Aug. 2023 – Sep. 2024",
    location: "Portugal, Remote",
    highlights: [
      "Reduced downtime by **30% (10 → 7 hours/month)** by contributing to the move to a **microservices architecture**.",
      "Cut event processing latency by **40%** by integrating **Kafka-based messaging**.",
      "Raised throughput from **50–100 to 150–300 requests/second (2–3×)** using **Redis caching and BullMQ job queues**.",
      "Cut AWS costs by **15%** (INR 1,00,000 → INR 85,000 per month, about INR 1.8 lakh/year) by optimizing resource usage.",
      "Improved inter-service performance by **50%** by moving communication across **4 services** from REST to **gRPC**.",
      "Improved reliability of distributed job processing with **retry mechanisms and dead-letter queues**, and strengthened security with **API rate limiting**, request validation, and authentication."
    ],
    technologies: ["Microservices", "Kafka", "Redis", "BullMQ", "gRPC", "AWS", "Rate Limiting"]
  },
  {
    slug: "creative-thoughts-informatics",
    company: "Creative Thoughts Informatics",
    role: "Software Engineer",
    period: "Jan. 2023 – Aug. 2023",
    location: "Indore, India",
    highlights: [
      "Developed backend services using **Node.js** and **MySQL** for scalable applications.",
      "Designed RESTful APIs following best practices for performance and maintainability.",
      "Collaborated with front-end teams to improve **performance and responsiveness**."
    ],
    technologies: ["Node.js", "MySQL", "REST APIs"]
  }
];
