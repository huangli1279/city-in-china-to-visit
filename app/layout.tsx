import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bestcityinchina.site'),
  icons: { icon: '/logo.svg', apple: '/logo.svg' },
  other: { 'google-adsense-account': 'ca-pub-8272386212758068' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8272386212758068"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZTZTZ5TQMR" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-ZTZTZ5TQMR');`}
        </Script>
      </head>
      <body>
        <div className="min-h-dvh">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10 xl:px-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
