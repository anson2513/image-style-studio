# TASK_BOARD.md

Version: 2.0.0
Status: Active

## Current Sprint: Establish the Independent 影像風格室 App

### Goal

Create a separate repository and deployment without changing the production AI Poster Director App.

### S2-T1 — Isolate the New App

Status: Complete.

- [x] Create an independent local working directory.
- [x] Move the new splash screen into the new App.
- [x] Restore the legacy App to a clean production state.
- [x] Create a separate GitHub Repository.
- [x] Create a separate Vercel project and URL: `https://image-style-studio.vercel.app`.

### S2-T2 — Unify Product Identity

Status: Complete.

- Product name: 影像風格室.
- Subtitle: AI 修圖風格工作台.
- Developer credit: 開發者 By Anson.
- Update metadata, PWA manifest, visible branding, and handoff documents.
- Keep the provided splash image.

This original splash requirement was later superseded by S2-T10 and Decision 013.

### S2-T3 — Extend the Style Data Model

Status: Complete.

- [x] Add `summary`.
- [x] Add `tags`.
- [x] Add `inputType` for single-image and multi-image prompts.
- [x] Extend `inputType` with `text-only` for prompts that require no uploaded photo.
- [x] Add an `examples` model with input images and an output image.
- [x] Preserve all current prompt text and prompt routing.

All 38 current styles include the extended metadata. Their authentic examples were populated through S2-T4, S2-T11, S2-T14, S2-T15, S2-T16, S2-T17, S2-T18, S2-T19, S2-T20, S2-T21, and S2-T22.

### S2-T4 — Build Benchmark Assets

Status: Complete.

- [x] Define six neutral source-photo groups and their expected image counts.
- [x] Define the five representative pilot styles.
- [x] Add the authentic asset directory and provenance convention.
- [x] Add 16 high-quality AI-generated development source photos with explicit provenance.
- [ ] Optional, non-blocking future enhancement: replace development sources with personally captured photos for a documentary-authentic release set.
- [x] Generate first-run development examples with OpenAI image generation and each exact approved prompt.
- [x] Keep original development inputs and first-run outputs.
- [x] Generate release-candidate examples using ChatGPT GPT-5.5, 即時 mode when that exact workflow is available.
  - [x] 攝影書敘事 release candidate generated on 2026-07-05.
  - [x] 水彩插畫風 release candidate generated on 2026-07-05.
  - [x] 高級旅遊雜誌風 release candidate generated on 2026-07-05.
  - [x] 食物海報設計 release candidate generated on 2026-07-05.
  - [x] 日系電影感 release candidate generated on 2026-07-05.

### S2-T5 — Build the New Mobile UI

Status: Complete.

- [x] Two-column mobile style grid with responsive desktop columns.
- [x] On-demand search across names, summaries, descriptions, and tags.
- [x] Visible per-card favorites.
- [x] Local recent usage.
- [x] Style detail bottom sheet with summary, tags, and input type.
- [x] 原始素材／提示詞效果 switching for populated examples.
- [x] Single full-width copy action with generation feedback and result scrolling.
- [x] Mobile bottom navigation: 圖庫, 收藏, 最近.
- [x] Persist favorites and recent usage locally.

### S2-T6 — Build the New Desktop UI

Status: Complete.

- [x] Three-column workspace.
- [x] Style library, detail inspector, authentic example, and prompt output.
- [x] Desktop draggable Before/After comparison for single-image examples.

### S2-T7 — Extract Stable UI Components

Status: Complete.

- [x] Extract `StyleCard`.
- [x] Extract `MobileBottomNav`.
- [x] Extract `MobileStyleDetailSheet`.
- [x] Extract `DesktopStyleInspector`.
- [x] Extract `PromptOutput`.
- [x] Keep responsive behavior, prompt routing, and approved prompt text unchanged.

### S2-T8 — Responsive and Accessibility QA

Status: Complete.

- [x] Verify the two-column mobile grid and mobile bottom navigation.
- [x] Verify the 260 px / flexible / 380 px desktop workspace.
- [x] Confirm no horizontal document overflow at mobile and desktop widths.
- [x] Confirm accessible favorite actions and a labeled comparison slider.
- [x] Add dialog semantics, Escape dismissal, initial focus, and background scroll locking.
- [x] Add accessible search expansion and prompt-generation status announcements.
- [x] Complete interaction QA in a browser session with reliable event control.

### S2-T9 — Optimize Benchmark Delivery Assets

Status: Complete.

- [x] Convert all 21 benchmark source and output images from PNG to high-quality WebP.
- [x] Preserve the original pixel dimensions.
- [x] Update all source and example references.
- [x] Reduce deployed benchmark assets from 48.4 MB to 4.7 MB.

### S2-T10 — Rebuild the Visual Interface

Status: Complete.

- [x] Replace the black-and-gold cinematic theme with the warm editorial system.
- [x] Replace the image splash with a code-native responsive splash.
- [x] Include the exact splash credit `開發者 By ANSON`.
- [x] Rebuild mobile cards, chips, search, bottom navigation, and detail sheet.
- [x] Rebuild the desktop sidebar, style grid, and inspector.
- [x] Replace legacy PWA icons with a lightweight code-owned brand mark.
- [x] Keep every layout and interaction implementable with standard HTML/CSS controls.

### S2-T11 – Complete the Remaining Style Examples

Status: Complete (24/24).

