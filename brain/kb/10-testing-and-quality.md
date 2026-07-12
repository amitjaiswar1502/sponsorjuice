# Testing and Quality

Last updated: 2026-07-12
Status: draft

## Confirmed facts

- **Test runner:** Vitest (`vitest.config.ts`).
- **Test pattern:** `src/**/*.test.ts`.
- **Primary test file:** `src/data/calculator-math.test.ts` — covers:
  - `calculateBaseRate` (platform/niche/geo combinations)
  - `calculateBasketMultiplier`, `calculateRates`, `calculatePlatformRates`
  - `generatePitchTemplate`, `generateCombinedPitchTemplate`
  - `formatCurrency`, `formatPitchCurrency`, `sumPlatformRates`
  - `createDefaultProfiles`, `getActiveProfiles`
- **No E2E tests** (no Playwright/Cypress config found).
- **No CI test workflow** found at init.

### Manual / audit tooling

- `squirrel.toml` — external crawl/audit tool config
- Design specs in `docs/superpowers/specs/` for SEO/GEO/content audits (2026-07-10)

## Important files inspected

- `vitest.config.ts`
- `src/data/calculator-math.test.ts`
- `package.json` scripts

## Assumptions

- UI components rely on manual verification; business logic is unit-tested.

## Unknowns / documentation gaps

- Target test coverage thresholds.
- Pre-deploy checklist (Lighthouse, a11y audits).

## Maintenance notes

- Add tests when changing `calculator-math.ts` or pitch template output.
- Document CI commands here when pipelines are added.
