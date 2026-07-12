# Decision: Static Astro Architecture

Last updated: 2026-07-12
Status: reviewed

## Context

SponsorJuice v1 targets SEO traffic and free calculator utility without backend cost.

## Decision

Use **Astro static output** with **Preact islands** for the interactive calculator, **MDX content collections** for blog, and **localStorage** for history. Monetize via **lazy-loaded AdSense**.

## Rationale

| Choice | Rationale |
| --- | --- |
| Astro static | Pure HTML for SEO pages, minimal JS |
| Preact | Smallest hydration bundle (~3KB) |
| Platform-only pSEO URLs | 3 focused landing pages; niche selected in UI |
| localStorage | No backend required |
| Lazy AdSense | Protects Core Web Vitals |

## Source

- `docs/superpowers/specs/2026-06-29-sponsorjuice-design.md` (approved 2026-06-29)

## Consequences

- No user accounts or server-side analytics of calculations.
- Feature additions that need a backend require revisiting this decision.
