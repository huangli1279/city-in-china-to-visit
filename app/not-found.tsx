import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-dvh flex-col items-center justify-center py-16 text-center">
      <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">404</p>
      <h1 className="ink-title mt-3 text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--ink-600)]">
        The page you are looking for does not exist. It may have moved or the URL may be incorrect.
      </p>
      <Link href="/en/" className="btn-cinnabar mt-8 inline-flex px-8 py-4 text-base">
        Go to home
      </Link>
    </main>
  )
}
