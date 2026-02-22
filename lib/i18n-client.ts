'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const SUPPORTED_I18N_LANGS = ['en', 'zh-CN', 'ja', 'ko'] as const
const NAMESPACES = ['common', 'questions', 'cities'] as const

type SupportedI18nLang = (typeof SUPPORTED_I18N_LANGS)[number]
type NamespaceName = (typeof NAMESPACES)[number]
type LocaleModule = { default: Record<string, unknown> }

const URL_TO_I18N_LANG: Record<string, SupportedI18nLang> = {
  en: 'en',
  zh: 'zh-CN',
  'zh-CN': 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

export function normalizeI18nLanguage(input?: string | null): SupportedI18nLang {
  if (!input) return 'en'
  return URL_TO_I18N_LANG[input] ?? 'en'
}

const RESOURCE_LOADERS: Record<SupportedI18nLang, Record<NamespaceName, () => Promise<LocaleModule>>> = {
  en: {
    common: () => import('@/content/locales/en/common.json'),
    questions: () => import('@/content/locales/en/questions.json'),
    cities: () => import('@/content/locales/en/cities.json'),
  },
  'zh-CN': {
    common: () => import('@/content/locales/zh-CN/common.json'),
    questions: () => import('@/content/locales/zh-CN/questions.json'),
    cities: () => import('@/content/locales/zh-CN/cities.json'),
  },
  ja: {
    common: () => import('@/content/locales/ja/common.json'),
    questions: () => import('@/content/locales/ja/questions.json'),
    cities: () => import('@/content/locales/ja/cities.json'),
  },
  ko: {
    common: () => import('@/content/locales/ko/common.json'),
    questions: () => import('@/content/locales/ko/questions.json'),
    cities: () => import('@/content/locales/ko/cities.json'),
  },
}

// Initialize synchronously at module load with empty resources.
// react-i18next v14 uses different internal hooks depending on whether
// i18next is initialized, causing a hook order violation between the first
// render (uninitialized) and subsequent renders (initialized). Calling init()
// here with initImmediate: false ensures a consistent initialized state from
// the very first render, so useTranslation always follows the same hook path.
i18n.use(initReactI18next).init({
  lng: 'en',
  resources: { en: { common: {}, questions: {}, cities: {} } },
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_I18N_LANGS],
  interpolation: { escapeValue: false },
  defaultNS: 'common',
  ns: [...NAMESPACES],
  initImmediate: false,
})

const loadedLanguages = new Set<SupportedI18nLang>()
const loadingLanguages = new Map<SupportedI18nLang, Promise<void>>()
let ensureEnPromise: Promise<void> | null = null

async function loadAndAddLanguage(language: SupportedI18nLang): Promise<void> {
  if (loadedLanguages.has(language)) return

  const inFlight = loadingLanguages.get(language)
  if (inFlight) {
    await inFlight
    return
  }

  const loadPromise = (async () => {
    const entries = await Promise.all(
      NAMESPACES.map(async (namespace) => {
        const module = await RESOURCE_LOADERS[language][namespace]()
        return [namespace, module.default] as const
      })
    )
    for (const [namespace, data] of entries) {
      i18n.addResourceBundle(language, namespace, data, true, true)
    }
    loadedLanguages.add(language)
  })()

  loadingLanguages.set(language, loadPromise)
  try {
    await loadPromise
  } finally {
    loadingLanguages.delete(language)
  }
}

export async function ensureI18nLanguage(input?: string | null): Promise<SupportedI18nLang> {
  const language = normalizeI18nLanguage(input)

  // Always include English fallback. Load target language in parallel to avoid waterfalls.
  if (!ensureEnPromise) {
    ensureEnPromise = loadAndAddLanguage('en')
  }

  const targetLoadPromise = language === 'en' ? ensureEnPromise : loadAndAddLanguage(language)
  await Promise.all([ensureEnPromise, targetLoadPromise])

  if (i18n.resolvedLanguage !== language) {
    await i18n.changeLanguage(language)
  }

  return language
}

export default i18n
