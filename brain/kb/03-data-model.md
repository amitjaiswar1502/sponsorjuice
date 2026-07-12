# Data Model

Last updated: 2026-07-12
Status: draft

## Confirmed facts

**No server database.** Persistence is browser `localStorage` only.

### TypeScript domain types (`src/lib/types.ts`)

- `Platform`: `tiktok` | `instagram` | `youtube` | `facebook`
- `Niche`: `finance` | `tech` | `beauty` | `comedy`
- `Geo`: `us_ca` | `uk_au` | `global`
- `DeliverableId`: `dedicated_video` | `integrated_ad` | `bio_link` | `stories`
- `PlatformProfile` — per-platform metrics (followers, views, niche, geo, active flag)
- `SavedCalculation` — history entry with rates, basket, optional pitch text (v2 supports multi-platform profiles and pitch modes)
- `RateResult` — low/high base and package rates

### Calculator coefficients (`src/data/calculator-math.ts`)

- Platform per-view ranges: TikTok 0.005–0.012, Instagram 0.007–0.015, YouTube 0.015–0.035, Facebook 0.005–0.013
- Niche multipliers: finance 1.8, tech 1.5, beauty 1.2, comedy 0.8
- Geo weights: us_ca 1.5, uk_au 1.3, global 0.7
- Deliverable weights: dedicated_video 1.0, integrated_ad 0.6, bio_link 0.3, stories 0.4

### localStorage schema

- Key: `sponsorjuice_calculations`
- Max entries: 20 (`src/lib/localStorage.ts`)
- Stored as JSON array of `SavedCalculation`

### Blog content schema (`src/content.config.ts`)

- Fields: `title`, `description`, `pubDate`, `author` (default "SponsorJuice Team"), `tags` (string array)

### SEO config (`src/data/SEOConfig.json`)

- Per-platform: title, description, h1, intro, howToUse, FAQs, keywords, citability blocks

## Important files inspected

- `src/lib/types.ts`
- `src/data/calculator-math.ts`
- `src/lib/localStorage.ts`
- `src/content.config.ts`
- `src/data/SEOConfig.json`

## Assumptions

- `SavedCalculation.version === 2` indicates multi-platform profile shape; older entries may lack new fields.

## Unknowns / documentation gaps

- Migration strategy for breaking changes to `SavedCalculation` shape in localStorage.
- Whether GBP conversion (`USD_TO_GBP` in calculator-math) is exposed in UI.

## Maintenance notes

- Update when types, coefficients, storage keys, or content schemas change.
- Add migration notes if localStorage format changes.
