# Vite React SPA → Next.js (SSR + SSG) 迁移方案

## 1. 项目现状概览

| 维度 | 当前状态 |
|---|---|
| 框架 | Vite 5 + React 18 + React Router 6 |
| 渲染模式 | 纯客户端 SPA，`public/` 下放置预渲染 HTML 用于 SEO |
| 国际化 | i18next + react-i18next，4 种语言（en/zh/ja/ko），URL 路径前缀路由 |
| 样式 | Tailwind CSS 3 + PostCSS + 自定义 CSS 变量 |
| 内容页 | 由 `scripts/generate-prerender-pages.mjs`（2689 行）生成 56+ 个静态 HTML |
| 部署 | Cloudflare Pages（`_headers` + `_redirects`） |
| 数据 | 全静态，无后端 API，24 座城市 + 18 道题 + 4 语言翻译 JSON |
| SEO | 手工维护的结构化数据、hreflang、OG 标签、sitemap.xml |
| 分析/广告 | Google Analytics 4 + Google AdSense |

### 当前文件结构（核心）

```
src/
├── main.tsx                    # 入口，初始化 i18n 后挂载
├── App.tsx                     # BrowserRouter + 懒加载路由
├── i18n.ts                     # i18next 配置，动态 import 翻译
├── index.css                   # Tailwind 入口
├── components/
│   ├── LangLayout.tsx          # /:lang 路由 wrapper
│   ├── LanguageSwitcher.tsx    # 语言切换
│   ├── Seo.tsx                 # 动态 meta 标签（DOM 操作）
│   └── ProgressBar.tsx         # 进度条
├── pages/
│   ├── HomePage.tsx            # 首页（432 行）
│   ├── QuizPage.tsx            # 测试页（202 行）
│   ├── ResultPage.tsx          # 结果页（267 行）
│   └── NotFoundPage.tsx        # 404
├── data/
│   ├── cities.ts               # 24 城市 6 维度画像
│   └── questions.ts            # 18 道测试题
├── utils/
│   ├── match.ts                # L1 距离匹配算法
│   ├── match.test.ts           # 单元测试
│   └── analytics.ts            # GA4 事件追踪
├── seo/
│   └── config.ts               # hreflang/OG 辅助函数
└── locales/
    ├── en/   (common.json, questions.json, cities.json)
    ├── zh-CN/
    ├── ja/
    └── ko/
```

---

## 2. 迁移目标

1. **消除预渲染脚本**：删除 `generate-prerender-pages.mjs` 和 `public/` 下所有生成的 HTML，由 Next.js 的 SSG/SSR 原生处理
2. **SEO 原生化**：利用 Next.js Metadata API 替代手动 DOM 操作 `Seo.tsx`
3. **保持当前 URL 结构不变**：`/{lang}/`、`/{lang}/quiz`、`/{lang}/result`、`/{lang}/guides/{slug}/`、`/{lang}/about/` 等
4. **保持当前 UI/UX 完全不变**：样式、交互、动画零回归
5. **部署兼容**：继续部署到 Cloudflare Pages（使用 `@cloudflare/next-on-pages`）
6. **保留现有测试**：Vitest 单元测试继续可用

---

## 3. 渲染策略规划

| 页面 | 渲染模式 | 理由 |
|---|---|---|
| `/{lang}/` 首页 | **SSG** + `generateStaticParams` | 纯静态内容，4 语言预渲染 |
| `/{lang}/guides/` 列表页 | **SSG** | 纯静态 |
| `/{lang}/guides/{slug}/` 文章页 | **SSG** | 纯静态内容，所有 slug 已知 |
| `/{lang}/about/` 等法务页 | **SSG** | 纯静态 |
| `/{lang}/quiz` | **SSR**（轻量 shell）+ **客户端交互** | 页面 shell 服务端渲染（SEO noindex），交互逻辑 `'use client'` |
| `/{lang}/result` | **SSR**（轻量 shell）+ **客户端交互** | 同上，接收 quiz state，noindex |
| `/404` | **SSG** | Next.js `not-found.tsx` |

---

## 4. Next.js 目录结构设计（App Router）

