# Phase 0 交接文档

**分支**：`feat/nextjs-migration`
**完成范围**：`plan.md` → Phase 0（项目骨架）
**日期**：2026-02-22

---

## 一、本次做了什么

### 新增文件

| 文件 | 说明 |
|---|---|
| `next.config.mjs` | Next.js 配置，`output: 'export'`（纯静态）+ `trailingSlash: true` |
| `vitest.config.ts` | 独立 Vitest 配置，带 `@` 路径别名；从 `vite.config.ts` 中拆分出来 |
| `app/layout.tsx` | 根 Layout：GA4 + AdSense `<Script>`、全局容器 `div` |
| `app/globals.css` | 从 `src/index.css` 原样复制；是 Tailwind 入口 + 全部自定义 CSS 变量和组件类 |

### 修改文件

| 文件 | 变更内容 |
|---|---|
| `package.json` | scripts：`dev/build/start` 改为 Next.js；删除 `generate:prerender`、`prebuild`；新增 `preview`（wrangler） |
| `package.json` | 依赖：新增 `next@^16.1.6`；删除 `react-router-dom`、`i18next-browser-languagedetector` |
| `tsconfig.json` | 完全重写为 Next.js 标准配置：`jsx: preserve`、`@/*` 路径别名、`next` plugin、`incremental` |
| `tailwind.config.js` | `content` 路径新增 `app/`、`components/`、`lib/`；保留 `src/`（迁移完成前不能删） |
| `.gitignore` | 新增 `.next` 和 `out` |

### 未动文件（保持不变）

- `postcss.config.js` — Next.js 直接兼容，无需修改
- `vite.config.ts` — 当前仍在使用（旧 SPA 构建），Phase 7 删除
- `src/` — 全部旧代码原封不动，Phase 1–4 迁移完后在 Phase 7 删除

---

## 二、决策记录（做了什么选择、为什么）

### 1. `@cloudflare/next-on-pages` 未安装

**原因**：`next@latest` 当前解析为 16.1.6，而 `@cloudflare/next-on-pages@1.13.16` 的 peer dependency 要求 `next >= 14.3.0 && <= 15.5.2`，版本不兼容，`npm install` 报 ERESOLVE 错误。

**决策**：跳过，等 Phase 6（部署配置）再处理。届时二选一：
- **选项 A**（推荐）：`output: 'export'` 纯静态，根本不需要 `next-on-pages`，直接部署到 Cloudflare Pages 静态托管
- **选项 B**：将 Next.js 版本锁定到 15.x（`next@^15.5.2`），再安装 `@cloudflare/next-on-pages`，以支持 SSR

### 2. `output: 'export'` 纯静态导出

`plan.md` Phase 6.1 推荐方案 A。quiz / result 页面是 `'use client'`、noindex，不需要真正的 SSR。纯静态导出部署方式与现有 Cloudflare Pages 一致，复杂度最低。

### 3. `tsconfig.json` 在 Phase 0 就重写

原计划在 Phase 7 更新，但 `app/layout.tsx` 需要 Next.js 的 `jsx: preserve` 和 `@` 路径别名才能被正确识别。提前做可以让后续每个 Phase 的代码都能立即通过类型检查，而不是到最后才发现类型错误。

### 4. 单独创建 `vitest.config.ts`

`vite.config.ts` 把 Vite 开发服务器配置和 Vitest 配置混在一起。Phase 7 会删除 `vite.config.ts`，如果不提前拆分，测试会在删除时一起失效。独立的 `vitest.config.ts` 让 `npm test` 在整个迁移过程中始终可用（当前 12 条测试全部通过）。

### 5. `tailwind.config.js` 保留 `src/`

迁移期间旧代码仍在 `src/` 运行（本地开发用旧 Vite 还是新 Next.js 取决于当前工作 Phase）。如果提前删掉 `src/`，Tailwind 会清除旧组件用到的类，导致开发时样式丢失。Phase 7 删除 `src/` 时一并删除该行。

---

## 三、遗留问题 / 下一个 Phase 需要注意的坑

### 1. `vite` 和 `@vitejs/plugin-react` 仍在 devDependencies

`vitest` 依赖 `vite`，`vite.config.ts` 也还在，所以暂时不能删。Phase 7 删除 `vite.config.ts` 和 `src/` 后，一并卸载：
```bash
npm uninstall vite @vitejs/plugin-react eslint-plugin-react-refresh
```

### 2. `tsconfig.node.json` 将成为孤儿文件

它只被旧的 `tsconfig.json` 通过 `"references"` 引用，且只包含 `vite.config.ts`。新 `tsconfig.json` 已不再引用它。Phase 7 删除 `vite.config.ts` 时一并删除 `tsconfig.node.json`。

### 3. `src/` 在新 `tsconfig.json` 下可能有类型错误

新 `tsconfig.json` 的 `include` 是 `"**/*.ts"` / `"**/*.tsx"`，会扫描到 `src/`。旧代码用了 `import.meta.env`（Vite 专有），在 Next.js tsconfig 下没有类型定义。**当前不影响**（`npm test` 正常），但如果在迁移中运行 `tsc --noEmit`，会看到 `src/` 的类型报错。Phase 7 删除 `src/` 后自动消失，无需提前修复。

### 4. `app/layout.tsx` 中 `<html>` 没有 `lang` 属性

根 Layout 的 `<html>` 没有 `lang`，因为语言值来自 `[lang]` 路由段，根 Layout 拿不到。`plan.md` Phase 1.7 给出了方案：在 `app/[lang]/layout.tsx` 中通过 Next.js 的 `generateMetadata` 或直接 override `<html lang>` 来处理。这是 Phase 1 的工作。

### 5. `eslint-plugin-react-refresh` 可以在 Phase 7 一起删

这个插件是 Vite HMR 专用，Next.js 不需要。卸载前先从 `.eslintrc` 规则里删掉引用，否则 ESLint 会报找不到插件。

---

## 四、验证状态

```
npm test          → 12/12 通过 (src/utils/match.test.ts)
next --version    → Next.js v16.1.6
分支              → feat/nextjs-migration（未提交，changes 已就绪）
```

---

## 五、下一步：Phase 1 任务清单

按 `plan.md` Phase 1 顺序：

- [ ] `app/page.tsx` — 根路径 redirect 到 `/en/`
- [ ] `app/[lang]/layout.tsx` — 校验 lang、设置 `html[lang]`、`generateStaticParams` 生成 4 种语言
- [ ] `lib/i18n.ts` — 服务端翻译函数（直接 import JSON，无 i18next 运行时）
- [ ] `app/[lang]/page.tsx` — 首页 SSG，`generateMetadata` + 从 `lib/i18n.ts` 取翻译
- [ ] `components/HomepageClient.tsx` — 提取首页 `onClick` 交互（`'use client'`）
- [ ] 法务页 SSG（about / contact / privacy-policy / editorial-policy / content-updates）
- [ ] `app/[lang]/guides/[slug]/page.tsx` — Guide 页 SSG
- [ ] `content/guides/` — 从 `generate-prerender-pages.mjs` 提取 8 篇 Guide 内容

**Phase 1 启动前的提示**：先运行一次 `npm run dev` 确认 Next.js dev server 能正常启动（当前 `app/` 只有根 layout，没有任何页面，`next dev` 会显示 404，这是正常的）。
