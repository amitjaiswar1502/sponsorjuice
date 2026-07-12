# Feature: Calculation History

Last updated: 2026-07-12
Status: draft

## Summary

Browser-local history of saved calculator runs (up to 20 entries). No server sync.

## Behavior

- Save/load/delete via `src/lib/localStorage.ts`
- Storage key: `sponsorjuice_calculations`
- Entries include metrics, rates, basket, and optional pitch text
- `CalculationHistory.tsx` displays and restores prior runs
- `isStorageAvailable()` guards private browsing / quota failures

## Key files

- `src/lib/localStorage.ts`
- `src/lib/types.ts` (`SavedCalculation`)
- `src/components/calculator/CalculationHistory.tsx`

## Maintenance notes

- Version `SavedCalculation` and document migrations if schema changes.
