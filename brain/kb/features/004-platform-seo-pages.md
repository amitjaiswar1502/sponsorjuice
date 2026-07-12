# Feature: Platform SEO Landing Pages

Last updated: 2026-07-12
Status: reviewed

## Summary

Three programmatic SEO landing pages at `/calculator/{platform}/` for TikTok, Instagram, YouTube, and Facebook with unique meta, H1, FAQs, citability blocks, and embedded calculator.

## Behavior

- `getStaticPaths()` generates four static routes from `ALL_PLATFORMS`
- Copy, structured intro bullets, example scenarios, and FAQs from `src/data/SEOConfig.json` per platform
- `PlatformRateIntro.astro` renders each hero intro as short prose, a coefficient card, a computed example range, context bullets, and collapsed methodology details
- JSON-LD: FAQPage + WebApplication schema per page
- Cross-links to blog and other platform calculators in SEO copy

## Key files

- `src/pages/calculator/[platform].astro`
- `src/data/SEOConfig.json`
- `src/components/pages/PlatformRateIntro.astro`
- `src/components/calculator/CalculatorStaticFallback.astro`

## Maintenance notes

- Add new platform entry to `SEOConfig.json`, types, and `getStaticPaths` together.
- Keep example ranges consistent with `calculateBaseRate()`; do not hardcode values in prose when the component can compute them.
