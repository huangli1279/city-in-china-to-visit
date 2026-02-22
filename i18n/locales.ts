import {routing, type UrlLocale} from '@/i18n/routing'

export const CONTENT_LOCALES = ['en', 'zh-CN', 'ja', 'ko'] as const

export type ContentLocale = (typeof CONTENT_LOCALES)[number]

export const URL_TO_CONTENT_LOCALE_MAP: Record<UrlLocale, ContentLocale> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

export function isUrlLocale(value: string): value is UrlLocale {
  return (routing.locales as readonly string[]).includes(value)
}

export function normalizeUrlLocale(value?: string | null): UrlLocale {
  if (value && isUrlLocale(value)) {
    return value
  }

  return routing.defaultLocale
}

export function toContentLocale(value?: string | null): ContentLocale {
  return URL_TO_CONTENT_LOCALE_MAP[normalizeUrlLocale(value)]
}
