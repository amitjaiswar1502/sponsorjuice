# Project Overview

Last updated: 2026-07-12
Status: draft

## Confirmed facts

- **SponsorJuice** is a free static web app that helps content creators estimate brand deal / sponsorship rates for TikTok, Instagram, and YouTube.
- Production URL: `https://sponsorjuice.com` (`astro.config.mjs`).
- Core value: rate calculator (views × platform coefficient × niche × geography × deliverables), pitch email templates, and local calculation history.
- Monetization: lazy-loaded Google AdSense (`AdSenseContainer.astro`).
- No user accounts or backend database — calculations and history run client-side in the browser.
- Contact email in schema and `public/llms.txt`: `amitjaiswar1502@gmail.com`.
- Design spec approved 2026-06-29 in `docs/superpowers/specs/2026-06-29-sponsorjuice-design.md`.

## Important files inspected

- `package.json` — project name, scripts, Astro 7 + Preact + Tailwind stack
- `astro.config.mjs` — static site, sitemap, integrations
- `docs/superpowers/specs/2026-06-29-sponsorjuice-design.md` — v1 architecture decisions
- `public/llms.txt` — AI/crawler-facing site summary

## Assumptions

- Primary audience is creators seeking sponsorship pricing guidance and outreach copy (Tier 1 SEO traffic per design spec).
- README is still the Astro minimal starter template and does not reflect the actual product.

## Unknowns / documentation gaps

- Exact hosting provider and deploy pipeline (headers suggest Netlify/Cloudflare; not confirmed in repo).
- Analytics beyond AdSense (if any).
- Git default branch name and CI configuration.

## Maintenance notes

- Update when product positioning, monetization, or major modules change.
- Refresh README or link to `brain/kb/00-project-overview.md` if onboarding docs are improved.
