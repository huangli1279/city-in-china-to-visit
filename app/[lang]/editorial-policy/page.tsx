import type { Metadata } from 'next'
import Link from 'next/link'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'

const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'
const REVIEWER_TEAM_NAME = 'City Vibe Matcher Research Desk'
const LAST_MODIFIED_DATE_ISO = '2026-02-21'
const LAST_MODIFIED_DATE_TEXT = 'February 21, 2026'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'editorial')
  const isPrimaryIndexableLang = locale === 'en'
  const canonicalLang = isPrimaryIndexableLang ? locale : 'en'
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}/editorial-policy/`)

  return {
    title,
    description,
    robots: isPrimaryIndexableLang ? 'index, follow' : 'noindex, follow',
    alternates: isPrimaryIndexableLang
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates('editorial-policy/'),
        }
      : {
          canonical: canonicalUrl,
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: buildOgLocale(locale),
      alternateLocale: buildOgLocaleAlternates(locale),
      images: [{ url: toAbsoluteUrl('/og-image.svg'), width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [toAbsoluteUrl('/og-image.svg')] },
  }
}

export default async function EditorialPolicyPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'editorial')
  const canonicalUrl = toAbsoluteUrl(`/${lang}/editorial-policy/`)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      dateModified: LAST_MODIFIED_DATE_ISO,
      author: { '@type': 'Organization', name: AUTHOR_NAME },
      reviewedBy: { '@type': 'Organization', name: REVIEWER_TEAM_NAME },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl(`/${lang}/`) },
        { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: canonicalUrl },
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
        <span>Editorial Policy</span>
      </nav>

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">Editorial Policy</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">{title}</h1>
        <div className="mt-4 space-y-1 text-sm text-[color:var(--ink-600)]">
          <p><strong>Author:</strong> {AUTHOR_NAME}</p>
          <p><strong>Reviewed by:</strong> {REVIEWER_TEAM_NAME}</p>
          <p><strong>Last updated:</strong> <time dateTime={LAST_MODIFIED_DATE_ISO}>{LAST_MODIFIED_DATE_TEXT}</time></p>
        </div>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-700)]">
          This page explains who writes, reviews, and updates our China city planning guides and how corrections are handled.
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Who wrote, reviewed, and updated this site</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            <strong>{AUTHOR_NAME}</strong> drafts and updates guide content with a planning-first scope for first-time travelers.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            <strong>{REVIEWER_TEAM_NAME}</strong> reviews structure, factual alignment, source quality, and internal-link consistency before publication.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Editorial standards</h2>
          <ul className="mt-3 space-y-2">
            {[
              'Every guide must include a practical decision framework, not only destination descriptions.',
              'Time-sensitive claims must point readers to official channels for final confirmation.',
              'Each guide update requires an update summary and refreshed internal pathway links.',
            ].map((item, i) => (
              <li key={i} className="surface-muted p-3 text-sm text-[color:var(--ink-700)]">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Correction workflow</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Correction requests are processed with source-date checks. If a correction affects multiple pages, we patch all impacted guides in one batch.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Use the{' '}
            <Link href={`/${lang}/contact/`} className="text-cinnabar hover:underline">Contact</Link>{' '}
            page and include URL, current statement, proposed correction, and source link.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Publishing rhythm</h2>
          <ul className="mt-3 space-y-2">
            {[
              'Cadence target: publish or refresh at least two high-value guides every week.',
              'Run a cross-link and outdated-claim refresh cycle every two weeks.',
              'Public changelog is maintained on the Content Updates page.',
            ].map((item, i) => (
              <li key={i} className="surface-muted p-3 text-sm text-[color:var(--ink-700)]">{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
            See the full log on the{' '}
            <Link href={`/${lang}/content-updates/`} className="text-cinnabar hover:underline">Content Updates</Link> page.
          </p>
        </section>
      </article>
    </main>
  )
}
