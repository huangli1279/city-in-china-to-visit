import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LangLayout from './components/LangLayout'

// 3-6: Route-based code splitting — each page loads only when navigated to
const HomePage = lazy(() => import('./pages/HomePage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const ResultPage = lazy(() => import('./pages/ResultPage'))

export default function App() {
  const { t } = useTranslation('common')

  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        {t('a11y.skipToMainContent')}
      </a>
      <div className="min-h-dvh">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10 xl:px-12">
          <Suspense fallback={<p className="py-8 text-center text-sm text-ink-soft">Loading…</p>}>
            <Routes>
              {/* 4-5: root redirects to /en */}
              <Route path="/" element={<Navigate to="/en" replace />} />
              {/* Language-prefixed routes */}
              <Route path="/:lang" element={<LangLayout />}>
                <Route index element={<HomePage />} />
                <Route path="quiz" element={<QuizPage />} />
                <Route path="result" element={<ResultPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  )
}
