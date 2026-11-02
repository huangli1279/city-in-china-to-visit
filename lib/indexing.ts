/**
 * Indexing is per page, not per locale.
 *
 * Body-copy audit (titles and meta descriptions are not enough):
 * - home: zh/ja/ko copy in content/locales is actually written in that language
 *   (homepage sections, FAQ, and city blurbs).
 * - guides index and guide articles: the article body lives in content/guides
 *   and is English on every locale. Non-English pages only swap card titles.
 * - about, contact, privacy-policy, editorial-policy, content-updates, terms:
 *   the visible article is English JSX. Other locales only have translated
 *   <title> and meta description, where those exist.
 *
 * Quiz and result strings are translated, but those routes stay noindex on
 * every locale (utility pages, also disallowed in robots.txt).
 */

export const URL_LANGS = ['en', 'zh', 'ja', 'ko'] as const

export type IndexablePageId =
  | 'home'
  | 'guides'
  | 'guide'
  | 'about'
  | 'contact'
  | 'editorial-policy'
  | 'content-updates'
  | 'privacy-policy'
  | 'terms'

const PAGE_INDEXABLE_LANGS: Record<IndexablePageId, readonly string[]> = {
  home: ['en', 'zh', 'ja', 'ko'],
  guides: ['en'],
  guide: ['en'],
  about: ['en'],
  contact: ['en'],
  'editorial-policy': ['en'],
  'content-updates': ['en'],
  'privacy-policy': ['en'],
  terms: ['en'],
}

/** Locales where the shared editorial cluster (guides and legal pages) is translated. */
export const INDEXABLE_CONTENT_LANGS = ['en'] as const

export type IndexableContentLang = (typeof INDEXABLE_CONTENT_LANGS)[number]

export const PRIMARY_INDEXABLE_CONTENT_LANG: IndexableContentLang = INDEXABLE_CONTENT_LANGS[0]

const STATIC_PAGE_IDS = new Set<string>([
  'about',
  'contact',
  'editorial-policy',
  'content-updates',
  'privacy-policy',
  'terms',
])

export function pageIdFromSuffix(suffix?: string): IndexablePageId {
  const normalized = (suffix ?? '').replace(/^\/+|\/+$/g, '')
  if (!normalized) return 'home'
  if (normalized === 'guides') return 'guides'
  if (normalized.startsWith('guides/')) return 'guide'
  if (STATIC_PAGE_IDS.has(normalized)) return normalized as IndexablePageId
  return 'home'
}

export function getIndexableLangs(page: IndexablePageId): readonly string[] {
  return PAGE_INDEXABLE_LANGS[page]
}

export function isPageIndexable(lang: string, page: IndexablePageId): boolean {
  return PAGE_INDEXABLE_LANGS[page].includes(lang)
}

export function isIndexableContentLang(lang: string): lang is IndexableContentLang {
  return (INDEXABLE_CONTENT_LANGS as readonly string[]).includes(lang)
}

const STATIC_PAGE_PATH: Record<Exclude<IndexablePageId, 'home' | 'guide'>, string> = {
  guides: 'guides',
  about: 'about',
  contact: 'contact',
  'editorial-policy': 'editorial-policy',
  'content-updates': 'content-updates',
  'privacy-policy': 'privacy-policy',
  terms: 'terms',
}

/** Public path for a page. Untranslated locales resolve to the indexable English URL. */
export function contentHref(lang: string, page: IndexablePageId, slug?: string): string {
  const useLang = isPageIndexable(lang, page) ? lang : PRIMARY_INDEXABLE_CONTENT_LANG
  if (page === 'home') return `/${useLang}/`
  if (page === 'guide') return `/${useLang}/guides/${slug ?? ''}/`.replace(/\/{2,}/g, '/')
  return `/${useLang}/${STATIC_PAGE_PATH[page]}/`
}

/**
 * Path to show in localized navigation and listings.
 * Returns null when that locale's copy is untranslated and therefore noindexed.
 */
export function listingHref(lang: string, page: IndexablePageId, slug?: string): string | null {
  if (!isPageIndexable(lang, page)) return null
  return contentHref(lang, page, slug)
}

/** Language switch target. Untranslated pages send the reader to that locale's homepage. */
export function languageSwitchPath(targetLang: string, pathname: string): string {
  const segments = (pathname || '/').split('/').filter(Boolean)
  const suffix = segments.slice(1).join('/')
  if (!suffix) return `/${targetLang}/`
  if (suffix === 'quiz' || suffix === 'result') return `/${targetLang}/${suffix}/`
  if (!isPageIndexable(targetLang, pageIdFromSuffix(suffix))) return `/${targetLang}/`
  return `/${targetLang}/${suffix}/`
}
