'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { trackEvent } from '@/lib/analytics'

interface CityPreview {
  id: string
  name: string
  label: string
  emoji: string
  tagline: string
}

interface PainPoint {
  title: string
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

interface TopicClusterItem {
  title: string
  description: string
}

interface GuideLink {
  href: string
  title: string
  desc: string
}

export interface HomepageTranslations {
  badge: string
  title: string
  subtitle: string
  cta: string
  metrics: {
    questions: string
    dimensions: string
    citiesValue: string
    cities: string
  }
  desktopPreviewTitle: string
  desktopPreviewSubtitle: string
  shareTitle: string
  shareSubtitle: string
  sharePoints: string[]
  painEyebrow: string
  painTitle: string
  painPoints: PainPoint[]
  modelEyebrow: string
  modelTitle: string
  modelSubtitle: string
  modelDimensions: string[]
  howItWorksTitle: string
  modelStep1: string
  modelStep2: string
  modelStep3: string
  finalCtaTitle: string
  finalCtaSubtitle: string
  finalCta: string
  header: {
    brandEyebrow: string
    brandName: string
    navPreview: string
    navPain: string
    navModel: string
    cta: string
  }
  footer: {
    eyebrow: string
    title: string
    subtitle: string
    jumpTitle: string
    nextTitle: string
    cta: string
    disclaimer: string
    copyright: string
    legalLinks: {
      about: string
      contact: string
      guides: string
      privacy: string
    }
  }
  seoGuide: {
    eyebrow: string
    title: string
    intro: string
    points: string[]
    conclusion: string
  }
  topicCluster: {
    eyebrow: string
    title: string
    subtitle: string
    cta: string
    items: TopicClusterItem[]
  }
  faq: {
    eyebrow: string
    title: string
    items: FaqItem[]
  }
  languageSwitcher: string
}

interface HomepageClientProps {
  lang: string
  translations: HomepageTranslations
  previewCities: CityPreview[]
  cityTaglines: Record<string, string>
}

const GUIDE_CONTENT_LANGS = new Set(['en', 'zh', 'ja', 'ko'])
const GUIDE_SLUGS = [
  'best-city-to-visit-in-china-first-time/',
  'beijing-vs-shanghai-for-first-trip/',
  'best-china-cities-by-travel-style/',
  'how-many-days-in-first-china-city/',
]

export default function HomepageClient({
  lang,
  translations: t,
  previewCities,
  cityTaglines,
}: HomepageClientProps) {
  const currentYear = new Date().getFullYear()

  const topicClusterGuideLang = GUIDE_CONTENT_LANGS.has(lang) ? lang : 'en'
  const topicClusterGuideBasePath = `/${topicClusterGuideLang}/guides`
  const legalBasePath = `/${lang}`
  const quizPath = `/${lang}/quiz/`

  const headerLinks = [
    { href: '#landing-preview', label: t.header.navPreview },
    { href: '#landing-pain', label: t.header.navPain },
    { href: '#landing-model', label: t.header.navModel },
  ]

  const topicClusterLinks: GuideLink[] = t.topicCluster.items
    .map((item, index) => {
      const slug = GUIDE_SLUGS[index]
      if (!slug) return null
      return {
        href: `${topicClusterGuideBasePath}/${slug}`,
        title: item.title,
        desc: item.description,
      }
    })
    .filter((item): item is GuideLink => item !== null)

  useEffect(() => {
    trackEvent('view_landing', { lang })
  }, [lang])

  function trackQuizCta(section: 'header' | 'hero' | 'final' | 'footer') {
    trackEvent('click_start_quiz', { lang, section })
  }

  return (
    <main id="main-content" className="min-h-dvh py-4 sm:py-6 lg:py-8">
      <header className="sticky top-3 z-20 mb-5">
        <div className="surface-card grid-lattice relative overflow-visible px-4 py-3 backdrop-blur-sm sm:px-5 lg:px-6">
          <div className="motif-divider pointer-events-none absolute inset-x-0 top-0" />
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/${lang}/`} className="brand-link">
              <Image src="/logo.svg" alt="" aria-hidden="true" width={36} height={36} className="brand-logo" />
              <div className="brand-copy">
                <div className="header-brand-row">
                  <p className="ink-title min-w-0 truncate text-base font-bold sm:text-xl">{t.header.brandName}</p>
                  <p className="header-brand-stamp hidden sm:inline-flex">{t.header.brandEyebrow}</p>
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {headerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="focus-ring inline-flex min-h-[44px] items-center rounded-full border border-[#83582e]/25 bg-white/70 px-3.5 py-2 text-xs font-semibold text-[color:var(--ink-600)] transition-colors hover:border-[#b43c2f]/40 hover:text-[color:var(--cinnabar-600)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <Link
              href={quizPath}
              onClick={() => trackQuizCta('header')}
              className="btn-ink hidden px-4 py-2 text-sm md:inline-flex"
            >
              {t.header.cta}
            </Link>
            <LanguageSwitcher currentLang={lang} switcherLabel={t.languageSwitcher} />
          </div>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-7">
        <section className="surface-card grid-lattice animate-rise relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[rgba(180,60,47,0.16)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-[rgba(184,140,53,0.22)] blur-3xl" />
          <div aria-hidden="true" className="china-watermark -right-4 -top-6 text-[16rem] sm:text-[20rem] lg:text-[24rem]">
            旅
          </div>

          <p className="brand-stamp">{t.badge}</p>

          <h1 className="ink-title mt-4 text-balance text-4xl leading-tight sm:text-5xl lg:text-[3.1rem] lg:leading-[1.05]">
            {t.title}
          </h1>
          <div className="hero-accent-bar mt-4" />

          <p className="ink-subtitle mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">{t.subtitle}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="surface-muted p-4">
              <p className="font-display text-3xl font-bold text-[color:var(--ink-950)]">18</p>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-600)]">{t.metrics.questions}</p>
            </article>
            <article className="surface-muted p-4">
              <p className="font-display text-3xl font-bold text-[color:var(--ink-950)]">6</p>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-600)]">{t.metrics.dimensions}</p>
            </article>
            <article className="surface-muted p-4">
              <p className="font-display text-3xl font-bold text-[color:var(--ink-950)]">{t.metrics.citiesValue}</p>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-600)]">{t.metrics.cities}</p>
            </article>
          </div>

          <Link
            href={quizPath}
            onClick={() => trackQuizCta('hero')}
            className="btn-cinnabar mt-7 inline-flex w-full px-8 py-4 text-lg sm:w-auto"
          >
            {t.cta}
          </Link>
        </section>

        <aside id="landing-preview" className="surface-card animate-rise-delay scroll-mt-28 p-5 sm:p-6 lg:p-7">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
            {t.desktopPreviewTitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{t.desktopPreviewSubtitle}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {previewCities.map((city) => (
              <article
                key={city.id}
                className="surface-muted rounded-2xl border-[#826043]/20 p-4"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-4xl leading-none" aria-hidden="true">{city.emoji}</span>
                  <div>
                    <p className="font-display text-base font-semibold leading-tight text-[color:var(--ink-950)]">{city.name}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cinnabar">{city.label}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[color:var(--ink-600)]">
                  {cityTaglines[city.id] ?? city.tagline}
                </p>
              </article>
            ))}
          </div>

          <article className="mt-5 rounded-2xl border border-[#28344d] bg-[linear-gradient(145deg,#202a3d,#2d3b55)] p-4 text-slate-100">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c37a]">{t.shareTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-100">{t.shareSubtitle}</p>
            <ul className="mt-3 grid gap-2">
              {t.sharePoints.map((point, i) => (
                <li key={i} className="text-xs leading-relaxed text-slate-200">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>

      <section id="landing-pain" className="surface-card scroll-mt-28 mt-5 p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t.painEyebrow}</p>
        <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t.painTitle}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {t.painPoints.map((painPoint, i) => (
            <article key={i} className="surface-muted p-5">
              <p className="font-display text-lg font-semibold leading-snug text-[color:var(--ink-950)]">{painPoint.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{painPoint.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="landing-model"
        className="scroll-mt-28 mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-7"
      >
        <article className="surface-card p-6 sm:p-8 lg:p-10">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t.modelEyebrow}</p>
          <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t.modelTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
            {t.modelSubtitle}
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {t.modelDimensions.map((dimension, i) => (
              <p
                key={i}
                className="rounded-xl border border-[#866949]/25 bg-[rgba(253,248,238,0.84)] px-3 py-2 text-sm text-[color:var(--ink-800)]"
              >
                {dimension}
              </p>
            ))}
          </div>
        </article>

        <article className="surface-card p-6 sm:p-8 lg:p-10">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t.howItWorksTitle}</p>
          <ol className="mt-4 grid gap-3">
            {[t.modelStep1, t.modelStep2, t.modelStep3].map((step, i) => (
              <li key={i} className="surface-muted p-4">
                <p className="mb-2 font-accent text-xs font-semibold uppercase tracking-[0.18em] text-cinnabar">0{i + 1}</p>
                <p className="text-sm leading-relaxed text-[color:var(--ink-800)]">{step}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t.seoGuide.eyebrow}</p>
        <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t.seoGuide.title}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">{t.seoGuide.intro}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {t.seoGuide.points.map((point, i) => (
            <article key={i} className="surface-muted p-5">
              <p className="text-sm leading-relaxed text-[color:var(--ink-800)]">{point}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">{t.seoGuide.conclusion}</p>
      </section>

      {topicClusterLinks.length > 0 && (
        <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t.topicCluster.eyebrow}</p>
          <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t.topicCluster.title}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
            {t.topicCluster.subtitle}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {topicClusterLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="focus-ring surface-muted block p-5 transition-colors hover:border-[#b43c2f]/35"
              >
                <h3 className="font-display text-lg font-semibold leading-snug text-[color:var(--ink-950)]">{guide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{guide.desc}</p>
              </Link>
            ))}
          </div>
          <Link
            href={`${topicClusterGuideBasePath}/`}
            className="focus-ring mt-5 inline-flex rounded-xl border border-[#8a6447]/28 bg-white/70 px-4 py-2 text-sm font-semibold text-cinnabar transition-colors hover:border-[#b43c2f]/45"
          >
            {t.topicCluster.cta}
          </Link>
        </section>
      )}

      <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t.faq.eyebrow}</p>
        <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t.faq.title}</h2>
        <div className="mt-5 grid gap-3">
          {t.faq.items.map((faq, i) => (
            <article key={i} className="surface-muted p-5">
              <h3 className="font-display text-lg font-semibold leading-snug text-[color:var(--ink-950)]">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card mt-5 p-6 text-center sm:p-8 lg:p-10">
        <h2 className="ink-title text-balance text-2xl leading-tight sm:text-3xl">{t.finalCtaTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
          {t.finalCtaSubtitle}
        </p>
        <Link
          href={quizPath}
          onClick={() => trackQuizCta('final')}
          className="btn-cinnabar mt-6 inline-flex w-full px-8 py-4 text-lg sm:w-auto"
        >
          {t.finalCta}
        </Link>
      </section>

      <footer className="surface-card mt-5 overflow-hidden bg-[linear-gradient(145deg,#1b2434,#2a364d)] text-slate-200">
        <div className="motif-divider" />
        <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-10">
          <section>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c57d]">
              {t.footer.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">{t.footer.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">{t.footer.subtitle}</p>
          </section>

          <div className="grid gap-3 sm:grid-cols-2">
            <section className="rounded-2xl border border-[#56627a] bg-[#202a3d]/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t.footer.jumpTitle}</p>
              <div className="mt-3 grid gap-2">
                {headerLinks.map((link) => (
                  <a
                    key={`footer-${link.href}`}
                    href={link.href}
                    className="focus-ring inline-flex min-h-[44px] items-center rounded-xl border border-[#5f6b81] bg-[#27344c] px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-[#e2b35f]/70 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#56627a] bg-[#202a3d]/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t.footer.nextTitle}</p>
              <Link
                href={quizPath}
                onClick={() => trackQuizCta('footer')}
                className="btn-cinnabar mt-3 inline-flex w-full justify-center px-4 py-3 text-sm"
              >
                {t.footer.cta}
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">{t.footer.disclaimer}</p>
            </section>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#4f5e78] px-6 py-4 text-xs text-slate-300 sm:px-8 lg:px-10">
          <span>
            © {currentYear} {t.footer.copyright}
          </span>
          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href={`${legalBasePath}/about/`}
              className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
            >
              {t.footer.legalLinks.about}
            </Link>
            <Link
              href={`${legalBasePath}/contact/`}
              className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
            >
              {t.footer.legalLinks.contact}
            </Link>
            <Link
              href={`${topicClusterGuideBasePath}/`}
              className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
            >
              {t.footer.legalLinks.guides}
            </Link>
            <Link
              href={`${legalBasePath}/privacy-policy/`}
              className="focus-ring rounded-lg px-1 py-0.5 text-slate-200 transition-colors hover:text-white"
            >
              {t.footer.legalLinks.privacy}
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
