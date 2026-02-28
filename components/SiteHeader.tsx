import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface NavLink {
  href: string
  label: string
}

interface SiteHeaderProps {
  lang: string
  brandName: string
  brandEyebrow: string
  ctaLabel: string
  switcherLabel: string
  navLinks?: NavLink[]
}

export default function SiteHeader({
  lang,
  brandName,
  brandEyebrow,
  ctaLabel,
  switcherLabel,
  navLinks,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-3 z-20 mb-5">
      <div className="surface-card grid-lattice relative overflow-visible px-4 py-3 backdrop-blur-sm sm:px-5 lg:px-6">
        <div className="motif-divider pointer-events-none absolute inset-x-0 top-0" />
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/${lang}/`} className="brand-link">
            <Image src="/logo.svg" alt="" aria-hidden="true" width={36} height={36} className="brand-logo" />
            <div className="brand-copy">
              <div className="header-brand-row">
                <p className="ink-title min-w-0 truncate text-base font-bold sm:text-xl">{brandName}</p>
                <p className="header-brand-stamp hidden sm:inline-flex">{brandEyebrow}</p>
              </div>
            </div>
          </Link>

          {navLinks && navLinks.length > 0 && (
            <nav className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring inline-flex min-h-[44px] items-center rounded-full border border-[#83582e]/25 bg-white/70 px-3.5 py-2 text-xs font-semibold text-[color:var(--ink-600)] transition-colors hover:border-[#b43c2f]/40 hover:text-[color:var(--cinnabar-600)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <Link
            href={`/${lang}/quiz/`}
            className="btn-ink hidden px-4 py-2 text-sm md:inline-flex"
          >
            {ctaLabel}
          </Link>
          <LanguageSwitcher currentLang={lang} switcherLabel={switcherLabel} />
        </div>
      </div>
    </header>
  )
}
