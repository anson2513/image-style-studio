# SESSION.md

Version: 2.0.0
Status: Active

## Current Working Context

This repository is becoming the independent **影像風格室** Web App.

The original production AI Poster Director remains in:

`C:\Users\Anson\ai-poster-director\ai-poster-director-clean`

The new App lives in:

`C:\Users\Anson\image-style-studio`

## Completed

- The new local repository was cloned from the stable legacy commit.
- The provided 影像風格室 splash image was moved into the new App.
- The legacy repository was restored to a clean `main` state.
- Product metadata, PWA identity, splash screen, visible branding, and handoff documents now use 影像風格室.
- Lint, production build, and dependency security audit pass.
- Independent GitHub Repository created and pushed: `https://github.com/anson2513/image-style-studio`.
- Independent Vercel project deployed: `https://image-style-studio.vercel.app`.
- The new and legacy production Apps were both opened and verified without browser errors or warnings.
- All 29 styles now include `summary`, `tags`, `inputType`, and typed `examples` metadata.
- `攝影書敘事` is marked as multi-image; the remaining current styles are marked as single-image based on their approved prompts.
- Example arrays intentionally remain empty until authentic benchmark inputs and first-run outputs are available.
- ESLint and the production build pass after the style data model extension.
- The benchmark manifest now defines all six source groups, the required total of 16 images, and the five pilot styles.
- `public/examples/README.md` defines the authentic source/output directory and provenance convention.
- All 16 benchmark source images have been generated, saved under `public/examples/sources/`, and registered with explicit `ai-generated` provenance.
- Five first-run pilot outputs were generated from the exact approved prompts, saved under `public/examples/outputs/`, and connected to the matching style `examples` records.
- These are OpenAI image-generation development results; the separate ChatGPT GPT-5.5 即時 release-candidate pass remains pending.
- The mobile style detail sheet now renders summary, tags, input type, single- or multi-image source previews, and 原始素材／提示詞效果 switching.
- The style library now uses a two-column mobile grid with responsive desktop columns and visible per-card favorite controls.
- On-demand style search, local recent usage, persistent favorites/recents, empty states, and the mobile 圖庫／收藏／最近 navigation are implemented.
- The mobile result flow now shows generation feedback, scrolls to the completed prompt, and keeps one full-width copy action.
- Desktop now uses a three-column workspace: category library, responsive style grid, and a persistent detail/example/prompt inspector.
- Single-image desktop examples now use a draggable Before/After divider; multi-image examples retain segmented switching.
- Stable UI blocks were extracted into six focused components. `app/page.tsx` decreased from about 666 to about 406 lines without changing approved prompts or routing.
- The target ChatGPT workflow is now consistently documented as GPT-5.5 即時 across all active project files.
- Responsive structure QA passed at 390 × 844 and 1440 × 900: no horizontal overflow, correct mobile/desktop navigation visibility, two-column mobile cards, three-column desktop layout, and labeled comparison/favorite controls.
- Accessibility hardening now includes modal semantics, Escape dismissal, focus placement, background scroll locking, search expansion state, result counts, and prompt-generation announcements.
- All 21 deployed benchmark images were converted to dimension-preserving WebP files, reducing their combined size from 48.4 MB to 4.7 MB (about 90%).
- The full interface was rebuilt from the approved feasible mockup direction: warm off-white, charcoal, muted sage, restrained amber, white cards, neutral borders, and minimal shadows.
- The image-based splash was replaced by a code-native responsive splash with `開發者 By ANSON`; the unused 1.7 MB splash image was removed.
- PWA icons now use the same code-owned crop-frame/photo brand mark and were reduced from about 1.4 MB each to about 15 KB each.
- Chrome is not currently exposed to Codex, so the exact logged-in ChatGPT GPT-5.5 即時 release-candidate pass cannot be automated yet.

- Mobile and desktop interaction QA now passes for style selection, detail-sheet focus and scroll locking, prompt generation, search, favorites, and recent usage.
- Mobile prompt output is capped to a viewport-relative scroll area so the primary copy action remains visible after generation.
- Hidden mobile detail-sheet effects no longer lock desktop scrolling.
- The first ChatGPT GPT-5.5 即時 release candidate is complete for `攝影書敘事`; its optimized WebP now powers the official in-App example while the original development output remains preserved.
- All five pilot release candidates are now complete in ChatGPT GPT-5.5 即時 and power the official in-App examples; original development outputs remain preserved.
- Remaining-style release candidate Batch 1 is complete (6/24): 視覺導演、色彩氛圍美學、電影收藏票根、精品時尚感、熱血動漫版、韓系電影感.
- Remaining-style release candidate Batch 2 is complete (12/24): 吉卜力動畫風、賽博龐克風、復古港風電影、極簡藝術海報、歐美電影預告感、黑白攝影展風格.
- Analysis-only production prompts remain unchanged and use one standardized follow-up instruction to request the final image.

## Current Priority

1. Connect the Codex Chrome Extension, then run the exact ChatGPT GPT-5.5 即時 release-candidate example pass.
2. Generate a separate release-candidate pass in ChatGPT GPT-5.5 即時 when that exact workflow is available.

## Critical Rules

- Never push redesign work to the legacy repository.
- Never change or shorten approved prompts without explicit permission.
- Examples must be generated from the exact prompt, not invented from the style name.
- Official example workflow targets ChatGPT GPT-5.5 in 即時 mode.
- No auth, database, TXT export, or native App work.