```
app/
├── layout.tsx                          # 根 layout：html/body、全局 CSS、GA/AdSense script
├── not-found.tsx                       # 404 页面
├── page.tsx                            # / 根路径 → redirect 到 /en/
├── [lang]/
│   ├── layout.tsx                      # 语言 layout：校验 lang、设置 html lang、i18n provider
│   ├── page.tsx                        # /{lang}/ 首页（SSG）
│   ├── quiz/
│   │   └── page.tsx                    # /{lang}/quiz（'use client'）
│   ├── result/
│   │   └── page.tsx                    # /{lang}/result（'use client'）
│   ├── about/
│   │   └── page.tsx                    # /{lang}/about/（SSG）
│   ├── contact/
│   │   └── page.tsx                    # /{lang}/contact/（SSG）
│   ├── privacy-policy/
│   │   └── page.tsx                    # /{lang}/privacy-policy/（SSG）
│   ├── editorial-policy/
│   │   └── page.tsx                    # /{lang}/editorial-policy/（SSG）
│   ├── content-updates/
│   │   └── page.tsx                    # /{lang}/content-updates/（SSG）
│   └── guides/
│       ├── page.tsx                    # /{lang}/guides/（SSG）
│       └── [slug]/
│           └── page.tsx               # /{lang}/guides/{slug}/（SSG）
├── globals.css                         # Tailwind 入口
└── sitemap.ts                          # 动态生成 sitemap.xml
```

```
lib/                                    # 共享逻辑（不在 app/ 内）
├── i18n.ts                             # 服务端 i18n（直接 import JSON，无 i18next 运行时）
├── i18n-client.ts                      # 客户端 i18n provider（quiz/result 需要）
├── cities.ts                           # 城市数据（从 src/data 迁移）
├── questions.ts                        # 题目数据（从 src/data 迁移）
├── match.ts                            # 匹配算法（从 src/utils 迁移）
├── analytics.ts                        # GA4 事件（从 src/utils 迁移）
├── seo.ts                              # hreflang/OG 辅助函数（从 src/seo 迁移）
└── constants.ts                        # 站点 URL、语言列表等常量

content/                                # 内容数据（从 generate-prerender-pages.mjs 提取）
├── guides/                             # Guide 内容 JSON/TS 文件
│   ├── best-city-to-visit-in-china-first-time.ts
│   ├── beijing-vs-shanghai-for-first-trip.ts
│   ├── best-china-cities-by-travel-style.ts
│   ├── how-many-days-in-first-china-city.ts
│   ├── beijing-shanghai-chengdu-first-trip-comparison.ts
│   ├── china-first-trip-budget-by-city.ts
│   ├── best-time-to-visit-china-first-trip.ts
│   └── china-visa-payment-checklist-first-timers.ts
├── pages/                              # 法务页内容（about/contact/privacy 等）
│   └── seo-copy.ts                     # 4 语言 SEO 文案
└── locales/                            # 翻译文件（从 src/locales 迁移）
    ├── en/ (common.json, questions.json, cities.json)
    ├── zh-CN/
    ├── ja/
    └── ko/

components/                             # UI 组件
├── LanguageSwitcher.tsx                # 客户端组件（'use client'）
├── ProgressBar.tsx                     # 客户端组件
├── QuizClient.tsx                      # quiz 交互逻辑（'use client'）
├── ResultClient.tsx                    # result 交互逻辑（'use client'）
└── HomepageClient.tsx                  # 首页交互部分（goToQuiz 等 onClick）
```

---

## 5. 分阶段执行计划

### Phase 0：准备工作（预计工作量：小）

**目标**：建立 Next.js 项目骨架，确保新旧代码可并行

- [ ] 0.1 在当前仓库新建分支 `feat/nextjs-migration`
- [ ] 0.2 安装 Next.js 依赖
  ```bash
  npm install next@latest
  npm install -D @cloudflare/next-on-pages
  ```
- [ ] 0.3 移除不再需要的依赖
  ```bash
  npm uninstall react-router-dom i18next-browser-languagedetector
  ```
  > 注意：`i18next` 和 `react-i18next` 保留，quiz/result 客户端组件仍需使用
- [ ] 0.4 更新 `package.json` scripts
  ```json
  {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "preview": "npx @cloudflare/next-on-pages && npx wrangler pages dev .vercel/output/static",
    "test": "vitest run"
  }
  ```
  删除 `"generate:prerender"` 和 `"prebuild"`
