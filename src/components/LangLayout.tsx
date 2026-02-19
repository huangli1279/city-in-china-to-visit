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

  useEffect(() => {
    if (!isValid || !lang) return
    const i18nLang = URL_TO_I18N[lang as UrlLang]
    if (i18n.language !== i18nLang) {
      i18n.changeLanguage(i18nLang)
    }
  }, [lang, i18n, isValid])

  if (!isValid) {
    return <Navigate to="/en" replace />
  }

  return <Outlet />
}
