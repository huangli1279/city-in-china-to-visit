'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const LANG_LABELS: Record<string, string> = {
  en: '🇬🇧 English',
  zh: '🇨🇳 中文',
  ja: '🇯🇵 日本語',
  ko: '🇰🇷 한국어',
}

const URL_LANGS = ['en', 'zh', 'ja', 'ko'] as const
type UrlLang = (typeof URL_LANGS)[number]

interface LanguageSwitcherProps {
  currentLang: string
  switcherLabel: string
}

export default function LanguageSwitcher({ currentLang, switcherLabel }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [open])

  function handleSelect(targetLang: UrlLang) {
    const segments = (pathname ?? '/').split('/').filter(Boolean)
    segments[0] = targetLang
    router.push('/' + segments.join('/') + '/')
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <label htmlFor="language-switcher-mobile" className="sr-only">
        {switcherLabel}
      </label>
      <select
        id="language-switcher-mobile"
        value={currentLang}
        onChange={(e) => handleSelect(e.target.value as UrlLang)}
        className="focus-ring block min-h-[44px] rounded-xl border border-[#8a6447]/20 bg-white/65 px-3 py-2 text-sm font-medium text-[color:var(--ink-800)] sm:hidden"
        aria-label={switcherLabel}
      >
        {URL_LANGS.map((code) => (
          <option key={code} value={code}>
            {LANG_LABELS[code]}
          </option>
        ))}
      </select>

      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring hidden min-h-[44px] items-center gap-1 whitespace-nowrap rounded-xl border border-[#8a6447]/20 bg-white/65 px-3 py-2 text-sm font-medium text-[color:var(--ink-800)] transition-colors hover:border-[#b43c2f]/35 hover:bg-white/85 sm:flex"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={switcherLabel}
      >
        {LANG_LABELS[currentLang] ?? LANG_LABELS.en}
        <span className={`ml-0.5 text-[10px] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+0.55rem)] z-[120] hidden min-w-[188px] overflow-hidden rounded-2xl border border-[#8a6447]/25 bg-[rgba(253,248,240,0.97)] py-1 shadow-[0_24px_40px_-28px_rgba(58,35,23,0.62)] backdrop-blur sm:block"
        >
          {URL_LANGS.map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={code === currentLang}
              onClick={() => handleSelect(code)}
              className={`focus-ring w-full whitespace-nowrap px-4 py-2.5 text-left text-sm transition-colors ${
                code === currentLang
                  ? 'bg-[rgba(180,60,47,0.12)] font-semibold text-[color:var(--cinnabar-600)]'
                  : 'text-[color:var(--ink-800)] hover:bg-[rgba(47,138,115,0.09)]'
              }`}
            >
              {LANG_LABELS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
