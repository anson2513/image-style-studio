# PROMPT_SYSTEM.md

Version: 1.0.0  
Status: Active

## Current Prompt Architecture

The current app uses base prompts plus style-specific prompts.

Base prompts in `app/page.tsx`:

- `movieBasePrompt`
- `illustrationBasePrompt`
- `travelBasePrompt`
- `spaceBasePrompt`

Final output is currently composed as:

```ts
setGeneratedPrompt(`${basePromptToUse}

${styleToUse?.prompt || ''}`)
```

## Prompt Routing Modes

### Default Movie Universe

If no special rule matches, the style receives `movieBasePrompt`.

### Illustration Universe

Uses `illustrationBasePrompt` for selected illustration styles.

### Travel Universe

Uses `travelBasePrompt` for selected travel styles.

### Space Universe

Uses `spaceBasePrompt` for selected space styles.

### Independent Prompt

Uses no base prompt.

The final output must be the style prompt only.

## Independent Prompt Styles

- 水彩插畫風
- Colorwalk 城市漫遊
- 視覺導演
- 電影收藏票根
- 色彩氛圍美學
- 攝影書敘事
- 食物海報設計
- 藝術拉絲攝影
- 精品食物品牌廣告
- 生活速寫混合媒介

## Critical Rule

If a user says a prompt must be used exactly, do not add any base prompt before it.

## Known Risk

Prompt routing currently depends on exact Traditional Chinese string names. A single wrong character breaks routing.

Example:

`攝影書敘事` is correct.  
`攝影書故事` is wrong.

## Recommended Refactor

Move prompt routing into:

`lib/promptRouter.ts`

Suggested data model:

```ts
type PromptMode = 'independent' | 'movie' | 'illustration' | 'travel' | 'space'
```

Then each style can declare:

```ts
promptMode: 'independent'
```

This removes fragile string matching.

