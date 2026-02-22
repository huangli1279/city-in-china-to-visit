type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
type Namespace = Record<string, JsonValue>
type SupportedI18nLang = 'en' | 'zh-CN' | 'ja' | 'ko'
type NamespaceName = 'common' | 'questions' | 'cities'
type LocaleModule = { default: Namespace }

const NAMESPACES: readonly NamespaceName[] = ['common', 'questions', 'cities']

const URL_LANG_MAP: Record<string, SupportedI18nLang> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
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

const namespaceCache = new Map<string, Namespace>()
const namespacePromises = new Map<string, Promise<Namespace>>()

function resolveDotPath(obj: unknown, key: string): unknown {
  return key.split('.').reduce((current: unknown, k: string) => {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      return (current as Record<string, unknown>)[k]
    }
    return undefined
  }, obj)
}

function toNamespaceName(input: string): NamespaceName | null {
  return (NAMESPACES as readonly string[]).includes(input) ? (input as NamespaceName) : null
}

function getCacheKey(language: SupportedI18nLang, namespace: NamespaceName): string {
  return `${language}:${namespace}`
}

async function loadNamespace(language: SupportedI18nLang, namespace: NamespaceName): Promise<Namespace> {
  const key = getCacheKey(language, namespace)
  const cached = namespaceCache.get(key)
  if (cached) return cached

  const inFlight = namespacePromises.get(key)
  if (inFlight) return inFlight

  const loadPromise = RESOURCE_LOADERS[language][namespace]()
    .then((module) => {
      const data = module.default ?? {}
      namespaceCache.set(key, data)
      return data
    })
    .finally(() => {
      namespacePromises.delete(key)
    })

  namespacePromises.set(key, loadPromise)
  return loadPromise
}

export type TranslationFn = (key: string, options?: { returnObjects?: boolean }) => unknown

export async function getTranslation(urlLang: string, namespace: string): Promise<TranslationFn> {
  const language = URL_LANG_MAP[urlLang] ?? 'en'
  const namespaceName = toNamespaceName(namespace)

  const data = namespaceName
    ? await loadNamespace(language, namespaceName)
    : {}

  return function t(key: string): unknown {
    const value = resolveDotPath(data, key)
    return value ?? key
  }
}
