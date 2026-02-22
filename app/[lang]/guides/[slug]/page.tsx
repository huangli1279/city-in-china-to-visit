import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale, toContentLocale } from '@/i18n/locales'
import { ALL_GUIDES, GUIDE_BY_SLUG, CONTENT_UPDATE_LOG } from '@/content/guides'

const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const
const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'

type Props = { params: Promise<{ lang: string; slug: string }> }

function getGuideLastModified(slug: string): string {
  for (const entry of CONTENT_UPDATE_LOG) {
    if (entry.guideSlugs.includes(slug)) return entry.dateISO
  }
  return CONTENT_UPDATE_LOG[CONTENT_UPDATE_LOG.length - 1]?.dateISO ?? '2026-02-14'
}

function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${months[month - 1]} ${day}, ${year}`
}

export function generateStaticParams() {
  return VALID_LANGS.flatMap((lang) =>
    ALL_GUIDES.map((guide) => ({ lang, slug: guide.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const guide = GUIDE_BY_SLUG.get(slug)
  if (!guide) return {}

  const locale = normalizeUrlLocale(lang)
  const t = await getTranslations({ locale, namespace: 'common' })
  const topicCluster = t.raw('home.topicCluster') as { items?: Array<{ title: string; description: string }> } | undefined
  const localizedItems = Array.isArray(topicCluster?.items) ? topicCluster.items : []
  const guideIndex = ALL_GUIDES.findIndex((g) => g.slug === slug)
  const localizedTitle = localizedItems[guideIndex]?.title ?? guide.title
  const localizedDescription = localizedItems[guideIndex]?.description ?? guide.description

  const header = t.raw('home.header') as { brandName?: string } | undefined
  const brandName = header?.brandName ?? 'City Vibe Matcher'
  const title = `${localizedTitle} | ${brandName}`
  const canonicalUrl = toAbsoluteUrl(`/${lang}/guides/${slug}/`)
  const lastModified = getGuideLastModified(slug)

  return {
    title,
    description: localizedDescription,
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: buildNextAlternates(`guides/${slug}/`),
    },
    openGraph: {
      title,
      description: localizedDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: lastModified,
      modifiedTime: lastModified,
      authors: [AUTHOR_NAME],
      locale: buildOgLocale(lang),
      alternateLocale: buildOgLocaleAlternates(lang),
      images: [{ url: toAbsoluteUrl('/og-image.svg'), width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: localizedDescription, images: [toAbsoluteUrl('/og-image.svg')] },
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const guide = GUIDE_BY_SLUG.get(slug)
  if (!guide) notFound()

  const locale = normalizeUrlLocale(lang)
  const t = await getTranslations({ locale, namespace: 'common' })
  const topicCluster = t.raw('home.topicCluster') as { items?: Array<{ title: string; description: string }> } | undefined
  const localizedItems = Array.isArray(topicCluster?.items) ? topicCluster.items : []
  const guideIndex = ALL_GUIDES.findIndex((g) => g.slug === slug)
  const localizedTitle = localizedItems[guideIndex]?.title ?? guide.title
  const localizedDescription = localizedItems[guideIndex]?.description ?? guide.description

  const home = t.raw('home') as { cta?: string }
  const header = t.raw('home.header') as { brandName?: string } | undefined
  const brandName = header?.brandName ?? 'City Vibe Matcher'

  const canonicalUrl = toAbsoluteUrl(`/${lang}/guides/${slug}/`)
  const lastModified = getGuideLastModified(slug)
  const lastModifiedText = formatIsoDate(lastModified)

  const relatedGuides = guide.internalLinks
    .map((link) => GUIDE_BY_SLUG.get(link.slug))
    .filter((g): g is NonNullable<typeof g> => g !== undefined)
    .slice(0, 4)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: localizedDescription,
      url: canonicalUrl,
      inLanguage: toContentLocale(lang),
      dateModified: lastModified,
      author: { '@type': 'Organization', name: AUTHOR_NAME },
      reviewedBy: { '@type': 'Organization', name: guide.reviewer },
      publisher: { '@type': 'Organization', name: brandName, url: toAbsoluteUrl('/') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl(`/${lang}/`) },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: toAbsoluteUrl(`/${lang}/guides/`) },
        { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: guide.faq.question,
          acceptedAnswer: { '@type': 'Answer', text: guide.faq.answer },
        },
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
        <Link href={`/${lang}/guides/`} className="hover:text-cinnabar transition-colors">Guides</Link>
        <span>/</span>
        <span className="truncate">{localizedTitle}</span>
      </nav>

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">Planning Guide</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">{localizedTitle}</h1>

        <div className="mt-4 space-y-1 text-sm text-[color:var(--ink-600)]">
          <p><strong>Author:</strong> {AUTHOR_NAME}</p>
          <p><strong>Reviewed by:</strong> {guide.reviewer}</p>
          <p><strong>Last updated:</strong> <time dateTime={lastModified}>{lastModifiedText}</time></p>
        </div>

        <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-700)]">{guide.intro}</p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Key takeaways</h2>
          <ul className="mt-3 space-y-2">
            {guide.keyPoints.map((point, i) => (
              <li key={i} className="surface-muted p-3 text-sm text-[color:var(--ink-700)]">{point}</li>
            ))}
          </ul>
        </section>

        {guide.sections.map((section, i) => (
          <section key={i} className="mt-8">
            <h2 className="ink-title text-xl font-bold">{section.heading}</h2>
            {section.paragraphs.map((para, j) => (
              <p key={j} className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">{para}</p>
            ))}
          </section>
        ))}

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Frequently asked question</h2>
          <div className="mt-3 surface-muted p-4">
            <p className="text-sm font-semibold text-[color:var(--ink-950)]">{guide.faq.question}</p>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-700)]">{guide.faq.answer}</p>
          </div>
        </section>

        {guide.updateSummary.length > 0 && (
          <section className="mt-8">
            <h2 className="ink-title text-xl font-bold">What&apos;s changed</h2>
            <ul className="mt-3 space-y-2">
              {guide.updateSummary.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed text-[color:var(--ink-600)]">— {item}</li>
              ))}
            </ul>
          </section>
        )}

        {guide.internalLinks.length > 0 && (
          <section className="mt-8">
            <h2 className="ink-title text-xl font-bold">Continue planning</h2>
            <ul className="mt-3 space-y-2">
              {guide.internalLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${lang}/guides/${link.slug}/`}
                    className="text-sm text-cinnabar hover:underline"
                  >
                    {link.anchor}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {guide.sources.length > 0 && (
          <section className="mt-8">
            <h2 className="ink-title text-xl font-bold">Authoritative sources</h2>
            <ul className="mt-3 space-y-3">
              {guide.sources.map((source, i) => (
                <li key={i} className="text-sm">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-cinnabar hover:underline"
                  >
                    {source.name}
                  </a>
                  <span className="ml-2 text-[color:var(--ink-600)]">{source.note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {relatedGuides.length > 0 && (
        <section className="surface-card mt-5 p-6 sm:p-8 lg:p-10">
          <h2 className="ink-title text-xl font-bold">Related guides</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedGuides.map((related) => {
              const relatedIndex = ALL_GUIDES.findIndex((g) => g.slug === related.slug)
              const relatedTitle = localizedItems[relatedIndex]?.title ?? related.title
              const relatedDesc = localizedItems[relatedIndex]?.description ?? related.description
              return (
                <Link
                  key={related.slug}
                  href={`/${lang}/guides/${related.slug}/`}
                  className="focus-ring surface-muted block p-5 transition-colors hover:border-[#b43c2f]/35"
                >
                  <h3 className="font-display text-base font-semibold leading-snug text-[color:var(--ink-950)]">
                    {relatedTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{relatedDesc}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="surface-card mt-5 p-6 text-center sm:p-8 lg:p-10">
        <h2 className="ink-title text-2xl font-bold">Ready to pick your city?</h2>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          Use the 18-question matcher to rank Chinese cities by your travel style.
        </p>
        <Link
          href={`/${lang}/quiz`}
          className="btn-cinnabar mt-5 inline-flex px-8 py-4 text-lg"
        >
          {home?.cta ?? 'Start the quiz'}
        </Link>
      </section>
    </main>
  )
}
