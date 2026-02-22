import type { MetadataRoute } from 'next'
import { SITE_URL, SEO_LANGS } from '@/lib/seo'

export const dynamic = 'force-static'
import { ALL_GUIDES, CONTENT_UPDATE_LOG } from '@/content/guides/index'

const LEGAL_PAGES = ['about', 'contact', 'editorial-policy', 'content-updates', 'privacy-policy'] as const
const INDEXABLE_CONTENT_LANGS = ['en'] as const

const SITE_LAST_MOD = '2026-02-21'

// Map each guide slug to its most recent update date
const guideLastMod = new Map<string, string>()
for (const entry of CONTENT_UPDATE_LOG) {
  for (const slug of entry.guideSlugs) {
    if (!guideLastMod.has(slug)) {
      guideLastMod.set(slug, entry.dateISO)
    }
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of SEO_LANGS) {
    // Homepage
    entries.push({
      url: `${SITE_URL}/${lang}/`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: lang === 'en' ? 1.0 : 0.9,
    })

  }

  // English content pages are currently the only fully localized, indexable versions.
  for (const lang of INDEXABLE_CONTENT_LANGS) {
    // Legal pages
    for (const page of LEGAL_PAGES) {
      entries.push({
        url: `${SITE_URL}/${lang}/${page}/`,
        lastModified: SITE_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // Guides hub
    entries.push({
      url: `${SITE_URL}/${lang}/guides/`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    // Guide detail pages
    for (const guide of ALL_GUIDES) {
      entries.push({
        url: `${SITE_URL}/${lang}/guides/${guide.slug}/`,
        lastModified: guideLastMod.get(guide.slug) ?? SITE_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  return entries
}
