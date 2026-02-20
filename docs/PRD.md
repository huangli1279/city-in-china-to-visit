# PRD — Which Chinese City Matches Your Vibe?
### 产品需求文档 v1.0

> **状态**：MVP 规划中
> **目标用户**：有意来中国旅行但不知道选哪个城市的外国用户
> **核心渠道**：TikTok（兼顾 Instagram、Reddit 等）
> **文档日期**：2026 年 2 月 19 日

---

## 一、产品概述

### 1.1 产品定位

一个面向外国游客的**中国城市旅行匹配测试**。用户通过回答 18 道关于自身旅行风格和偏好的问题，获得最匹配自己个性的中国城市推荐。

### 1.2 核心价值主张

> *"You've decided to visit China — but with so many cities, where do you even start? Answer 18 quick questions and find the Chinese city that matches your vibe."*

帮助外国游客将「去中国旅行」这一模糊意向转化为「去XX城市」的具体决策，降低旅行规划门槛，同时制造高传播性的个性化结果内容。

### 1.3 MVP 范围

| 包含 | 不包含 |
|------|--------|
| 18 道问卷 | 用户注册/登录 |
| 统一城市匹配库（全国热门 + 特色目的地） | 详细旅行攻略 |
| 城市匹配结果（1 最佳 + 2 备选）| 付费查看结果 |
| 结果页（含预算/时间简要提示）| 数据后台/统计面板 |
| 结果页 Affiliate 链接（tours + 酒店）| 更多语言（西班牙语、法语等）|
| 4 种语言（英语/中文/日语/韩语）| 原生 App |
| 移动端优先适配 | 一键生成分享图功能 |
| AdSense（1 个广告位，结果页底部）| 多广告位 |

---

## 二、目标用户

### 2.1 用户画像

- **地区**：欧美、英语系国家为主（澳洲、加拿大、英国、美国）
- **年龄**：20–40 岁
- **特征**：有出行意愿，对中国有好奇心，但对中国城市认知模糊，不知从何选起
- **使用场景**：刷 TikTok 看到相关视频 → 点击链接 → 完成测试 → 截图分享

### 2.2 用户痛点

- 中国城市太多，差异不了解，选择困难
- 攻略信息量大，反而不知道该去哪里
- 希望有个「适合我的」个性化推荐，而不是千篇一律的热门榜单

---

## 三、城市库

城市库参考 `docs/中国旅游城市.md`（2024-2025 热度榜与类型榜）补齐后，统一按同一优先级参与匹配，不区分核心/扩展。

