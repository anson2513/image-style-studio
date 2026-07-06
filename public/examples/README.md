# Authentic Example Assets

Benchmark sources may be personally captured or AI-generated development assets. Every file must retain explicit provenance. Never present an AI-generated source as a personally captured photograph.

The original 16 source photos were generated with OpenAI image generation on 2026-07-04. One neutral aerial benchmark was added on 2026-07-05 for `空拍敘事視角`. All 17 are approved as development benchmark inputs, not documentary evidence of real people, places, or events.

The five pilot output images were generated as first-run results on 2026-07-04 from the exact prompt text stored in `lib/styles.ts`. They have not been selectively regenerated or retouched.

The release-candidate pass started on 2026-07-05 in ChatGPT GPT-5.5, 即時 mode. The original development outputs remain unchanged. Completed release candidates:

- `攝影書敘事`: four multi-photo narrative sources, exact independent production prompt, first-run output at `outputs/photobook-narrative/photobook-narrative-rc-chatgpt-5-5-instant-01.webp`.
- `水彩插畫風`: `daily-life-01.webp`, exact independent production prompt, first-run output at `outputs/watercolor-illustration/watercolor-illustration-rc-chatgpt-5-5-instant-01.webp`.
- `高級旅遊雜誌風`: `city-travel-02.webp`, exact travel-universe production prompt, first-run output at `outputs/travel-magazine/travel-magazine-rc-chatgpt-5-5-instant-01.webp`.
- `食物海報設計`: `food-01.webp`, exact independent production prompt, first-run output at `outputs/food-poster-design/food-poster-design-rc-chatgpt-5-5-instant-01.webp`.
- `日系電影感`: `portrait-01.webp`, exact movie-universe production prompt, first-run output at `outputs/japanese-cinema/japanese-cinema-rc-chatgpt-5-5-instant-01.webp`.

Batch 1 of the remaining style library was completed on 2026-07-05 in ChatGPT GPT-5.5, 即時 mode: `視覺導演`, `色彩氛圍美學`, `電影收藏票根`, `精品時尚感`, `熱血動漫版`, and `韓系電影感`. Analysis-only prompts retain their exact original prompt and use one standardized follow-up instruction to request the image.

`藝術拉絲攝影` was added on 2026-07-06 from an Anson-provided source/result pair. The source is preserved as `sources/fine-art-motion-streak/fine-art-motion-streak-01.webp`; the official GPT-5.5 即時 result is preserved as `outputs/fine-art-motion-streak/fine-art-motion-streak-chatgpt-5-5-instant-01.webp`. The style uses the exact independent prompt stored in `lib/styles.ts` and does not inherit a shared base prompt.

`精品食物品牌廣告` was added on 2026-07-06 from an Anson-provided source/result pair. Both references were converted to complete 1080 × 1920 WebP previews with matching background extension and no destructive crop. The source is preserved as `sources/premium-food-branding/premium-food-branding-01.webp`; the official GPT-5.5 即時 result is preserved as `outputs/premium-food-branding/premium-food-branding-chatgpt-5-5-instant-01.webp`. The style uses the exact independent prompt stored in `lib/styles.ts` and does not inherit a shared base prompt.

`生活速寫混合媒介` was added on 2026-07-06 from an Anson-provided source/result pair. Both references were converted to complete 1080 × 1920 WebP previews with matching dark-green background extension and no destructive crop. The source is preserved as `sources/mixed-media-lifestyle-sketch/mixed-media-lifestyle-sketch-01.webp`; the official GPT-5.5 即時 result is preserved as `outputs/mixed-media-lifestyle-sketch/mixed-media-lifestyle-sketch-chatgpt-5-5-instant-01.webp`. The style uses the exact independent prompt stored in `lib/styles.ts` and does not inherit a shared base prompt.

`品牌主視覺企劃` was added on 2026-07-06 from an Anson-provided source/result pair. Both references were converted to complete 1080 × 1920 WebP previews with matching warm-white or black background extension and no destructive crop. The source is preserved as `sources/brand-hero-visual/brand-hero-visual-01.webp`; the official GPT-5.5 即時 result is preserved as `outputs/brand-hero-visual/brand-hero-visual-chatgpt-5-5-instant-01.webp`. The style uses the exact independent prompt stored in `lib/styles.ts` and does not inherit a shared base prompt.

## Directory convention

```text
examples/
  sources/
    portrait/
    city-travel/
    food/
    architecture-space/
    multi-photo-narrative/
    daily-life/
    aerial/
    fine-art-motion-streak/
    premium-food-branding/
    mixed-media-lifestyle-sketch/
    brand-hero-visual/
  outputs/
    photobook-narrative/
    watercolor-illustration/
    travel-magazine/
    food-poster-design/
    japanese-cinema/
    fine-art-motion-streak/
    premium-food-branding/
    mixed-media-lifestyle-sketch/
    brand-hero-visual/
```

Use lowercase kebab-case filenames. Keep originals unchanged; create separate optimized copies if the Web App needs smaller files.

For every official example, record:

- Source photo path or paths.
- Exact style name.
- Exact production prompt revision.
- Target model and mode: ChatGPT GPT-5.5, 即時.
- Generation date.
- First-run output path.

Do not substitute stock photos, generated source images, or hand-edited outputs without recording their exact source type.
