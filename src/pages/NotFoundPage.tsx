import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | City Vibe Matcher"
        description="The requested page could not be found."
        canonicalPath="/404"
        robots="noindex,nofollow"
      />
      <main id="main-content" className="min-h-dvh py-8">
        <section className="surface-card mx-auto max-w-3xl p-6 sm:p-8">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">404</p>
          <h1 className="ink-title mt-3 text-3xl leading-tight sm:text-4xl">Page not found</h1>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
            The URL may be outdated, misspelled, or removed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/en" className="btn-cinnabar px-5 py-3 text-sm">
              Go to English homepage
            </Link>
            <a href="/zh" className="btn-ink px-5 py-3 text-sm">
              中文
            </a>
            <a href="/ja" className="btn-ink px-5 py-3 text-sm">
              日本語
            </a>
            <a href="/ko" className="btn-ink px-5 py-3 text-sm">
              한국어
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
