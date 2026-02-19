import { useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

export default function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang = 'en' } = useParams<{ lang: string }>()
  const { t } = useTranslation('common')

  const state = location.state as ResultState | null
  const hasResult = Boolean(state?.bestMatch)

  // Guard: redirect immediately if accessed directly without quiz state
  useEffect(() => {
    if (!hasResult) {
      navigate(`/${lang}/quiz`, { replace: true })
    }
  }, [hasResult, lang, navigate])

  if (!hasResult) return null

  const { bestMatch, runnerUps } = state as ResultState
  const { city, matchPercentage } = bestMatch

  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  const cityT = cityTranslations[city.id]

  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <header className="sticky top-3 z-20 mb-4 lg:mb-6">
        <div className="surface-card relative overflow-visible border-slate-200/90 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 sm:px-5 lg:px-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/${lang}`} className="mr-auto min-w-0">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-sky-600">
                {t('home.header.brandEyebrow')}
              </p>
              <p className="truncate text-base font-bold text-slate-900 sm:text-lg">{t('home.header.brandName')}</p>
            </Link>

            <p className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 md:inline-flex">
              {t('result.heading')}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <p className="mb-4 text-base text-slate-500 md:hidden">{t('result.heading')}</p>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="surface-card p-6 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
            <div className="text-center lg:text-left">
              <div className="text-6xl">{city.emoji}</div>
              <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">{city.name}</h1>
              <p className="mt-1 text-sm font-medium tracking-wide text-slate-400">{city.label}</p>
              <p className="mt-4 text-base font-semibold italic text-slate-700">"{cityT?.tagline}"</p>
            </div>

            <div className="surface-muted mx-auto w-full max-w-[220px] p-5 text-center lg:mx-0">
              <div className="text-6xl font-black leading-none text-sky-500">{matchPercentage}%</div>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{t('result.matchLabel')}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">{cityT?.description}</p>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-6">
          {runnerUps.length > 0 && (
            <section className="surface-card p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t('result.runnerUps')}
              </p>
              <div className="space-y-2">
                {runnerUps.map((rc) => {
                  const rcT = cityTranslations[rc.city.id]
                  return (
                    <div
                      key={rc.city.id}
                      className="rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-sky-200"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold text-slate-800">
                          {rc.city.emoji} {rc.city.name}
                        </p>
                        <p className="flex-shrink-0 font-bold text-sky-500">{rc.matchPercentage}%</p>
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500">{rcT?.tagline}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          <section className="surface-card p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t('result.quickFacts')}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  📅 {t('result.bestTime')}
                </p>
                <p className="text-slate-700">{city.bestTime}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  💰 {t('result.budget')}
                </p>
                <p className="text-slate-700">{city.budgetRange}</p>
              </div>
            </div>
          </section>

          <button
            onClick={() => navigate(`/${lang}/quiz`)}
            className="focus-ring min-h-[52px] w-full rounded-2xl border-2 border-slate-200 py-4 text-base font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            {t('result.retake')}
          </button>
        </aside>
      </div>
    </main>
  )
}
