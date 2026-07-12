# Deployment

## Environments

- Production site: `https://sponsorjuice.com` (`site` in `astro.config.mjs`).
- Optional override: `PUBLIC_SITE_URL` env var used in layouts and schema.

## Hosting signals

- Static build output: `dist/` after `npm run build`.
- `public/_headers` — security and cache headers (Netlify/Cloudflare style).
- `public/.htaccess` — Apache rules present.
- `public/ads.txt` — AdSense publisher declaration.
- No `.github/workflows/` found in repo at init time.

## Env vars (public)

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical site URL override |
| `PUBLIC_ADSENSE_ID` | Google AdSense client ID |
| `PUBLIC_ADSENSE_HOME_SLOT` | Home page ad slot |

Defaults exist in code for AdSense client when env is unset.

## CI/CD

- Document pipeline entry points when added — never commit secrets.
- **Branch → environment mapping** lives in [workflow.md](workflow.md).

## Releases

- Version in `package.json` is `0.0.1`; no formal release process documented yet.
- Build step copies `sitemap-index.xml` to `sitemap.xml` for SEO compatibility.
