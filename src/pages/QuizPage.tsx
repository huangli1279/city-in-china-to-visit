import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { questions } from '../data/questions'
import { calcUserScores, getRankedCities, type Answers } from '../utils/match'
import ProgressBar from '../components/ProgressBar'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface TranslatedQuestion {
  id: number
  text: string
  options: string[]
}

export default function QuizPage() {
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const total = questions.length
  const isFirstQuestion = currentIdx === 0
  const isLastQuestion = currentIdx === total - 1
  const selectedOption = answers[currentIdx]

  const translatedQuestions = t('questions', {
    ns: 'questions',
    returnObjects: true,
  }) as TranslatedQuestion[]
  const tq = translatedQuestions[currentIdx]

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
    navigate('/result', {
      state: {
        bestMatch: ranked[0],
        runnerUps: ranked.slice(1, 3),
      },
    })
  }

  return (
    <main className="flex flex-col h-dvh">
      {/* Header: progress bar + language switcher */}
      <header className="flex-shrink-0 px-6 pt-4 pb-3 bg-slate-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ProgressBar current={currentIdx + 1} total={total} />
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Scrollable question + options */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
        <h2 className="text-xl font-bold text-slate-900 leading-snug mb-6">
          {tq?.text}
        </h2>

        <div className="space-y-3">
          {tq?.options.map((optionText, idx) => {
            const isSelected = selectedOption === idx
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left px-4 py-4 rounded-2xl border-2 transition-colors min-h-[52px] ${
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
      </div>

      {/* Footer: navigation buttons */}
      <footer className="flex-shrink-0 px-6 pt-2 pb-6 bg-slate-50">
        <div className="flex gap-3">
          {!isFirstQuestion && (
            <button
              onClick={handleBack}
              className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-base hover:bg-slate-100 transition-colors min-h-[52px]"
            >
              {t('quiz.back')}
            </button>
          )}
          <button
            onClick={isLastQuestion ? handleSubmit : handleNext}
            disabled={selectedOption === undefined}
            className={`flex-1 py-4 rounded-2xl font-semibold text-base transition-colors min-h-[52px] ${
              selectedOption !== undefined
                ? 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? t('quiz.submit') : t('quiz.next')}
          </button>
        </div>
      </footer>
    </main>
  )
}
