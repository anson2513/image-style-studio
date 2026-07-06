# DECISIONS.md

Version: 1.0.0  
Status: Active

## Decision 001 — Legacy Product Naming

Platform/Product name:

**Anson Creative OS**

Current module:

**AI Poster Director**

Status: Superseded for this new repository by Decision 008.

## Decision 002 — Product Mission

Mission:

**Teach AI to understand aesthetics before generating creativity.**

Status: Accepted

## Decision 003 — Core Workflow

Core workflow:

**Understand → Decide → Create**

Status: Accepted

## Decision 004 — AI Poster Director Is Not a Generic Prompt Generator

AI Poster Director is a creative-direction prompt system. Prompts are treated as creative briefs, not keyword bundles.

Status: Accepted

## Decision 005 — Independent Prompts Must Stay Independent

Some styles are complete prompt universes and must not inherit base prompts.

Examples:

- 視覺導演
- 電影收藏票根
- 色彩氛圍美學
- 攝影書敘事
- 食物海報設計
- 藝術拉絲攝影
- 精品食物品牌廣告
- 生活速寫混合媒介

Status: Accepted

## Decision 006 — Web App First

The product continues as a Web App first. iOS and desktop can come later after the Creative Engine matures.

Status: Accepted

## Decision 007 — Codex Bootstrap Pack

Instead of first writing long product philosophy documents, the immediate need is a practical AI handoff pack that lets Codex understand the current codebase and continue development.

Status: Accepted

## Decision 008 — Independent Product Identity

Product name: **影像風格室**
Subtitle: **AI 修圖風格工作台**
Developer credit: **開發者 By Anson**

Status: Accepted

## Decision 009 — Separate App and Deployment

影像風格室 is developed in a separate GitHub Repository and Vercel project. The original AI Poster Director remains online and unchanged.

Status: Accepted

## Decision 010 — Single-User Web App Scope

The product remains a single-user responsive Web App/PWA. Auth, cloud database, collaboration, subscriptions, and native apps are out of scope.

Status: Accepted

## Decision 011 — No TXT Export

The prompt result uses a single copy action. TXT export is not planned.

Status: Accepted

## Decision 012 — Authentic Style Examples

Official covers and Before/After examples must use representative source photos and the exact approved production prompt. The target workflow is ChatGPT GPT-5.5 in 即時 mode.

Status: Accepted

## Decision 013 — Warm Editorial Interface System

The previous black-and-gold cinematic interface and image-based splash are superseded.

The active visual system uses:

- Warm off-white `#F6F4EF` background.
- Charcoal `#20211F` typography.
- Muted sage `#7C8B72` primary actions.
- Restrained amber `#C38A2E` favorite accents.
- White cards, neutral one-pixel borders, ordinary CSS layout, and minimal shadows.
- A code-native splash screen with the exact credit `開發者 By ANSON`.

All UI references must remain feasible in standard Next.js, React, Tailwind CSS, and normal HTML controls.

Status: Accepted

## Decision 014 — Official Example Workflow Uses GPT-5.5 即時

All official Before/After examples use ChatGPT GPT-5.5 in 即時 mode. The previously discussed 智慧高 workflow is superseded for the official example set.

Status: Accepted by Anson on 2026-07-06

## Decision 015 — Official Results Drive All Preview Surfaces

Style cards use the official prompt-result image instead of a separate conceptual cover. Cards remain compact, while desktop and mobile detail views preserve the complete uncropped 9:16 composition. Mobile also provides a dedicated full-screen original/result viewer.

Status: Accepted by Anson on 2026-07-06

