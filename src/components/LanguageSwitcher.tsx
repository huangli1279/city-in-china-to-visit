import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { I18N_TO_URL } from './LangLayout'

const LANGUAGE_CODES = ['en', 'ja', 'ko', 'zh-CN'] as const
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
      <label htmlFor="language-switcher-mobile" className="sr-only">
        {t('language.switcher')}
      </label>
      <select
        id="language-switcher-mobile"
        value={current}
        onChange={(e) => handleSelect(e.target.value as LanguageCode)}
        className="focus-ring block min-h-[44px] rounded-xl border border-[#8a6447]/20 bg-white/65 px-3 py-2 text-sm font-medium text-[color:var(--ink-800)] sm:hidden"
        aria-label={t('language.switcher')}
      >
        {LANGUAGE_CODES.map((code) => (
          <option key={code} value={code}>
            {t(`language.${code}`)}
          </option>
        ))}
      </select>

      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring hidden min-h-[44px] items-center gap-1 whitespace-nowrap rounded-xl border border-[#8a6447]/20 bg-white/65 px-3 py-2 text-sm font-medium text-[color:var(--ink-800)] transition-colors hover:border-[#b43c2f]/35 hover:bg-white/85 sm:flex"
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
          className="absolute right-0 top-[calc(100%+0.55rem)] z-[120] hidden min-w-[188px] overflow-hidden rounded-2xl border border-[#8a6447]/25 bg-[rgba(253,248,240,0.97)] py-1 shadow-[0_24px_40px_-28px_rgba(58,35,23,0.62)] backdrop-blur sm:block"
        >
          {LANGUAGE_CODES.map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={code === normalizedLang}
              onClick={() => handleSelect(code)}
              className={`focus-ring w-full whitespace-nowrap px-4 py-2.5 text-left text-sm transition-colors ${
                code === normalizedLang
                  ? 'bg-[rgba(180,60,47,0.12)] font-semibold text-[color:var(--cinnabar-600)]'
                  : 'text-[color:var(--ink-800)] hover:bg-[rgba(47,138,115,0.09)]'
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
