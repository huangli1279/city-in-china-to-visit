TASKS — Which Chinese City Matches Your Vibe?
任务执行文档 v1.0
依据 PRD.md 拆解，按阶段顺序执行 状态标记：[ ] 待开始 · [→] 进行中 · [x] 已完成

Phase 0｜项目初始化
目标：搭建可运行的空项目骨架，所有工程基础到位
* [ ] 0-1 创建 React + Vite 项目，安装并配置 Tailwind CSS
* [ ] 0-2 配置 React Router，建立三条路由：/ 首页、/quiz 问卷页、/result 结果页
* [ ] 0-3 安装并初始化 react-i18next，建立 src/locales/ 目录结构（en / zh-CN / ja / ko，每个语言下 common.json / questions.json / cities.json）
* [ ] 0-4 引入 Google Fonts Noto Sans 字体族（Noto Sans SC / Noto Sans JP / Noto Sans KR），配置 Tailwind 字体变量
* [ ] 0-5 初始化 Git 仓库，连接 Cloudflare Pages，配置自动部署（main 分支 push 即触发），验证部署流程可用

Phase 1｜数据层与算法
目标：所有静态数据和核心算法就绪，可独立跑通匹配逻辑
* [ ] 1-1 编写 15 座城市完整数据文件（src/data/cities.ts）
    * 每座城市包含：id / name / label / emoji / tagline / description / bestTime / budgetRange / 六维得分 scores
    * 数据来源：PRD 三、四、七章
* [ ] 1-2 编写 18 道题目数据文件（src/data/questions.ts）
    * 每题包含：id / dimension / text / options[]（每个选项含 text 和 score）
    * 数据来源：PRD 五章
* [ ] 1-3 实现匹配算法（src/utils/match.ts）
    * Step 1：calcUserScores(answers) — 按维度取选项分值均值，返回六维得分
    * Step 2：calcMatchPercentage(userScores, cityScores) — L1 距离，公式 (1 - Σ|u-c| / 600) × 100
    * Step 3：getRankedCities(userScores) — 对 15 座城市排序，返回完整排名数组
* [ ] 1-4 编写算法单元测试，验证边界情况（全0分、全100分、混合答案）输出结果正确
* [ ] 1-5 填写英文 locale 文件（en/common.json / en/questions.json / en/cities.json）
    * common.json：所有 UI 固定文案（按钮、进度提示、标题、说明文字等）
    * questions.json：18 道题目文本 + 4 个选项文本
    * cities.json：15 座城市的 tagline 和详细描述文案

Phase 2｜核心页面开发
目标：三个页面完整可用，英文版全流程跑通
首页（/）
* [ ] 2-1 实现首页布局
    * 产品 slogan 大标题
    * 副文案（How it works 简要说明）
    * 「Start the Quiz」CTA 按钮，点击跳转 /quiz
* [ ] 2-2 实现语言切换器组件（全局复用）
    * 位于页面右上角，显示当前语言国旗 emoji + 缩写（如 🇬🇧 EN）
    * 点击展开下拉菜单，列出 4 种语言
    * 切换后即时刷新文本，不重置路由和答题状态
问卷页（/quiz）
* [ ] 2-3 实现顶部进度条组件
    * 显示「Question X / 18」+ 百分比
    * 进度条固定在页面顶部，答题过程中始终可见
* [ ] 2-4 实现题目展示组件
    * 渲染当前题目文本
    * 4 个选项以卡片形式竖向排列
    * 点击选项后：高亮选中态（蓝色边框 + 背景色变化），激活「Next」按钮
* [ ] 2-5 实现答题导航逻辑
    * 「Back」按钮：返回上一题，已选答案保留
    * 「Next」按钮：未选答案时禁用，选后可点击
    * 最后一题将「Next」替换为「See My City」提交按钮
* [ ] 2-6 实现提交逻辑
    * 点击「See My City」，调用 getRankedCities() 计算结果
    * 将 Best Match（第 1 名）和 Runner-ups（第 2、3 名）通过 Router state 传递
    * 跳转至 /result
结果页（/result）
* [ ] 2-7 实现最佳匹配城市卡片
    * 展示：城市 Emoji、城市名、英文标签、匹配百分比（大字突出）、Tagline、详细描述
    * 卡片需满足「一屏可截图」要求（城市名 ≥ 32px，匹配度 ≥ 48px）
* [ ] 2-8 实现备选城市展示（2nd & 3rd）
    * 每个城市展示：Emoji + 城市名 + 匹配百分比 + Tagline
    * 紧凑卡片布局，位于主卡片下方
* [ ] 2-9 实现实用信息展示
    * Best time to visit + Budget range（来自城市数据）
    * 位于结果卡片底部，小字提示样式
* [ ] 2-10 实现「Retake the Quiz」按钮，点击清空答案，跳回 /quiz 第一题

Phase 3｜移动端适配
目标：移动端体验达到 Mobile First 标准，结果卡片可截图传播
* [ ] 3-1 验证全局布局：以 375px 为基准，向上兼容至 430px；桌面端内容居中，最大宽度 480px
* [ ] 3-2 检查所有可点击元素触控区域，选项卡片和导航按钮高度均 ≥ 52px
* [ ] 3-3 确认关键操作按钮（Next / Submit / Start）在拇指自然触及范围内，底部安全区适配（env(safe-area-inset-bottom)）
* [ ] 3-4 验证问卷页在所有尺寸下无横向滚动，题目与选项在一屏内可完整显示或自然纵向滚动
* [ ] 3-5 验证结果卡片截图效果：在 iPhone 14 / Samsung S23 上截图，主要信息不被状态栏遮挡，核心内容一屏呈现
* [ ] 3-6 性能优化：所有图片转 WebP 格式并配置懒加载；Lighthouse 移动端首屏得分目标 ≥ 85，加载时间 ≤ 2s（4G 网络）

