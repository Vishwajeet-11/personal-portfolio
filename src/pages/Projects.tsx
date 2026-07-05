import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import SiteFooter from '../components/SiteFooter'
import '../styles/projects.css'

export default function Projects() {
  usePageMeta({
    title: 'Backend Developer Projects – Vishwajeet Bharadia',
    description:
      'Backend Developer portfolio projects by Vishwajeet Bharadia — microservices, real-time systems, ride-hailing, video streaming, and chat at scale.',
    path: '/projects',
  })

  return (
    <>
      <h1 className="projects-header">Projects</h1>
      <p className="projects-subtitle">
        Backend developer projects focused on scalable systems, microservices, and
        real-time applications. Each project includes a full case study.
      </p>

      <div className="projects-container">
        {projects.map((project) => (
          <article key={project.slug} className="project-card">
            <h2 className="project-title">
              <Link to={`/projects/${project.slug}`}>{project.title}</Link>
            </h2>
            <p className="project-description">{project.description}</p>
            <ul className="project-card-highlights">
              {project.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link to={`/projects/${project.slug}`} className="read-more-btn">
              Read Case Study →
            </Link>
          </article>
        ))}
      </div>

      <SiteFooter />
    </>
  )
}
