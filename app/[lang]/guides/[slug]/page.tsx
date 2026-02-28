import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { URL_LOCALES, normalizeUrlLocale, toContentLocale } from '@/i18n/locales'
import { ALL_GUIDES, GUIDE_BY_SLUG, CONTENT_UPDATE_LOG } from '@/content/guides'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumb from '@/components/Breadcrumb'

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
  return URL_LOCALES.flatMap((lang) =>
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
  const isPrimaryIndexableLang = locale === 'en'
  const canonicalLang = isPrimaryIndexableLang ? locale : 'en'
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}/guides/${slug}/`)
  const lastModified = getGuideLastModified(slug)

  return {
    title,
    description: localizedDescription,
    robots: isPrimaryIndexableLang ? 'index, follow' : 'noindex, follow',
    alternates: isPrimaryIndexableLang
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates(`guides/${slug}/`),
        }
      : {
          canonical: canonicalUrl,
        },
    openGraph: {
      title,
      description: localizedDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: lastModified,
      modifiedTime: lastModified,
      authors: [AUTHOR_NAME],
      locale: buildOgLocale(locale),
      alternateLocale: buildOgLocaleAlternates(locale),
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

  const home = t.raw('home') as {
    cta?: string
    header?: { brandName?: string; brandEyebrow?: string; navPreview?: string; navPain?: string; navModel?: string; cta?: string }
    footer?: {
      eyebrow?: string; title?: string; subtitle?: string; jumpTitle?: string; nextTitle?: string
      cta?: string; disclaimer?: string; copyright?: string
      legalLinks?: { about?: string; contact?: string; guides?: string; privacy?: string }
    }
  }
  const language = t.raw('language') as { switcher?: string }
  const brandName = home?.header?.brandName ?? 'City Vibe Matcher'

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

  const navLinks = [
    { href: `/${lang}/#landing-preview`, label: home?.header?.navPreview ?? 'City Preview' },
    { href: `/${lang}/#landing-pain`, label: home?.header?.navPain ?? 'Why This Quiz' },
    { href: `/${lang}/#landing-model`, label: home?.header?.navModel ?? 'How Matching Works' },
  ]

  const footerData = {
    eyebrow: home?.footer?.eyebrow ?? 'Plan less. Experience more.',
    title: home?.footer?.title ?? 'Your first China city should fit who you are.',
    subtitle: home?.footer?.subtitle ?? 'Take the quiz, lock your first stop, and move from endless research to a real itinerary.',
    jumpTitle: home?.footer?.jumpTitle ?? 'Explore this page',
    nextTitle: home?.footer?.nextTitle ?? 'Ready when you are',
    cta: home?.footer?.cta ?? 'Start the 18-question quiz',
    disclaimer: home?.footer?.disclaimer ?? 'No signup required. Results in about 2-3 minutes.',
    copyright: home?.footer?.copyright ?? 'Which Chinese City Matches Your Vibe',
    legalLinks: {
      about: home?.footer?.legalLinks?.about ?? 'About',
      contact: home?.footer?.legalLinks?.contact ?? 'Contact',
      guides: home?.footer?.legalLinks?.guides ?? 'Guides',
      privacy: home?.footer?.legalLinks?.privacy ?? 'Privacy Policy',
    },
  }

  return (
    <main id="main-content" className="min-h-dvh py-4 sm:py-6 lg:py-8">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <SiteHeader
        lang={lang}
        brandName={brandName}
        brandEyebrow={home?.header?.brandEyebrow ?? 'China Trip Planner'}
        ctaLabel={home?.header?.cta ?? 'Start Quiz'}
        switcherLabel={language?.switcher ?? 'Language'}
        navLinks={navLinks}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: `/${lang}/` },
          { label: 'Guides', href: `/${lang}/guides/` },
          { label: localizedTitle },
        ]}
      />

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

      <SiteFooter lang={lang} footer={footerData} navLinks={navLinks} />
    </main>
  )
}
