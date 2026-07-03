# TASK_BOARD.md

Version: 1.0.0  
Status: Active

## Current Sprint: Stabilize AI Poster Director MVP

Status: Completed on 2026-07-03.

### Goal

Make the current Web App easier for Codex to maintain without changing the visible product.

## Sprint 1 Tasks

### T1 — Verify Current App

Status: Completed on 2026-07-03.

- Run `npm install` if needed.
- Run `npm run dev`.
- Confirm homepage loads.
- Confirm categories render.
- Confirm `攝影書敘事` appears under `視覺企劃`.
- Confirm generated prompt for `攝影書敘事` does not include `movieBasePrompt`.

### T2 — Add AI Handoff Pack

Status: Completed on 2026-07-03.

- Copy `.ai/` folder into project root.
- Replace or extend `AGENTS.md` so AI tools read `.ai/README_FIRST.md` first.
- Keep `CLAUDE.md` pointing to `AGENTS.md`.

### T3 — Extract Style Data

Status: Completed on 2026-07-03.

- Create `lib/types.ts`.
- Create `lib/basePrompts.ts`.
- Create `lib/styles.ts`.
- Move style objects from `app/page.tsx` without changing prompt content.
- Verify UI unchanged.

### T4 — Extract Prompt Router

Status: Completed on 2026-07-03.

- Create `lib/promptRouter.ts`.
- Replace current `else if` routing with data-driven routing.
- Preserve current output exactly.

### T5 — Extract Category Logic

Status: Completed on 2026-07-03.

- Create `lib/categories.ts`.
- Preserve curated order.
- Remove duplicated manual risk where possible.

## Do Later

- Prompt History
- Export prompt as `.txt`
- Project Library
- Creative Library
- Creative DNA Alpha
- AI Participation modes

## Do Not Do Yet

- Do not rebuild UI.
- Do not add auth.
- Do not add database.
- Do not start iOS.
- Do not rename product or styles.