- [ ] 0.5 创建 `next.config.mjs`
  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    trailingSlash: true,  // 保持现有 URL 尾部斜杠行为
    output: 'export',     // 如果纯 SSG；或去掉此行如果需要 SSR
    // 如果部署到 Cloudflare Pages 并且需要 SSR：
    // 不设置 output，使用 @cloudflare/next-on-pages
  }
  export default nextConfig
  ```
- [ ] 0.6 创建 `app/` 目录和根 `layout.tsx`
- [ ] 0.7 将 Tailwind 配置的 `content` 路径更新为匹配 `app/`、`components/`、`lib/` 目录
- [ ] 0.8 将 `postcss.config.js` 保持不变（Next.js 兼容）

---

### Phase 1：核心迁移——布局和静态页面（预计工作量：中）

**目标**：根 layout、语言 layout、首页、法务页全部以 SSG 运行

#### 1.1 根 Layout（`app/layout.tsx`）

将 `index.html` 的 `<head>` 内容迁移到此处：

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bestcityinchina.site'),
  icons: { icon: '/logo.svg', apple: '/logo.svg' },
  other: { 'google-adsense-account': 'ca-pub-8272386212758068' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8272386212758068"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZTZTZ5TQMR" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-ZTZTZ5TQMR');`}
        </Script>
      </head>
      <body>
        <div className="min-h-dvh">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10 xl:px-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
```

#### 1.2 语言 Layout（`app/[lang]/layout.tsx`）

替代现有 `LangLayout.tsx` 的语言校验逻辑：

```tsx
// app/[lang]/layout.tsx
import { notFound } from 'next/navigation'

