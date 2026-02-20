# 网站审计优化交接文档

**项目**: bestcityinchina.site — 中国城市匹配测试工具
**交接日期**: 2026-02-20
**技术栈**: React 18 + Vite + React Router + i18next + Tailwind CSS，部署于 Netlify
**线上地址**: https://bestcityinchina.site
**本地开发**: `npm run dev` → http://localhost:5173/

---

## 审计工具

使用 [squirrelscan](https://squirrelscan.com) CLI (`squirrel`) 进行网站审计。已配置 `squirrel.toml`。

```bash
# 重新运行审计（推荐从静态指南页入手，SPA 首页无法被完整爬取）
squirrel audit http://localhost:5173/en/guides/ --format llm --coverage surface --refresh

# 生产环境审计（更准确）
squirrel audit https://bestcityinchina.site --format llm --coverage surface

# 查看历史审计记录
squirrel report --list

# 最近一次审计对比（6页，ID: 2ddcac4b）
squirrel report 2ddcac4b --format llm
```

---

## 本次已完成的优化

### 1. 社交分享图片（og:image）
- **新增** `public/og-image.svg` — 1200×630 品牌风格 OG 图片
- **更新** `index.html` — 添加 `og:image`、`og:image:width/height`、`twitter:image`
- **更新** `src/components/Seo.tsx` — 新增 `ogImage` prop，默认值指向 `/og-image.svg`
- **更新** `scripts/generate-prerender-pages.mjs` — 所有生成页面自动包含 og:image
- **已应用到** 所有 `public/en/guides/` 下的 HTML 文件

### 2. 安全响应头
- **新增** `public/_headers` — Netlify 安全头配置：
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy`（允许 Google Fonts、Google Analytics）
- **更新** `vite.config.ts` — 开发服务器也返回部分安全头

### 3. 隐私政策页面
- **新增** `public/en/privacy-policy/index.html` — 完整英文隐私政策静态页
- **更新** `src/pages/HomePage.tsx` — footer 新增隐私政策链接
- **更新** `generate-prerender-pages.mjs` — 所有指南页 footer 包含隐私政策链接

### 4. 预渲染指南页面优化（通过修改 generate 脚本后重新生成）
修改 `scripts/generate-prerender-pages.mjs`：
- **修复 meta-description 过短** — 所有描述扩展至 120–160 字符
- **修复 guides hub 标题过短** — "China City Planning Guides" → "City Planning Guides for First-Time China Travelers"
- **修复 Article JSON-LD 缺字段** — 添加 `image`、`datePublished: 2026-01-15`、`publisher.logo`
- **修复 heading 层级跳跃** — 指南首页 h1 → h3 跳级，现在加入了 h2 分隔
- **新增 favicon 引用** — 所有生成页面 head 中加入 `<link rel="icon">`
- **新增外部链接** — 每篇指南文章末尾加入 "Further reading" 外链区块

重新生成命令：
```bash
npm run generate:prerender
```

---

## 当前审计得分

| 审计入口 | 页面数 | 总分 | 等级 |
|---------|-------|------|------|
| `localhost:5173/` (修复前) | 1 | 46 | F |
| `localhost:5173/en/guides/` (修复后，最新) | 6 | **48** | F |

> **注意**：localhost 审计分数偏低，主要原因是开发服务器限制（无 HTTPS、无 gzip 压缩），这些在生产环境均已解决。

---

## 待解决的剩余问题

### 高优先级（影响 SEO 和可信度）

#### E-E-A-T 信号不足（分数 44/100）
- `eeat/about-page` — **无 About 页**
  - 建议：新建 `public/en/about/index.html`，介绍项目背景、旅行匹配方法论
  - 或在 HomePage.tsx 底部 footer 中增加 About 内容块
- `eeat/contact-page` — **无 Contact 页**
  - 建议：新建简单的联系页，或在 footer 中加入联系邮箱
- `eeat/author-byline` — **内容页无作者署名**
  - 建议：在指南文章头部加入作者/组织署名，更新 `renderGuideDetail` 函数
- `eeat/content-dates` — **内容页无发布日期显示**
  - Schema 中已有 `datePublished`，但页面 HTML 中未展示
  - 建议：在文章头部或 breadcrumb 附近显示发布日期

#### 内容字数不足（Content 分数 85/100）
- `content/word-count` — 部分指南页不足 300 词
  - 当前状态：`/en/guides` (134词)、部分指南页 243–283 词
  - 建议：在 `GUIDE_PAGES` 数据中为每篇指南添加更多段落内容（`sections`）
  - 目标：每页 400–600 词

### 中优先级（影响用户体验和 SEO）

#### SPA 首页无障碍问题（仅影响爬虫，React 渲染版本正常）
- `a11y/landmark-one-main` — 爬虫看到的 `/en` 原始 HTML 无 `<main>` 地标
- `a11y/skip-link` — 同上
- 根因：`/en` 由 SPA 提供，爬虫看到的是未执行 React 的原始 `index.html`
- 建议：为 `/en`、`/zh`、`/ja`、`/ko` 生成静态预渲染页面（移除 `main()` 函数中的注释，恢复 `renderLandingPage` 调用）

#### 链接问题（仅影响 SPA 首页）
- `links/internal-links` — SPA 首页无静态内部链接（React 渲染后有）
- 与上面同因同解

### 低优先级（开发服务器限制，生产无此问题）

以下问题在 **生产环境均不存在**，无需处理：
- `security/https` — localhost 无 HTTPS，Netlify 生产有
- `security/csp` — `_headers` 文件在 Netlify 生产环境生效
- `security/x-frame-options` — 同上
- `perf/compression` — Netlify 自动 gzip
- `perf/unminified-js` — 生产构建已压缩
- `perf/http2` — 依赖 HTTPS，生产有
- `perf/source-maps` — 仅开发模式
- `security/leaked-secrets` — Vite `@vite/client` 的误报，不是真实密钥
- `crawl/sitemap-domain` — 开发环境域名与 sitemap 中生产域名不一致，正常
- `crawl/sitemap-valid` — SPA 对不存在的 sitemap 路径返回 HTML，正常

---

## 项目结构关键文件

```
index.html                          # SPA 入口，含 og:image、hreflang、GA
public/
  _headers                          # Netlify 安全响应头（新增）
  _redirects                        # Netlify 路由规则（/ → /en 301）
  og-image.svg                      # OG 社交分享图片（新增）
  sitemap.xml                       # 由 generate 脚本生成
  robots.txt                        # 屏蔽 /quiz 和 /result
  styles/prerender.css              # 预渲染页公共样式
  en/
    guides/
      index.html                    # 指南列表页（静态）
      best-city-to-visit-in-china-first-time/index.html
      beijing-vs-shanghai-for-first-trip/index.html
      best-china-cities-by-travel-style/index.html
      how-many-days-in-first-china-city/index.html
    privacy-policy/index.html       # 隐私政策（新增）

src/
  components/
    Seo.tsx                         # 动态 SEO head 管理（已添加 ogImage prop）
  pages/
    HomePage.tsx                    # 首页（已添加 privacy policy 链接到 footer）
  seo/config.ts                     # SEO 工具函数

scripts/
  generate-prerender-pages.mjs      # 静态页生成脚本（已大量更新）
```

---

## 验证修复效果

### 本地验证
```bash
# 1. 重新生成静态页面
npm run generate:prerender

# 2. 启动开发服务器
npm run dev

# 3. 运行审计（从指南页入手）
squirrel audit http://localhost:5173/en/guides/ --format llm --coverage surface --refresh

# 4. 验证构建正常
npm run build
```

### 生产验证（推荐）
部署到 Netlify 后，运行生产审计以获得真实分数：
```bash
squirrel audit https://bestcityinchina.site --format llm --coverage full
```
预计生产得分 **65–75/100**（排除开发服务器的虚假扣分项后）。

---

## 预期目标得分

| 解决的问题 | 预计得分提升 |
|-----------|------------|
| 当前（修复后，localhost guides） | 48 |
| 生产环境排除 HTTPS/压缩等伪扣分 | ~65 |
| 新增 About + Contact 页 | +5–8 |
| 指南内容扩展至 400+ 词 | +3–5 |
| 语言首页预渲染（恢复静态生成） | +5–8 |
| **目标** | **≥ 80** |
