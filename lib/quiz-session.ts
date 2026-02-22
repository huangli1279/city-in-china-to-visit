import { type Answers } from '@/lib/match'

const QUIZ_PROGRESS_STORAGE_KEY = 'city-vibe:quiz-progress:v1'
const QUIZ_RESULT_STORAGE_KEY = 'city-vibe:quiz-result:v1'

interface QuizState {
  currentIdx: number
  answers: Answers
}

function defaultQuizState(): QuizState {
  return {
    currentIdx: 0,
    answers: {},
  }
}

function isValidAnswerOption(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 3
}

function sanitizeAnswers(input: unknown, questionCount: number): Answers {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {}

  const answers: Answers = {}
  for (const [rawIdx, rawAnswer] of Object.entries(input as Record<string, unknown>)) {
    const idx = Number(rawIdx)
    if (!Number.isInteger(idx) || idx < 0 || idx >= questionCount) continue
    if (typeof rawAnswer !== 'number' || !isValidAnswerOption(rawAnswer)) continue
    answers[idx] = rawAnswer
  }
  return answers
}

export function encodeAnswers(answers: Answers, questionCount: number): string {
  return Array.from({ length: questionCount }, (_, idx) => String(answers[idx] ?? 0)).join('')
}

export function decodeAnswers(encoded: string, questionCount: number): Answers | null {
  if (encoded.length !== questionCount) return null

  const answers: Answers = {}
  for (let i = 0; i < encoded.length; i++) {
    const value = Number.parseInt(encoded[i], 10)
    if (!isValidAnswerOption(value)) return null
    answers[i] = value
  }
  return answers
}

export function getInitialQuizState(questionCount: number): QuizState {
  if (typeof window === 'undefined') return defaultQuizState()

  let raw: string | null = null
  try {
    raw = window.sessionStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY)
  } catch {
    return defaultQuizState()
  }
  if (!raw) return defaultQuizState()

  try {
    const parsed = JSON.parse(raw) as { currentIdx?: unknown; answers?: unknown }
    const maxIdx = Math.max(questionCount - 1, 0)
    const safeCurrentIdx =
      typeof parsed.currentIdx === 'number' && Number.isInteger(parsed.currentIdx)
        ? Math.min(Math.max(parsed.currentIdx, 0), maxIdx)
        : 0
    const safeAnswers = sanitizeAnswers(parsed.answers, questionCount)

    return {
      currentIdx: safeCurrentIdx,
      answers: safeAnswers,
    }
  } catch {
    return defaultQuizState()
  }
}

export function saveQuizState(state: QuizState, questionCount: number): void {
  if (typeof window === 'undefined') return

  const maxIdx = Math.max(questionCount - 1, 0)
  const payload: QuizState = {
    currentIdx: Math.min(Math.max(state.currentIdx, 0), maxIdx),
    answers: sanitizeAnswers(state.answers, questionCount),
  }
  try {
    window.sessionStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore storage write errors (e.g., private mode quota/security restrictions)
  }
}

export function clearQuizState(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY)
  } catch {
    // Ignore storage removal errors
  }
}

export function saveResultAnswers(encoded: string): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, encoded)
  } catch {
    // Ignore storage write errors (e.g., private mode quota/security restrictions)
  }
}

export function loadResultAnswers(questionCount: number): string | null {
  if (typeof window === 'undefined') return null

  let encoded: string | null = null
  try {
    encoded = window.sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY)
  } catch {
    return null
  }
  if (!encoded) return null

  return encoded.length === questionCount ? encoded : null
}

export function clearResultAnswers(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY)
  } catch {
    // Ignore storage removal errors
  }
}
