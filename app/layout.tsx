import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/logo.svg', apple: '/logo.svg' },
  other: { 'google-adsense-account': 'ca-pub-8272386212758068' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8272386212758068"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZTZTZ5TQMR" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-ZTZTZ5TQMR');`}
        </Script>
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="min-h-dvh">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10 xl:px-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
