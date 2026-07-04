# README_FIRST.md

Version: 2.0.0
Status: Active  
Project: 影像風格室
English identifier: Image Style Studio

## Read This First

You are joining **影像風格室**, a private single-user Web App and PWA for choosing complete AI photo-restyling prompts.

Do not treat this as a generic prompt generator or a direct image editor. The user brings a photo, chooses a style, generates the complete prompt, and uses that prompt with ChatGPT GPT-5.5 in 即時 mode.

## Required Reading Order

Read these files before editing code:

1. `PROJECT_CONTEXT.md`
2. `PRODUCT_SPEC.md`
3. `CURRENT_STATE.md`
4. `ARCHITECTURE.md`
5. `DEVELOPMENT_RULES.md`
6. `STYLE_SYSTEM.md`
7. `PROMPT_SYSTEM.md`
8. `TASK_BOARD.md`
9. `SESSION.md`
10. `DECISIONS.md`

## Highest-Level Product Rule

**Understand → Decide → Create**

The product should help the user understand what a prompt will do to a photo before copying it to AI.

## Confirmed Product Scope

- Single-user responsive Web App/PWA.
- No auth, database, cloud sync, subscriptions, collaboration, or native app.
- No TXT export.
- Real prompt examples must come from the exact production prompt and representative input photos.
- Mobile comparison uses 原始照片／提示詞效果 switching.
- Desktop comparison may add a draggable Before/After divider.
- Long approved prompts must remain unchanged.

## Immediate Developer Rule

Do not make broad refactors until the current state and prompt-routing rules are understood. This project currently stores most app logic inside `app/page.tsx`; changes must be careful and incremental.

