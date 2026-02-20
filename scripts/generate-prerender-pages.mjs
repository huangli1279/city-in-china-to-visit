import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://bestcityinchina.site').replace(/\/+$/, '')
const CTR_TITLE_VARIANT = process.env.CTR_TITLE_VARIANT === 'B' ? 'B' : 'A'
const GA_MEASUREMENT_ID = 'G-ZTZTZ5TQMR'
const ORGANIZATION_NAME = 'City Vibe Matcher'
const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'
const PUBLISHED_DATE_ISO = '2026-01-15'
const PUBLISHED_DATE_TEXT = 'January 15, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

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
      "Use a practical framework to pick your first China city by travel style, comfort, and pace, then compare Beijing, Shanghai, Xi'an, Chengdu, and Guilin.",
    intro:
      'There is no universal first-stop destination for every traveler. The smartest choice depends on how you want your first China trip to feel day by day.',
    keyPoints: [
      'Pick Shanghai when convenience, smooth transport, and modern comfort are non-negotiable.',
      'Pick Beijing when imperial history and iconic landmarks are your top priority.',
      "Pick Xi'an, Chengdu, or Guilin when local depth, food culture, or scenery matter more than urban speed.",
    ],
    sections: [
      {
        heading: '1. Define your first-trip priority before picking a city',
        paragraphs: [
          'Most first-trip mistakes happen when travelers compare cities without a clear objective. Before reading rankings, name your primary outcome: heritage, food, nightlife, scenery, comfort, or balance.',
          'Once your main objective is clear, city comparison becomes practical instead of emotional. You can quickly reject places that look interesting but do not fit your expected travel rhythm.',
          "A structured matching method usually beats generic top-10 lists because it starts from your preferences, not someone else's itinerary.",
        ],
      },
      {
        heading: '2. Use friction tolerance to avoid first-trip fatigue',
        paragraphs: [
          'Language and logistics friction shape your experience more than most travelers expect. The same city can feel exciting or exhausting depending on your confidence level.',
          'If you prefer smoother navigation, Shanghai is often the most forgiving entry point, followed by Shenzhen and Guangzhou. Transit is efficient, digital payment adoption is high, and service infrastructure is broad.',
          "If you enjoy local immersion and can handle occasional uncertainty, places like Xi'an, Chongqing, and Dunhuang can feel more rewarding because they deliver stronger contrast and cultural texture.",
        ],
      },
      {
        heading: '3. Match city archetypes to your first-stop expectations',
        paragraphs: [
          "Think in archetypes instead of city names. History-heavy archetype points to Beijing and Xi'an. Modern-metropolis archetype points to Shanghai and Shenzhen.",
          'Food-and-local-life archetype points to Chengdu and Chongqing, while landscape-and-recovery archetype points to Guilin, Dali, and Sanya.',
          'Archetype thinking helps you shortlist quickly because it separates the trip feeling you want from the brand image of each destination.',
        ],
      },
      {
        heading: '4. Build a practical Plan B before booking flights',
        paragraphs: [
          'A solid first-city decision always includes one backup city. Weather, event pricing, and flight availability can shift rapidly, especially during holidays and peak weekends.',
          'Create a two-city shortlist with one primary and one fallback. Keep your first 48 hours flexible so arrival delays do not collapse your itinerary.',
          'When you plan this way, you reduce stress and keep your first China trip resilient even when logistics change late.',
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
    title: 'Beijing vs Shanghai for First-Time China Travelers',
    titleVariants: {
      A: 'Beijing vs Shanghai for First-Time China Travelers',
      B: 'Beijing or Shanghai: How to Choose Your First China City',
    },
    description:
      'Compare Beijing and Shanghai across history depth, convenience, transport friction, and trip pace to choose the better first city for your China trip.',
    intro:
      'Beijing and Shanghai are the two most common first stops in China, but they reward very different travel personalities and planning styles.',
    keyPoints: [
      'Choose Beijing for history depth, major landmarks, and culture-heavy days.',
      'Choose Shanghai for urban energy, convenience, and lower planning stress.',
      'If unsure, score both cities against your pace, comfort, and activity tolerance before booking.',
    ],
    sections: [
      {
        heading: '1. Core experience: imperial heritage vs contemporary urban life',
        paragraphs: [
          'Beijing is organized around heritage density: the Forbidden City, Temple of Heaven, hutong districts, and Great Wall day trips. It is ideal when your first China memory should be historically iconic.',
          'Shanghai performs better when you want modern neighborhoods, skyline views, dining variety, and flexible day planning. It is often easier to enjoy without strict hour-by-hour scheduling.',
          'In short, Beijing emphasizes depth and narrative; Shanghai emphasizes flow and convenience.',
        ],
      },
      {
        heading: '2. Planning load, transfer time, and daily energy use',
        paragraphs: [
          'Beijing usually requires earlier starts and more structured routing because top attractions are distributed across large distances and often attract heavy queues.',
          'Shanghai supports shorter planning cycles. Metro access is dense, neighborhood transitions are smoother, and many activities can be rearranged without losing the day.',
          'Travelers with low friction tolerance usually finish Shanghai days with more spare energy than equivalent Beijing schedules.',
        ],
      },
      {
        heading: '3. Cost rhythm and itinerary resilience',
        paragraphs: [
          'Both cities can be done on medium budgets, but cost rhythm differs. Beijing often concentrates spending around ticketed landmarks and planned transport blocks.',
          'Shanghai spending tends to spread across food, neighborhood hopping, and optional nightlife. This can feel more controllable for travelers who adjust plans in real time.',
          'If budget certainty matters, pre-book Beijing anchor attractions and reserve one flexible Shanghai-style day to absorb surprises.',
        ],
      },
      {
        heading: '4. Decision shortcut for first-time travelers',
        paragraphs: [
          'Pick Beijing first if your trip goal is historical immersion and you are comfortable with structured, high-output sightseeing days.',
          'Pick Shanghai first if your goal is smoother logistics, modern city variety, and less itinerary pressure.',
          'Still undecided? Start in Shanghai for an easier landing, then add Beijing as a second city once your travel systems are warmed up.',
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
    description:
      'Match Chinese cities to your travel personality across heritage, food, nature, nightlife, and recovery pace, with practical examples for 15 first-trip options.',
    intro:
      'The fastest way to choose where to go in China is to match destination archetypes to your travel style, then validate the top two or three candidates.',
    keyPoints: [
      "History-first travelers usually match with Beijing and Xi'an.",
      'Nature-and-recovery travelers often match with Guilin, Dali, and Sanya.',
      'Food-and-social-energy travelers frequently match with Chengdu, Chongqing, and Guangzhou.',
    ],
    sections: [
      {
        heading: '1. History and heritage style',
        paragraphs: [
          "If ancient architecture, museums, and dynastic narrative are your priorities, start with Beijing and Xi'an. These cities reward travelers who like context-rich sightseeing.",
          'Plan longer attraction windows here. Rushing reduces the value because many highlights are strongest when you have time for guided interpretation.',
          'This style fits travelers who enjoy structured days and do not mind queue management around major landmarks.',
        ],
      },
      {
        heading: '2. City energy and social nightlife style',
        paragraphs: [
          'If your ideal trip includes dense neighborhoods, evening activity, and social options, Shanghai and Chongqing are strong choices.',
          'Shanghai favors modern convenience and cosmopolitan variety, while Chongqing offers dramatic terrain, bold food culture, and high local character.',
          'This style suits travelers who prefer momentum and can adapt plans quickly.',
        ],
      },
      {
        heading: '3. Food-led and local-culture style',
        paragraphs: [
          "If food is your primary lens for travel, Chengdu, Guangzhou, and Xi'an are high-value choices with distinctive regional identities.",
          'Food-led itineraries work best when you leave room for spontaneous stops instead of overfilling every hour with landmarks.',
          'This style is ideal for travelers who value neighborhood exploration as much as checklist attractions.',
        ],
      },
      {
        heading: '4. Landscape and calm pace style',
        paragraphs: [
          'If scenic views and low-pressure itineraries matter most, prioritize Guilin, Dali, and Sanya.',
          'These destinations support slower mornings, longer scenic blocks, and better recovery between travel days.',
          'They are often the right counterweight for travelers who feel drained by nonstop urban movement.',
        ],
      },
      {
        heading: '5. How to use style matching without overfitting',
        paragraphs: [
          'Do not force a perfect single answer. Shortlist two style-compatible cities and compare season, budget, and flight practicality.',
          'If your top two options feel equally good, choose the city with lower planning friction for your arrival week.',
          'This approach keeps your first China trip flexible while still anchored in a clear style decision.',
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
    description:
      'Plan your first China city with practical 3-day, 4-day, and 5-day structures, including pacing, recovery buffers, and transfer-day planning.',
    intro:
      'Most first-time travelers underestimate how much time major Chinese cities require. The right day count depends on pace tolerance, attraction depth, and transfer logistics.',
    keyPoints: [
      '3 to 5 days is the most practical range for a first city.',
      'Use 3 days for highlights, 4 days for balance, and 5 days for deeper neighborhood exploration.',
      'Always protect one flex block for weather, fatigue, or transport delays.',
    ],
    sections: [
      {
        heading: '1. 3-day structure for highlight-focused trips',
        paragraphs: [
          'A three-day structure is best when your goal is to sample landmark highlights, not complete deep exploration.',
          'It works well in multi-city itineraries where your first destination is mainly an orientation stop.',
          'To make three days effective, pre-select one anchor area per day and avoid long cross-city transfers at peak hours.',
        ],
      },
      {
        heading: '2. 4-day structure for balanced quality and recovery',
        paragraphs: [
          'Four days is the most balanced option for many first-time travelers. You can cover major sights and still include local neighborhoods or food-focused exploration.',
          'Day four also acts as a pressure-release valve when weather shifts or transport runs late.',
          'If this is your first long-haul Asia trip, a four-day start usually improves both energy and decision quality.',
        ],
      },
      {
        heading: '3. 5-day structure for depth and local rhythm',
        paragraphs: [
          'Five days is ideal when you want to combine landmark depth with slower local immersion.',
          'This duration lets you separate high-output sightseeing days from low-output recovery days, which reduces burnout.',
          'Travelers who care about neighborhood texture, markets, and local routines usually find five days far more satisfying than rushed short stays.',
        ],
      },
      {
        heading: '4. Simple rule for choosing 3, 4, or 5 days',
        paragraphs: [
          'Choose 3 days if your broader trip includes multiple destinations and you prioritize breadth.',
          'Choose 4 days if you want a stable first-city experience with manageable pace and lower stress.',
          'Choose 5 days if you value depth, better recovery, and contingency room for uncertain factors.',
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

function renderGoogleTag() {
  return `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    </script>`
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
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
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
    <meta property="og:image" content="${escapeHtml(absUrl('/og-image.svg'))}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(absUrl('/og-image.svg'))}" />
    ${headExtras}
    ${renderGoogleTag()}
    <link rel="stylesheet" href="/styles/prerender.css" />
    ${renderJsonLd(jsonLd)}
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to main content</a>
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

function renderFooterNav(links) {
  return links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('\n      ')
}

function renderSiteFooter({ homePath = '/en/', includeGuides = true } = {}) {
  const links = [
    { href: '/en/about/', label: 'About' },
    { href: '/en/contact/', label: 'Contact' },
    { href: '/en/privacy-policy/', label: 'Privacy Policy' },
  ]
  if (includeGuides) {
    links.push({ href: '/en/guides/', label: 'Guides' })
  }
  links.push({ href: homePath, label: 'Home' })

  return `<footer class="site-footer">
    <span>© 2026 ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ''))}</span>
    <nav class="top-links">
      ${renderFooterNav(links)}
    </nav>
  </footer>`
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

  const trustSection =
    lang.urlCode === 'en'
      ? `<section class="block">
  <h2>Trust and editorial notes</h2>
  <p>This travel-matching project combines structured quiz responses with manually curated city profiles. It is intended for first-trip planning, not for visa, legal, or medical decisions.</p>
  <p>For policy-sensitive travel details, always verify information through official tourism boards, embassy updates, and airline notices before final booking.</p>
</section>`
      : ''

  const mainHtml = `<main id="main-content" class="page-shell">
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

  ${trustSection}

  ${renderSiteFooter({ homePath: `/${lang.urlCode}/`, includeGuides: lang.urlCode === 'en' })}
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
  const title = 'City Planning Guides for First-Time China Travelers'
  const description =
    'Explore focused guides that help first-time travelers compare destinations, choose trip length, and plan a confident first stop in China.'
  const alternates = [
    { hreflang: 'en', href: absUrl(canonicalPath) },
    { hreflang: 'x-default', href: absUrl(canonicalPath) },
  ]

  const mainHtml = `<main id="main-content" class="page-shell">
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
    <p>These pages support the destination-matching quiz and answer the planning questions that usually block first-time trips: where to start, how long to stay, and how to compare high-profile cities.</p>
    <p>Instead of generic rankings, each guide is written as a decision framework. You can move from uncertainty to a practical shortlist in one reading session.</p>
    <h2>Available guides</h2>
    <div class="guide-grid">
      ${renderGuideCardList()}
    </div>
    <h2>How to use this guide cluster</h2>
    <p>Start with a comparison guide, then validate your pace with the day-planning guide. If two destinations still feel equally good, choose the one with lower logistics friction for your arrival week.</p>
    <p>After choosing your likely first city, use the quiz to validate fit against 15 city profiles and keep one backup city in case seasonality or flight constraints shift your plan.</p>
    <h2>Scope and limitations</h2>
    <p>These guides are designed for first-time visitors and focus on decision clarity, not comprehensive destination encyclopedias. They summarize high-impact tradeoffs such as transport friction, planning load, and itinerary recovery needs.</p>
    <p>For official visa policy, entry requirements, and safety notices, always verify information through government and embassy sources before finalizing bookings.</p>
  </section>

  <section class="cta-panel">
    <h2>Need a personalized answer?</h2>
    <p>Use the 18-question matcher to rank 15 Chinese cities by your travel style.</p>
    <a class="cta" href="/en/quiz">Start the quiz</a>
  </section>

  ${renderSiteFooter({ homePath: '/en/', includeGuides: true })}
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

  const mainHtml = `<main id="main-content" class="page-shell">
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
    <div class="article-meta-stack">
      <p class="article-meta author-byline"><strong>Author:</strong> ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta"><strong>Published:</strong> <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
      <p class="article-meta">By ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta">Published on <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
    </div>
    <p class="article-intro">${escapeHtml(guide.intro)}</p>
    <ul class="list-cards">
      ${keyPointHtml}
    </ul>
    ${sectionHtml}
    <section class="article-block">
      <h2>Further reading</h2>
      <ul class="related-links">
        <li><a href="https://www.thechinaguide.com/" rel="noopener noreferrer">The China Guide</a> — visa and travel logistics</li>
      </ul>
    </section>
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

  ${renderSiteFooter({ homePath: '/en/', includeGuides: true })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: resolvedTitle,
      description: guide.description,
      url: absUrl(canonicalPath),
      inLanguage: 'en',
      image: absUrl('/og-image.svg'),
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: PUBLISHED_DATE_ISO,
      author: {
        '@type': 'Organization',
        name: AUTHOR_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: ORGANIZATION_NAME,
        logo: {
          '@type': 'ImageObject',
          url: absUrl('/og-image.svg'),
        },
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
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:published_time" content="${PUBLISHED_DATE_ISO}" />`,
    `<meta property="article:modified_time" content="${PUBLISHED_DATE_ISO}" />`,
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

function renderAboutPage() {
  const canonicalPath = '/en/about/'
  const title = 'About City Vibe Matcher | China Trip Method'
  const description =
    'Learn how City Vibe Matcher builds first-trip China recommendations with an 18-question model, curated city profiles, and practical planning guidance.'
  const alternates = [
    { hreflang: 'en', href: absUrl(canonicalPath) },
    { hreflang: 'x-default', href: absUrl(canonicalPath) },
  ]

  const mainHtml = `<main id="main-content" class="page-shell">
  <header class="site-header">
    <a class="brand" href="/en/">City Vibe Matcher</a>
    <nav class="top-links">
      <a href="/en/">Home</a>
      <a href="/en/guides/">Guides</a>
      <a href="/en/contact/">Contact</a>
    </nav>
  </header>

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/en/">Home</a>
    <span>/</span>
    <span>About</span>
  </nav>

  <article class="article-page block">
    <p class="eyebrow">About</p>
    <h1>How this project helps first-time China travelers</h1>
    <div class="article-meta-stack">
      <p class="article-meta author-byline"><strong>Author:</strong> ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta"><strong>Published:</strong> <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
      <p class="article-meta"><strong>Last updated:</strong> <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
      <p class="article-meta">By ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta">Published on <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
    </div>
    <p class="article-intro">City Vibe Matcher is a planning-first project for travelers who already decided to visit China but still need confidence about where to start.</p>

    <section class="article-block">
      <h2>Our mission</h2>
      <p>We reduce first-city decision fatigue by turning broad travel preferences into a practical shortlist. Instead of sending users through endless listicles, we guide them to a specific starting option in minutes.</p>
      <p>The goal is not to crown one universal best city. The goal is to help each traveler pick a first stop that matches pace, interests, and comfort level.</p>
    </section>

    <section class="article-block">
      <h2>How the matching model works</h2>
      <p>The quiz uses 18 scenario-based questions and maps responses into six dimensions: history appetite, nature versus urban preference, cultural comfort, activity level, social vibe, and adventure appetite.</p>
      <p>Each city profile is manually reviewed and scored on the same dimensions. We then compare user scores against city scores and rank the closest matches.</p>
      <p>This process is designed for directional planning, not for perfect prediction. Users should still validate seasonality, flight availability, and current policy updates.</p>
    </section>

    <section class="article-block">
      <h2>Editorial standards</h2>
      <p>Guide pages are written and updated by the ${escapeHtml(AUTHOR_NAME)} team. We prioritize clarity, practical tradeoffs, and first-time traveler constraints over trend-driven content.</p>
      <p>When recommendations include policy-sensitive topics such as visa or entry requirements, we direct readers to official sources for final confirmation.</p>
    </section>

    <section class="article-block">
      <h2>What we do not do</h2>
      <p>We do not sell tours, visas, or priority access services. The site is built as an independent planning utility to help travelers make earlier, clearer city decisions.</p>
      <p>We also do not claim real-time policy authority. All time-sensitive details should be confirmed with official channels before payment or departure.</p>
    </section>

    <section class="article-block">
      <h2>Contact and feedback</h2>
      <p>Questions, corrections, and feedback are welcome. Reach us at <a href="mailto:${escapeHtml(CONTACT_EMAIL)}">${escapeHtml(CONTACT_EMAIL)}</a> or visit the <a href="/en/contact/">contact page</a>.</p>
    </section>
  </article>

  ${renderSiteFooter({ homePath: '/en/', includeGuides: true })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description,
      url: absUrl(canonicalPath),
      inLanguage: 'en',
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: PUBLISHED_DATE_ISO,
      author: {
        '@type': 'Organization',
        name: AUTHOR_NAME,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: absUrl('/en/'),
      email: CONTACT_EMAIL,
      logo: absUrl('/og-image.svg'),
    },
    createBreadcrumbList([
      { name: 'Home', path: '/en' },
      { name: 'About', path: canonicalPath },
    ]),
  ]

  const headExtras = [
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:published_time" content="${PUBLISHED_DATE_ISO}" />`,
  ].join('\n    ')

  return renderDocument({
    htmlLang: 'en',
    title,
    description,
    canonicalPath,
    alternates,
    mainHtml,
    jsonLd,
    headExtras,
  })
}

function renderContactPage() {
  const canonicalPath = '/en/contact/'
  const title = 'Contact City Vibe Matcher | Travel Match Support'
  const description =
    'Contact City Vibe Matcher for travel-matching questions, feedback, media requests, and data corrections related to our China city planning guides.'
  const alternates = [
    { hreflang: 'en', href: absUrl(canonicalPath) },
    { hreflang: 'x-default', href: absUrl(canonicalPath) },
  ]

  const mainHtml = `<main id="main-content" class="page-shell">
  <header class="site-header">
    <a class="brand" href="/en/">City Vibe Matcher</a>
    <nav class="top-links">
      <a href="/en/">Home</a>
      <a href="/en/about/">About</a>
      <a href="/en/guides/">Guides</a>
    </nav>
  </header>

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/en/">Home</a>
    <span>/</span>
    <span>Contact</span>
  </nav>

  <article class="article-page block">
    <p class="eyebrow">Contact</p>
    <h1>Get in touch</h1>
    <div class="article-meta-stack">
      <p class="article-meta author-byline"><strong>Author:</strong> ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta"><strong>Last updated:</strong> <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
      <p class="article-meta"><strong>Response target:</strong> within 3 business days</p>
      <p class="article-meta">By ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta">Published on <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
    </div>
    <p class="article-intro">Use this page for feedback about matching results, content corrections, partnerships, or media inquiries.</p>

    <section class="article-block">
      <h2>Email</h2>
      <p>General inquiries: <a href="mailto:${escapeHtml(CONTACT_EMAIL)}">${escapeHtml(CONTACT_EMAIL)}</a></p>
      <p>Include your trip goal, expected travel month, and the page URL if your question is about a specific guide.</p>
    </section>

    <section class="article-block">
      <h2>What we can help with</h2>
      <ul class="list-cards">
        <li>Questions about quiz logic and recommendation interpretation</li>
        <li>Requests to correct outdated planning details in guides</li>
        <li>Partnership and media requests related to travel planning content</li>
      </ul>
    </section>

    <section class="article-block">
      <h2>Before you contact us</h2>
      <p>If your request is about one destination page, include the exact page URL and the section that should be corrected. This helps us verify and update content much faster.</p>
      <p>If your request is about your quiz result, include your top three recommended cities and your planned travel month so we can provide more relevant context.</p>
    </section>

    <section class="article-block">
      <h2>How to request a content correction</h2>
      <p>Please include three details in your message: the current statement, the proposed correction, and one source link that supports the update. This structure helps us review requests quickly and consistently.</p>
      <p>For corrections involving regulations, include the publication date of your source so we can evaluate whether it reflects the latest policy revision.</p>
      <p>Editorial corrections are reviewed in batches and may be applied across multiple guides when the same issue affects more than one city page.</p>
    </section>

    <section class="article-block">
      <h2>Important note</h2>
      <p>We do not provide visa, legal, or emergency travel advice. For official entry requirements and policy updates, use government and embassy sources.</p>
      <p>For urgent operational travel issues such as flight cancellations or border policy changes, always rely on official airline and government channels first.</p>
    </section>

    <section class="article-block">
      <h2>Privacy and message handling</h2>
      <p>When you email us, we only use your message to respond and improve relevant guide content. We do not sell contact details or use inquiry emails for unrelated marketing campaigns.</p>
      <p>If you want your message deleted after resolution, mention it in your thread and we will remove it from our working notes.</p>
    </section>
  </article>

  ${renderSiteFooter({ homePath: '/en/', includeGuides: true })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: title,
      description,
      url: absUrl(canonicalPath),
      inLanguage: 'en',
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: PUBLISHED_DATE_ISO,
      author: {
        '@type': 'Organization',
        name: AUTHOR_NAME,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: absUrl('/en/'),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: CONTACT_EMAIL,
          availableLanguage: ['en'],
        },
      ],
    },
    createBreadcrumbList([
      { name: 'Home', path: '/en' },
      { name: 'Contact', path: canonicalPath },
    ]),
  ]

  const headExtras = [
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:modified_time" content="${PUBLISHED_DATE_ISO}" />`,
  ].join('\n    ')

  return renderDocument({
    htmlLang: 'en',
    title,
    description,
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
    '/en/about/',
    '/en/contact/',
    '/en/privacy-policy/',
    '/en/guides/',
    ...GUIDE_PAGES.map((guide) => `/en/guides/${guide.slug}/`),
  ]

  const nodes = urls
    .map((pathname) => {
      const priority =
        pathname === '/en'
          ? '1.0'
          : pathname.startsWith('/en/guides')
            ? '0.8'
            : pathname.startsWith('/en/about') || pathname.startsWith('/en/contact') || pathname.startsWith('/en/privacy')
              ? '0.7'
              : '0.9'
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

  for (const lang of LANGUAGES) {
    const locale = localeMap[lang.i18nCode]
    const html = renderLandingPage(lang, locale)
    await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/index.html`), html)
  }

  await writeText(path.join(PUBLIC_DIR, 'en/about/index.html'), renderAboutPage())
  await writeText(path.join(PUBLIC_DIR, 'en/contact/index.html'), renderContactPage())

  await writeText(path.join(PUBLIC_DIR, 'en/guides/index.html'), renderGuideHub())
  for (const guide of GUIDE_PAGES) {
    const html = renderGuideDetail(guide)
    await writeText(path.join(PUBLIC_DIR, `en/guides/${guide.slug}/index.html`), html)
  }

  await writeText(path.join(PUBLIC_DIR, 'en/guides/ctr-title-variants.json'), buildCtrTitleVariantsManifest())
  await writeText(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap())
}

await main()
