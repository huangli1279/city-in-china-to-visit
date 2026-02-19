import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://bestcityinchina.site').replace(/\/+$/, '')
const CTR_TITLE_VARIANT = process.env.CTR_TITLE_VARIANT === 'B' ? 'B' : 'A'

const LANGUAGES = [
  { urlCode: 'en', i18nCode: 'en', htmlLang: 'en', label: 'English' },
  { urlCode: 'zh', i18nCode: 'zh-CN', htmlLang: 'zh-CN', label: '中文' },
  { urlCode: 'ja', i18nCode: 'ja', htmlLang: 'ja', label: '日本語' },
  { urlCode: 'ko', i18nCode: 'ko', htmlLang: 'ko', label: '한국어' },
]

const LOCALE_FILES = {
  en: path.join(ROOT_DIR, 'src/locales/en/common.json'),
  'zh-CN': path.join(ROOT_DIR, 'src/locales/zh-CN/common.json'),
  ja: path.join(ROOT_DIR, 'src/locales/ja/common.json'),
  ko: path.join(ROOT_DIR, 'src/locales/ko/common.json'),
}

const GUIDE_PAGES = [
  {
    slug: 'best-city-to-visit-in-china-first-time',
    title: 'Best City to Visit in China for First-Time Travelers',
    titleVariants: {
      A: 'Best City to Visit in China for First-Time Travelers',
      B: 'Best City to Visit in China (First Trip): A Simple Decision Framework',
    },
    description:
      'A practical framework to pick your first China city based on travel style, language comfort, and pace.',
    intro:
      'There is no single best city to visit in China for everyone. For first-time travelers, the best first stop depends on what you want your trip to feel like.',
    keyPoints: [
      'Choose Shanghai if you want modern convenience and easy transport.',
      'Choose Beijing if imperial history and landmarks are your top priority.',
      "Choose Xi'an, Chengdu, or Guilin when you want culture, food, or nature over big-city speed.",
    ],
    sections: [
      {
        heading: '1. Define your first-trip priority before picking a city',
        paragraphs: [
          'Most decision mistakes happen when travelers compare cities without a clear priority. Start with one primary goal: history, food, nightlife, nature, or comfort.',
          'If your priority is unclear, city choice becomes random. A structured quiz-based approach narrows options much faster than generic ranking lists.',
        ],
      },
      {
        heading: '2. Use language comfort to reduce planning risk',
        paragraphs: [
          'If you prefer high convenience and easier navigation, Shanghai and Shenzhen are usually lower friction.',
          'If you are comfortable with local immersion, cities like Xi an, Chongqing, and Dunhuang can deliver richer local experiences.',
        ],
      },
    ],
    faq: {
      question: 'What is the best city to visit in China for first-time tourists?',
      answer:
        'For many first-time tourists, Shanghai and Beijing are common starting points. The better answer depends on your travel style, which is why personalized matching often performs better than one-size-fits-all lists.',
    },
  },
  {
    slug: 'beijing-vs-shanghai-for-first-trip',
    title: 'Beijing vs Shanghai: Which City Is Better for Your First China Trip?',
    titleVariants: {
      A: 'Beijing vs Shanghai: Which City Is Better for Your First China Trip?',
      B: 'Beijing or Shanghai for First-Time China Travelers: What to Choose',
    },
    description: 'Compare Beijing and Shanghai by attractions, pace, budget, and travel comfort.',
    intro:
      'Beijing and Shanghai are the two most common first stops in China. Each offers a very different first-trip experience.',
    keyPoints: [
      'Pick Beijing for history depth, landmarks, and culture-heavy itineraries.',
      'Pick Shanghai for city energy, modern convenience, and nightlife.',
      'If undecided, use a travel-style matcher to validate which city aligns with your pace.',
    ],
    sections: [
      {
        heading: '1. Attraction type: imperial history vs modern city life',
        paragraphs: [
          'Beijing is built around heritage experiences: the Forbidden City, Temple of Heaven, and nearby sections of the Great Wall.',
          'Shanghai is stronger for contemporary neighborhoods, skyline viewpoints, food variety, and urban exploration.',
        ],
      },
      {
        heading: '2. Planning complexity and travel pace',
        paragraphs: [
          'Beijing works best with a planned route and early starts because major landmarks are spread out.',
          'Shanghai is often easier for flexible travelers who prefer shorter planning cycles and spontaneous activities.',
        ],
      },
    ],
    faq: {
      question: 'Is Beijing or Shanghai better for tourists?',
      answer:
        'Beijing is better for history-first travel. Shanghai is better for modern city experiences and convenience. The best choice depends on your trip goals.',
    },
  },
  {
    slug: 'best-china-cities-by-travel-style',
    title: 'Best China Cities by Travel Style',
    titleVariants: {
      A: 'Best China Cities by Travel Style',
      B: 'Best Cities to Visit in China by Travel Personality',
    },
    description: 'Match city choices to travel styles such as history-focused, food-focused, nature-first, and nightlife.',
    intro:
      'The fastest way to choose where to go in China is to match city type with your travel style instead of searching city-by-city.',
    keyPoints: [
      'History-first travelers often match with Beijing and Xi an.',
      'Nature and slow-travel travelers often match with Guilin, Dali, and Sanya.',
      'Food and social-energy travelers frequently match with Chengdu, Chongqing, and Guangzhou.',
    ],
    sections: [
      {
        heading: '1. History and heritage style',
        paragraphs: [
          'If old architecture, museums, and dynastic history are your top interests, prioritize Beijing and Xi an.',
          'These cities reward travelers who are happy to spend more time at major sites.',
        ],
      },
      {
        heading: '2. City energy and social nightlife style',
        paragraphs: [
          'If you want a dense urban trip with social scenes and late-night activity, Shanghai and Chongqing are strong candidates.',
          'Both cities are also good for travelers who prefer high activity and flexible plans.',
        ],
      },
      {
        heading: '3. Landscape and calm pace style',
        paragraphs: [
          'If scenic views and low-pressure itineraries matter most, look at Guilin, Dali, and Sanya.',
          'These cities are typically better fits for slower pacing and restorative travel.',
        ],
      },
    ],
    faq: {
      question: 'How do I choose the best city in China for my travel style?',
      answer:
        'Start by ranking your priorities: history, city life, nature, comfort, pace, and social vibe. Then map your top priorities to city profiles and compare the top three matches.',
    },
  },
  {
    slug: 'how-many-days-in-first-china-city',
    title: 'How Many Days Should You Spend in Your First China City?',
    titleVariants: {
      A: 'How Many Days Should You Spend in Your First China City?',
      B: 'How Many Days in China for a First City? 3, 4, or 5-Day Planning Guide',
    },
    description: 'A practical day-planning framework for first-time visitors to China.',
    intro:
      'Most first-time travelers underestimate city time in China. The right day count depends on your travel pace and sightseeing depth.',
    keyPoints: [
      '3 to 5 days is the most practical range for a first city.',
      'Use 3 days for highlights, 4 days for balanced pacing, and 5 days for depth.',
      'Keep one flex block for weather, fatigue, or spontaneous activities.',
    ],
    sections: [
      {
        heading: '1. 3-day structure for highlight-focused trips',
        paragraphs: [
          'A three-day plan works when your goal is to sample core attractions without deep exploration.',
          'This is common for travelers combining two or more cities in one trip.',
        ],
      },
      {
        heading: '2. 4 to 5 days for lower-stress quality trips',
        paragraphs: [
          'Four to five days gives space for local neighborhoods, better food experiences, and slower pacing.',
          'This is usually the better option for first-time visitors who want less itinerary pressure.',
        ],
      },
    ],
    faq: {
      question: 'Is 3 days enough for a first city in China?',
      answer:
        'Three days is enough for key sights, but 4 to 5 days is usually better for first-time travelers who want a smoother pace and deeper experience.',
    },
  },
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function absUrl(pathname) {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

function guidePath(guideOrSlug) {
  const slug = typeof guideOrSlug === 'string' ? guideOrSlug : guideOrSlug.slug
  return `/en/guides/${slug}/`
}

function guideTitle(guide) {
  return guide?.titleVariants?.[CTR_TITLE_VARIANT] ?? guide.title
}

function createItemList(name, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absUrl(item.path),
    })),
  }
}

function createBreadcrumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

async function readJson(filePath) {
  const raw = await readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

async function writeText(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, content, 'utf8')
}

function renderAlternateLinks(alternates) {
  return alternates
    .map((link) => `<link rel="alternate" hreflang="${escapeHtml(link.hreflang)}" href="${escapeHtml(link.href)}" />`)
    .join('\n    ')
}

function renderJsonLd(jsonLd) {
  return jsonLd
    .map(
      (item) => `<script type="application/ld+json">
${JSON.stringify(item, null, 2)}
</script>`
    )
    .join('\n    ')
}

function renderDocument({
  htmlLang,
  title,
  description,
  canonicalPath,
  alternates,
  mainHtml,
  jsonLd,
  headExtras = '',
  noindex = false,
}) {
  const canonical = absUrl(canonicalPath)
  return `<!doctype html>
<html lang="${escapeHtml(htmlLang)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    ${renderAlternateLinks(alternates)}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    ${headExtras}
    <link rel="stylesheet" href="/styles/prerender.css" />
    ${renderJsonLd(jsonLd)}
  </head>
  <body>
    ${mainHtml}
  </body>
</html>
`
}

function buildLandingAlternates() {
  const links = LANGUAGES.map((lang) => ({
    hreflang: lang.htmlLang,
    href: absUrl(`/${lang.urlCode}`),
  }))
  links.push({ hreflang: 'x-default', href: absUrl('/en') })
  return links
}

