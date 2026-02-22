# Phase 5 交接文档

**分支**：`feat/nextjs-migration`（延续 Phase 1–2）
**完成范围**：`plan.md` → Phase 5（Sitemap + Robots）
**日期**：2026-02-22

---

## 一、本次做了什么

### 新增文件

| 文件 | 说明 |
|---|---|
| `app/sitemap.ts` | 动态 sitemap 生成器，覆盖所有静态路径（首页、法务页、guides），**不含** quiz/result（noindex）|
| `app/robots.ts` | 动态 robots.txt 生成器，`Allow: /`，指向 sitemap |

### 删除文件

| 文件 | 说明 |
|---|---|
| `public/sitemap.xml` | 手写静态版，已被 `app/sitemap.ts` 动态版取代 |
| `public/robots.txt` | 手写静态版，已被 `app/robots.ts` 动态版取代 |

### 未修改文件

Phase 5 未修改任何 Phase 1–2 文件。

---

## 二、决策记录

### 1. `output: 'export'` 需要 `export const dynamic = 'force-static'`

**现象**：首次构建失败：
```
Error: export const dynamic = "force-static"/export const revalidate not configured
on route "/robots.txt" with "output: export".
```

**原因**：`app/robots.ts` 和 `app/sitemap.ts` 在内部被编译为 Route Handler。在 `output: 'export'` 静态导出模式下，所有 Route Handler 必须显式声明为静态。

**修复**：在两个文件中均添加：
```typescript
export const dynamic = 'force-static'
```

这不影响实际产出——Next.js 仍然在构建时执行这两个函数，生成 `out/sitemap.xml` 和 `out/robots.txt`。

### 2. sitemap 内容与原 `public/sitemap.xml` 的对齐

原手写 `public/sitemap.xml` 的优先级方案：
- 首页：`en` → 1.0，其余语言 → 0.9
- 法务页：0.7，changeFreq: weekly
- Guides hub：0.8，changeFreq: weekly
- Guide 详情页：0.8，changeFreq: weekly
- **不包含** quiz/result（noindex，不应被收录）

`app/sitemap.ts` 完整复现了上述逻辑。与原手写版的唯一区别：guide 详情页的 `lastModified` 从 `CONTENT_UPDATE_LOG` 动态读取，比原手写版更精确：

| Guide | lastmod |
|---|---|
| best-city-to-visit-in-china-first-time | 2026-02-14 |
| beijing-vs-shanghai-for-first-trip | 2026-02-18 |
| best-china-cities-by-travel-style | 2026-02-14 |
| how-many-days-in-first-china-city | 2026-02-18 |
| beijing-shanghai-chengdu-first-trip-comparison | 2026-02-21 |
| china-first-trip-budget-by-city | 2026-02-21 |
| best-time-to-visit-china-first-trip | 2026-02-21 |
| china-visa-payment-checklist-first-timers | 2026-02-21 |

### 3. 为何删除 `public/sitemap.xml` 和 `public/robots.txt`

Next.js `output: 'export'` 构建时：
1. 先将 `public/` 文件复制到 `out/`
2. 再将 `app/sitemap.ts` / `app/robots.ts` 的输出写入 `out/`

理论上步骤 2 会覆盖步骤 1。但保留静态文件会造成混淆（代码审查时不清楚哪个版本生效），且 Cloudflare Pages 部署时可能因文件冲突导致意外行为。

**结论**：删除 `public/` 中的旧版，以 `app/` 动态版为唯一来源。

### 4. `SITE_URL` 复用 `lib/seo.ts` 常量

`app/sitemap.ts` 和 `app/robots.ts` 均从 `@/lib/seo` 引用 `SITE_URL`（值为 `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bestcityinchina.site'`），与现有页面 metadata 保持一致，无需重复定义常量。

---

## 三、遗留问题 / Phase 6+ 需要注意的坑

### 1. `src/data/` 和 `src/utils/` 仍被多处 import（Phase 7 统一迁移）

`app/[lang]/page.tsx`、`components/QuizClient.tsx`、`components/ResultClient.tsx` 直接从 `@/src/data/` 和 `@/src/utils/` import。Phase 7 删除 `src/` 时需：
1. 创建 `lib/cities.ts`、`lib/questions.ts`、`lib/match.ts`
2. 更新所有 import 路径

### 2. Sitemap `lastModified` 为静态字符串

`SITE_LAST_MOD = '2026-02-21'` 是硬编码常量。每次发布新内容时，需要同步更新 `CONTENT_UPDATE_LOG`（已有该机制），guide 页面的 lastmod 会自动跟随更新；其他页面（首页、法务页）的 lastmod 仍需手动修改 `SITE_LAST_MOD`。

Phase 7 清理时可考虑将 `SITE_LAST_MOD` 提取为 `content/` 下的配置常量。

---

## 四、验证状态

```
npm test          → 12/12 通过 (src/utils/match.test.ts)
npm run build     → 73 个静态页面，0 错误，1 条良性 i18next 警告

新增路由（相比 Phase 2 的 71 条）：
  /robots.txt   → out/robots.txt
  /sitemap.xml  → out/sitemap.xml
  共 73 条

out/sitemap.xml 覆盖路径数：
  4（首页）+ 4×5（法务页）+ 4（guides hub）+ 4×8（guide 详情）= 4+20+4+32 = 60 条 URL
out/robots.txt：User-Agent: *, Allow: /, Sitemap: https://bestcityinchina.site/sitemap.xml
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
| Phase 6 | Cloudflare Pages 部署配置校验 | ⏳ 待做 |
| Phase 7 | 清理 `src/`、旧 Vite 文件、冗余文件 | ⏳ 待做 |

---

## 六、下一步：Phase 6 任务清单

按 `plan.md` Phase 6 的内容：

- [ ] 确认 `next.config.mjs` 的 `output: 'export'` + `trailingSlash: true` 配置与 Cloudflare Pages 部署兼容
- [ ] 检查 `public/_headers` 中的 CSP 策略是否仍然有效（静态导出模式下 `headers()` 在 next.config.mjs 不生效，需保留 `_headers`）
- [ ] 检查 `public/_redirects` 中的规则，确认哪些在 Next.js 路由下已不再需要
- [ ] 验证 `out/` 目录可直接上传 Cloudflare Pages，行为与现有部署一致

**Phase 6 启动前确认**：`npm run build` 通过（73 页），`npm test` 12/12。
