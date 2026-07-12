# API and Integrations

Last updated: 2026-07-12
Status: draft

## Confirmed facts

### Server APIs

- **None** — static site with no route handlers for business logic.
- `src/pages/robots.txt.ts` generates robots.txt at build/request (Astro endpoint pattern).

### Third-party integrations

| Integration | Usage |
| --- | --- |
| **Google AdSense** | `AdSenseContainer.astro` — lazy load via Intersection Observer; CSP in `public/_headers` allows AdSense domains |
| **Schema.org JSON-LD** | Organization, WebSite, WebApplication, FAQPage on key pages |
| **Google Fonts** | Plus Jakarta Sans + JetBrains Mono via fontsource (self-hosted); CSP allows `fonts.gstatic.com` but unused |

### Env-driven config

- `PUBLIC_ADSENSE_ID`, `PUBLIC_ADSENSE_HOME_SLOT`, `PUBLIC_SITE_URL`
- Default AdSense client in `Layout.astro` / `AdSenseContainer.astro`: `ca-pub-1680488274273475`

### External tooling (non-runtime)

- `squirrel.toml` — Squirrel SEO audit configuration

## Important files inspected

- `src/components/AdSenseContainer.astro`
- `src/layouts/Layout.astro`
- `public/_headers`, `public/ads.txt`
- `src/pages/robots.txt.ts`

## Assumptions

- AdSense slots differ per page via props (`slotId`).

## Unknowns / documentation gaps

- Contact form on `/contact/` — whether it uses a third-party form service or `mailto:` only.
- Search Console / analytics wiring.

## Maintenance notes

- Update when adding APIs, webhooks, form backends, or new third-party scripts.
- Revise CSP in `public/_headers` when adding external script domains.
