import { useState } from 'react'
import { blogPosts } from '../data/blogPosts'
import '../styles/blog.css'

const POSTS_PER_PAGE = 2

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = blogPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )

  return (
    <main className="main-content">
      <h1 className="page-title">Build Logs</h1>

      <div className="blog-grid">
        {visiblePosts.map((post) => (
          <article key={post.title} className="blog-post">
            <header className="post-header">
              <h2 className="post-title">{post.title}</h2>
            </header>

            <div className="post-content">
              {post.sections.map((section) => (
                <section key={section.title} className="post-section">
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                </section>
              ))}
            </div>

            <footer className="post-footer">
              <dl className="post-meta">
                <dt>Technologies:</dt>
                <dd>{post.meta.technologies}</dd>

                <dt>Key Features:</dt>
                <dd>{post.meta.keyFeatures}</dd>

                <dt>{post.meta.focusLabel}:</dt>
                <dd>{post.meta.focus}</dd>
              </dl>
            </footer>
          </article>
        ))}
      </div>

      <div className="pagination">
        <button
          type="button"
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>

      <footer className="site-footer">
        <section className="contact-info">
          <h2>Contact</h2>
          <address>
            <p>
              Email:{' '}
              <a
                href="mailto:vishwajeetbharadiya12@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send email to vishwajeetbharadiya12@gmail.com"
              >
                vishwajeetbharadiya12@gmail.com
              </a>
            </p>
          </address>
        </section>
      </footer>
    </main>
  )
}
