# i18n 迁移阶段 2 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 2）

## 阶段 2 目标
1. 在 `app/[lang]/layout.tsx` 接入 `NextIntlClientProvider`。
2. 使用统一语言校验函数处理无效 `lang`。
3. 保留 `output: 'export'` 下的 `html[lang]` 设置策略。

## 执行结果

### 1) layout 接入 Provider
- 修改：`app/[lang]/layout.tsx`
- 关键改动：
  - 引入 `NextIntlClientProvider`。
  - 引入 `setRequestLocale`，在 layout 里设置当前 locale。
  - 调用 `getMessages(lang)` 注入 `messages` 到 Provider。

### 2) 统一语言校验
- 在 layout 中改为复用 `isUrlLocale`（来自 `i18n/locales.ts`）。
- 无效语言继续 `notFound()`，行为与迁移前一致。

### 3) 保留 html lang 注入策略
- 继续保留脚本注入 `document.documentElement.lang`。
- 注入值改为 `toContentLocale(lang)`，确保 `zh -> zh-CN` 保持一致。

### 4) 回归验证
- 命令：`npm run build`
  - 结果：通过
  - 关键输出：`Generating static pages ... (73/73)`
- 命令：`npm run test`
  - 结果：通过
  - 关键输出：`Test Files 1 passed (1)`，`Tests 12 passed (12)`

## 阶段 2 验收结论
- [x] `app/[lang]/layout.tsx` 已接入 `NextIntlClientProvider`。
- [x] 已使用统一语言校验函数。
- [x] `html[lang]` 注入策略保留且映射一致。
- [x] 构建与测试通过。

## 备注
- 本阶段仅完成 Provider 与 layout 层。
- 服务端/客户端翻译调用替换属于后续阶段 3、阶段 4。
