export type AnalyticsEventName = 'view_landing' | 'click_start_quiz' | 'view_quiz'

type AnalyticsValue = string | number | boolean

export interface AnalyticsPayload {
  lang?: string
  section?: string
  [key: string]: AnalyticsValue | undefined
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

function getUtmSource() {
  if (typeof window === 'undefined') return 'unknown'
  return new URLSearchParams(window.location.search).get('utm_source') ?? 'direct'
}

export function trackEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  const basePayload = {
    event_name: eventName,
    path: window.location.pathname,
    utm_source: getUtmSource(),
  }

  const fullPayload = { ...basePayload, ...payload }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, fullPayload)
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...fullPayload,
    })
  }

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  if (isLocalhost) {
    // 方便本地验证埋点参数
    console.info('[analytics]', eventName, fullPayload)
  }
}
