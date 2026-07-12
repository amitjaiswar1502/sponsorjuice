# Infrastructure and Deployment

Last updated: 2026-07-12
Status: draft

## Confirmed facts

- **Build:** Static Astro site → `dist/` directory.
- **Site config:** `site: 'https://sponsorjuice.com'`, `trailingSlash: 'always'`.
- **Sitemap:** `@astrojs/sitemap` integration; build script copies `sitemap-index.xml` to `sitemap.xml`.
- **Security headers:** `public/_headers` (HSTS, CSP, cache rules for `/_astro/*`).
- **Apache:** `public/.htaccess` present.
- **Ads:** `public/ads.txt` for AdSense.
- **Env files:** `.env`, `.env.production`, `.env.example` gitignored (`.env.example` may exist locally).
- **No GitHub Actions** workflows found at init.

### Public env vars

- `PUBLIC_SITE_URL`, `PUBLIC_ADSENSE_ID`, `PUBLIC_ADSENSE_HOME_SLOT`

## Important files inspected

- `astro.config.mjs`
- `package.json` (build script)
- `public/_headers`, `public/.htaccess`, `public/ads.txt`
- `.gitignore`

## Assumptions

- Deployed to a static host supporting `_headers` (Netlify) or equivalent CDN rules.

## Unknowns / documentation gaps

- Exact hosting provider, branch deploy mapping, and preview URLs.
- CI/CD pipeline and quality gates before production.
- Environment variable setup in hosting dashboard.

## Maintenance notes

- Update when adding CI, changing hosts, or documenting env vars in `.env.example`.
