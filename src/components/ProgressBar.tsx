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
      <div className="mb-1.5 flex items-center justify-between text-xs text-[color:var(--ink-600)]">
        <span>{t('quiz.progress', { current, total })}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(148,116,86,0.2)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--cinnabar-600),var(--gold-500))] transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
