# QA-TASKS — 从 DEV-TASKS.md 抽取的测试相关内容

> 来源：`docs/DEV-TASKS.md`
> 状态标记：`[ ]` 待开始 · `[→]` 进行中 · `[x]` 已完成

---

## Phase 0｜项目初始化

- [x] **0-5** 初始化 Git 仓库，连接 Cloudflare Pages，配置自动部署（main 分支 push 即触发），验证部署流程可用

---

## Phase 1｜数据层与算法

- [x] **1-4** 编写算法单元测试，验证边界情况（全0分、全100分、混合答案）输出结果正确

---

## Phase 3｜移动端适配

- [x] **3-1** 验证移动端全局布局：以 375px 为基准，向上兼容至 430px
  - `index.html` 已有 `viewport-fit=cover`；页面在小屏设备下无横向溢出

- [x] **3-2** 检查所有可点击元素触控区域，选项卡片和导航按钮高度均 ≥ 52px
  - 所有选项卡片、Back / Next / Submit / CTA 按钮均已设 `min-h-[52px]`

- [x] **3-3** 确认关键操作按钮（Next / Submit / Start）在拇指自然触及范围内，底部安全区适配（`env(safe-area-inset-bottom)`）
  - `QuizPage` 底部 footer 改为 `pb-[max(1.5rem,env(safe-area-inset-bottom))]`
  - `index.css` html 层已有 `padding-bottom: env(safe-area-inset-bottom)` 覆盖可滚动页面

- [x] **3-4** 验证问卷页在所有尺寸下无横向滚动，题目与选项在一屏内可完整显示或自然纵向滚动
  - `index.css` body 增加 `overflow-x: hidden`；问卷页为 `flex-1 overflow-y-auto` 纵向可滚动

- [x] **3-5** 验证结果卡片截图效果：在 iPhone 14 / Samsung S23 上截图，主要信息不被状态栏遮挡，核心内容一屏呈现
  - 收紧卡片内竖向间距（`mb-5` → `mb-3`），核心内容（emoji / 城市名 / 匹配度 / tagline）可在 iPhone 14 一屏内呈现

- [x] **3-6** 性能优化：所有图片转 WebP 格式并配置懒加载；Lighthouse 移动端首屏得分目标 ≥ 85，加载时间 ≤ 2s（4G 网络）
  - 本应用无图片资源（仅 emoji），WebP 不适用
  - `App.tsx` 改用 `lazy()` + `Suspense` 按路由拆包，build 产出三个独立 page chunk（HomePage 1.4 kB / ResultPage 3.4 kB / QuizPage 17.5 kB）

---

## Phase 4｜多语言（i18n）

- [x] **4-6** 验证问卷进行中切换语言
  - LanguageSwitcher 从 `/en/quiz` 导航至 `/zh/quiz`，路由组件相同不卸载
  - `QuizPage` 的 `useState` 保留，答题进度和已选答案完整保留
  - 题目文本即时切换至目标语言

---

## Phase 5｜测试与上线

- [x] **5-1** 功能测试：完整跑通 18 题 → 算法计算 → 结果输出，验证 15 座城市各自能被正确匹配推荐（构造极端答案验证边界城市如敦煌/丽江）

- [x] **5-2** 多语言测试：4 种语言各自完整走一遍答题 + 结果流程，无乱码、无漏翻译占位符

- [x] **5-3** 移动端设备测试
  - iOS：Safari（iPhone 14 / iPhone SE）
  - Android：Chrome（Samsung / Pixel）
  - 重点验证：触控交互、截图区域、字体渲染

- [x] **5-4** 在 Cloudflare Pages 配置生产域名，验证 4 种语言 URL 路径（`/en/` `/zh/` `/ja/` `/ko/`）均可正常访问

- [x] **5-5** 生产环境冒烟测试：从分享链接进入 → 完成答题 → 查看结果 → 切换语言，全程无报错

---

## Phase 6｜桌面端重设计（Desktop First-Class）

