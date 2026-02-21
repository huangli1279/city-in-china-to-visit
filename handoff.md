# P0/P1/P2 SEO 优化交接文档（handoff）

## 1. 背景与目标

本次交付目标是落实 `plan.md` 中的 P0 项（索引与抓取治理），聚焦四类高优先级问题：

1. 软 404（未知 URL 返回 200，导致索引污染）
2. 多语言首页 canonical/lang 信号冲突
3. `robots.txt` 与 quiz/result 索引策略冲突
4. sitemap 与实际可索引 URL 一致性

执行日期：`2026-02-20`

---

## 2. 执行过程复盘（按时间顺序）

### 2.1 初始探查与根因定位

先检查了路由、SEO 组件、预渲染脚本与站点部署规则，确认关键根因：

- `public/_redirects` 存在 `/* /index.html 200`，会把未知路径全部回退为 200。
- `scripts/generate-prerender-pages.mjs` 默认不生成多语言首页静态文件（受 `PRERENDER_LANDING_PAGES` 控制）。
- `robots.txt` 屏蔽了 `/quiz`、`/result`，但业务目标是“可抓取但不收录”。
- SPA 路由中未知路径默认跳转 `/en`，不利于 404 信号一致性。

### 2.2 第一轮改动

完成以下首轮修复：

- `public/_redirects`：
  - 去掉全局 `/* -> index.html 200`。
  - 增加 quiz/result 定向处理。
- `public/_headers`：
  - 给 `/en|zh|ja|ko` 的 quiz/result 增加 `X-Robots-Tag: noindex, follow`。
  - 给 `404.html` 增加 `X-Robots-Tag: noindex, nofollow`。
- `public/robots.txt`：
  - 移除 quiz/result `Disallow` 规则。
- `scripts/generate-prerender-pages.mjs`：
  - 默认开启首页预渲染。
  - 新增 `404.html` 生成逻辑。
- 应用层：
  - 新增 `src/pages/NotFoundPage.tsx`。
  - `src/App.tsx` 未知路由改为显示 404 页面。
  - `src/components/LangLayout.tsx` 非法语言改跳 `/404`。

### 2.3 关键兼容问题与二次修正

在 `wrangler pages dev dist` 真实模拟中发现两点 Cloudflare 规则限制：

1. `_redirects` 不支持 `404` 状态规则（只能 200/3xx）
2. `200` rewrite 目标如果写 `*.html`，会被规范化重定向，影响路径行为

据此调整：

- 删除 `_redirects` 中无效的 404 规则；
- quiz/result 采用 `200` rewrite 到 `/`（由 React Router 渲染 quiz/result 页）；
- 未匹配路径交给静态层自然 404（依赖无 `/*` catch-all）。

### 2.4 URL 规范统一（含斜杠）

为避免 `/en` 与 `/en/` 的信号分裂，统一首页规范为带斜杠：

- `homePath()` 改为 `/${lang}/`；
- 首页 canonical/hreflang 全部带 `/`；
- sitemap 首页 URL 改为 `/en/ /zh/ /ja/ /ko/`；
- 预渲染页面内部 Home 链接同步带 `/`。

---

## 3. 关键文件改动说明

## 3.1 部署与抓取规则

- `public/_redirects`
  - 首页统一：`/ -> /en/ 301`
  - 移除全局 fallback（不再把未知路径改写为 200）
  - quiz/result：
    - `.../quiz/`、`.../result/` 先 301 到无尾斜杠
    - 无尾斜杠再 `200` rewrite 到 `/`（交给 SPA 路由）

- `public/_headers`
  - `/en|zh|ja|ko/quiz` 与 `/en|zh|ja|ko/result`：`X-Robots-Tag: noindex, follow`
  - `/404.html`：`X-Robots-Tag: noindex, nofollow`

- `public/robots.txt`
  - 删除 quiz/result 的 `Disallow`
  - 保留全站 `Allow: /` 与 sitemap 指向

## 3.2 预渲染与 sitemap

