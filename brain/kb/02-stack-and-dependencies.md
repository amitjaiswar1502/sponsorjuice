# Stack and Dependencies

Last updated: 2026-07-12
Status: draft

## Confirmed facts

| Area | Choice |
| --- | --- |
| Runtime | Node.js `>=22.12.0` |
| Package manager | npm (`package-lock.json`) |
| Framework | Astro `^7.0.3` |
| UI islands | Preact `^10.29.3` via `@astrojs/preact` |
| Styling | Tailwind CSS `^4.3.1` via `@tailwindcss/vite` |
| Content | MDX via `@astrojs/mdx` |
| SEO | `@astrojs/sitemap` |
| Font (sans) | `@fontsource-variable/plus-jakarta-sans` |
| Font (mono) | `@fontsource-variable/jetbrains-mono` |
| Testing | Vitest `^4.1.9` |

### Scripts (`package.json`)

- `dev` — `astro dev`
- `build` — `astro build && cp dist/sitemap-index.xml dist/sitemap.xml`
- `preview` — `astro preview`
- `test` / `test:watch` — Vitest

### Tooling present

- `vitest.config.ts` — unit tests in `src/**/*.test.ts`
- `squirrel.toml` — Squirrel audit/crawl config (SEO tooling, not app runtime)
- `tsconfig.json` — TypeScript

## Important files inspected

- `package.json`, `package-lock.json`
- `astro.config.mjs`, `vitest.config.ts`, `tsconfig.json`

## Assumptions

- TypeScript used throughout `src/` for type-safe calculator and content config.

## Unknowns / documentation gaps

- Whether pnpm/yarn were considered; repo standard is npm only.
- ESLint/Prettier configuration (not found at repo root during init).

## Maintenance notes

- Update after dependency upgrades, new integrations, or script changes.
