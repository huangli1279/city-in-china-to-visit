import { useEffect } from 'react'
import { useParams, Outlet, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const
export type UrlLang = typeof VALID_LANGS[number]

export const URL_TO_I18N: Record<UrlLang, string> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
}

export const I18N_TO_URL: Record<string, UrlLang> = {
  en: 'en',
  'zh-CN': 'zh',
  ja: 'ja',
  ko: 'ko',
}

export default function LangLayout() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()

  const isValid = lang !== undefined && (VALID_LANGS as readonly string[]).includes(lang)
  const targetI18nLang = isValid && lang ? URL_TO_I18N[lang as UrlLang] : 'en'
  const normalizedResolvedLang =
    i18n.resolvedLanguage === 'zh' ? 'zh-CN' : i18n.resolvedLanguage ?? i18n.language

  useEffect(() => {
    if (!isValid) return
    if (normalizedResolvedLang !== targetI18nLang) {
      void i18n.changeLanguage(targetI18nLang)
    }
  }, [i18n, isValid, normalizedResolvedLang, targetI18nLang])

  useEffect(() => {
    if (!isValid) return
    document.documentElement.lang = targetI18nLang
  }, [isValid, targetI18nLang])

  if (!isValid) {
    return <Navigate to="/404" replace />
  }

  if (normalizedResolvedLang !== targetI18nLang) {
    return null
  }

  return <Outlet />
}