function renderLanguageSwitcher(currentLang) {
  const links = LANGUAGES.map((lang) => {
    const active = lang.urlCode === currentLang ? 'is-active' : ''
    return `<a class="lang-chip ${active}" href="/${lang.urlCode}/">${escapeHtml(lang.label)}</a>`
  }).join('')
  return `<nav class="lang-switch" aria-label="Language">${links}</nav>`
}

function renderGuideCardList() {
  return GUIDE_PAGES.map(
    (guide) => `<article class="guide-card">
  <h3><a href="${guidePath(guide)}">${escapeHtml(guideTitle(guide))}</a></h3>
  <p>${escapeHtml(guide.description)}</p>
</article>`
  ).join('\n')
}

function renderLandingPage(lang, locale) {
  const home = locale.home ?? {}
  const faqItems = Array.isArray(home?.faq?.items) ? home.faq.items : []
  const seoGuidePoints = Array.isArray(home?.seoGuide?.points) ? home.seoGuide.points : []
  const canonicalPath = `/${lang.urlCode}`
  const title = home?.seo?.title ?? home?.title ?? 'Best City to Visit in China'
  const description =
    home?.seo?.description ??
    'Find the best city to visit in China with a short travel-style quiz and personalized recommendations.'
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: home?.seo?.appName ?? 'China City Matcher',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Any',
      inLanguage: lang.htmlLang,
      url: absUrl(canonicalPath),
      description,
    },
  ]

  if (faqItems.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  if (lang.urlCode === 'en') {
    jsonLd.push(
      createItemList(
        'China city planning guides',
        GUIDE_PAGES.map((guide) => ({
          name: guideTitle(guide),
          path: guidePath(guide),
        }))
      )
    )
  }

  const seoPointHtml =
    seoGuidePoints.length > 0
      ? seoGuidePoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('\n')
      : '<li>Use a structured model to narrow city options quickly.</li>'

  const faqHtml =
    faqItems.length > 0
      ? faqItems
          .map(
            (item) => `<article class="faq-item">
  <h3>${escapeHtml(item.question)}</h3>
  <p>${escapeHtml(item.answer)}</p>
</article>`
          )
          .join('\n')
      : ''

  const guideClusterSection =
    lang.urlCode === 'en'
      ? `<section class="block">
  <p class="eyebrow">Topic cluster</p>
  <h2>China city planning guides</h2>
  <p>Use these focused guides to compare destinations, plan trip length, and narrow your first city with less research time.</p>
  <div class="guide-grid">
    ${renderGuideCardList()}
  </div>
  <p class="block-link"><a href="/en/guides/">See all guides</a></p>
</section>`
      : ''

  const mainHtml = `<main class="page-shell">
  <header class="site-header">
    <a class="brand" href="${escapeHtml(canonicalPath)}">${escapeHtml(home?.header?.brandName ?? 'City Vibe Matcher')}</a>
    ${renderLanguageSwitcher(lang.urlCode)}
  </header>

  <section class="hero block">
    <p class="eyebrow">${escapeHtml(home?.badge ?? '')}</p>
    <h1>${escapeHtml(home?.title ?? '')}</h1>
    <p class="hero-subtitle">${escapeHtml(home?.subtitle ?? '')}</p>
    <div class="metric-grid">
      <article><strong>18</strong><span>${escapeHtml(home?.metrics?.questions ?? '')}</span></article>
      <article><strong>6</strong><span>${escapeHtml(home?.metrics?.dimensions ?? '')}</span></article>
      <article><strong>15</strong><span>${escapeHtml(home?.metrics?.cities ?? '')}</span></article>
    </div>
    <a class="cta" href="/${lang.urlCode}/quiz">${escapeHtml(home?.cta ?? 'Start quiz')}</a>
  </section>

  <section class="block">
    <p class="eyebrow">${escapeHtml(home?.seoGuide?.eyebrow ?? 'Guide')}</p>
    <h2>${escapeHtml(home?.seoGuide?.title ?? 'How to choose your first city')}</h2>
    <p>${escapeHtml(home?.seoGuide?.intro ?? '')}</p>
    <ul class="list-cards">
      ${seoPointHtml}
    </ul>
    <p>${escapeHtml(home?.seoGuide?.conclusion ?? '')}</p>
  </section>

  ${guideClusterSection}

  <section class="block">
    <p class="eyebrow">${escapeHtml(home?.faq?.eyebrow ?? 'FAQ')}</p>
    <h2>${escapeHtml(home?.faq?.title ?? 'Travel questions')}</h2>
    <div class="faq-grid">
      ${faqHtml}
    </div>
  </section>

  <section class="cta-panel">
    <h2>${escapeHtml(home?.finalCtaTitle ?? 'Ready to start?')}</h2>
    <p>${escapeHtml(home?.finalCtaSubtitle ?? '')}</p>
    <a class="cta" href="/${lang.urlCode}/quiz">${escapeHtml(home?.finalCta ?? home?.cta ?? 'Start quiz')}</a>
  </section>
</main>`

  return renderDocument({
    htmlLang: lang.htmlLang,
    title,
    description,
    canonicalPath,
    alternates: buildLandingAlternates(),
    mainHtml,
    jsonLd,
  })
}