- [x] **6-6** 响应式回归测试
  - Mobile（375/390/430）验证现有流程与截图表现不退化
  - Desktop（1024/1280/1440）验证分栏布局与信息层级生效
  - 覆盖 4 语言路径：`/en` `/zh` `/ja` `/ko`
  - 2026-02-19 补测结论：四语全链路（首页→问卷→结果）通过；移动端 `390x844` 结果页首屏核心信息通过
  - 截图：`/tmp/phase6-mobile-result-en.png`、`/tmp/phase6-mobile-result-zh.png`、`/tmp/phase6-mobile-result-ja.png`、`/tmp/phase6-mobile-result-ko.png`

---

## Phase 6A｜Landing Page（PRD 对齐）

- [x] **6A-Q1** 路由与入口策略验收（唯一 Landing 入口）
  - 测试路径：`/`、`/en`、`/zh`、`/ja`、`/ko`
  - 预期结果：均可进入对应语言 Landing；`/` 自动跳转 `/en`
  - 补充校验：访问 `/en/landing`、`/zh/landing` 等非支持路径，应回退到有效首页路径（不出现空白页/404）
  - 证据要求：每种语言首页截图 + 无效路径回退截图
  - 2026-02-19 实测：通过
  - 路由结果：`/tmp/phase6a/q1-routes.txt`
  - 截图：`/tmp/phase6a/q1-root.png`、`/tmp/phase6a/q1-en.png`、`/tmp/phase6a/q1-zh.png`、`/tmp/phase6a/q1-ja.png`、`/tmp/phase6a/q1-ko.png`、`/tmp/phase6a/q1-en-landing.png`、`/tmp/phase6a/q1-zh-landing.png`、`/tmp/phase6a/q1-ja-landing.png`、`/tmp/phase6a/q1-ko-landing.png`

- [x] **6A-Q2** Landing 信息架构验收（PRD 对齐）
  - 步骤：打开任一语言 Landing，按从上到下检查模块完整性
  - 预期模块：
    - Hero（价值主张 + 主 CTA）
    - 指标区（18 / 6 / 15）
    - 痛点区（3 张卡片）
    - 匹配机制区（模型说明 + 三步流程）
    - 城市预览 + 分享钩子
    - 底部二次 CTA
  - 证据要求：桌面整页截图 1 张 + 移动端分段截图 2 张
  - 2026-02-19 实测：通过（模块完整性脚本校验 `hero/metrics/pain/model/preview/finalCta = true`）
  - 截图：`/tmp/phase6a/q2-desktop-full-en.png`、`/tmp/phase6a/q2-mobile-top-en.png`、`/tmp/phase6a/q2-mobile-bottom-en.png`

- [x] **6A-Q3** CTA 交互链路验收
  - 步骤：
    - 点击 Hero 主 CTA
    - 回退后点击底部二次 CTA
  - 预期结果：
    - 两个 CTA 均跳转到当前语言的 `/:lang/quiz`
    - 不出现跳错语言、白屏或控制台报错
  - 覆盖语言：`/en` `/zh` `/ja` `/ko`
  - 证据要求：4 语言各提供 1 条跳转录屏或连续截图
  - 2026-02-19 实测：通过（8 条跳转均命中对应 `/:lang/quiz`）
  - 跳转结果：`/tmp/phase6a/q3-cta-results.txt`
  - 错误日志：`/tmp/phase6a/q3-errors.txt`（四语均空）
  - 连续截图：`/tmp/phase6a/q3-en-hero-cta.png`、`/tmp/phase6a/q3-en-final-cta.png`、`/tmp/phase6a/q3-zh-hero-cta.png`、`/tmp/phase6a/q3-zh-final-cta.png`、`/tmp/phase6a/q3-ja-hero-cta.png`、`/tmp/phase6a/q3-ja-final-cta.png`、`/tmp/phase6a/q3-ko-hero-cta.png`、`/tmp/phase6a/q3-ko-final-cta.png`

