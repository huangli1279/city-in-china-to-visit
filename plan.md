# 从 i18next/react-i18next 迁移到 next-intl 详细计划

## 1. 文档目的
本计划用于将当前项目的国际化方案从 `i18next + react-i18next` 迁移到 `next-intl`，在不改变现有 URL 结构和 SEO 表现的前提下，完成服务端与客户端翻译链路替换。

- 项目目录：`/Users/roger/Projects/city-in-china-to-visit`
- 当前日期：2026-02-22
- 当前路由策略：`/[lang]/...`，支持 `en/zh/ja/ko`
- 当前构建模式：`output: 'export'`（静态导出）

---

## 2. 当前实现现状（迁移输入）

### 2.1 依赖与核心实现
- 依赖：`i18next`、`react-i18next`（`package.json`）
- 服务端翻译入口：`lib/i18n.ts`（`getTranslation`）
- 客户端翻译入口：`lib/i18n-client.ts`（`useTranslation` + `ensureI18nLanguage`）
- 客户端调用点：
  - `components/QuizClient.tsx`
  - `components/ResultClient.tsx`
  - `components/ProgressBar.tsx`
- 服务端调用点（`getTranslation`）：
  - `app/[lang]/page.tsx`
  - `app/[lang]/quiz/page.tsx`
  - `app/[lang]/result/page.tsx`
  - `app/[lang]/guides/page.tsx`
  - `app/[lang]/guides/[slug]/page.tsx`

### 2.2 文案组织
- 当前文案目录：`content/locales/<locale>/<namespace>.json`
- namespace：`common`、`questions`、`cities`
- locale 目录：`en`、`zh-CN`、`ja`、`ko`
- URL 语言码与内容语言码存在映射：`zh -> zh-CN`

### 2.3 关键约束
1. `next.config.mjs` 使用 `output: 'export'`，静态导出模式下不能依赖中间件驱动 i18n。  
2. 现有 URL 与 SEO 已稳定（`/en/`、`/zh/`、`/ja/`、`/ko/`），迁移不能改动路径。  
3. 语言切换器当前保留 query/hash 且仅替换首段路径，行为需保持一致。  

---

## 3. 迁移目标与边界

### 3.1 目标
1. 完全移除 `i18next/react-i18next` 运行时依赖。  
2. 使用 `next-intl` 提供 SSR + Client 统一翻译能力。  
3. 保持现有 URL、SEO、语言切换体验、静态导出能力不变。  
4. 保持现有文案 JSON 目录结构（首期不做大规模重排）。

### 3.2 非目标（本次不做）
1. 不改造业务文案内容。  
2. 不重做语言检测策略（`/` 仍可继续重定向到 `/en/`）。  
3. 不重写全站页面结构与导航体系。  

---

## 4. 目标技术方案（next-intl）

### 4.1 总体思路
采用 `next-intl` 的 App Router 集成方式，但在本项目中 **不启用 middleware 作为硬依赖**，原因是当前为静态导出模式。

- 路由继续使用 `app/[lang]/*`
- 在 `app/[lang]/layout.tsx` 侧设置 locale 上下文（Provider）
- 在服务端页面/metadata 中使用 `next-intl/server`
- 在客户端组件中使用 `useTranslations`

### 4.2 locale 策略
- 对外 URL locale：`en | zh | ja | ko`
- 文案文件 locale：`en | zh-CN | ja | ko`
- 增加统一映射层：`zh => zh-CN`

### 4.3 messages 装载策略
保留当前 namespace 文件，按请求 locale 动态合并为 next-intl messages 对象，形态建议：

```ts
{
  common: {...},
  questions: {...},
  cities: {...}
}
```

这样可保留调用习惯：
- `useTranslations('common')`
- `useTranslations('questions')`
- `useTranslations('cities')`

---

## 5. 分阶段实施计划

## 阶段 0：准备与基线（0.5 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage0.md`）

### 任务
1. 新建迁移分支。  
2. 记录当前可用基线：`npm run build`、`npm run test`。  
3. 建立迁移验收清单（见第 8 节）。

### 输出
- 基线构建/测试通过记录。

### 风险控制
- 若基线失败，先修复现有问题再迁移，避免新旧问题混淆。

---

## 阶段 1：引入 next-intl 基础设施（1 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage1.md`）

### 任务
1. 安装依赖：`next-intl`。  
2. 新增 i18n 配置模块（建议目录 `i18n/`）：
   - `i18n/routing.ts`：定义支持语言与默认语言。
   - `i18n/locales.ts`：统一 `urlLocale -> contentLocale` 映射。
   - `i18n/messages.ts`：按 locale 动态导入并合并 `common/questions/cities`。
   - `i18n/request.ts`：`getRequestConfig` 返回 `{locale, messages}`。
