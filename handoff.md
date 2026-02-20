# P0 SEO 优化交接文档（handoff）

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

## 9. 当前变更状态说明

当前工作区包含 P0 相关代码与预渲染产物变更（含多语言静态页更新），尚未提交。  
如进入提交流程，建议使用单独 commit（例如：`feat(seo): complete p0 indexation and routing fixes`），便于后续追踪与回滚。