| 城市 | 英文标签 | 核心旅行特色 | 参考来源 |
|------|---------|------------|---------|
| 上海 Shanghai | *The Cosmopolitan* | 国际化都市、夜生活、时尚、多元饮食 | Top 10 热门 |
| 北京 Beijing | *The Imperial* | 故宫、长城、历史底蕴、大国首都气质 | Top 10 热门 |
| 西安 Xi'an | *The Ancient* | 兵马俑、丝绸之路、回民街夜市、古城墙 | Top 10 热门 |
| 成都 Chengdu | *The Unbothered* | 大熊猫、火锅、茶馆、慢节奏生活 | Top 10 热门 |
| 桂林 Guilin | *The Dreamscape* | 喀斯特山水、漓江、阳朔稻田、田园风光 | 高人气榜单 |
| 大理 Dali | *The Free Spirit* | 洱海、苍山、少数民族文化、背包客圣地 | 特色补充 |
| 厦门 Xiamen | *The Coastal Charmer* | 鼓浪屿、殖民建筑、海鲜、悠闲漫步 | 高人气榜单 |
| 张家界 Zhangjiajie | *The Avatar Mountains* | 极致自然奇观、玻璃桥、徒步冒险 | 高人气榜单 |
| 哈尔滨 Harbin | *The Ice Kingdom* | 冰雪节、俄式建筑、独特体验、猎奇 | Top 10 热门 |
| 杭州 Hangzhou | *The Serene Classic* | 西湖、龙井茶、古典园林、山水平衡 | Top 10 热门 |
| 重庆 Chongqing | *The Cyberpunk City* | 魔幻立体地形、赛博朋克夜景、火锅、网红打卡圣地 | Top 10 热门 |
| 深圳 Shenzhen | *The Future City* | 科技创新、超现代都市、年轻活力、国际化友好 | Top 10 热门 |
| 三亚 Sanya | *The Tropical Escape* | 热带海滩、椰林度假、阳光沙滩、中国版夏威夷 | 高人气榜单 |
| 敦煌 Dunhuang | *The Desert Wonder* | 莫高窟、鸣沙山月牙泉、骆驼、丝绸之路极致体验 | 特色补充 |
| 广州 Guangzhou | *The Cantonese Table* | 粤式早茶/点心文化、夜市、岭南建筑、美食之都 | Top 10 热门 |
| 昆明 Kunming | *The Spring City* | 四季如春、滇池、石林、民族风情 | Top 10 热门 |
| 青岛 Qingdao | *The Seaside Brew* | 海滨度假、啤酒文化、欧式街区、崂山 | 高人气榜单 |
| 苏州 Suzhou | *The Garden Classic* | 古典园林、水乡古镇、江南慢生活 | 高人气榜单 |
| 丽江 Lijiang | *The Old Town Escape* | 古城夜色、雪山风光、纳西文化 | 高人气榜单 |
| 珠海 Zhuhai | *The Leisure Coast* | 海滨城市、情侣路、海洋主题乐园 | 高人气榜单 |
| 南京 Nanjing | *The Scholarly Capital* | 六朝古都、民国建筑、博物馆与书店氛围 | 高人气榜单 |
| 大连 Dalian | *The Breezy Port* | 北方海滨、广场与海岸线、避暑体验 | 高人气榜单 |
| 武汉 Wuhan | *The River Metropolis* | 长江两岸、城市烟火、交通枢纽型中转 | 特色补充 |
| 长沙 Changsha | *The Nightlife Spice* | 夜生活密集、湘菜风味、年轻娱乐氛围 | 特色补充 |

覆盖类型（用于确保结果分布不扎堆，24 城全部覆盖）：
- 历史文化型：北京、西安、南京、苏州
- 都市烟火型：上海、深圳、广州、重庆、武汉、长沙、成都
- 自然山水型：杭州、桂林、张家界、丽江、大理、昆明
- 海滨度假型：三亚、青岛、厦门、珠海、大连
- 冰雪/丝路型：哈尔滨、敦煌

---

## 四、性格维度模型

基于外国游客旅行决策的核心变量，设计 **6 个维度**，每维度取值 0–100。

| # | 维度 | 低分端（0） | 高分端（100） |
|---|------|-----------|-------------|
| 1 | **History Appetite** 历史文化兴趣 | Don't care about history | Obsessed with ancient history |
| 2 | **Nature vs Urban** 自然/都市偏好 | Pure nature & landscapes | Pure city energy & streets |
| 3 | **Local Immersion** 文化沉浸倾向 | Need Western comforts & English | Love full local immersion |
| 4 | **Activity Level** 行程节奏 | Slow down, soak it in | Pack it in, maximize everything |
| 5 | **Social Vibe** 社交氛围 | Peaceful & quiet experience | Buzzing, vibrant, meet people |
| 6 | **Adventure Appetite** 探险欲 | Stick to famous tourist spots | Off-beaten-path explorer |

### 城市六维得分矩阵（统一城市池）