- [x] **6A-Q4** 响应式与可用性验收
  - 断点覆盖：`375x812`、`390x844`、`430x932`、`1024x768`、`1280x800`、`1440x900`
  - 预期结果：
    - `>=1280px` 首屏可同时看到主叙事和辅助信息（非窄列放大）
    - 移动端 CTA 可达、可点击，按钮高度符合触控要求（>=52px）
    - 页面无横向滚动，文本无裁切和重叠
  - 证据要求：每个断点至少 1 张截图
  - 2026-02-19 实测：通过（6 断点 `noOverflow=true`；`1280/1440` 首屏双栏并列）
  - CTA 校验：移动端 `375/390/430` 顶部 CTA 与底部 CTA 均可达且可点击跳转；主 CTA（`button.bg-sky-500`）高度 `60px`
  - 指标与结果：`/tmp/phase6a/q4-metrics.jsonl`、`/tmp/phase6a/q4-mobile-cta-results.txt`
  - 截图：`/tmp/phase6a/q4-375x812.png`、`/tmp/phase6a/q4-390x844.png`、`/tmp/phase6a/q4-430x932.png`、`/tmp/phase6a/q4-1024x768.png`、`/tmp/phase6a/q4-1280x800.png`、`/tmp/phase6a/q4-1440x900.png`

- [x] **6A-Q5** 多语言文案与内容完整性验收
  - 覆盖路径：`/en` `/zh` `/ja` `/ko`
  - 预期结果：
    - Landing 新增文案完整渲染，无 `{{key}}`、`home.xxx` 等占位符
    - 城市名称保持拼音英文（如 `Xi'an`、`Chengdu`）
    - 语言切换后页面内容即时刷新且结构不丢失
  - 证据要求：四语各 1 张首屏截图 + 1 条语言切换录屏
  - 2026-02-19 实测：通过（四语 `hasPlaceholder=false`、`hasHomeKey=false`、`hasXian=true`、`hasChengdu=true`）
  - 文案校验：`/tmp/phase6a/q5-lang-checks.txt`
  - 截图：`/tmp/phase6a/q5-en-hero.png`、`/tmp/phase6a/q5-zh-hero.png`、`/tmp/phase6a/q5-ja-hero.png`、`/tmp/phase6a/q5-ko-hero.png`
  - 录屏：`/tmp/phase6a/q5-lang-switch.webm`（EN→ZH→JA→KO）

- [x] **6A-Q6** 埋点事件验收（最小可用）
  - 前置：在浏览器控制台执行 `window.dataLayer = []`
  - 步骤：
    - 打开 `/en?utm_source=tiktok`（验证 `view_landing`）
    - 点击 Hero CTA（验证 `click_start_quiz`，`section=hero`）
    - 返回 Landing 后点击底部 CTA（验证 `click_start_quiz`，`section=final`）
    - 进入问卷页（验证 `view_quiz`）
  - 预期事件：`view_landing`、`click_start_quiz`、`view_quiz`
  - 预期字段：`lang`、`utm_source`、`path`（`click_start_quiz` 额外含 `section`）
  - 证据要求：`window.dataLayer` 截图（包含完整事件对象）
  - 2026-02-19 实测：通过（事件与字段齐全，`click_start_quiz` 同时覆盖 `section=hero/final`）
  - 数据证据：`/tmp/phase6a/q6-datalayer-clean.json`
  - 截图证据：`/tmp/phase6a/q6-datalayer.png`
  - 说明：本地 dev 环境出现重复 `view_landing/view_quiz`，与 React `StrictMode` 双调用行为一致，不影响事件字段校验

