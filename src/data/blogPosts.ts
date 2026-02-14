export interface BlogPostSection {
  title: string
  content: string
}

export interface BlogPostMeta {
  technologies: string
  keyFeatures: string
  focus: string
  focusLabel: string
}

export interface BlogPost {
  title: string
  sections: BlogPostSection[]
  meta: BlogPostMeta
}

export const blogPosts: BlogPost[] = [
  {
    title: 'If I Had to Build a Scalable Backend From Scratch',
    sections: [
      {
        title: 'Starting with Constraints',
        content:
          "If I had to build a scalable backend system from scratch, I wouldn't start with code. I'd start with constraints. What does the system need to do? How many users are we expecting in week one vs. month twelve? What's the tradeoff between latency and consistency? Once those answers are clear, everything else falls into place.",
      },
      {
        title: 'API Design Philosophy',
        content:
          "The first thing I'd define is the API surface. A well-designed API is the contract between the system and the outside world. It should be consistent, versioned, and boring. REST for public-facing endpoints, gRPC for internal service-to-service communication — assuming performance is a priority. I'd design APIs with future-proofing in mind: avoid exposing internal logic, keep endpoints resource-based, and think about pagination, filtering, and error handling from day one.",
      },
      {
        title: 'Data Architecture',
        content:
          "For data, I'd go with a polyglot persistence approach. PostgreSQL for anything relational — transactions, normalized data, complex joins. MongoDB when I need schema flexibility or high-write scenarios. Redis for caching frequently accessed data, implementing TTLs, and handling rate limiting. And if there's streaming or event-driven processing involved, Kafka or Redis Streams would be my go-to.",
      },
      {
        title: 'Building for Failure',
        content:
          "Scalability doesn't just mean handling more users — it means handling failure. So I build with failure in mind: retries with exponential backoff, timeouts on every service call, circuit breakers to stop cascading outages. Idempotency for critical operations so retries don't become problems. Dead-letter queues to catch unprocessable messages. And I make sure every service is horizontally scalable — no hard state, no sticky sessions, no hidden bottlenecks.",
      },
      {
        title: 'Observability First',
        content:
          "Every service I write comes with observability baked in. Logs are structured and queryable. Metrics are exposed via Prometheus. Traces connect the dots across services so I can debug a slow request in seconds. Dashboards and alerts aren't an afterthought — they're part of the build.",
      },
      {
        title: 'Networking and Security',
        content:
          "Networking is another layer people underestimate. I'd use reverse proxies and load balancers early on — NGINX or Envoy — for traffic management, SSL termination, and basic routing. Internal services would live behind API gateways with auth policies and rate limits. Public endpoints would be locked down with authentication, authorization, and some form of abuse protection.",
      },
      {
        title: 'CI/CD and Infrastructure',
        content:
          "CI/CD is essential. I'd set up pipelines that run tests, check linting, and deploy to staging automatically. Deployments should be zero-downtime, preferably blue-green or rolling. Infrastructure should be described as code — whether that's Terraform, Pulumi, or something else. Configuration lives in version control. Secrets don't.",
      },
      {
        title: 'Architecture Decisions',
        content:
          "When it comes to architecture, I start with a monolith only if speed is the top priority and the scope is small. Otherwise, I lean toward modular services — independently deployable, loosely coupled, and well-defined. Not everything needs to be microservices, but everything should be modular.",
      },
      {
        title: 'Designing for Scale',
        content:
          "Lastly, I never assume scale — I design for it. That means profiling early, load testing often, and watching real-world usage patterns. I believe in simplicity over cleverness. Readable code, clear interfaces, good documentation. The stuff that makes systems maintainable. You don't need a complex system to scale — you need one that's designed not to fall apart.",
      },
    ],
    meta: {
      technologies: 'Node.js, Express, MongoDB, Socket.io, JWT',
      keyFeatures:
        'Real-time driver-passenger matching, booking, fare calculation, JWT authentication',
      focus: 'A scalable backend system similar to Uber/Lyft',
      focusLabel: 'Project Goal',
    },
  },
  {
    title: 'Rate Limiting: Not Just for APIs',
    sections: [
      {
        title: 'Beyond API Protection',
        content:
          'When people hear "rate limiting," they usually think of APIs — protecting endpoints from abuse, throttling requests, and making sure clients don\'t DDOS your backend. But rate limiting is much bigger than that. It\'s a foundational tool for controlling load, protecting resources, and creating predictable system behavior across almost every layer.',
      },
      {
        title: 'Internal Service Communication',
        content:
          "Let's start with the classic use case: an API. Sure, you want to prevent a single user or IP from overwhelming your service, so you implement a token bucket or sliding window algorithm using Redis. But what about internal APIs? Rate limiting service-to-service communication can prevent cascading failures when one dependency slows down or crashes. If service A starts flooding service B with retries, that's not resilience — it's self-sabotage.",
      },
      {
        title: 'Job Queues and Messaging Systems',
        content:
          "Now zoom out. Rate limiting is just as critical in job queues. Imagine a worker pulling from a task queue — do you really want it to consume jobs as fast as possible, or should you enforce a cap to avoid saturating a third-party API or database? Same goes for messaging systems like Kafka: consumers can overrun downstream systems if you don't gate throughput.",
      },
      {
        title: 'Authentication and Security',
        content:
          "It applies to authentication too. You want login attempts limited — not just by user, but by IP, by user-agent, maybe even by device fingerprint. Rate limiting isn't just about fairness — it's about defense. Defense against brute-force attacks, credential stuffing, and resource exhaustion.",
      },
      {
        title: 'Database Access Control',
        content:
          "Even database access can benefit. Ever had a background process that accidentally runs a query too frequently and tanks your DB's performance? Limiting the frequency of that access is an easy win.",
      },
      {
        title: 'Design Pattern Approach',
        content:
          "I treat rate limiting as a design pattern, not an afterthought. Every interaction in a distributed system has the potential to go out of control. If it's not bounded, it's dangerous. My approach is simple: identify critical boundaries and put hard limits in place. Use Redis, use in-memory leaky buckets, use custom middleware — the mechanism doesn't matter as much as the discipline.",
      },
      {
        title: 'The Real Question',
        content:
          'The real question isn\'t "Should I rate limit this?" It\'s: "What happens if I don\'t?"',
      },
    ],
    meta: {
      technologies: 'Redis, Token Bucket Algorithm, Sliding Window, Kafka',
      keyFeatures: 'Rate limiting, Service protection, Load control, Security',
      focus: 'System-wide rate limiting strategies beyond just API endpoints',
      focusLabel: 'Focus',
    },
  },
]
