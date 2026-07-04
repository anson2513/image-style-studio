# CURRENT_STATE.md

Version: 2.0.0
Status: Independent 影像風格室 foundation

## Repository Snapshot

Root project folder observed:

`image-style-studio/`

Key files:

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `lib/types.ts`
- `lib/basePrompts.ts`
- `lib/styles.ts`
- `lib/promptRouter.ts`
- `lib/categories.ts`
- `public/covers/`
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `AGENTS.md`
- `CLAUDE.md`

## Stack

From `package.json`:

- Next.js: `16.2.6`
- React: `19.2.4`
- React DOM: `19.2.4`
- TypeScript: `^5`
- Tailwind CSS: `^4`
- ESLint: `^9`

Scripts:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Current Architecture

The app remains a single-page client MVP, but stable data and routing responsibilities have been extracted.

- `app/page.tsx`: about 406 lines; app state, filtering, persistence coordination, and responsive shell composition.
- `components/BeforeAfterComparison.tsx`: desktop draggable original-versus-result comparison.
- `components/DesktopStyleInspector.tsx`: persistent desktop detail, example, generation, and prompt panel.
- `components/MobileBottomNav.tsx`: mobile 圖庫／收藏／最近 navigation.
- `components/MobileStyleDetailSheet.tsx`: mobile style metadata and example bottom sheet.
- `components/PromptOutput.tsx`: mobile prompt generation and copy result.
- `components/StyleCard.tsx`: reusable responsive style card and favorite action.
- `lib/styles.ts`: all 29 style objects and their prompt modes.
- `lib/benchmarks.ts`: six benchmark source groups, 16 registered development images, and five pilot styles.
- `lib/basePrompts.ts`: the four shared prompt universes.
- `lib/promptRouter.ts`: data-driven base selection and final prompt composition.
- `lib/categories.ts`: category labels, membership, ordering, and favorites filtering.
- `lib/storage.ts`: safe local persistence for favorites and recent usage.
- `public/examples/`: 16 AI-generated benchmark sources and five first-run pilot outputs, delivered as optimized WebP assets.
- `lib/types.ts`: shared style and prompt-mode types.

Each style now also carries:

- `summary`: concise Traditional Chinese explanation.
- `tags`: two to four browsing tags.
- `inputType`: `single-image` or `multi-image`.
- `examples`: typed input-image and output-image pairs; currently empty pending authentic benchmark production.

## Current Categories

- 收藏
- 🔥熱門
- 視覺企劃
- 電影宇宙
- 手繪插畫
- 城市旅遊
- 空間敘事
- 食物美學

## Current Important Completed Styles

- 視覺導演
- 色彩氛圍美學
- 電影收藏票根
- 攝影書敘事
- 日系生活感手繪插畫
- 食物海報設計
- Colorwalk 城市漫遊

## Current Important Prompt Routing State

Independent prompts with no base prompt:

- 水彩插畫風
- Colorwalk 城市漫遊
- 視覺導演
- 電影收藏票根
- 色彩氛圍美學
- 攝影書敘事
- 食物海報設計

Shared prompt universes:

- Movie universe: default `movieBasePrompt`
- Illustration universe: `illustrationBasePrompt`
- Travel universe: `travelBasePrompt`
- Space universe: `spaceBasePrompt`

## Known Technical Debt

1. Category navigation, search controls, and the responsive shell still share `app/page.tsx`; further extraction is optional and should remain incremental.

2. The style named `日系生活感手繪插畫` appears in the 手繪插畫 category, but intentionally retains the previous default movie routing until a product decision changes it.

3. The current app is a single-page MVP. It should be preserved while refactoring incrementally.

## Verification Status

- ESLint passes with no warnings.
- The production build passes with no warnings.
- Local development serves successfully with the explicit parent workspace root.
- The active splash is code-native and matches the warm editorial interface; the legacy splash image has been removed.
- PWA icons use the lightweight `public/brand-mark.svg` identity and matching generated PNG assets.
- Independent production is live at `https://image-style-studio.vercel.app`.
- The legacy production remains live at `https://ai-poster-director-clean.vercel.app`.

## Current Priority

Complete interaction QA, then run the exact ChatGPT GPT-5.5 即時 release-candidate example pass when that workflow is available.
