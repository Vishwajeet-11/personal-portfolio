import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import '../styles/projects.css'

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const closeExpanded = useCallback(() => {
    setExpandedId(null)
    document.body.style.overflow = ''
  }, [])

  const toggleCard = useCallback((id: string) => {
    setExpandedId((prev) => {
      if (prev === id) {
        document.body.style.overflow = ''
        return null
      }
      document.body.style.overflow = 'hidden'
      return id
    })
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedId) closeExpanded()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [expandedId, closeExpanded])

  return (
    <>
      <h1 className="projects-header">Projects</h1>
      <p className="projects-subtitle">
        A showcase of my backend engineering work, focusing on scalable systems and
        real-time applications.
      </p>

      <div className="projects-container">
        {projects.map((project) => {
          const isExpanded = expandedId === project.title
          return (
            <div
              key={project.title}
              className={`project-card ${isExpanded ? 'expanded' : ''}`}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-card-summary">
                <button
                  type="button"
                  className="read-more-btn"
                  onClick={() => toggleCard(project.title)}
                >
                  Read More
                </button>
              </div>

              <div className="project-card-expanded">
                {project.sections.map((section) => (
                  <div key={section.title} className="project-section">
                    <h4 className="section-title">{section.title}</h4>
                    {section.content && (
                      <p className="section-content">{section.content}</p>
                    )}
                    <ul className="section-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="project-tech">
                  {project.tech.map(({ label, value }) => (
                    <div key={label} className="tech-item">
                      <strong>{label}</strong> {value}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="read-less-btn"
                  onClick={() => toggleCard(project.title)}
                >
                  Read Less
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {expandedId && (
        <div
          className="backdrop-overlay"
          role="presentation"
          onClick={closeExpanded}
        />
      )}

      <p style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to Portfolio</Link>
      </p>
    </>
  )
}
