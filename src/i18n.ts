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

const RESOURCE_LOADERS: Record<SupportedI18nLang, Record<NamespaceName, () => Promise<LocaleModule>>> = {
  en: {
    common: () => import('./locales/en/common.json'),
    questions: () => import('./locales/en/questions.json'),
    cities: () => import('./locales/en/cities.json'),
  },
  'zh-CN': {
    common: () => import('./locales/zh-CN/common.json'),
    questions: () => import('./locales/zh-CN/questions.json'),
    cities: () => import('./locales/zh-CN/cities.json'),
  },
  ja: {
    common: () => import('./locales/ja/common.json'),
    questions: () => import('./locales/ja/questions.json'),
    cities: () => import('./locales/ja/cities.json'),
  },
  ko: {
    common: () => import('./locales/ko/common.json'),
    questions: () => import('./locales/ko/questions.json'),
    cities: () => import('./locales/ko/cities.json'),
  },
}

const loadedLanguages = new Set<SupportedI18nLang>()
let initializationPromise: Promise<void> | null = null

export function normalizeI18nLanguage(input?: string | null): SupportedI18nLang {
  if (!input) return 'en'
  return URL_TO_I18N_LANG[input] ?? 'en'
}

function detectInitialLanguage(): SupportedI18nLang {
  if (typeof window === 'undefined') return 'en'
  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
  return normalizeI18nLanguage(firstSegment)
}

async function loadLanguageResources(language: SupportedI18nLang) {
  const entries = await Promise.all(
    NAMESPACES.map(async (namespace) => {
      const module = await RESOURCE_LOADERS[language][namespace]()
      return [namespace, module.default] as const
    })
  )

  return Object.fromEntries(entries) as Record<NamespaceName, Record<string, unknown>>
}

export async function ensureLanguageResources(input?: string | null) {
  const language = normalizeI18nLanguage(input)
  if (loadedLanguages.has(language)) return language

  const resources = await loadLanguageResources(language)
  for (const namespace of NAMESPACES) {
    i18n.addResourceBundle(language, namespace, resources[namespace], true, true)
  }

  loadedLanguages.add(language)
  return language
}

export async function initializeI18n() {
  if (initializationPromise) return initializationPromise

  initializationPromise = (async () => {
    const initialLanguage = detectInitialLanguage()
    const preloadLanguages = initialLanguage === 'en' ? ['en'] : ['en', initialLanguage]
    const entries = await Promise.all(
      preloadLanguages.map(async (language) => {
        const normalized = normalizeI18nLanguage(language)
        const resources = await loadLanguageResources(normalized)
        loadedLanguages.add(normalized)
        return [normalized, resources] as const
      })
    )

    const preloadedResources = Object.fromEntries(entries) as Record<
      SupportedI18nLang,
      Record<NamespaceName, Record<string, unknown>>
    >

    await i18n.use(initReactI18next).init({
      lng: initialLanguage,
      resources: preloadedResources,
      fallbackLng: 'en',
      supportedLngs: [...SUPPORTED_I18N_LANGS],
      interpolation: {
        escapeValue: false,
      },
      defaultNS: 'common',
      ns: [...NAMESPACES],
    })
  })()

  return initializationPromise
}

export async function ensureI18nLanguage(input?: string | null) {
  const language = await ensureLanguageResources(input)
  if (i18n.resolvedLanguage !== language) {
    await i18n.changeLanguage(language)
  }
  return language
}

export default i18n