- [x] **6A-Q7** 回归影响面验收（Landing 改动后的主链路）
  - 步骤：每种语言执行 `Landing -> Quiz（答 1 题）-> Result guard`
  - 预期结果：
    - 进入 Quiz 后题目正常渲染，交互可用
    - 直接访问 `/:lang/result`（无 state）仍正确回跳 `/:lang/quiz`
  - 证据要求：4 语言各 1 组关键截图
  - 2026-02-19 实测：通过（四语均完成“答 1 题 + guard 回跳”）
  - 结果：`/tmp/phase6a/q7-results.txt`
  - 截图：`/tmp/phase6a/q7-en-quiz-answered.png`、`/tmp/phase6a/q7-en-result-guard.png`、`/tmp/phase6a/q7-zh-quiz-answered.png`、`/tmp/phase6a/q7-zh-result-guard.png`、`/tmp/phase6a/q7-ja-quiz-answered.png`、`/tmp/phase6a/q7-ja-result-guard.png`、`/tmp/phase6a/q7-ko-quiz-answered.png`、`/tmp/phase6a/q7-ko-result-guard.png`

### Phase 6A｜交接给测试同事（执行说明）

- [x] **6A-H1** 测试执行顺序
  - 建议顺序：`6A-Q1 -> 6A-Q2 -> 6A-Q3 -> 6A-Q4 -> 6A-Q5 -> 6A-Q6 -> 6A-Q7`
  - 执行环境：优先 `https://city-in-china-to-visit.pages.dev`，如需调试埋点可用本地 `npm run dev`
  - 2026-02-19 执行记录：本轮已按建议顺序在本地 `http://127.0.0.1:4173` 完成

- [x] **6A-H2** 缺陷提报格式
  - 必填字段：页面路径、语言、设备/分辨率、浏览器、复现步骤、预期、实际、截图/录屏
  - 埋点问题请附：`dataLayer` 事件对象截图（至少包含事件名和字段）
  - 2026-02-19 执行记录：本轮无 Blocker/Critical 缺陷；埋点证据已按要求附截图与 JSON

- [x] **6A-H3** 完成标准
  - `6A-Q1 ~ 6A-Q7` 全部执行并回填结果
  - 无阻塞级问题（Blocker/Critical）
  - 如有中低优先级问题，需附修复建议和复测入口
  - 2026-02-19 结论：达到完成标准，可交由测试同事复核与开发同事进入下一阶段

---

## Phase 6A｜Landing Header/Footer 增量测试

- [x] **6A-HF1** Header 结构与可见性验收
  - 覆盖路径：`/en` `/zh` `/ja` `/ko`
  - 预期结果：
    - 顶部存在 sticky Header，包含品牌区、语言切换器、顶部 CTA
    - 桌面端（`>=1024px`）显示区块导航按钮；移动端不出现布局错位或重叠
    - 向下滚动后 Header 持续可见，不遮挡主要交互区域
    - 点击语言切换器后，下拉列表完整可见，不被 Header 容器裁切
  - 证据要求：桌面 + 移动各 1 张截图（每种语言至少 1 组）
  - 2026-02-19 实测：通过（四语 `headerExists=true`、`headerPosition=sticky`、`stickyAfterScroll=true`、`noHorizontalOverflow=true`；桌面端区块导航入口完整；语言下拉完整显示无裁切）
  - 结果：`/tmp/phase6a-hf/hf1-header-checks.jsonl`
  - 截图：`/tmp/phase6a-hf/hf1-en-desktop-top.png`、`/tmp/phase6a-hf/hf1-en-mobile-top.png`、`/tmp/phase6a-hf/hf1-zh-desktop-top.png`、`/tmp/phase6a-hf/hf1-zh-mobile-top.png`、`/tmp/phase6a-hf/hf1-ja-desktop-top.png`、`/tmp/phase6a-hf/hf1-ja-mobile-top.png`、`/tmp/phase6a-hf/hf1-ko-desktop-top.png`、`/tmp/phase6a-hf/hf1-ko-mobile-top.png`

