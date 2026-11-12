export type Project = {
  slug: string; name: string; category: string; summary: string;
  details: string; technologies: string[]; featured: boolean;
  kind: "professional" | "personal" | "engineering";
  links?: { live?: string; repo?: string; caseStudy?: string };
};

export const projects: Project[] = [
  {
    slug: "GoBanter", name: "GoBanter", category: "Real-time & Media",
    summary: "Paid one-to-one voice and video app. Users call creators and pay from a wallet by the minute.",
    details: "• Built GoBanter, a paid one-to-one voice and video app. Users browse creators and pay from a wallet by the minute. Creators set rates and must pass identity checks before they can earn.\n• The phone app never decides money, identity, or call state. A Node.js API does, with a Flutter client, a Next.js marketing site and admin portal, and a private Python face service.\n• Starting a call checks that the creator is online, the rate is set, and the wallet can cover a minute, then holds funds. LiveKit carries the media. A server ticker bills about every 10 seconds and ends the call if the balance runs out.\n• Amounts are stored in paise. Razorpay webhooks confirm top-ups. On hangup the API settles the charge, the creator’s earning, and the platform fee, then writes a receipt. The phone only opens checkout.\n• Creator KYC uploads an ID and a selfie. The API sends presigned URLs to a FastAPI service that compares faces and checks liveness, then returns scores. It does not store biometrics or approve anyone.\n• Creator online and busy state is pushed over server-sent events. Admins review users, KYC, withdrawals, and reports in the web portal. The public site at gobanter.online is a marketing page and does not call the API.",
    technologies: ["Flutter", "Node.js", "TypeScript", "Express", "MongoDB", "LiveKit", "Razorpay", "Server-Sent Events", "Next.js", "Python", "FastAPI", "InsightFace", "S3", "Firebase"],
    featured: true, kind: "professional"
  },
  {
    slug: "SubseaCore", name: "SubseaCore",
    category: "Product Engineering",
    summary: "Operations API for offshore and marine crew work: projects, flights, ticket approval, timesheets, and payroll.",
    details: "• Built the operations API behind subseacore.com for offshore and marine crew work, covering projects, oil rigs, crew records, flight booking, ticket approval, billing, timesheets, and payroll.\n• Split access across superadmin, company admin, and crew, each with its own JWT.\n• Admins can search and book crew flights, store the itinerary, apply a flat plus percentage markup in GBP, and track balance and cancellation debt.\n• Tickets start unapproved until a superadmin adds a booking reference and approves them. Approved tickets get a PDF from headless Chrome, stored privately on Cloudinary, and an invoice the admin can download.\n• Covered projects on optional oil rigs, crew invites, passport and offshore IDs, availability, signed contracts, and payroll by hour, day, or project.\n• Timesheets for present, leave, and absent are filled by a scheduled worker. The API runs on Express and MongoDB, with Joi validation, MJML email, and a Vercel serverless deploy beside a separate Vite frontend.",
    technologies: ["Node.js", "TypeScript", "Express", "MongoDB", "Mongoose", "JWT", "Joi", "cloudflare", "Puppeteer", "Nodemailer", "Vercel"],
    featured: true, kind: "professional"
  },
  {
    slug: "HeGlobal", name: "H&E SourceOS",
    category: "Full Stack",
    summary: "Internal operating system for H&E Global Sourcing, from intake through supplier search, RFQs, compliance, production, and delivery.",
    details: "• Built H&E SourceOS for H&E Global Sourcing, turning a sourcing request into a tracked procurement project from intake through supplier search, RFQs, quotes, compliance, samples, production, documents, and delivery.\n• Work runs in Next.js server components and server actions, with services for intake, leads, suppliers, RFQs, quotes, awards, tasks, milestones, and client updates.\n• Each user belongs to one company. Clients only see their own data, and internal notes and documents stay hidden unless staff mark them client-visible.\n• Staff permissions are a role plus a tier from task to strategy. An award needs two people: one starts it, and a strategy-level person approves it.\n• Projects move through about 22 statuses and a 20-step Source-to-Shore board. Public intake opens a project in one transaction, and leads from the landed-cost calculator can convert into a project.\n• Awarding an RFQ accepts one quote, rejects the others, and drafts a client update. Compliance records that a screening review happened. The client portal shows only what staff chose to share, and admin keeps an append-only audit log.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Auth.js", "Zod", "Nodemailer", "Vitest"],
    featured: true, kind: "professional"
  },
  {
    slug: "Orbi", name: "Orbi Live Video Stream Infrastructure",
    category: "Real-time & Media",
    summary: "Creator platform where public pages, live video, and paid bookings run across a Next.js app and an Express API.",
    details: "• Built Orbi, a creator platform where creators publish a public page, go live, and take paid bookings. Fans watch and book them, and admins oversee accounts, lives, and bookings.\n• The product is two apps over HTTP: a Next.js frontend and an Express API on MongoDB. Each backend domain runs routes, controllers, services, repositories, and models, with Zod validation.\n• Lives are scheduled or started from a studio. Agora carries the video. During a live, creators run goals and polls, and fans join with a viewer token and get updates over server-sent events.\n• Auth is JWT for creators, fans, and admins. Sign-in is email and password, phone OTP through Twilio, or Google. The access token is a bearer header, and the refresh token is an HttpOnly cookie.\n• Creators publish a themed page with posts, highlights, memberships, services, and upcoming lives. Bookings use availability, prices, and a shared rate-card link, with accept, decline, cancel, and remind.\n• Identity checks cover PAN, bank details, and manual review. Cloudinary stores avatars, covers, and post media, and Sharp plus Tesseract handle image checks and document OCR.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Agora", "Server-Sent Events", "Twilio", "Cloudinary", "Zod"],
    featured: true, kind: "professional"
  },
  {
    slug: "ABCoin", name: "ABCoin",
    category: "Payments & Fintech",
    summary: "Blockchain-based gold marketplace with KYC, escrow, voting, and fiat-to-token conversion.",
    details: "Built a blockchain-backed gold marketplace with user onboarding, KYC, escrow transactions, and voting mechanisms. Developed a Python microservice with OpenCV and InsightFace for KYC face verification and moderation. Integrated Stellar for the transaction ledger and implemented a secure RBAC-based system architecture. Designed fiat and token conversion and payment flows using Rush.gold and EML, plus escrow-based settlement for a barter marketplace so trades stayed trusted between users.",
    technologies: ["Python", "OpenCV", "InsightFace", "Stellar", "RBAC", "Rush.gold", "EML"],
    featured: true, kind: "professional"
  },
  {
    slug: "JoinBeLocal", name: "JoinBeLocal",
    category: "Full Stack",
    summary: "Barcelona guide that connects visitors with local businesses through challenge routes, deals, stamps, and attraction tickets.",
    details: "• Built JoinBeLocal, the BeLocal platform at joinbelocal.com. Visitors discover Barcelona through local shops, curated routes, deals, events, and attraction tickets. The product is a Next.js site, a Flutter app, and a Node.js Express API.\n• The site covers search, category browsing, a map, experiences with ticket prices, events, and editor stories. Itineraries are challenge routes, from neighborhood walks to Gaudí trails.\n• Visitors collect digital stamps by scanning a QR code at a participating business, track progress on a route, and unlock a reward when the route is complete. Deals from local businesses sit alongside those rewards.\n• Merchants join to publish offers, appear as stops on tourist routes, and get featured in campaigns and the CityCard. They keep a public profile and see reach, audience insights, and how they compare in their category.\n• The same product handles login, a help center, and the phone app on the App Store and Google Play. Copy runs in English, Spanish, Catalan, and French.",
    technologies: ["Next.js", "Node.js", "Express", "Flutter"],
    featured: true, kind: "professional"
  },
];

export const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];