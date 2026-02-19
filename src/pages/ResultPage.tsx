import { useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { buildAlternates, buildLangPath } from '../seo/config'
import type { RankedCity } from '../utils/match'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface ResultState {
  bestMatch: RankedCity
  runnerUps: RankedCity[]
}

interface CityTranslation {
  tagline: string
  description: string
}

const RESULT_ALTERNATES = buildAlternates('/result')

export default function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang = 'en' } = useParams<{ lang: string }>()
  const { t } = useTranslation('common')

  const state = location.state as ResultState | null
  const hasResult = Boolean(state?.bestMatch)
  const canonicalPath = buildLangPath(lang, 'result')

  // Guard: redirect immediately if accessed directly without quiz state
  useEffect(() => {
    if (!hasResult) {
      navigate(`/${lang}/quiz`, { replace: true })
    }
  }, [hasResult, lang, navigate])

  if (!hasResult) {
    return (
      <Seo
        title={t('result.seo.title')}
        description={t('result.seo.description')}
        canonicalPath={canonicalPath}
        alternates={RESULT_ALTERNATES}
        robots="noindex,follow"
      />
    )
  }

  const { bestMatch, runnerUps } = state as ResultState
  const { city, matchPercentage } = bestMatch

  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  const cityT = cityTranslations[city.id]

  return (
    <>
      <Seo
        title={t('result.seo.title')}
        description={t('result.seo.description')}
        canonicalPath={canonicalPath}
        alternates={RESULT_ALTERNATES}
        robots="noindex,follow"
      />
      <main id="main-content" className="min-h-dvh py-5 sm:py-7 lg:py-9">
      <header className="sticky top-3 z-20 mb-4 lg:mb-6">
        <div className="surface-card grid-lattice relative overflow-visible px-4 py-3 backdrop-blur-sm sm:px-5 lg:px-6">
          <div className="motif-divider pointer-events-none absolute inset-x-0 top-0" />
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/${lang}`} className="mr-auto min-w-0">
              <p className="brand-stamp">{t('home.header.brandEyebrow')}</p>
              <p className="ink-title mt-2 truncate text-base sm:text-lg">{t('home.header.brandName')}</p>
            </Link>

            <p className="hidden rounded-full border border-[#83582e]/25 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[color:var(--ink-600)] md:inline-flex">
              {t('result.heading')}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <p className="mb-4 text-base text-[color:var(--ink-600)] md:hidden">{t('result.heading')}</p>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="surface-card grid-lattice p-6 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
            <div className="min-w-0 text-center lg:text-left">
              <div className="text-6xl">{city.emoji}</div>
              <h1 className="ink-title mt-3 text-balance text-4xl sm:text-5xl">{city.name}</h1>
              <p className="mt-1 text-sm font-medium tracking-[0.16em] text-cinnabar">{city.label}</p>
              <p className="mt-4 text-base font-semibold italic text-[color:var(--ink-800)]">“{cityT?.tagline}”</p>
            </div>

            <div className="surface-muted mx-auto flex w-full max-w-[220px] flex-col items-center justify-center border-[#8a6447]/25 p-5 text-center lg:mx-0">
              <div className="font-display text-6xl font-black leading-none text-cinnabar">{matchPercentage}%</div>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-600)]">{t('result.matchLabel')}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">{cityT?.description}</p>
        </section>

        <aside className="surface-card h-full p-5 sm:p-6 lg:p-7">
          {runnerUps.length > 0 && (
            <section>
              <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
                {t('result.runnerUps')}
              </p>
              <div className="space-y-2">
                {runnerUps.map((rc) => {
                  const rcT = cityTranslations[rc.city.id]
                  return (
                    <div
                      key={rc.city.id}
                      className="rounded-2xl border border-[#8a6447]/24 bg-white/70 p-3 transition-colors hover:border-[#b43c2f]/35"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold text-[color:var(--ink-800)]">
                          {rc.city.emoji} {rc.city.name}
                        </p>
                        <p className="flex-shrink-0 font-bold text-cinnabar">{rc.matchPercentage}%</p>
                      </div>
                      <p className="mt-1 truncate text-xs text-[color:var(--ink-600)]">{rcT?.tagline}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          <div className={`motif-divider ${runnerUps.length > 0 ? 'my-4' : 'mb-4'}`} />

          <section>
            <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
              {t('result.quickFacts')}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-[#8a6447]/24 bg-white/70 p-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--ink-600)]">
                  📅 {t('result.bestTime')}
                </p>
                <p className="text-[color:var(--ink-800)]">{city.bestTime}</p>
              </div>
              <div className="rounded-xl border border-[#8a6447]/24 bg-white/70 p-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--ink-600)]">
                  💰 {t('result.budget')}
                </p>
                <p className="text-[color:var(--ink-800)]">{city.budgetRange}</p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-5">
        <button onClick={() => navigate(`/${lang}/quiz`)} className="btn-cinnabar w-full px-6 py-4 text-lg">
          {t('result.retake')}
        </button>
      </div>
      </main>
    </>
  )
}
