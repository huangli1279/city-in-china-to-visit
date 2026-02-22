# Phase 6 交接文档

**分支**：`feat/nextjs-migration`（延续 Phase 1–5）
**完成范围**：`plan.md` → Phase 6（Cloudflare Pages 部署配置校验）
**日期**：2026-02-22

---

## 一、本次做了什么

### 修改文件

| 文件 | 说明 |
|---|---|
| `public/_headers` | 修复 quiz/result 的 `X-Robots-Tag` 路径（加尾斜杠） |
| `public/_redirects` | 清理旧 SPA 过时规则，补充缺失页面，添加根路径 301 |

### 未修改文件

`next.config.mjs` 配置已正确（`output: 'export'` + `trailingSlash: true`），无需修改。

---

## 二、决策记录

### 1. `next.config.mjs` 配置验证

`output: 'export'` + `trailingSlash: true` 与 Cloudflare Pages 完全兼容：

- `output: 'export'` 生成纯静态 `out/` 目录，与 Cloudflare Pages 静态部署方式一致
- `trailingSlash: true` 生成目录结构（`/en/about/index.html`），Cloudflare Pages 可直接识别
- `output: 'export'` 模式下 `next.config.mjs` 的 `headers()` 不生效，需继续使用 `public/_headers`（已在 plan.md 中记录）

**结论**：配置无需任何修改。

### 2. `_headers` 修复：X-Robots-Tag 路径加尾斜杠

**问题**：旧 SPA 时代 quiz/result 页面在 `/en/quiz`（无尾斜杠）。Next.js 迁移后 `trailingSlash: true` 使实际路径变为 `/en/quiz/`（有尾斜杠）。原 `_headers` 的 `X-Robots-Tag` 条目路径不匹配，实际上不会被应用。

**影响评估**：quiz/result 页面已通过 Next.js `generateMetadata` 设置了 `<meta name="robots" content="noindex, follow">` HTML 标签，robots 语义不会受影响。但 HTTP 头层面的 `X-Robots-Tag` 应与实际 URL 路径保持一致。

**修复**：8 条路径统一加尾斜杠：
- `/en/quiz` → `/en/quiz/`（等 4 种语言）
- `/en/result` → `/en/result/`（等 4 种语言）

### 3. `_redirects` 清理：移除旧 SPA 过时规则

原文件有 3 类过时规则：

#### 类型 A：语言根路径重写（已删除）
```
/en / 200
/en/ / 200
/zh / 200
...
```
**旧逻辑**：SPA 下 `/en/` 无真实文件，将其重写为根 `index.html`（SPA 入口），由 React Router 客户端路由处理。

**新状态**：Next.js 已在 `out/en/index.html` 生成真实的语言首页。这些 `200` 重写会让 Cloudflare 把 `/en/` 的请求服务为根 `out/index.html`（只是个客户端跳转页），导致语言首页内容丢失。**必须删除**。

#### 类型 B：quiz/result 尾斜杠→无斜杠 301（已删除并反向）
```
/en/quiz/ /en/quiz 301   # 旧：slash → no-slash
```
**旧逻辑**：SPA 下 quiz 在 `/en/quiz`（无斜杠），把带斜杠的请求 301 到无斜杠。

**新状态**：Next.js `trailingSlash: true` 使 quiz 在 `/en/quiz/`（有斜杠）。原规则会制造 301 循环。**改为反向**：`/en/quiz → /en/quiz/ 301`（无斜杠到有斜杠）。

#### 类型 C：quiz/result 重写到根（已删除）
```
/en/quiz / 200  # 旧：把 /en/quiz 的内容服务为根 index.html
```
**旧逻辑**：SPA 下 quiz 路由由客户端处理，服务器端统一返回 `index.html`。

**新状态**：`out/en/quiz/index.html` 已存在。这些规则会把 quiz 页面替换为根跳转页。**必须删除**。

### 4. `_redirects` 新增规则

| 新增规则 | 原因 |
|---|---|
| `/ /en/ 301` | 根路径的 301 服务端跳转，替代原来的 Next.js 客户端跳转（更快、SEO 更友好） |
| `/en /en/ 301` 等 4 条 | 语言根路径无斜杠版的规范化 |
| `/:lang/editorial-policy /:lang/editorial-policy/ 301` | 原文件漏掉此页面 |
| `/:lang/content-updates /:lang/content-updates/ 301` | 原文件漏掉此页面 |
| `/:lang/quiz /:lang/quiz/ 301` | 反向修正（有斜杠为规范 URL） |
| `/:lang/result /:lang/result/ 301` | 反向修正（有斜杠为规范 URL） |

同时将 `200`（rewrite）改为 `301`（redirect），对法务页强制 canonical URL，有利于 SEO link equity 集中。

---

