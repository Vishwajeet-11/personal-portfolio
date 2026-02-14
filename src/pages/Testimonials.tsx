import { Link } from 'react-router-dom'
import '../styles/testimonial.css'

interface Testimonial {
  message: string
  author: string
  role: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    message:
      "Vishwajeet is an exceptional backend engineer. His work on our real-time ride-hailing system was outstanding. He designed scalable microservices architecture using Kafka and Redis, handling millions of requests seamlessly. His attention to observability and system resilience sets him apart.",
    author: "Sarah Chen",
    role: "Senior Engineering Manager, TechStart Inc.",
    rating: 5,
  },
  {
    message:
      "Working with Vishwajeet was a pleasure. He has deep expertise in distributed systems and event-driven architecture. His implementation of circuit breakers and dead-letter queues helped us maintain 99.9% uptime during peak traffic. Highly recommend!",
    author: "Michael Rodriguez",
    role: "CTO, CloudScale Solutions",
    rating: 5,
  },
  {
    message:
      "Vishwajeet's ability to optimize database queries and implement efficient caching strategies reduced our API response time by 60%. His knowledge of PostgreSQL and MongoDB is impressive, and he always writes clean, maintainable code.",
    author: "Emily Watson",
    role: "Lead Backend Developer, DataFlow Systems",
    rating: 4,
  },
  {
    message:
      "Vishwajeet is one of the best backend engineers I've worked with. His understanding of system design principles, from CAP theorem to eventual consistency, is remarkable. He built our gRPC-based microservices that now handle 10M+ requests daily.",
    author: "David Kim",
    role: "Principal Engineer, ScaleCorp",
    rating: 5,
  },
  {
    message:
      "I've been consistently impressed by Vishwajeet's problem-solving skills. When we faced performance bottlenecks, he quickly identified the issues and implemented solutions using Redis Streams and optimized Kafka consumers. Great collaborator!",
    author: "Lisa Anderson",
    role: "Engineering Manager, FastTrack Labs",
    rating: 4,
  },
  {
    message:
      "Vishwajeet's expertise in WebSocket communication and real-time systems was crucial for our project. He architected a robust notification system that delivers updates to thousands of concurrent users with minimal latency. Exceptional work!",
    author: "James Park",
    role: "Product Lead, RealTime Apps",
    rating: 5,
  },
  {
    message:
      "Vishwajeet's implementation of JWT authentication and rate limiting significantly improved our API security. His attention to best practices and documentation made onboarding new team members much easier. Great developer to have on any team!",
    author: "Rachel Green",
    role: "Security Engineer, SecureAPI Corp",
    rating: 4,
  },
  {
    message:
      "Vishwajeet's deep understanding of Docker and Kubernetes helped us containerize our entire backend infrastructure. His CI/CD pipeline implementation using GitHub Actions streamlined our deployment process. Highly skilled and reliable engineer!",
    author: "Robert Taylor",
    role: "DevOps Lead, ContainerWorks",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star' : 'star empty'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <>
      <h1 className="testimonials-header">Testimonials</h1>
      <p className="testimonials-subtitle">
        What colleagues, clients, and collaborators have to say about working with me.
      </p>

      <div className="testimonials-container">
        {testimonials.map(({ message, author, role, rating }) => (
          <div key={author} className="testimonial-card">
            <StarRating rating={rating} />
            <p className="testimonial-message">"{message}"</p>
            <div className="testimonial-author">
              <span className="author-name">{author}</span>
              <span className="author-role">{role}</span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to Portfolio</Link>
      </p>
    </>
  )
}
