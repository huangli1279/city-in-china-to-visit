import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumb from '@/components/Breadcrumb'

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
          { label: 'Privacy Policy' },
        ]}
      />

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

      <SiteFooter lang={lang} footer={footerData} navLinks={navLinks} />
    </main>
  )
}