| 城市 | History | Nature/Urban | Local Immersion | Activity | Social | Adventure |
|------|---------|-------------|-----------------|----------|--------|-----------|
| 上海 | 30 | 90 | 25 | 75 | 90 | 30 |
| 北京 | 85 | 70 | 45 | 75 | 65 | 45 |
| 西安 | 95 | 55 | 65 | 60 | 55 | 50 |
| 成都 | 45 | 45 | 55 | 35 | 80 | 40 |
| 桂林 | 25 | 10 | 50 | 45 | 30 | 55 |
| 大理 | 40 | 20 | 80 | 30 | 50 | 75 |
| 厦门 | 55 | 35 | 35 | 40 | 55 | 35 |
| 张家界 | 10 | 5 | 70 | 85 | 25 | 95 |
| 哈尔滨 | 50 | 30 | 80 | 50 | 45 | 80 |
| 杭州 | 65 | 30 | 40 | 45 | 40 | 30 |
| 重庆 | 45 | 80 | 60 | 70 | 90 | 50 |
| 深圳 | 10 | 88 | 20 | 65 | 80 | 35 |
| 三亚 | 15 | 15 | 25 | 40 | 60 | 30 |
| 敦煌 | 85 | 12 | 90 | 70 | 20 | 95 |
| 广州 | 50 | 72 | 55 | 60 | 85 | 40 |
| 昆明 | 40 | 22 | 60 | 42 | 52 | 45 |
| 青岛 | 45 | 32 | 35 | 46 | 64 | 36 |
| 苏州 | 78 | 28 | 42 | 34 | 36 | 26 |
| 丽江 | 60 | 12 | 72 | 36 | 46 | 70 |
| 珠海 | 30 | 32 | 30 | 36 | 46 | 32 |
| 南京 | 88 | 48 | 45 | 55 | 56 | 36 |
| 大连 | 42 | 35 | 38 | 45 | 50 | 40 |
| 武汉 | 65 | 70 | 50 | 70 | 75 | 45 |
| 长沙 | 52 | 62 | 55 | 78 | 88 | 50 |

说明（避免实现歧义）：
- Dimension 2（Nature vs Urban）：分数越高越偏都市，越低越偏自然。
- Dimension 3（Local Immersion）：分数越高表示越能接受本地化沉浸，越低表示越依赖英语/国际化便利。
- 工程实现可沿用历史字段名 `culturalComfort`，其语义与 `Local Immersion` 完全等价。

---

## 五、题目设计

### 5.1 基本规则

- 共 **18 道**单选题，每维度 3 道
- 每题 4 个选项，每个选项对应该维度的一个分值
- 全英文，口语化表达，避免学术/测试感
- 问法以「场景代入」为主，不直接问偏好

### 5.2 完整题目列表

#### Dimension 1 — History Appetite（历史文化兴趣）

**Q1.** When you walk into an old city, what's your instinct?
- A. Head straight for the oldest temple or ruin I can find `[100]`
- B. I'll check out the highlights, but I don't need to read every sign `[60]`
- C. I'd rather find a cool local café nearby `[30]`
- D. Old buildings kind of all look the same to me `[0]`

**Q2.** How do you feel about museums?
- A. I could spend a whole day in one — history is fascinating `[100]`
- B. A couple of hours is enough for me `[60]`
- C. I only go if it's world-famous or very visual `[30]`
- D. I'd rather be outside than in a museum `[0]`

**Q3.** If a city has ancient ruins but is a bit hard to get around, would you still go?
- A. Absolutely — that's exactly the kind of place I want `[100]`
- B. Yes, if the ruins are truly significant `[65]`
- C. Maybe, depends on how hard it really is `[35]`
- D. Probably not — I'd pick somewhere easier `[0]`

---

#### Dimension 2 — Nature vs Urban（自然/都市偏好）

**Q4.** Your perfect travel photo is…
- A. Misty mountains, rice terraces, or a river winding through karst peaks `[0]`
- B. A dense forest trail or dramatic cliff viewpoint `[20]`
- C. A lively night market or colorful alley `[70]`
- D. A glittering skyline from a rooftop bar `[100]`

**Q5.** On a free afternoon, you'd rather…
- A. Find a scenic hiking trail or lake to sit by `[0]`
- B. Wander through a village or countryside `[25]`
- C. Explore neighborhoods, shops, and street food `[75]`
- D. Hit a mall, art gallery, or trendy urban spot `[100]`

**Q6.** Which sounds more exhausting to you?
- A. Two hours on a crowded subway `[0]` *(prefers nature)*
- B. A long uphill hike with a heavy bag `[100]` *(prefers urban)*
- C. Both sound fine honestly `[50]`
- D. Both sound terrible `[50]`

