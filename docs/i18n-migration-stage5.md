# i18n 迁移阶段 5 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 5）

## 阶段 5 目标
1. 删除旧实现文件：`lib/i18n.ts`、`lib/i18n-client.ts`。
2. 移除旧依赖：`i18next`、`react-i18next`。
3. 全仓搜索并清理残留引用。

## 执行结果

### 1) 删除旧实现文件
- 已删除：`lib/i18n.ts`
- 已删除：`lib/i18n-client.ts`

### 2) 移除旧依赖
- 执行命令：`npm uninstall i18next react-i18next`
- 变更文件：`package.json`、`package-lock.json`
- 结果：`dependencies` 中已不再包含 `i18next`、`react-i18next`

### 3) 残留引用扫描
- 代码目录扫描命令：
  - `rg "i18next|react-i18next|ensureI18nLanguage|getTranslation\(" -n app components lib i18n pages`
- 结果：无匹配

- 全仓扫描命令：
  - `rg "i18next|react-i18next|ensureI18nLanguage|getTranslation\(" -n`
- 结果说明：仅文档与构建缓存文件命中（`plan.md`、`docs/*.md`、`tsconfig.tsbuildinfo` 等），业务代码目录无命中。

### 4) 依赖卸载确认
- `npm ls i18next react-i18next --depth=3` 输出为空依赖树（`(empty)`）
- `node_modules/i18next` 与 `node_modules/react-i18next` 均不存在

### 5) 可用性验证
- 命令：`npm run build`
  - 结果：通过
  - 关键输出：`Generating static pages ... (73/73)`
- 命令：`npm run test`
  - 结果：通过
  - 关键输出：`Test Files 1 passed (1)`，`Tests 12 passed (12)`

## 阶段 5 验收结论
- [x] 旧文件已删除。
- [x] 旧依赖已移除。
- [x] 业务代码目录无旧 i18n 残留引用。
- [x] 构建与测试通过。

## 备注
- 阶段 5 已完成清理工作。
- 后续阶段 6 可直接执行最终回归与发布准备。
