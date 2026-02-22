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

const loadedLanguages = new Set<SupportedI18nLang>()
let initPromise: Promise<void> | null = null

async function loadLanguageResources(language: SupportedI18nLang) {
  const entries = await Promise.all(
    NAMESPACES.map(async (namespace) => {
      const module = await RESOURCE_LOADERS[language][namespace]()
      return [namespace, module.default] as const
    })
  )
  return Object.fromEntries(entries) as Record<NamespaceName, Record<string, unknown>>
}

async function doInit(initialLanguage: SupportedI18nLang) {
  const languages: SupportedI18nLang[] = initialLanguage === 'en' ? ['en'] : ['en', initialLanguage]
  const entries = await Promise.all(
    languages.map(async (language) => {
      const resources = await loadLanguageResources(language)
      loadedLanguages.add(language)
      return [language, resources] as const
    })
  )
  const preloaded = Object.fromEntries(entries) as Record<
    SupportedI18nLang,
    Record<NamespaceName, Record<string, unknown>>
  >

  await i18n.use(initReactI18next).init({
    lng: initialLanguage,
    resources: preloaded,
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_I18N_LANGS],
    interpolation: { escapeValue: false },
    defaultNS: 'common',
    ns: [...NAMESPACES],
  })
}

export async function ensureI18nLanguage(input?: string | null): Promise<SupportedI18nLang> {
  const language = normalizeI18nLanguage(input)

  if (!initPromise) {
    initPromise = doInit(language)
  }
  await initPromise

  if (!loadedLanguages.has(language)) {
    const resources = await loadLanguageResources(language)
    for (const namespace of NAMESPACES) {
      i18n.addResourceBundle(language, namespace, resources[namespace], true, true)
    }
    loadedLanguages.add(language)
  }

  if (i18n.resolvedLanguage !== language) {
    await i18n.changeLanguage(language)
  }

  return language
}

export default i18n
