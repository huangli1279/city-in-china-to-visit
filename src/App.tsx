import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LangLayout from './components/LangLayout'

// 3-6: Route-based code splitting — each page loads only when navigated to
const HomePage = lazy(() => import('./pages/HomePage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const ResultPage = lazy(() => import('./pages/ResultPage'))

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col items-center bg-slate-50">
        <div className="w-full max-w-app">
          <Suspense fallback={null}>
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
