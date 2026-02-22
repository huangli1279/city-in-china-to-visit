'use client'

import { useEffect, useId, useRef, useState } from 'react'
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
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const menuId = useId()

  const fallbackLang: UrlLang = URL_LANGS.includes(currentLang as UrlLang) ? (currentLang as UrlLang) : 'en'
  const selectedIndex = Math.max(URL_LANGS.indexOf(fallbackLang), 0)

  function focusOption(index: number) {
    const boundedIndex = Math.min(Math.max(index, 0), URL_LANGS.length - 1)
    itemRefs.current[boundedIndex]?.focus()
  }

  function moveOptionFocus(currentIndex: number, direction: 1 | -1) {
    const nextIndex = (currentIndex + direction + URL_LANGS.length) % URL_LANGS.length
    focusOption(nextIndex)
  }

  function openAndFocus(index: number) {
    setOpen(true)
    requestAnimationFrame(() => {
      focusOption(index)
    })
  }

  useEffect(() => {
    if (!open) return

    function handleClickOutside(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    function handleFocusIn(e: FocusEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', onEscape)
    document.addEventListener('focusin', handleFocusIn)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', onEscape)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        focusOption(selectedIndex)
      })
    }
  }, [open, selectedIndex])

  function handleSelect(targetLang: UrlLang) {
    if (targetLang === currentLang) {
      setOpen(false)
      return
    }

    const segments = (pathname ?? '/').split('/').filter(Boolean)
    if (segments.length === 0) {
      segments.push(targetLang)
    } else {
      segments[0] = targetLang
    }

    const nextPath = `/${segments.join('/')}/`
    const normalizedPathname = pathname
      ? (pathname.endsWith('/') ? pathname : `${pathname}/`)
      : '/'
    const query = typeof window !== 'undefined' ? window.location.search : ''
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const nextUrl = `${nextPath}${query}${hash}`
    const currentUrl = `${normalizedPathname}${query}${hash}`

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false })
    }

    setOpen(false)
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      openAndFocus(selectedIndex)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      openAndFocus(selectedIndex)
      return
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      openAndFocus(selectedIndex)
      return
    }

    if (e.key === 'Home') {
      e.preventDefault()
      openAndFocus(0)
      return
    }

    if (e.key === 'End') {
      e.preventDefault()
      openAndFocus(URL_LANGS.length - 1)
    }
  }

  function handleMenuItemKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, itemIndex: number, code: UrlLang) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      moveOptionFocus(itemIndex, 1)
      return
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      moveOptionFocus(itemIndex, -1)
      return
    }

    if (e.key === 'Home') {
      e.preventDefault()
      focusOption(0)
      return
    }

    if (e.key === 'End') {
      e.preventDefault()
      focusOption(URL_LANGS.length - 1)
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleSelect(code)
      return
    }

    if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <label htmlFor="language-switcher-mobile" className="sr-only">
        {switcherLabel}
      </label>
      <select
        id="language-switcher-mobile"
        value={fallbackLang}
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
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        className="focus-ring hidden min-h-[44px] items-center gap-1 whitespace-nowrap rounded-xl border border-[#8a6447]/20 bg-white/65 px-3 py-2 text-sm font-medium text-[color:var(--ink-800)] transition-colors hover:border-[#b43c2f]/35 hover:bg-white/85 sm:flex"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={switcherLabel}
      >
        {LANG_LABELS[fallbackLang] ?? LANG_LABELS.en}
        <span className={`ml-0.5 text-[10px] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={switcherLabel}
          aria-orientation="vertical"
          className="absolute right-0 top-[calc(100%+0.55rem)] z-[120] hidden min-w-[188px] overflow-hidden rounded-2xl border border-[#8a6447]/25 bg-[rgba(253,248,240,0.97)] py-1 shadow-[0_24px_40px_-28px_rgba(58,35,23,0.62)] backdrop-blur sm:block"
        >
          {URL_LANGS.map((code, idx) => (
            <li key={code} role="none">
              <button
                type="button"
                ref={(el) => {
                  itemRefs.current[idx] = el
                }}
                role="menuitemradio"
                aria-checked={code === fallbackLang}
                tabIndex={code === fallbackLang ? 0 : -1}
                onClick={() => handleSelect(code)}
                onKeyDown={(e) => handleMenuItemKeyDown(e, idx, code)}
                className={`focus-ring w-full whitespace-nowrap px-4 py-2.5 text-left text-sm transition-colors ${
                  code === fallbackLang
                    ? 'bg-[rgba(180,60,47,0.12)] font-semibold text-[color:var(--cinnabar-600)]'
                    : 'text-[color:var(--ink-800)] hover:bg-[rgba(47,138,115,0.09)]'
                }`}
              >
                {LANG_LABELS[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
