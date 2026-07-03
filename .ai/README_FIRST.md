# README_FIRST.md

Version: 1.0.0  
Status: Active  
Project: Anson Creative OS Web  
Module: AI Poster Director

## Read This First

You are joining **Anson Creative OS**, a Creative Intelligence Platform. The current working product is **AI Poster Director**, Module 01 of the larger system.

Do not treat this as a generic prompt generator or a normal Next.js starter project. The app is a creative-direction tool built around style systems, long-form prompts, preview covers, and prompt routing.

## Required Reading Order

Read these files before editing code:

1. `PROJECT_CONTEXT.md`
2. `CURRENT_STATE.md`
3. `ARCHITECTURE.md`
4. `DEVELOPMENT_RULES.md`
5. `STYLE_SYSTEM.md`
6. `PROMPT_SYSTEM.md`
7. `TASK_BOARD.md`
8. `SESSION.md`
9. `DECISIONS.md`

## Highest-Level Product Rule

**Understand → Decide → Create**

The product should help AI understand a creator's aesthetic before generating creative outputs.

## Immediate Developer Rule

Do not make broad refactors until the current state and prompt-routing rules are understood. This project currently stores most app logic inside `app/page.tsx`; changes must be careful and incremental.

