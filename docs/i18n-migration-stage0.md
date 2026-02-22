# i18n 迁移阶段 0 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行时间：15:51 CST
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 0）

## 阶段 0 目标
1. 新建迁移分支。
2. 记录迁移前基线构建结果（`npm run build`）。
3. 记录迁移前基线测试结果（`npm run test`）。
4. 建立迁移验收清单。

## 执行结果

### 1) 分支创建
- 命令：`git checkout -b chore/i18n-next-intl-migration`
- 结果：成功创建并切换到迁移分支。

### 2) 构建基线
- 命令：`npm run build`
- 结果：通过。
- 关键输出：
  - `Compiled successfully`
  - `Generating static pages ... (73/73)`
  - app 路由与多语言静态页面正常生成（`/en`、`/zh`、`/ja`、`/ko`）。

### 3) 测试基线
- 命令：`npm run test`
- 结果：通过。
- 关键输出：
  - `lib/match.test.ts (12 tests)`
  - `Test Files 1 passed (1)`
  - `Tests 12 passed (12)`

## 阶段 0 验收清单（已完成）
- [x] 已创建独立迁移分支。
- [x] 已记录构建基线状态（通过）。
- [x] 已记录测试基线状态（通过）。
- [x] 已建立后续迁移验收清单。

## 全量迁移验收清单（来自 plan.md 第 8 节）

### 功能验收
- [ ] 四语言首页、问卷页、结果页、指南页可正常渲染。
- [ ] 语言切换器行为与现状一致（路径替换、query/hash 保留）。
- [ ] quiz/result 页面不出现因 i18n 初始化导致的空白占位闪烁。
- [ ] 无 `MISSING_MESSAGE` 或 key 直接回显异常。

### 技术验收
- [ ] `npm run build` 通过。
- [ ] `npm run test` 通过。
- [ ] 全局检索不再存在 `react-i18next`、`i18next` 调用。
- [ ] 旧 i18n 文件已删除且无引用。

### SEO 验收
- [ ] `canonical` 与 `alternates.languages` 未回归。
- [ ] `og:locale` 与 `alternateLocale` 未回归。
- [ ] 路径结构保持 `/en|zh|ja|ko/...`。

## 备注
- 当前阶段仅完成迁移准备与基线固化，不包含业务代码迁移。
