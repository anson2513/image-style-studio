# DEVELOPMENT_RULES.md

Version: 1.0.0  
Status: Active

## Core Rule

Do not start coding until the project context, current state, style system, and prompt system are understood.

## Add Style SOP

When adding a new style, update all relevant places:

1. Add style object to `styles`.
2. Ensure cover image exists in `public/covers/`.
3. Add the style name to the proper category filter in `filteredStyles`.
4. Update prompt routing in `handleGeneratePrompt` if the style is independent or belongs to a non-default universe.
5. Confirm generated prompt output starts correctly.
6. Confirm preview cover works.
7. Run `npm run dev` locally.
8. Commit and push changes.

## Independent Prompt Rule

If a style is an independent creative brief, it must not inherit `movieBasePrompt`, `travelBasePrompt`, `illustrationBasePrompt`, or `spaceBasePrompt`.

Independent examples:

- 視覺導演
- 電影收藏票根
- 色彩氛圍美學
- 攝影書敘事
- 食物海報設計
- Colorwalk 城市漫遊
- 藝術拉絲攝影
- 精品食物品牌廣告
- 生活速寫混合媒介
- 品牌主視覺企劃
- 笨拙手寫詩意海報
- 晨光城市旅行誌

## Prompt Integrity Rule

Do not rewrite, summarize, optimize, or shorten user-approved prompts unless explicitly asked.

Long prompts are allowed. They are treated as complete creative briefs.

## Text-Only Style Rule

Use `inputType: 'text-only'` when a prompt generates from a written theme without an uploaded photo. Keep `inputImages` empty, show only the official generation example, and never fabricate an original image for comparison.

## Monolith Safety Rule

`app/page.tsx` is large. Avoid manual copy-paste refactors across distant line ranges unless necessary. Prefer extracting stable data into separate files with tests or clear verification.

## Verification Checklist

After changes:

- No TypeScript syntax errors.
- App starts with `npm run dev`.
- Selected style appears in correct category.
- Preview opens.
- Generate button outputs expected prompt.
- Independent prompts do not include unwanted base prompts.

## Git Workflow

Recommended:

```bash
git status
git add .
git commit -m "clear concise message"
git push
```

Verify Vercel deployment after push if production is expected to update.

