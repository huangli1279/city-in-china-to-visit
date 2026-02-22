'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', padding: '4rem 1rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <p style={{ fontSize: '3rem', fontWeight: 900, color: '#b43c2f' }}>!</p>
          <h1 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ marginTop: '0.75rem', maxWidth: '24rem', fontSize: '0.875rem', lineHeight: 1.6, color: '#6b5c4b' }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#b43c2f', color: '#fff', border: 'none', borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