---

#### Dimension 3 — Local Immersion（文化沉浸倾向）

**Q7.** You're at a local restaurant with no English menu and no pictures. You…
- A. Pull out Google Translate and point at random — this is the fun part `[100]`
- B. Try to figure it out, maybe ask a local for help `[70]`
- C. Look for something recognizable, play it safe `[30]`
- D. Quietly look for another restaurant with photos `[0]`

**Q8.** You arrive at a busy transit hub where almost everything is in Chinese. You…
- A. Treat it like a fun puzzle and figure it out step by step `[100]`
- B. Use maps/translation tools and adapt quickly `[65]`
- C. Feel stressed and try to find English help first `[30]`
- D. Change plans immediately to somewhere easier to navigate `[0]`

**Q9.** Which accommodation sounds most appealing?
- A. A family-run guesthouse where you eat breakfast with the owners `[100]`
- B. A local boutique hotel with some character `[65]`
- C. A reliable international chain hotel `[25]`
- D. A well-known international brand — I know exactly what I'm getting `[0]`

---

#### Dimension 4 — Activity Level（行程节奏）

**Q10.** How do you typically plan a trip?
- A. A loose idea of where I'm going — I'll figure it out as I go `[20]`
- B. A rough framework, but lots of flexibility `[45]`
- C. A solid itinerary with key sites planned in advance `[75]`
- D. Every day mapped out — I don't want to waste a minute `[100]`

**Q11.** By day 3 of a trip, you're usually…
- A. Still on day 1's vibe — I found a spot I love and I'm staying `[0]`
- B. Taking it easy, letting the city come to me `[35]`
- C. Moving through my list but taking breaks `[65]`
- D. Already thinking about what I might have missed and how to fit more in `[100]`

**Q12.** You only have one full day left in a city. You…
- A. Pack the day with as many spots as possible from morning to night `[100]`
- B. Plan 3-4 must-sees and keep a steady pace `[65]`
- C. Pick 1-2 highlights and leave plenty of downtime `[35]`
- D. Keep the day mostly open and move slowly with no checklist `[0]`

---

#### Dimension 5 — Social Vibe（社交氛围）

**Q13.** What's your ideal evening on a trip?
- A. A rooftop bar, meeting other travelers, staying out late `[100]`
- B. A lively local restaurant with good food and buzz around me `[70]`
- C. A quiet dinner at a place with great atmosphere `[35]`
- D. In my room, decompressing with a book or show `[0]`

**Q14.** At dinner, a local traveler at the next table starts chatting with you. You…
- A. Jump right in and turn it into a real conversation `[100]`
- B. Chat for a while if the vibe feels natural `[65]`
- C. Respond politely but keep it brief `[35]`
- D. Smile, nod, and return to your own space quickly `[0]`

**Q15.** Your dream city has…
- A. A wild nightlife scene and always something going on `[100]`
- B. A social but not overwhelming energy `[60]`
- C. A calm, pleasant atmosphere `[30]`
- D. Peaceful streets where I can hear myself think `[0]`

---

#### Dimension 6 — Adventure Appetite（探险欲）

**Q16.** How do you feel about going somewhere most tourists skip?
- A. That's exactly why I'd go there `[100]`
- B. Exciting, if I know there's something worth seeing `[70]`
- C. A bit nervous, but I'd consider it `[35]`
- D. I prefer places with a clear tourist trail — it's easier and safer `[0]`

**Q17.** You show up and your original plan falls through. Your reaction?
- A. Great — now I'll discover something I never would have planned `[100]`
- B. Annoyed at first, but I'd adapt quickly `[65]`
- C. Pretty stressed — I'd work hard to fix the plan `[30]`
- D. This is why I over-plan everything `[0]`

**Q18.** Which experience sounds most exciting?
- A. A village accessible only by a 3-hour boat ride `[100]`
- B. A hidden local neighborhood most tourists never find `[70]`
- C. A famous landmark, done properly with good context `[35]`
- D. A well-organized tour that covers all the highlights efficiently `[0]`

