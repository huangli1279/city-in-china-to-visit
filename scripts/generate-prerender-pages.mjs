import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://bestcityinchina.site').replace(/\/+$/, '')
const CTR_TITLE_VARIANT = process.env.CTR_TITLE_VARIANT === 'B' ? 'B' : 'A'
const PRERENDER_LANDING_PAGES = process.env.PRERENDER_LANDING_PAGES === '1'
const GA_MEASUREMENT_ID = 'G-ZTZTZ5TQMR'
const ADSENSE_CLIENT_ID = 'ca-pub-8272386212758068'
const ROOT_LANDING_PATH = '/'
const ORGANIZATION_NAME = 'City Vibe Matcher'
const AUTHOR_NAME = 'City Vibe Matcher Editorial Team'
const PUBLISHED_DATE_ISO = '2026-01-15'
const PUBLISHED_DATE_TEXT = 'January 15, 2026'
const LAST_MODIFIED_DATE_ISO = '2026-02-21'
const LAST_MODIFIED_DATE_TEXT = 'February 21, 2026'
const CONTACT_EMAIL = 'team@bestcityinchina.site'

const LANGUAGES = [
  { urlCode: 'en', i18nCode: 'en', htmlLang: 'en', label: '🇬🇧 English' },
  { urlCode: 'zh', i18nCode: 'zh-CN', htmlLang: 'zh-CN', label: '🇨🇳 中文' },
  { urlCode: 'ja', i18nCode: 'ja', htmlLang: 'ja', label: '🇯🇵 日本語' },
  { urlCode: 'ko', i18nCode: 'ko', htmlLang: 'ko', label: '🇰🇷 한국어' },
]

const OG_LOCALE_MAP = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
}

const PAGE_SEO_COPY = {
  en: {
    about: {
      title: 'About City Vibe Matcher | Methodology, Editorial Standards, and First-Trip Scope',
      description:
        'Learn how City Vibe Matcher uses an 18-question model, manually reviewed city profiles, and editorial standards to help first-time China travelers choose a practical first stop.',
    },
    contact: {
      title: 'Contact City Vibe Matcher | Feedback, Corrections, and Media Inquiries',
      description:
        'Contact City Vibe Matcher for quiz feedback, guide corrections, partnership opportunities, and media requests, and include relevant page URLs for faster editorial review.',
    },
    privacy: {
      title: 'Privacy Policy | City Vibe Matcher Data, Cookies, and Retention Practices',
      description:
        'Read how bestcityinchina.site handles analytics data, cookies, third-party services, and retention practices, and how to contact us with privacy-related questions.',
    },
  },
  zh: {
    about: {
      title: '关于 City Vibe Matcher｜首访中国选城方法与编辑准则',
      description:
        '了解 City Vibe Matcher 如何通过 18 道题、人工维护的城市画像与编辑审校流程，为首次来华旅行者提供可执行的首站决策框架与备选策略。',
    },
    contact: {
      title: '联系 City Vibe Matcher｜反馈、内容纠错与合作咨询',
      description:
        '如需反馈匹配结果、提交内容更正、媒体采访或合作咨询，可通过本页联系 City Vibe Matcher，并附上页面链接与问题背景以便快速处理。',
    },
    privacy: {
      title: '隐私政策｜City Vibe Matcher 的数据与 Cookie 说明',
      description:
        '查看 bestcityinchina.site 如何处理分析数据、Cookie、第三方服务与数据保留周期，并了解如何就隐私问题联系我们。',
    },
  },
  ja: {
    about: {
      title: 'City Vibe Matcher について｜初中国向け選城メソッドと編集基準',
      description:
        'City Vibe Matcher が18問診断、編集チームの都市プロファイル、更新ポリシーを用いて、初めて中国を訪れる旅行者の最初の都市選びをどう支援するかを説明します。',
    },
    contact: {
      title: 'お問い合わせ｜City Vibe Matcher への質問・修正依頼・取材相談',
      description:
        '診断結果へのフィードバック、ガイド内容の修正依頼、提携や取材の相談はこのページから受け付けています。対象ページURLと背景を添えてご連絡ください。',
    },
    privacy: {
      title: 'プライバシーポリシー｜City Vibe Matcher のデータ利用と保持方針',
      description:
        'bestcityinchina.site における解析データ、Cookie、第三者サービス、データ保持期間、プライバシーに関するお問い合わせ方法をまとめています。',
    },
  },
  ko: {
    about: {
      title: 'City Vibe Matcher 소개｜중국 첫 방문 도시 선정 방식과 편집 원칙',
      description:
        'City Vibe Matcher가 18문항 진단, 수동 검수 도시 프로필, 편집 업데이트 기준을 통해 중국 첫 방문자의 시작 도시 결정을 어떻게 돕는지 설명합니다.',
    },
    contact: {
      title: '문의하기｜City Vibe Matcher 피드백·수정 요청·협업 제안',
      description:
        '매칭 결과 피드백, 가이드 내용 정정, 제휴 및 미디어 문의는 이 페이지에서 접수합니다. 빠른 검토를 위해 대상 URL과 문의 배경을 함께 보내주세요.',
    },
    privacy: {
      title: '개인정보처리방침｜City Vibe Matcher 데이터·쿠키·보관 정책',
      description:
        'bestcityinchina.site의 분석 데이터 처리, 쿠키 사용, 제3자 서비스, 데이터 보관 기간, 개인정보 문의 방법을 확인할 수 있습니다.',
    },
  },
}

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
      'Match Chinese cities to your travel personality across heritage, food, nature, nightlife, and recovery pace, with practical examples for first-trip options.',
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

function resolveLangCode(langOrCode) {
  if (!langOrCode) return 'en'
  return typeof langOrCode === 'string' ? langOrCode : langOrCode.urlCode
}

function ogLocaleForLang(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  return OG_LOCALE_MAP[langCode] ?? OG_LOCALE_MAP.en
}

function ogLocaleAlternatesForLang(langOrCode) {
  const currentLocale = ogLocaleForLang(langOrCode)
  return Object.values(OG_LOCALE_MAP).filter((locale) => locale !== currentLocale)
}

function resolvePageSeoCopy(langOrCode, pageKey, fallbackTitle, fallbackDescription) {
  const langCode = resolveLangCode(langOrCode)
  const copy = PAGE_SEO_COPY[langCode]?.[pageKey]
  return {
    title: copy?.title ?? fallbackTitle,
    description: copy?.description ?? fallbackDescription,
  }
}

function homePath(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  return `/${langCode}/`
}

function aboutPath(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  return `/${langCode}/about/`
}

