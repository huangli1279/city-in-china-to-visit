import type { MetadataRoute } from 'next'
import { ALL_GUIDES, CONTENT_UPDATE_LOG } from '@/content/guides/index'
import { getIndexableLangs, type IndexablePageId } from '@/lib/indexing'
import { buildNextAlternates, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

const STATIC_PAGES = [
  'about',
  'contact',
  'editorial-policy',
  'content-updates',
  'privacy-policy',
  'terms',
] as const satisfies readonly IndexablePageId[]

const SITE_LAST_MOD = new Date().toISOString().slice(0, 10)

// Map each guide slug to its most recent update date
const guideLastMod = new Map<string, string>()
for (const entry of CONTENT_UPDATE_LOG) {
  for (const slug of entry.guideSlugs) {
    if (!guideLastMod.has(slug)) {
      guideLastMod.set(slug, entry.dateISO)
    }
  }
}

function withLanguageAlternates(page: IndexablePageId, suffix?: string): Pick<MetadataRoute.Sitemap[number], 'alternates'> {
  const langs = getIndexableLangs(page)
  if (langs.length < 2) return {}
  return { alternates: { languages: buildNextAlternates(suffix, langs) } }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of getIndexableLangs('home')) {
    entries.push({
      url: `${SITE_URL}/${lang}/`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1.0,
      ...withLanguageAlternates('home'),
    })
  }

  for (const page of STATIC_PAGES) {
    for (const lang of getIndexableLangs(page)) {
      entries.push({
        url: `${SITE_URL}/${lang}/${page}/`,
        lastModified: SITE_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.7,
        ...withLanguageAlternates(page, `${page}/`),
      })
    }
  }

  for (const lang of getIndexableLangs('guides')) {
    entries.push({
      url: `${SITE_URL}/${lang}/guides/`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.8,
      ...withLanguageAlternates('guides', 'guides/'),
    })

    for (const guide of ALL_GUIDES) {
      entries.push({
        url: `${SITE_URL}/${lang}/guides/${guide.slug}/`,
        lastModified: guideLastMod.get(guide.slug) ?? SITE_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.8,
        ...withLanguageAlternates('guide', `guides/${guide.slug}/`),
      })
    }
  }

  return entries
}
