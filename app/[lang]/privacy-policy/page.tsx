import type { Metadata } from 'next'
import Link from 'next/link'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'

const LAST_MODIFIED_DATE_ISO = '2026-02-21'
const LAST_MODIFIED_DATE_TEXT = 'February 21, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'privacy')
  const isPrimaryIndexableLang = locale === 'en'
  const canonicalLang = isPrimaryIndexableLang ? locale : 'en'
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}/privacy-policy/`)

  return {
    title,
    description,
    robots: isPrimaryIndexableLang ? 'index, follow' : 'noindex, follow',
    alternates: isPrimaryIndexableLang
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates('privacy-policy/'),
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

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'privacy')
  const canonicalUrl = toAbsoluteUrl(`/${lang}/privacy-policy/`)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
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
        { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: canonicalUrl },
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
        <span>Privacy Policy</span>
      </nav>

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">Legal</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[color:var(--ink-600)]">
          Last updated: <time dateTime={LAST_MODIFIED_DATE_ISO}>{LAST_MODIFIED_DATE_TEXT}</time>
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            bestcityinchina.site is a free travel quiz tool that helps travelers choose Chinese cities to visit. We take your privacy seriously and collect minimal data.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">What data we collect</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We do not collect personally identifiable information. We do not require accounts or email addresses. Quiz answers are processed in your browser.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We use Google Analytics 4 to collect anonymous usage data such as page views, device category, referral source, and quiz interaction events.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Cookies</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Analytics cookies are used only for traffic measurement. We do not use advertising cookies or marketing trackers.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            You can opt out using the Google Analytics Opt-out Browser Add-on.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Third-party services</h2>
          <ul className="mt-3 space-y-2">
            {[
              'Google Analytics 4 for anonymous analytics',
              'Self-hosted font files for local text rendering',
              'Cloudflare Pages for hosting infrastructure',
            ].map((item, i) => (
              <li key={i} className="surface-muted p-3 text-sm text-[color:var(--ink-700)]">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Data retention</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Google Analytics data is retained for 14 months. We do not store additional personal user datasets.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            If you have questions about this policy, email <strong>{CONTACT_EMAIL}</strong> or visit our{' '}
            <Link href={`/${lang}/contact/`} className="text-cinnabar hover:underline">Contact</Link> page.
          </p>
        </section>
      </article>
    </main>
  )
}
