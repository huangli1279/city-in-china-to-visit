import { useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { buildAlternates, buildLangPath } from '../seo/config'
import type { RankedCity } from '../utils/match'
import { getCityHighlightTagKeys, getUserPersonalityTagKeys } from '../utils/match'
import type { CityScores } from '../data/cities'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface ResultState {
  bestMatch: RankedCity
  runnerUps: RankedCity[]
  userScores?: CityScores
}

interface CityTranslation {
  tagline: string
  description: string
  matchReason?: string
  bestTime?: string
  budgetRange?: string
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

  const { bestMatch, runnerUps, userScores } = state as ResultState
  const { city, matchPercentage } = bestMatch

  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  const cityT = cityTranslations[city.id]

  const cityTagKeys = getCityHighlightTagKeys(city.scores)
  const userTagKeys = userScores ? getUserPersonalityTagKeys(userScores) : []

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

      {/* ── Main result card ── */}
      <section className="surface-card grid-lattice relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div aria-hidden="true" className="china-watermark -right-3 -top-4 text-[9rem] sm:text-[14rem] lg:text-[18rem]">
          {city.name.charAt(0)}
        </div>

        {/* Hero: icon + match % */}
        <div className="flex flex-col items-center text-center">
          {/* City emoji – unique per city */}
          <div className="mb-4">
            <span className="text-[4.5rem] leading-none sm:text-[5rem]" role="img" aria-label={city.name}>{city.emoji}</span>
          </div>

          {/* Match % badge */}
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#8a6447]/28 bg-white/75 px-3 py-1 text-xs font-semibold text-[color:var(--ink-600)]">
            <svg className="h-3 w-3 text-[color:var(--gold-500)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            {t('result.matchLabel')}
          </div>

          {/* Big match % */}
          <div className="font-display text-7xl font-black leading-none text-cinnabar sm:text-8xl">
            {matchPercentage}%
          </div>

          {/* City identity */}
          <h1 className="ink-title mt-4 text-balance text-3xl sm:text-4xl">
            {city.name}
          </h1>
          <p className="mt-1 text-sm font-semibold tracking-[0.18em] text-cinnabar">{city.label}</p>
          <p className="mt-3 text-sm italic text-[color:var(--ink-600)] sm:text-base">"{cityT?.tagline}"</p>
        </div>

        {/* ── Tags ── */}
        <div className="mt-7 space-y-4">
          {/* User personality tags */}
          {userTagKeys.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-600)]">
                {t('result.yourProfile')}
              </p>
              <div className="flex flex-wrap gap-2">
                {userTagKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-[#8a6447]/28 bg-white/75 px-3.5 py-1.5 text-sm font-medium text-[color:var(--ink-800)]"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* City highlight tags */}
          {cityTagKeys.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-600)]">
                {t('result.cityHighlights')}
              </p>
              <div className="flex flex-wrap gap-2">
                {cityTagKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-full bg-[rgba(180,60,47,0.12)] px-3.5 py-1.5 text-sm font-semibold text-cinnabar"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="motif-divider-center my-7" />

        {/* ── Match reason ── */}
        <div>
          <p className="mb-3 flex items-center gap-2 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            {t('result.matchReason')}
          </p>
          <p className="text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">{cityT?.matchReason ?? cityT?.description}</p>
        </div>

        {/* ── Quick facts ── */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#8a6447]/24 bg-white/70 p-3.5">
            <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(180,60,47,0.1)] text-[color:var(--cinnabar-600)]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--ink-600)]">{t('result.bestTime')}</p>
            <p className="mt-1 text-sm font-medium text-[color:var(--ink-800)]">{cityT?.bestTime ?? city.bestTime}</p>
          </div>
          <div className="rounded-xl border border-[#8a6447]/24 bg-white/70 p-3.5">
            <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(184,140,53,0.12)] text-[color:var(--gold-500)]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10M9.5 9.5h3.25a1.75 1.75 0 0 1 0 3.5H10.5a1.75 1.75 0 0 0 0 3.5H15" />
              </svg>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--ink-600)]">{t('result.budget')}</p>
            <p className="mt-1 text-sm font-medium text-[color:var(--ink-800)]">{cityT?.budgetRange ?? city.budgetRange}</p>
          </div>
        </div>
      </section>

      {/* ── Runner-up cities ── */}
      {runnerUps.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-4 text-center font-accent text-xs font-semibold uppercase tracking-[0.22em] text-cinnabar">
            {t('result.runnerUps')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {runnerUps.map((rc) => {
              const rcT = cityTranslations[rc.city.id]
              const rcTagKeys = getCityHighlightTagKeys(rc.city.scores)
              return (
                <article key={rc.city.id} className="surface-card p-5">
                  {/* City header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex-shrink-0 text-2xl leading-none" role="img" aria-label={rc.city.name}>{rc.city.emoji}</span>
                      <h3 className="min-w-0 truncate font-display text-lg font-bold text-[color:var(--ink-950)] sm:text-xl">{rc.city.name}</h3>
                    </div>
                    <span className="flex-shrink-0 font-display text-xl font-black text-cinnabar sm:text-2xl">
                      {rc.matchPercentage}%
                    </span>
                  </div>

                  {/* Match bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(134,106,60,0.15)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--cinnabar-600)] to-[var(--gold-500)]"
                      style={{ width: `${rc.matchPercentage}%` }}
                    />
                  </div>

                  {/* City tags */}
                  {rcTagKeys.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {rcTagKeys.map((key) => (
                        <span
                          key={key}
                          className="rounded-full bg-[rgba(180,60,47,0.1)] px-2.5 py-1 text-[11px] font-semibold text-cinnabar"
                        >
                          {t(key)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tagline */}
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">{rcT?.tagline}</p>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Retake ── */}
      <div className="mt-5">
        <button onClick={() => navigate(`/${lang}/quiz`)} className="btn-cinnabar w-full px-6 py-4 text-lg">
          {t('result.retake')}
        </button>
      </div>

      </main>
    </>
  )
}
