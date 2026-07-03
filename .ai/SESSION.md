# SESSION.md

Version: 1.1.0  
Status: Active

## Current Working Context

The project has been handed off for Codex continuation.

Primary goal:

Make the current AI Poster Director Web App maintainable and ready for continued development.

## Current App State

- Dependencies install and the production build passes locally.
- Main UI and interaction logic remain in `app/page.tsx`.
- Style data now lives in `lib/styles.ts`.
- Base prompts now live in `lib/basePrompts.ts`.
- Shared style types now live in `lib/types.ts`.
- Prompt composition and base-prompt routing now live in `lib/promptRouter.ts`.
- Category labels, membership, and filtering now live in `lib/categories.ts`.
- Main UI and prompt generation work.
- `攝影書敘事` has been added and should remain independent.

## Next Engineering Task

Sprint 1 is complete. Do not start a deferred product feature until the next priority is selected.

Reasonable next options:

1. Extract UI components incrementally without changing the design.
2. Resolve existing framework and lint warnings.
3. Select one item from the `Do Later` list as the next product sprint.

## Verification Completed This Session

- `npm install` completed.
- Local homepage returned HTTP 200 and rendered categories and style cards.
- `攝影書敘事` is included in the `視覺企劃` filter.
- `攝影書敘事` is routed without `movieBasePrompt`.
- Extracted 29 style objects and four base prompts match the original content exactly.
- All 29 styles produce the same output through the new data-driven router.
- Prompt modes verified: 15 movie, 3 illustration, 2 travel, 2 space, and 7 independent.
- All 8 categories preserve their prior membership counts and source-data order.
- Favorites filtering still follows the current local favorites state.
- `npm run build` passes after extraction.
- Existing ESLint and Next.js warnings were resolved without changing the visible design.
- Local development, optimized images, and the production build were reverified after warning cleanup.

## Do Not Touch Yet

- Do not redesign UI.
- Do not rename product.
- Do not rename style names.
- Do not shorten prompts.
- Do not add database or auth.
