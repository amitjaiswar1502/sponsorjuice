# Known Risks and Decisions

Last updated: 2026-07-12
Status: draft

## Confirmed facts

### Documented architecture decisions

See [decisions/001-static-astro-architecture.md](decisions/001-static-astro-architecture.md) — sourced from `docs/superpowers/specs/2026-06-29-sponsorjuice-design.md`.

| Decision | Choice |
| --- | --- |
| Framework | Astro static |
| Islands | Preact (small bundle) |
| pSEO URLs | `/calculator/{platform}` only (3 pages) |
| Blog | MDX content collections |
| Persistence | localStorage (no backend) |
| Ads | Lazy AdSense |

### Risks and tradeoffs

- **localStorage fragility** — clearing browser data loses history; no cross-device sync.
- **Formula accuracy** — rates are estimates; niche/geo coefficients are heuristic, not market data API.
- **AdSense + CSP** — `public/_headers` CSP must stay aligned with AdSense script domains.
- **README drift** — starter README does not document SponsorJuice; onboarding risk for contributors.
- **No CI** — regressions rely on local `npm test` and manual checks.

## Important files inspected

- `docs/superpowers/specs/2026-06-29-sponsorjuice-design.md`
- `docs/superpowers/specs/2026-07-10-seo-geo-aeo-audit-design.md` (exists; not fully read)
- `public/_headers`

## Assumptions

- SEO/GEO audit specs describe planned improvements, not all implemented.

## Unknowns / documentation gaps

- Production incident history.
- Legal review status of rate disclaimers.

## Maintenance notes

- Add `decisions/NNN-*.md` for significant new choices.
- Log deprecations and breaking localStorage changes here.