3. 改造 `next.config.mjs`：接入 `next-intl/plugin`。

### 文件清单
- 新增：`i18n/routing.ts`
- 新增：`i18n/locales.ts`
- 新增：`i18n/messages.ts`
- 新增：`i18n/request.ts`
- 修改：`next.config.mjs`

### 说明
- 当前阶段不删除旧 i18n 代码，先并存，保证可回滚。
- `output: 'export'` 下先不依赖 middleware。

---

## 阶段 2：布局与 Provider 改造（0.5 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage2.md`）

### 任务
1. 在 `app/[lang]/layout.tsx` 中接入 `NextIntlClientProvider`。  
2. 用统一校验函数校验 `lang`，无效则 `notFound()`。  
3. 继续保留当前 html lang 设置策略（脚本方式）或改造成更稳定方案，但需保证导出兼容。

### 文件清单
- 修改：`app/[lang]/layout.tsx`
- （可选）新增：`lib/locale.ts`（统一 VALID_LANGS、映射、守卫函数）

### 验收点
- 切换不同语言路由，Provider 生效。
- 未出现 hydration 错误。

---

## 阶段 3：服务端翻译调用迁移（1 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage3.md`）

### 任务
将所有 `getTranslation(lang, namespace)` 替换为 `next-intl/server` 方案。

建议迁移方式（两选一）：
1. 直接在页面中使用 `getTranslations({locale, namespace})`。  
2. 新建薄封装 `lib/i18n-server.ts`（仅包装 next-intl，减少页面改动）。

### 目标改造文件
- `app/[lang]/page.tsx`
- `app/[lang]/quiz/page.tsx`
- `app/[lang]/result/page.tsx`
- `app/[lang]/guides/page.tsx`
- `app/[lang]/guides/[slug]/page.tsx`

### 迁移细节
- `generateMetadata` 中翻译获取改为 next-intl server API。
- 需要对象/数组时使用 `t.raw(...)`，避免字符串插值 API 误用。

### 风险
- `t.raw` 返回 `unknown`，TypeScript 需要显式类型收窄。

---

## 阶段 4：客户端翻译调用迁移（1 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage4.md`）

### 任务
1. 将 `useTranslation` 替换为 `useTranslations`。  
2. 删除 `ensureI18nLanguage` 与 `i18nReady` 加载门控逻辑。  
3. 保持交互与文案行为一致。

### 目标改造文件
- `components/QuizClient.tsx`
- `components/ResultClient.tsx`
- `components/ProgressBar.tsx`

### 迁移细节
- 当前对象取值代码：
  - `t('questions', {ns: 'questions', returnObjects: true})`
  - `t('cities', {ns: 'cities', returnObjects: true})`
- 迁移后建议：
  - `const tQuestions = useTranslations('questions')`
  - `const questions = tQuestions.raw('questions')`
  - `const tCities = useTranslations('cities')`
  - `const cities = tCities.raw('cities')`

### 验收点
- quiz/result 首屏不再依赖 `i18nReady` 占位。
- 无首屏闪烁与 hook 顺序问题。

---

## 阶段 5：清理旧实现与依赖（0.5 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage5.md`）

### 任务
1. 删除旧文件：
   - `lib/i18n.ts`
   - `lib/i18n-client.ts`
2. 移除旧依赖：
   - `i18next`
   - `react-i18next`
3. 全仓搜索并清理残留引用。

### 验收命令
- `rg "i18next|react-i18next|ensureI18nLanguage|getTranslation\(" -n`

---

## 阶段 6：回归测试与发布（0.5 天）

> 状态：已完成（2026-02-22，执行记录见 `docs/i18n-migration-stage6.md`）

### 任务
1. 执行：`npm run build`、`npm run test`。  
2. 手动回归 4 个语言的核心路径：
   - `/[lang]/`
   - `/[lang]/quiz/`
   - `/[lang]/result/?a=...`
   - `/[lang]/guides/`
   - `/[lang]/guides/[slug]/`
3. 校验 SEO：`canonical`、`alternates.languages`、`og:locale`。

### 发布策略
- 建议分两次发布：
  1. 基础设施 + 服务端迁移
  2. 客户端迁移 + 清理依赖

---

## 6. 逐文件改造清单（详细）