function renderGuideHub() {
  const canonicalPath = '/en/guides/'
  const title = 'China City Planning Guides'
  const description = 'Explore practical topic guides to choose the best city to visit in China and plan your first trip.'
  const alternates = [
    { hreflang: 'en', href: absUrl(canonicalPath) },
    { hreflang: 'x-default', href: absUrl(canonicalPath) },
  ]

  const mainHtml = `<main class="page-shell">
  <header class="site-header">
    <a class="brand" href="/en/">City Vibe Matcher</a>
    <nav class="top-links">
      <a href="/en/">Landing</a>
      <a href="/en/quiz">Quiz</a>
    </nav>
  </header>

  <section class="block">
    <p class="eyebrow">Topic cluster</p>
    <h1>China city planning guides</h1>
    <p>These pages support the main destination-matching flow and help travelers answer common planning questions quickly.</p>
    <div class="guide-grid">
      ${renderGuideCardList()}
    </div>
  </section>

  <section class="cta-panel">
    <h2>Need a personalized answer?</h2>
    <p>Use the 18-question matcher to rank 15 Chinese cities by your travel style.</p>
    <a class="cta" href="/en/quiz">Start the quiz</a>
  </section>
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: absUrl(canonicalPath),
    },
    createBreadcrumbList([
      { name: 'Home', path: '/en' },
      { name: 'Guides', path: '/en/guides/' },
    ]),
    createItemList(
      'China city planning guides',
      GUIDE_PAGES.map((guide) => ({
        name: guideTitle(guide),
        path: guidePath(guide),
      }))
    ),
  ]

  return renderDocument({
    htmlLang: 'en',
    title,
    description,
    canonicalPath,
    alternates,
    mainHtml,
    jsonLd,
  })
}

function renderGuideDetail(guide) {
  const resolvedTitle = guideTitle(guide)
  const canonicalPath = guidePath(guide)
  const alternates = [
    { hreflang: 'en', href: absUrl(canonicalPath) },
    { hreflang: 'x-default', href: absUrl(canonicalPath) },
  ]

  const relatedGuideItems = GUIDE_PAGES.filter((page) => page.slug !== guide.slug).map((page) => ({
    name: guideTitle(page),
    path: guidePath(page),
  }))

  const relatedLinks = GUIDE_PAGES.filter((page) => page.slug !== guide.slug)
    .map((page) => `<li><a href="${guidePath(page)}">${escapeHtml(guideTitle(page))}</a></li>`)
    .join('\n')

  const sectionHtml = guide.sections
    .map((section) => {
      const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')
      return `<section class="article-block">
  <h2>${escapeHtml(section.heading)}</h2>
  ${paragraphs}
</section>`
    })
    .join('\n')

  const keyPointHtml = guide.keyPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('\n')

  const mainHtml = `<main class="page-shell">
  <header class="site-header">
    <a class="brand" href="/en/">City Vibe Matcher</a>
    <nav class="top-links">
      <a href="/en/">Landing</a>
      <a href="/en/guides/">Guides</a>
      <a href="/en/quiz">Quiz</a>
    </nav>
  </header>

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/en/">Home</a>
    <span>/</span>
    <a href="/en/guides/">Guides</a>
    <span>/</span>
    <span>${escapeHtml(resolvedTitle)}</span>
  </nav>

  <article class="article-page block">
    <p class="eyebrow">Guide</p>
    <h1>${escapeHtml(resolvedTitle)}</h1>
    <p class="article-intro">${escapeHtml(guide.intro)}</p>
    <ul class="list-cards">
      ${keyPointHtml}
    </ul>
    ${sectionHtml}
    <section class="article-block faq-item">
      <h2>${escapeHtml(guide.faq.question)}</h2>
      <p>${escapeHtml(guide.faq.answer)}</p>
    </section>
  </article>

  <section class="block">
    <h2>Related guides</h2>
    <ul class="related-links">
      ${relatedLinks}
    </ul>
  </section>

  <section class="cta-panel">
    <h2>Get your personalized city match</h2>
    <p>Stop comparing cities manually. Answer 18 questions and get a ranked recommendation.</p>
    <a class="cta" href="/en/quiz">Take the city quiz</a>
  </section>
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: resolvedTitle,
      description: guide.description,
      url: absUrl(canonicalPath),
      inLanguage: 'en',
      author: {
        '@type': 'Organization',
        name: 'City Vibe Matcher',
      },
      publisher: {
        '@type': 'Organization',
        name: 'City Vibe Matcher',
      },
    },
    createBreadcrumbList([
      { name: 'Home', path: '/en' },
      { name: 'Guides', path: '/en/guides/' },
      { name: resolvedTitle, path: canonicalPath },
    ]),
    createItemList('Related China city guides', relatedGuideItems),
  ]

  const headExtras = [
    `<meta name="seo-title-variant" content="${CTR_TITLE_VARIANT}" />`,
    `<meta name="seo-title-a" content="${escapeHtml(guide?.titleVariants?.A ?? guide.title)}" />`,
    `<meta name="seo-title-b" content="${escapeHtml(guide?.titleVariants?.B ?? guide.title)}" />`,
  ].join('\n    ')

  return renderDocument({
    htmlLang: 'en',
    title: resolvedTitle,
    description: guide.description,
    canonicalPath,
    alternates,
    mainHtml,
    jsonLd,
    headExtras,
  })
}

