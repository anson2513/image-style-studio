# PRODUCT_SPEC.md

Version: 1.0.0  
Status: Approved direction

## Identity

- Product: 影像風格室
- Subtitle: AI 修圖風格工作台
- Credit: 開發者 By Anson
- English repository identifier: image-style-studio

## User and Platform

- One user: Anson.
- Responsive Web App and PWA.
- Same codebase for mobile and desktop.
- The legacy AI Poster Director remains a separate deployed App.

## Core Workflow

1. Prepare a personally captured photo or photo series.
2. Browse a style.
3. Review authentic original-versus-prompt-result examples.
4. Generate the complete approved prompt.
5. Copy the prompt and use it with the photo in ChatGPT GPT-5.5, 智慧高 mode.

## Mobile Direction

- Header: 影像風格室, on-demand search, favorites.
- No permanent large search field.
- Horizontal category chips.
- Two-column style card grid.
- Bottom navigation: 圖庫, 收藏, 最近.
- Detail bottom sheet with Chinese summary and 2–4 tags.
- Remove English subtitles, version, approval state, and date.
- Result page has one full-width 複製提示詞 action.
- No 重新生成 or TXT export.

## Desktop Direction

- Three-column workspace.
- Left: categories, favorites, recent usage.
- Center: style grid.
- Right: detail, authentic example, and prompt output.

## Example Comparison

- Single-image styles: mobile segmented 原始照片／提示詞效果 switch; desktop may add a draggable divider.
- Multi-image styles: 原始素材 shows a photo grid; 提示詞效果 shows the final composed output.
- Show the note: 示範結果會依原始照片與使用的 AI 模型而異.
- First release uses pre-generated examples; it does not call AI from inside the App.

## Benchmark Assets

Prepare six neutral groups, approximately 16 images total:

- Portrait: 2
- City/travel: 3
- Food: 2
- Architecture/space: 2
- Multi-photo narrative: 4
- Daily life: 3

Official examples must preserve the source image, exact prompt, target model/workflow, and first-run result.

## First Five Pilot Styles

1. 攝影書敘事
2. 水彩插畫風
3. 高級旅遊雜誌風
4. 食物海報設計
5. 日系電影感

## Out of Scope

- Native mobile app
- Auth and accounts
- Cloud database and sync
- Collaboration and sharing
- Payments and subscriptions
- TXT export
- Direct in-App AI image generation for the first release
