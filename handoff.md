# Phase 7 交接文档

**分支**：`feat/nextjs-migration`（延续 Phase 1–6）
**完成范围**：`plan.md` → Phase 7（清理和验证）
**日期**：2026-02-22

---

## 一、本次做了什么

### 新增文件

| 文件 | 说明 |
|---|---|
| `lib/cities.ts` | 从 `src/data/cities.ts` 迁移，无 import 变更 |
| `lib/questions.ts` | 从 `src/data/questions.ts` 迁移，无 import 变更 |
| `lib/match.ts` | 从 `src/utils/match.ts` 迁移，import 从 `../data/` 改为 `./` |
| `lib/match.test.ts` | 从 `src/utils/match.test.ts` 迁移，import 从 `../data/` 改为 `./` |
| `vitest.config.ts` | 从 `vite.config.ts` 提取 test 配置，使用 `fileURLToPath` 兼容 ESM |

### 修改文件（import 路径更新）

| 文件 | 变更 |
|---|---|
| `app/[lang]/page.tsx` | `@/src/data/cities` → `@/lib/cities` |
| `components/QuizClient.tsx` | `@/src/data/questions` → `@/lib/questions`；`@/src/utils/match` → `@/lib/match` |
| `components/ResultClient.tsx` | `@/src/utils/match` → `@/lib/match`；`@/src/data/cities` → `@/lib/cities` |
| `tsconfig.json` | 从 `exclude` 移除 `src` 和 `vite.config.ts`（已不存在） |

### 删除文件

| 删除内容 | 原因 |
|---|---|
| `src/` 整目录 | 所有代码已迁移到 `lib/`、`app/`、`components/`、`content/` |
| `public/en/`、`public/zh/`、`public/ja/`、`public/ko/` | 旧 Vite 预渲染 HTML，Next.js SSG 已接管 |
| `public/404.html` | 同上 |
| `scripts/generate-prerender-pages.mjs` | 内容已提取到 `content/`，不再需要脚本 |
| `index.html` | Vite 入口文件，Next.js 不需要 |
| `vite.config.ts` | 测试配置已提取到 `vitest.config.ts`，Vite 插件全部无用 |

---

## 二、决策记录

### 1. `lib/` 目录迁移策略

`src/data/cities.ts` 和 `src/data/questions.ts` 无内部依赖，直接复制。
`src/utils/match.ts` 内部 import 路径 `../data/` → `./`（同目录）。

**执行顺序**：先创建 `lib/` 文件 → 再更新 import 路径 → 先运行测试确认无误 → 再删除 `src/`。

### 2. `vitest.config.ts` ESM 兼容

项目 `package.json` 有 `"type": "module"`，不能用 `__dirname`。
使用 `fileURLToPath(new URL('.', import.meta.url))` 替代。

```ts
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
```

### 3. `tsconfig.json` 排除策略

- 移除 `src`（目录已删除）
- 移除 `vite.config.ts`（文件已删除）
- 保留 `vitest.config.ts`（使用 vitest/vite 类型，避免与 Next.js TS 编译冲突）

### 4. `.gitignore` 无需修改

已在 Phase 6 前完成（`.next`、`out` 均已存在于 `.gitignore`）。

---

## 三、验证状态

```
npm test          → 12/12 通过（lib/match.test.ts，src/ 已删除）
npm run build     → 73 个静态页面，0 错误
```

---

## 四、遗留手动验证任务（7.9–7.12）

以下任务需人工完成，不涉及代码变更：

- [ ] 7.9 全页面 SEO 回归检查（逐页核对 title、description、hreflang、OG、JSON-LD）
- [ ] 7.10 全页面 UI 回归检查（逐页截图对比）
- [ ] 7.11 Lighthouse 跑分对比（迁移前后）
- [ ] 7.12 部署到 Cloudflare Pages 并验证线上行为

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
| Phase 7 | 清理 `src/`、旧 Vite 文件、冗余文件 | ✅ 已完成（代码部分）|

**迁移工程部分已全部完成。剩余 7.9–7.12 为人工验证和部署步骤。**
