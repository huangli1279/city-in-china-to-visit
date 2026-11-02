import { describe, expect, it } from 'vitest'
import { buildLocaleSeoPolicy } from '@/lib/seo-policy'

const SITE = 'https://bestcityinchina.site'

describe('buildLocaleSeoPolicy', () => {
  it('indexes translated homepages and points hreflang only at those locales', () => {
    const zh = buildLocaleSeoPolicy('zh')
    expect(zh.robots).toBe('index, follow')
    expect(zh.canonicalUrl).toBe(`${SITE}/zh/`)
    expect(zh.alternates.languages).toEqual({
      en: `${SITE}/en/`,
      'zh-CN': `${SITE}/zh/`,
      ja: `${SITE}/ja/`,
      ko: `${SITE}/ko/`,
      'x-default': `${SITE}/en/`,
    })
    expect(zh.ogLocaleAlternates).toEqual(['en_US', 'ja_JP', 'ko_KR'])
  })

  it('noindexes untranslated guide pages and does not hreflang them from English', () => {
    const zhGuide = buildLocaleSeoPolicy('zh', 'guides/best-city-to-visit-in-china-first-time/')
    expect(zhGuide.robots).toBe('noindex, follow')
    expect(zhGuide.canonicalUrl).toBe(`${SITE}/en/guides/best-city-to-visit-in-china-first-time/`)
    expect(zhGuide.alternates).toEqual({ canonical: zhGuide.canonicalUrl })
    expect(zhGuide.ogLocaleAlternates).toEqual([])

    const enGuide = buildLocaleSeoPolicy('en', 'guides/best-city-to-visit-in-china-first-time/')
    expect(enGuide.robots).toBe('index, follow')
    expect(enGuide.canonicalUrl).toBe(`${SITE}/en/guides/best-city-to-visit-in-china-first-time/`)
    expect(enGuide.alternates.languages).toBeUndefined()
    expect(enGuide.ogLocaleAlternates).toEqual([])
  })

  it('noindexes untranslated legal pages, including terms outside English', () => {
    for (const suffix of ['about/', 'contact/', 'privacy-policy/', 'editorial-policy/', 'content-updates/', 'guides/']) {
      const ja = buildLocaleSeoPolicy('ja', suffix)
      expect(ja.robots).toBe('noindex, follow')
      expect(ja.canonicalUrl).toBe(`${SITE}/en/${suffix}`)
      expect(ja.alternates.languages).toBeUndefined()
    }

    const enTerms = buildLocaleSeoPolicy('en', 'terms/')
    expect(enTerms.robots).toBe('index, follow')
    expect(enTerms.canonicalUrl).toBe(`${SITE}/en/terms/`)
    expect(enTerms.alternates.languages).toBeUndefined()

    const koTerms = buildLocaleSeoPolicy('ko', 'terms/')
    expect(koTerms.robots).toBe('noindex, follow')
    expect(koTerms.canonicalUrl).toBe(`${SITE}/en/terms/`)
    expect(koTerms.alternates.languages).toBeUndefined()
  })
})
