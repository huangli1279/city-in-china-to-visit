const DEFAULT_SITE_URL = 'https://bestcityinchina.site'

export const SEO_LANGS = ['en', 'zh', 'ja', 'ko'] as const
export type SeoLang = (typeof SEO_LANGS)[number]

const HREFLANG_MAP: Record<SeoLang, string> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '')

function normalizeLang(lang: string): SeoLang {
  return (SEO_LANGS as readonly string[]).includes(lang) ? (lang as SeoLang) : 'en'
}

function normalizeSuffix(suffix?: string): string {
  if (!suffix || suffix === '/') return ''
  return suffix.startsWith('/') ? suffix : `/${suffix}`
}

export function buildLangPath(lang: string, suffix?: string): string {
  return `/${normalizeLang(lang)}${normalizeSuffix(suffix)}`
}

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export interface AlternateLink {
  hreflang: string
  href: string
}

export function buildAlternates(suffix?: string): AlternateLink[] {
  const normalizedSuffix = normalizeSuffix(suffix)
  const links = SEO_LANGS.map((lang) => ({
    hreflang: HREFLANG_MAP[lang],
    href: toAbsoluteUrl(`/${lang}${normalizedSuffix}`),
  }))
  links.push({
    hreflang: 'x-default',
    href: toAbsoluteUrl(`/en${normalizedSuffix}`),
  })
  return links
}
