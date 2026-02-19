import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function HomePage() {
  const navigate = useNavigate()
  const { lang = 'en' } = useParams<{ lang: string }>()
  const { t } = useTranslation('common')

  const steps = [t('home.step1'), t('home.step2'), t('home.step3')]

  return (
    <main className="flex flex-col min-h-dvh px-6 py-8">
      {/* Language switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>

      {/* Hero + content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
        <h1 className="text-4xl font-bold text-slate-900 leading-tight">
          {t('home.title')}
        </h1>

        <p className="text-base text-slate-500 max-w-sm">{t('home.subtitle')}</p>

        {/* How it works */}
        <div className="w-full max-w-sm text-left bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {t('home.howItWorksTitle')}
          </p>
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 leading-snug">{step}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(`/${lang}/quiz`)}
          className="w-full max-w-sm bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold text-lg py-4 px-8 rounded-2xl transition-colors min-h-[52px]"
        >
          {t('home.cta')}
        </button>
      </div>
    </main>
  )
}
