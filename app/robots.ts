import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/en/quiz/',
          '/zh/quiz/',
          '/ja/quiz/',
          '/ko/quiz/',
          '/en/result/',
          '/zh/result/',
          '/ja/result/',
          '/ko/result/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
