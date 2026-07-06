# CHANGELOG.md

Version: 1.0.0  
Status: Active

## 2026-07-06 — 精品食物品牌廣告 Added

### Added

- New independent single-image style `精品食物品牌廣告` in `食物美學`.
- Exact user-provided Premium Food Branding Campaign prompt without a shared base prompt.
- Anson-provided original and result references, converted to complete 9:16 WebP previews without cropping.
- Summary and tags for premium dining, commercial photography, and ingredient deconstruction.

### Verified

- 31 unique styles and 31 official example outputs.
- No missing referenced assets.
- ESLint and the production build pass.

## 2026-07-06 — 藝術拉絲攝影 Added

### Added

- New independent single-image style `藝術拉絲攝影` in `視覺企劃`.
- Exact user-provided Fine Art Motion Streak prompt without a shared base prompt.
- Anson-provided 9:16 source and result assets, optimized to WebP for delivery.
- Summary and tags for art streaking, long exposure, and minimalist photography.

### Verified

- 30 unique styles and 30 official example outputs.
- No missing referenced assets.
- ESLint and the production build pass.

## 2026-07-06 — Preview System Expanded

### Changed

- Desktop and mobile style cards now use official prompt-result images.
- Card media uses a compact 4:5 stage with complete, uncropped result images.
- The desktop inspector now presents a complete 9:16 Before/After comparison and independent scrolling.
- Mobile detail now presents complete 9:16 media with supporting information below the image.

### Added

- Full-screen mobile original/result viewer with multi-image grid support.

### Verified

- ESLint and the production build pass.

## 2026-07-06 — Release Readiness Confirmed

### Confirmed

- GPT-5.5 即時 is the official workflow for all style examples.
- All 30 current styles have official examples and valid source/output assets.

### Verified

- ESLint and the production build pass.
- Dependency audit reports zero vulnerabilities.
- All 53 WebP example assets are present; all 30 in-App output references resolve.

## 2026-07-03 — Independent Production Deployed

### Added

- GitHub Repository: `https://github.com/anson2513/image-style-studio`.
- Vercel production: `https://image-style-studio.vercel.app`.

### Verified

- The new App and legacy production App both load without browser errors or warnings.

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
