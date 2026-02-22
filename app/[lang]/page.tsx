import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cities } from '@/lib/cities'
import { getTranslation } from '@/lib/i18n'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import HomepageClient, { type HomepageTranslations } from '@/components/HomepageClient'

const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const
const PREVIEW_CITY_IDS = ['shanghai', 'xian', 'chengdu', 'guilin', 'chongqing', 'sanya'] as const
const CITY_BY_ID = new Map(cities.map((city) => [city.id, city]))

const PREVIEW_CITIES = PREVIEW_CITY_IDS.map((id) => CITY_BY_ID.get(id)).filter(
  (city): city is (typeof cities)[number] => city !== undefined
)

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!(VALID_LANGS as readonly string[]).includes(lang)) return {}

  const t = await getTranslation(lang, 'common')
  const title = t('home.seo.title') as string
  const description = t('home.seo.description') as string
  const canonicalUrl = toAbsoluteUrl(`/${lang}/`)
  const ogLocale = buildOgLocale(lang)
  const ogLocaleAlternates = buildOgLocaleAlternates(lang)

  const faqItems = t('home.faq.items') as Array<{ question: string; answer: string }>
  const faqSchema =
    Array.isArray(faqItems) && faqItems.length > 0
      ? faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        }))
      : []

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t('home.seo.appName') as string,
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Any',
      inLanguage: lang === 'zh' ? 'zh-CN' : lang,
      url: canonicalUrl,
      description,
    },
  ]
  if (faqSchema.length > 0) {
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqSchema })
  }

  return {
    title,
    description,
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: buildNextAlternates(),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: ogLocale,
      alternateLocale: ogLocaleAlternates,
      images: [{ url: toAbsoluteUrl('/og-image.svg'), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [toAbsoluteUrl('/og-image.svg')],
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd),
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  if (!(VALID_LANGS as readonly string[]).includes(lang)) notFound()

  const [t, citiesT] = await Promise.all([
    getTranslation(lang, 'common'),
    getTranslation(lang, 'cities'),
  ])

  // Build city taglines map from cities namespace
  const citiesData = citiesT('') as Record<string, { tagline: string }> | undefined
  const cityTaglines: Record<string, string> = {}
  if (citiesData && typeof citiesData === 'object') {
    for (const [id, data] of Object.entries(citiesData)) {
      if (data && typeof data === 'object' && 'tagline' in data) {
        cityTaglines[id] = data.tagline as string
      }
    }
  }

  const translations: HomepageTranslations = {
    badge: t('home.badge') as string,
    title: t('home.title') as string,
    subtitle: t('home.subtitle') as string,
    cta: t('home.cta') as string,
    metrics: t('home.metrics') as HomepageTranslations['metrics'],
    desktopPreviewTitle: t('home.desktopPreviewTitle') as string,
    desktopPreviewSubtitle: t('home.desktopPreviewSubtitle') as string,
    shareTitle: t('home.shareTitle') as string,
    shareSubtitle: t('home.shareSubtitle') as string,
    sharePoints: (t('home.sharePoints') as string[]) ?? [],
    painEyebrow: t('home.painEyebrow') as string,
    painTitle: t('home.painTitle') as string,
    painPoints: (t('home.painPoints') as HomepageTranslations['painPoints']) ?? [],
    modelEyebrow: t('home.modelEyebrow') as string,
    modelTitle: t('home.modelTitle') as string,
    modelSubtitle: t('home.modelSubtitle') as string,
    modelDimensions: (t('home.modelDimensions') as string[]) ?? [],
    howItWorksTitle: t('home.howItWorksTitle') as string,
    modelStep1: t('home.modelStep1') as string,
    modelStep2: t('home.modelStep2') as string,
    modelStep3: t('home.modelStep3') as string,
    finalCtaTitle: t('home.finalCtaTitle') as string,
    finalCtaSubtitle: t('home.finalCtaSubtitle') as string,
    finalCta: t('home.finalCta') as string,
    header: t('home.header') as HomepageTranslations['header'],
    footer: t('home.footer') as HomepageTranslations['footer'],
    seoGuide: t('home.seoGuide') as HomepageTranslations['seoGuide'],
    topicCluster: t('home.topicCluster') as HomepageTranslations['topicCluster'],
    faq: t('home.faq') as HomepageTranslations['faq'],
    languageSwitcher: t('language.switcher') as string,
  }

  const previewCities = PREVIEW_CITIES.map((city) => ({
    id: city.id,
    name: city.name,
    label: city.label,
    emoji: city.emoji,
    tagline: city.tagline,
  }))

  const faqItems = translations.faq.items ?? []
  const faqSchema =
    Array.isArray(faqItems) && faqItems.length > 0
      ? faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        }))
      : []

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: translations.header.brandName,
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Any',
      inLanguage: lang === 'zh' ? 'zh-CN' : lang,
      url: toAbsoluteUrl(`/${lang}/`),
      description: translations.header.brandEyebrow,
    },
  ]
  if (faqSchema.length > 0) {
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqSchema })
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomepageClient
        lang={lang}
        translations={translations}
        previewCities={previewCities}
        cityTaglines={cityTaglines}
      />
    </>
  )
}
