import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Portfolio' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/system-designs', label: 'System Designs' },
  { to: '/testimonials', label: 'Testimonials' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer-nav">
      <nav aria-label="Site sections">
        <ul className="footer-nav-links">
          {footerLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
