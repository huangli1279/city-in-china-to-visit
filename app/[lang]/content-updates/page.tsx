import type { Metadata } from 'next'
import Link from 'next/link'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'
import { GUIDE_BY_SLUG, CONTENT_UPDATE_LOG } from '@/content/guides'

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

      <nav className="mb-5 flex items-center gap-2 text-sm text-[color:var(--ink-600)]" aria-label="Breadcrumb">
        <Link href={`/${lang}/`} className="hover:text-cinnabar transition-colors">Home</Link>
        <span>/</span>
        <span>Content Updates</span>
      </nav>

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
    </main>
  )
}
