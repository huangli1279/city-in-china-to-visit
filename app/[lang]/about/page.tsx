import type { Metadata } from 'next'
import Link from 'next/link'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { getPageSeo } from '@/content/pages/seo-copy'

const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'
const REVIEWER_TEAM_NAME = 'City Vibe Matcher Research Desk'
const PUBLISHED_DATE_ISO = '2026-01-15'
const PUBLISHED_DATE_TEXT = 'January 15, 2026'
const LAST_MODIFIED_DATE_ISO = '2026-02-21'
const LAST_MODIFIED_DATE_TEXT = 'February 21, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const { title, description } = getPageSeo(lang, 'about')
  const canonicalUrl = toAbsoluteUrl(`/${lang}/about/`)

  return {
    title,
    description,
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: buildNextAlternates('about/'),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: buildOgLocale(lang),
      alternateLocale: buildOgLocaleAlternates(lang),
      images: [{ url: toAbsoluteUrl('/og-image.svg'), width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [toAbsoluteUrl('/og-image.svg')] },
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const { title, description } = getPageSeo(lang, 'about')
  const canonicalUrl = toAbsoluteUrl(`/${lang}/about/`)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: lang === 'zh' ? 'zh-CN' : lang,
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: LAST_MODIFIED_DATE_ISO,
      author: { '@type': 'Organization', name: AUTHOR_NAME },
      publisher: { '@type': 'Organization', name: 'City Vibe Matcher', url: toAbsoluteUrl('/') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl(`/${lang}/`) },
        { '@type': 'ListItem', position: 2, name: 'About', item: canonicalUrl },
      ],
    },
  ]

  return (
    <main id="main-content" className="min-h-dvh py-4 sm:py-6 lg:py-8">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav className="mb-5 flex items-center gap-2 text-sm text-[color:var(--ink-600)]" aria-label="Breadcrumb">
        <Link href={`/${lang}/`} className="hover:text-cinnabar transition-colors">Home</Link>
        <span>/</span>
        <span>About</span>
      </nav>

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">About</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">
          How this project helps first-time China travelers
        </h1>
        <div className="mt-4 space-y-1 text-sm text-[color:var(--ink-600)]">
          <p><strong>Author:</strong> {AUTHOR_NAME}</p>
          <p><strong>Published:</strong> <time dateTime={PUBLISHED_DATE_ISO}>{PUBLISHED_DATE_TEXT}</time></p>
          <p><strong>Last updated:</strong> <time dateTime={LAST_MODIFIED_DATE_ISO}>{LAST_MODIFIED_DATE_TEXT}</time></p>
        </div>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-700)]">
          City Vibe Matcher is a planning-first project for travelers who already decided to visit China but still need confidence about where to start.
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Our mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We reduce first-city decision fatigue by turning broad travel preferences into a practical shortlist. Instead of sending users through endless listicles, we guide them to a specific starting option in minutes.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The goal is not to crown one universal best city. The goal is to help each traveler pick a first stop that matches pace, interests, and comfort level.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">How the matching model works</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The quiz uses 18 scenario-based questions and maps responses into six dimensions: history appetite, nature versus urban preference, cultural comfort, activity level, social vibe, and adventure appetite.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Each city profile is manually reviewed and scored on the same dimensions. We then compare user scores against city scores and rank the closest matches.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            This process is designed for directional planning, not for perfect prediction. Users should still validate seasonality, flight availability, and current policy updates.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Editorial standards</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Guide pages are written and updated by the {AUTHOR_NAME} team. We prioritize clarity, practical tradeoffs, and first-time traveler constraints over trend-driven content.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            When recommendations include policy-sensitive topics such as visa or entry requirements, we direct readers to official sources for final confirmation.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">What we do not do</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We do not sell tours, visas, or priority access services. The site is built as an independent planning utility to help travelers make earlier, clearer city decisions.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We also do not claim real-time policy authority. All time-sensitive details should be confirmed with official channels before payment or departure.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Contact and feedback</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Questions, corrections, and feedback are welcome. Reach us at <strong>{CONTACT_EMAIL}</strong> or visit the{' '}
            <Link href={`/${lang}/contact/`} className="text-cinnabar hover:underline">Contact</Link> page.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            For transparency on editorial workflow, see{' '}
            <Link href={`/${lang}/editorial-policy/`} className="text-cinnabar hover:underline">Editorial Policy</Link>{' '}
            and{' '}
            <Link href={`/${lang}/content-updates/`} className="text-cinnabar hover:underline">Content Updates</Link>.
          </p>
        </section>
      </article>
    </main>
  )
}
