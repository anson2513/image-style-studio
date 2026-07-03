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

## Current Priority

1. Extend the style data model without changing approved prompt text.
2. Prepare the six benchmark source-photo groups.
3. Pilot the first five representative styles.

## Critical Rules

- Never push redesign work to the legacy repository.
- Never change or shorten approved prompts without explicit permission.
- Examples must be generated from the exact prompt, not invented from the style name.
- Official example workflow targets ChatGPT GPT-5.5 in 智慧高 mode.
- No auth, database, TXT export, or native App work.
