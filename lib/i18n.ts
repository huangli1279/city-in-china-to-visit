import enCommon from '@/content/locales/en/common.json'
import enQuestions from '@/content/locales/en/questions.json'
import enCities from '@/content/locales/en/cities.json'
import zhCommon from '@/content/locales/zh-CN/common.json'
import zhQuestions from '@/content/locales/zh-CN/questions.json'
import zhCities from '@/content/locales/zh-CN/cities.json'
import jaCommon from '@/content/locales/ja/common.json'
import jaQuestions from '@/content/locales/ja/questions.json'
import jaCities from '@/content/locales/ja/cities.json'
import koCommon from '@/content/locales/ko/common.json'
import koQuestions from '@/content/locales/ko/questions.json'
import koCities from '@/content/locales/ko/cities.json'

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
type Namespace = Record<string, JsonValue>

const resources: Record<string, Record<string, Namespace>> = {
  en: {
    common: enCommon as Namespace,
    questions: enQuestions as Namespace,
    cities: enCities as Namespace,
  },
  'zh-CN': {
    common: zhCommon as Namespace,
    questions: zhQuestions as Namespace,
    cities: zhCities as Namespace,
  },
  ja: {
    common: jaCommon as Namespace,
    questions: jaQuestions as Namespace,
    cities: jaCities as Namespace,
  },
  ko: {
    common: koCommon as Namespace,
    questions: koQuestions as Namespace,
    cities: koCities as Namespace,
  },
}

const URL_LANG_MAP: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

function resolveDotPath(obj: unknown, key: string): unknown {
  return key.split('.').reduce((current: unknown, k: string) => {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      return (current as Record<string, unknown>)[k]
    }
    return undefined
  }, obj)
}

export type TranslationFn = (key: string, options?: { returnObjects?: boolean }) => unknown

export function getTranslation(urlLang: string, namespace: string): TranslationFn {
  const i18nLang = URL_LANG_MAP[urlLang] ?? 'en'
  const data: unknown = resources[i18nLang]?.[namespace] ?? resources.en[namespace] ?? {}

  return function t(key: string): unknown {
    const value = resolveDotPath(data, key)
    return value ?? key
  }
}
