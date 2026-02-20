import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { questions } from '../data/questions'
import { buildAlternates, buildLangPath } from '../seo/config'
import { calcUserScores, getRankedCities, type Answers } from '../utils/match'
import { trackEvent } from '../utils/analytics'
import ProgressBar from '../components/ProgressBar'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface TranslatedQuestion {
  id: number
  text: string
  options: string[]
}

const QUIZ_ALTERNATES = buildAlternates('/quiz')

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
  const canonicalPath = buildLangPath(lang, 'quiz')
  const tq = translatedQuestions[currentIdx]
  const selectedLabel = selectedOption !== undefined ? tq?.options[selectedOption] ?? '' : ''
  const liveStatus = canAdvance
    ? `${t('quiz.progress', { current: currentIdx + 1, total })}. ${t('quiz.currentSelection')}: ${selectedLabel}`
    : `${t('quiz.progress', { current: currentIdx + 1, total })}. ${t('quiz.noSelection')}`

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
        userScores,
      },
    })
  }

  return (
    <>
      <Seo
        title={t('quiz.seo.title')}
        description={t('quiz.seo.description')}
        canonicalPath={canonicalPath}
        alternates={QUIZ_ALTERNATES}
        robots="noindex,follow"
      />
      <main id="main-content" className="no-scroll-x min-h-dvh py-4 sm:py-6 lg:py-8">
      <p className="sr-only" aria-live="polite">
        {liveStatus}
      </p>
      <header className="sticky top-3 z-20 mb-4 lg:mb-5">
        <div className="surface-card grid-lattice relative overflow-visible px-4 py-3 backdrop-blur-sm sm:px-5 lg:px-6">
          <div className="motif-divider pointer-events-none absolute inset-x-0 top-0" />
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/${lang}`} className="mr-auto min-w-0">
              <p className="brand-stamp">{t('home.header.brandEyebrow')}</p>
              <p className="ink-title mt-2 truncate text-base sm:text-lg">{t('home.header.brandName')}</p>
            </Link>

            <p className="hidden rounded-full border border-[#83582e]/25 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[color:var(--ink-600)] md:inline-flex">
              {t('quiz.progress', { current: currentIdx + 1, total })}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="surface-card grid-lattice p-4 sm:p-5 lg:sticky lg:top-6 lg:h-fit">
          <div className="mb-4">
            <ProgressBar current={currentIdx + 1} total={total} />
          </div>
          <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
            {t('quiz.questionMap')}
          </p>
          <p className="mb-4 text-sm text-[color:var(--ink-600)]">
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
                      ? 'border-[#b43c2f]/65 bg-[rgba(180,60,47,0.14)] text-[color:var(--cinnabar-600)]'
                      : isAnswered
                        ? 'border-[#866949]/30 bg-white/70 text-[color:var(--ink-800)] hover:border-[#b43c2f]/35 hover:text-[color:var(--cinnabar-600)]'
                        : 'border-[#a17f5f]/22 bg-[rgba(241,233,219,0.88)] text-[color:var(--ink-600)] hover:border-[#866949]/33 hover:text-[color:var(--ink-800)]'
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </aside>

        <section className="surface-card p-5 sm:p-6 lg:p-8">
          <h2 className="ink-title mb-6 text-balance text-xl leading-snug lg:text-2xl">{tq?.text}</h2>

          <div className="grid gap-3 xl:grid-cols-2">
            {tq?.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`focus-ring min-h-[64px] rounded-2xl border-2 px-4 py-4 text-left transition-colors ${
                    isSelected
                      ? 'border-[#b43c2f]/60 bg-[rgba(180,60,47,0.1)] text-[color:var(--ink-950)]'
                      : 'border-[#866949]/26 bg-white/72 text-[color:var(--ink-800)] hover:border-[#b43c2f]/32 hover:bg-[rgba(47,138,115,0.08)]'
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
        <div className="surface-card rounded-2xl bg-white/95 p-3 backdrop-blur sm:p-4">
          <div className="flex gap-3">
            {!isFirstQuestion && (
              <button
                onClick={handleBack}
                className="focus-ring min-h-[52px] flex-1 rounded-2xl border-2 border-[#866949]/25 py-3 text-base font-semibold text-[color:var(--ink-600)] transition-colors hover:bg-[rgba(241,233,219,0.85)]"
              >
                {t('quiz.back')}
              </button>
            )}
            <button
              onClick={isLastQuestion ? handleSubmit : handleNext}
              disabled={isLastQuestion ? !canSubmit : !canAdvance}
              className={`focus-ring min-h-[52px] flex-1 rounded-2xl py-3 text-base font-semibold transition-colors ${
                (isLastQuestion ? canSubmit : canAdvance)
                  ? 'bg-[linear-gradient(135deg,var(--cinnabar-600),var(--cinnabar-500))] text-white hover:brightness-105 active:brightness-95'
                  : 'cursor-not-allowed bg-[rgba(190,176,160,0.5)] text-[color:var(--ink-600)]'
              }`}
            >
              {isLastQuestion ? t('quiz.submit') : t('quiz.next')}
            </button>
          </div>
        </div>
      </footer>
      </main>
    </>
  )
}
