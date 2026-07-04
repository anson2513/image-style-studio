# Authentic Example Assets

Benchmark sources may be personally captured or AI-generated development assets. Every file must retain explicit provenance. Never present an AI-generated source as a personally captured photograph.

The current 16 source photos were generated with OpenAI image generation on 2026-07-04. They are approved as development benchmark inputs, not documentary evidence of real people, places, or events.

The five pilot output images were generated as first-run results on 2026-07-04 from the exact prompt text stored in `lib/styles.ts`. They have not been selectively regenerated or retouched.

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
  outputs/
    photobook-narrative/
    watercolor-illustration/
    travel-magazine/
    food-poster-design/
    japanese-cinema/
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
