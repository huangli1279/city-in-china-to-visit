import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { cities } from '../data/cities'

interface CityTranslation {
  tagline: string
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

  const steps = [t('home.step1'), t('home.step2'), t('home.step3')]
  const cityTranslations = t('cities', {
    ns: 'cities',
    returnObjects: true,
  }) as Record<string, CityTranslation>

  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <div className="mb-4 flex justify-end lg:mb-6">
        <LanguageSwitcher />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-7">
        <section className="surface-card p-6 sm:p-8 lg:p-10">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.04]">
            {t('home.title')}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('home.subtitle')}
          </p>

          <div className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t('home.howItWorksTitle')}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map((step, i) => (
                <article key={i} className="surface-muted p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
                    0{i + 1}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">{step}</p>
                </article>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate(`/${lang}/quiz`)}
            className="focus-ring mt-7 w-full rounded-2xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-sky-600 active:bg-sky-700 sm:w-auto min-h-[52px]"
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
        </aside>
      </div>
    </main>
  )
}
