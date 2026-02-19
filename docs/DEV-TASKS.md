# TASKS — Which Chinese City Matches Your Vibe?
### 任务执行文档 v1.0

> 依据 `PRD.md` 拆解，按阶段顺序执行
> 状态标记：`[ ]` 待开始 · `[→]` 进行中 · `[x]` 已完成
> 测试/验证/验收相关任务已迁移至 `docs/QA-TASKS.md`

---

## Phase 0｜项目初始化

> 目标：搭建可运行的空项目骨架，所有工程基础到位

- [x] **0-1** 创建 React + Vite 项目，安装并配置 Tailwind CSS
- [x] **0-2** 配置 React Router，建立三条路由：`/` 首页、`/quiz` 问卷页、`/result` 结果页
- [x] **0-3** 安装并初始化 `react-i18next`，建立 `src/locales/` 目录结构（`en / zh-CN / ja / ko`，每个语言下 `common.json` / `questions.json` / `cities.json`）
- [x] **0-4** 引入 Google Fonts Noto Sans 字体族（`Noto Sans SC` / `Noto Sans JP` / `Noto Sans KR`），配置 Tailwind 字体变量

---

## Phase 1｜数据层与算法

> 目标：所有静态数据和核心算法就绪，可独立跑通匹配逻辑

- [x] **1-1** 编写 15 座城市完整数据文件（`src/data/cities.ts`）
  - 每座城市包含：`id` / `name` / `label` / `emoji` / `tagline` / `description` / `bestTime` / `budgetRange` / 六维得分 `scores`
  - 数据来源：PRD 三、四、七章

- [x] **1-2** 编写 18 道题目数据文件（`src/data/questions.ts`）
  - 每题包含：`id` / `dimension` / `text` / `options[]`（每个选项含 `text` 和 `score`）
  - 数据来源：PRD 五章

- [x] **1-3** 实现匹配算法（`src/utils/match.ts`）
  - Step 1：`calcUserScores(answers)` — 按维度取选项分值均值，返回六维得分
  - Step 2：`calcMatchPercentage(userScores, cityScores)` — L1 距离，公式 `(1 - Σ|u-c| / 600) × 100`
  - Step 3：`getRankedCities(userScores)` — 对 15 座城市排序，返回完整排名数组

- [x] **1-5** 填写英文 locale 文件（`en/common.json` / `en/questions.json` / `en/cities.json`）
  - `common.json`：所有 UI 固定文案（按钮、进度提示、标题、说明文字等）
  - `questions.json`：18 道题目文本 + 4 个选项文本
  - `cities.json`：15 座城市的 tagline 和详细描述文案

---

## Phase 2｜核心页面开发

> 目标：三个页面完整可用，英文版全流程跑通

### 首页（`/`）

- [x] **2-1** 实现首页布局
  - 产品 slogan 大标题
  - 副文案（How it works 简要说明）
  - 「Start the Quiz」CTA 按钮，点击跳转 `/quiz`

- [x] **2-2** 实现语言切换器组件（全局复用）
  - 位于页面右上角，显示当前语言国旗 emoji + 缩写（如 `🇬🇧 EN`）
  - 点击展开下拉菜单，列出 4 种语言
  - 切换后即时刷新文本，不重置路由和答题状态

### 问卷页（`/quiz`）

- [x] **2-3** 实现顶部进度条组件
  - 显示「Question X / 18」+ 百分比
  - 进度条固定在页面顶部，答题过程中始终可见

- [x] **2-4** 实现题目展示组件
  - 渲染当前题目文本
  - 4 个选项以卡片形式竖向排列
  - 点击选项后：高亮选中态（蓝色边框 + 背景色变化），激活「Next」按钮

- [x] **2-5** 实现答题导航逻辑
  - 「Back」按钮：返回上一题，已选答案保留
  - 「Next」按钮：未选答案时禁用，选后可点击
  - 最后一题将「Next」替换为「See My City」提交按钮

- [x] **2-6** 实现提交逻辑
  - 点击「See My City」，调用 `getRankedCities()` 计算结果
  - 将 Best Match（第 1 名）和 Runner-ups（第 2、3 名）通过 Router state 传递
  - 跳转至 `/result`

### 结果页（`/result`）

- [x] **2-7** 实现最佳匹配城市卡片
  - 展示：城市 Emoji、城市名、英文标签、匹配百分比（大字突出）、Tagline、详细描述
  - 卡片需满足「一屏可截图」要求（城市名 ≥ 32px，匹配度 ≥ 48px）

- [x] **2-8** 实现备选城市展示（2nd & 3rd）
  - 每个城市展示：Emoji + 城市名 + 匹配百分比 + Tagline
  - 紧凑卡片布局，位于主卡片下方

- [x] **2-9** 实现实用信息展示
  - Best time to visit + Budget range（来自城市数据）
  - 位于结果卡片底部，小字提示样式

- [x] **2-10** 实现「Retake the Quiz」按钮，点击清空答案，跳回 `/quiz` 第一题

---

## Phase 4｜多语言（i18n）

> 目标：英语之外 3 种语言全流程可用，自动检测语言生效

