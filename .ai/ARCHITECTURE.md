# ARCHITECTURE.md

Version: 1.0.0  
Status: Active

## Current Architecture

The current app is a Next.js App Router client-side MVP.

Primary entry:

`app/page.tsx`

Current responsibilities in `page.tsx`:

- UI rendering
- style definitions
- category definitions
- prompt base definitions
- prompt routing
- prompt generation state
- preview modal
- favorites
- copy-to-clipboard
- splash screen

## Desired Architecture Direction

The app should evolve from a monolithic MVP into a maintainable Creative Engine architecture.

Target structure:

```text
app/
  page.tsx
  layout.tsx
  globals.css

components/
  StyleCard.tsx
  PreviewModal.tsx
  PromptOutput.tsx
  CategoryNav.tsx
  AppShell.tsx

lib/
  styles.ts
  categories.ts
  promptRouter.ts
  promptBase.ts
  types.ts
  storage.ts
```

## Module Boundaries

### Style System

Owns:

- category
- cover
- name
- desc
- prompt
- routing mode

### Prompt Engine

Owns:

- base prompt selection
- independent prompt handling
- final prompt composition

### UI Layer

Owns:

- categories display
- horizontal style cards
- preview modal
- generated output
- copy button

## Refactor Principle

Refactor only one layer at a time.

Recommended first extraction:

1. Move style data into `lib/styles.ts`.
2. Move category filter logic into `lib/categories.ts`.
3. Move prompt routing into `lib/promptRouter.ts`.
4. Split UI components after data and routing are stable.

## Do Not Do

- Do not rewrite the entire app at once.
- Do not change UI styling during architecture extraction unless requested.
- Do not simplify long prompts.
- Do not merge independent prompts into base prompts.