- [x] **6A-HF2** Footer 结构与交互验收
  - 覆盖路径：`/en` `/zh` `/ja` `/ko`
  - 预期结果：
    - Footer 显示价值文案、页内跳转入口、二次 CTA、版权信息
    - Footer CTA 点击后进入当前语言 `/:lang/quiz`
    - 版权年份显示当前年份（2026）且文案无占位符
  - 证据要求：四语 Footer 截图 + 4 语言 CTA 跳转结果记录
  - 2026-02-19 实测：通过（四语 Footer 结构完整；`2026` 年份显示正确；占位符校验通过）
  - 结果：`/tmp/phase6a-hf/hf2-footer-checks.jsonl`、`/tmp/phase6a-hf/hf2-footer-cta-results.txt`
  - 截图：`/tmp/phase6a-hf/hf2-en-footer.png`、`/tmp/phase6a-hf/hf2-zh-footer.png`、`/tmp/phase6a-hf/hf2-ja-footer.png`、`/tmp/phase6a-hf/hf2-ko-footer.png`

- [x] **6A-HF3** Header/Footer 锚点导航验收
  - 覆盖入口：
    - Header：`City Preview / Why This Quiz / How Matching Works`（对应四语文案）
    - Footer：页内跳转区块按钮
  - 预期结果：
    - 点击后跳转到对应区块（`#landing-preview` / `#landing-pain` / `#landing-model`）
    - 区块标题不被 sticky Header 遮挡（`scroll-mt` 生效）
    - 多次点击往返不出现抖动、白屏或控制台报错
  - 证据要求：桌面录屏 1 条 + 移动录屏 1 条（含至少 2 次锚点跳转）
  - 2026-02-19 实测：通过（四语桌面/移动均可命中 3 个锚点；`notCovered=true`，未出现遮挡、白屏或 page error）
  - 结果：`/tmp/phase6a-hf/hf3-anchor-results.jsonl`、`/tmp/phase6a-hf/hf3-errors.txt`
  - 录屏：`/tmp/phase6a-hf/hf3-anchor-desktop.webm`、`/tmp/phase6a-hf/hf3-anchor-mobile.webm`

- [x] **6A-HF4** 埋点扩展验收（CTA section 新增来源）
  - 前置：在浏览器控制台执行 `window.dataLayer = []`
  - 步骤：
    - 访问 `/en?utm_source=tiktok`
    - 点击 Header 顶部 CTA（预期 `click_start_quiz`，`section=header`）
    - 返回 Landing 后滚动到底部点击 Footer CTA（预期 `click_start_quiz`，`section=footer`）
  - 预期结果：
    - 事件对象包含：`event_name`、`lang`、`utm_source`、`path`、`section`
    - `section` 至少覆盖 `header` 与 `footer`（并保持既有 `hero` / `final` 不回退）
  - 证据要求：`dataLayer` 完整对象截图 + 导出 JSON
  - 2026-02-19 实测：通过（`click_start_quiz.section` 覆盖 `header/footer`，且保留 `hero/final`；事件字段完整）
  - 数据证据：`/tmp/phase6a-hf/hf4-datalayer.json`、`/tmp/phase6a-hf/hf4-sections.txt`
  - 截图证据：`/tmp/phase6a-hf/hf4-datalayer.png`
  - 说明：本地 dev 环境存在 `view_landing/view_quiz` 重复，符合 React `StrictMode` 双调用现象，不影响字段完整性校验

- [x] **6A-HF5** 多语言文案完整性验收（Header/Footer 新增 key）
  - 覆盖路径：`/en` `/zh` `/ja` `/ko`
  - 预期结果：
    - 新增 `home.header.*` 与 `home.footer.*` 文案在四语均完整显示
    - 页面无 `{{key}}`、`home.header.xxx`、`home.footer.xxx` 占位符残留
    - 语言切换后 Header/Footer 文案即时刷新
  - 证据要求：四语首屏截图 + 四语 Footer 截图 + 语言切换录屏
  - 2026-02-19 实测：通过（四语 Header/Footer 文案均完整；无 `{{key}}` 与 `home.header/footer` 占位符；语言切换即时刷新）
  - 结果：`/tmp/phase6a-hf/hf5-lang-checks.txt`
  - 截图：`/tmp/phase6a-hf/hf5-en-top.png`、`/tmp/phase6a-hf/hf5-en-footer.png`、`/tmp/phase6a-hf/hf5-zh-top.png`、`/tmp/phase6a-hf/hf5-zh-footer.png`、`/tmp/phase6a-hf/hf5-ja-top.png`、`/tmp/phase6a-hf/hf5-ja-footer.png`、`/tmp/phase6a-hf/hf5-ko-top.png`、`/tmp/phase6a-hf/hf5-ko-footer.png`
  - 录屏：`/tmp/phase6a-hf/hf5-language-switch.webm`

