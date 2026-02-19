# QA HANDOFF — Phase 5 / Phase 6 测试复盘

> 文档用途：交付开发/测试同事，复盘本轮 Phase 5 自动化验收与 Phase 6 回归过程  
> 执行日期：2026-02-19  
> 执行环境：本地开发服 `http://localhost:5173`（Vite）  
> 执行工具：`npx agent-browser`（自动化浏览器）

---

## 1. 测试范围与目标

本次覆盖两个阶段：

- 5-1 功能测试（18题→算法→结果）
- 5-2 多语言测试（EN/ZH/JA/KO）
- 5-3 移动端适配测试（iPhone 14 / iPhone SE / Galaxy S23 / Pixel 7 等效视口）
- 5-4 URL 路由与刷新验证
- 5-5 冒烟流程（入口→答题→结果→切语言→重测）
- 6-6 响应式回归测试（桌面断点 / 移动断点 / 多语言路径）

---

## 2. 执行方式

- 使用 `agent-browser` 自动化完成页面导航、作答、语言切换、路由验证、错误日志检查。
- 关键场景使用独立 `session`，避免路由 state 污染。
- 移动端采用等效视口验证交互与布局指标：
  - iPhone 14: `390x844`
  - iPhone SE 3: `375x667`
  - Galaxy S23: `393x852`
  - Pixel 7: `412x915`

---

## 3. 测试结果汇总

## 3.1 Phase 5-1 功能测试

- 正常流程：通过
  - 18 题可完成，结果页展示主推荐 + 2 个备选。
  - 样例结果：`Beijing 82%`，备选 `Xi'an / Harbin`。
- 匹配度范围：通过
  - 所有实测结果均在 `0-100%`。
- 边界城市（敦煌）：通过
  - 用例命中：`Dunhuang 85%`。
- 边界城市（上海）：通过（修正文档后）
  - 使用 `Q12-A` 命中：`Shanghai 78%`。
  - 原文档写法 `Q12-D` 实测会得到 `Shenzhen 84%`，已修正文档。
- 第 18 题按钮：通过
  - 最后一题按钮为 `See My City`。
- 直接访问结果页 guard：通过
  - 无 state 访问 `/en/result` 自动跳转 `/en/quiz`。

## 3.2 Phase 5-2 多语言测试

- EN/ZH/JA/KO 首页→问卷→结果全流程：通过
- 占位符与漏翻译：通过（未发现 `{{key}}` 残留）
- 语言切换 URL 首段：通过（`/en -> /zh -> /ja -> /ko`）
- 第10题切语言保进度：通过
  - `Question 10 / 18`（EN）切换后变为 `第 10 题 / 共 18 题`（ZH），题号不重置，答案保留。
- 字体渲染：通过
  - 字体栈为 `"Noto Sans", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR"...`，CJK 显示正常。

## 3.3 Phase 5-3 移动端测试

- 首页 CTA 可见、可点：通过
- 无横向滚动：通过（4 个视口均无 overflow-x）
- 触控区高度：通过
  - 选项最小高度约 `60px`
  - 导航按钮最小高度约 `56px`
  - 均满足 `>=52px`
- 底部安全区与按钮可见性：通过
- iPhone 14 结果页一屏核心信息：通过
  - 城市名、匹配度、tagline 均在首屏可见。
  - 截图文件：`/tmp/phase5-iphone14-result.png`

## 3.4 Phase 5-4 路由与刷新

本地验证通过：

- `/` -> `/en`
- `/en` `/zh` `/ja` `/ko` 可访问
- `/en/quiz` `/zh/quiz` 可访问
- `/en/result`（无state）-> `/en/quiz`
- `/xyz` -> `/en`
- 刷新 `/zh/quiz` 正常
- 刷新 `/ko/result`（无state）-> `/ko/quiz`

并确认 `public/_redirects` 为：

```txt
/* /index.html 200
```

## 3.5 Phase 5-5 冒烟测试

四语均完成：

1. 进入首页  
2. 完成 18 题  
3. 查看结果  
4. 在结果页切换语言  
5. 点击重新测试

结果：全部通过，页面错误日志为空（`agent-browser errors` 无异常项）。

---

## 4. 发现并修复的问题

### QA-01 结果页无 state 未自动跳转

- 现象：直接访问 `/en/result` 时仅显示提示，不自动跳转 quiz。
- 影响：不符合 Phase 5 验收标准。
- 修复：`src/pages/ResultPage.tsx`
  - 改为在无结果 state 时立即 `navigate(..., { replace: true })` 到 `/:lang/quiz`。

### QA-02 URL 语言前缀直达时语言不同步

- 现象：访问 `/zh` `/ja` `/ko` 时可能仍显示 EN。
- 影响：多语言验收失败风险。
- 修复：
  - `src/components/LangLayout.tsx`：增强 URL→i18n 同步，加入归一化判断（`zh` -> `zh-CN`）。
  - `src/components/LanguageSwitcher.tsx`：使用 `resolvedLanguage` 归一化当前语言显示。