- `scripts/generate-prerender-pages.mjs`
  - `PRERENDER_LANDING_PAGES` 默认改为开启（除非显式 `=0`）
  - `homePath()` 改为带尾斜杠
  - landing alternates/x-default 统一带尾斜杠
  - landing canonical 改为带尾斜杠
  - sitemap 首页 URL 输出带尾斜杠
  - 新增 `renderNotFoundPage()` 并输出 `public/404.html`

## 3.3 前端路由

- `src/App.tsx`
  - 新增 `NotFoundPage` 懒加载
  - 新增 `/404` 路由
  - `*` 路由改为 `NotFoundPage`（不再强制跳 `/en`）

- `src/components/LangLayout.tsx`
  - 非法语言参数从跳 `/en` 改为跳 `/404`

- `src/pages/NotFoundPage.tsx`（新增）
  - 输出 noindex 的 404 页面（含语言入口链接）

## 3.4 开发环境一致性

- `vite.config.ts`
  - dev 中不再绕过 `/:lang` 静态首页目录索引，减少 dev/prod 行为偏差

## 3.5 新增/更新的静态产物

- 新增：
  - `public/404.html`
  - `public/en/index.html`
  - `public/zh/index.html`
  - `public/ja/index.html`
  - `public/ko/index.html`
- 更新：
  - 多语种 `about/contact/privacy/guides` 预渲染页（主要是 Home 链接与组织 URL 变更到带 `/`）
  - `public/sitemap.xml`

---

## 4. 验证与证据

## 4.1 构建与测试

已执行并通过：

```bash
npm run generate:prerender
npm run build
npm test
```

结果：
- `vite build` 成功
- `vitest` 12/12 通过

## 4.2 运行时路由验证（wrangler pages dev）

使用 `npx wrangler pages dev dist --port 8788` 验证关键路径：

- `HEAD /en/quiz` -> `200`，包含 `x-robots-tag: noindex, follow`
- `HEAD /en/result` -> `200`，包含 `x-robots-tag: noindex, follow`
- `HEAD /en/non-existent-page-xyz` -> `404`
- `GET /zh/` -> `200`，HTML 中：
  - `<html lang="zh-CN">`
  - canonical 为 `https://bestcityinchina.site/zh/`
  - hreflang 指向各语言首页（均带尾斜杠）

## 4.3 sitemap 验证

`public/sitemap.xml` 已确认：
- 首页为 `https://bestcityinchina.site/en/`、`/zh/`、`/ja/`、`/ko/`
- 不包含 quiz/result

---

## 5. 目标完成情况（P0 对照）

1. 软 404 治理：`已完成`
- 未知路径不再 200 回退，返回 404

2. 多语言首页 canonical/lang 冲突：`已完成`
- 多语言首页静态输出已建立，canonical/lang/hreflang 对齐

3. robots 与 noindex 冲突：`已完成`
- robots 允许抓取，quiz/result 通过 header noindex

4. sitemap 一致性：`已完成`
- 仅保留可索引 URL，根路径规范化

---

## 6. 已知限制与后续建议

1. `_redirects` 性能提示（wrangler warning）
- 提示 quiz/result 规则可前置以优化匹配性能。
- 当前功能正确，建议后续按提示做规则顺序微调。

2. 404 canonical 目前为 `/404`
- 合理但非强制；可在后续考虑是否去掉 canonical 或改为自解释 URL 策略。

3. 线上最终行为取决于 Cloudflare Pages 实际部署配置
- 本地 `wrangler pages dev` 已验证通过，建议上线后再跑一次真实域名 smoke test。

---

## 7. 上线后回归清单（建议）

部署后立即执行：

```bash
curl -I https://bestcityinchina.site/en/quiz
curl -I https://bestcityinchina.site/en/result
curl -I https://bestcityinchina.site/en/non-existent-page-xyz
curl -s https://bestcityinchina.site/zh/ | head -n 40
curl -s https://bestcityinchina.site/sitemap.xml | head -n 40
curl -s https://bestcityinchina.site/robots.txt
```

验收标准：
- quiz/result 为 `200` 且有 `X-Robots-Tag: noindex, follow`
- 随机不存在 URL 为 `404`
- `/zh/` 的 canonical 与 lang 正确
- sitemap 不含 quiz/result

