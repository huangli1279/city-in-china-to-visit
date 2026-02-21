# Phase 1 交接文档

**分支**：`feat/nextjs-migration`
**完成范围**：`plan.md` → Phase 1（核心迁移——布局和静态页面）
**日期**：2026-02-22

---

## 一、本次做了什么

### 新增文件

| 文件 | 说明 |
|---|---|
| `app/page.tsx` | 根路径 → redirect 到 `/en/` |
| `app/not-found.tsx` | 404 页面 |
| `app/[lang]/layout.tsx` | 语言 layout：校验 lang、通过内联 script 设置 `html[lang]`、`generateStaticParams` |
| `app/[lang]/page.tsx` | 首页 SSG，带 `generateMetadata` 和 JSON-LD |
| `app/[lang]/about/page.tsx` | About 页 SSG |
| `app/[lang]/contact/page.tsx` | Contact 页 SSG |
| `app/[lang]/privacy-policy/page.tsx` | Privacy Policy 页 SSG |
| `app/[lang]/editorial-policy/page.tsx` | Editorial Policy 页 SSG |
| `app/[lang]/content-updates/page.tsx` | Content Updates 页 SSG，消费 `CONTENT_UPDATE_LOG` |
| `app/[lang]/guides/page.tsx` | Guides Hub 页 SSG，消费 `ALL_GUIDES` |
| `app/[lang]/guides/[slug]/page.tsx` | Guide 详情页 SSG，32 条路径（4 lang × 8 slug） |
| `components/HomepageClient.tsx` | 首页客户端交互组件（`'use client'`） |
| `components/LanguageSwitcher.tsx` | 语言切换客户端组件（`'use client'`，`next/navigation`） |
| `lib/seo.ts` | hreflang/OG 辅助函数（从 `src/seo/config.ts` 迁移，`process.env` 替代 `import.meta.env`） |
| `lib/analytics.ts` | GA4 事件追踪（从 `src/utils/analytics.ts` 迁移，加 `'use client'` 头） |
| `lib/i18n.ts` | 服务端翻译函数，直接 import JSON，无 i18next 运行时 |
| `content/locales/en/` | 从 `src/locales/en/` 复制（common.json / questions.json / cities.json） |
| `content/locales/zh-CN/` | 同上 |
| `content/locales/ja/` | 同上 |
| `content/locales/ko/` | 同上 |
| `content/guides/index.ts` | 8 篇 Guide 数据 + `GUIDE_BY_SLUG` Map + `CONTENT_UPDATE_LOG` |
| `content/pages/seo-copy.ts` | 4 语言 SEO 文案（title/description）+ `getPageSeo()` 辅助函数 |
| `pages/.gitkeep` | 空目录占位，解决 Next.js 目录冲突（见决策 3） |

### 修改文件

| 文件 | 变更内容 |
|---|---|
| `app/layout.tsx` | `<html>` 加 `suppressHydrationWarning`，配合语言 layout 的内联 script |
| `components/LanguageSwitcher.tsx` | `(pathname ?? '/')` 空值保护（Next.js 严格模式下 `usePathname()` 可能返回 null） |
| `tsconfig.json` | `exclude` 新增 `"src"`、`"vite.config.ts"`、`"vitest.config.ts"` |

### 自动变更文件

| 文件 | 原因 |
|---|---|
| `tsconfig.json` | Next.js 构建时自动修改 `jsx: react-jsx`，并追加 `.next/dev/types/**/*.ts` 到 `include` |
| `package.json` | `npm install` 自动新增 `@types/node`（Next.js 构建时检测到缺失后自动安装） |

---

## 二、决策记录

### 1. `html[lang]` 用内联 script 而非 layout 套 `<html>`

`plan.md` Phase 1.7 给出了方案 B（在 `app/[lang]/layout.tsx` 里覆盖 `<html lang>`），但 Next.js App Router 不允许嵌套 layout 嵌套 `<html>`，会出现 hydration 错误。

