# Feature: Rate Calculator

Last updated: 2026-07-12
Status: reviewed

## Summary

Interactive sponsorship rate estimator for TikTok, Instagram, and YouTube. Computes low/high ranges from average views, platform coefficients, niche multipliers, geography weights, and deliverable package weights.

## Behavior

- Supports multiple active platform profiles in one session.
- Formula: `views × platform_coeff × niche_mult × geo_weight`, then package multiplier from deliverable basket.
- UI: `CalculatorIsland.tsx` with sliders/cards, `RateSummary.tsx` for output.
- Static fallback content for SEO when JS unavailable.

## Key files

- `src/data/calculator-math.ts`
- `src/components/calculator/CalculatorIsland.tsx`
- `src/components/calculator/MetricsSliders.tsx`
- `src/components/calculator/DeliverablesBasket.tsx`
- `src/components/calculator/RateSummary.tsx`
- `src/data/calculator-math.test.ts`

## Maintenance notes

- Update coefficients and tests together when pricing logic changes.
