# Architecture

Last updated: 2026-07-12
Status: draft

## Confirmed facts

- **Static-first Astro 7** site (`output: 'static'`); pages pre-rendered at build time.
- **Two-layer architecture** (from design spec):
  - **Static layer (zero/minimal JS):** `Layout.astro`, platform landing pages, blog, marketing pages, JSON-LD schema.
  - **Preact island:** `CalculatorIsland.tsx` hydrates interactive calculator UI on home and `/calculator/{platform}/`.
- **No backend API** — no `src/pages/api/`, no database, no auth middleware.
- **Data flow:** User inputs → Preact state → `calculator-math.ts` pure functions → rate display + pitch text → optional `localStorage` persistence.
- **Content:** Blog via Astro Content Collections (`src/content.config.ts`, MDX in `src/content/blog/`).
- **SEO:** Per-platform config in `SEOConfig.json`; sitemap via `@astrojs/sitemap`; `robots.txt.ts` endpoint; `llms.txt` for AI crawlers.

## Important files inspected

- `astro.config.mjs` — static output, integrations
- `src/components/calculator/CalculatorIsland.tsx` — island orchestration
- `src/data/calculator-math.ts` — business logic
- `src/lib/localStorage.ts` — client persistence
- `src/content.config.ts` — blog collection schema

## Assumptions

- Multi-platform calculator (combined pitch across TikTok/Instagram/YouTube) is a post-v1 enhancement reflected in current `CalculatorIsland` code.

## Unknowns / documentation gaps

- Whether `CalculatorStaticFallback.astro` is used on all calculator entry points vs. only some.
- Middleware or edge functions (none found at init).

## Maintenance notes

- Update when adding server features, new integrations, or changing island boundaries.
- Link significant choices to `brain/kb/decisions/`.
