# DEV HANDOFF — Which Chinese City Matches Your Vibe?

> **文档用途**：交付测试同事，用于 Phase 5 功能测试与验收
> **文档日期**：2026-02-19
> **当前状态**：Phase 0–4 已完成，Phase 5 待测试

---

## 一、产品简介

一款面向外国游客的**中国城市旅行匹配测试**。用户回答 18 道关于旅行风格的问题，算法将其与 15 座中国城市匹配，输出最适合的城市推荐。

**核心用户路径：**
```
首页 → 点击「开始测试」→ 依次回答 18 道题 → 查看结果（最佳匹配 + 2 个备选）→ 可重新测试
```

---

## 二、本地运行

**环境要求：** Node.js ≥ 18

```bash
# 克隆项目
git clone https://github.com/huangli1279/city-in-china-to-visit.git
cd city-in-china-to-visit

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# → http://localhost:5173/

# 构建生产包（可选）
npm run build

# 运行单元测试
npm test
```

---

## 三、技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + Vite 5 |
| 样式 | Tailwind CSS 3 |
| 路由 | React Router v6 |
| 国际化 | react-i18next |
| 字体 | Google Fonts Noto Sans（SC / JP / KR）|
| 部署 | Cloudflare Pages（main 分支自动部署）|

---

## 四、已完成功能（Phase 0–4）

### Phase 0 — 项目初始化 ✅
- React + Vite + Tailwind CSS + React Router + react-i18next 全部配置完成
- Noto Sans 字体（含 CJK）接入
- Cloudflare Pages 自动部署配置完成

### Phase 1 — 数据层与算法 ✅
- **城市数据**（`src/data/cities.ts`）：15 座城市，每座城市含 id、名称、Emoji、标签、tagline、描述、最佳旅行时间、预算、六维得分
- **题目数据**（`src/data/questions.ts`）：18 道题，每题 4 个选项，每个选项含维度分值
- **匹配算法**（`src/utils/match.ts`）：
  - `calcUserScores(answers)` — 按维度取均值，输出用户六维得分
  - `calcMatchPercentage(userScores, cityScores)` — L1 距离，公式 `(1 - Σ|u-c|/600) × 100`
  - `getRankedCities(userScores)` — 15 座城市按匹配度降序排列
- **算法单元测试**（`src/utils/match.test.ts`）：覆盖全 0、全 100、混合答案三类边界场景

### Phase 2 — 核心页面 ✅
- **首页**（`/en/`）：产品标题、How It Works 三步说明、CTA 按钮、语言切换器
- **问卷页**（`/en/quiz`）：顶部进度条、题目卡片、4 个选项、Back/Next 导航、最后一题替换为 Submit
- **结果页**（`/en/result`）：最佳匹配城市卡片（Emoji + 城市名 + 标签 + 匹配度 + Tagline + 描述）、实用信息（最佳时间 + 预算）、备选城市 2–3 名、重新测试按钮

### Phase 3 — 移动端适配 ✅
- 最大宽度 480px，桌面端居中；`viewport-fit=cover` 适配刘海屏
- 所有可点击元素高度 ≥ 52px（选项卡片、导航按钮、CTA）
- 底部安全区：`pb-[max(1.5rem,env(safe-area-inset-bottom))]` 适配 iPhone 主屏指示条
- `overflow-x: hidden` 防止横向滚动
- 路由级代码拆分（`React.lazy` + `Suspense`），三个页面独立 chunk

### Phase 4 — 多语言（i18n）✅
- **4 种语言全部翻译完成**：英语（en）、简体中文（zh-CN）、日语（ja）、韩语（ko）
  - 每种语言：18 道题目 + 选项、15 座城市 tagline + 描述、全部 UI 文案
  - 城市英文标签（The Ancient / The Cosmopolitan 等）保留英文
- **URL 路径前缀路由**：
  - `/` → 自动跳转 `/en`
  - `/:lang/` → `/en/` `/zh/` `/ja/` `/ko/`
  - 无效 `:lang` 参数自动跳转 `/en`