const VALID_LANGS = ['en', 'zh', 'ja', 'ko'] as const
type Lang = (typeof VALID_LANGS)[number]

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }))
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!VALID_LANGS.includes(params.lang as Lang)) notFound()

  const htmlLang = params.lang === 'zh' ? 'zh-CN' : params.lang
  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  )
}
```

> **注意**：`<html>` 标签只应出现在一处。实际实现中，语言 layout 应通过其他方式（如 `useEffect` 或在根 layout 中根据 `params.lang` 设置）来设置 `lang` 属性，而非嵌套 `<html>`。具体方案见 Phase 1.7。

#### 1.3 根页面重定向（`app/page.tsx`）

```tsx
import { redirect } from 'next/navigation'
export default function RootPage() {
  redirect('/en/')
}
```

#### 1.4 首页 SSG（`app/[lang]/page.tsx`）

- 将 `HomePage.tsx` 拆分为**服务端部分**和**客户端交互部分**
- 服务端部分：直接 `import` 翻译 JSON，输出静态 HTML + Metadata
- 客户端部分：`goToQuiz()` 等需要 `onClick` 的交互提取到 `'use client'` 组件

```tsx
// app/[lang]/page.tsx
import type { Metadata } from 'next'
import { getTranslation } from '@/lib/i18n'
import { buildAlternates, buildOgLocale } from '@/lib/seo'
import HomepageClient from '@/components/HomepageClient'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = await getTranslation(params.lang, 'common')
  return {
    title: t('home.seo.title'),
    description: t('home.seo.description'),
    alternates: {
      canonical: `/${params.lang}/`,
      languages: buildAlternates(),  // 转换为 Next.js 格式
    },
    openGraph: {
      locale: buildOgLocale(params.lang),
      // ...
    },
  }
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const t = await getTranslation(params.lang, 'common')
  const citiesT = await getTranslation(params.lang, 'cities')
  // 从 JSON 取翻译，渲染静态 HTML
  // 交互部分用 <HomepageClient lang={params.lang} /> 包裹
  return <HomepageClient lang={params.lang} translations={...} />
}
```

#### 1.5 法务页面 SSG（about/contact/privacy-policy/editorial-policy/content-updates）

- 从 `generate-prerender-pages.mjs` 提取各页面内容到 `content/pages/` 下的 TypeScript 文件
- 每个页面路由用 `generateStaticParams` 生成 4 种语言
- 使用 `generateMetadata` 输出完整 SEO 元数据

#### 1.6 Guide 页面 SSG（`app/[lang]/guides/[slug]/page.tsx`）

- 从 `generate-prerender-pages.mjs` 提取 `GUIDE_PAGES` 数组到 `content/guides/` 下
- `generateStaticParams` 返回所有 `{ lang, slug }` 组合
- 每篇 guide 的内容（sections、FAQ、sources、internalLinks）直接作为数据渲染
- JSON-LD 结构化数据通过 Next.js Metadata API 或 `<script type="application/ld+json">` 在组件中输出

#### 1.7 `html lang` 属性处理

Next.js App Router 的 `<html>` 标签定义在根 layout 中。处理多语言 `lang` 属性的方案：

**方案 A**（推荐）：在根 `layout.tsx` 中接收 `params`，动态设置 `lang`：
```tsx
// app/layout.tsx — 但根 layout 不能直接拿到 [lang]
// 所以需要通过中间件在 headers 中传递 lang
```

**方案 B**：使用 `next/navigation` 的 middleware 在请求层设置 lang，或在 `app/[lang]/layout.tsx` 中覆盖 `<html lang>`。Next.js 14+ 允许在嵌套 layout 中通过 metadata 设置 `lang`。

**最终实现**：使用 Next.js `middleware.ts` 来处理语言检测和重定向，在 `app/[lang]/layout.tsx` 中 override html lang 属性。

---

### Phase 2：客户端交互页面迁移（预计工作量：中）

**目标**：Quiz 和 Result 页面作为 `'use client'` 组件运行，保持完整交互

#### 2.1 Quiz 页面

```
app/[lang]/quiz/page.tsx          # 服务端 shell：metadata（noindex）+ 加载 client 组件
components/QuizClient.tsx         # 'use client'：完整 quiz 交互逻辑
```

- `page.tsx`（服务端）：
  - `generateMetadata` 设置 `robots: 'noindex, follow'`
  - 渲染 `<QuizClient lang={lang} />`
- `QuizClient.tsx`（客户端）：
  - 基本上是现有 `QuizPage.tsx` 的直接迁移
  - 使用 `react-i18next` 的 `useTranslation`（客户端 i18n）
  - 导航改为 `useRouter().push()` 替代 `useNavigate()`
  - 答题数据传递给 result 页面使用 **URL searchParams** 或 **sessionStorage** 替代 React Router 的 `location.state`

#### 2.2 Result 页面

```
app/[lang]/result/page.tsx        # 服务端 shell：metadata（noindex）
components/ResultClient.tsx       # 'use client'：匹配结果展示
```

- 现有方案依赖 `useLocation().state` 传递 quiz 结果
- **迁移方案**：将用户答案序列化到 URL searchParams（如 `?a=0,2,1,3,...`）或使用 `sessionStorage`
  - searchParams 方案更好：URL 可分享、无状态丢失问题
  - 对 18 题 × 4 选项，序列化为紧凑字符串（如 `?a=02130213021302130213`，每个字符代表一题的选项索引）
  - Result 页面从 searchParams 解析答案，调用 `calcUserScores` + `getRankedCities` 实时计算

#### 2.3 客户端 i18n 方案

Quiz 和 Result 页面需要客户端翻译（用户交互时动态显示问题文本、城市名称等）：

```tsx
// lib/i18n-client.ts
'use client'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

// 保持现有 i18n.ts 的 RESOURCE_LOADERS 逻辑
// 在客户端组件中用 <I18nextProvider> 包裹
```

静态页面（首页、guides、法务页）**不需要**客户端 i18n——直接在服务端读取 JSON。

---

### Phase 3：i18n 服务端实现（预计工作量：小）

**目标**：为 SSG 页面提供服务端翻译函数

```tsx
// lib/i18n.ts
import enCommon from '@/content/locales/en/common.json'
import zhCommon from '@/content/locales/zh-CN/common.json'
import jaCommon from '@/content/locales/ja/common.json'
import koCommon from '@/content/locales/ko/common.json'
// ... 同理 questions.json, cities.json

