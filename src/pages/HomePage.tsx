import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { cities } from '../data/cities'
import { trackEvent } from '../utils/analytics'

interface CityTranslation {
  tagline: string
}

interface PainPointTranslation {
  title: string
  description: string
}

const CITY_BY_ID = new Map(cities.map((city) => [city.id, city]))
const PREVIEW_CITY_IDS = ['shanghai', 'xian', 'chengdu', 'guilin', 'chongqing', 'sanya'] as const
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

  const painPoints = Array.isArray(painPointsRaw) ? painPointsRaw : []
  const modelDimensions = Array.isArray(modelDimensionsRaw) ? modelDimensionsRaw : []
  const sharePoints = Array.isArray(sharePointsRaw) ? sharePointsRaw : []

  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  useEffect(() => {
    trackEvent('view_landing', { lang })
  }, [lang])

  function goToQuiz(section: 'hero' | 'final') {
    trackEvent('click_start_quiz', { lang, section })
    navigate(`/${lang}/quiz`)
  }

  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <div className="mb-4 flex justify-end lg:mb-6">
        <LanguageSwitcher />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-7">
        <section className="surface-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-20 h-56 w-56 rounded-full bg-sky-200/60 blur-3xl" />
          <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
            {t('home.badge')}
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-[3.2rem] lg:leading-[1.04]">
            {t('home.title')}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('home.subtitle')}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="surface-muted p-4">
              <p className="text-2xl font-bold text-slate-900">18</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{t('home.metrics.questions')}</p>
            </article>
            <article className="surface-muted p-4">
              <p className="text-2xl font-bold text-slate-900">6</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{t('home.metrics.dimensions')}</p>
            </article>
            <article className="surface-muted p-4">
              <p className="text-2xl font-bold text-slate-900">15</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{t('home.metrics.cities')}</p>
            </article>
          </div>

          <button
            onClick={() => goToQuiz('hero')}
            className="focus-ring mt-7 min-h-[52px] w-full rounded-2xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-sky-600 active:bg-sky-700 sm:w-auto"
          >
            {t('home.cta')}
          </button>
        </section>

        <aside className="surface-card p-5 sm:p-6 lg:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {t('home.desktopPreviewTitle')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('home.desktopPreviewSubtitle')}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PREVIEW_CITIES.map((city) => (
              <article
                key={city.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-sky-200"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{city.emoji}</span>
                  <p className="font-semibold text-slate-900">{city.name}</p>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">
                  {cityTranslations[city.id]?.tagline ?? city.label}
                </p>
              </article>
            ))}
          </div>

          <article className="mt-5 rounded-2xl border border-slate-800/90 bg-slate-900 p-4 text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{t('home.shareTitle')}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-100">{t('home.shareSubtitle')}</p>
            <ul className="mt-3 grid gap-2">
              {sharePoints.map((point, i) => (
                <li key={i} className="text-xs leading-relaxed text-slate-300">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>

      <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('home.painEyebrow')}</p>
        <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{t('home.painTitle')}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {painPoints.map((painPoint, i) => (
            <article key={i} className="surface-muted p-5">
              <p className="text-base font-semibold leading-snug text-slate-900">{painPoint.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{painPoint.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-7">
        <article className="surface-card p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('home.modelEyebrow')}</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{t('home.modelTitle')}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{t('home.modelSubtitle')}</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {modelDimensions.map((dimension, i) => (
              <p key={i} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {dimension}
              </p>
            ))}
          </div>
        </article>

        <article className="surface-card p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('home.howItWorksTitle')}</p>
          <ol className="mt-4 grid gap-3">
            {modelSteps.map((step, i) => (
              <li key={i} className="surface-muted p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-600">0{i + 1}</p>
                <p className="text-sm leading-relaxed text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="surface-card mt-5 p-6 text-center sm:p-8 lg:p-10">
        <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{t('home.finalCtaTitle')}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{t('home.finalCtaSubtitle')}</p>
        <button
          onClick={() => goToQuiz('final')}
          className="focus-ring mt-6 min-h-[52px] w-full rounded-2xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-sky-600 active:bg-sky-700 sm:w-auto"
        >
          {t('home.finalCta')}
        </button>
      </section>
    </main>
  )
}
