import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import Seo from '../components/Seo'
import { cities } from '../data/cities'
import { buildAlternates, buildLangPath, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '../seo/config'
import { trackEvent } from '../utils/analytics'

interface CityTranslation {
  tagline: string
}

interface PainPointTranslation {
  title: string
  description: string
}

interface FaqItemTranslation {
  question: string
  answer: string
}

interface TopicClusterItemTranslation {
  title: string
  description: string
}

const CITY_BY_ID = new Map(cities.map((city) => [city.id, city]))
const PREVIEW_CITY_IDS = ['shanghai', 'xian', 'chengdu', 'guilin', 'chongqing', 'sanya'] as const
const HOME_ALTERNATES = buildAlternates()
const GUIDE_CONTENT_LANGS = new Set(['en', 'zh', 'ja', 'ko'])
const GUIDE_SLUGS = [
  'best-city-to-visit-in-china-first-time/',
  'beijing-vs-shanghai-for-first-trip/',
  'best-china-cities-by-travel-style/',
  'how-many-days-in-first-china-city/',
]
const PREVIEW_CITIES = PREVIEW_CITY_IDS.map((id) => CITY_BY_ID.get(id)).filter(
  (city): city is (typeof cities)[number] => city !== undefined
)

export default function HomePage() {
  const navigate = useNavigate()
  const { lang = 'en' } = useParams<{ lang: string }>()
  const { t } = useTranslation('common')

  const modelSteps = [t('home.modelStep1'), t('home.modelStep2'), t('home.modelStep3')]
  const painPointsRaw = t('home.painPoints', {
    returnObjects: true,
  }) as PainPointTranslation[] | string
  const modelDimensionsRaw = t('home.modelDimensions', {
    returnObjects: true,
  }) as string[] | string
  const sharePointsRaw = t('home.sharePoints', {
    returnObjects: true,
  }) as string[] | string
  const seoGuidePointsRaw = t('home.seoGuide.points', {
    returnObjects: true,
  }) as string[] | string
  const topicClusterItemsRaw = t('home.topicCluster.items', {
    returnObjects: true,
  }) as TopicClusterItemTranslation[] | string
  const faqItemsRaw = t('home.faq.items', {
    returnObjects: true,
  }) as FaqItemTranslation[] | string

  const painPoints = Array.isArray(painPointsRaw) ? painPointsRaw : []
  const modelDimensions = Array.isArray(modelDimensionsRaw) ? modelDimensionsRaw : []
  const sharePoints = Array.isArray(sharePointsRaw) ? sharePointsRaw : []
  const seoGuidePoints = Array.isArray(seoGuidePointsRaw) ? seoGuidePointsRaw : []
  const topicClusterItems = Array.isArray(topicClusterItemsRaw) ? topicClusterItemsRaw : []
  const faqItems = Array.isArray(faqItemsRaw) ? faqItemsRaw : []
  const currentYear = new Date().getFullYear()
  const headerLinks = [
    { href: '#landing-preview', label: t('home.header.navPreview') },
    { href: '#landing-pain', label: t('home.header.navPain') },
    { href: '#landing-model', label: t('home.header.navModel') },
  ]

  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>
  const topicClusterGuideLang = GUIDE_CONTENT_LANGS.has(lang) ? lang : 'en'
  const topicClusterGuideBasePath = `/${topicClusterGuideLang}/guides`
  const ogLocale = buildOgLocale(lang)
  const ogLocaleAlternates = buildOgLocaleAlternates(lang)
  const topicClusterLinks = topicClusterItems
    .map((item, index) => {
      const slug = GUIDE_SLUGS[index]
      if (!slug) return null
      return {
        href: `${topicClusterGuideBasePath}/${slug}`,
        title: item.title,
        desc: item.description,
      }
    })
    .filter((item): item is { href: string; title: string; desc: string } => item !== null)
  const legalBasePath = `/${lang}`
  const canonicalPath = buildLangPath(lang)
  const faqSchema = faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }))
  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t('home.seo.appName'),
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Any',
      inLanguage: lang === 'zh' ? 'zh-CN' : lang,
      url: toAbsoluteUrl(canonicalPath),
      description: t('home.seo.description'),
    },
  ]
  if (faqSchema.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchema,
    })
  }

  useEffect(() => {
    trackEvent('view_landing', { lang })
  }, [lang])

  function goToQuiz(section: 'header' | 'hero' | 'final' | 'footer') {
    trackEvent('click_start_quiz', { lang, section })
    navigate(`/${lang}/quiz`)
  }

  return (
    <>
      <Seo
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        canonicalPath={canonicalPath}
        alternates={HOME_ALTERNATES}
        ogLocale={ogLocale}
        ogLocaleAlternates={ogLocaleAlternates}
        robots="index,follow"
        jsonLd={jsonLd}
      />
      <main id="main-content" className="min-h-dvh py-4 sm:py-6 lg:py-8">
      <header className="sticky top-3 z-20 mb-5">
        <div className="surface-card grid-lattice relative overflow-visible px-4 py-3 backdrop-blur-sm sm:px-5 lg:px-6">
          <div className="motif-divider pointer-events-none absolute inset-x-0 top-0" />
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/" className="brand-link">
              <img src="/logo.svg" alt="" aria-hidden="true" width={36} height={36} className="brand-logo" />
              <div className="brand-copy">
                <div className="header-brand-row">
                  <p className="ink-title min-w-0 truncate text-base font-bold sm:text-xl">{t('home.header.brandName')}</p>
                  <p className="header-brand-stamp hidden sm:inline-flex">{t('home.header.brandEyebrow')}</p>
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {headerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-full border border-[#83582e]/25 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[color:var(--ink-600)] transition-colors hover:border-[#b43c2f]/40 hover:text-[color:var(--cinnabar-600)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button onClick={() => goToQuiz('header')} className="btn-ink hidden px-4 py-2 text-sm md:inline-flex">
              {t('home.header.cta')}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-7">
        <section className="surface-card grid-lattice animate-rise relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[rgba(180,60,47,0.16)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-[rgba(184,140,53,0.22)] blur-3xl" />
          <div aria-hidden="true" className="china-watermark -right-4 -top-6 text-[16rem] sm:text-[20rem] lg:text-[24rem]">旅</div>

          <p className="brand-stamp">{t('home.badge')}</p>

          <h1 className="ink-title mt-4 text-balance text-4xl leading-tight sm:text-5xl lg:text-[3.1rem] lg:leading-[1.05]">
            {t('home.title')}
          </h1>
          <div className="hero-accent-bar mt-4" />

          <p className="ink-subtitle mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">{t('home.subtitle')}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="surface-muted p-4">
              <p className="font-display text-3xl font-bold text-[color:var(--ink-950)]">18</p>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-600)]">{t('home.metrics.questions')}</p>
            </article>
            <article className="surface-muted p-4">
              <p className="font-display text-3xl font-bold text-[color:var(--ink-950)]">6</p>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-600)]">{t('home.metrics.dimensions')}</p>
            </article>
            <article className="surface-muted p-4">
              <p className="font-display text-3xl font-bold text-[color:var(--ink-950)]">{t('home.metrics.citiesValue')}</p>
              <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-600)]">{t('home.metrics.cities')}</p>
            </article>
          </div>

          <button onClick={() => goToQuiz('hero')} className="btn-cinnabar mt-7 w-full px-8 py-4 text-lg sm:w-auto">
            {t('home.cta')}
          </button>
        </section>

        <aside id="landing-preview" className="surface-card animate-rise-delay scroll-mt-28 p-5 sm:p-6 lg:p-7">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
            {t('home.desktopPreviewTitle')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{t('home.desktopPreviewSubtitle')}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PREVIEW_CITIES.map((city) => (
              <article
                key={city.id}
                className="surface-muted cursor-pointer rounded-2xl border-[#826043]/20 p-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#b43c2f]/40 hover:shadow-[0_6px_18px_-8px_rgba(180,60,47,0.25)]"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-4xl leading-none" aria-hidden="true">{city.emoji}</span>
                  <div>
                    <p className="font-display text-base font-semibold leading-tight text-[color:var(--ink-950)]">{city.name}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cinnabar">{city.label}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[color:var(--ink-600)]">
                  {cityTranslations[city.id]?.tagline ?? city.label}
                </p>
              </article>
            ))}
          </div>

          <article className="mt-5 rounded-2xl border border-[#28344d] bg-[linear-gradient(145deg,#202a3d,#2d3b55)] p-4 text-slate-100">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c37a]">{t('home.shareTitle')}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-100">{t('home.shareSubtitle')}</p>
            <ul className="mt-3 grid gap-2">
              {sharePoints.map((point, i) => (
                <li key={i} className="text-xs leading-relaxed text-slate-200">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>

      <section id="landing-pain" className="surface-card scroll-mt-28 mt-5 p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t('home.painEyebrow')}</p>
        <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t('home.painTitle')}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {painPoints.map((painPoint, i) => (
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
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t('home.modelEyebrow')}</p>
          <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t('home.modelTitle')}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
            {t('home.modelSubtitle')}
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {modelDimensions.map((dimension, i) => (
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
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t('home.howItWorksTitle')}</p>
          <ol className="mt-4 grid gap-3">
            {modelSteps.map((step, i) => (
              <li key={i} className="surface-muted p-4">
                <p className="mb-2 font-accent text-xs font-semibold uppercase tracking-[0.18em] text-cinnabar">0{i + 1}</p>
                <p className="text-sm leading-relaxed text-[color:var(--ink-800)]">{step}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t('home.seoGuide.eyebrow')}</p>
        <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t('home.seoGuide.title')}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">{t('home.seoGuide.intro')}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {seoGuidePoints.map((point, i) => (
            <article key={i} className="surface-muted p-5">
              <p className="text-sm leading-relaxed text-[color:var(--ink-800)]">{point}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">{t('home.seoGuide.conclusion')}</p>
      </section>

      {topicClusterLinks.length > 0 && (
        <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t('home.topicCluster.eyebrow')}</p>
          <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t('home.topicCluster.title')}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
            {t('home.topicCluster.subtitle')}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {topicClusterLinks.map((guide) => (
              <a
                key={guide.href}
                href={guide.href}
                className="focus-ring surface-muted block p-5 transition-colors hover:border-[#b43c2f]/35"
              >
                <h3 className="font-display text-lg font-semibold leading-snug text-[color:var(--ink-950)]">{guide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{guide.desc}</p>
              </a>
            ))}
          </div>
          <a
            href={`${topicClusterGuideBasePath}/`}
            className="focus-ring mt-5 inline-flex rounded-xl border border-[#8a6447]/28 bg-white/70 px-4 py-2 text-sm font-semibold text-cinnabar transition-colors hover:border-[#b43c2f]/45"
          >
            {t('home.topicCluster.cta')}
          </a>
        </section>
      )}

      <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">{t('home.faq.eyebrow')}</p>
        <h2 className="ink-title mt-3 text-balance text-2xl leading-tight sm:text-3xl">{t('home.faq.title')}</h2>
        <div className="mt-5 grid gap-3">
          {faqItems.map((faq, i) => (
            <article key={i} className="surface-muted p-5">
              <h3 className="font-display text-lg font-semibold leading-snug text-[color:var(--ink-950)]">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card mt-5 p-6 text-center sm:p-8 lg:p-10">
        <h2 className="ink-title text-balance text-2xl leading-tight sm:text-3xl">{t('home.finalCtaTitle')}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
          {t('home.finalCtaSubtitle')}
        </p>
        <button onClick={() => goToQuiz('final')} className="btn-cinnabar mt-6 w-full px-8 py-4 text-lg sm:w-auto">
          {t('home.finalCta')}
        </button>
      </section>

      <footer className="surface-card mt-5 overflow-hidden bg-[linear-gradient(145deg,#1b2434,#2a364d)] text-slate-200">
        <div className="motif-divider" />
        <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-10">
          <section>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c57d]">
              {t('home.footer.eyebrow')}
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">{t('home.footer.title')}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">{t('home.footer.subtitle')}</p>
          </section>

          <div className="grid gap-3 sm:grid-cols-2">
            <section className="rounded-2xl border border-[#56627a] bg-[#202a3d]/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t('home.footer.jumpTitle')}</p>
              <div className="mt-3 grid gap-2">
                {headerLinks.map((link) => (
                  <a
                    key={`footer-${link.href}`}
                    href={link.href}
                    className="focus-ring rounded-xl border border-[#5f6b81] bg-[#27344c] px-3 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-[#e2b35f]/70 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#56627a] bg-[#202a3d]/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t('home.footer.nextTitle')}</p>
              <button onClick={() => goToQuiz('footer')} className="btn-cinnabar mt-3 w-full px-4 py-3 text-sm">
                {t('home.footer.cta')}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">{t('home.footer.disclaimer')}</p>
            </section>
          </div>
        </div>
        <div className="border-t border-[#4f5e78] px-6 py-4 text-xs text-slate-300 sm:px-8 lg:px-10 flex flex-wrap items-center justify-between gap-2">
          <span>© {currentYear} {t('home.footer.copyright')}</span>
          <nav className="flex flex-wrap items-center gap-3">
            <a href={`${legalBasePath}/about/`} className="text-slate-400 hover:text-slate-200 transition-colors">
              {t('home.footer.legalLinks.about')}
            </a>
            <a href={`${legalBasePath}/contact/`} className="text-slate-400 hover:text-slate-200 transition-colors">
              {t('home.footer.legalLinks.contact')}
            </a>
            <a href={`${topicClusterGuideBasePath}/`} className="text-slate-400 hover:text-slate-200 transition-colors">
              {t('home.footer.legalLinks.guides')}
            </a>
            <a href={`${legalBasePath}/privacy-policy/`} className="text-slate-400 hover:text-slate-200 transition-colors">
              {t('home.footer.legalLinks.privacy')}
            </a>
          </nav>
        </div>
      </footer>
      </main>
    </>
  )
}