const resources = {
  en: { common: enCommon, questions: enQuestions, cities: enCities },
  'zh-CN': { common: zhCommon, questions: zhQuestions, cities: zhCities },
  ja: { common: jaCommon, questions: jaQuestions, cities: jaCities },
  ko: { common: koCommon, questions: koQuestions, cities: koCities },
}

const URL_LANG_MAP: Record<string, string> = {
  en: 'en', zh: 'zh-CN', ja: 'ja', ko: 'ko',
}

export async function getTranslation(urlLang: string, namespace: string) {
  const i18nLang = URL_LANG_MAP[urlLang] ?? 'en'
  const data = resources[i18nLang]?.[namespace] ?? resources.en[namespace]

  // 返回嵌套键查找函数
  return function t(key: string, options?: { returnObjects?: boolean }) {
    // 按 dot-path 查找
    const value = key.split('.').reduce((obj, k) => obj?.[k], data)
    return value ?? key
  }
}
```

这样 SSG 页面可以在构建时直接读取翻译，无需 i18next 运行时。

---

### Phase 4：内容数据提取（预计工作量：中）

**目标**：从 `generate-prerender-pages.mjs` 提取结构化内容到 TypeScript 文件

#### 4.1 Guide 内容

将脚本中的 `GUIDE_PAGES` 数组（8 篇文章）提取为独立文件：

```tsx
// content/guides/best-city-to-visit-in-china-first-time.ts
export const guide = {
  slug: 'best-city-to-visit-in-china-first-time',
  title: { A: '...', B: '...' },
  description: '...',
  intro: '...',
  keyPoints: ['...', '...', '...'],
  sections: [{ heading: '...', paragraphs: ['...'] }],
  faq: { question: '...', answer: '...' },
  internalLinks: [{ slug: '...', anchor: '...' }],
  updateSummary: ['...'],
  sources: [{ name: '...', url: '...', note: '...' }],
  reviewer: '...',
}
```

提供统一索引：

```tsx
// content/guides/index.ts
export { guide as bestCity } from './best-city-to-visit-in-china-first-time'
export { guide as bjVsSh } from './beijing-vs-shanghai-for-first-trip'
// ... 其他 7 篇
export const ALL_GUIDES = [bestCity, bjVsSh, ...]
```

#### 4.2 法务页内容

将脚本中 `PAGE_SEO_COPY`（4 语言的 title/description）和各页面的 HTML body 内容提取到：

```tsx
// content/pages/about.ts
export const aboutPage = {
  seo: {
    en: { title: '...', description: '...' },
    zh: { ... }, ja: { ... }, ko: { ... },
  },
  // 页面正文内容按结构化格式存储
  body: { ... }
}
```

#### 4.3 多语言 Guide SEO 文案

将脚本中每篇 guide 的 4 语言 `title`/`description` 翻译提取到对应的 guide 文件或单独的 SEO 文案文件中。

---

### Phase 5：SEO 和元数据迁移（预计工作量：中）

**目标**：用 Next.js Metadata API 完全替代手动 `Seo.tsx`

#### 5.1 删除 `Seo.tsx`

现有 `Seo.tsx` 通过 `document.head` DOM 操作注入 meta 标签。Next.js 的 `generateMetadata` 在服务端完成同样的事情，且对爬虫更友好。

#### 5.2 每个页面的 `generateMetadata`

统一模式：

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params
  return {
    title: '...',
    description: '...',
    robots: 'index, follow',  // 或 quiz/result 用 'noindex, follow'
    alternates: {
      canonical: `https://bestcityinchina.site/${lang}/...`,
      languages: {
        en: 'https://bestcityinchina.site/en/...',
        'zh-CN': 'https://bestcityinchina.site/zh/...',
        ja: 'https://bestcityinchina.site/ja/...',
        ko: 'https://bestcityinchina.site/ko/...',
        'x-default': 'https://bestcityinchina.site/en/...',
      },
    },
    openGraph: {
      title: '...',
      description: '...',
      url: `https://bestcityinchina.site/${lang}/...`,
      locale: buildOgLocale(lang),
      alternateLocale: buildOgLocaleAlternates(lang),
      images: [{ url: 'https://bestcityinchina.site/og-image.svg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: '...',
      description: '...',
      images: ['https://bestcityinchina.site/og-image.svg'],
    },
  }
}
```

#### 5.3 JSON-LD 结构化数据

在各页面组件内以 `<script type="application/ld+json">` 方式输出：

```tsx
export default function GuidePage({ params }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', ... }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* 页面内容 */}
    </>
  )
}
```

#### 5.4 Sitemap

使用 Next.js 的 `app/sitemap.ts` 动态生成：

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { ALL_GUIDES } from '@/content/guides'

const LANGS = ['en', 'zh', 'ja', 'ko']
const SITE = 'https://bestcityinchina.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = []
  for (const lang of LANGS) {
    pages.push({ url: `${SITE}/${lang}/`, changeFrequency: 'weekly', priority: 1.0 })
    pages.push({ url: `${SITE}/${lang}/guides/`, changeFrequency: 'weekly', priority: 0.8 })
    for (const guide of ALL_GUIDES) {
      pages.push({ url: `${SITE}/${lang}/guides/${guide.slug}/`, changeFrequency: 'monthly', priority: 0.7 })
    }
    // ... 法务页
  }
  return pages
}
```