### QA-03 结果页切换语言后丢失结果 state

- 现象：结果页切语言会跳到目标语言 quiz（state 丢失）。
- 影响：与“结果页切语言验证文案”目标冲突。
- 修复：`src/components/LanguageSwitcher.tsx`
  - 切换语言时 `navigate(..., { state: location.state })` 保留路由 state。

### QA-04 上海边界用例步骤与题库不一致

- 现象：文档中 `Q12-D` 预期上海，但实测命中深圳。
- 根因：当前题库中 Q12 选项分值与文档场景描述不一致。
- 处理：已修正文档为 `Q12-A`。
  - 文件：`docs/DEV-HANDOFF.md:114`

---

## 5. 本轮变更文件

- `src/pages/ResultPage.tsx`
- `src/components/LangLayout.tsx`
- `src/components/LanguageSwitcher.tsx`
- `docs/DEV-HANDOFF.md`
- `docs/TASKS.md`（Phase 5 已标记完成）

---

## 6. 风险与后续建议

- 本次 5-4/5-5 主要基于本地开发服完成，建议上线 Cloudflare Pages 域名后再做一次生产回归（重点看 CDN 缓存、刷新路由、跨语言深链）。
- 移动端目前为等效视口验证，建议补充真机 Safari/Chrome 手测一次触控与截图效果。

---

## 7. 结论（Phase 5）

Phase 5 在当前代码状态下已可验收通过，阻断性问题已修复；交接文档中的上海边界用例也已同步更正，可直接用于后续测试与上线回归。

---

## 8. Phase 6 回归测试复盘（依据 `docs/DEV-HANDOFF.md` / `docs/TASKS.md`）

### 8.1 覆盖目标

对 `Phase 6-6` 的核心验收点进行自动化回归：

- 桌面端断点布局（`1024 / 1280 / 1440`）
- 问卷页右侧摘要移除后的结构确认
- 交互可访问性（键盘 `Tab` + `focus-visible`）
- 移动端等效视口（`375 / 390 / 430`）横向溢出与核心按钮尺寸
- 多语言路径回归（`/en /zh /ja /ko`）

### 8.2 执行过程（按实际顺序）

1. 先验证桌面端首页、问卷页、结果页在 `1280` 下是否为分栏结构。  
2. 切换到 `1440` 验证宽屏不再呈现 `480px` 窄列居中。  
3. 在 `1024` 下复测三页分栏，确保最小桌面断点成立。  
4. 使用键盘 `Tab` 导航验证焦点样式（`focus-visible`）是否可见。  
5. 在 `375 / 390 / 430` 三个移动宽度检查无横向滚动和主按钮高度。  
6. 尝试继续执行多语言与结果页移动端首屏补测时，出现 `npx` 网络解析失败（`ENOTFOUND registry.npmjs.org`）及 socket 目录权限异常，导致后续自动化中断。

### 8.3 实测结果

#### A. 桌面端布局与结构

- 通过：`/en` 首页  
  - `1280`：`homeColumns=2`，`rootWidth=1280`，存在右侧城市预览模块  
  - `1440`：`rootWidth=1280`，`narrowLikeMobile=false`
- 通过：`/en/quiz` 问卷页  
  - `1024`：`columns=2`（左导航 + 中主区）  
  - 无“当前选择 / 当前匹配领先”文案（右侧摘要已移除）
- 通过：`/en/result` 结果页  
  - `1024`：`columns=2`  
  - `1280`：`resultColumns=2`，并能读取 `runner-ups` 与 `quick facts` 区块

#### B. 可访问性（键盘）

- 通过：`Tab` 后焦点落在题号按钮，`boxShadow`/`outline` 可见（`focus-visible` 生效）。

#### C. 移动端回归

- 通过：`375 / 390 / 430` 三档均 `noOverflow=true`（无横向溢出）。  
- 通过：主操作按钮高度均为 `52px`（满足 `>=52px`）。  
- 观察项：`375/390` 下首屏时底部操作区不一定立即进入视口（`430` 下为可见），建议在 `6-6` 人工回归中确认是否符合产品预期。

#### D. 多语言路径

- 未完成：本轮未能完成 `EN/ZH/JA/KO` 全量回归（自动化执行被环境问题中断）。

### 8.5 结论（Phase 6）

- 已完成并通过：桌面端核心结构、宽屏可读性、问卷右栏移除、键盘焦点样式、移动端无横向溢出与按钮高度。  
- 未完成项：多语言全路径回归、移动端结果页首屏截图完整性补测。  
- 因此当前建议：`docs/TASKS.md` 的 `6-6` 继续保持未勾选，待补完阻塞项后再闭环。
