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

- `app/page.tsx`: about 346 lines; UI rendering, local state, preview, copy, and favorites.
- `lib/styles.ts`: all 29 style objects and their prompt modes.
- `lib/basePrompts.ts`: the four shared prompt universes.
- `lib/promptRouter.ts`: data-driven base selection and final prompt composition.
- `lib/categories.ts`: category labels, membership, ordering, and favorites filtering.
- `lib/types.ts`: shared style and prompt-mode types.

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

1. UI rendering, preview, copy, favorites, and app state still share `app/page.tsx`; UI components can be extracted incrementally.

2. The style named `日系生活感手繪插畫` appears in the 手繪插畫 category, but intentionally retains the previous default movie routing until a product decision changes it.

3. The current app is a single-page MVP. It should be preserved while refactoring incrementally.

## Verification Status

- ESLint passes with no warnings.
- The production build passes with no warnings.
- Local development serves successfully with the explicit parent workspace root.
- Optimized splash and cover images render without browser errors.
- Independent production is live at `https://image-style-studio.vercel.app`.
- The legacy production remains live at `https://ai-poster-director-clean.vercel.app`.

## Current Priority

Extend the style data model for summaries, tags, input types, and authentic examples.
