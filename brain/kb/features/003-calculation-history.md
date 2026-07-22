# Feature: Calculation History

Last updated: 2026-07-22
Status: active

## Summary

Browser-local history of saved calculator runs (up to 20 entries). Includes 1-click email draft sending directly from saved history items.

## Behavior

- Save/load/delete via `src/lib/localStorage.ts`
- Storage key: `sponsorjuice_calculations`
- Entries include metrics, rates, basket, and optional pitch text
- `CalculationHistory.tsx` displays prior runs, restores state, and provides a 1-click **Send Email** link for each entry
- `isStorageAvailable()` guards private browsing / quota failures

## Key files

- `src/lib/localStorage.ts`
- `src/lib/email.ts` (`getSavedCalcPitchText`, `parsePitchEmail`)
- `src/lib/types.ts` (`SavedCalculation`)
- `src/components/calculator/CalculationHistory.tsx`

## Maintenance notes

- Version `SavedCalculation` and document migrations if schema changes.