---

## 8. 回滚策略

如需快速回滚到改造前行为，优先回滚以下文件：

1. `public/_redirects`
2. `public/_headers`
3. `public/robots.txt`
4. `scripts/generate-prerender-pages.mjs`
5. `src/App.tsx`
6. `src/components/LangLayout.tsx`
7. `src/pages/NotFoundPage.tsx`（新增文件可删除）

---

## 9. 当前变更状态说明（更新于 2026-02-21）

P0 与 P1 相关变更已完成并进入远端仓库，当前状态：

- Git 分支：`main`
- 最新提交：`392858c`
- 提交信息：`feat(seo): complete p1 performance optimizations and adsense-safe csp`
- 远端推送：`origin/main` 已推送
- Cloudflare Pages 部署：已发布
  - 预览 URL：`https://45322c6d.city-in-china-to-visit.pages.dev`
  - 生产域名：`https://bestcityinchina.site`

---

## 10. P1 开发复盘（本次接手）

### 10.1 目标范围（对应 `plan.md`）

本轮接手聚焦 `P1` 三项：

1. 字体策略重构（P1-1）
2. 首屏关键路径与资源体积优化（P1-2）
3. 缓存策略升级（P1-3）

### 10.2 执行过程复盘（按时间顺序）

#### 10.2.1 基线核查

先核查了 `index.html`、`src/index.css`、`public/styles/prerender.css`、`public/_headers` 与预渲染脚本，确认以下性能瓶颈：

- 首页存在 Google Fonts 多语种大组合直连；
- i18n 资源为全量静态打包导入；
- `_headers` 缺少 hash 资源长期缓存策略；
- 第三方脚本与首屏渲染路径存在竞争。

#### 10.2.2 第一轮优化落地

完成以下改动：

- 字体：
  - 新增本地字体文件：`public/fonts/noto-sans-latin.woff2`、`public/fonts/noto-serif-latin.woff2`
  - `src/index.css` 与 `public/styles/prerender.css` 引入 `@font-face + unicode-range + font-display: swap`
  - 按 `html[lang]` 提供中/日/韩系统字体回退栈
  - `tailwind.config.js` 的 `fontFamily.sans` 改为 `var(--font-sans)`
- JS 体积：
  - `src/i18n.ts` 改为按语言动态导入 locale 资源
  - `src/main.tsx` 改为 `initializeI18n()` 后再挂载应用
  - `src/components/LangLayout.tsx`、`src/components/LanguageSwitcher.tsx` 改为按需加载并切换语言资源
- 缓存：
  - `public/_headers` 增加 `/assets/*`、`/fonts/*` 长缓存 immutable
  - HTML/语言目录使用 `max-age=0, must-revalidate`

#### 10.2.3 需求变更与回调处理（GA/AdSense）

第一轮曾尝试把 GA/AdSense 延迟到 idle/交互后加载，以降低首屏争抢；后续按产品要求“不要改 GA/AdSense 配置有效性”执行回滚：

- 已恢复 `index.html` 原始 GA/AdSense 直连 async + `gtag('config')` 初始化；
- 已恢复 `scripts/generate-prerender-pages.mjs` 中预渲染页面的 GA/AdSense 注入方式；
- 最终未保留“延迟加载第三方脚本”策略。

#### 10.2.4 AdSense 放行问题修复（CSP）

根据“不要拦截 AdSense 广告”要求，补齐 CSP 白名单：

- 在 `public/_headers` 的 `Content-Security-Policy` 中补充 AdSense/DoubleClick 相关域名；
- 放开 `script-src`、`connect-src`、`frame-src` 的广告必需目标域。

### 10.3 本轮关键文件变更

1. 字体与样式
- `src/index.css`
- `public/styles/prerender.css`
- `tailwind.config.js`
- `public/fonts/noto-sans-latin.woff2`
- `public/fonts/noto-serif-latin.woff2`

2. i18n 与前端加载路径
- `src/i18n.ts`
- `src/main.tsx`
- `src/components/LangLayout.tsx`
- `src/components/LanguageSwitcher.tsx`

