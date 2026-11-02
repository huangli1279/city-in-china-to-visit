const DEFAULT_SITE_URL = 'https://bestcityinchina.site'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '')

export const SEO_LANGS = ['en', 'zh', 'ja', 'ko'] as const
export type SeoLang = (typeof SEO_LANGS)[number]

const HREFLANG_MAP: Record<SeoLang, string> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

const OG_LOCALE_MAP: Record<SeoLang, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
}

export const URL_LANG_TO_HTML: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

function normalizeLang(lang: string): SeoLang {
  return (SEO_LANGS as readonly string[]).includes(lang) ? (lang as SeoLang) : 'en'
}

function normalizeSuffix(suffix?: string): string {
  if (!suffix || suffix === '/') return '/'
  return suffix.startsWith('/') ? suffix : `/${suffix}`
}

export function buildLangPath(lang: string, suffix?: string): string {
  return `/${normalizeLang(lang)}${normalizeSuffix(suffix)}`
}

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

/** For Next.js Metadata API `alternates.languages`. Only pass indexable locales. */
export function buildNextAlternates(
  suffix?: string,
  langs: readonly string[] = SEO_LANGS,
): Record<string, string> {
  const normalizedSuffix = normalizeSuffix(suffix)
  const languages: Record<string, string> = {}
  for (const lang of langs) {
    if (!(SEO_LANGS as readonly string[]).includes(lang)) continue
    const seoLang = lang as SeoLang
    languages[HREFLANG_MAP[seoLang]] = toAbsoluteUrl(`/${seoLang}${normalizedSuffix}`)
  }
  const defaultLang = langs.includes('en') ? 'en' : langs.find((lang) => (SEO_LANGS as readonly string[]).includes(lang))
  if (defaultLang) {
    languages['x-default'] = toAbsoluteUrl(`/${defaultLang}${normalizedSuffix}`)
  }
  return languages
}

export function buildOgLocale(lang: string): string {
  return OG_LOCALE_MAP[normalizeLang(lang)]
}

export function buildOgLocaleAlternates(lang: string, langs: readonly string[] = SEO_LANGS): string[] {
  const allowed = new Set(langs)
  const currentOgLocale = buildOgLocale(lang)
  return SEO_LANGS.filter((localeLang) => allowed.has(localeLang))
    .map((localeLang) => OG_LOCALE_MAP[localeLang])
    .filter((locale) => locale !== currentOgLocale)
}

export interface AlternateLink {
  hreflang: string
  href: string
}

export function buildAlternates(suffix?: string, langs: readonly string[] = SEO_LANGS): AlternateLink[] {
  const normalizedSuffix = normalizeSuffix(suffix)
  const selected = SEO_LANGS.filter((lang) => langs.includes(lang))
  const links: AlternateLink[] = selected.map((lang) => ({
    hreflang: HREFLANG_MAP[lang],
    href: toAbsoluteUrl(`/${lang}${normalizedSuffix}`),
  }))
  const defaultLang = selected.includes('en') ? 'en' : selected[0]
  if (defaultLang) {
    links.push({
      hreflang: 'x-default',
      href: toAbsoluteUrl(`/${defaultLang}${normalizedSuffix}`),
    })
  }
  return links
}