function contactPath(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  return `/${langCode}/contact/`
}

function privacyPolicyPath(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  return `/${langCode}/privacy-policy/`
}

function guideHubPath(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  return `/${langCode}/guides/`
}

function guidePath(langOrCode, guideOrSlug) {
  const langCode = resolveLangCode(langOrCode)
  const slug = typeof guideOrSlug === 'string' ? guideOrSlug : guideOrSlug.slug
  return `${guideHubPath(langCode)}${slug}/`
}

function buildAuthorEntity(langOrCode) {
  const langCode = resolveLangCode(langOrCode)
  const authorPageUrl = absUrl(aboutPath(langCode))
  return {
    '@type': 'Organization',
    '@id': `${authorPageUrl}#author`,
    name: AUTHOR_NAME,
    url: authorPageUrl,
  }
}

function buildPublisherEntity() {
  return {
    '@type': 'Organization',
    '@id': absUrl('/#organization'),
    name: ORGANIZATION_NAME,
    url: absUrl('/'),
    email: CONTACT_EMAIL,
    logo: {
      '@type': 'ImageObject',
      url: absUrl('/og-image.svg'),
    },
  }
}

function renderBrandLink({ href, label, eyebrow }) {
  const eyebrowHtml = eyebrow
    ? `<p class="header-brand-stamp">${escapeHtml(eyebrow)}</p>`
    : ''

  return `<a class="brand-link" href="${escapeHtml(href)}"><img class="brand-logo" src="/logo.svg" alt="" width="36" height="36" loading="eager" decoding="async" aria-hidden="true" /><div class="brand-copy"><div class="header-brand-row"><p class="ink-title brand-title">${escapeHtml(label)}</p>${eyebrowHtml}</div></div></a>`
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

function renderAdsenseTag() {
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}" crossorigin="anonymous"></script>`
}

function renderDocument({
  htmlLang,
  title,
  description,
  canonicalPath,
  alternates,
  ogLocale = 'en_US',
  ogLocaleAlternates = ['zh_CN', 'ja_JP', 'ko_KR'],
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
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <link rel="apple-touch-icon" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="google-adsense-account" content="${escapeHtml(ADSENSE_CLIENT_ID)}" />
    <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    ${renderAlternateLinks(alternates)}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:locale" content="${escapeHtml(ogLocale)}" />
    ${ogLocaleAlternates
      .map((locale) => `<meta property="og:locale:alternate" content="${escapeHtml(locale)}" />`)
      .join('\n    ')}
    <meta property="og:image" content="${escapeHtml(absUrl('/og-image.svg'))}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(absUrl('/og-image.svg'))}" />
    ${headExtras}
    ${renderAdsenseTag()}
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
    href: absUrl(homePath(lang)),
  }))
  links.push({ hreflang: 'x-default', href: absUrl(homePath('en')) })
  return links
}

function buildGuideAlternates(slug = '') {
  const suffix = slug ? `${slug}/` : ''
  const links = LANGUAGES.map((lang) => ({
    hreflang: lang.htmlLang,
    href: absUrl(`${guideHubPath(lang)}${suffix}`),
  }))
  links.push({ hreflang: 'x-default', href: absUrl(`${guideHubPath('en')}${suffix}`) })
  return links
}

function buildPageAlternates(pageSegment) {
  const normalizedSegment = pageSegment.replace(/^\/+|\/+$/g, '')
  const links = LANGUAGES.map((lang) => ({
    hreflang: lang.htmlLang,
    href: absUrl(`/${lang.urlCode}/${normalizedSegment}/`),
  }))
  links.push({ hreflang: 'x-default', href: absUrl(`/en/${normalizedSegment}/`) })
  return links
}

function swapLangInPath(pathname, targetLang) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const hasTrailingSlash = normalizedPath.length > 1 && normalizedPath.endsWith('/')
  const segments = normalizedPath.split('/').filter(Boolean)

  if (segments.length === 0) {
    return homePath(targetLang)
  }

  const knownLangs = new Set(LANGUAGES.map((lang) => lang.urlCode))
  if (knownLangs.has(segments[0])) {
    segments[0] = targetLang
  } else {
    segments.unshift(targetLang)
  }

  const rebuilt = `/${segments.join('/')}`
  if (hasTrailingSlash && !rebuilt.endsWith('/')) {
    return `${rebuilt}/`
  }
  return rebuilt
}

function renderLanguageSwitcher(currentLang, currentPath) {
  const current = LANGUAGES.find((lang) => lang.urlCode === currentLang) ?? LANGUAGES[0]
  const basePath = currentPath && typeof currentPath === 'string' ? currentPath : homePath(currentLang)
  const items = LANGUAGES.map((lang) => {
    const active = lang.urlCode === currentLang ? 'is-active' : ''
    const targetPath = swapLangInPath(basePath, lang.urlCode)
    return `<a class="lang-option ${active}" href="${targetPath}">${escapeHtml(lang.label)}</a>`
  }).join('')

  return `<div class="lang-menu">
    <details class="lang-details">
      <summary class="lang-trigger" aria-label="Language">
        <span class="lang-current">${escapeHtml(current.label)}</span>
        <span class="lang-caret" aria-hidden="true">▾</span>
      </summary>
      <div class="lang-list" role="listbox" aria-label="Language options">
        ${items}
      </div>
    </details>
  </div>`
}

function buildLandingNavLinks(langOrCode, locale) {
  const langCode = resolveLangCode(langOrCode)
  const homeHeader = locale?.home?.header ?? {}
  return [
    {
      href: `${homePath(langCode)}#landing-preview`,
      label: homeHeader.navPreview ?? 'City Preview',
    },
    {
      href: `${homePath(langCode)}#landing-pain`,
      label: homeHeader.navPain ?? 'Why This Quiz',
    },
    {
      href: `${homePath(langCode)}#landing-model`,
      label: homeHeader.navModel ?? 'How Matching Works',
    },
  ]
}

function buildContextNavLinks(langOrCode, locale, activeKey) {
  const langCode = resolveLangCode(langOrCode)
  const labels = localizedUiLabels(langCode, locale)
  const links = [
    { key: 'home', href: homePath(langCode), label: labels.home },
    { key: 'guides', href: guideHubPath(langCode), label: labels.guides },
  ]

  return links.map((link) => ({
    ...link,
    active: link.key === activeKey,
  }))
}

