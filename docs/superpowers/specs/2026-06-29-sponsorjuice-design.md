# SponsorJuice System Design Spec

**Date:** 2026-06-29  
**Status:** Approved for v1 implementation

## Overview

SponsorJuice is a static Astro site that helps content creators calculate brand deal rates and generate outreach pitches. It targets Tier 1 SEO traffic via platform-specific landing pages and monetizes through lazy-loaded Google AdSense.

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Astro 5+ static | Pure HTML for SEO pages, minimal JS |
| Island framework | Preact | Smallest hydration bundle (~3KB) |
| pSEO URLs | Platform-only (`/calculator/{platform}`) | 3 focused landing pages; niche selected in UI |
| Blog | MDX Content Collections | Git-based, zero cost, Astro-native |
| Language | TypeScript | Type-safe configs and calculator math |
| State persistence | localStorage | No backend required |
| Ads | Lazy AdSense via Intersection Observer | Protects Core Web Vitals |

## System Architecture

```
Static Layer (zero JS)
├── Layout.astro — SEO meta, Header, Footer
├── /calculator/[platform].astro — pSEO landing pages
├── /blog/[slug].astro — MDX blog posts
└── index.astro — Home hub

Preact Island (client:visible / client:idle)
└── CalculatorIsland.tsx
    ├── MetricsSliders — platform, followers, views, niche, geo
    ├── DeliverablesBasket — click/drag deliverables
    ├── PitchTemplate — live outreach email
    └── CalculationHistory — localStorage read/write

Data Layer
├── calculator-math.ts — pure formula functions
├── SEOConfig.json — per-platform meta and FAQs
└── content/blog/*.mdx — blog posts
```

## Calculator Formula

```
Base Rate = Views × Platform Coefficient × Niche Multiplier × Geo Weight
Package Rate = Base Rate × sum(deliverable weights in basket)
```

### Constants

**Platform coefficients (per view):**
- TikTok: low 0.005, high 0.012
- Instagram: low 0.007, high 0.015
- YouTube: low 0.015, high 0.035

**Niche multipliers:** Finance 1.8, Tech 1.5, Beauty 1.2, Comedy 0.8

**Geo weights:** US/CA 1.5, UK/AU 1.3, Global 0.7

**Deliverable weights:** Dedicated Video 1.0, Integrated Ad 0.6, Bio Link 0.3, Stories 0.4

## Component Specifications

### Layout.astro
Props: `title`, `description`, `image?`, `canonical?`  
Renders Open Graph + Twitter meta, Header, Footer, page slot.

### CalculatorIsland.tsx
Single Preact island owning all calculator state. Hydrates with `client:visible` on pSEO pages and `client:idle` on home.

State: platform, followers (default 50K), views (default 10K), niche (default beauty), geo (default us_ca), basket (default empty).

### AdSenseContainer.astro
Lazy-loads AdSense script via Intersection Observer (200px rootMargin) + `requestIdleCallback` fallback. No render-blocking scripts in `<head>`.

### pSEO Pages
Three static paths generated via `getStaticPaths()`. Each page includes platform-specific title/H1/intro from SEOConfig.json, FAQ JSON-LD schema, calculator island, and two ad placements.

## Data Models

```typescript
interface SavedCalculation {
  id: string;
  timestamp: number;
  platform: Platform;
  followers: number;
  views: number;
  niche: Niche;
  geo: Geo;
  basket: DeliverableId[];
  baseRateLow: number;
  baseRateHigh: number;
  packageRateLow: number;
  packageRateHigh: number;
}
```

Max 20 saved calculations; oldest pruned on save.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `PUBLIC_ADSENSE_ID` | Google AdSense publisher ID |
| `PUBLIC_SITE_URL` | Canonical base URL |

## Error Handling

- Invalid platform slug → Astro 404 (only 3 paths generated)
- localStorage unavailable → history panel shows warning; calculator still works
- Ad blocker → empty ad container, no JS errors
- SSR hydration → no localStorage reads during server render

## Testing

- Unit tests for `calculator-math.ts` via Vitest
- Build verification via `astro build`
- Manual Lighthouse check targeting 95+ Performance on `/calculator/tiktok`

## File Structure

```
src/
├── components/
│   ├── AdSenseContainer.astro
│   ├── Header.astro
│   ├── Footer.astro
│   └── calculator/
│       ├── CalculatorIsland.tsx
│       ├── MetricsSliders.tsx
│       ├── DeliverablesBasket.tsx
│       ├── PitchTemplate.tsx
│       └── CalculationHistory.tsx
├── layouts/Layout.astro
├── pages/
│   ├── index.astro
│   ├── blog/index.astro
│   ├── blog/[slug].astro
│   └── calculator/[platform].astro
├── content/blog/how-to-pitch.mdx
├── content.config.ts
├── data/
│   ├── SEOConfig.json
│   ├── calculator-math.ts
│   └── calculator-math.test.ts
├── lib/
│   ├── localStorage.ts
│   └── types.ts
└── styles/global.css
```