| 文件 | 动作 | 说明 |
|---|---|---|
| `package.json` | 修改 | 添加 `next-intl`，最终移除 `i18next/react-i18next` |
| `next.config.mjs` | 修改 | 接入 `next-intl/plugin` |
| `i18n/routing.ts` | 新增 | 声明 locales、defaultLocale |
| `i18n/locales.ts` | 新增 | 管理 `zh -> zh-CN` 映射 |
| `i18n/messages.ts` | 新增 | 动态导入并合并 `common/questions/cities` |
| `i18n/request.ts` | 新增 | next-intl request config |
| `app/[lang]/layout.tsx` | 修改 | 注入 `NextIntlClientProvider` |
| `app/[lang]/page.tsx` | 修改 | 服务端翻译 API 替换 |
| `app/[lang]/quiz/page.tsx` | 修改 | 服务端翻译 API 替换 |
| `app/[lang]/result/page.tsx` | 修改 | 服务端翻译 API 替换 |
| `app/[lang]/guides/page.tsx` | 修改 | 服务端翻译 API 替换 |
| `app/[lang]/guides/[slug]/page.tsx` | 修改 | 服务端翻译 API 替换 |
| `components/QuizClient.tsx` | 修改 | `useTranslations` + 删除 i18nReady 逻辑 |
| `components/ResultClient.tsx` | 修改 | `useTranslations` + 删除 i18nReady 逻辑 |
| `components/ProgressBar.tsx` | 修改 | `useTranslations` 替换 |
| `lib/i18n.ts` | 删除 | 旧服务端翻译层下线 |
| `lib/i18n-client.ts` | 删除 | 旧客户端翻译层下线 |

---

## 7. 关键设计决策

### 决策 A：是否使用 middleware
- 结论：本次迁移默认不使用 middleware。  
- 原因：项目当前是 `output: 'export'` 静态导出，不应将 i18n 依赖建立在 middleware 上。  
- 影响：`/` 到 `/en/` 的行为继续由 `app/page.tsx` 控制。

### 决策 B：是否重命名 `zh-CN` 目录
- 结论：首期不重命名，保留 `content/locales/zh-CN`。  
- 原因：降低迁移 diff，避免翻译资产路径变更引入风险。  
- 方案：通过 `i18n/locales.ts` 做映射。

### 决策 C：是否一次性改造所有非核心页面
- 结论：先改造当前真正使用 `getTranslation/useTranslation` 的页面和组件，其他页面保持不动。  
- 原因：先完成“框架迁移”，再做内容层统一改造。

---

## 8. 验收标准（DoD）

### 功能验收
1. 四语言首页、问卷页、结果页、指南页可正常渲染。  
2. 语言切换器行为与现状一致（路径替换、query/hash 保留）。  
3. quiz/result 页面不出现因 i18n 初始化导致的空白占位闪烁。  
4. 无 `MISSING_MESSAGE` 或 key 直接回显异常。

### 技术验收
1. `npm run build` 通过。  
2. `npm run test` 通过。  
3. 全局检索不再存在 `react-i18next`、`i18next` 调用。  
4. 旧 i18n 文件已删除且无引用。

### SEO 验收
1. `canonical` 与 `alternates.languages` 未回归。  
2. `og:locale` 与 `alternateLocale` 未回归。  
3. 路径结构保持 `/en|zh|ja|ko/...`。

---

## 9. 风险清单与缓解

1. 风险：`output: 'export'` 与中间件方案冲突。  
   缓解：不依赖 middleware；保留显式语言路径。

2. 风险：`zh` 与 `zh-CN` 映射遗漏导致文案 404。  
   缓解：集中映射函数，单点管理；在 build 前增加 locale 装载断言。

3. 风险：`returnObjects` 迁移为 `t.raw` 后类型不安全。  
   缓解：关键结构建立 TypeScript 类型守卫。

4. 风险：客户端去掉 `i18nReady` 后首次渲染数据空。  
   缓解：Provider 在 layout 先注入完整 messages；组件侧仅消费上下文。

5. 风险：一次性改动过大难以定位问题。  
   缓解：按阶段提交，小步发布（基础设施/服务端/客户端/清理）。

---

## 10. 回滚方案

1. 迁移期间保留阶段性提交，任一阶段异常可回退到上一提交。  
2. 在“删除旧依赖”前，旧实现保持可恢复。  
3. 若上线后发现多语言故障：
   - 立即回滚到迁移前 tag/commit；
   - 保留错误样本 URL 与 locale，补充回归用例后再重发。

---

## 11. 预估工期

- 阶段 0：0.5 天
- 阶段 1：1 天
- 阶段 2：0.5 天
- 阶段 3：1 天
- 阶段 4：1 天
- 阶段 5：0.5 天
- 阶段 6：0.5 天

合计：约 5 天（含回归与缓冲）

---

## 12. 建议提交切分（Commit Plan）

1. `chore(i18n): add next-intl infrastructure and request config`  
2. `refactor(i18n): migrate server translation calls to next-intl`  
3. `refactor(i18n): migrate client components to useTranslations`  
4. `chore(i18n): remove legacy i18next implementation and deps`  
5. `test(i18n): add/adjust regression checks for locale routes`
