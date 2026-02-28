import Link from 'next/link'
import { isIndexableContentLang, PRIMARY_INDEXABLE_CONTENT_LANG } from '@/lib/indexing'
import TrackedQuizLink from '@/components/TrackedQuizLink'

interface FooterLegalLinks {
  about: string
  contact: string
  guides: string
  privacy: string
}

interface FooterTranslations {
  eyebrow: string
  title: string
  subtitle: string
  jumpTitle: string
  nextTitle: string
  cta: string
  disclaimer: string
  copyright: string
  legalLinks: FooterLegalLinks
}

interface NavLink {
  href: string
  label: string
}

interface SiteFooterProps {
  lang: string
  footer: FooterTranslations
  navLinks: NavLink[]
}

export default function SiteFooter({ lang, footer, navLinks }: SiteFooterProps) {
  const currentYear = new Date().getFullYear()
  const quizPath = `/${lang}/quiz/`
  const contentLang = isIndexableContentLang(lang) ? lang : PRIMARY_INDEXABLE_CONTENT_LANG
  const legalBasePath = `/${contentLang}`
  const guidesPath = `/${contentLang}/guides/`

  return (
    <footer className="surface-card mt-5 overflow-hidden bg-[linear-gradient(145deg,#1b2434,#2a364d)] text-slate-200">
      <div className="motif-divider" />
      <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-10">
        <section>
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c57d]">
            {footer.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            {footer.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">{footer.subtitle}</p>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#56627a] bg-[#202a3d]/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{footer.jumpTitle}</p>
            <div className="mt-3 grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring inline-flex min-h-[44px] items-center rounded-xl border border-[#5f6b81] bg-[#27344c] px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-[#e2b35f]/70 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#56627a] bg-[#202a3d]/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{footer.nextTitle}</p>
            <TrackedQuizLink
              href={quizPath}
              lang={lang}
              section="footer"
              className="btn-cinnabar mt-3 inline-flex w-full justify-center px-4 py-3 text-sm"
            >
              {footer.cta}
            </TrackedQuizLink>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">{footer.disclaimer}</p>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#4f5e78] px-6 py-4 text-xs text-slate-300 sm:px-8 lg:px-10">
        <span>
          © {currentYear} {footer.copyright}
        </span>
        <nav className="flex flex-wrap items-center gap-3">
          <Link
            href={`${legalBasePath}/about/`}
            className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
          >
            {footer.legalLinks.about}
          </Link>
          <Link
            href={`${legalBasePath}/contact/`}
            className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
          >
            {footer.legalLinks.contact}
          </Link>
          <Link
            href={guidesPath}
            className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
          >
            {footer.legalLinks.guides}
          </Link>
          <Link
            href={`${legalBasePath}/privacy-policy/`}
            className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
          >
            {footer.legalLinks.privacy}
          </Link>
        </nav>
        <nav className="flex flex-wrap items-center gap-2 text-[11px]" aria-label="Language versions">
          <Link href="/en/" className="focus-ring rounded px-1 py-0.5 text-slate-300 transition-colors hover:text-white">
            English
          </Link>
          <Link href="/zh/" className="focus-ring rounded px-1 py-0.5 text-slate-300 transition-colors hover:text-white">
            中文
          </Link>
          <Link href="/ja/" className="focus-ring rounded px-1 py-0.5 text-slate-300 transition-colors hover:text-white">
            日本語
          </Link>
          <Link href="/ko/" className="focus-ring rounded px-1 py-0.5 text-slate-300 transition-colors hover:text-white">
            한국어
          </Link>
        </nav>
      </div>
    </footer>
  )
}
