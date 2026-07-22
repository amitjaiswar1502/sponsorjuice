# CHANGELOG

## v2026.07.22-1205-one-click-email-send
- Added 1-click email sending for pitch templates (`PitchTemplate.tsx`) and saved calculation drafts (`CalculationHistory.tsx`).
- Created `src/lib/email.ts` helper and `src/lib/email.test.ts` unit tests for parsing subject/body and generating `mailto:` and Gmail Web compose links.
- Updated KB: `07-features.md`, `features/002-pitch-templates.md`, `features/003-calculation-history.md`, and added `features/008-one-click-email-send.md`.

## v2026.07.12-2016-blog-prose-formatting
- Styled blog TL;DR blockquotes as juice callout cards and markdown tables with borders, padding, and scroll.
- Applied `.font-data` to the last column of prose tables for rate alignment.
- Corrected TikTok blog example rates ($90–$216 for beauty · 10K views · US).

## v2026.07.12-2006-typography-rhythm
- Standardized reading copy at 16px with 1.65 line-height and a 65-character measure.
- Aligned lead text, shared page components, FAQs, marketing pages, and blog content to the same typography rhythm.
- Reserved smaller text for metadata and interface labels; updated UI rules and route documentation.

## v2026.07.12-1948-platform-intros
- Replaced dense platform landing-page hero copy with `PlatformRateIntro.astro`.
- Added structured SEO intro fields (`contextBullets`, `example`) and corrected example rate math in `SEOConfig.json`.
- KB: updated `features/004-platform-seo-pages`.

## v2026.07.12-1941-typography
- Replaced Outfit with Plus Jakarta Sans (UI/prose) and JetBrains Mono (`.font-data` rates/counts).
- Updated `global.css`, `Layout.astro` preloads, calculator numeric components, brain docs.
- Plan 001 completed.

## v2026.07.12-1927-facebook-platform
- Added Facebook as fourth calculator platform (`$0.005–$0.013`/view coefficients).
- New route `/calculator/facebook/` with SEO config, nav links, tests, and localStorage profile merge for legacy saves.
- KB: updated `03-data-model`, `06-ui-and-routes`, `features/004`, `07-features`.

## v2026.07.12-1918-kenmark-init
- Initialized or refreshed brain/ scaffold (INDEX, modular rules/, numbered kb/).
- KB: created — `00`–`11`, feature docs (`001`–`004`), decision doc (`001-static-astro-architecture`).
- Sync mode: stub.
- Updated entry files: AGENTS.md.