**最终方案**：
- 根 `app/layout.tsx` 的 `<html>` 加 `suppressHydrationWarning`（允许属性在 hydration 前后不一致）
- `app/[lang]/layout.tsx` 注入一段同步内联 script：
  ```tsx
  <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${htmlLang}'` }} />
  ```
- 该 script 在浏览器解析 HTML 时同步执行，早于任何 React 代码，因此屏幕阅读器和爬虫都能拿到正确 `lang`。

**为什么不用 middleware**：`output: 'export'` 纯静态导出模式下 Next.js middleware 不可用。

### 2. `getTranslation` 实现为同步函数

`plan.md` 的示例代码把 `getTranslation` 写成了 `async`，但 JSON 是在构建时直接 `import` 的，没有 I/O 操作，没有理由加 `async`。实际实现：

```typescript
export function getTranslation(urlLang: string, namespace: string): TranslationFn {
  const i18nLang = URL_LANG_MAP[urlLang] ?? 'en'
  const data = resources[i18nLang]?.[namespace] ?? resources.en[namespace] ?? {}
  return function t(key: string): unknown {
    return resolveDotPath(data, key) ?? key
  }
}
```

调用时无需 `await`，消费端类型为 `unknown`，需要时由调用者 cast。

### 3. 根目录创建空 `pages/` 目录

Next.js 的 `findPagesDir` 函数会同时搜索 `./pages` 和 `./src/pages`，并要求 `app/` 和 `pages/` 在同一个父目录下。由于旧 Vite 代码有 `src/pages/`（Pages Router 之外的目录），而 Next.js App Router 在根目录 `app/`，两者父目录不同，构建报错：

```
Error: > `pages` and `app` directories should be under the same folder
```

**修复**：在根目录创建空 `pages/.gitkeep`。`findPagesDir` 优先选 `./pages`（而非 `./src/pages`），两者都在根目录，父目录一致，错误消失。旧 `src/pages/` 完全不被 Next.js 处理。

### 4. `content/guides/` 用单文件 `index.ts` 而非 8 个独立文件

`plan.md` Phase 4.1 的示例是每篇 guide 一个独立 `.ts` 文件。实际评估后，8 篇 guide 总内容量可控，合并为一个文件：
- import 路径更简单（所有消费方只需 `@/content/guides`）
- `GUIDE_BY_SLUG` Map 和 `CONTENT_UPDATE_LOG` 天然和数组放在一起，不需要单独的聚合模块

### 5. `content/locales/` 是**复制**而非移动

`src/locales/` 不能删除——旧 Vite 代码运行时依赖它（i18next 配置从 `src/locales/` 加载）。Phase 1 仅把文件复制到 `content/locales/`，供 `lib/i18n.ts` 在构建时 import。Phase 7 删除 `src/` 时，`content/locales/` 成为唯一翻译来源。

### 6. `tsconfig.json` 排除旧代码目录

Next.js 的 TypeScript 检查会扫描 `"**/*.ts"` / `"**/*.tsx"`，默认覆盖 `src/`。旧 Vite 代码使用 `react-router-dom`、`import.meta.env` 等，在 Next.js tsconfig 下报错。

**修复**：在 `tsconfig.json` 的 `exclude` 里加上 `"src"`、`"vite.config.ts"`、`"vitest.config.ts"`。`npm test`（Vitest）不受影响，因为 Vitest 使用独立的 `vitest.config.ts`，只扫描 `src/utils/match.test.ts`。

### 7. params 必须 await（Next.js 15+）

Next.js 15 开始，服务端组件的 `params` 和 `searchParams` 都是 `Promise`，必须 `await` 后才能使用。Plan.md 的示例代码直接解构 `params.lang`，在 Next.js 16 下会报 TypeScript 错误。

**所有页面统一写法**：
```typescript
type Props = { params: Promise<{ lang: string }> }
export default async function Page({ params }: Props) {
  const { lang } = await params
  ...
}
```

---

## 三、遗留问题 / Phase 2 需要注意的坑

### 1. `content/locales/` 和 `src/locales/` 现在是冗余副本

两份翻译文件内容完全相同。只要 `src/` 还存在，就不能删 `src/locales/`（Vite i18n 依赖它）。Phase 7 删 `src/` 时一并删 `src/locales/`。

### 2. Guide 详情页正文只有英文内容

`content/guides/index.ts` 中 `sections`、`keyPoints`、`faq`、`sources` 等字段均为英文，暂无多语言版本。`generateMetadata` 和 h1/description 已通过 `topicCluster.items`（翻译文件里有）做了本地化，但页面正文显示英文。这是有意设计——Phase 1 目标是静态生成框架，多语言正文是后期内容工作。

### 3. Quiz / Result 页面尚未迁移

`app/[lang]/quiz/` 和 `app/[lang]/result/` 目录不存在，访问这些 URL 会返回 404。这是 **Phase 2** 的工作。

核心问题：quiz → result 的状态传递。当前 Vite 版用 React Router 的 `location.state`，Next.js 没有等价物。推荐方案：**URL searchParams 编码**（`?a=021302130213021302`，18 字符，每字符对应一题答案索引），Result 页面读取 searchParams 重新计算。

### 4. 客户端 i18n 尚未创建

`lib/i18n-client.ts` 还不存在。Quiz 和 Result 页面需要它（`useTranslation`、`I18nextProvider`）。Phase 2 实现时可以保留 `react-i18next`，参照 `src/i18n.ts` 的 `RESOURCE_LOADERS` 动态加载翻译。

### 5. Sitemap 和 robots.txt 尚未迁移

`public/sitemap.xml` 和 `public/robots.txt` 目前还是手写静态文件。Phase 5 迁移为 `app/sitemap.ts` 和 `app/robots.ts`。

### 6. `@types/node` 是 Next.js 自动安装的

首次构建时 Next.js 检测到缺失后自动执行了 `npm install --save-dev @types/node`。这个依赖现在已经在 `package.json` 里，后续开发者无需再手动安装。

---

## 四、验证状态

```
npm test          → 12/12 通过 (src/utils/match.test.ts)
npm run build     → 63 个静态页面，0 错误，0 警告