- [x] **4-1** 中文（zh-CN）翻译
  - `common.json`：UI 固定文案（含 howItWorksTitle / step1-3）
  - `questions.json`：18 道题目 + 选项
  - `cities.json`：15 座城市 tagline + 描述

- [x] **4-2** 日语（ja）翻译
  - `common.json` / `questions.json` / `cities.json`
  - 城市英文标签（The Ancient 等）保留英文，tagline / 描述均日语本地化

- [x] **4-3** 韩语（ko）翻译
  - `common.json` / `questions.json` / `cities.json`
  - 城市英文标签保留英文，tagline / 描述均韩语本地化

- [x] **4-4** ~~实现浏览器语言自动检测~~ 已调整为默认英语，用户手动切换
  - 移除 `i18next-browser-languagedetector`，`i18n.ts` 固定 `lng: 'en'`

- [x] **4-5** 实现 URL 路径前缀路由（`/en/` `/zh/` `/ja/` `/ko/`）
  - 根路径 `/` 自动重定向至 `/en`
  - `LangLayout` 组件读取 `:lang` 参数并同步 i18n
  - `LanguageSwitcher` 切换时替换 URL 首段，保留当前页路径
  - `public/_redirects` 配置 Cloudflare Pages SPA 路由

---

## Phase 6｜桌面端重设计（Desktop First-Class）

> 目标：桌面端形成独立视觉语言与交互节奏，不再是移动端放大版
> 前置条件：`docs/QA-TASKS.md` 的 Phase 5 完成

- [x] **6-1** 建立桌面端布局基线与设计 token
  - 断点规范：`<768` / `768-1023` / `>=1024` / `>=1280`
  - 内容宽度：桌面主内容区 `1120–1280px`
  - 新增桌面 spacing、card 层级、hover/focus-visible 规范
  - 已实现：`App.tsx` 容器改为 `max-w-shell(1280px)` + 响应式内边距；`index.css` 新增 `surface-card / surface-muted / focus-ring` 设计基线；`tailwind.config.js` 新增 `max-w-desktop / max-w-shell` 与 `shadow-panel`

- [x] **6-2** 首页（`HomePage`）桌面双栏重设计
  - 左栏：标题、副文案、CTA、How it works
  - 右栏：城市预览/说明模块（非移动端单卡放大）
  - 保留移动端单列体验
  - 已实现：`HomePage` 改为桌面双栏；右侧新增 6 城市预览卡网格；移动端继续单列堆叠

- [x] **6-3** 问卷页（`QuizPage`）桌面双栏改造
  - 左栏：进度、已答状态、题号导航（可跳题）
  - 中栏：当前题目与选项（支持桌面信息密度）
  - 取消右栏摘要组件，降低桌面端视觉噪音
  - 保证键盘可达与清晰焦点态
  - 已实现：`QuizPage` 桌面双栏（左导航 / 中题目）；题号可跳题；移除“当前选择/当前匹配领先”侧栏；关键控件加入 `focus-visible`

- [x] **6-4** 结果页（`ResultPage`）主次分区改造
  - 主区：最佳匹配大卡（城市名/匹配度/tagline/描述）
  - 侧栏：Runner-ups、预算与最佳时间、操作按钮
  - `>=1280px` 首屏可同时看到主结果与辅助信息区
  - 已实现：`ResultPage` 改为主结果 + 侧栏结构，Runner-ups 与行程信息移入侧栏，保留移动端纵向阅读

- [x] **6-5** 交互与可访问性完善（桌面）
  - 所有关键交互组件补齐 `hover` / `focus-visible` / 键盘 Tab 顺序
  - 校验按钮、选项、切换器在鼠标与键盘下反馈一致
  - 已实现：按钮与卡片统一补齐 hover/focus 样式；`LanguageSwitcher` 增加 `Escape` 关闭与键盘焦点反馈

---

## Phase 6A｜Landing Page（PRD 对齐）

> 目标：将首页升级为 PRD 导向的转化型 Landing Page，服务 TikTok 导流与问卷完成率
> 前置条件：Phase 6 完成，现有首页/问卷/结果路由稳定

- [x] **6A-1** 确认 Landing 路由接入策略（基于现有 `/:lang` 架构）
  - 方案 A：`/:lang` 直接作为 Landing（推荐，减少入口分流）
  - 方案 B：新增 `/:lang/landing`，并在稳定后切换 `index` 到 Landing
  - 输出：确定唯一入口，避免首页与 Landing 重复维护
  - 已实现：采用方案 A，保留 `/:lang` 为唯一 Landing 入口，避免重复维护

- [x] **6A-2** 按 PRD 价值主张重构首屏 Hero（`docs/PRD.md` 第一章）
  - 主标题聚焦「18 道题找到匹配中国城市」
  - 副标题强调「降低选城决策成本 + 个性化推荐」
  - 主 CTA 固定跳转 `/:lang/quiz`，首屏仅保留一个主操作
  - 已实现：`HomePage` 首屏改为 PRD 价值主张叙事，主 CTA 直达 `/:lang/quiz`

