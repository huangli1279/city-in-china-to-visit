import { useTranslation } from 'react-i18next'

interface Props {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: Props) {
  const { t } = useTranslation('common')
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5">
        <span>{t('quiz.progress', { current, total })}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