function renderHeaderNav(links) {
  return links
    .map((link) => {
      const activeClass = link.active ? ' is-active' : ''
      return `<a class="header-nav-chip${activeClass}" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
    })
    .join('\n      ')
}

function renderSiteHeader({ lang = 'en', locale, navLinks = [], currentPath } = {}) {
  const langCode = resolveLangCode(lang)
  const brandLabel = locale?.home?.header?.brandName ?? 'City Vibe Matcher'
  const brandEyebrow = locale?.home?.header?.brandEyebrow ?? ''
  const headerCtaLabel = locale?.home?.header?.cta ?? locale?.home?.cta ?? 'Start Quiz'
  const navHtml =
    navLinks.length > 0
      ? `<nav class="header-links" aria-label="Primary">
      ${renderHeaderNav(navLinks)}
    </nav>`
      : ''

  return `<header class="site-header">
    <div class="surface-card grid-lattice header-shell">
      <div class="header-main">
        ${renderBrandLink({ href: ROOT_LANDING_PATH, label: brandLabel, eyebrow: brandEyebrow })}
        ${navHtml}
        <a class="btn-ink header-cta" href="/${langCode}/quiz">${escapeHtml(headerCtaLabel)}</a>
        ${renderLanguageSwitcher(langCode, currentPath ?? homePath(langCode))}
      </div>
    </div>
  </header>`
}

function renderFooterNav(links) {
  return links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('\n      ')
}

function renderSiteFooter({ lang = 'en', locale, includeGuides = true, guidesPath } = {}) {
  const langCode = resolveLangCode(lang)
  const footer = locale?.home?.footer ?? {}
  const legalLinks = locale?.home?.footer?.legalLinks ?? {}
  const aboutLabel = legalLinks.about ?? 'About'
  const contactLabel = legalLinks.contact ?? 'Contact'
  const guidesLabel = legalLinks.guides ?? 'Guides'
  const privacyLabel = legalLinks.privacy ?? 'Privacy Policy'
  const homeLabel = legalLinks.home ?? 'Home'
  const currentYear = new Date().getFullYear()
  const resolvedHomePath = homePath(langCode)
  const resolvedGuidesPath = guidesPath ?? guideHubPath(langCode)
  const links = [
    { href: aboutPath(langCode), label: aboutLabel },
    { href: contactPath(langCode), label: contactLabel },
    { href: privacyPolicyPath(langCode), label: privacyLabel },
  ]
  if (includeGuides) {
    links.push({ href: resolvedGuidesPath, label: guidesLabel })
  }
  links.push({ href: resolvedHomePath, label: homeLabel })

  return `<footer class="site-footer-shell">
    <div class="site-footer-main">
      <section>
        <p class="footer-eyebrow">${escapeHtml(footer?.eyebrow ?? 'Plan less. Experience more.')}</p>
        <h2 class="footer-title">${escapeHtml(footer?.title ?? 'Your first China city should fit who you are.')}</h2>
        <p class="footer-subtitle">${escapeHtml(footer?.subtitle ?? 'Move from endless research to a practical first-city plan.')}</p>
      </section>
      <section class="footer-actions">
        <a class="cta footer-cta" href="/${langCode}/quiz">${escapeHtml(footer?.cta ?? 'Start the quiz')}</a>
        <p class="footer-note">${escapeHtml(footer?.disclaimer ?? 'No signup required. Results in about 2-3 minutes.')}</p>
      </section>
    </div>
    <div class="site-footer-bottom">
      <span>© ${currentYear} ${escapeHtml(footer?.copyright ?? SITE_URL.replace(/^https?:\/\//, ''))}</span>
      <nav class="site-footer-links">
        ${renderFooterNav(links)}
      </nav>
    </div>
  </footer>`
}

function localizedUiLabels(langOrCode, locale) {
  const langCode = resolveLangCode(langOrCode)
  const legalLinks = locale?.home?.footer?.legalLinks ?? {}
  const shortLabelMap = {
    en: {
      quiz: 'Quiz',
      guideEyebrow: 'Guide',
      availableGuides: 'Available guides',
      furtherReading: 'Further reading',
      relatedGuides: 'Related guides',
      relatedGuidesList: 'Related China city guides',
      personalizedAnswer: 'Need a personalized answer?',
      personalizedMatch: 'Get your personalized city match',
      author: 'Author',
      published: 'Published',
      lastUpdated: 'Last updated',
      by: 'By',
      publishedOn: 'Published on',
      legalEyebrow: 'Legal',
      email: 'Email',
      contactAndFeedback: 'Contact and feedback',
      responseTarget: 'Response target',
      responseTargetValue: 'within 3 business days',
      whatWeHelpWith: 'What we can help with',
      beforeContact: 'Before you contact us',
      correctionRequest: 'How to request a content correction',
      importantNote: 'Important note',
      privacyHandling: 'Privacy and message handling',
      overview: 'Overview',
      dataCollection: 'What data we collect',
      thirdPartyServices: 'Third-party services',
      dataRetention: 'Data retention',
    },
    zh: {
      quiz: '测试',
      guideEyebrow: '攻略',
      availableGuides: '攻略列表',
      furtherReading: '延伸阅读',
      relatedGuides: '相关攻略',
      relatedGuidesList: '相关中国城市攻略',
      personalizedAnswer: '需要个性化结果？',
      personalizedMatch: '获取你的个性化城市匹配',
      author: '作者',
      published: '发布时间',
      lastUpdated: '最近更新',
      by: '作者',
      publishedOn: '发布于',
      legalEyebrow: '法律信息',
      email: '邮箱',
      contactAndFeedback: '联系与反馈',
      responseTarget: '回复时效',
      responseTargetValue: '3 个工作日内',
      whatWeHelpWith: '我们可协助的事项',
      beforeContact: '联系前请先阅读',
      correctionRequest: '如何提交内容更正',
      importantNote: '重要说明',
      privacyHandling: '隐私与信息处理',
      overview: '概述',
      dataCollection: '我们收集的数据',
      thirdPartyServices: '第三方服务',
      dataRetention: '数据保留',
    },
    ja: {
      quiz: 'クイズ',
      guideEyebrow: 'ガイド',
      availableGuides: 'ガイド一覧',
      furtherReading: '関連情報',
      relatedGuides: '関連ガイド',
      relatedGuidesList: '関連する中国都市ガイド',
      personalizedAnswer: 'あなた向けの結果が必要ですか？',
      personalizedMatch: 'あなた向けの都市マッチを取得',
      author: '著者',
      published: '公開日',
      lastUpdated: '最終更新',
      by: '作成者',
      publishedOn: '公開',
      legalEyebrow: '法務',
      email: 'メール',
      contactAndFeedback: 'お問い合わせとフィードバック',
      responseTarget: '返信目安',
      responseTargetValue: '3 営業日以内',
      whatWeHelpWith: '対応できる内容',
      beforeContact: 'お問い合わせ前の確認事項',
      correctionRequest: '修正依頼の方法',
      importantNote: '重要事項',
      privacyHandling: 'プライバシーと問い合わせ管理',
      overview: '概要',
      dataCollection: '収集するデータ',
      thirdPartyServices: '第三者サービス',
      dataRetention: 'データ保持',
    },
    ko: {
      quiz: '퀴즈',
      guideEyebrow: '가이드',
      availableGuides: '가이드 목록',
      furtherReading: '추가 읽을거리',
      relatedGuides: '관련 가이드',
      relatedGuidesList: '관련 중국 도시 가이드',
      personalizedAnswer: '개인 맞춤 결과가 필요하신가요?',
      personalizedMatch: '개인 맞춤 도시 매칭 받기',
      author: '작성자',
      published: '게시일',
      lastUpdated: '최종 업데이트',
      by: '작성',
      publishedOn: '게시',
      legalEyebrow: '법률',
      email: '이메일',
      contactAndFeedback: '문의 및 피드백',
      responseTarget: '응답 목표',
      responseTargetValue: '영업일 기준 3일 이내',
      whatWeHelpWith: '도움드릴 수 있는 내용',
      beforeContact: '문의 전 확인 사항',
      correctionRequest: '콘텐츠 수정 요청 방법',
      importantNote: '중요 안내',
      privacyHandling: '개인정보 및 문의 처리',
      overview: '개요',
      dataCollection: '수집하는 데이터',
      thirdPartyServices: '제3자 서비스',
      dataRetention: '데이터 보관',
    },
  }

  const defaults = shortLabelMap.en
  const localized = shortLabelMap[langCode] ?? defaults

  return {
    home: legalLinks.home ?? 'Home',
    guides: legalLinks.guides ?? 'Guides',
    about: legalLinks.about ?? 'About',
    contact: legalLinks.contact ?? 'Contact',
    privacy: legalLinks.privacy ?? 'Privacy Policy',
    ...localized,
  }
}

function buildGuideCards(locale) {
  const topicClusterItems = Array.isArray(locale?.home?.topicCluster?.items) ? locale.home.topicCluster.items : []
  return GUIDE_PAGES.map((guide, index) => {
    const localizedItem = topicClusterItems[index]
    return {
      guide,
      title: localizedItem?.title ?? guideTitle(guide),
      description: localizedItem?.description ?? guide.description,
    }
  })
}

function renderGuideCardList(lang, guideCards) {
  return guideCards
    .map(
      (card) => `<article class="guide-card">
  <h3><a href="${guidePath(lang, card.guide)}">${escapeHtml(card.title)}</a></h3>
  <p>${escapeHtml(card.description)}</p>
</article>`
    )
    .join('\n')
}

function renderLandingPage(lang, locale) {
  const home = locale.home ?? {}
  const labels = localizedUiLabels(lang, locale)
  const faqItems = Array.isArray(home?.faq?.items) ? home.faq.items : []
  const seoGuidePoints = Array.isArray(home?.seoGuide?.points) ? home.seoGuide.points : []
  const topicCluster = home?.topicCluster ?? {}
  const guideCards = buildGuideCards(locale)
  const canonicalPath = homePath(lang)
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

  jsonLd.push(
    createItemList(
      topicCluster?.title ?? 'China city planning guides',
      guideCards.map((card) => ({
        name: card.title,
        path: guidePath(lang, card.guide),
      }))
    )
  )

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

  const guideClusterSection = `<section class="block">
  <p class="eyebrow">${escapeHtml(topicCluster?.eyebrow ?? 'Topic cluster')}</p>
  <h2>${escapeHtml(topicCluster?.title ?? 'China city planning guides')}</h2>
  <p>${escapeHtml(topicCluster?.subtitle ?? 'Use these focused guides to compare destinations, plan trip length, and narrow your first city with less research time.')}</p>
  <div class="guide-grid">
    ${renderGuideCardList(lang, guideCards)}
  </div>
  <p class="block-link"><a href="${guideHubPath(lang)}">${escapeHtml(topicCluster?.cta ?? 'See all guides')}</a></p>
</section>`

  const trustSection =
    lang.urlCode === 'en'
      ? `<section class="block">
  <h2>Trust and editorial notes</h2>
  <p>This travel-matching project combines structured quiz responses with manually curated city profiles. It is intended for first-trip planning, not for visa, legal, or medical decisions.</p>
  <p>For policy-sensitive travel details, always verify information through official tourism boards, embassy updates, and airline notices before final booking.</p>
</section>`
      : ''

  const mainHtml = `<main id="main-content" class="page-shell">
  ${renderSiteHeader({ lang, locale, navLinks: buildLandingNavLinks(lang, locale), currentPath: canonicalPath })}

  <section class="hero block">
    <p class="eyebrow">${escapeHtml(home?.badge ?? '')}</p>
    <h1>${escapeHtml(home?.title ?? '')}</h1>
    <p class="hero-subtitle">${escapeHtml(home?.subtitle ?? '')}</p>
    <div class="metric-grid">
      <article><strong>18</strong><span>${escapeHtml(home?.metrics?.questions ?? '')}</span></article>
      <article><strong>6</strong><span>${escapeHtml(home?.metrics?.dimensions ?? '')}</span></article>
      <article><strong>${escapeHtml(home?.metrics?.citiesValue ?? 'Curated')}</strong><span>${escapeHtml(home?.metrics?.cities ?? '')}</span></article>
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

  ${renderSiteFooter({ lang, locale, includeGuides: true, guidesPath: guideHubPath(lang) })}
</main>`

  return renderDocument({
    htmlLang: lang.htmlLang,
    title,
    description,
    canonicalPath,
    alternates: buildLandingAlternates(),
    ogLocale: ogLocaleForLang(lang),
    ogLocaleAlternates: ogLocaleAlternatesForLang(lang),
    mainHtml,
    jsonLd,
  })
}

function renderGuideHub(lang, locale) {
  const home = locale.home ?? {}
  const topicCluster = home?.topicCluster ?? {}
  const guideCards = buildGuideCards(locale)
  const labels = localizedUiLabels(lang, locale)
  const canonicalPath = guideHubPath(lang)
  const title =
    topicCluster?.title
      ? `${topicCluster.title} | ${home?.header?.brandName ?? 'City Vibe Matcher'}`
      : 'City Planning Guides for First-Time China Travelers'
  const description =
    topicCluster?.subtitle ??
    'Explore focused guides that help first-time travelers compare destinations, choose trip length, and plan a confident first stop in China.'
  const alternates = buildGuideAlternates()

  const mainHtml = `<main id="main-content" class="page-shell">
  ${renderSiteHeader({ lang, locale, currentPath: canonicalPath })}

  <section class="block">
    <p class="eyebrow">${escapeHtml(topicCluster?.eyebrow ?? 'Topic cluster')}</p>
    <h1>${escapeHtml(topicCluster?.title ?? 'China city planning guides')}</h1>
    <p>${escapeHtml(topicCluster?.subtitle ?? 'These pages support the destination-matching quiz and answer the planning questions that usually block first-time trips: where to start, how long to stay, and how to compare high-profile cities.')}</p>
    <p>Instead of generic rankings, each guide is written as a decision framework. You can move from uncertainty to a practical shortlist in one reading session.</p>
    <h2>${escapeHtml(labels.availableGuides)}</h2>
    <div class="guide-grid">
      ${renderGuideCardList(lang, guideCards)}
    </div>
    <h2>How to use this guide cluster</h2>
    <p>Start with a comparison guide, then validate your pace with the day-planning guide. If two destinations still feel equally good, choose the one with lower logistics friction for your arrival week.</p>
    <p>After choosing your likely first city, use the quiz to validate fit against the matching model and keep one backup city in case seasonality or flight constraints shift your plan.</p>
    <h2>Scope and limitations</h2>
    <p>These guides are designed for first-time visitors and focus on decision clarity, not comprehensive destination encyclopedias. They summarize high-impact tradeoffs such as transport friction, planning load, and itinerary recovery needs.</p>
    <p>For official visa policy, entry requirements, and safety notices, always verify information through government and embassy sources before finalizing bookings.</p>
  </section>

  <section class="cta-panel">
    <h2>${escapeHtml(labels.personalizedAnswer)}</h2>
    <p>Use the 18-question matcher to rank Chinese cities by your travel style.</p>
    <a class="cta" href="/${lang.urlCode}/quiz">${escapeHtml(home?.cta ?? 'Start the quiz')}</a>
  </section>

  ${renderSiteFooter({ lang, locale, includeGuides: true, guidesPath: guideHubPath(lang) })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: absUrl(canonicalPath),
      inLanguage: lang.htmlLang,
    },
    createBreadcrumbList([
      { name: labels.home, path: `/${lang.urlCode}` },
      { name: labels.guides, path: canonicalPath },
    ]),
    createItemList(
      topicCluster?.title ?? 'China city planning guides',
      guideCards.map((card) => ({
        name: card.title,
        path: guidePath(lang, card.guide),
      }))
    ),
  ]

  return renderDocument({
    htmlLang: lang.htmlLang,
    title,
    description,
    canonicalPath,
    alternates,
    ogLocale: ogLocaleForLang(lang),
    ogLocaleAlternates: ogLocaleAlternatesForLang(lang),
    mainHtml,
    jsonLd,
  })
}

function renderGuideDetail(lang, locale, guide) {
  const home = locale.home ?? {}
  const labels = localizedUiLabels(lang, locale)
  const guideCards = buildGuideCards(locale)
  const localizedTitleBySlug = new Map(guideCards.map((card) => [card.guide.slug, card.title]))
  const localizedDescriptionBySlug = new Map(guideCards.map((card) => [card.guide.slug, card.description]))
  const resolvedTitle = localizedTitleBySlug.get(guide.slug) ?? guideTitle(guide)
  const canonicalPath = guidePath(lang, guide)
  const alternates = buildGuideAlternates(guide.slug)

  const relatedGuideItems = GUIDE_PAGES.filter((page) => page.slug !== guide.slug).map((page) => ({
    name: localizedTitleBySlug.get(page.slug) ?? guideTitle(page),
    path: guidePath(lang, page),
  }))

  const relatedLinks = GUIDE_PAGES.filter((page) => page.slug !== guide.slug)
    .map((page) => `<li><a href="${guidePath(lang, page)}">${escapeHtml(localizedTitleBySlug.get(page.slug) ?? guideTitle(page))}</a></li>`)
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
  ${renderSiteHeader({ lang, locale, currentPath: canonicalPath })}

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="${homePath(lang)}">${escapeHtml(labels.home)}</a>
    <span>/</span>
    <a href="${guideHubPath(lang)}">${escapeHtml(labels.guides)}</a>
    <span>/</span>
    <span>${escapeHtml(resolvedTitle)}</span>
  </nav>

  <article class="article-page block">
    <p class="eyebrow">${escapeHtml(labels.guideEyebrow)}</p>
    <h1>${escapeHtml(resolvedTitle)}</h1>
    <div class="article-meta-stack">
      <p class="article-meta author-byline"><strong>${escapeHtml(labels.author)}:</strong> ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta"><strong>${escapeHtml(labels.published)}:</strong> <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
      <p class="article-meta"><strong>${escapeHtml(labels.lastUpdated)}:</strong> <time datetime="${LAST_MODIFIED_DATE_ISO}">${escapeHtml(LAST_MODIFIED_DATE_TEXT)}</time></p>
      <p class="article-meta">${escapeHtml(labels.by)} ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta">${escapeHtml(labels.publishedOn)} <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
    </div>
    <p class="article-intro">${escapeHtml(guide.intro)}</p>
    <ul class="list-cards">
      ${keyPointHtml}
    </ul>
    ${sectionHtml}
    <section class="article-block">
      <h2>${escapeHtml(labels.furtherReading)}</h2>
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
    <h2>${escapeHtml(labels.relatedGuides)}</h2>
    <ul class="related-links">
      ${relatedLinks}
    </ul>
  </section>

  <section class="cta-panel">
    <h2>${escapeHtml(labels.personalizedMatch)}</h2>
    <p>Stop comparing cities manually. Answer 18 questions and get a ranked recommendation.</p>
    <a class="cta" href="/${lang.urlCode}/quiz">${escapeHtml(home?.cta ?? 'Take the city quiz')}</a>
  </section>

  ${renderSiteFooter({ lang, locale, includeGuides: true, guidesPath: guideHubPath(lang) })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: resolvedTitle,
      description: localizedDescriptionBySlug.get(guide.slug) ?? guide.description,
      url: absUrl(canonicalPath),
      inLanguage: lang.htmlLang,
      image: absUrl('/og-image.svg'),
      mainEntityOfPage: absUrl(canonicalPath),
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: LAST_MODIFIED_DATE_ISO,
      author: buildAuthorEntity(lang),
      publisher: buildPublisherEntity(),
    },
    createBreadcrumbList([
      { name: labels.home, path: `/${lang.urlCode}` },
      { name: labels.guides, path: guideHubPath(lang) },
      { name: resolvedTitle, path: canonicalPath },
    ]),
    createItemList(labels.relatedGuidesList, relatedGuideItems),
  ]

  const headExtras = [
    `<meta name="seo-title-variant" content="${CTR_TITLE_VARIANT}" />`,
    `<meta name="seo-title-a" content="${escapeHtml(guide?.titleVariants?.A ?? guide.title)}" />`,
    `<meta name="seo-title-b" content="${escapeHtml(guide?.titleVariants?.B ?? guide.title)}" />`,
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:author" content="${escapeHtml(absUrl(aboutPath(lang)))}" />`,
    `<meta property="article:published_time" content="${PUBLISHED_DATE_ISO}" />`,
    `<meta property="article:modified_time" content="${LAST_MODIFIED_DATE_ISO}" />`,
  ].join('\n    ')

  return renderDocument({
    htmlLang: lang.htmlLang,
    title: resolvedTitle,
    description: localizedDescriptionBySlug.get(guide.slug) ?? guide.description,
    canonicalPath,
    alternates,
    ogLocale: ogLocaleForLang(lang),
    ogLocaleAlternates: ogLocaleAlternatesForLang(lang),
    mainHtml,
    jsonLd,
    headExtras,
  })
}

function renderAboutPage(lang, locale) {
  const langCode = resolveLangCode(lang)
  const htmlLang = lang.htmlLang ?? (langCode === 'zh' ? 'zh-CN' : langCode)
  const legalLinks = locale?.home?.footer?.legalLinks ?? {}
  const labels = localizedUiLabels(lang, locale)
  const homeLabel = legalLinks.home ?? 'Home'
  const guidesLabel = legalLinks.guides ?? 'Guides'
  const contactLabel = legalLinks.contact ?? 'Contact'
  const aboutLabel = legalLinks.about ?? 'About'
  const canonicalPath = aboutPath(langCode)
  const fallbackTitle = `${aboutLabel} | City Vibe Matcher`
  const fallbackDescription =
    'Learn how City Vibe Matcher builds first-trip China recommendations with an 18-question model, curated city profiles, and practical planning guidance.'
  const { title, description } = resolvePageSeoCopy(langCode, 'about', fallbackTitle, fallbackDescription)
  const alternates = buildPageAlternates('about')

  const mainHtml = `<main id="main-content" class="page-shell">
  ${renderSiteHeader({ lang: langCode, locale, navLinks: buildContextNavLinks(langCode, locale, ''), currentPath: canonicalPath })}

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="${homePath(langCode)}">${escapeHtml(homeLabel)}</a>
    <span>/</span>
    <span>${escapeHtml(aboutLabel)}</span>
  </nav>

  <article class="article-page block">
    <p class="eyebrow">${escapeHtml(aboutLabel)}</p>
    <h1>How this project helps first-time China travelers</h1>
    <div class="article-meta-stack">
      <p class="article-meta author-byline"><strong>${escapeHtml(labels.author)}:</strong> ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta"><strong>${escapeHtml(labels.published)}:</strong> <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
      <p class="article-meta"><strong>${escapeHtml(labels.lastUpdated)}:</strong> <time datetime="${LAST_MODIFIED_DATE_ISO}">${escapeHtml(LAST_MODIFIED_DATE_TEXT)}</time></p>
      <p class="article-meta">${escapeHtml(labels.by)} ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta">${escapeHtml(labels.publishedOn)} <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
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
      <h2>${escapeHtml(labels.contactAndFeedback)}</h2>
      <p>Questions, corrections, and feedback are welcome. Reach us at <strong>${escapeHtml(CONTACT_EMAIL)}</strong> or visit the <a href="${contactPath(langCode)}">${escapeHtml(contactLabel)}</a> page.</p>
    </section>
  </article>

  ${renderSiteFooter({ lang: langCode, locale, includeGuides: true, guidesPath: guideHubPath(langCode) })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description,
      url: absUrl(canonicalPath),
      inLanguage: htmlLang,
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: LAST_MODIFIED_DATE_ISO,
      author: buildAuthorEntity(langCode),
      publisher: buildPublisherEntity(),
    },
    {
      '@context': 'https://schema.org',
      ...buildPublisherEntity(),
    },
    createBreadcrumbList([
      { name: homeLabel, path: `/${langCode}` },
      { name: aboutLabel, path: canonicalPath },
    ]),
  ]

  const headExtras = [
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:author" content="${escapeHtml(absUrl(aboutPath(langCode)))}" />`,
    `<meta property="article:published_time" content="${PUBLISHED_DATE_ISO}" />`,
    `<meta property="article:modified_time" content="${LAST_MODIFIED_DATE_ISO}" />`,
  ].join('\n    ')

  return renderDocument({
    htmlLang,
    title,
    description,
    canonicalPath,
    alternates,
    ogLocale: ogLocaleForLang(langCode),
    ogLocaleAlternates: ogLocaleAlternatesForLang(langCode),
    mainHtml,
    jsonLd,
    headExtras,
  })
}

function renderContactPage(lang, locale) {
  const langCode = resolveLangCode(lang)
  const htmlLang = lang.htmlLang ?? (langCode === 'zh' ? 'zh-CN' : langCode)
  const legalLinks = locale?.home?.footer?.legalLinks ?? {}
  const labels = localizedUiLabels(lang, locale)
  const homeLabel = legalLinks.home ?? 'Home'
  const guidesLabel = legalLinks.guides ?? 'Guides'
  const aboutLabel = legalLinks.about ?? 'About'
  const contactLabel = legalLinks.contact ?? 'Contact'
  const canonicalPath = contactPath(langCode)
  const fallbackTitle = `${contactLabel} | City Vibe Matcher`
  const fallbackDescription =
    'Contact City Vibe Matcher for travel-matching questions, feedback, media requests, and data corrections related to our China city planning guides.'
  const { title, description } = resolvePageSeoCopy(langCode, 'contact', fallbackTitle, fallbackDescription)
  const alternates = buildPageAlternates('contact')

  const mainHtml = `<main id="main-content" class="page-shell">
  ${renderSiteHeader({ lang: langCode, locale, navLinks: buildContextNavLinks(langCode, locale, ''), currentPath: canonicalPath })}

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="${homePath(langCode)}">${escapeHtml(homeLabel)}</a>
    <span>/</span>
    <span>${escapeHtml(contactLabel)}</span>
  </nav>

  <article class="article-page block">
    <p class="eyebrow">${escapeHtml(contactLabel)}</p>
    <h1>Get in touch</h1>
    <div class="article-meta-stack">
      <p class="article-meta author-byline"><strong>${escapeHtml(labels.author)}:</strong> ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta"><strong>${escapeHtml(labels.lastUpdated)}:</strong> <time datetime="${LAST_MODIFIED_DATE_ISO}">${escapeHtml(LAST_MODIFIED_DATE_TEXT)}</time></p>
      <p class="article-meta"><strong>${escapeHtml(labels.responseTarget)}:</strong> ${escapeHtml(labels.responseTargetValue)}</p>
      <p class="article-meta">${escapeHtml(labels.by)} ${escapeHtml(AUTHOR_NAME)}</p>
      <p class="article-meta">${escapeHtml(labels.publishedOn)} <time datetime="${PUBLISHED_DATE_ISO}">${escapeHtml(PUBLISHED_DATE_TEXT)}</time></p>
    </div>
    <p class="article-intro">Use this page for feedback about matching results, content corrections, partnerships, or media inquiries.</p>

    <section class="article-block">
      <h2>${escapeHtml(labels.email)}</h2>
      <p>General inquiries: <strong>${escapeHtml(CONTACT_EMAIL)}</strong></p>
      <p>Include your trip goal, expected travel month, and the page URL if your question is about a specific guide.</p>
    </section>

    <section class="article-block">
      <h2>${escapeHtml(labels.whatWeHelpWith)}</h2>
      <ul class="list-cards">
        <li>Questions about quiz logic and recommendation interpretation</li>
        <li>Requests to correct outdated planning details in guides</li>
        <li>Partnership and media requests related to travel planning content</li>
      </ul>
    </section>

    <section class="article-block">
      <h2>${escapeHtml(labels.beforeContact)}</h2>
      <p>If your request is about one destination page, include the exact page URL and the section that should be corrected. This helps us verify and update content much faster.</p>
      <p>If your request is about your quiz result, include your top three recommended cities and your planned travel month so we can provide more relevant context.</p>
    </section>

    <section class="article-block">
      <h2>${escapeHtml(labels.correctionRequest)}</h2>
      <p>Please include three details in your message: the current statement, the proposed correction, and one source link that supports the update. This structure helps us review requests quickly and consistently.</p>
      <p>For corrections involving regulations, include the publication date of your source so we can evaluate whether it reflects the latest policy revision.</p>
      <p>Editorial corrections are reviewed in batches and may be applied across multiple guides when the same issue affects more than one city page.</p>
    </section>

    <section class="article-block">
      <h2>${escapeHtml(labels.importantNote)}</h2>
      <p>We do not provide visa, legal, or emergency travel advice. For official entry requirements and policy updates, use government and embassy sources.</p>
      <p>For urgent operational travel issues such as flight cancellations or border policy changes, always rely on official airline and government channels first.</p>
    </section>

    <section class="article-block">
      <h2>${escapeHtml(labels.privacyHandling)}</h2>
      <p>When you email us, we only use your message to respond and improve relevant guide content. We do not sell contact details or use inquiry emails for unrelated marketing campaigns.</p>
      <p>If you want your message deleted after resolution, mention it in your thread and we will remove it from our working notes.</p>
    </section>
  </article>

  ${renderSiteFooter({ lang: langCode, locale, includeGuides: true, guidesPath: guideHubPath(langCode) })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: title,
      description,
      url: absUrl(canonicalPath),
      inLanguage: htmlLang,
      datePublished: PUBLISHED_DATE_ISO,
      dateModified: LAST_MODIFIED_DATE_ISO,
      author: buildAuthorEntity(langCode),
      publisher: buildPublisherEntity(),
    },
    {
      '@context': 'https://schema.org',
      ...buildPublisherEntity(),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: CONTACT_EMAIL,
          availableLanguage: [htmlLang],
        },
      ],
    },
    createBreadcrumbList([
      { name: homeLabel, path: `/${langCode}` },
      { name: contactLabel, path: canonicalPath },
    ]),
  ]

  const headExtras = [
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta property="article:author" content="${escapeHtml(absUrl(aboutPath(langCode)))}" />`,
    `<meta property="article:modified_time" content="${LAST_MODIFIED_DATE_ISO}" />`,
  ].join('\n    ')

  return renderDocument({
    htmlLang,
    title,
    description,
    canonicalPath,
    alternates,
    ogLocale: ogLocaleForLang(langCode),
    ogLocaleAlternates: ogLocaleAlternatesForLang(langCode),
    mainHtml,
    jsonLd,
    headExtras,
  })
}

function renderPrivacyPolicyPage(lang, locale) {
  const langCode = resolveLangCode(lang)
  const htmlLang = lang.htmlLang ?? (langCode === 'zh' ? 'zh-CN' : langCode)
  const legalLinks = locale?.home?.footer?.legalLinks ?? {}
  const labels = localizedUiLabels(lang, locale)
  const homeLabel = legalLinks.home ?? 'Home'
  const guidesLabel = legalLinks.guides ?? 'Guides'
  const aboutLabel = legalLinks.about ?? 'About'
  const contactLabel = legalLinks.contact ?? 'Contact'
  const privacyLabel = legalLinks.privacy ?? 'Privacy Policy'
  const canonicalPath = privacyPolicyPath(langCode)
  const fallbackTitle = `${privacyLabel} | City Vibe Matcher`
  const fallbackDescription =
    'Privacy policy for bestcityinchina.site covering analytics usage, cookies, third-party services, data retention, and how to contact us with privacy questions.'
  const { title, description } = resolvePageSeoCopy(langCode, 'privacy', fallbackTitle, fallbackDescription)
  const alternates = buildPageAlternates('privacy-policy')

  const mainHtml = `<main id="main-content" class="page-shell">
  ${renderSiteHeader({ lang: langCode, locale, navLinks: buildContextNavLinks(langCode, locale, ''), currentPath: canonicalPath })}

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="${homePath(langCode)}">${escapeHtml(homeLabel)}</a>
    <span>/</span>
    <span>${escapeHtml(privacyLabel)}</span>
  </nav>

  <article class="block article-page">
    <p class="eyebrow">${escapeHtml(labels.legalEyebrow)}</p>
    <h1>${escapeHtml(privacyLabel)}</h1>
    <p class="article-intro">${escapeHtml(labels.lastUpdated)}: ${escapeHtml(LAST_MODIFIED_DATE_TEXT)}</p>

    <div class="article-block">
      <h2>${escapeHtml(labels.overview)}</h2>
      <p>bestcityinchina.site is a free travel quiz tool that helps travelers choose Chinese cities to visit. We take your privacy seriously and collect minimal data.</p>
    </div>

    <div class="article-block">
      <h2>${escapeHtml(labels.dataCollection)}</h2>
      <p>We do not collect personally identifiable information. We do not require accounts or email addresses. Quiz answers are processed in your browser.</p>
      <p>We use Google Analytics 4 to collect anonymous usage data such as page views, device category, referral source, and quiz interaction events.</p>
    </div>

    <div class="article-block">
      <h2>Cookies</h2>
      <p>Analytics cookies are used only for traffic measurement. We do not use advertising cookies or marketing trackers.</p>
      <p>You can opt out using the Google Analytics Opt-out Browser Add-on.</p>
    </div>

    <div class="article-block">
      <h2>${escapeHtml(labels.thirdPartyServices)}</h2>
      <ul class="list-cards">
        <li>Google Analytics 4 for anonymous analytics</li>
        <li>Self-hosted font files for local text rendering</li>
        <li>Cloudflare Pages for hosting infrastructure</li>
      </ul>
    </div>

    <div class="article-block">
      <h2>${escapeHtml(labels.dataRetention)}</h2>
      <p>Google Analytics data is retained for 14 months. We do not store additional personal user datasets.</p>
    </div>

    <div class="article-block">
      <h2>Contact</h2>
      <p>If you have questions about this policy, email <strong>${escapeHtml(CONTACT_EMAIL)}</strong> or visit our <a href="${contactPath(langCode)}">${escapeHtml(contactLabel)}</a> page.</p>
    </div>
  </article>

  ${renderSiteFooter({ lang: langCode, locale, includeGuides: true, guidesPath: guideHubPath(langCode) })}
</main>`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: privacyLabel,
      url: absUrl(canonicalPath),
      description,
      inLanguage: htmlLang,
      dateModified: LAST_MODIFIED_DATE_ISO,
      isPartOf: {
        '@id': absUrl('/#organization'),
      },
    },
    createBreadcrumbList([
      { name: homeLabel, path: `/${langCode}` },
      { name: privacyLabel, path: canonicalPath },
    ]),
  ]

  return renderDocument({
    htmlLang,
    title,
    description,
    canonicalPath,
    alternates,
    ogLocale: ogLocaleForLang(langCode),
    ogLocaleAlternates: ogLocaleAlternatesForLang(langCode),
    mainHtml,
    jsonLd,
  })
}

