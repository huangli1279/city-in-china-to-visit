import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n'
import { buildNextAlternates, buildOgLocale, buildOgLocaleAlternates, toAbsoluteUrl } from '@/lib/seo'
import QuizClient from '@/components/QuizClient'

const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const

type Props = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = getTranslation(lang, 'common')
  const title = t('quiz.seo.title') as string
  const description = t('quiz.seo.description') as string
  const canonicalUrl = toAbsoluteUrl(`/${lang}/quiz/`)

  return {
    title,
    description,
    robots: 'noindex, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: buildNextAlternates('quiz/'),
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

export default async function QuizPage({ params }: Props) {
  const { lang } = await params
  if (!(VALID_LANGS as readonly string[]).includes(lang)) notFound()
  return <QuizClient lang={lang} />
}
