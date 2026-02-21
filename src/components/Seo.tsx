import { useEffect } from 'react'
import type { AlternateLink } from '../seo/config'
import { toAbsoluteUrl } from '../seo/config'

type JsonLdObject = Record<string, unknown>

interface SeoProps {
  title: string
  description: string
  canonicalPath: string
  alternates?: AlternateLink[]
  ogLocale?: string
  ogLocaleAlternates?: string[]
  robots?: string
  ogType?: 'website' | 'article'
  ogImage?: string
  jsonLd?: JsonLdObject | JsonLdObject[]
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

const DEFAULT_OG_IMAGE = 'https://bestcityinchina.site/og-image.svg'

export default function Seo({
  title,
  description,
  canonicalPath,
  alternates = [],
  ogLocale = 'en_US',
  ogLocaleAlternates = ['zh_CN', 'ja_JP', 'ko_KR'],
  robots = 'index,follow',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoProps) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath)
  const serializedJsonLd = JSON.stringify(jsonLd ?? [])

  useEffect(() => {
    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:locale', ogLocale)
    upsertMeta('property', 'og:image', ogImage)

    document.head.querySelectorAll('meta[data-seo-og-locale-alt="true"]').forEach((tag) => tag.remove())
    ogLocaleAlternates.forEach((locale) => {
      const tag = document.createElement('meta')
      tag.setAttribute('property', 'og:locale:alternate')
      tag.setAttribute('content', locale)
      tag.setAttribute('data-seo-og-locale-alt', 'true')
      document.head.appendChild(tag)
    })

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertCanonical(canonicalUrl)

    document.head.querySelectorAll('link[data-seo-alt="true"]').forEach((link) => link.remove())
    alternates.forEach((alternate) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', alternate.hreflang)
      link.setAttribute('href', alternate.href)
      link.setAttribute('data-seo-alt', 'true')
      document.head.appendChild(link)
    })

    document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((tag) => tag.remove())
    const entries = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
    entries.forEach((entry) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', 'true')
      script.text = JSON.stringify(entry)
      document.head.appendChild(script)
    })
  }, [
    alternates,
    canonicalUrl,
    description,
    jsonLd,
    ogImage,
    ogLocale,
    ogLocaleAlternates,
    ogType,
    robots,
    serializedJsonLd,
    title,
  ])

  return null
}