3. 部署与策略
- `public/_headers`
- `index.html`
- `scripts/generate-prerender-pages.mjs`
- 预渲染静态页（`public/en|zh|ja|ko/**`）与 `public/sitemap.xml`

### 10.4 验证结果

#### 10.4.1 构建与测试

已执行并通过：

```bash
npm run generate:prerender
npm run build
npm test
```

结果：
- `vite build` 成功
- `vitest` 12/12 通过

#### 10.4.2 产物体积观察（关键项）

- 主入口 JS（gzip）由约 `117.86 kB` 下降到约 `71.28 kB`（受 i18n 按需加载影响明显）。

#### 10.4.3 Header 与策略抽检

通过 `wrangler pages dev dist` + `curl -I` 抽检确认：

- `/assets/*.js`：`Cache-Control: public, max-age=31536000, immutable`
- `/fonts/*.woff2`：`Cache-Control: public, max-age=31536000, immutable`
- `/en/guides/`：`Cache-Control: public, max-age=0, must-revalidate`
- `/en/quiz`：仍含 `X-Robots-Tag: noindex, follow`
- 生产域名响应头已含更新后的 AdSense CSP 放行配置

### 10.5 P1 完成度评估

1. P1-1 字体策略重构：`已完成（阶段性）`
- 已移除 Google Fonts 依赖并本地化拉丁字体，CJK 采用系统字体回退。

2. P1-2 CSS/JS 与关键路径：`部分完成`
- 已完成 i18n 资源按需加载与入口 JS 体积下降；
- 由于业务要求，未保留 GA/AdSense 延迟加载策略。

3. P1-3 缓存策略升级：`已完成`
- 已落实静态资源长期缓存与 HTML revalidate 策略。

### 10.6 仍需关注项（后续建议）

1. CJK 字体子集化仍可继续
- 当前为系统字体回退，若要进一步控首屏一致性，可后续做中/日/韩本地子集化。

2. AdSense CSP 需持续监控
- 广告网络域名可能随投放类型变化，建议上线后在浏览器 Console 观察 CSP 违规日志并按需补白名单。

3. `_redirects` 规则顺序优化
- Wrangler 仍会提示 quiz/result 规则顺序可优化（性能层面），功能不受影响。

### 10.7 回滚建议（P1）

若需仅回滚 P1，本轮优先回滚：

1. `src/i18n.ts`
2. `src/main.tsx`
3. `src/components/LangLayout.tsx`
4. `src/components/LanguageSwitcher.tsx`
5. `src/index.css`
6. `public/styles/prerender.css`
7. `tailwind.config.js`
8. `public/_headers`
9. `public/fonts/*`

---

## 11. P2 开发复盘（本次接手）

### 11.1 目标范围（对应 `plan.md`）

本轮接手聚焦 `P2` 三项：

1. 标题与描述本地化改写（P2-1）
2. OG/Twitter 多语言对齐（P2-2）
3. 结构化数据增强（P2-3）

### 11.2 执行过程复盘（按时间顺序）

#### 11.2.1 现状抽检与问题定位

先对 `public/**/index.html` 做了批量抽检，确认 P2 的主要缺口：

- 多语种 guide 页 description 偏短（`zh` 最短约 24 字）；
- about/contact/privacy 四语种共用英文 description，存在“跨语种同模板”；
- 全站预渲染页面缺少 `og:locale`；
- Article/About/Contact 的结构化数据作者实体缺少作者页 URL，`dateModified` 长期固定。

#### 11.2.2 P2-1 文案与元信息本地化

- 更新 `src/locales/en|zh-CN|ja|ko/common.json`：
  - 扩写 `home.topicCluster.subtitle`；
  - 扩写 4 篇 guide card 的 description，提升语言自然度与可检索信息量。
- 在 `scripts/generate-prerender-pages.mjs` 新增 `PAGE_SEO_COPY`：
  - 为 `about/contact/privacy` 提供按语言独立的 title/description；
  - 不再共用英文模板。

#### 11.2.3 P2-2 OG/Twitter 多语言对齐