生成路径：
  /                 (redirect → /en/)
  /_not-found
  /en, /zh, /ja, /ko            (首页，4 语言)
  /en/about, ...                (About，4 语言)
  /en/contact, ...              (Contact，4 语言)
  /en/privacy-policy, ...       (Privacy，4 语言)
  /en/editorial-policy, ...     (Editorial，4 语言)
  /en/content-updates, ...      (Updates，4 语言)
  /en/guides, ...               (Guides Hub，4 语言)
  /en/guides/[slug], ...        (Guide 详情，4 语言 × 8 slug = 32 条)
  共 63 条
```

---

## 五、下一步：Phase 2 任务清单

按 `plan.md` Phase 2 顺序：

- [ ] `app/[lang]/quiz/page.tsx` — 服务端 shell，`generateMetadata` 设 `robots: 'noindex, follow'`，渲染 `<QuizClient>`
- [ ] `components/QuizClient.tsx` — `'use client'`，从 `src/pages/QuizPage.tsx` 迁移，`useRouter().push()` 替代 `useNavigate()`，答案通过 URL searchParams 传递
- [ ] `app/[lang]/result/page.tsx` — 服务端 shell，`generateMetadata` 设 noindex
- [ ] `components/ResultClient.tsx` — `'use client'`，从 `src/pages/ResultPage.tsx` 迁移，从 `useSearchParams()` 解析答案，调用 `calcUserScores` + `getRankedCities` 重新计算
- [ ] `lib/i18n-client.ts` — 客户端 i18n provider（`react-i18next` + `I18nextProvider`），quiz/result 需要
- [ ] `components/ProgressBar.tsx` — 从 `src/components/ProgressBar.tsx` 直接迁移，加 `'use client'`
- [ ] 确认 `lib/match.ts`、`lib/cities.ts`、`lib/questions.ts` 是否需要在 Phase 2 就创建（ResultClient 依赖匹配算法），或直接 import `src/data/` 和 `src/utils/`（临时可行，Phase 7 再统一迁移）

**Phase 2 启动前确认**：`npm run build` 仍然通过，`npm test` 仍然 12/12。