- **语言切换**：右上角 LanguageSwitcher，切换后 URL 首段更新，保持当前页面（首页/问卷/结果）
- **答题中切换语言**：进度、已选答案完整保留，题目文本即时刷新

---

## 五、测试范围（Phase 5）

以下为需要测试同事重点覆盖的场景。

---

### 5-1 功能测试：算法与匹配结果

**目标**：验证 18 题 → 算法 → 结果全链路正确，15 座城市各自可被推荐。

| 测试用例 | 操作步骤 | 预期结果 |
|---------|---------|---------|
| 正常完成流程 | 随机选择，提交 | 结果页展示最佳匹配城市（含匹配度百分比）+ 2 个备选城市 |
| 匹配度范围 | 完成任意一组答案 | 匹配度数值在 0–100% 之间 |
| 边界城市——敦煌 | Q1-A Q2-A Q3-A（历史极高）+ Q4-A Q5-A（自然偏好）+ Q7-A Q8-A Q9-A（文化冒险极高）+ Q10-D Q11-D Q12-A（高活跃）+ Q13-D Q14-D Q15-D（安静社交）+ Q16-A Q17-A Q18-A（冒险极高）| 结果应为**敦煌 Dunhuang** |
| 边界城市——上海 | Q1-D Q2-D Q3-D（不在乎历史）+ Q4-D Q5-D Q6-B（偏城市）+ Q7-D Q8-D Q9-D（需要西方舒适）+ Q10-D Q11-D Q12-A（喜欢密集行程）+ Q13-A Q14-A Q15-A（社交活跃）+ Q16-D Q17-D Q18-D（不冒险）| 结果应为**上海 Shanghai** |
| 第 18 题提交按钮 | 答到第 18 题 | 「Next」变为「See My City」按钮 |
| 直接访问结果页 | 浏览器直接输入 `/en/result` | 跳转至 `/en/quiz`（无答案数据时 guard 生效）|

---

### 5-2 多语言测试

**目标**：4 种语言各自完整走通，无乱码、无占位符残留。

每种语言均需覆盖：首页 → 完成 18 题 → 查看结果。

| 检查项 | 验收标准 |
|--------|---------|
| 首页文案 | 标题、副标题、How It Works 三步、CTA 按钮 — 全部显示对应语言文本 |
| 题目与选项 | 18 道题及 4 个选项 — 全部翻译，无英文遗漏或 `{{key}}` 占位符 |
| 结果页文案 | 匹配标题、城市 Tagline + 描述、「Also worth considering」、最佳时间/预算标签、Retake 按钮 — 全部对应语言 |
| 语言切换保留进度 | 答到第 10 题时切换语言 | 题号不重置、已选答案保留，题目文本切换为目标语言 |
| URL 正确性 | 切换语言后 URL 首段更新：`/en/` → `/zh/` → `/ja/` → `/ko/` |
| 字体渲染 | 中文、日文、韩文无方框字、无 fallback 英文字体 |

**语言切换入口位置**：每个页面右上角下拉按钮（🇬🇧 EN / 🇨🇳 ZH / 🇯🇵 JA / 🇰🇷 KO）

---

### 5-3 移动端设备测试

**目标平台**：

| 设备 | 系统 | 浏览器 |
|------|------|--------|
| iPhone 14 | iOS 17+ | Safari |
| iPhone SE（第 3 代）| iOS 17+ | Safari |
| Samsung Galaxy S23 | Android 14 | Chrome |
| Pixel 7 | Android 14 | Chrome |

**重点检查项**：