- [x] Batch 1: 視覺導演、色彩氛圍美學、電影收藏票根、精品時尚感、熱血動漫版、韓系電影感.
- [x] Batch 2: 吉卜力動畫風、賽博龐克風、復古港風電影、極簡藝術海報、歐美電影預告感、黑白攝影展風格.
- [x] Batch 3: 潮流街頭品牌風、夢幻童話風、蒸汽龐克風、日系戀愛劇氛圍、彩色蠟筆手繪插畫、日系生活感手繪插畫.
- [x] Batch 4: 極簡留白童話速寫、手繪風註解日誌、城市旅繪日誌、Colorwalk 城市漫遊、電影級風景 HDR、空拍敘事視角.

### S2-T12 — Release Readiness Audit

Status: Complete.

- [x] Confirm GPT-5.5 即時 as the official example workflow.
- [x] Confirm all 35 styles have official examples.
- [x] Confirm all referenced example assets exist.
- [x] Pass ESLint and the production build.
- [x] Pass the dependency security audit with zero vulnerabilities.

### S2-T13 — Improve Example Visibility

Status: Complete.

- [x] Use official prompt-result images in desktop and mobile style cards.
- [x] Keep a legacy-cover fallback for future styles without examples.
- [x] Use a compact 4:5 card stage without cropping the official result.
- [x] Show the complete 9:16 comparison in the desktop inspector.
- [x] Keep the desktop inspector independently scrollable.
- [x] Show complete uncropped media in the mobile detail sheet.
- [x] Add a mobile full-screen original/result viewer.
- [x] Preserve multi-image source grids and segmented switching.

### S2-T14 — Add 藝術拉絲攝影

Status: Complete.

- [x] Preserve the Anson-provided original and prompt-result images as optimized WebP assets.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `藝術拉絲攝影` and place it in `視覺企劃`.
- [x] Add the summary and tags `藝術拉絲`, `長曝光`, and `極簡攝影`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 30 unique styles, 30 official outputs, and zero missing assets.

### S2-T15 — Add 精品食物品牌廣告

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `精品食物品牌廣告` and place it in `食物美學`.
- [x] Add the summary and tags `精品餐飲`, `商業攝影`, and `食材解構`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 31 unique styles, 31 official outputs, and zero missing assets.

### S2-T16 — Add 生活速寫混合媒介

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `生活速寫混合媒介` and place it in `手繪插畫`.
- [x] Add the summary and tags `混合媒介`, `抽象速寫`, `手寫排版`, and `生活編輯`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 32 unique styles, 32 official outputs, and zero missing assets.

### S2-T17 — Add 品牌主視覺企劃

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `品牌主視覺企劃` and place it in `視覺企劃`.
- [x] Add the summary and tags `商業主視覺`, `品牌世界觀`, `創意指導`, and `電影光影`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 33 unique styles, 33 official outputs, and zero missing assets.

### S2-T18 — Add Text-Only Support and 笨拙手寫詩意海報

Status: Complete.

- [x] Add the `text-only` input type for prompts that require no uploaded image.
- [x] Hide original/result controls and Before/After comparison for text-only styles.
- [x] Show one complete 9:16 `生成範例` on desktop, mobile, and mobile full-screen preview.
- [x] Add the exact approved prompt without rewriting or shortening it.
- [x] Name the style `笨拙手寫詩意海報` and place it in `手繪插畫`.
- [x] Add the summary and tags `手寫文字`, `極簡留白`, `詩意插畫`, and `獨立出版`.
- [x] Mark the style as text-only and independent.
- [x] Confirm 34 unique styles, 34 official outputs, and zero missing assets.

### S2-T19 — Add 晨光城市旅行誌

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without destructive cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `晨光城市旅行誌` and place it in `城市旅遊`.
- [x] Add the summary and tags `航空旅行`, `晨光色調`, `城市品牌`, and `雜誌封面`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 35 unique styles, 35 official outputs, and zero missing assets.

### S2-T20 — Add 樂高積木微縮世界

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without destructive cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `樂高積木微縮世界` and place it in `手繪插畫`.
- [x] Add the summary and tags `積木模型`, `親子趣味`, `塑料光澤`, and `微縮場景`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 36 unique styles, 36 official outputs, and zero missing assets.

### S2-T21 — Add 實景人物貼紙線稿

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without destructive cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `實景人物貼紙線稿` and place it in `手繪插畫`.
- [x] Add the summary and tags `人物貼紙`, `黑白線稿`, `實景保留`, and `手帳塗鴉`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 37 unique styles, 37 official outputs, and zero missing assets.

### S2-T22 — Add 斑駁光影電影感

Status: Complete.

- [x] Convert both Anson-provided references to complete 9:16 WebP previews without destructive cropping.
- [x] Add the complete approved prompt without rewriting or shortening it.
- [x] Name the style `斑駁光影電影感` and place it in `電影宇宙`.
- [x] Add the summary and tags `斑駁光影`, `電影開場`, `冷暖對比`, and `前景動態`.
- [x] Mark the style as single-image and independent.
- [x] Connect the official result to card, 9:16 detail, and full-screen previews.
- [x] Confirm 38 unique styles, 38 official outputs, and zero missing assets.

## Explicitly Out of Scope

- Native iOS or Android App.
- Auth and accounts.
- Cloud database and sync.
- Collaboration, subscription, or payment.
- TXT export.
- Direct in-App AI image generation for the first release.
