# Testing policy

## When to test

- Add or update tests when the user asks, or when tests clearly guard non-trivial behavior you changed.
- Skip tests that only assert implementation details or obvious framework behavior.

## Web / UI

- **Vitest** for unit tests (`vitest.config.ts` includes `src/**/*.test.ts`).
- Primary coverage today: `src/data/calculator-math.test.ts` (rate formulas, pitch templates, multi-platform aggregation).
- Manual or visual UI checks only when doing UI work and the user wants verification — not required every session.
- Responsive layouts: spot-check breakpoints when you change layout-critical CSS, if practical.

## Commands

| Command | Action |
| --- | --- |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Vitest watch mode |
| `npm run build` | Production build + sitemap copy |

Run `npm test` after substantive calculator-math or type changes when feasible; report failures honestly.
