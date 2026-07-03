# STYLE_SYSTEM.md

Version: 1.0.0  
Status: Active

## Style Object Shape

Current style object shape:

```ts
{
  category: string,
  cover: string,
  name: string,
  desc: string,
  prompt: string,
}
```

## Current Categories

- 收藏
- 🔥熱門
- 視覺企劃
- 電影宇宙
- 手繪插畫
- 城市旅遊
- 空間敘事
- 食物美學

## Observed Styles

### 視覺企劃

- 視覺導演
- 色彩氛圍美學
- 電影收藏票根
- 攝影書敘事
- 食物海報設計

### 電影宇宙

- 日系電影感
- 精品時尚感
- 熱血動漫版
- 韓系電影感
- 吉卜力動畫風
- 賽博龐克風
- 復古港風電影
- 極簡藝術海報
- 歐美電影預告感
- 黑白攝影展風格
- 潮流街頭品牌風
- 夢幻童話風
- 蒸汽龐克風
- 日系戀愛劇氛圍

### 手繪插畫

- 水彩插畫風
- 彩色蠟筆手繪插畫
- 極簡留白童話速寫
- 手繪風註解日誌
- 日系生活感手繪插畫

### 城市旅遊

- 高級旅遊雜誌風
- 城市旅繪日誌
- Colorwalk 城市漫遊

### 空間敘事

- 電影級風景 HDR
- 空拍敘事視角

### 食物美學

- 食物海報設計

## Cover System

Covers live in:

`public/covers/`

Current cover naming style:

- kebab-case
- `.jpg`
- some covers have both original and `-v2` variants

Current preferred cover ratio discussed during development:

- 1536 × 2048
- JPG
- sRGB

## Important Style Notes

### 攝影書敘事

- Category: 視覺企劃
- Cover: `/covers/photobook-narrative.jpg`
- Desc: `Photobook ✦ Visual Narrative`
- Prompt type: Independent
- Must not inherit base prompt

### 色彩氛圍美學

- Prompt type: Independent
- Must not inherit base prompt

### 食物海報設計

- Prompt type: Independent
- Must not inherit base prompt

## Technical Debt

The current category filter duplicates category membership manually. Long-term target: derive category membership from `style.category` unless there is a deliberate curated order.

