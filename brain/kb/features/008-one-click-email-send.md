# Feature: 1-Click Email Send

Last updated: 2026-07-22
Status: active

## Summary

1-click email sending for pitch templates and saved calculation drafts in local history. Converts generated or customized pitch copy into system mailto: links and direct webmail compose URLs.

## Behavior

- `parsePitchEmail(text: string)` — parses `Subject:` header and body content, constructing encoded `mailtoUrl` and `gmailUrl`.
- `getSavedCalcPitchText(calc: SavedCalculation)` — resolves saved custom pitch text or re-generates pitch text from saved metrics.
- `PitchTemplate.tsx` — provides a 1-click **Send Email** button using default mail app (`mailto:`) with a dropdown option to open directly in **Gmail Web**.
- `CalculationHistory.tsx` — renders a 1-click **Send Email** action on every saved calculation entry in history.

## Key files

- `src/lib/email.ts` (helper module)
- `src/lib/email.test.ts` (unit tests)
- `src/components/calculator/PitchTemplate.tsx`
- `src/components/calculator/CalculationHistory.tsx`
