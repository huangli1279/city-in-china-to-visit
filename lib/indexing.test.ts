import { describe, expect, it } from 'vitest'
import { contentHref, languageSwitchPath, listingHref } from '@/lib/indexing'

describe('localized navigation paths', () => {
  it('keeps legal links on the indexable English URL when the locale page is untranslated', () => {
    expect(contentHref('zh', 'about')).toBe('/en/about/')
    expect(contentHref('ja', 'contact')).toBe('/en/contact/')
    expect(contentHref('ko', 'privacy-policy')).toBe('/en/privacy-policy/')
    expect(contentHref('en', 'terms')).toBe('/en/terms/')
  })

  it('hides guide listings on locales where the article is not translated', () => {
    expect(listingHref('zh', 'guides')).toBeNull()
    expect(listingHref('ja', 'guide', 'hangzhou-travel-guide-first-trip')).toBeNull()
    expect(listingHref('en', 'guides')).toBe('/en/guides/')
    expect(listingHref('en', 'guide', 'hangzhou-travel-guide-first-trip')).toBe(
      '/en/guides/hangzhou-travel-guide-first-trip/'
    )
  })

  it('sends the language switcher to a translated homepage instead of a noindexed copy', () => {
    expect(languageSwitchPath('zh', '/en/guides/hangzhou-travel-guide-first-trip/')).toBe('/zh/')
    expect(languageSwitchPath('en', '/zh/about/')).toBe('/en/about/')
    expect(languageSwitchPath('ja', '/zh/')).toBe('/ja/')
    expect(languageSwitchPath('ko', '/en/quiz/')).toBe('/ko/quiz/')
  })
})
