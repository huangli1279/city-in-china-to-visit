import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { I18N_TO_URL } from './LangLayout'

const LANGUAGE_CODES = ['en', 'zh-CN', 'ja', 'ko'] as const
type LanguageCode = typeof LANGUAGE_CODES[number]

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation('common')
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const normalizedLang = i18n.resolvedLanguage === 'zh' ? 'zh-CN' : i18n.resolvedLanguage ?? i18n.language
  const current = LANGUAGE_CODES.includes(normalizedLang as LanguageCode)
    ? (normalizedLang as LanguageCode)
    : 'en'

  useEffect(() => {
    function handleClickOutside(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!open) return

    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [open])

  function handleSelect(i18nCode: LanguageCode) {
    const urlCode = I18N_TO_URL[i18nCode] ?? 'en'
    // Replace the first path segment (language prefix) with the new language
    const segments = location.pathname.split('/').filter(Boolean)
    segments[0] = urlCode
    navigate('/' + segments.join('/'), { replace: true, state: location.state })
    i18n.changeLanguage(i18nCode)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.switcher')}
      >
        {t(`language.${current}`)}
        <span className={`ml-0.5 text-[10px] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[156px] rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {LANGUAGE_CODES.map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={code === normalizedLang}
              onClick={() => handleSelect(code)}
              className={`focus-ring w-full whitespace-nowrap px-4 py-2.5 text-left text-sm transition-colors ${
                code === normalizedLang
                  ? 'font-semibold text-sky-600 bg-sky-50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t(`language.${code}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
