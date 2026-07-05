export interface ProjectSection {
  title: string
  content?: string
  items: string[]
}

export interface ProjectTech {
  label: string
  value: string
}

export interface Project {
  slug: string
  shortTitle: string
  title: string
  description: string
  seoDescription: string
  highlights: string[]
  sections: ProjectSection[]
  tech: ProjectTech[]
}

export const projects: Project[] = [
  {
    slug: 'uprides',
    shortTitle: 'UpRides',
    title: 'UpRides — Real-Time Ride-Hailing Backend at Scale',
    description:
      'A fully decoupled, event-driven backend inspired by ride-hailing giants like Uber and Lyft. The system prioritizes scalability, resilience, and real-time performance.',
    seoDescription:
      'UpRides case study — a Backend Developer project building a ride-hailing backend with Node.js, Kafka, gRPC, Redis, MongoDB, and WebSockets at scale.',
    highlights: [
      'Event-driven microservices with Kafka and gRPC for inter-service communication',
      'Real-time driver matching and ETAs via WebSockets and Redis pub/sub',
      'Idempotent booking flows with circuit breakers and dead-letter queues',
      'Containerized deployment with Docker and CI/CD via GitHub Actions',
    ],
    sections: [
      {
        title: 'Architecture',
        content:
          'Built with TypeScript and Node.js, using stateless, containerized microservices connected via:',
        items: [
          'Kafka-based message queues and gRPC for service communication',
          'MongoDB as operational datastore for schema flexibility and write throughput',
          'Redis for caching, pub/sub messaging, and ephemeral state (e.g. driver locations)',
          'WebSocket layer for real-time client updates like driver pings and ETAs',
        ],
      },
      {
        title: 'Resilience & Reliability',
        content: 'Services are designed to fail gracefully with:',
        items: [
          'Retries with exponential backoff',
          'Dead-letter queues',
          'Circuit breakers for partial outage handling',
          'Transaction-safe and idempotent booking flows',
          'JWT authentication and surge-aware fare computation',
        ],
      },
      {
        title: 'Infrastructure & DevOps',
        items: [
          'Docker containerization',
          'Automated CI/CD via GitHub Actions',
          'Infrastructure as code',
          'Secure secrets management and rotation',
        ],
      },
      {
        title: 'Real-World Focus',
        items: [
          'Hot path optimizations for high-volume matching',
          'Eventual consistency in the dispatch layer',
          'Clean separation of control and data planes',
          'Minimal latency and maximum uptime',
        ],
      },
    ],
    tech: [
      {
        label: 'Tech Stack:',
        value:
          'Go, Node.js, JavaScript, Express, MongoDB, Socket.io, JWT, TypeScript, Kafka, gRPC, Redis, Docker, GitHub Actions',
      },
      {
        label: 'Features:',
        value: 'Real-time driver-passenger matching, booking, fare calculation, JWT auth',
      },
      { label: 'Goal:', value: 'A scalable backend like Uber/Lyft' },
    ],
  },
  {
    slug: 'helix',
    shortTitle: 'Helix',
    title: 'Helix — Real-Time Video Streaming Platform at Scale',
    description:
      'A distributed video streaming platform inspired by Netflix and YouTube, designed to handle massive scale with billions of users, millions of daily video uploads, and petabytes of video storage. The system prioritizes read-heavy workloads, adaptive streaming, and global content delivery.',
    seoDescription:
      'Helix case study — a Backend Developer project designing a Netflix-scale video streaming platform with chunk-based uploads, CDN delivery, and distributed search.',
    highlights: [
      'Read-optimized architecture with a 1000:1 read-to-write ratio',
      'Asynchronous video processing pipeline with multi-resolution encoding',
      'Distributed inverted index for video search across billions of records',
      'CDC-driven subscriber notifications and CDN integration for popular content',
    ],
    sections: [
      {
        title: 'Functional Requirements',
        items: [
          'Users can post videos with metadata and descriptions',
          'Users can watch videos with adaptive quality streaming (read-heavy workload)',
          'Users can comment on videos with real-time updates',
          'Users can search for videos by name, title, or description',
          'Users can subscribe to channels and receive notifications',
        ],
      },
      {
        title: 'Scale & Statistics',
        items: [
          '1 billion users globally',
          '1 million videos posted per day',
          'Average video size: 100 MB',
          'Average views per video: 1,000 (some videos have millions of views)',
          'Storage requirement: ~40 PB per year (100M videos × 100MB × 400 days)',
          'Read-to-write ratio: 1000:1 (highly read-optimized architecture)',
        ],
      },
      {
        title: 'Architecture',
        content: 'Built to support multiple device types and varying network speeds:',
        items: [
          'Video chunking strategy for adaptive streaming across multiple resolutions and encodings',
          'Parallel chunk uploads for faster video processing',
          'CDN integration for popular videos to reduce latency globally',
          'Multi-resolution encoding (360p, 720p, 1080p, 4K) with chunk-based delivery',
          'Event-driven architecture using message brokers for asynchronous processing',
          'Distributed search index with inverted indexing for video discovery',
        ],
      },
      {
        title: 'Video Upload & Processing',
        content: 'Asynchronous video processing pipeline:',
        items: [
          'Chunks uploaded directly to S3 (object storage) before processing',
          'Message broker (RabbitMQ) for processing events with round-robin worker selection',
          'Multiple encoding variants generated per chunk (different resolutions/bitrates)',
          'Flink-based aggregation to track processing completion across distributed nodes',
          'Video metadata and chunk availability validated before making videos public',
          'Partial failure handling ensures videos only appear when all chunks are accessible',
          'Popular videos automatically pushed to CDN for optimal delivery',
        ],
      },
      {
        title: 'Database Design',
        content: 'Optimized for read-heavy workloads:',
        items: [
          'B-Tree indexes for primary video metadata (optimized for reads)',
          'Cassandra (LSM tree) for comments with leaderless architecture to handle high comment volumes',
          'Partitioned VideoChunks table by videoId, sorted by encoding, resolution, and chunk order',
          'CDC (Change Data Capture) for real-time subscriber notifications via message queues',
          'Denormalized search index to avoid distributed joins for common queries',
          'Multiple shards per popular search term to handle query load',
        ],
      },
      {
        title: 'Search & Discovery',
        items: [
          'Distributed inverted index for video title and description search',
          'Partitioning strategy to co-locate videos for common search terms',
          'Popular terms split across multiple shards to distribute load',
          'Local index per partition for efficient term lookups',
          'Denormalized metadata in search index to minimize database joins',
        ],
      },
    ],
    tech: [
      {
        label: 'Tech Stack:',
        value:
          'Go, Node.js, JavaScript, RabbitMQ, Flink, S3, CDN, Cassandra, B-Tree Database, Distributed Search Index, CDC, Message Queues',
      },
      {
        label: 'Features:',
        value:
          'Video chunking, adaptive streaming, multi-resolution encoding, distributed search, real-time comments, subscriber notifications, CDN integration',
      },
      {
        label: 'Goal:',
        value:
          'A scalable video streaming platform like Netflix/YouTube handling billions of users and petabytes of content',
      },
    ],
  },
  {
    slug: 'dirext',
    shortTitle: 'Dirext',
    title: 'Dirext — Real-Time Chat Application at Scale',
    description:
      'A distributed messaging platform inspired by Facebook Messenger and WhatsApp, designed to handle billions of users sending millions of messages daily. The system prioritizes real-time message delivery, cross-device synchronization, and efficient message routing with minimal client connections.',
    seoDescription:
      'Dirext case study — a Backend Developer project building a WhatsApp-scale chat backend with Kafka, Flink, WebSockets, and consistent hashing.',
    highlights: [
      'Kafka-partitioned message pipeline delivering 100B messages per day',
      'WebSocket connections with consistent hashing and ZooKeeper routing',
      'Flink stream processing for real-time aggregation and HBase upserts',
      'Cross-device sync with timestamp-ordered message persistence',
    ],
    sections: [
      {
        title: 'Functional Requirements',
        items: [
          'Support group chats with up to 10 users',
          'Real-time message sending with instant delivery',
          'Real-time message receiving with WebSocket connections',
          'Message persistence for cross-device access and conversation history',
          'Consistent message ordering across all devices and users',
        ],
      },
      {
        title: 'Scale & Statistics',
        items: [
          '1 billion total users globally',
          '100 messages per user per day on average',
          'Average message size: 100 bytes',
          'Daily message volume: 100 billion messages',
          'Storage requirement: ~10 TB per day (1B users × 100 msgs × 100 bytes)',
          'Highly write-intensive workload with real-time read requirements',
        ],
      },
      {
        title: 'Architecture',
        content: 'Event-driven architecture optimized for real-time messaging:',
        items: [
          'Message service assigns unique UUIDs to each message for idempotency',
          'Kafka message broker partitioned by chatId for efficient message routing',
          'Flink stream processing for real-time message aggregation and upserts',
          'WebSocket connections for bidirectional real-time communication',
          'Consistent hashing and ZooKeeper for server load balancing and routing',
          'Single chat server per user to minimize connection overhead',
          'Heartbeat mechanism with jitter for reliable connection management',
        ],
      },
      {
        title: 'Message Delivery Pipeline',
        content: 'Asynchronous message processing for high throughput:',
        items: [
          'Client sends message to Message Service which assigns UUID',
          'Message published to Kafka partitioned by chatId for ordering',
          'Flink processes messages partitioned by chatId for consistency',
          'Upsert to HBase (partitioned by chatId) for persistent storage',
          'Messages routed to appropriate chat servers for real-time delivery',
          'Each user maintains connection to only one chat server to reduce load',
          'Group chats (max 10 users) distributed across multiple chat servers',
        ],
      },
      {
        title: 'Database Design',
        content: 'Optimized for fast message retrieval and efficient storage:',
        items: [
          'Messages table: chatId (partition key), timestamp (sort key), message, metadata',
          'Messages for same chat co-located on same partition and pre-sorted by timestamp',
          'HBase for read-optimized message storage with B-tree indexing',
          'Stream processing allows fast writes via Kafka/Flink while maintaining read performance',
          'ChatMembers table: userId, chatId (partitioned by userId for fast chat lookup)',
          'Single-leader replication (MySQL) for ChatMembers to avoid write conflicts',
          'Users table: userId, email, passwordHash (partitioned by userId, MySQL)',
          'Timestamp-based ordering ensures consistent message sequence across all devices',
        ],
      },
      {
        title: 'Connection Management & Reliability',
        items: [
          'Consistent hashing for mapping userId to chat server for load distribution',
          'ZooKeeper for maintaining server registry and routing information',
          'Heartbeat mechanism: servers send periodic heartbeats to clients and ZooKeeper',
          'Automatic failover: server downtime triggers consistent hash update',
          'Client reconnection: exponential backoff with jitter to avoid thundering herd',
          'Load balancer integration for seamless server failover and reconnection',
        ],
      },
    ],
    tech: [
      {
        label: 'Tech Stack:',
        value: 'Go, Node.js, JavaScript, Kafka, Flink, HBase, MySQL, WebSockets, ZooKeeper, Consistent Hashing',
      },
      {
        label: 'Features:',
        value:
          'Real-time messaging, group chats, message persistence, cross-device sync, WebSocket connections, distributed message routing',
      },
      {
        label: 'Goal:',
        value:
          'A scalable messaging platform like Facebook Messenger/WhatsApp handling billions of users and real-time message delivery',
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getOtherProjects(slug: string): Project[] {
  return projects.filter((project) => project.slug !== slug)
}