function buildCtrTitleVariantsManifest() {
  const payload = {
    activeVariant: CTR_TITLE_VARIANT,
    guides: GUIDE_PAGES.map((guide) => ({
      slug: guide.slug,
      path: guidePath('en', guide),
      activeTitle: guideTitle(guide),
      titleA: guide?.titleVariants?.A ?? guide.title,
      titleB: guide?.titleVariants?.B ?? guide.title,
    })),
  }

  return `${JSON.stringify(payload, null, 2)}\n`
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const languageRoots = LANGUAGES.map((lang) => homePath(lang))
  const infoPageUrls = LANGUAGES.flatMap((lang) => [
    aboutPath(lang),
    contactPath(lang),
    privacyPolicyPath(lang),
  ])
  const guideUrls = LANGUAGES.flatMap((lang) => [
    guideHubPath(lang),
    ...GUIDE_PAGES.map((guide) => guidePath(lang, guide)),
  ])
  const urls = [...languageRoots, ...infoPageUrls, ...guideUrls]

  const nodes = urls
    .map((pathname) => {
      const priority =
        pathname === '/en/'
          ? '1.0'
          : pathname.includes('/guides/')
            ? '0.8'
            : pathname.includes('/about/') || pathname.includes('/contact/') || pathname.includes('/privacy-policy/')
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

function renderNotFoundPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Page not found | City Vibe Matcher</title>
    <meta name="description" content="The page you requested could not be found." />
    <meta name="robots" content="noindex,nofollow" />
    <link rel="canonical" href="${escapeHtml(absUrl('/404'))}" />
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f7f2e8; color: #171b25; }
      main { max-width: 760px; margin: 0 auto; padding: 48px 20px; }
      h1 { margin: 0 0 12px; font-size: 2rem; line-height: 1.2; }
      p { margin: 0 0 14px; line-height: 1.6; }
      a { color: #b43c2f; text-decoration: none; font-weight: 600; }
      a:hover { text-decoration: underline; }
      .box { border: 1px solid rgba(134, 106, 73, 0.28); background: rgba(255, 255, 255, 0.76); border-radius: 16px; padding: 22px; }
    </style>
  </head>
  <body>
    <main>
      <div class="box">
        <h1>Page not found</h1>
        <p>The URL may be outdated, misspelled, or removed.</p>
        <p>Start from <a href="/en">the English homepage</a> or choose another language:</p>
        <p><a href="/zh">中文</a> · <a href="/ja">日本語</a> · <a href="/ko">한국어</a></p>
      </div>
    </main>
  </body>
</html>
`
}

async function main() {
  const localeMap = {}
  for (const lang of LANGUAGES) {
    localeMap[lang.i18nCode] = await readJson(LOCALE_FILES[lang.i18nCode])
  }

  if (PRERENDER_LANDING_PAGES) {
    for (const lang of LANGUAGES) {
      const locale = localeMap[lang.i18nCode]
      const html = renderLandingPage(lang, locale)
      await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/index.html`), html)
    }
  }

  for (const lang of LANGUAGES) {
    const locale = localeMap[lang.i18nCode]
    await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/about/index.html`), renderAboutPage(lang, locale))
    await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/contact/index.html`), renderContactPage(lang, locale))
    await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/privacy-policy/index.html`), renderPrivacyPolicyPage(lang, locale))
  }

  for (const lang of LANGUAGES) {
    const locale = localeMap[lang.i18nCode]
    await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/guides/index.html`), renderGuideHub(lang, locale))
    for (const guide of GUIDE_PAGES) {
      const html = renderGuideDetail(lang, locale, guide)
      await writeText(path.join(PUBLIC_DIR, `${lang.urlCode}/guides/${guide.slug}/index.html`), html)
    }
  }

  await writeText(path.join(PUBLIC_DIR, 'en/guides/ctr-title-variants.json'), buildCtrTitleVariantsManifest())
  await writeText(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap())
  await writeText(path.join(PUBLIC_DIR, '404.html'), renderNotFoundPage())
}

await main()