- [x] **6A-HF6** Landing 主链路增量回归
  - 步骤：每种语言执行 `Landing（Header CTA） -> Quiz（答 1 题） -> 返回 Landing（Footer CTA） -> Quiz`
  - 预期结果：
    - Header/Footer 新增结构不影响问卷进入与答题状态交互
    - 进入 Quiz 后题目正常渲染，按钮可点击，无白屏/报错
  - 证据要求：四语各 1 组连续截图
  - 2026-02-19 实测：通过（四语均完成双入口进入 Quiz；题目渲染正常；无 page error）
  - 结果：`/tmp/phase6a-hf/hf6-regression-results.txt`、`/tmp/phase6a-hf/hf6-answer-next-checks.txt`
  - 截图：`/tmp/phase6a-hf/hf6-en-landing.png`、`/tmp/phase6a-hf/hf6-en-quiz-after-header.png`、`/tmp/phase6a-hf/hf6-en-quiz-after-footer.png`、`/tmp/phase6a-hf/hf6-zh-landing.png`、`/tmp/phase6a-hf/hf6-zh-quiz-after-header.png`、`/tmp/phase6a-hf/hf6-zh-quiz-after-footer.png`、`/tmp/phase6a-hf/hf6-ja-landing.png`、`/tmp/phase6a-hf/hf6-ja-quiz-after-header.png`、`/tmp/phase6a-hf/hf6-ja-quiz-after-footer.png`、`/tmp/phase6a-hf/hf6-ko-landing.png`、`/tmp/phase6a-hf/hf6-ko-quiz-after-header.png`、`/tmp/phase6a-hf/hf6-ko-quiz-after-footer.png`

### Phase 6A｜Header/Footer 增量交接给测试同事（执行说明）

- [x] **6A-HF-H1** 测试执行顺序
  - 建议顺序：`6A-HF1 -> 6A-HF2 -> 6A-HF3 -> 6A-HF4 -> 6A-HF5 -> 6A-HF6`
  - 执行环境：优先 `https://city-in-china-to-visit.pages.dev`（若埋点调试受限，可补充本地 `npm run dev`）
  - 2026-02-19 执行记录：线上 `https://city-in-china-to-visit.pages.dev` 未同步 Header/Footer 增量（无 `header/footer` 节点），本轮在本地 `http://127.0.0.1:4173` 完成全量验收

- [x] **6A-HF-H2** 缺陷提报格式
  - 必填字段：页面路径、语言、设备/分辨率、浏览器、复现步骤、预期、实际、截图/录屏
  - 埋点问题需附：`dataLayer` 事件对象截图（至少包含 `event_name` 与 `section`）
  - 2026-02-19 执行记录：本轮无 Blocker/Critical 缺陷；埋点证据已附 JSON 与截图

- [x] **6A-HF-H3** 完成标准
  - `6A-HF1 ~ 6A-HF6` 全部执行并回填结果
  - 无阻塞级问题（Blocker/Critical）
  - 如有中低优先级问题，需附修复建议与复测入口
  - 2026-02-19 结论：达到完成标准，可交由测试同事复核

---

## Phase 7｜变现接入

- [ ] **7-5** 验收：检查 15 座城市的 Affiliate 链接全部可正常跳转，城市与链接一一对应无误

- [ ] **7-6** 验收：在移动端截图结果卡片，确认 Affiliate 区块和广告位均不出现在截图范围内
