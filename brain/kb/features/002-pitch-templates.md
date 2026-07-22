# Feature: Pitch Templates

Last updated: 2026-07-22
Status: active

## Summary

Auto-generated outreach email copy from calculator inputs and computed rate ranges. Supports per-platform and combined multi-platform pitches, copy to clipboard, and 1-click email client dispatch.

## Behavior

- `generatePitchTemplate` — single platform pitch
- `generateCombinedPitchTemplate` — multi-platform bundle pitch
- User can edit pitch text; dirty state tracked per pitch mode in `CalculatorIsland`
- Currency formatting via `formatPitchCurrency` / `formatCurrency`
- 1-click email sending via `parsePitchEmail` (`mailto:` and Gmail Web links)

## Key files

- `src/data/calculator-math.ts` (template generators)
- `src/lib/email.ts` (email link parser and draft helper)
- `src/components/calculator/PitchTemplate.tsx`
- `src/components/calculator/CalculatorIsland.tsx`

## Maintenance notes

- Update templates, tests, and email link generator when pitch copy or rate display format changes.
