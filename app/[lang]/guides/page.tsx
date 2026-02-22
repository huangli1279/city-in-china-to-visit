import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale, toContentLocale } from '@/i18n/locales'
import { ALL_GUIDES } from '@/content/guides'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const t = await getTranslations({ locale, namespace: 'common' })
  const topicCluster = t.raw('home.topicCluster') as { title?: string; subtitle?: string } | undefined
  const header = t.raw('home.header') as { brandName?: string } | undefined

  const title = topicCluster?.title
    ? `${topicCluster.title} | ${header?.brandName ?? 'City Vibe Matcher'}`
    : 'City Planning Guides for First-Time China Travelers'
  const description =
    topicCluster?.subtitle ??
    'Explore focused guides that help first-time travelers compare destinations, choose trip length, and plan a confident first stop in China.'

  const isPrimaryIndexableLang = locale === 'en'
  const canonicalLang = isPrimaryIndexableLang ? locale : 'en'
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}/guides/`)

  return {
    title,
    description,
    robots: isPrimaryIndexableLang ? 'index, follow' : 'noindex, follow',
    alternates: isPrimaryIndexableLang
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates('guides/'),
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

export default async function GuidesHubPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const t = await getTranslations({ locale, namespace: 'common' })
  const topicCluster = t.raw('home.topicCluster') as {
    eyebrow?: string
    title?: string
    subtitle?: string
    cta?: string
    items?: Array<{ title: string; description: string }>
  }
  const home = t.raw('home') as { cta?: string; header?: { brandName?: string } }

  const canonicalUrl = toAbsoluteUrl(`/${lang}/guides/`)
  const title = topicCluster?.title
    ? `${topicCluster.title} | ${home?.header?.brandName ?? 'City Vibe Matcher'}`
    : 'City Planning Guides for First-Time China Travelers'
  const description =
    topicCluster?.subtitle ??
    'Explore focused guides that help first-time travelers compare destinations, choose trip length, and plan a confident first stop in China.'

  // Map guide index to translated titles from topicCluster.items
  const localizedItems = Array.isArray(topicCluster?.items) ? topicCluster.items : []

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: toContentLocale(lang),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl(`/${lang}/`) },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: canonicalUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
      itemListElement: ALL_GUIDES.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: localizedItems[index]?.title ?? guide.title,
        url: toAbsoluteUrl(`/${lang}/guides/${guide.slug}/`),
      })),
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
        <span>Guides</span>
      </nav>

      <section className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">
          {topicCluster?.eyebrow ?? 'Topic cluster'}
        </p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">
          {topicCluster?.title ?? 'China city planning guides'}
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--ink-600)] sm:text-base">
          {topicCluster?.subtitle ??
            'These pages support the destination-matching quiz and answer the planning questions that usually block first-time trips: where to start, how long to stay, and how to compare high-profile cities.'}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          Instead of generic rankings, each guide is written as a decision framework. You can move from uncertainty to a practical shortlist in one reading session.
        </p>

        <h2 className="ink-title mt-8 text-xl font-bold">Available guides</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ALL_GUIDES.map((guide, index) => {
            const localizedTitle = localizedItems[index]?.title ?? guide.title
            const localizedDescription = localizedItems[index]?.description ?? guide.description
            return (
              <Link
                key={guide.slug}
                href={`/${lang}/guides/${guide.slug}/`}
                className="focus-ring surface-muted block p-5 transition-colors hover:border-[#b43c2f]/35"
              >
                <h3 className="font-display text-base font-semibold leading-snug text-[color:var(--ink-950)]">
                  {localizedTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-600)]">{localizedDescription}</p>
              </Link>
            )
          })}
        </div>

        <h2 className="ink-title mt-8 text-xl font-bold">How to use this guide cluster</h2>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          Start with a comparison guide, then validate your pace with the day-planning guide. If two destinations still feel equally good, choose the one with lower logistics friction for your arrival week.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          After choosing your likely first city, use the quiz to validate fit against the matching model and keep one backup city in case seasonality or flight constraints shift your plan.
        </p>

        <h2 className="ink-title mt-8 text-xl font-bold">Scope and limitations</h2>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          These guides are designed for first-time visitors and focus on decision clarity, not comprehensive destination encyclopedias. They summarize high-impact tradeoffs such as transport friction, planning load, and itinerary recovery needs.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          For official visa policy, entry requirements, and safety notices, always verify information through government and embassy sources before finalizing bookings.
        </p>
      </section>

      <section className="surface-card mt-5 p-6 text-center sm:p-8 lg:p-10">
        <h2 className="ink-title text-2xl font-bold">Need a personalized answer?</h2>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-600)]">
          Use the 18-question matcher to rank Chinese cities by your travel style.
        </p>
        <Link
          href={`/${lang}/quiz`}
          className="btn-cinnabar mt-5 inline-flex px-8 py-4 text-lg"
        >
          {(home as { cta?: string })?.cta ?? 'Start the quiz'}
        </Link>
      </section>
    </main>
  )
}
