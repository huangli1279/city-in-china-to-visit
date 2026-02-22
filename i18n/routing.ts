import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh', 'ja', 'ko'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export type UrlLocale = (typeof routing.locales)[number]
