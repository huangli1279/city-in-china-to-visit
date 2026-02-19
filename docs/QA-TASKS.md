# QA-TASKS — 从 TASKS.md 抽取的测试相关内容

> 来源：`docs/TASKS.md`
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

## Phase 7｜变现接入

- [ ] **7-5** 验收：检查 15 座城市的 Affiliate 链接全部可正常跳转，城市与链接一一对应无误

- [ ] **7-6** 验收：在移动端截图结果卡片，确认 Affiliate 区块和广告位均不出现在截图范围内
