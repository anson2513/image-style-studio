# CHANGELOG.md

Version: 1.0.0  
Status: Active

## 2026-07-03 — Independent 影像風格室 Foundation

### Added

- Independent local repository for 影像風格室.
- Approved product specification.
- Provided 影像風格室 splash image.

### Changed

- Product and PWA identity from AI Poster Director to 影像風格室.
- Subtitle to AI 修圖風格工作台.
- Developer credit to 開發者 By Anson.

### Protected

- The legacy AI Poster Director repository and production App remain unchanged.
- All 29 approved prompts and routing rules remain intact.

## 2026-07-03

### Added

- AI handoff pack under `.ai/` and the project entry instructions in `AGENTS.md`.
- `lib/types.ts`, `lib/basePrompts.ts`, and `lib/styles.ts`.
- `lib/promptRouter.ts` with data-driven prompt composition.
- `lib/categories.ts` with category labels, membership, and filtering.

### Changed

- Moved all 29 style objects and four base prompts out of `app/page.tsx` without changing their content.
- Replaced local `any` usage for the preview and prompt-generation style values with the shared `Style` type.
- Replaced the name-based prompt-routing condition chain with `promptMode` metadata on special styles.
- Moved category filtering out of `app/page.tsx` while preserving source-data order and favorites behavior.
- Replaced raw image elements with responsive `next/image` components while preserving the existing crops and layout.
- Moved `themeColor` to the Next.js viewport export and explicitly configured the parent Turbopack workspace root.
- Removed the unused generation-state variable while preserving the existing prompt delay.

### Verified

- Local homepage and categories render.
- `攝影書敘事` remains in `視覺企劃` and remains independent.
- All 29 generated prompt outputs match the previous routing behavior exactly.
- All 8 categories match their previous membership counts and ordering.
- Production build passes.
- ESLint and the production build complete with no warnings.
- Local optimized images render without browser errors.

## Current Snapshot

### Added

- 視覺導演 style
- 色彩氛圍美學 style
- 電影收藏票根 style
- 攝影書敘事 style
- 日系生活感手繪插畫 style
- 食物海報設計 style

### Fixed

- 攝影書敘事 is listed under 視覺企劃.
- 攝影書敘事 is routed as independent prompt.
- Base prompt pollution for 攝影書敘事 was resolved in local development.

### Known Issues

- Main app file remains monolithic.
- Prompt routing is string-based and fragile.
- Vercel production may lag until changes are committed, pushed, and successfully deployed.
- `日系生活感手繪插畫` should be reviewed for prompt routing.
