'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { calcUserScores, getRankedCities, getCityHighlightTagKeys, getUserPersonalityTagKeys, type Answers, type RankedCity } from '@/src/utils/match'
import type { CityScores } from '@/src/data/cities'
import { ensureI18nLanguage } from '@/lib/i18n-client'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface CityTranslation {
  name?: string
  label?: string
  tagline: string
  description: string
  matchReason?: string
}

function decodeAnswers(encoded: string): Answers | null {
  if (encoded.length !== 18) return null
  const answers: Answers = {}
  for (let i = 0; i < encoded.length; i++) {
    const val = parseInt(encoded[i], 10)
    if (isNaN(val) || val < 0 || val > 3) return null
    answers[i] = val
  }
  return answers
}

export default function ResultClient({ lang }: { lang: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation('common')
  const [i18nReady, setI18nReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ensureI18nLanguage(lang).then(() => {
      if (!cancelled) setI18nReady(true)
    })
    return () => { cancelled = true }
  }, [lang])

  const encoded = searchParams?.get('a') ?? null
  const answers = encoded ? decodeAnswers(encoded) : null
  const userScores: CityScores | null = answers ? calcUserScores(answers) : null
  const ranked: RankedCity[] = userScores ? getRankedCities(userScores) : []
  const bestMatch = ranked[0]
  const runnerUps = ranked.slice(1, 5)
  const hasResult = Boolean(bestMatch)

  useEffect(() => {
    if (!i18nReady) return
    if (!hasResult) {
      router.replace(`/${lang}/quiz/`)
    }
  }, [i18nReady, hasResult, lang, router])

  if (!i18nReady || !hasResult) return <div className="min-h-dvh" aria-busy="true" />

  const { city, matchPercentage } = bestMatch
  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  const cityT = cityTranslations[city.id]
  const cityTagKeys = getCityHighlightTagKeys(city.scores)
  const userTagKeys = userScores ? getUserPersonalityTagKeys(userScores) : []
  const cityName = cityT?.name ?? city.name
  const cityLabel = cityT?.label ?? city.label

  return (
    <main id="main-content" className="min-h-dvh py-5 sm:py-7 lg:py-9">
      <header className="sticky top-3 z-20 mb-4 lg:mb-6">
        <div className="surface-card grid-lattice relative overflow-visible px-4 py-3 backdrop-blur-sm sm:px-5 lg:px-6">
          <div className="motif-divider pointer-events-none absolute inset-x-0 top-0" />
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/${lang}/`} className="brand-link">
              <img src="/logo.svg" alt="" aria-hidden="true" width={36} height={36} className="brand-logo" />
              <div className="brand-copy">
                <div className="header-brand-row">
                  <p className="ink-title min-w-0 truncate text-base sm:text-lg">{t('home.header.brandName')}</p>
                  <p className="header-brand-stamp hidden sm:inline-flex">{t('home.header.brandEyebrow')}</p>
                </div>
              </div>
            </Link>
            <p className="hidden rounded-full border border-[#83582e]/25 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[color:var(--ink-600)] md:inline-flex">
              {t('result.heading')}
            </p>
            <LanguageSwitcher currentLang={lang} switcherLabel={t('language.switcher')} />
          </div>
        </div>
      </header>

      {/* ── Main result card ── */}
      <section className="surface-card grid-lattice relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div aria-hidden="true" className="china-watermark -right-3 -top-4 text-[9rem] sm:text-[14rem] lg:text-[18rem]">
          {cityName.charAt(0)}
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="text-[4.5rem] leading-none sm:text-[5rem]" role="img" aria-label={cityName}>{city.emoji}</span>
          </div>

          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#8a6447]/28 bg-white/75 px-3 py-1 text-xs font-semibold text-[color:var(--ink-600)]">
            <svg className="h-3 w-3 text-[color:var(--gold-500)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            {t('result.matchLabel')}
          </div>

          <div className="font-display text-7xl font-black leading-none text-cinnabar sm:text-8xl">
            {matchPercentage}%
          </div>

          <h1 className="ink-title mt-4 text-balance text-3xl sm:text-4xl">
            {cityName}
          </h1>
          <p className="mt-1 text-sm font-semibold tracking-[0.18em] text-cinnabar">{cityLabel}</p>
          <p className="mt-3 text-sm italic text-[color:var(--ink-600)] sm:text-base">"{cityT?.tagline}"</p>
        </div>

        {/* ── Tags ── */}
        <div className="mt-7 space-y-4">
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
              const rcName = rcT?.name ?? rc.city.name
              return (
                <article key={rc.city.id} className="surface-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex-shrink-0 text-2xl leading-none" role="img" aria-label={rcName}>{rc.city.emoji}</span>
                      <h3 className="min-w-0 truncate font-display text-lg font-bold text-[color:var(--ink-950)] sm:text-xl">{rcName}</h3>
                    </div>
                    <span className="flex-shrink-0 font-display text-xl font-black text-cinnabar sm:text-2xl">
                      {rc.matchPercentage}%
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(134,106,60,0.15)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--cinnabar-600)] to-[var(--gold-500)]"
                      style={{ width: `${rc.matchPercentage}%` }}
                    />
                  </div>

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

                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">{rcT?.tagline}</p>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Retake ── */}
      <div className="mt-5">
        <button
          onClick={() => router.push(`/${lang}/quiz/`)}
          className="btn-cinnabar w-full px-6 py-4 text-lg"
        >
          {t('result.retake')}
        </button>
      </div>
    </main>
  )
}
