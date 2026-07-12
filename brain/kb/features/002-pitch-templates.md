# Feature: Pitch Templates

Last updated: 2026-07-12
Status: draft

## Summary

Auto-generated outreach email copy from calculator inputs and computed rate ranges. Supports per-platform and combined multi-platform pitches.

## Behavior

- `generatePitchTemplate` — single platform pitch
- `generateCombinedPitchTemplate` — multi-platform bundle pitch
- User can edit pitch text; dirty state tracked per pitch mode in `CalculatorIsland`
- Currency formatting via `formatPitchCurrency` / `formatCurrency`

## Key files

- `src/data/calculator-math.ts` (template generators)
- `src/components/calculator/PitchTemplate.tsx`
- `src/components/calculator/CalculatorIsland.tsx`

## Maintenance notes

- Update templates and tests when pitch copy or rate display format changes.
