import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOtherProjects, getProjectBySlug } from '../data/projects'
import { SITE_URL } from '../config'
import { usePageMeta } from '../hooks/usePageMeta'
import SiteFooter from '../components/SiteFooter'
import '../styles/projects.css'

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  usePageMeta({
    title: project
      ? `${project.shortTitle} Case Study – Backend Developer | Vishwajeet Bharadia`
      : 'Project Not Found – Vishwajeet Bharadia',
    description: project?.seoDescription ?? 'Project case study not found.',
    path: project ? `/projects/${project.slug}` : '/projects',
  })

  useEffect(() => {
    if (!project) return

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'project-schema'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.seoDescription,
      url: `${SITE_URL}/projects/${project.slug}`,
      author: {
        '@type': 'Person',
        name: 'Vishwajeet Bharadia',
        jobTitle: 'Backend Developer',
        url: SITE_URL,
      },
      keywords: project.tech
        .find(({ label }) => label === 'Tech Stack:')
        ?.value.split(',')
        .map((item) => item.trim())
        .join(', '),
    })

    document.head.appendChild(script)
    return () => {
      document.getElementById('project-schema')?.remove()
    }
  }, [project])

  if (!project) {
    return (
      <>
        <h1>Project Not Found</h1>
        <p>The project you are looking for does not exist.</p>
        <p>
          <Link to="/projects">← Back to all projects</Link>
        </p>
        <SiteFooter />
      </>
    )
  }

  const otherProjects = getOtherProjects(project.slug)

  return (
    <article className="case-study">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Portfolio</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/projects">Projects</Link>
        <span aria-hidden="true"> / </span>
        <span>{project.shortTitle}</span>
      </nav>

      <header className="case-study-header">
        <h1>{project.title}</h1>
        <p className="case-study-lead">{project.description}</p>
      </header>

      <section className="case-study-overview">
        <h2>Overview</h2>
        <ul className="case-study-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      {project.sections.map((section) => (
        <section key={section.title} className="case-study-section">
          <h2>{section.title}</h2>
          {section.content && <p className="section-content">{section.content}</p>}
          <ul className="section-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className="case-study-tech">
        <h2>Tech Stack & Goals</h2>
        <div className="project-tech">
          {project.tech.map(({ label, value }) => (
            <div key={label} className="tech-item">
              <strong>{label}</strong> {value}
            </div>
          ))}
        </div>
      </section>

      <section className="related-projects">
        <h2>More Backend Projects</h2>
        <ul className="related-projects-list">
          {otherProjects.map(({ slug, shortTitle, description }) => (
            <li key={slug}>
              <Link to={`/projects/${slug}`}>
                <strong>{shortTitle}</strong>
              </Link>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="case-study-back">
        <Link to="/projects">← All projects</Link>
      </p>

      <SiteFooter />
    </article>
  )
}
