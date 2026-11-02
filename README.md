# Which Chinese City Matches Your Vibe?

> A travel personality quiz that matches visitors to their ideal Chinese city — built for foreign travelers who want to visit China but don't know where to start.

**Live site:** [bestcityinchina.site](https://bestcityinchina.site)

---

## What It Does

Users answer 18 questions about their travel style and preferences, then receive a personalized Chinese city recommendation (1 best match + 2 alternatives) with budget and timing tips.

Cities covered: Shanghai, Beijing, Xi'an, Chengdu, Guilin, Dali, Xiamen, Zhangjiajie, Harbin, Hangzhou, and more.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org/) (App Router, `output: 'export'`) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) — EN, ZH, JA, KO |
| Styling | Tailwind CSS |
| Deployment | Cloudflare Pages |
| Language | TypeScript |
| Tests | Vitest |

---

## Project Structure

```
app/
  [lang]/
    page.tsx          # Home / quiz entry
    quiz/             # Quiz flow
    result/           # City match result page
    guides/           # SEO travel guides
    about/
    contact/
    privacy-policy/
    editorial-policy/
    content-updates/
  robots.ts
  sitemap.ts
content/
  guides/             # Guide copy (index.ts)
  pages/              # Page SEO copy
lib/
  seo.ts              # SEO utilities (buildNextAlternates, SITE_URL, etc.)
public/
  _redirects          # Cloudflare Pages redirects
  _headers            # Cloudflare Pages headers (noindex for quiz/result)
i18n/                 # Locale configs
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Static output goes to `out/`.

### Preview (Cloudflare Pages local)

```bash
npm run preview
```

### Lint & Test

```bash
npm run lint
npm test
```

---

## i18n

Pages are served under `/{lang}/` (e.g., `/en/`, `/zh/`, `/ja/`, `/ko/`).

- Homepages are indexed in en, zh, ja, and ko (body copy is translated)
- Guide and legal pages are indexed in English only. zh/ja/ko copies of those pages use `noindex, follow` and canonical to the English URL, because the article body is still English
- Sitemap lists only indexable URLs. hreflang is emitted only when more than one locale of that URL is indexable

---

## Deployment

The site deploys automatically to **Cloudflare Pages** on push to `main`.

- Static export (`next build` → `out/`)
- Trailing slashes enabled (`trailingSlash: true`)
- www → non-www redirect configured in Cloudflare dashboard (Custom Domains)
- `public/_redirects` handles path-level redirects
- `public/_headers` sets cache and robots headers per route

---

## SEO Notes

- Canonical URLs always include a trailing slash
- `hreflang` alternates are limited to indexable locales of the same page (all four on the homepage; English only is omitted rather than pointing at noindexed URLs)
- OG images served from `/og-image.svg`
- Guides are the primary indexable content beyond the homepage

---

## License

[MIT](LICENSE)
