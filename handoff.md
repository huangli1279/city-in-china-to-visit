# Phase 2 交接文档

**分支**：`feat/nextjs-migration`（延续 Phase 1）
**完成范围**：`plan.md` → Phase 2（客户端交互页面——Quiz + Result）
**日期**：2026-02-22

---

## 一、本次做了什么

### 新增文件

| 文件 | 说明 |
|---|---|
| `lib/i18n-client.ts` | 客户端 i18next 初始化模块（`'use client'`），从 `content/locales/` 动态 import 翻译 JSON，暴露 `ensureI18nLanguage(lang)` |
| `components/ProgressBar.tsx` | 进度条组件（`'use client'`），从 `src/components/ProgressBar.tsx` 直接迁移，用 `useTranslation('common')` 获取 `quiz.progress` 文案 |
| `app/[lang]/quiz/page.tsx` | Quiz 服务端 shell：`generateStaticParams`（4 语言）、`generateMetadata`（`robots: 'noindex, follow'`）、渲染 `<QuizClient lang={lang}>` |
| `components/QuizClient.tsx` | `'use client'`，完整 Quiz 交互逻辑，从 `src/pages/QuizPage.tsx` 迁移 |
| `app/[lang]/result/page.tsx` | Result 服务端 shell：同上，用 `<Suspense>` 包裹 `<ResultClient>`（`useSearchParams` 要求）|
| `components/ResultClient.tsx` | `'use client'`，Result 展示逻辑，从 `src/pages/ResultPage.tsx` 迁移 |

### 未修改文件

Phase 2 不需要修改任何 Phase 1 文件。

---

## 二、决策记录

### 1. Quiz → Result 状态传递：URL searchParams

**原方案**（Vite）：`navigate('/result', { state: { bestMatch, runnerUps, userScores } })`

**新方案**：将 18 道题的答案编码为 18 字符字符串，追加到 URL：
```
/en/result/?a=021302130213021302
```
每个字符对应该题选中的选项索引（0–3）。

**编码**（QuizClient）：
```typescript
function encodeAnswers(answers: Answers): string {
  return Array.from({ length: 18 }, (_, i) => String(answers[i] ?? 0)).join('')
}
```

**解码 + 校验**（ResultClient）：
```typescript
function decodeAnswers(encoded: string): Answers | null {
  if (encoded.length !== 18) return null
  const answers: Answers = {}
  for (let i = 0; i < encoded.length; i++) {
    const val = parseInt(encoded[i], 10)
    if (isNaN(val) || val < 0 || val > 3) return null
    answers[i] = val
  }
  return answers
}
```

Result 页面用解码后的 answers 重新调用 `calcUserScores` + `getRankedCities` 计算结果，无状态依赖，URL 可分享，刷新不丢失。

### 2. 客户端 i18n 懒加载守卫

Quiz 和 Result 两个客户端组件都需要 i18next 初始化后才能展示翻译文本。统一模式：

```tsx
const [i18nReady, setI18nReady] = useState(false)
const { t } = useTranslation('common')  // 必须无条件调用（React rules）

useEffect(() => {
  let cancelled = false
  ensureI18nLanguage(lang).then(() => {
    if (!cancelled) setI18nReady(true)
  })
  return () => { cancelled = true }
}, [lang])

// 所有 hook 调用之后再 early return
if (!i18nReady) return <div className="min-h-dvh" aria-busy="true" />
```

`i18nReady = false` 时渲染空白占位，防止 i18n key 字符串闪现。i18next 的 JSON 文件是静态 import（动态 import 在 bundler 阶段解析），初始化通常在几十毫秒内完成。

### 3. ResultClient 必须用 `<Suspense>` 包裹

Next.js 要求：使用 `useSearchParams()` 的客户端组件必须被 `<Suspense>` 边界包裹，否则构建时报错：

```
Error: useSearchParams() should be wrapped in a suspense boundary at page "/..."
```

**解决**：在 `app/[lang]/result/page.tsx` 的服务端 shell 中包裹：
```tsx
<Suspense fallback={<div className="min-h-dvh" />}>
  <ResultClient lang={lang} />
</Suspense>
```

Quiz 页面的 QuizClient 不使用 `useSearchParams`，不需要 Suspense。

### 4. 数据 import：直接用 `src/` 路径

`ResultClient` 和 `QuizClient` 需要 `questions`、`cities`、`match` 等数据。评估后选择**直接从 `@/src/data/` 和 `@/src/utils/` import**，原因：
- Phase 1 的 `app/[lang]/page.tsx` 已经有先例（`import { cities } from '@/src/data/cities'`）
- 三个文件（questions.ts、cities.ts、match.ts）均为纯数据/逻辑，无 `import.meta.env` 或其他 Vite 专属 API
- `tsconfig.json` 的 `exclude: ["src"]` 只影响 TypeScript 类型检查，不影响 bundler 实际打包
- 避免 Phase 2 阶段额外创建 3 个冗余 `lib/*.ts` 文件（Phase 7 统一迁移时再处理）

