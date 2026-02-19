import { useNavigate, useLocation } from 'react-router-dom'
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
  const { t } = useTranslation('common')

  const state = location.state as ResultState | null

  // Guard: redirect if accessed directly without quiz state
  if (!state?.bestMatch) {
    return (
      <main className="flex flex-col items-center justify-center min-h-dvh px-6 text-center gap-4">
        <p className="text-slate-500">No results yet. Take the quiz first!</p>
        <button
          onClick={() => navigate('/quiz')}
          className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-sky-600 transition-colors min-h-[52px]"
        >
          Take the Quiz
        </button>
      </main>
    )
  }

  const { bestMatch, runnerUps } = state
  const { city, matchPercentage } = bestMatch

  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  const cityT = cityTranslations[city.id]

  return (
    <main className="flex flex-col min-h-dvh px-6 py-8">
      {/* Language switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      {/* Heading */}
      <p className="text-base text-slate-500 text-center mb-5">{t('result.heading')}</p>

      {/* Best match card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-4">
        <div className="text-center">
          {/* Emoji */}
          <div className="text-6xl mb-3">{city.emoji}</div>

          {/* City name — ≥ 32px */}
          <h1 className="text-4xl font-bold text-slate-900 mb-1">{city.name}</h1>

          {/* Label */}
          <p className="text-sm text-slate-400 font-medium tracking-wide mb-5">{city.label}</p>

          {/* Match percentage — ≥ 48px */}
          <div className="text-7xl font-black text-sky-500 leading-none mb-1">
            {matchPercentage}%
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-5">
            {t('result.matchLabel')}
          </p>

          {/* Tagline */}
          <p className="text-base font-semibold text-slate-700 italic mb-3">
            "{cityT?.tagline}"
          </p>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed">{cityT?.description}</p>
        </div>

        {/* Practical info */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
              📅 {t('result.bestTime')}
            </p>
            <p className="text-slate-600">{city.bestTime}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
              💰 {t('result.budget')}
            </p>
            <p className="text-slate-600">{city.budgetRange}</p>
          </div>
        </div>
      </div>

      {/* Runner-up cities */}
      {runnerUps.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            {t('result.runnerUps')}
          </p>
          <div className="space-y-2">
            {runnerUps.map((rc) => {
              const rcT = cityTranslations[rc.city.id]
              return (
                <div
                  key={rc.city.id}
                  className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3"
                >
                  <span className="text-3xl flex-shrink-0">{rc.city.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="font-semibold text-slate-800 truncate">{rc.city.name}</p>
                      <p className="font-bold text-sky-500 flex-shrink-0">{rc.matchPercentage}%</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{rcT?.tagline}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Retake button */}
      <button
        onClick={() => navigate('/quiz')}
        className="w-full py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-base hover:bg-slate-100 transition-colors min-h-[52px]"
      >
        {t('result.retake')}
      </button>
    </main>
  )
}
