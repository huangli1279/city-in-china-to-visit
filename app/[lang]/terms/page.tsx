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

const LAST_MODIFIED_DATE_ISO = '2026-11-02'
const LAST_MODIFIED_DATE_TEXT = 'November 2, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'terms')
  const { robots, canonicalUrl, alternates, ogLocaleAlternates } = buildLocaleSeoPolicy(locale, 'terms/')

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

export default async function TermsPage({ params }: Props) {
  const { lang } = await params
  const locale = normalizeUrlLocale(lang)
  const { title, description } = getPageSeo(locale, 'terms')
  const { canonicalUrl } = buildLocaleSeoPolicy(locale, 'terms/')

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
        { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: canonicalUrl },
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
          { label: 'Terms of Service' },
        ]}
      />

      <article className="surface-card p-6 sm:p-8 lg:p-10">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-cinnabar">Legal</p>
        <h1 className="ink-title mt-3 text-balance text-3xl leading-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-[color:var(--ink-600)]">
          Last updated: <time dateTime={LAST_MODIFIED_DATE_ISO}>{LAST_MODIFIED_DATE_TEXT}</time>
        </p>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Agreement</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            These terms govern your use of bestcityinchina.site (the &quot;site&quot;), including the City Vibe Matcher quiz, city results, and planning guides. By using the site, you agree to these terms and to the{' '}
            <Link href={contentHref(lang, 'privacy-policy')} className="text-cinnabar hover:underline">Privacy Policy</Link>.
            If you do not agree, please do not use the site.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">What this site provides</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The site is a free informational travel guide. The quiz compares your answers with a fixed city model and suggests places to consider for a first trip to China. Guides explain planning tradeoffs such as pace, budget, and seasonality.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We do not sell tours, visas, tickets, insurance, or hotel rooms, and we do not act as your travel agent. Nothing on the site is an offer to book travel or a promise that a city, price, or route will be available.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Not professional advice</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Guides and quiz results are general information for trip planning. They are not legal, immigration, medical, safety, or financial advice. Visa rules, entry requirements, health notices, transport, and prices change. Confirm time-sensitive details with official government, embassy, airline, and venue sources before you pay or travel.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Using the quiz</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            You do not need an account. Quiz answers are processed in your browser to produce a result. Recommendations are a directional match against our model, not a guarantee that a city will suit you. You are responsible for decisions you make after reading a result or guide.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Acceptable use</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            You may use the site for personal, non-commercial trip planning. You may not misuse it, including by attempting to disrupt the service, scrape it in a way that degrades access for others, copy the site to impersonate us, or use it for unlawful, misleading, or abusive activity.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Intellectual property</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The site&apos;s text, quiz design, city model, graphics, and layout are owned by the site operator or used with permission. You may share links to our pages and quote short excerpts with attribution. You may not republish the guides, quiz, or branding as your own product without written permission.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Advertising</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The site may show third-party advertisements, including ads served by Google AdSense, to help cover hosting and maintenance. Ad partners may set or read cookies and use similar technologies under their own policies. We do not control the ads that appear, and an ad is not an endorsement of that product or a recommendation to buy it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Advertising does not change quiz scores or guide conclusions. We do not sell quiz answers to advertisers or build ad profiles from them. Details on analytics, cookies, and ad services are in the{' '}
            <Link href={contentHref(lang, 'privacy-policy')} className="text-cinnabar hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Third-party links</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Guides may link to official or other external sites. Those sites have their own terms and privacy practices. We are not responsible for their content, availability, or transactions.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Disclaimer</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            The site is provided &quot;as is&quot; and &quot;as available.&quot; We work to keep planning guidance clear and current, but we do not warrant that content is complete, error-free, or fit for a particular trip. Travel involves inherent risks that remain yours.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Limitation of liability</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            To the fullest extent permitted by law, the site operator is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, or travel costs, arising from your use of the site or reliance on its content. Where liability cannot be excluded, it is limited to the amount you paid us to use the site, which is zero because the site is free.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Changes</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            We may update these terms as the site or the law changes. The date at the top of this page shows the latest revision. Continued use after an update means you accept the revised terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="ink-title text-xl font-bold">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-700)]">
            Questions about these terms can be sent to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-cinnabar hover:underline">{CONTACT_EMAIL}</a> or through the{' '}
            <Link href={contentHref(lang, 'contact')} className="text-cinnabar hover:underline">Contact</Link> page.
          </p>
        </section>
      </article>

      <SiteFooter lang={lang} footer={footerData} navLinks={navLinks} />
    </main>
  )
}