- 预渲染链路：
  - `scripts/generate-prerender-pages.mjs` 增加 `OG_LOCALE_MAP`；
  - `renderDocument()` 输出 `og:locale` 与 `og:locale:alternate`；
  - 保持 `og:url` 与 canonical 一致（抽检为 0 差异）。
- SPA 运行时链路：
  - `src/seo/config.ts` 新增 `buildOgLocale()` 与 `buildOgLocaleAlternates()`；
  - `src/components/Seo.tsx` 支持并注入 `og:locale` / `og:locale:alternate`；
  - `src/pages/HomePage.tsx`、`src/pages/QuizPage.tsx`、`src/pages/ResultPage.tsx` 传入对应语言值。
- 更新 `index.html`：
  - 补齐 `og:locale` / `og:locale:alternate`；
  - 统一首页 canonical/hreflang/og:url 为带尾斜杠版本（`/en/`、`/zh/`、`/ja/`、`/ko/`）。

#### 11.2.4 P2-3 结构化数据增强

- 在 `scripts/generate-prerender-pages.mjs` 新增：
  - `buildAuthorEntity()`：输出带 `@id` + `url` 的作者组织实体（指向语言版 about 页）；
  - `buildPublisherEntity()`：统一发布者组织实体。
- 应用到 Guide Article / About / Contact JSON-LD：
  - `author` 统一为可解析实体；
  - `publisher` 统一组织实体，减少跨页不一致。
- 更新时间信号：
  - 新增 `LAST_MODIFIED_DATE_ISO = 2026-02-21`；
  - `dateModified`、`article:modified_time`、页面可见“最近更新”同步到本次真实维护日期；
  - 保留 `datePublished = 2026-01-15`。

### 11.3 本轮关键文件变更

1. 源码与配置
- `scripts/generate-prerender-pages.mjs`
- `src/components/Seo.tsx`
- `src/seo/config.ts`
- `src/pages/HomePage.tsx`
- `src/pages/QuizPage.tsx`
- `src/pages/ResultPage.tsx`
- `src/locales/en/common.json`
- `src/locales/zh-CN/common.json`
- `src/locales/ja/common.json`
- `src/locales/ko/common.json`
- `index.html`

2. 预渲染产物
- `public/en|zh|ja|ko/guides/**/index.html`
- `public/en|zh|ja|ko/about/index.html`
- `public/en|zh|ja|ko/contact/index.html`
- `public/en|zh|ja|ko/privacy-policy/index.html`

### 11.4 验证结果

#### 11.4.1 构建与测试

已执行并通过：

```bash
npm run generate:prerender
npm run build
npm test
```

结果：
- `vite build` 成功
- `vitest` 12/12 通过

#### 11.4.2 P2 验收脚本抽检（静态页面）

对 32 个语言页批量检查结果：

- `description` 长度 `<45` 的页面数：`0`
- 缺失 `og:locale` 页面数：`0`
- `canonical != og:url` 页面数：`0`
- 重复 description 分组（>1）：`0`

### 11.5 P2 完成度评估

1. P2-1 标题与描述本地化：`已完成`
- 已消除 about/contact/privacy 跨语种英文模板问题；
- guide 相关 description 已扩写并去重。

2. P2-2 OG/Twitter 多语言对齐：`已完成`
- 预渲染与 SPA 双链路均已输出 `og:locale`；
- `og:url` 与 canonical 一致。

3. P2-3 结构化数据增强：`已完成`
- 作者实体补齐 URL/@id，发布者实体统一；
- `dateModified` 更新为本次真实维护日期。

### 11.6 回滚建议（P2）

若需仅回滚 P2，本轮优先回滚：

1. `scripts/generate-prerender-pages.mjs`
2. `src/components/Seo.tsx`
3. `src/seo/config.ts`
4. `src/pages/HomePage.tsx`
5. `src/pages/QuizPage.tsx`
6. `src/pages/ResultPage.tsx`
7. `src/locales/en/common.json`
8. `src/locales/zh-CN/common.json`
9. `src/locales/ja/common.json`
10. `src/locales/ko/common.json`
11. `index.html`
12. 对应 `public/en|zh|ja|ko/**/index.html` 预渲染产物
