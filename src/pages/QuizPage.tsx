import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { questions } from '../data/questions'
import { calcUserScores, getRankedCities, type Answers } from '../utils/match'
import { trackEvent } from '../utils/analytics'
import ProgressBar from '../components/ProgressBar'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface TranslatedQuestion {
  id: number
  text: string
  options: string[]
}

export default function QuizPage() {
  const navigate = useNavigate()
  const { lang = 'en' } = useParams<{ lang: string }>()
  const { t } = useTranslation('common')

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const total = questions.length
  const isFirstQuestion = currentIdx === 0
  const isLastQuestion = currentIdx === total - 1
  const selectedOption = answers[currentIdx]
  const answeredCount = Object.keys(answers).length
  const canAdvance = selectedOption !== undefined
  const canSubmit = isLastQuestion && answeredCount === total

  const translatedQuestions = t('questions', {
    ns: 'questions',
    returnObjects: true,
  }) as TranslatedQuestion[]
  const tq = translatedQuestions[currentIdx]

  useEffect(() => {
    trackEvent('view_quiz', { lang })
  }, [lang])

  function handleSelectOption(optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [currentIdx]: optionIdx }))
  }

  function handleBack() {
    setCurrentIdx((prev) => prev - 1)
  }

  function handleNext() {
    setCurrentIdx((prev) => prev + 1)
  }

  function handleSubmit() {
    const userScores = calcUserScores(answers)
    const ranked = getRankedCities(userScores)
    navigate(`/${lang}/result`, {
      state: {
        bestMatch: ranked[0],
        runnerUps: ranked.slice(1, 3),
      },
    })
  }

  return (
    <main className="no-scroll-x min-h-dvh py-4 sm:py-6 lg:py-8">
      <header className="sticky top-3 z-20 mb-4 lg:mb-5">
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
              {t('quiz.progress', { current: currentIdx + 1, total })}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="surface-card p-4 sm:p-5 lg:sticky lg:top-6 lg:h-fit">
          <div className="mb-4">
            <ProgressBar current={currentIdx + 1} total={total} />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {t('quiz.questionMap')}
          </p>
          <p className="mb-4 text-sm text-slate-600">
            {t('quiz.answered', { answered: answeredCount, total })}
          </p>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-9 lg:grid-cols-4">
            {questions.map((question, idx) => {
              const isCurrent = idx === currentIdx
              const isAnswered = answers[idx] !== undefined
              return (
                <button
                  key={question.id}
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={t('quiz.goToQuestion', { number: idx + 1 })}
                  className={`focus-ring min-h-[42px] rounded-xl border text-sm font-semibold transition-colors ${
                    isCurrent
                      ? 'border-sky-500 bg-sky-100 text-sky-700'
                      : isAnswered
                        ? 'border-slate-300 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700'
                        : 'border-slate-200 bg-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </aside>

        <section className="surface-card p-5 sm:p-6 lg:p-8">
          <h2 className="mb-6 text-xl font-bold leading-snug text-slate-900 lg:text-2xl">{tq?.text}</h2>

          <div className="grid gap-3 xl:grid-cols-2">
            {tq?.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`focus-ring min-h-[64px] rounded-2xl border-2 px-4 py-4 text-left transition-colors ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50/30'
                  }`}
                >
                  <span className="text-sm font-medium leading-snug">{optionText}</span>
                </button>
              )
            })}
          </div>
        </section>

      </div>

      <footer className="sticky bottom-0 z-10 mt-4 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
        <div className="surface-card rounded-2xl border-slate-200/90 bg-white/95 p-3 backdrop-blur sm:p-4">
          <div className="flex gap-3">
            {!isFirstQuestion && (
              <button
                onClick={handleBack}
                className="focus-ring min-h-[52px] flex-1 rounded-2xl border-2 border-slate-200 py-3 text-base font-semibold text-slate-600 transition-colors hover:bg-slate-100"
              >
                {t('quiz.back')}
              </button>
            )}
            <button
              onClick={isLastQuestion ? handleSubmit : handleNext}
              disabled={isLastQuestion ? !canSubmit : !canAdvance}
              className={`focus-ring min-h-[52px] flex-1 rounded-2xl py-3 text-base font-semibold transition-colors ${
                (isLastQuestion ? canSubmit : canAdvance)
                  ? 'bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400'
              }`}
            >
              {isLastQuestion ? t('quiz.submit') : t('quiz.next')}
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}