- [x] **6A-3** 新增“用户痛点”区块（`docs/PRD.md` 第二章）
  - 城市太多、信息过载、缺少个性化建议
  - 采用 3 卡片结构，桌面同屏可见，移动端单列阅读
  - 已实现：新增三卡片痛点区块并完成响应式布局

- [x] **6A-4** 新增“匹配机制可信度”区块（`docs/PRD.md` 第四、六章）
  - 明确展示 `18 questions + 6 dimensions + 15 cities`
  - 以简化文案解释匹配流程：答题 → 计算画像 → 城市排序
  - 避免公式堆砌，保持用户可理解与可感知的专业性
  - 已实现：新增指标卡（18/6/15）与三步模型流程说明

- [x] **6A-5** 新增“城市预览 + 传播钩子”区块（`docs/PRD.md` 第三、七、十章）
  - 城市预览卡展示差异化城市风格（emoji + tagline）
  - 强调结果页可截图分享（TikTok / Instagram 场景）
  - 在区块结尾放置二次 CTA，缩短从兴趣到答题的路径
  - 已实现：城市预览卡保留并新增分享钩子区与底部二次 CTA

- [x] **6A-6** 完成 Landing 文案 i18n 扩展（`en / zh-CN / ja / ko`）
  - 新增 Landing 专属 key（hero / pain points / model / share / CTA）
  - 确保四语语气一致，避免仅英文完整、其他语言缺段
  - 城市名称继续统一使用拼音英文（如 Xi'an, Chengdu）
  - 已实现：4 语言 `common.json` 全量补齐 Landing 新 key

- [x] **6A-7** 接入最小可用埋点（与 MVP 指标对齐，`docs/PRD.md` 第十二章）
  - 事件建议：`view_landing`、`click_start_quiz`、`view_quiz`
  - 统计维度：语言、来源参数（如 `utm_source`）
  - 为后续评估“开始率/完成率”提供基础数据
  - 已实现：新增 `src/utils/analytics.ts` 并接入三类事件与 `lang/utm_source/path` 维度

- [x] **6A-8** 交付 PRD 对齐验收清单并联动 QA
  - 桌面端 `>=1280px` 首屏同时看到主叙事与辅助信息区块
  - 移动端首屏 CTA 明确、可达，按钮高度满足触控要求
  - Landing 到 Quiz 路径在四语下均可用，且无路由跳转异常
  - 相关验证项同步补充到 `docs/QA-TASKS.md`
  - 已实现：`docs/QA-TASKS.md` 已补充 Phase 6A 验收项

---

## Phase 7｜变现接入

> 目标：Affiliate 链接和 AdSense 广告位上线，开始产生收益
> 前置条件：Phase 6A 完成，产品已上线且桌面/移动双端体验稳定

- [ ] **7-1** 注册各 Affiliate 平台账号并获取追踪链接
  - GetYourGuide Partner Program
  - Viator Affiliate Program
  - Klook Affiliate Program
  - Booking.com Affiliate Partner
  - Trip.com Affiliate

- [ ] **7-2** 为 15 座城市逐一生成对应的 Affiliate 链接，录入城市数据文件（`src/data/cities.ts`）
  - 每座城市：1 条 tours 链接（GetYourGuide 或 Klook）+ 1 条酒店链接（Booking.com）
  - 链接跳转至该城市的筛选结果页，而非平台首页

- [ ] **7-3** 实现结果页 Affiliate 链接区块
  - 位置：主结果卡片下方、备选城市上方
  - 样式：不进入截图区域，不影响主视觉
  - 内容：「🎟 Top-rated [City] tours」+ 「🏨 Best hotels in [City]」两行链接

- [ ] **7-4** 接入 Google AdSense，在结果页底部放置 1 个广告位
  - 位置：备选城市卡片下方，页面最底部
  - 广告位不出现在结果卡片截图主视觉区域

---

## 依赖关系

```
Phase 0
   └─► Phase 1（数据 + 算法）
            └─► Phase 2（页面开发，依赖数据结构）
                     └─► Phase 4（多语言，依赖英文 locale 完成）
                              └─► Phase 6（桌面端重设计，依赖 i18n 路由稳定）
                                       └─► Phase 6A（Landing PRD 对齐，依赖桌面布局基线）
                                                └─► Phase 7（变现接入，依赖双端稳定）
```

> 测试、回归、验收链路见 `docs/QA-TASKS.md`

---

## 后续迭代（MVP 后）

> 以下不在当前版本范围，按优先级排列

- [ ] 结果页增加「Save / Share」一键生成分享图功能
- [ ] 数据统计后台（城市热度、完成率、Affiliate 点击率、语言分布）
- [ ] 主动联系各城市旅游局和旅游 OTA 谈品牌赞助（需先积累流量证明）
- [ ] Freemium：免费看城市匹配，付费 $2–3 获取完整旅行指南
- [ ] 邮件订阅入口（结果页底部，换取「城市旅行 Checklist」）
- [ ] 接入详细旅行攻略内容
- [ ] 扩展更多城市（目标 20+）
- [ ] 扩展更多语言（西班牙语、法语优先）

---

*依据 PRD.md v1.0 生成 · 2026 年 2 月 19 日*
