# Stack conventions

Astro 7 static site with Preact islands, Tailwind CSS 4, MDX blog, and Vitest.

## Astro

- **Static output** (`output: 'static'` in `astro.config.mjs`); no server-side API routes.
- Site URL: `https://sponsorjuice.com`; trailing slashes always (`trailingSlash: 'always'`).
- Pages live in `src/pages/`; layouts in `src/layouts/`.
- Content collections: `src/content.config.ts` defines the `blog` collection (MDX under `src/content/blog/`).
- Integrations: `@astrojs/preact`, `@astrojs/mdx`, `@astrojs/sitemap`.
- Dev server: use `astro dev --background` per `AGENTS.md` / `CLAUDE.md`; manage with `astro dev stop|status|logs`.

## Preact islands

- Interactive calculator UI hydrates via Preact (`CalculatorIsland.tsx` and subcomponents).
- Keep island bundle small; prefer `client:visible` or `client:idle` patterns already used in pages.
- Types shared between Astro and Preact live in `src/lib/types.ts`.

## Styling

- **Tailwind CSS 4** via `@tailwindcss/vite` plugin in `astro.config.mjs`.
- Global styles: `src/styles/global.css`.
- Font: Plus Jakarta Sans variable via `@fontsource-variable/plus-jakarta-sans`; JetBrains Mono for `.font-data` numeric displays.
- Match existing juice-themed tokens and spacing from calculator and page components.

## Data and config

- Calculator formulas: pure functions in `src/data/calculator-math.ts` (unit-tested).
- Per-platform SEO copy: `src/data/SEOConfig.json`.
- Client persistence: `src/lib/localStorage.ts` (browser only; no backend).

## Dependencies

- Add packages only when necessary; prefer libraries already in `package.json`.
- Build copies sitemap: `astro build && cp dist/sitemap-index.xml dist/sitemap.xml`.
