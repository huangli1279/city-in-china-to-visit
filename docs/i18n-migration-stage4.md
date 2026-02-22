# i18n 迁移阶段 4 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 4）

## 阶段 4 目标
1. 客户端组件从 `useTranslation` 迁移到 `useTranslations`。
2. 删除 `ensureI18nLanguage` 与 `i18nReady` 门控逻辑。
3. 保持问卷/结果页交互与文案行为一致。

目标文件：
- `components/QuizClient.tsx`
- `components/ResultClient.tsx`
- `components/ProgressBar.tsx`

## 执行结果

### 1) 客户端翻译 API 切换
- `components/QuizClient.tsx`
  - `useTranslation('common')` -> `useTranslations('common')`
  - 新增 `useTranslations('questions')`，通过 `tQuestions.raw('questions')` 读取题目数组
- `components/ResultClient.tsx`
  - `useTranslation('common')` -> `useTranslations('common')`
  - 新增 `useTranslations('cities')`，通过 `tCities.raw('cities')` 读取城市文案
- `components/ProgressBar.tsx`
  - `useTranslation('common')` -> `useTranslations('common')`

### 2) 删除旧 i18n 客户端初始化依赖
- 已移除 `ensureI18nLanguage` 调用。
- 已移除 `i18nReady` 状态与等待逻辑。
- `QuizClient` 不再出现首屏 i18n 准备占位。
- `ResultClient` 仅在无结果时显示占位并执行重定向。

### 3) 占位符兼容处理（保证现有文案可用）
- 现有 JSON 文案使用 i18next 风格占位符（如 `{{current}}`）。
- `next-intl` 使用 ICU 风格（如 `{current}`）。
- 为保持现有文案文件不改动，本阶段在 `i18n/messages.ts` 增加递归转换：
  - 字符串中 `{{var}}` 自动转换为 `{var}`
  - 作用于对象/数组嵌套结构

## 验证
- 命令：`npm run build`
  - 结果：通过
  - 关键输出：`Generating static pages ... (73/73)`
- 命令：`npm run test`
  - 结果：通过
  - 关键输出：`Test Files 1 passed (1)`，`Tests 12 passed (12)`

## 阶段 4 验收结论
- [x] 3 个客户端组件已迁移到 `next-intl` Hook。
- [x] `ensureI18nLanguage` 与 `i18nReady` 门控逻辑已移除。
- [x] 客户端对象/数组翻译读取使用 `t.raw(...)`。
- [x] 旧占位符语法已做兼容转换，避免运行时 `INVALID_MESSAGE`。
- [x] 构建与测试通过。

## 备注
- 阶段 4 完成后，客户端页面已不再依赖 `react-i18next` 运行时。
- 旧实现清理与依赖移除将在阶段 5 统一处理。