| 区域 | 检查内容 |
|------|---------|
| 首页 | CTA 按钮可触及，文字不溢出，不出现横向滚动条 |
| 问卷页 | 选项卡片触控区域足够大（≥ 52px 高），Back/Next 按钮不被键盘或主屏指示条遮挡 |
| 结果页截图 | 在 iPhone 14 上截图：城市名、匹配度数字、Tagline 完整出现在一屏内，不被状态栏遮挡 |
| 字体大小 | 城市名 ≥ 32px（视觉），匹配度数字 ≥ 48px（视觉）|
| 安全区适配 | iPhone 底部主屏指示条不遮挡按钮 |
| 横向滚动 | 任意页面横向滑动不出现多余空白区域 |

---

### 5-4 URL 路由与部署验证

**目标**：4 种语言 URL 在 Cloudflare Pages 生产环境均可正常访问，页面刷新不 404。

| 测试 URL 路径 | 预期行为 |
|-------------|---------|
| `/` | 跳转至 `/en` |
| `/en` | 英文首页 |
| `/zh` | 中文首页 |
| `/ja` | 日文首页 |
| `/ko` | 韩文首页 |
| `/en/quiz` | 英文问卷页 |
| `/zh/quiz` | 中文问卷页 |
| `/en/result`（无答案）| 跳转至 `/en/quiz` |
| `/xyz`（无效路径）| 跳转至 `/en` |
| 刷新 `/zh/quiz` | 不出现 404，正常显示页面 |
| 刷新 `/ko/result`（无答案）| 不出现 404，跳转至 `/ko/quiz` |

> **备注**：`public/_redirects` 已配置 `/* /index.html 200`，用于 Cloudflare Pages SPA 路由。若测试发现刷新 404，检查该文件是否被正确部署到 `dist/`。

---

### 5-5 生产环境冒烟测试

**完整流程（至少各语言各跑一遍）：**

1. 通过分享链接进入（例如直接访问 `/zh`）
2. 点击 CTA 按钮开始答题
3. 完成全部 18 题
4. 查看结果页
5. 在结果页切换语言（验证结果文案切换）
6. 点击「重新测试」
7. 全程无 JS 报错（开启浏览器控制台观察）

---

## 六、测试注意事项

### 已知限制（不计入 Bug）

| 项目 | 说明 |
|------|------|
| 结果页刷新 | 刷新 `/result` 会跳转到 `/quiz`，属于设计行为（结果通过 Router state 传递，无持久化）|
| 默认语言 | 固定为英语（en），不自动检测浏览器语言，属于设计决策 |
| Affiliate 链接 | Phase 6 未开始，结果页暂无「订机票/订酒店」跳转链接 |
| AdSense 广告 | Phase 6 未开始，结果页暂无广告位 |

### 不在测试范围内

- Phase 6 相关功能（Affiliate 链接、AdSense）
- 后台数据统计
- 分享图生成功能

---

## 七、关键文件索引

| 文件路径 | 作用 |
|---------|------|
| `src/data/cities.ts` | 15 座城市数据（含六维得分）|
| `src/data/questions.ts` | 18 道题目与选项分值 |
| `src/utils/match.ts` | 匹配算法（三步）|
| `src/utils/match.test.ts` | 算法单元测试 |
| `src/App.tsx` | 路由配置（含语言前缀路由）|
| `src/components/LangLayout.tsx` | URL lang 参数 → i18n 同步 |
| `src/components/LanguageSwitcher.tsx` | 语言切换下拉组件 |
| `src/pages/HomePage.tsx` | 首页 |
| `src/pages/QuizPage.tsx` | 问卷页（含答题状态管理）|
| `src/pages/ResultPage.tsx` | 结果页 |
| `src/locales/{en,zh-CN,ja,ko}/` | 各语言翻译文件 |
| `public/_redirects` | Cloudflare Pages SPA 路由规则 |
| `docs/TASKS.md` | 完整任务状态记录 |

---

## 八、问题反馈

发现问题请记录：

- **页面**（首页 / 问卷页 / 结果页）
- **语言**（EN / ZH / JA / KO）
- **设备 + 浏览器**
- **复现步骤**
- **预期结果 vs 实际结果**
- **截图**（如适用）

---

*Based on PRD.md v1.0 · TASKS.md Phase 0–4 ✅*
