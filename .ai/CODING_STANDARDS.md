# CODING_STANDARDS.md

Version: 1.0.0  
Status: Active

## TypeScript

- Keep types explicit for shared data structures.
- Avoid `any` for new code when reasonable.
- Existing `any` can be cleaned during refactor, not during unrelated feature work.

## React

- Preserve current client-side behavior.
- Avoid unnecessary state restructuring during style or prompt updates.
- Split components only when the data layer is stable.

## File Organization

Preferred future structure:

```text
lib/types.ts
lib/basePrompts.ts
lib/styles.ts
lib/promptRouter.ts
lib/categories.ts
components/
```

## Naming

Use existing user-facing Traditional Chinese style names exactly. Prompt routing depends on exact string matching.

Example:

`攝影書敘事` must not become `攝影書故事`.

## Avoid

- renaming style names casually
- changing cover paths without verifying file existence
- modifying approved prompts
- replacing the UI wholesale
- large refactors without clear migration steps

