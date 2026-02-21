import { notFound } from 'next/navigation'

const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const
type Lang = (typeof VALID_LANGS)[number]

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!VALID_LANGS.includes(lang as Lang)) notFound()

  const htmlLang = lang === 'zh' ? 'zh-CN' : lang

  return (
    <>
      {/* Set html[lang] for each language variant - required for SSG with output: 'export' */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${htmlLang}'`,
        }}
      />
      {children}
    </>
  )
}
