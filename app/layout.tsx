import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { SITE_URL } from '@/lib/seo'
import './globals.css'

const ADSENSE_CLIENT = 'ca-pub-8272386212758068'
const GA_MEASUREMENT_ID = 'G-ZTZTZ5TQMR'

const bciSans = localFont({
  src: [
    { path: '../public/fonts/noto-sans-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/noto-sans-latin.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/noto-sans-latin.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-bci-sans',
  display: 'swap',
})

const bciSerif = localFont({
  src: [
    { path: '../public/fonts/noto-serif-latin.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/noto-serif-latin.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/noto-serif-latin.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-bci-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/logo.svg', apple: '/logo.svg' },
  other: { 'google-adsense-account': ADSENSE_CLIENT },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bciSans.variable} ${bciSerif.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="min-h-dvh">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10 xl:px-12">
            {children}
          </div>
        </div>
        <Script
          id="adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="ga-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  )
}
