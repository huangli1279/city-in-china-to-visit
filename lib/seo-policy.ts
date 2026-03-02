import { isIndexableContentLang, PRIMARY_INDEXABLE_CONTENT_LANG } from '@/lib/indexing'
import { buildNextAlternates, toAbsoluteUrl } from '@/lib/seo'

function normalizePathSuffix(suffix?: string): string {
  if (!suffix || suffix === '/') return '/'
  return suffix.startsWith('/') ? suffix : `/${suffix}`
}

function normalizeAlternatesSuffix(suffix?: string): string | undefined {
  if (!suffix || suffix === '/') return undefined
  return suffix.startsWith('/') ? suffix.slice(1) : suffix
}

export function getCanonicalContentLang(lang: string): string {
  return isIndexableContentLang(lang) ? lang : PRIMARY_INDEXABLE_CONTENT_LANG
}

export function getLocaleRobots(lang: string): 'index, follow' | 'noindex, follow' {
  return isIndexableContentLang(lang) ? 'index, follow' : 'noindex, follow'
}

export function buildLocaleSeoPolicy(lang: string, suffix?: string) {
  const canonicalLang = getCanonicalContentLang(lang)
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}${normalizePathSuffix(suffix)}`)
  const robots = getLocaleRobots(lang)
  const isIndexable = isIndexableContentLang(lang)

  return {
    isIndexable,
    canonicalLang,
    canonicalUrl,
    robots,
    alternates: isIndexable
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates(normalizeAlternatesSuffix(suffix)),
        }
      : {
          canonical: canonicalUrl,
        },
  }
}

export function ensureMinMetaDescription(description: string, min = 130): string {
  const normalized = description.trim()
  if (normalized.length >= min) return normalized
  return `${normalized} Use comparison frameworks, pacing templates, and backup planning rules before booking.`
}