---

## 六、匹配算法

整体为**一个算法，分三步顺序执行**：

```
用户完成答题 → Step 1 计算用户画像 → Step 2 与每座城市对比算分 → Step 3 排序输出结果
```

### Step 1：计算用户六维得分

将 18 道题的答案换算为用户在六个维度上的得分，每个维度取该维度所有题目选项分值的**算术平均值**，结果为 0–100 的数值。

```
userScore[dimension] = average(selected_option_scores for that dimension)
```

### Step 2：计算与每座城市的匹配度

将用户六维得分与城市六维得分逐维对比，采用 **L1 距离（曼哈顿距离）**，6 个维度等权重，差值越小匹配度越高。

```
totalDifference = Σ |userScore[d] - cityScore[d]|  （d 遍历 6 个维度）

matchPercentage = round((1 - totalDifference / 600) * 100)
```

> 最大可能总差值 = 6 维 × 100 = 600，对应 0% 匹配；6 维完全一致 = 100% 匹配。
> 对全部城市逐一执行（当前 24 城），得到对应数量的匹配百分比。

### Step 3：排序输出结果

- **Best Match**：matchPercentage 最高的城市
- **2nd & 3rd**：第 2、3 高的城市

---

## 七、结果页设计

### 7.1 结果卡片（核心）

专为截图发 TikTok/Instagram 设计，大字、高对比、有视觉冲击力：

```
╔══════════════════════════════════════╗
║                                      ║
║   Your Chinese soulmate city is...   ║
║                                      ║
║         🏯  XI'AN                    ║
║       "The Ancient"                  ║
║                                      ║
║           Match: 89%                 ║
║                                      ║
║  Where history literally surrounds   ║
║  you. Terracotta warriors. Muslim    ║
║  Quarter nights. City walls at       ║
║  sunset.                             ║
║                                      ║
║  Also worth considering:             ║
║  🐼 Chengdu 82%  |  ⛰️ Guilin 79%   ║
║                                      ║
║  💡 Best time: Mar–May / Sep–Nov     ║
║     Budget: ~$50–80/day              ║
╚══════════════════════════════════════╝
```

### 7.2 每座城市的结果文案模板

每座城市需准备：
- **一句话 Tagline**（结果卡片副标题）
- **2–3 句详细描述**（匹配理由，第二人称，带画面感）
- **Best time to visit**
- **Budget range/day**（背包客参考价）
- **Emoji**（代表该城市的符号）

| 城市 | Emoji | Tagline | Budget/day |
|------|-------|---------|-----------|
| 上海 | 🌆 | Where East meets West at full speed | $80–150 |
| 北京 | 🏛️ | Where empires left their mark | $60–120 |
| 西安 | 🏯 | Where history literally surrounds you | $40–80 |
| 成都 | 🐼 | Where life moves at the perfect pace | $35–70 |
| 桂林 | ⛰️ | Where landscapes look like paintings | $35–65 |
| 大理 | 🌊 | Where free spirits find their people | $30–60 |
| 厦门 | 🏝️ | Where coastal charm meets easy living | $40–75 |
| 张家界 | 🌿 | Where nature does the impossible | $40–70 |
| 哈尔滨 | ❄️ | Where winter becomes an adventure | $40–75 |
| 杭州 | 🍃 | Where classical China feels alive | $50–90 |
| 重庆 | 🌃 | Where cities defy the laws of physics | $35–70 |
| 深圳 | 🤖 | Where the future is already here | $60–120 |
| 三亚 | 🌴 | Where China surprises you with paradise | $60–130 |
| 敦煌 | 🐪 | Where the Silk Road comes alive | $35–65 |
| 广州 | 🍵 | Where every meal is a celebration | $40–80 |
| 昆明 | 🌼 | Where spring never leaves | $30–60 |
| 青岛 | 🍺 | Where sea breeze meets beer culture | $45–85 |
| 苏州 | 🏞️ | Where gardens frame quiet elegance | $50–95 |
| 丽江 | 🏔️ | Where old-town nights meet snow peaks | $35–70 |
| 珠海 | 🐬 | Where coastal leisure feels effortless | $45–90 |
| 南京 | 📚 | Where history and campus vibes intersect | $45–90 |
| 大连 | 🌊 | Where the north opens to the sea | $45–85 |
| 武汉 | 🌉 | Where three towns pulse as one | $35–70 |
| 长沙 | 🌶️ | Where night markets never slow down | $30–65 |

