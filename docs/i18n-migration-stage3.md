# i18n 迁移阶段 3 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 3）

## 阶段 3 目标
将服务端页面中的 `getTranslation(lang, namespace)` 调用迁移到 `next-intl/server`。

目标文件：
- `app/[lang]/page.tsx`
- `app/[lang]/quiz/page.tsx`
- `app/[lang]/result/page.tsx`
- `app/[lang]/guides/page.tsx`
- `app/[lang]/guides/[slug]/page.tsx`

## 执行结果

### 1) 服务端翻译 API 切换
- 全部目标页面已改为使用 `getTranslations`（`next-intl/server`）。
- 对象/数组类型文案改用 `t.raw(...)` 获取，避免将非字符串内容通过 `t(...)` 读取。

### 2) 关键行为保持
- 首页、问卷页、结果页继续按语言路径输出 metadata。
- `inLanguage` 统一通过 `toContentLocale(...)` 处理，保持 `zh -> zh-CN` 映射一致。
- 页面语言校验在需要处改为复用 `isUrlLocale(...)` / `normalizeUrlLocale(...)`。

### 3) 文件级变更摘要
- `app/[lang]/page.tsx`
  - `getTranslation` -> `getTranslations`
  - `home.metrics/home.footer/home.faq` 等对象字段改为 `t.raw(...)`
  - 城市文案映射改为读取 `cities` namespace 的 `t.raw('cities')`
- `app/[lang]/quiz/page.tsx`
  - metadata 读取改为 `getTranslations({locale, namespace:'common'})`
- `app/[lang]/result/page.tsx`
  - metadata 读取改为 `getTranslations({locale, namespace:'common'})`
- `app/[lang]/guides/page.tsx`
  - `home.topicCluster`、`home.header`、`home` 改为 `t.raw(...)`
- `app/[lang]/guides/[slug]/page.tsx`
  - metadata 与页面主体翻译读取迁移到 `getTranslations`
  - `home.topicCluster`、`home.header`、`home` 改为 `t.raw(...)`

### 4) 回归验证
- 命令：`npm run build`
  - 结果：通过
  - 关键输出：`Generating static pages ... (73/73)`
- 命令：`npm run test`
  - 结果：通过
  - 关键输出：`Test Files 1 passed (1)`，`Tests 12 passed (12)`

## 阶段 3 验收结论
- [x] 目标 5 个页面已迁移至 `next-intl/server`。
- [x] metadata 与页面渲染均能正常读取翻译。
- [x] 对象/数组翻译读取已改为 `t.raw(...)`。
- [x] 构建与测试通过。

## 备注
- 阶段 3 已完成服务端翻译链路迁移。
- `lib/i18n.ts` 仍保留，待阶段 5 统一清理。
