import { useEffect } from 'react'
import { SITE_URL } from '../config'

interface PageMeta {
  title: string
  description: string
  path: string
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    document.title = title
    upsertMeta('description', description)
    upsertMeta('og:title', title, 'property')
    upsertMeta('og:description', description, 'property')
    upsertMeta('og:url', `${SITE_URL}${path}`, 'property')
    upsertMeta('og:type', 'website', 'property')
    upsertMeta('twitter:card', 'summary', 'name')
    upsertMeta('twitter:title', title, 'name')
    upsertMeta('twitter:description', description, 'name')
    upsertLink('canonical', `${SITE_URL}${path}`)
  }, [title, description, path])
}
