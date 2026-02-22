import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'
import { GUIDE_BY_SLUG, CONTENT_UPDATE_LOG } from '@/content/guides'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumb from '@/components/Breadcrumb'

const LAST_MODIFIED_DATE_ISO = '2026-02-21'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'updates')
  const isPrimaryIndexableLang = locale === 'en'
  const canonicalLang = isPrimaryIndexableLang ? locale : 'en'
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}/content-updates/`)

  return {
    title,
    description,
    robots: isPrimaryIndexableLang ? 'index, follow' : 'noindex, follow',
    alternates: isPrimaryIndexableLang
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates('content-updates/'),
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

export default async function ContentUpdatesPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'updates')
  const canonicalUrl = toAbsoluteUrl(`/${lang}/content-updates/`)

  const t = await getTranslations({ locale, namespace: 'common' })
  const home = t.raw('home') as {
    header?: { brandName?: string; brandEyebrow?: string; navPreview?: string; navPain?: string; navModel?: string; cta?: string }
    footer?: {
      eyebrow?: string; title?: string; subtitle?: string; jumpTitle?: string; nextTitle?: string
      cta?: string; disclaimer?: string; copyright?: string
      legalLinks?: { about?: string; contact?: string; guides?: string; privacy?: string }
    }
  }
  const language = t.raw('language') as { switcher?: string }
  const brandName = home?.header?.brandName ?? 'City Vibe Matcher'

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

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      dateModified: LAST_MODIFIED_DATE_ISO,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl(`/${lang}/`) },
        { '@type': 'ListItem', position: 2, name: 'Content Updates', item: canonicalUrl },
      ],
    },
  ]

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
          { label: 'Content Updates' },
        ]}
      />

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">Content Updates</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-700)]">
          Publishing rhythm: weekly 2+ high-value updates, plus a bi-weekly refresh cycle for older guides and internal links.
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Cadence target</h2>
          <ul className="mt-3 space-y-2">
            {[
              'Publish or update at least two guide pages every week.',
              'Revalidate internal links and source timestamps every two weeks.',
              'Document every content revision with impacted guide URLs.',
            ].map((item, i) => (
              <li key={i} className="surface-muted p-3 text-sm text-[color:var(--ink-700)]">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Latest changes</h2>
          <p className="mt-3 text-sm text-[color:var(--ink-600)]">
            Latest production changes across the China city guide cluster are listed below.
          </p>
        </section>

        {CONTENT_UPDATE_LOG.map((entry, i) => (
          <section key={i} className="mt-6 border-t border-[#ddd6c4] pt-6">
            <h2 className="ink-title text-lg font-bold">
              <time dateTime={entry.dateISO}>{entry.dateText}</time>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-700)]">{entry.summary}</p>
            <ul className="mt-3 space-y-1">
              {entry.guideSlugs.map((slug) => {
                const guide = GUIDE_BY_SLUG.get(slug)
                if (!guide) return null
                return (
                  <li key={slug}>
                    <Link
                      href={`/${lang}/guides/${slug}/`}
                      className="text-sm text-cinnabar hover:underline"
                    >
                      {guide.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </article>

      <SiteFooter lang={lang} footer={footerData} navLinks={navLinks} />
    </main>
  )
}