---

## 八、技术方案

### 8.1 技术选型

| 层级 | 方案 | 说明 |
|------|------|------|
| 前端框架 | React + Vite | 轻量，开发快 |
| 样式 | Tailwind CSS | 快速实现精美 UI |
| 路由 | React Router | 首页 → 测试 → 结果 |
| 算法 | 纯前端 JS | 无需后端，匹配逻辑全在客户端 |
| 后端 | **无**（MVP 阶段）| 不存储用户数据 |
| 部署 | Cloudflare Pages | 免费，全球 CDN，秒部署 |

### 8.2 响应式与多端视觉策略

**策略：Mobile First + Desktop First-Class**

TikTok 导流用户仍以手机为主，但桌面端不再采用「移动端放大」方案。  
MVP 需同时满足：
- 移动端：触控效率优先、单列信息流、截图友好
- 桌面端：信息密度与操作效率优先、分栏布局、鼠标键盘友好

**断点规范：**
- Mobile：`< 768px`
- Tablet：`768px–1023px`
- Desktop：`>= 1024px`
- Wide Desktop：`>= 1280px`

**移动端要求（保留）：**
- 以 375px（iPhone SE）为基准设计，向上兼容至 430px（iPhone Pro Max）
- 问卷与结果页保持单列，避免横向滚动
- 选项按钮高度不低于 52px，保证触控命中率
- 关键按钮保持在拇指可及区域（底部安全区内）
- 结果页主卡片可在手机一屏内完成截图

**桌面端重设计要求（新增）：**
- 禁止将移动端单列卡片直接居中放大到桌面展示
- 页面最大内容宽度提升到 `1120–1280px` 区间，采用多区域信息架构
- 首页采用左右双栏（品牌信息/CTA + 城市预览或说明模块）
- 问卷页采用双栏结构（左：进度与题号导航；中：题目与选项），减少视觉分散与认知负担
- 结果页采用主次分区（主结果大卡 + 右侧对比与行动区）
- 桌面端需提供明确 `hover`、`focus-visible`、键盘可达状态

**交互差异化原则：**
- Mobile 以「连续滑动 + 底部主操作」为主
- Desktop 以「同时可见 + 快速定位 + 快速切换」为主
- 同一功能允许视觉表达不同，但信息语义必须一致

**视觉与版式要求：**
- 建立桌面专用 spacing scale 与卡片层级（而非仅放大字号）
- 桌面端主标题、说明、操作区之间保留明确留白节奏
- 结果页匹配度与城市名仍保持视觉焦点，但备选城市与预算信息在桌面端应同屏可见

**性能要求：**
- 移动端首屏加载 ≤ 2 秒（4G 环境）
- 桌面端首屏核心内容（标题 + 当前题目/结果卡）应在首次渲染后立即可见
- 图片资源优先 WebP 并按需加载

**验收标准（UI/UX QA）：**
- `>= 1280px` 时，首页/问卷页/结果页均至少为双栏（问卷页保持左导航 + 中主区）
- 不出现「宽屏下仅 480px 单列居中」的成品形态
- 桌面端首屏需同时看到主内容与至少一个辅助信息区块
- 键盘 Tab 导航可完整遍历关键交互组件

### 8.3 页面结构

```
/           首页（介绍 + 开始测试按钮）
/quiz       问卷页（18 道题，进度条）
/result     结果页（匹配城市 + 分享卡片）
```

### 8.4 核心数据结构