## 三、遗留问题 / Phase 7 需要注意的坑

### 1. `src/data/` 和 `src/utils/` 仍被多处 import（Phase 7 统一迁移）

`app/[lang]/page.tsx`、`components/QuizClient.tsx`、`components/ResultClient.tsx` 直接从 `@/src/data/` 和 `@/src/utils/` import。Phase 7 删除 `src/` 时需：
1. 创建 `lib/cities.ts`、`lib/questions.ts`、`lib/match.ts`
2. 更新所有 import 路径

### 2. `out/index.html` 现在有两层跳转

根路径访问：Cloudflare `_redirects` `/ /en/ 301` → `/en/index.html`（正常）。
若 `_redirects` 未生效（极少数情况），`out/index.html` 中的 Next.js 客户端跳转作为 fallback 仍有效。

### 3. Sitemap `lastModified` 为静态字符串

`SITE_LAST_MOD = '2026-02-21'` 是硬编码常量，每次发布新内容需手动更新。Guide 页面的 lastmod 通过 `CONTENT_UPDATE_LOG` 自动跟随。

---

## 四、验证状态

```
npm test          → 12/12 通过
npm run build     → 73 个静态页面，0 错误

out/_headers 与 public/_headers 完全一致（diff 无差异）
out/_redirects 与 public/_redirects 完全一致（diff 无差异）
```

### `_headers` 最终状态（关键变更）

```diff
- /en/quiz
+ /en/quiz/
    X-Robots-Tag: noindex, follow
  （zh/ja/ko/result 同理，共 8 条）
```

### `_redirects` 最终状态（新文件）

```
# Sitemap aliases（保留）
/sitemap_index.xml /sitemap.xml 301
...

# Root → /en/ （新增）
/ /en/ 301

# 语言根路径（从 200 rewrite 改为 301 redirect，各语言单独列出）
/en /en/ 301
/zh /zh/ 301
/ja /ja/ 301
/ko /ko/ 301

# 法务/guides 页面（200 → 301，补充两个缺失页面）
/:lang/about /:lang/about/ 301
/:lang/editorial-policy /:lang/editorial-policy/ 301  ← 新增
/:lang/content-updates /:lang/content-updates/ 301    ← 新增
...

# Quiz/result（方向反转：no-slash → slash）
/:lang/quiz /:lang/quiz/ 301
/:lang/result /:lang/result/ 301
```

---

## 五、Phase 进度总览

| Phase | 内容 | 状态 |
|---|---|---|
| Phase 1 | 布局 + 静态页面 SSG | ✅ 已完成 |
| Phase 2 | Quiz + Result 客户端交互 | ✅ 已完成 |
| Phase 3 | i18n 服务端实现 | ✅ 已完成（Phase 1 中提前实现）|
| Phase 4 | 内容数据提取 | ✅ 已完成（Phase 1 中提前实现）|
| Phase 5 | Sitemap + Robots | ✅ 已完成 |
| Phase 6 | Cloudflare Pages 部署配置校验 | ✅ 已完成 |
| Phase 7 | 清理 `src/`、旧 Vite 文件、冗余文件 | ⏳ 待做 |

---

## 六、下一步：Phase 7 任务清单

按 `plan.md` Phase 7 的内容：

- [ ] 7.1 删除 `scripts/generate-prerender-pages.mjs`
- [ ] 7.2 删除 `public/` 下所有生成的 HTML 文件（保留静态资源：logo.svg、og-image.svg、fonts/、styles/、ads.txt、_headers、_redirects）
- [ ] 7.3 删除 `src/` 目录（所有代码已迁移到 `app/`、`lib/`、`components/`、`content/`）
  - 先创建 `lib/cities.ts`、`lib/questions.ts`、`lib/match.ts`（从 `src/data/` 和 `src/utils/` 迁移）
  - 更新所有 import 路径（`app/[lang]/page.tsx`、`components/QuizClient.tsx`、`components/ResultClient.tsx`）
- [ ] 7.4 删除 `index.html`（Vite 入口）
- [ ] 7.5 保留 `vite.config.ts` 改名为 `vitest.config.ts`（vitest 独立配置）
- [ ] 7.6 更新 `.gitignore`：添加 `.next/`、`out/`
- [ ] 7.7 更新 `tsconfig.json`：移除对 `src/`、`vite.config.ts` 的排除
- [ ] 7.8 确认 Vitest 单元测试仍然通过（`match.test.ts`）
- [ ] 7.9 全页面 SEO 回归检查
- [ ] 7.10 全页面 UI 回归检查
- [ ] 7.11 Lighthouse 跑分对比
- [ ] 7.12 部署到 Cloudflare Pages 并验证线上行为

**Phase 7 启动前确认**：`npm run build` 73 页通过，`npm test` 12/12。
