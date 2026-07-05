import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CALCOM_USERNAME } from '../config'
import { usePageMeta } from '../hooks/usePageMeta'
import SiteFooter from '../components/SiteFooter'

const CALCOM_URL = `https://cal.com/${CALCOM_USERNAME}`

export default function Home() {
  const [meetingPanelOpen, setMeetingPanelOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  usePageMeta({
    title: 'Vishwajeet Bharadia | Backend Developer',
    description:
      'Vishwajeet Bharadia is a Backend Developer who builds scalable systems, real-time applications, and RESTful APIs with Node.js, Go, Kafka, and Redis.',
    path: '/',
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setMeetingPanelOpen(false)
      }
    }
    if (meetingPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [meetingPanelOpen])

  return (
    <>
      <h1>Vishwajeet Bharadia</h1>
      <p>
        <strong>Backend Developer</strong> — I design and build scalable backend
        systems, real-time applications, and RESTful APIs.
      </p>
      <div className="social-links">
        <a
          href="https://github.com/Vishwajeet-11"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/vishwajeetbharadia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="https://drive.google.com/file/d/1tsaPGIugvmFakalDSYmzjoFnNbXJdEIM/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM9 12v2h6v-2H9zm0 4v2h6v-2H9z" />
          </svg>
        </a>
        <div className="meeting-scheduler-wrap" ref={panelRef}>
          <button
            type="button"
            className="meeting-icon-btn"
            onClick={() => setMeetingPanelOpen(!meetingPanelOpen)}
            aria-label="Schedule a meeting"
            aria-expanded={meetingPanelOpen}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
            </svg>
          </button>
          {meetingPanelOpen && (
            <div className="meeting-panel">
              <div className="meeting-panel-header">
                <span>Schedule a meeting</span>
                <button
                  type="button"
                  className="meeting-panel-close"
                  onClick={() => setMeetingPanelOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="calcom-embed-wrapper">
                <iframe
                  src={`${CALCOM_URL}?embed=true`}
                  title="Book a meeting with Vishwajeet"
                  className="calcom-embed"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <hr />
      <p>
        I'm a backend developer who builds scalable, resilient systems designed to
        handle real-world load. I specialize in designing RESTful and gRPC-based
        APIs, architecting pub/sub systems with Kafka and Redis Streams, and
        optimizing data flow with asynchronous patterns.
      </p>

      <p>
        I've worked across both SQL (PostgreSQL) and NoSQL (MongoDB) databases,
        tuned queries for performance, and implemented caching layers using Redis
        to reduce latency and offload load from primary datastores.
      </p>

      <p>
        Beyond the basics, I've implemented reverse proxies with NGINX, designed
        fault-tolerant service meshes, and built modular microservices that
        communicate over protocol buffers. I'm comfortable with concepts like CAP
        theorem, distributed tracing, rate-limiting, horizontal scaling,
        idempotency, circuit breakers, and eventual consistency.
      </p>

      <p>
        Every service I write is built with observability in mind — logs, metrics,
        alerts, and structured tracing included from day one.
      </p>

      <hr />
      <h2>Projects</h2>
      <p>
        Selected backend developer case studies — each project covers architecture,
        scale, database design, and production tradeoffs.
      </p>
      <ul className="project-teasers">
        <li>
          <Link to="/projects/uprides">
            <strong>UpRides</strong>
          </Link>{' '}
          — Real-time ride-hailing backend with Kafka, gRPC, Redis, and WebSockets
        </li>
        <li>
          <Link to="/projects/helix">
            <strong>Helix</strong>
          </Link>{' '}
          — Netflix-scale video streaming with chunk-based uploads and CDN delivery
        </li>
        <li>
          <Link to="/projects/dirext">
            <strong>Dirext</strong>
          </Link>{' '}
          — WhatsApp-scale messaging with Kafka, Flink, and consistent hashing
        </li>
      </ul>

      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/projects" className="view-more-btn">
          View All Projects →
        </Link>
      </p>

      <hr />

      <h2>Skills</h2>
      <ul>
        <li>
          <strong>Languages & Runtime:</strong> Go, JavaScript, TypeScript, Node.js
        </li>
        <li>
          <strong>Frameworks & Libraries:</strong> Express, Socket.io, gRPC,
          WebSocket, Redis Client Libraries, Mongoose
        </li>
        <li>
          <strong>Databases & Message Queues:</strong> MongoDB, Redis, Apache
          Kafka, PostgreSQL
        </li>
        <li>
          <strong>System Design & Architecture:</strong> Microservices,
          Event-Driven Architecture, CQRS, Message Queues, Distributed Systems,
          Real-time Systems, Caching Strategies
        </li>
        <li>
          <strong>Backend Concepts:</strong> REST APIs, WebSocket Communication,
          Authentication/Authorization (JWT), Rate Limiting, Circuit Breaking,
          Idempotency, Dead Letter Queues, Eventual Consistency
        </li>
        <li>
          <strong>Domain Knowledge:</strong> Geospatial Queries, Driver-Passenger
          Matching Algorithms, Dynamic Pricing, ETA Calculations, Real-time
          Location Tracking
        </li>
        <li>
          <strong>DevOps & Infrastructure:</strong> Docker, Kubernetes, CI/CD
          (GitHub Actions), Infrastructure as Code, Load Balancing, Auto-scaling
        </li>
        <li>
          <strong>Monitoring & Observability:</strong> Logging, Metrics
          Collection, Distributed Tracing, Performance Monitoring, Error Tracking
        </li>
        <li>
          <strong>Development Tools:</strong> Git, Postman, VS Code, MongoDB
          Compass, Redis CLI, Kafka Tools
        </li>
        <li>
          <strong>Best Practices:</strong> Clean Code, API Design, Error Handling,
          Security Best Practices, Performance Optimization, Documentation
        </li>
      </ul>

      <hr />

      <h2>Contact</h2>
      <p>
        Email:{' '}
        <a
          href="mailto:vishwajeetbharadiya12@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vishwajeetbharadiya12@gmail.com
        </a>
      </p>

      <SiteFooter />
    </>
  )
}
