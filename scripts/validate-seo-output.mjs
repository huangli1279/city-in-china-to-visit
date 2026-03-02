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
}

assert(existsSync(OUT_DIR), 'Missing out/ directory. Run build first.')

const checks = [
  ['en/index.html', 'index, follow', 'https://bestcityinchina.site/en/'],
  ['en/about/index.html', 'index, follow', 'https://bestcityinchina.site/en/about/'],
  ['en/guides/index.html', 'index, follow', 'https://bestcityinchina.site/en/guides/'],
  [
    'en/guides/best-city-to-visit-in-china-first-time/index.html',
    'index, follow',
    'https://bestcityinchina.site/en/guides/best-city-to-visit-in-china-first-time/',
  ],
  ['zh/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/'],
  ['ja/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/'],
  ['ko/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/'],
  ['zh/about/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/about/'],
  ['ja/guides/index.html', 'noindex, follow', 'https://bestcityinchina.site/en/guides/'],
  [
    'ko/guides/best-city-to-visit-in-china-first-time/index.html',
    'noindex, follow',
    'https://bestcityinchina.site/en/guides/best-city-to-visit-in-china-first-time/',
  ],
]

for (const [path, robots, canonical] of checks) {
  assertRobotsAndCanonical(path, robots, canonical)
}

console.log(`[seo-validate] Passed ${checks.length} output checks.`)
