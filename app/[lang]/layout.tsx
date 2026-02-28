import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getMessages } from '@/i18n/messages'
import { buildLangParams, isUrlLocale, toContentLocale } from '@/i18n/locales'

export function generateStaticParams() {
  return buildLangParams()
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isUrlLocale(lang)) notFound()

  setRequestLocale(lang)
  const messages = await getMessages(lang)
  const htmlLang = toContentLocale(lang)

  return (
    <>
      {/* Set html[lang] for each language variant - required for SSG with output: 'export' */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${htmlLang}'`,
        }}
      />
      <NextIntlClientProvider locale={lang} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
