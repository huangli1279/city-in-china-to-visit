import { getIndexableLangs, isPageIndexable, pageIdFromSuffix, type IndexablePageId } from '@/lib/indexing'
import { buildNextAlternates, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'

function normalizePathSuffix(suffix?: string): string {
  if (!suffix || suffix === '/') return '/'
  return suffix.startsWith('/') ? suffix : `/${suffix}`
}

function normalizeAlternatesSuffix(suffix?: string): string | undefined {
  if (!suffix || suffix === '/') return undefined
  return suffix.startsWith('/') ? suffix.slice(1) : suffix
}

export function getCanonicalContentLang(lang: string, page: IndexablePageId): string {
  return isPageIndexable(lang, page) ? lang : getIndexableLangs(page)[0]
}

export function getLocaleRobots(lang: string, page: IndexablePageId): 'index, follow' | 'noindex, follow' {
  return isPageIndexable(lang, page) ? 'index, follow' : 'noindex, follow'
}

export function buildLocaleSeoPolicy(lang: string, suffix?: string) {
  const page = pageIdFromSuffix(suffix)
  const indexableLangs = getIndexableLangs(page)
  const canonicalLang = getCanonicalContentLang(lang, page)
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}${normalizePathSuffix(suffix)}`)
  const robots = getLocaleRobots(lang, page)
  const isIndexable = isPageIndexable(lang, page)
  const languages =
    isIndexable && indexableLangs.length > 1
      ? buildNextAlternates(normalizeAlternatesSuffix(suffix), indexableLangs)
      : undefined

  return {
    isIndexable,
    page,
    canonicalLang,
    canonicalUrl,
    robots,
    alternates: languages
      ? {
          canonical: canonicalUrl,
          languages,
        }
      : {
          canonical: canonicalUrl,
        },
    ogLocaleAlternates: isIndexable ? buildOgLocaleAlternates(lang, indexableLangs) : [],
  }
}

export function ensureMinMetaDescription(description: string, min = 130): string {
  const normalized = description.trim()
  if (normalized.length >= min) return normalized
  return `${normalized} Use comparison frameworks, pacing templates, and backup planning rules before booking.`
}
