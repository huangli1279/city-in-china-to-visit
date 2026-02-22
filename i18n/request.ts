import {getRequestConfig} from 'next-intl/server'
import {getMessages} from '@/i18n/messages'
import {normalizeUrlLocale} from '@/i18n/locales'

export default getRequestConfig(async ({locale, requestLocale}) => {
  const requestedLocale = locale ?? (await requestLocale)
  const resolvedLocale = normalizeUrlLocale(requestedLocale)

  return {
    locale: resolvedLocale,
    messages: await getMessages(resolvedLocale),
  }
})
