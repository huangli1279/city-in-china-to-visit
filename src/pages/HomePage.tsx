import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  return (
    <main className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
        {t('home.title')}
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-sm">
        {t('home.subtitle')}
      </p>
      <button
        onClick={() => navigate('/quiz')}
        className="w-full max-w-xs bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold text-lg py-4 px-8 rounded-2xl transition-colors min-h-[52px]"
      >
        {t('home.cta')}
      </button>
    </main>
  )
}
