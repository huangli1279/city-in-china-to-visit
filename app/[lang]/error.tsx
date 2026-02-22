'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main-content" className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-display text-5xl font-black text-cinnabar">!</p>
      <h1 className="ink-title mt-4 text-balance text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--ink-600)]">
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn-cinnabar inline-flex px-6 py-3 text-sm"
        >
          Try again
        </button>
        <Link href="/" className="focus-ring inline-flex min-h-[44px] items-center rounded-xl border border-[#8a6447]/28 bg-white/70 px-6 py-3 text-sm font-semibold text-[color:var(--ink-800)] hover:border-[#b43c2f]/40">
          Go home
        </Link>
      </div>
    </main>
  )
}
