import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = resolve(ROOT, 'out')

function fail(message) {
  console.error(`[seo-validate] ${message}`)
  process.exit(1)
}

function assert(condition, message) {
  if (!condition) fail(message)
}

function readOutFile(relativePath) {
  const fullPath = resolve(OUT_DIR, relativePath)
  if (!existsSync(fullPath)) fail(`Missing output file: ${relativePath}`)
  return readFileSync(fullPath, 'utf8')
}

function extractMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`<meta\\s+name="${escaped}"\\s+content="([^"]*)"\\s*/?>`, 'i')
  return html.match(regex)?.[1] ?? ''
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i)
  return match?.[1] ?? ''
}

function assertRobotsAndCanonical(relativePath, expectedRobots, expectedCanonical) {
  const html = readOutFile(relativePath)
  const robots = extractMeta(html, 'robots')
  const canonical = extractCanonical(html)
  assert(
    robots === expectedRobots,
    `${relativePath} robots mismatch: expected "${expectedRobots}" but got "${robots}"`
  )
  assert(
    canonical === expectedCanonical,
    `${relativePath} canonical mismatch: expected "${expectedCanonical}" but got "${canonical}"`
  )
  return html
}

function extractHreflangs(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? []
  const links = []
  for (const tag of tags) {
    if (!/\brel="alternate"/i.test(tag)) continue
    const lang = tag.match(/\bhreflang="([^"]+)"/i)?.[1]
    const href = tag.match(/\bhref="([^"]+)"/i)?.[1]
    if (lang && href) links.push({ lang, href })
  }
  return links
}

assert(existsSync(OUT_DIR), 'Missing out/ directory. Run build first.')

const checks = [
  ['en/index.html', 'index, follow', 'https://bestcityinchina.site/en/'],
  ['zh/index.html', 'index, follow', 'https://bestcityinchina.site/zh/'],
  ['ja/index.html', 'index, follow', 'https://bestcityinchina.site/ja/'],
  ['ko/index.html', 'index, follow', 'https://bestcityinchina.site/ko/'],
  ['en/about/index.html', 'index, follow', 'https://bestcityinchina.site/en/about/'],
  ['en/guides/index.html', 'index, follow', 'https://bestcityinchina.site/en/guides/'],
  [
    'en/guides/best-city-to-visit-in-china-first-time/index.html',
    'index, follow',
    'https://bestcityinchina.site/en/guides/best-city-to-visit-in-china-first-time/',
  ],
  ['en/terms/index.html', 'index, follow', 'https://bestcityinchina.site/en/terms/'],
  ['zh/about/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/about/'],
  ['zh/terms/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/terms/'],
  ['ja/guides/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/guides/'],
  ['ja/privacy-policy/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/privacy-policy/'],
  [
    'ko/guides/best-city-to-visit-in-china-first-time/index.html',
    'noindex, follow',
    'https://bestcityinchina.site/en/guides/best-city-to-visit-in-china-first-time/',
  ],
  ['ko/editorial-policy/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/editorial-policy/'],
  ['ko/contact/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/contact/'],
  ['zh/content-updates/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/content-updates/'],
]

for (const [path, robots, canonical] of checks) {
  assertRobotsAndCanonical(path, robots, canonical)
}

const homepageHreflang = extractHreflangs(readOutFile('en/index.html'))
const homepageLangs = homepageHreflang.map((link) => link.lang).sort()
assert(
  homepageLangs.join(',') === ['en', 'ja', 'ko', 'x-default', 'zh-CN'].join(','),
  `en homepage hreflang mismatch: ${homepageLangs.join(',')}`
)
assert(
  homepageHreflang.every((link) => /\/(en|zh|ja|ko)\/$/.test(link.href)),
  'en homepage hreflang points outside translated homepages'
)

const zhHomeHreflang = extractHreflangs(readOutFile('zh/index.html')).map((link) => link.href)
assert(
  zhHomeHreflang.includes('https://bestcityinchina.site/en/') &&
    zhHomeHreflang.includes('https://bestcityinchina.site/ja/'),
  'zh homepage hreflang is missing indexable alternates'
)

const guideHtml = readOutFile('en/guides/best-city-to-visit-in-china-first-time/index.html')
const guideHreflang = extractHreflangs(guideHtml)
assert(
  guideHreflang.length === 0,
  `English guide should not hreflang to noindexed locales, found ${JSON.stringify(guideHreflang)}`
)

const zhGuideHreflang = extractHreflangs(
  readOutFile('zh/guides/best-city-to-visit-in-china-first-time/index.html')
)
assert(zhGuideHreflang.length === 0, 'noindexed zh guide should not emit hreflang alternates')

const quizHreflang = extractHreflangs(readOutFile('en/quiz/index.html'))
assert(quizHreflang.length === 0, 'noindexed quiz pages should not emit hreflang alternates')

const enTerms = readOutFile('en/terms/index.html')
assert(enTerms.includes('Terms of Service'), 'English terms page is missing its heading')
assert(enTerms.includes('/en/privacy-policy/'), 'English terms page should link to the privacy policy')
assert(enTerms.includes('>Terms<') || enTerms.includes('Terms</a>'), 'English terms page footer should link terms')

const sitemap = readOutFile('sitemap.xml')
const requiredSitemapUrls = [
  'https://bestcityinchina.site/en/',
  'https://bestcityinchina.site/zh/',
  'https://bestcityinchina.site/ja/',
  'https://bestcityinchina.site/ko/',
  'https://bestcityinchina.site/en/terms/',
  'https://bestcityinchina.site/en/privacy-policy/',
  'https://bestcityinchina.site/en/guides/',
  'https://bestcityinchina.site/en/guides/best-city-to-visit-in-china-first-time/',
]
for (const url of requiredSitemapUrls) {
  assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap missing ${url}`)
}

const forbiddenSitemapSnippets = [
  'https://bestcityinchina.site/zh/guides/',
  'https://bestcityinchina.site/ja/about/',
  'https://bestcityinchina.site/ko/terms/',
  'https://bestcityinchina.site/zh/privacy-policy/',
  'https://bestcityinchina.site/ja/guides/best-city-to-visit-in-china-first-time/',
  'https://bestcityinchina.site/zh/terms/',
]
for (const url of forbiddenSitemapSnippets) {
  assert(!sitemap.includes(url), `sitemap lists noindexed URL ${url}`)
}

assert(
  !sitemap.includes('hreflang="zh-CN" href="https://bestcityinchina.site/zh/guides/'),
  'sitemap hreflang points at a noindexed guide'
)
assert(
  sitemap.includes('hreflang="zh-CN" href="https://bestcityinchina.site/zh/"'),
  'sitemap homepage alternates should include the translated Chinese homepage'
)

console.log(`[seo-validate] Passed ${checks.length} output checks plus hreflang and sitemap rules.`)
