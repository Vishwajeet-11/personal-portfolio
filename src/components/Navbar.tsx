import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/navbar.css'

const navLinks = [
  { to: '/', text: 'Portfolio' },
  { to: '/projects', text: 'Projects' },
  { to: '/blog', text: 'Blog' },
  { to: '/system-designs', text: 'System Designs' },
  { to: '/testimonials', text: 'Testimonials' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  return (
    <>
      <header className="site-header">
        <button
          className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <nav className="navigation" aria-label="Main navigation">
          {navLinks.map(({ to, text }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              end={to === '/'}
              onClick={closeMenu}
            >
              {text}
            </NavLink>
          ))}
        </nav>
      </header>

      <div
        className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <button
            className="mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="mobile-nav-links">
          {navLinks.map(({ to, text }, index) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''} animate-in`
              }
              style={{ animationDelay: `${index * 0.08 + 0.1}s` }}
              end={to === '/'}
              onClick={closeMenu}
            >
              {text}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}
