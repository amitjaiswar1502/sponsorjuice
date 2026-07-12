# Flows and Workflows

Last updated: 2026-07-12
Status: draft

## Confirmed facts

### Primary user journey: estimate a sponsorship rate

1. User lands on home (`/`) or platform page (`/calculator/{platform}/`).
2. User configures one or more platform profiles (followers, views, niche, geo).
3. User selects deliverables in the basket (dedicated video, integrated ad, bio link, stories).
4. Calculator computes low/high base and package rates via `calculator-math.ts`.
5. User views rate summary and generated pitch email (per-platform or combined).
6. User optionally saves calculation to localStorage (max 20 entries).
7. User copies pitch text for brand outreach.

### Secondary journeys

- **SEO discovery:** Search → platform landing page → read citability/FAQ content → use calculator.
- **Content marketing:** Blog index → MDX article → cross-links to calculators.
- **Support:** About / Contact / Privacy static pages.

### Build and release workflow (developer)

1. `npm install`
2. `npm run dev` (or `astro dev --background`)
3. `npm test` for calculator math changes
4. `npm run build` → static `dist/` + sitemap copy

## Important files inspected

- `src/components/calculator/CalculatorIsland.tsx`
- `src/data/calculator-math.ts`
- `src/lib/localStorage.ts`
- `docs/superpowers/specs/2026-06-29-sponsorjuice-design.md`

## Assumptions

- Users are creators negotiating brand deals, not brands buying inventory.

## Unknowns / documentation gaps

- Contact form submission flow end-to-end.
- Editorial workflow for new blog posts.

## Maintenance notes

- Update when user journeys change (e.g. accounts, export, email send).
