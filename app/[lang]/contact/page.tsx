import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import { normalizeUrlLocale } from '@/i18n/locales'
import { getPageSeo } from '@/content/pages/seo-copy'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumb from '@/components/Breadcrumb'

const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'
const LAST_MODIFIED_DATE_ISO = '2026-02-21'
const LAST_MODIFIED_DATE_TEXT = 'February 21, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'contact')
  const isPrimaryIndexableLang = locale === 'en'
  const canonicalLang = isPrimaryIndexableLang ? locale : 'en'
  const canonicalUrl = toAbsoluteUrl(`/${canonicalLang}/contact/`)

  return {
    title,
    description,
    robots: isPrimaryIndexableLang ? 'index, follow' : 'noindex, follow',
    alternates: isPrimaryIndexableLang
      ? {
          canonical: canonicalUrl,
          languages: buildNextAlternates('contact/'),
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

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'contact')
  const canonicalUrl = toAbsoluteUrl(`/${lang}/contact/`)

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
      '@type': 'ContactPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      dateModified: LAST_MODIFIED_DATE_ISO,
      author: { '@type': 'Organization', name: AUTHOR_NAME },
      publisher: {
        '@type': 'Organization',
        name: 'City Vibe Matcher',
        url: toAbsoluteUrl('/'),
        contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: CONTACT_EMAIL }],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl(`/${lang}/`) },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: canonicalUrl },
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
          { label: 'Contact' },
        ]}
      />

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">Contact</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">Get in touch</h1>
        <div className="mt-4 space-y-1 text-sm text-[color:var(--ink-600)]">
          <p><strong>Author:</strong> {AUTHOR_NAME}</p>
          <p><strong>Last updated:</strong> <time dateTime={LAST_MODIFIED_DATE_ISO}>{LAST_MODIFIED_DATE_TEXT}</time></p>
          <p><strong>Response target:</strong> within 3 business days</p>
        </div>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-700)]">
          Use this page for feedback about matching results, content corrections, partnerships, or media inquiries.
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Email</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            General inquiries: <strong>{CONTACT_EMAIL}</strong>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Include your trip goal, expected travel month, and the page URL if your question is about a specific guide.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">What we can help with</h2>
          <ul className="mt-3 space-y-2">
            {[
              'Questions about quiz logic and recommendation interpretation',
              'Requests to correct outdated planning details in guides',
              'Partnership and media requests related to travel planning content',
            ].map((item, i) => (
              <li key={i} className="surface-muted p-3 text-sm text-[color:var(--ink-700)]">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Before you contact us</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            If your request is about one destination page, include the exact page URL and the section that should be corrected. This helps us verify and update content much faster.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            If your request is about your quiz result, include your top three recommended cities and your planned travel month so we can provide more relevant context.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">How to request a content correction</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Please include three details in your message: the current statement, the proposed correction, and one source link that supports the update. This structure helps us review requests quickly and consistently.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            For corrections involving regulations, include the publication date of your source so we can evaluate whether it reflects the latest policy revision.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Editorial corrections are reviewed in batches and may be applied across multiple guides when the same issue affects more than one city page.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Important note</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We do not provide visa, legal, or emergency travel advice. For official entry requirements and policy updates, use government and embassy sources.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            For urgent operational travel issues such as flight cancellations or border policy changes, always rely on official airline and government channels first.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Privacy and message handling</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            When you email us, we only use your message to respond and improve relevant guide content. We do not sell contact details or use inquiry emails for unrelated marketing campaigns.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            If you want your message deleted after resolution, mention it in your thread and we will remove it from our working notes.
          </p>
        </section>
      </article>

      <SiteFooter lang={lang} footer={footerData} navLinks={navLinks} />
    </main>
  )
}