```javascript
// 城市数据
const cities = [
  {
    id: "xian",
    name: "Xi'an",
    label: "The Ancient",
    emoji: "🏯",
    tagline: "Where history literally surrounds you.",
    description: "...",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$40–80/day",
    scores: {
      history: 95,
      natureUrban: 55,
      culturalComfort: 65,
      activityLevel: 60,
      socialVibe: 55,
      adventure: 50
    }
  },
  // ...
]

// 题目数据
const questions = [
  {
    id: 1,
    dimension: "history",
    text: "When you walk into an old city, what's your instinct?",
    options: [
      { text: "Head straight for the oldest temple or ruin I can find", score: 100 },
      { text: "I'll check out the highlights, but I don't need to read every sign", score: 60 },
      { text: "I'd rather find a cool local café nearby", score: 30 },
      { text: "Old buildings kind of all look the same to me", score: 0 }
    ]
  },
  // ...
]
```

---

## 九、国际化与多语言（i18n）

### 9.1 支持语言

| 语言 | Locale | 目标用户群 | 对应主要渠道 |
|------|--------|-----------|------------|
| English | `en` | 欧美、澳洲、东南亚英语用户 | TikTok / Reddit / Instagram |
| 中文（简体）| `zh-CN` | 中国大陆用户（分享/传播场景）| 微信、小红书 |
| 日本語 | `ja` | 日本游客（来华旅游第一大客源之一）| TikTok JP / X(Twitter) |
| 한국어 | `ko` | 韩国游客（来华旅游重要客源）| TikTok KR / Instagram |

**默认语言**：English（`en`）
**语言检测**：优先读取浏览器 `Accept-Language`，自动匹配，用户可手动切换

### 9.2 语言切换 UI

- 入口位于页面右上角，显示当前语言的国旗 emoji + 语言名缩写（如 `🇬🇧 EN`）
- 点击展开下拉菜单，切换后页面即时刷新，不跳转路由
- 问卷进行中切换语言：保留当前答题进度，仅刷新文本内容

### 9.3 需要翻译的内容范围

| 内容模块 | 说明 |
|---------|------|
| UI 通用文案 | 按钮、进度提示、标题等所有界面文字 |
| 18 道题目 + 选项 | 全部翻译，语气保持口语化 |
| 城市 Tagline & 描述 | 结果页城市介绍文案 |
| 结果页文案 | 匹配理由、备选城市说明 |
| 城市英文标签 | 如「The Ancient」需本地化（日/韩可保留英文或翻译）|

> **注意**：城市名称统一使用拼音英文（Xi'an、Chengdu 等），不做翻译，保持一致性和辨识度。

### 9.4 技术实现

**推荐方案：`react-i18next`**

```
src/
  locales/
    en/
      common.json      # UI 通用文案
      questions.json   # 题目与选项
      cities.json      # 城市描述文案
    zh-CN/
      common.json
      questions.json
      cities.json
    ja/
      ...
    ko/
      ...
```

**URL 结构**：路径前缀方案，利于 SEO 和分享

```
/en/          英文版首页
/zh/          中文版首页
/ja/          日文版首页
/ko/          韩文版首页
/             自动检测跳转
```

**字体**：引入 Google Fonts Noto 系列，统一覆盖 CJK 字符
- `Noto Sans SC`（简体中文）
- `Noto Sans JP`（日语）
- `Noto Sans KR`（韩语）

### 9.5 各语言分发渠道对应关系

| 语言版本 | 重点分发渠道 |
|---------|------------|
| EN | TikTok（全球）、Reddit、Instagram、YouTube |
| ZH | 微信朋友圈、小红书、微博 |
| JA | TikTok JP、X(Twitter)、Instagram JP |
| KO | TikTok KR、Instagram KR、Naver Blog |

---

## 十、分发策略

### 10.1 主渠道：TikTok

- 创作「你的城市结果」系列短视频，展示不同结果城市的画面
- 视频结尾引导：「What's your Chinese city? Link in bio」
- 目标：用户完成测试后截图结果卡片，自发发布 TikTok / Reels

### 10.2 辅助渠道

