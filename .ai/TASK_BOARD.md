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
- [x] Add an `examples` model with input images and an output image.
- [x] Preserve all current prompt text and prompt routing.

All 29 styles now include the extended metadata. Example arrays remain empty until authentic benchmark inputs and first-run outputs are prepared in S2-T4.

### S2-T4 — Build Benchmark Assets

Status: In progress.

- [x] Define six neutral source-photo groups and their expected image counts.
- [x] Define the five representative pilot styles.
- [x] Add the authentic asset directory and provenance convention.
- [x] Add 16 high-quality AI-generated development source photos with explicit provenance.
- [ ] Optionally replace development sources with personally captured photos for a documentary-authentic release set.
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

Status: In progress.

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

## Explicitly Out of Scope

- Native iOS or Android App.
- Auth and accounts.
- Cloud database and sync.
- Collaboration, subscription, or payment.
- TXT export.
- Direct in-App AI image generation for the first release.