function buildCtrTitleVariantsManifest() {
  const payload = {
    activeVariant: CTR_TITLE_VARIANT,
    guides: GUIDE_PAGES.map((guide) => ({
      slug: guide.slug,
      path: guidePath(guide),
      activeTitle: guideTitle(guide),
      titleA: guide?.titleVariants?.A ?? guide.title,
      titleB: guide?.titleVariants?.B ?? guide.title,
    })),
  }

  return `${JSON.stringify(payload, null, 2)}\n`
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    '/en',
    '/zh',
    '/ja',
    '/ko',
    '/en/guides/',
    ...GUIDE_PAGES.map((guide) => `/en/guides/${guide.slug}/`),
  ]

  const nodes = urls
    .map((pathname) => {
      const priority = pathname === '/en' ? '1.0' : pathname.startsWith('/en/guides') ? '0.8' : '0.9'
      return `  <url>
    <loc>${escapeHtml(absUrl(pathname))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nodes}
</urlset>
`
}

async function main() {
  const localeMap = {}
  for (const lang of LANGUAGES) {
    localeMap[lang.i18nCode] = await readJson(LOCALE_FILES[lang.i18nCode])
  }

  // Keep locale data loading for sitemap/schema consistency, but avoid
  // generating static language landing pages. This lets /en, /zh, /ja, /ko
  // resolve to the SPA entry so production matches local dev UI.

  await writeText(path.join(PUBLIC_DIR, 'en/guides/index.html'), renderGuideHub())
  for (const guide of GUIDE_PAGES) {
    const html = renderGuideDetail(guide)
    await writeText(path.join(PUBLIC_DIR, `en/guides/${guide.slug}/index.html`), html)
  }

  await writeText(path.join(PUBLIC_DIR, 'en/guides/ctr-title-variants.json'), buildCtrTitleVariantsManifest())
  await writeText(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap())
}

await main()
