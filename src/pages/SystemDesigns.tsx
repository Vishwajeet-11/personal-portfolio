import { useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import SiteFooter from '../components/SiteFooter'
import '../styles/system-designs.css'

interface DesignItem {
  id: string
  lightSrc: string
  darkSrc: string
  alt: string
  caption: string
}

const designs: DesignItem[] = [
  {
    id: 'img1',
    lightSrc: '/assets/images/E-commerce-system-design.png',
    darkSrc: '/assets/images/E-commerce-system-design.png',
    alt: 'E-commerce Application',
    caption: 'E-commerce Application',
  },
  {
    id: 'img4',
    lightSrc: '/assets/images/kyc-verification.png',
    darkSrc: '/assets/images/kyc-verification-dark.png',
    alt: 'KYC and Face-Recognition System',
    caption: 'KYC and Face-Recognition System',
  },
  {
    id: 'img5',
    lightSrc: '/assets/images/netflix-system-design.png',
    darkSrc: '/assets/images/netflix-system-design-dark.png',
    alt: 'Netflix System Design',
    caption: 'Netflix System Design',
  },
  {
    id: 'img6',
    lightSrc: '/assets/images/chat-app.png',
    darkSrc: '/assets/images/chat-app-dark.png',
    alt: 'Distributed Messaging Platform',
    caption: 'Distributed Messaging Platform',
  },
]

export default function SystemDesigns() {
  const [lightboxId, setLightboxId] = useState<string | null>(null)

  usePageMeta({
    title: 'System Design – Backend Developer Portfolio | Vishwajeet Bharadia',
    description:
      'System design diagrams by Backend Developer Vishwajeet Bharadia — e-commerce, KYC, streaming, and distributed messaging platforms.',
    path: '/system-designs',
  })

  return (
    <>
      <h1>System Design Diagrams</h1>
      <p>Click an image to view it in full-screen mode.</p>

      <div className="grid-container">
        {designs.map(({ id, lightSrc, darkSrc, alt, caption }) => (
          <div key={id} className="grid-item">
            <button
              type="button"
              className="grid-item-btn"
              onClick={() => setLightboxId(id)}
              aria-label={`View ${alt} in full screen`}
            >
              {lightSrc === darkSrc ? (
                <img src={lightSrc} alt={alt} />
              ) : (
                <>
                  <img src={lightSrc} alt={alt} className="theme-light" />
                  <img src={darkSrc} alt={alt} className="theme-dark" />
                </>
              )}
            </button>
            <div className="caption">{caption}</div>
          </div>
        ))}
      </div>

      {/* Lightbox modals */}
      {lightboxId && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            className="close-btn"
            onClick={() => setLightboxId(null)}
            aria-label="Close lightbox"
          >
            ✖
          </button>
          {designs
            .filter((d) => d.id === lightboxId)
            .map(({ lightSrc, darkSrc, alt }) =>
              lightSrc === darkSrc ? (
                <img key={lightSrc} src={lightSrc} alt={alt} />
              ) : (
                <div key={alt} className="lightbox-images">
                  <img src={lightSrc} alt={alt} className="theme-light" />
                  <img src={darkSrc} alt={alt} className="theme-dark" />
                </div>
              )
            )}
        </div>
      )}

      <SiteFooter />
    </>
  )
}