删除手写的 `public/sitemap.xml`。

#### 5.5 robots.txt

使用 `app/robots.ts`：

```tsx
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://bestcityinchina.site/sitemap.xml',
  }
}
```

---

### Phase 6：部署配置迁移（预计工作量：小）

#### 6.1 Cloudflare Pages 适配

两种路径选择：

| 方案 | 说明 | 适用场景 |
|---|---|---|
| **A: `output: 'export'` 纯静态导出** | Next.js 输出纯静态 HTML，和现在一样部署为静态站 | 不需要 SSR 的场景 |
| **B: `@cloudflare/next-on-pages`** | Next.js 运行在 Cloudflare Workers 上，支持 SSR | 需要 SSR 的场景（如 quiz/result）|

**推荐方案 A**（纯静态导出）：
- 当前 quiz 和 result 页面不需要真正的 SSR（它们是 noindex 的、客户端交互的）
- 使用 `output: 'export'` 可以完全避免 SSR 运行时依赖
- 部署方式和现在一致：静态文件 → Cloudflare Pages

如果未来需要 SSR（如用户评论、动态内容），再切换到方案 B。

#### 6.2 安全头迁移

将 `public/_headers` 迁移到 `next.config.mjs` 的 `headers()`：

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // ... CSP、Permissions-Policy
        ],
      },
    ]
  },
}
```

> **注意**：`output: 'export'` 模式下 `headers()` 不生效（因为没有 Node 服务器）。此时继续使用 Cloudflare Pages 的 `public/_headers` 文件。

#### 6.3 重定向迁移

- `_redirects` 中的大部分规则在 Next.js 路由下不再需要（框架自动处理）
- quiz/result 的 trailing slash 301 通过 `trailingSlash: false` 配置处理
- sitemap 别名重定向迁移到 `next.config.mjs` 的 `redirects()`
- 如果使用 `output: 'export'`，则保留 `public/_redirects` 供 Cloudflare Pages 使用

---

### Phase 7：清理和验证（预计工作量：小）

- [ ] 7.1 删除 `scripts/generate-prerender-pages.mjs`
- [ ] 7.2 删除 `public/` 下所有生成的 HTML 文件（保留静态资源：logo.svg、og-image.svg、fonts/、styles/、robots.txt、ads.txt、_headers、_redirects）
- [ ] 7.3 删除 `src/` 目录（所有代码已迁移到 `app/`、`lib/`、`components/`、`content/`）
- [ ] 7.4 删除 `index.html`（Vite 入口，Next.js 不需要）
- [ ] 7.5 删除 `vite.config.ts`（或保留给 vitest 使用，如果 vitest 需要独立配置）
- [ ] 7.6 更新 `.gitignore`：添加 `.next/`、`out/`
- [ ] 7.7 更新 `tsconfig.json` 为 Next.js 标准配置
- [ ] 7.8 确认 Vitest 单元测试仍然通过（`match.test.ts`）
- [ ] 7.9 全页面 SEO 回归检查（逐页核对 title、description、hreflang、OG、JSON-LD）
- [ ] 7.10 全页面 UI 回归检查（逐页截图对比）
- [ ] 7.11 Lighthouse 跑分对比（迁移前后）
- [ ] 7.12 部署到 Cloudflare Pages 并验证线上行为

---

## 6. 关键迁移映射表

| 原文件 | 迁移目标 | 说明 |
|---|---|---|
| `index.html` | `app/layout.tsx` | GA、AdSense、viewport 等移到根 layout |
| `src/main.tsx` | 删除 | Next.js 不需要手动挂载入口 |
| `src/App.tsx` | `app/[lang]/layout.tsx` + 各页面路由 | 路由由文件系统处理 |
| `src/i18n.ts` | `lib/i18n.ts`（服务端）+ `lib/i18n-client.ts`（客户端） | 拆分为两套 |
| `src/components/LangLayout.tsx` | `app/[lang]/layout.tsx` | 语言校验由 layout 处理 |
| `src/components/Seo.tsx` | `generateMetadata()` | 彻底删除，用 Next.js 原生 API |
| `src/components/LanguageSwitcher.tsx` | `components/LanguageSwitcher.tsx` | 标记 `'use client'`，导航改为 `useRouter` |
| `src/components/ProgressBar.tsx` | `components/ProgressBar.tsx` | 标记 `'use client'`，无其他改动 |
| `src/pages/HomePage.tsx` | `app/[lang]/page.tsx` + `components/HomepageClient.tsx` | 拆分服务端/客户端 |
| `src/pages/QuizPage.tsx` | `app/[lang]/quiz/page.tsx` + `components/QuizClient.tsx` | quiz shell + 客户端组件 |
| `src/pages/ResultPage.tsx` | `app/[lang]/result/page.tsx` + `components/ResultClient.tsx` | result shell + 客户端组件 |
| `src/pages/NotFoundPage.tsx` | `app/not-found.tsx` | Next.js 约定 |
| `src/data/cities.ts` | `lib/cities.ts` | 直接迁移 |
| `src/data/questions.ts` | `lib/questions.ts` | 直接迁移 |
| `src/utils/match.ts` | `lib/match.ts` | 直接迁移 |
| `src/utils/match.test.ts` | `lib/match.test.ts` | 更新 import 路径 |
| `src/utils/analytics.ts` | `lib/analytics.ts` | 直接迁移，保持 `'use client'` |
| `src/seo/config.ts` | `lib/seo.ts` | 移除 `import.meta.env` 依赖，改为 `process.env` |
| `src/locales/**` | `content/locales/**` | 直接移动 |
| `scripts/generate-prerender-pages.mjs` | 删除 | 内容提取到 `content/` 后不再需要 |
| `public/{lang}/**/*.html` | 删除 | Next.js SSG 自动生成 |
| `public/sitemap.xml` | `app/sitemap.ts` | 动态生成 |
| `public/robots.txt` | `app/robots.ts`（或保留静态文件） | 按需选择 |
| `public/_headers` | 保留（Cloudflare Pages 专用） | `output: 'export'` 模式下需要 |
| `public/_redirects` | 精简后保留 | 大部分规则不再需要 |
| `vite.config.ts` | `next.config.mjs` + `vitest.config.ts` | 拆分 |
| `tailwind.config.js` | 更新 `content` 路径 | 其他不变 |
| `postcss.config.js` | 保持不变 | Next.js 兼容 |

---

## 7. React Router → Next.js 导航迁移

| React Router | Next.js App Router | 说明 |
|---|---|---|
| `<BrowserRouter>` | 文件系统路由 | 删除 |
| `<Routes>/<Route>` | `app/` 目录结构 | 删除 |
| `useNavigate()` | `useRouter().push()` | 从 `next/navigation` 导入 |
| `useParams()` | `params` prop（服务端）或 `useParams()`（客户端） | 服务端组件通过 props 接收 |
| `useLocation()` | `usePathname()` + `useSearchParams()` | 拆分为两个 hook |
| `<Link to="...">` | `<Link href="...">` | 从 `next/link` 导入 |
| `<Outlet>` | `{children}` | layout 组件的 children |
| `location.state` | URL searchParams 或 sessionStorage | quiz → result 数据传递 |
| `lazy()` + `<Suspense>` | 自动代码分割 | Next.js 自动处理 |

---

## 8. 风险点和注意事项

### 8.1 quiz → result 状态传递

**当前**：React Router `navigate('/result', { state: { bestMatch, runnerUps, userScores } })`

**迁移后**：推荐 URL searchParams 编码方案：
- 将 18 个答案编码为紧凑字符串（如 `?a=021302130213021302`）
- Result 页面从 URL 解析答案并重新计算
- 好处：URL 可分享、刷新不丢失、无状态依赖
- 注意：匹配算法足够轻量，重新计算无性能问题

### 8.2 CSS 变量和自定义类名

当前 Tailwind 使用自定义 CSS 变量（`--cinnabar-500`、`--ink-600` 等）和自定义类名（`surface-card`、`grid-lattice`、`btn-cinnabar` 等）。这些在 `index.css`（或 `public/styles/prerender.css`）中定义。

**迁移注意**：确保 `app/globals.css` 包含所有自定义 CSS，`tailwind.config.js` 的 `content` 路径覆盖新目录。

### 8.3 `import.meta.env` → `process.env`

Vite 使用 `import.meta.env.VITE_SITE_URL`，Next.js 使用 `process.env.NEXT_PUBLIC_SITE_URL`。需要全局替换。

### 8.4 Trailing Slash 一致性

当前 URL 行为：
- 首页、法务页、guide 页：带尾斜杠（`/en/about/`）
- quiz、result：不带尾斜杠（`/en/quiz`）

Next.js 的 `trailingSlash: true` 会给所有路由加尾斜杠。需要：
- 设置 `trailingSlash: true`
- quiz 和 result 的旧 URL（不带斜杠）通过重定向兼容
- 或者反过来，`trailingSlash: false`，法务页/guide 页的旧 URL 通过重定向兼容

**推荐**：`trailingSlash: true` 统一为带尾斜杠，为 `/en/quiz` 和 `/en/result` 设置 301 重定向到 `/en/quiz/` 和 `/en/result/`。

### 8.5 AdSense CSP 兼容性

当前 CSP 策略在 `_headers` 中定义。迁移后如果使用 `output: 'export'`，`_headers` 仍然生效，无需额外处理。

### 8.6 Vitest 配置

`vite.config.ts` 删除后，为 Vitest 创建独立配置：

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: { environment: 'node' },
  resolve: {
    alias: { '@': path.resolve(__dirname) },
  },
})
```

