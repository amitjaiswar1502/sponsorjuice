# SEO / GEO / AEO Audit — Design Spec

**Date:** 2026-07-10  
**Status:** Implemented

## Summary

Full remediation to improve traditional SEO, AI search visibility (GEO), and answer engine optimization (AEO) for SponsorJuice. Focus areas: technical schema, llms.txt, AI crawler access, citability content blocks, SSR calculator fallbacks, and 2 new blog posts.

## Baseline scores (pre-remediation)

| Area | Score |
|---|---|
| SEO | 62/100 |
| GEO | 52/100 |
| AEO | 58/100 |

## Implementation

### Phase 1 — Technical
- `public/llms.txt` for AI crawlers
- `robots.txt` explicit GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot allow; CCBot disallow
- Global `Organization` schema in Layout
- Remove invalid homepage `SearchAction`; add `WebApplication`
- Calculator `WebApplication` + `FAQPage` in `@graph`
- `BreadcrumbList` on PageHero pages
- Blog Article `dateModified` + logo.webp publisher logo
- `public/og-image.png` default OG image

### Phase 2 — Citability / AEO
- Homepage "What is SponsorJuice?" block with coefficient ranges
- Per-platform `citabilityBlock` in SEOConfig
- Question-based `howToUseHeading` per calculator page
- About page "local history" wording fix

### Phase 3 — SSR fallback
- `CalculatorStaticFallback.astro` with build-time example rates on home + calculator pages

### Phase 4 — Content
- `tiktok-sponsorship-rates-2026.mdx`
- `instagram-reels-pricing-guide.mdx`

## Verification

- [x] llms.txt at `/llms.txt`
- [x] robots.txt AI crawler rules
- [x] Static example rates in HTML source
- [x] Organization + WebApplication + FAQ schema
- [x] Unique citability blocks per calculator
- [x] 3 blog posts in sitemap
- [x] npm run build passes