### 5. `useSearchParams()` 可能为 null（首次踩坑）

**现象**：第一次构建失败：

```
Type error: 'searchParams' is possibly 'null'.
./components/ResultClient.tsx:45:19
```

**原因**：Next.js 15+ 的 `useSearchParams()` 类型为 `ReadonlyURLSearchParams | null`，TypeScript strict 模式下不能直接 `.get()`。

**修复**：
```typescript
// 错误
const encoded = searchParams.get('a')

// 正确
const encoded = searchParams?.get('a') ?? null
```

### 6. i18next SSG 期间的警告是良性的

构建输出中会出现：
```
react-i18next:: You will need to pass in an i18next instance by using initReactI18next
```

这是 Next.js 在 SSG 阶段预渲染 QuizClient/ResultClient 时，i18next 尚未初始化触发的警告。由于组件在 `i18nReady = false` 时渲染空白 div，实际静态 HTML 不包含任何翻译文本，警告对产出物无影响。**无需处理**。

### 7. `lib/i18n-client.ts` 的单例设计

i18next 实例和已加载语言集合是模块级单例：

```typescript
const loadedLanguages = new Set<SupportedI18nLang>()
let initPromise: Promise<void> | null = null
```

`ensureI18nLanguage(lang)` 首次调用时初始化 i18next（同时预加载 `en` + 目标语言），后续调用仅切换语言（如果需要）。LanguageSwitcher 切换语言时，重新调用 `ensureI18nLanguage` 会动态加载新语言并切换，不会重新初始化整个实例。

---

## 三、遗留问题 / Phase 3+ 需要注意的坑

### 1. `src/data/` 和 `src/utils/` 被多处 import，Phase 7 统一迁移

当前 `app/[lang]/page.tsx`、`components/QuizClient.tsx`、`components/ResultClient.tsx` 都直接从 `@/src/data/` 和 `@/src/utils/` import。Phase 7 删除 `src/` 时，需要：
1. 创建 `lib/cities.ts`、`lib/questions.ts`、`lib/match.ts`（将内容从 `src/` 移入）
2. 更新所有 import 路径

### 2. 语言切换后 i18n 切换是异步的

QuizClient 中，`useEffect` 依赖 `[lang]`。如果用户在 Quiz 页面切换语言（理论上 LanguageSwitcher 会跳转到新 URL），组件会重新 mount，i18nReady 重置为 false，短暂显示空白。这是预期行为，不是 bug。

### 3. Quiz 页面的 URL 无 trailing slash（答案 searchParam 的影响）

`trailingSlash: true` 在 Next.js 静态导出下对 `/en/quiz/` 等路径生效。Quiz submit 导航到 `/en/result/?a=...`：路径部分 `/en/result/` 已带尾斜杠，不会触发额外的 trailing slash 重定向。

### 4. Phase 5、6、7 尚未开始

按 `plan.md` 剩余工作：

| Phase | 内容 | 状态 |
|---|---|---|
| Phase 3 | i18n 服务端实现 | **已完成**（Phase 1 实现为 `lib/i18n.ts`） |
| Phase 4 | 内容数据提取 | **已完成**（Phase 1 实现为 `content/guides/` 和 `content/pages/`） |
| Phase 5 | Sitemap（`app/sitemap.ts`）+ Robots（`app/robots.ts`）| ⏳ 待做 |
| Phase 6 | Cloudflare Pages 部署配置校验 | ⏳ 待做 |
| Phase 7 | 清理 `src/`、旧 Vite 文件、冗余文件 | ⏳ 待做 |

---

## 四、验证状态

```
npm test          → 12/12 通过 (src/utils/match.test.ts)
npm run build     → 71 个静态页面，0 错误，1 条良性 i18next 警告

新增路径（相比 Phase 1 的 63 页）：
  /en/quiz, /zh/quiz, /ja/quiz, /ko/quiz         （Quiz，4 语言）
  /en/result, /zh/result, /ja/result, /ko/result  （Result，4 语言）
  共 71 条
```

---

## 五、下一步：Phase 5 任务清单

Phase 3 和 Phase 4 在 Phase 1 中已提前完成，直接跳到 Phase 5：

- [ ] `app/sitemap.ts` — 动态生成 sitemap.xml，覆盖所有静态路径（首页、guides、法务页），**不包含** quiz/result（noindex）
- [ ] `app/robots.ts` — 生成 robots.txt，替代手写 `public/robots.txt`
- [ ] 删除 `public/sitemap.xml`（如果 `app/sitemap.ts` 生成的内容已覆盖）
- [ ] 确认 `public/robots.txt` 和 `app/robots.ts` 不冲突（两者同时存在时 Next.js 优先用 `app/robots.ts`）

**Phase 5 启动前确认**：`npm run build` 仍然通过，`npm test` 仍然 12/12。