---

## 9. 迁移后可删除的文件和目录

```
DELETE  scripts/generate-prerender-pages.mjs
DELETE  src/                               # 整个目录
DELETE  index.html
DELETE  vite.config.ts                     # 或保留为 vitest.config.ts
DELETE  public/en/**/*.html                # 56+ 生成的 HTML
DELETE  public/zh/**/*.html
DELETE  public/ja/**/*.html
DELETE  public/ko/**/*.html
DELETE  public/404.html
DELETE  public/sitemap.xml                 # 改为动态生成
DELETE  public/robots.txt                  # 改为动态生成（可选）
KEEP    public/logo.svg
KEEP    public/og-image.svg
KEEP    public/fonts/
KEEP    public/styles/                     # 检查是否还需要 prerender.css
KEEP    public/ads.txt
KEEP    public/_headers
KEEP    public/_redirects                  # 精简后保留
```

---

## 10. 执行顺序总结

```
Phase 0: 项目骨架 ──────────────────────── ■□□□□□□□□□
Phase 1: 布局 + 静态页面（SSG）─────────── ■■■□□□□□□□
Phase 2: 客户端交互页面（quiz/result）──── ■■□□□□□□□□
Phase 3: i18n 服务端实现 ──────────────── ■□□□□□□□□□
Phase 4: 内容数据提取 ─────────────────── ■■□□□□□□□□
Phase 5: SEO / Metadata 迁移 ──────────── ■■□□□□□□□□
Phase 6: 部署配置 ─────────────────────── ■□□□□□□□□□
Phase 7: 清理 + 验证 ──────────────────── ■□□□□□□□□□
```

> Phase 1 / 3 / 4 / 5 有较强依赖关系，建议按顺序执行。
> Phase 2 可以和 Phase 1 并行（quiz/result 不依赖 SSG 页面的完成）。
> Phase 6 / 7 在所有功能迁移完成后执行。
