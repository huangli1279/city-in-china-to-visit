import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buildOgLocale, toAbsoluteUrl } from '@/lib/seo'
import { buildLocaleSeoPolicy } from '@/lib/seo-policy'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'
import { contentHref } from '@/lib/indexing'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumb from '@/components/Breadcrumb'

const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'
const PUBLISHED_DATE_ISO = '2026-01-15'
const PUBLISHED_DATE_TEXT = 'January 15, 2026'
const LAST_MODIFIED_DATE_ISO = '2026-11-02'
const LAST_MODIFIED_DATE_TEXT = 'November 2, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'about')
  const { robots, canonicalUrl, alternates, ogLocaleAlternates } = buildLocaleSeoPolicy(locale, 'about/')

  return {
    title,
    description,
    robots,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: buildOgLocale(locale),
      alternateLocale: ogLocaleAlternates,
      images: [{ url: toAbsoluteUrl('/og-image.svg'), width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [toAbsoluteUrl('/og-image.svg')] },
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'about')
  const { canonicalUrl } = buildLocaleSeoPolicy(locale, 'about/')

  const t = await getTranslations({ locale, namespace: 'common' })
  const home = t.raw('home') as {
    header?: { brandName?: string; brandEyebrow?: string; navPreview?: string; navPain?: string; navModel?: string; cta?: string }
    footer?: {
      eyebrow?: string; title?: string; subtitle?: string; jumpTitle?: string; nextTitle?: string
      cta?: string; disclaimer?: string; copyright?: string
      legalLinks?: { about?: string; contact?: string; guides?: string; privacy?: string; terms?: string }
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
      terms: home?.footer?.legalLinks?.terms ?? 'Terms',
    },
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
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
          { label: 'About' },
        ]}
      />

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">About</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">
          An independent guide for your first city in China
        </h1>
        <div className="mt-4 space-y-1 text-sm text-[color:var(--ink-600)]">
          <p><strong>Author:</strong> {AUTHOR_NAME}</p>
          <p><strong>Published:</strong> <time dateTime={PUBLISHED_DATE_ISO}>{PUBLISHED_DATE_TEXT}</time></p>
          <p><strong>Last updated:</strong> <time dateTime={LAST_MODIFIED_DATE_ISO}>{LAST_MODIFIED_DATE_TEXT}</time></p>
        </div>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-700)]">
          City Vibe Matcher is an independent China travel guide for first-time foreign visitors. It is not a tour operator, a booking site, or a government office. The people who run it research and write the guides, maintain the city-matching quiz, and publish corrections when official rules change.
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Who this is for</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The site is for travelers who have decided to visit China and still need a first city. The quiz turns preferences about pace, food, history, and comfort into a shortlist. The guides then explain how to spend the first days in that place: when to go, how to arrive, where to sleep, what to eat, and what usually goes wrong.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            There is no single best city. A first stop that matches how you like to travel is more useful than a generic ranking.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">How guides are made</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Each city guide is written for this site. We do not copy articles from other publishers. A guide starts with the official record: immigration notices, UNESCO inscriptions, scenic-area committees, railway and border operators, and the venue&apos;s own ticket pages. We read those pages, then write the practical version in our own words.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The published shape is deliberate. A first-visit guide covers why the place is worth the trip, the best season, getting there and around, where to stay, a three-day plan, food, a budget in CNY and an approximate USD equivalent, and the mistakes that waste a day. Prices and entry rules are marked as approximate and dated, because both move.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Before a guide goes live, the editorial desk checks that every factual claim can be traced to a source listed on the page, that internal links point at related guides, and that the update log records the publication date. Later corrections are batched and noted on the content-updates page rather than edited in silence.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Editorial approach</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Original research, official sources, and regular updates are the standard. Policy-sensitive lines, especially visas, visa-free transit, and park reservations, always point back to the government or operator page so you can confirm them before you book.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The 18-question quiz is a separate tool. It scores answers on history, nature versus city, cultural comfort, activity, social pace, and adventure, then compares those scores with city profiles the desk maintains by hand. The result is a planning suggestion, not a prediction. Season, flights, and entry rules still have to be checked.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">What we do not do</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We do not sell tours, visas, tickets, or hotel inventory, and a guide is not an advertisement for a particular hotel. Advertising on the site, when it appears, does not change quiz scores or which facts a guide includes.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We also do not claim to be the authority on entry rules. If a guide and an official notice disagree, follow the official notice.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Contact and feedback</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Questions, corrections, and feedback are welcome. Reach us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-cinnabar hover:underline">{CONTACT_EMAIL}</a> or visit the{' '}
            <Link href={contentHref(lang, 'contact')} className="text-cinnabar hover:underline">Contact</Link> page.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            For the editorial workflow, see the{' '}
            <Link href={contentHref(lang, 'editorial-policy')} className="text-cinnabar hover:underline">Editorial Policy</Link>
            {' '}and{' '}
            <Link href={contentHref(lang, 'content-updates')} className="text-cinnabar hover:underline">Content Updates</Link>.
          </p>
        </section>
      </article>

      <SiteFooter lang={lang} footer={footerData} navLinks={navLinks} />
    </main>
  )
}
