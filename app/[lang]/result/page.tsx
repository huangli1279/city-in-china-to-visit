import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { isUrlLocale } from '@/i18n/locales'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import ResultClient from '@/components/ResultClient'

const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const

type Props = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isUrlLocale(lang)) return {}

  const t = await getTranslations({ locale: lang, namespace: 'common' })
  const title = t('result.seo.title') as string
  const description = t('result.seo.description') as string
  const canonicalUrl = toAbsoluteUrl(`/${lang}/result/`)

  return {
    title,
    description,
    robots: 'noindex, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: buildNextAlternates('result/'),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: buildOgLocale(lang),
      alternateLocale: buildOgLocaleAlternates(lang),
    },
  }
}

export default async function ResultPage({ params }: Props) {
  const { lang } = await params
  if (!isUrlLocale(lang)) notFound()
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <ResultClient lang={lang} />
    </Suspense>
  )
}