| 渠道 | 策略 |
|------|------|
| Reddit | 发布至 r/China, r/travel, r/solotravel |
| Instagram | Reels + Stories，结果卡片模板 |
| YouTube | 测试讲解视频，评论区置顶链接 |
| Twitter/X | 「Take the quiz」推文 + 结果示例截图 |

---

## 十一、变现策略

### 11.1 设计原则

结果页是产品的传播核心——用户截图分享结果是最主要的增长引擎。因此**不设付费查看结果**，所有用户均可免费看到完整匹配结果。变现方式必须不破坏结果页的截图区域和视觉体验。

### 11.2 MVP 阶段：两条并行收益

#### 主要：结果页 Affiliate 链接

用户刚获知自己的匹配城市，处于旅行冲动最高点，此时植入对应城市的预订入口转化率最高。

**接入平台：**

| 平台 | 类型 | 佣金比例 | 适合用户群 |
|------|------|---------|-----------|
| GetYourGuide | 景点/一日游 | ~8% | 欧美用户 |
| Viator | 景点/一日游 | ~8% | 欧美用户 |
| Klook | 旅游体验 | 5–7% | 亚洲用户 |
| Booking.com | 酒店 | 25–40%（利润分成）| 全球 |
| Trip.com | 机票+酒店 | 按品类 | 亚洲用户 |

**结果页呈现位置：**主结果卡片下方，备选城市上方，不进入截图区域

```
[主结果卡片 — 截图区域]
─────────────────────────
Ready to make it happen?
🎟  Top-rated Xi'an tours  →  [GetYourGuide]
🏨  Best hotels in Xi'an   →  [Booking.com]
─────────────────────────
[备选城市 2nd & 3rd]
```

每座城市维护对应的 Affiliate 链接，跳转至该城市的筛选结果页。

#### 补充：AdSense（1 个广告位）

- 位置：结果页最底部，备选城市卡片下方
- 不出现在截图区域内，不影响主视觉
- 作为流量 baseline 收益，月访问量较低时收益有限，但零额外维护成本

### 11.3 收益预估对比

| 变现方式 | 月访问 1 万次 | 月访问 10 万次 |
|---------|-------------|--------------|
| AdSense（CPM $5）| ~$50 | ~$500 |
| Affiliate（1% 转化 × $50 均单）| ~$500 | ~$5,000 |
| 两者合计 | ~$550 | ~$5,500 |

> Affiliate 收益是 AdSense 的 10 倍量级，是主要收益来源。

### 11.4 后续阶段：更高收益路径

| 方式 | 触发条件 | 预期收益量级 |
|------|---------|------------|
| 城市旅游局/OTA 品牌赞助 | 月访问 > 5 万，有流量证明 | 一次性 $500–5,000+ |
| Freemium 详细旅行报告 | 产品口碑稳定后 | $2–5 / 份，按转化率 |
| 邮件列表 → Newsletter 广告 | 积累邮件订阅用户后 | 按列表规模定价 |

---

## 十二、成功指标（MVP 阶段）

| 指标 | 目标 |
|------|------|
| 完成率（开始→提交）| ≥ 60% |
| 结果页停留时长 | ≥ 30 秒 |
| 分享率（主观估算）| 用户截图分享 |
| TikTok 流量转化 | 视频观看 → 点击链接 |
| Affiliate 点击率 | ≥ 5%（结果页访问者）|

---

## 十三、待定事项（MVP 后）

- [ ] 持续补充更多细分目的地（古镇、海岛、边境与小众自然）
- [ ] 结果页增加「Save / Share」按钮（一键生成分享图）
- [ ] 接入详细旅行攻略内容
- [ ] 扩展更多语言（西班牙语、法语优先）
- [ ] 数据统计后台（各城市热度、Affiliate 点击率、语言分布）
- [ ] 主动联系各城市旅游局和旅游 OTA 谈品牌赞助（需先积累流量证明）
- [ ] Freemium：免费看城市匹配，付费 $2–3 获取完整旅行指南
- [ ] 邮件订阅入口（结果页底部，换取「城市旅行 Checklist」）

---

*PRD by Claude Code — based on product ideation discussion*
*参照产品分析：见 分析报告.md*