Phase 4｜多语言（i18n）
目标：英语之外 3 种语言全流程可用，自动检测语言生效
* [ ] 4-1 中文（zh-CN）翻译
    * common.json：UI 固定文案
    * questions.json：18 道题目 + 选项
    * cities.json：15 座城市 tagline + 描述
* [ ] 4-2 日语（ja）翻译
    * common.json / questions.json / cities.json
    * 确认城市英文标签（The Ancient 等）的本地化策略（保留英文 or 翻译）
* [ ] 4-3 韩语（ko）翻译
    * common.json / questions.json / cities.json
    * 确认城市英文标签的本地化策略
* [ ] 4-4 实现浏览器语言自动检测
    * 读取 navigator.language，匹配最近语言（en / zh / ja / ko），未匹配默认 en
* [ ] 4-5 实现 URL 路径前缀路由（/en/ /zh/ /ja/ /ko/）
    * 根路径 / 自动检测并重定向至对应语言前缀
* [ ] 4-6 验证问卷进行中切换语言
    * 语言切换后答题进度保留（当前题目、已选答案不丢失）
    * 题目文本即时切换至目标语言

Phase 5｜测试与上线
目标：生产环境稳定可访问，核心流程无阻断性问题
* [ ] 5-1 功能测试：完整跑通 18 题 → 算法计算 → 结果输出，验证 15 座城市各自能被正确匹配推荐（构造极端答案验证边界城市如敦煌/丽江）
* [ ] 5-2 多语言测试：4 种语言各自完整走一遍答题 + 结果流程，无乱码、无漏翻译占位符
* [ ] 5-3 移动端设备测试
    * iOS：Safari（iPhone 14 / iPhone SE）
    * Android：Chrome（Samsung / Pixel）
    * 重点验证：触控交互、截图区域、字体渲染
* [ ] 5-4 在 Cloudflare Pages 配置生产域名，验证 4 种语言 URL 路径（/en/ /zh/ /ja/ /ko/）均可正常访问
* [ ] 5-5 生产环境冒烟测试：从分享链接进入 → 完成答题 → 查看结果 → 切换语言，全程无报错

Phase 6｜变现接入
目标：Affiliate 链接和 AdSense 广告位上线，开始产生收益 前置条件：Phase 5 完成，产品已上线且可正常访问
* [ ] 6-1 注册各 Affiliate 平台账号并获取追踪链接
    * GetYourGuide Partner Program
    * Viator Affiliate Program
    * Klook Affiliate Program
    * Booking.com Affiliate Partner
    * Trip.com Affiliate
* [ ] 6-2 为 15 座城市逐一生成对应的 Affiliate 链接，录入城市数据文件（src/data/cities.ts）
    * 每座城市：1 条 tours 链接（GetYourGuide 或 Klook）+ 1 条酒店链接（Booking.com）
    * 链接跳转至该城市的筛选结果页，而非平台首页
* [ ] 6-3 实现结果页 Affiliate 链接区块
    * 位置：主结果卡片下方、备选城市上方
    * 样式：不进入截图区域，不影响主视觉
    * 内容：「🎟 Top-rated [City] tours」+ 「🏨 Best hotels in [City]」两行链接
* [ ] 6-4 接入 Google AdSense，在结果页底部放置 1 个广告位
    * 位置：备选城市卡片下方，页面最底部
    * 确认广告位不出现在结果卡片截图区域内
* [ ] 6-5 验收：检查 15 座城市的 Affiliate 链接全部可正常跳转，城市与链接一一对应无误
* [ ] 6-6 验收：在移动端截图结果卡片，确认 Affiliate 区块和广告位均不出现在截图范围内

依赖关系
Phase 0
   └─► Phase 1（数据 + 算法）
            └─► Phase 2（页面开发，依赖数据结构）
                     ├─► Phase 3（移动端，依赖页面完成）
                     └─► Phase 4（多语言，依赖英文 locale 完成）
                              └─► Phase 5（测试 + 上线，依赖所有 Phase 完成）
                                       └─► Phase 6（变现接入，依赖产品上线）

后续迭代（MVP 后）
以下不在当前版本范围，按优先级排列
* [ ] 结果页增加「Save / Share」一键生成分享图功能
* [ ] 数据统计后台（城市热度、完成率、Affiliate 点击率、语言分布）
* [ ] 主动联系各城市旅游局和旅游 OTA 谈品牌赞助（需先积累流量证明）
* [ ] Freemium：免费看城市匹配，付费 $2–3 获取完整旅行指南
* [ ] 邮件订阅入口（结果页底部，换取「城市旅行 Checklist」）
* [ ] 接入详细旅行攻略内容
* [ ] 扩展更多城市（目标 20+）
* [ ] 扩展更多语言（西班牙语、法语优先）

依据 PRD.md v1.0 生成 · 2026 年 2 月 19 日
