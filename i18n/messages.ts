import type {AbstractIntlMessages} from 'next-intl'
import {toContentLocale, type ContentLocale} from '@/i18n/locales'

type NamespaceMessages = Record<string, unknown>
type LocaleModule = {default: NamespaceMessages}
type NamespaceName = 'common' | 'questions' | 'cities'

const NAMESPACE_NAMES: readonly NamespaceName[] = ['common', 'questions', 'cities']

const MESSAGE_LOADERS: Record<ContentLocale, Record<NamespaceName, () => Promise<LocaleModule>>> = {
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

function normalizeInterpolationSyntax(value: string): string {
  return value.replace(/{{\s*([a-zA-Z0-9_.-]+)\s*}}/g, '{$1}')
}

function normalizeMessageValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return normalizeInterpolationSyntax(value)
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeMessageValue(item))
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
        key,
        normalizeMessageValue(nestedValue),
      ])
    )
  }

  return value
}

function normalizeNamespaceMessages(module: LocaleModule): NamespaceMessages {
  const source = module.default ?? {}
  return normalizeMessageValue(source) as NamespaceMessages
}

export async function getMessages(locale?: string | null): Promise<AbstractIntlMessages> {
  const contentLocale = toContentLocale(locale)
  const namespaceLoaders = MESSAGE_LOADERS[contentLocale]

  const loadedNamespaces = await Promise.all(
    NAMESPACE_NAMES.map(async (namespaceName) => {
      const module = await namespaceLoaders[namespaceName]()
      return [namespaceName, normalizeNamespaceMessages(module)] as const
    })
  )

  return Object.fromEntries(loadedNamespaces) as AbstractIntlMessages
}
