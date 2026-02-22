# i18n 迁移阶段 1 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 1）

## 阶段 1 目标
1. 安装 `next-intl` 依赖。
2. 新增 i18n 基础模块：`i18n/routing.ts`、`i18n/locales.ts`、`i18n/messages.ts`、`i18n/request.ts`。
3. 改造 `next.config.mjs`，接入 `next-intl/plugin`。

## 执行结果

### 1) 依赖安装
- 命令：`npm install next-intl`
- 结果：成功，新增 `next-intl@^4.8.3`。
- 变更文件：`package.json`、`package-lock.json`。

### 2) i18n 基础设施落地
- 新增：`i18n/routing.ts`
  - 定义 URL locale：`en`、`zh`、`ja`、`ko`
  - 默认语言：`en`
- 新增：`i18n/locales.ts`
  - 统一处理 URL locale 校验
  - 提供 `zh -> zh-CN` 的内容语言映射
- 新增：`i18n/messages.ts`
  - 按 locale 动态导入 `common/questions/cities` 三个 namespace
  - 合并为 next-intl 的 messages 对象
- 新增：`i18n/request.ts`
  - 使用 `getRequestConfig` 返回 `locale` + `messages`

### 3) Next.js 配置接入
- 修改：`next.config.mjs`
  - 使用 `createNextIntlPlugin('./i18n/request.ts')`
  - 保留 `output: 'export'` 与 `trailingSlash: true`

### 4) 回归验证
- 命令：`npm run build`
  - 结果：通过
  - 关键输出：
    - `Compiled successfully`
    - `Generating static pages ... (73/73)`
- 命令：`npm run test`
  - 结果：通过
  - 关键输出：
    - `Test Files 1 passed (1)`
    - `Tests 12 passed (12)`

## 阶段 1 验收结论
- [x] `next-intl` 依赖已安装。
- [x] 四个 i18n 基础模块已创建。
- [x] `next.config.mjs` 已接入 `next-intl/plugin`。
- [x] 构建与测试通过，静态导出能力未受影响。

## 备注
- 本阶段仅完成基础设施与配置接入。
- 翻译调用迁移（服务端 `getTranslation`、客户端 `useTranslation`）属于后续阶段 2/3/4。
