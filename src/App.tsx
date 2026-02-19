import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

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
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  )
}
