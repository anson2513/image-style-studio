# TASK_BOARD.md

Version: 2.0.0
Status: Active

## Current Sprint: Establish the Independent 影像風格室 App

### Goal

Create a separate repository and deployment without changing the production AI Poster Director App.

### S2-T1 — Isolate the New App

Status: In progress.

- Create an independent local working directory.
- Move the new splash screen into the new App.
- Restore the legacy App to a clean production state.
- Create a separate GitHub Repository.
- Create a separate Vercel project and URL.

### S2-T2 — Unify Product Identity

Status: Complete.

- Product name: 影像風格室.
- Subtitle: AI 修圖風格工作台.
- Developer credit: 開發者 By Anson.
- Update metadata, PWA manifest, visible branding, and handoff documents.
- Keep the provided splash image.

### S2-T3 — Extend the Style Data Model

Status: Next.

- Add `summary`.
- Add `tags`.
- Add `inputType` for single-image and multi-image prompts.
- Add `examples` with input images and output image.
- Preserve all current prompt text and prompt routing.

### S2-T4 — Build Benchmark Assets

- Prepare six neutral source-photo groups.
- Pilot five representative styles.
- Generate official examples using ChatGPT GPT-5.5, 智慧高 mode.
- Keep original inputs and first-run outputs.

### S2-T5 — Build the New Mobile UI

- Two-column style grid.
- On-demand search.
- Visible favorites.
- Local recent usage.
- Style detail bottom sheet.
- 原始素材／提示詞效果 switching.
- Single full-width copy action.

### S2-T6 — Build the New Desktop UI

- Three-column workspace.
- Style library, detail inspector, and prompt output.
- Desktop Before/After comparison.

## Explicitly Out of Scope

- Native iOS or Android App.
- Auth and accounts.
- Cloud database and sync.
- Collaboration, subscription, or payment.
- TXT export.
- Direct in-App AI image generation for the first release.
