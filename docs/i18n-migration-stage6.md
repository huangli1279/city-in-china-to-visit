# i18n 迁移阶段 6 执行记录

## 执行信息
- 执行日期：2026-02-22
- 执行分支：`chore/i18n-next-intl-migration`
- 关联方案：`plan.md`（阶段 6）

## 阶段 6 目标
1. 重新执行 `npm run build`、`npm run test`。
2. 手动回归 4 种语言核心路径：
   - `/{lang}/`
   - `/{lang}/quiz/`
   - `/{lang}/result/?a=...`
   - `/{lang}/guides/`
   - `/{lang}/guides/[slug]/`
3. 校验 SEO：`canonical`、`alternates.languages`、`og:locale`。

## 执行结果

### 1) 构建与测试
- 命令：`npm run build`
  - 结果：通过
  - 关键输出：`Generating static pages ... (73/73)`
- 命令：`npm run test`
  - 结果：通过
  - 关键输出：`Test Files 1 passed (1)`，`Tests 12 passed (12)`

### 2) 四语言核心路径手动回归（agent-browser）
在本地静态服务（`python3 -m http.server 4173 --directory out`）下逐页打开并检查标题与路由。

#### EN
- [OK] `http://127.0.0.1:4173/en/` | `Best City to Visit in China | Find a Match in 18 Questions`
- [OK] `http://127.0.0.1:4173/en/quiz/` | `China City Quiz | 18 Questions to Find Your Match`
- [OK] `http://127.0.0.1:4173/en/result/?a=000000000000000000` | `Your China City Match Result`
- [OK] `http://127.0.0.1:4173/en/guides/` | `China city planning guides | City Vibe Matcher`
- [OK] `http://127.0.0.1:4173/en/guides/best-city-to-visit-in-china-first-time/` | `Best City to Visit in China for First-Time Travelers | City Vibe Matcher`

#### ZH
- [OK] `http://127.0.0.1:4173/zh/` | `Best City to Visit in China｜18题匹配你的中国旅行首站`
- [OK] `http://127.0.0.1:4173/zh/quiz/` | `中国城市匹配测试｜18题找出你的旅行首站`
- [OK] `http://127.0.0.1:4173/zh/result/?a=000000000000000000` | `你的中国城市匹配结果`
- [OK] `http://127.0.0.1:4173/zh/guides/` | `中国城市行前攻略精选 | City Vibe Matcher`
- [OK] `http://127.0.0.1:4173/zh/guides/best-city-to-visit-in-china-first-time/` | `第一次来中国，先去哪座城市？ | City Vibe Matcher`

#### JA
- [OK] `http://127.0.0.1:4173/ja/` | `Best City to Visit in China｜18問で最適な中国都市を診断`
- [OK] `http://127.0.0.1:4173/ja/quiz/` | `中国都市診断クイズ｜18問で最適な都市を発見`
- [OK] `http://127.0.0.1:4173/ja/result/?a=000000000000000000` | `あなたの中国都市マッチ結果`
- [OK] `http://127.0.0.1:4173/ja/guides/` | `中国の都市計画ガイド | City Vibe Matcher`
- [OK] `http://127.0.0.1:4173/ja/guides/best-city-to-visit-in-china-first-time/` | `初めての中国旅行で最初に行くべき都市 | City Vibe Matcher`

#### KO
- [OK] `http://127.0.0.1:4173/ko/` | `Best City to Visit in China｜18문항 중국 도시 매칭`
- [OK] `http://127.0.0.1:4173/ko/quiz/` | `중국 도시 퀴즈｜18문항으로 나에게 맞는 도시 찾기`
- [OK] `http://127.0.0.1:4173/ko/result/?a=000000000000000000` | `나의 중국 도시 매칭 결과`
- [OK] `http://127.0.0.1:4173/ko/guides/` | `중국 도시 여행 계획 가이드 | City Vibe Matcher`
- [OK] `http://127.0.0.1:4173/ko/guides/best-city-to-visit-in-china-first-time/` | `중국 첫 여행자에게 맞는 시작 도시 | City Vibe Matcher`

结论：4 语言 x 5 路径，共 20 条路径均可正常加载并返回预期页面标题。

### 3) SEO 校验（静态导出文件）
使用脚本逐一检查 `out/` 下 20 个页面的：
- `<link rel="canonical">`
- `<link rel="alternate" hrefLang="...">`（en / zh-CN / ja / ko / x-default）
- `<meta property="og:locale">`

结果：
- 20/20 页面全部 `SEO_OK`。
- `canonical`、`alternates.languages`、`og:locale` 全部符合预期。

## 阶段 6 验收结论
- [x] 构建与测试通过。
- [x] 四语言核心路径手动回归通过。
- [x] SEO 关键元标签校验通过。

## 发布准备建议
- 当前已满足迁移计划阶段 0-6 的验收条件，可进入提交与发布流程。
- 建议按计划分两次发布（基础设施/服务端 与 客户端/清理），降低回滚半径。
