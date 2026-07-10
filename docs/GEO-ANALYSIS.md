# GEO / SEO / AEO Analysis — SponsorJuice

**Date:** 2026-07-10  
**Site:** https://sponsorjuice.com

## GEO Readiness Score: 72/100 (post-remediation)

| Platform focus | Score | Notes |
|---|---|---|
| Google AI Overviews | 74/100 | FAQ schema, citability blocks, static calculator examples |
| ChatGPT / Perplexity | 68/100 | llms.txt added; brand off-site presence still limited |
| Traditional SEO | 75/100 | Schema, sitemap, unique platform pages, expanded blog |

## AI Crawler Access Status

| Crawler | Status |
|---|---|
| GPTBot | Allowed |
| OAI-SearchBot | Allowed |
| ClaudeBot | Allowed |
| PerplexityBot | Allowed |
| CCBot | Disallowed (training opt-out) |
| Googlebot | Allowed (default) |

## llms.txt Status

Present at `/llms.txt` with page index, key facts, and contact info.

## Top 5 Highest-Impact Changes (implemented)

1. **llms.txt + AI crawler robots.txt rules** — explicit AI search visibility
2. **SSR calculator fallback** — example rates visible without JavaScript
3. **Citability blocks** — 134–167 word self-contained passages on homepage and calculator pages
4. **Schema fixes** — Organization, WebApplication, BreadcrumbList; removed invalid SearchAction
5. **2 new blog posts** — topical depth for TikTok and Instagram rate queries

## Schema Recommendations (implemented)

- `Organization` globally in Layout
- `WebApplication` on homepage and calculator routes
- `FAQPage` on homepage and calculators
- `BreadcrumbList` on inner pages
- `Article` with `dateModified` on blog posts

## Content Reformatting (implemented)

- Homepage: definitional citability block after hero
- Calculators: platform-specific citability + question-based H2s
- Blog: 2 new long-form guides with tables and FAQs

## Remaining opportunities

- Cookie consent CMP for EU AdSense traffic
- Terms of Service page
- Off-site brand mentions (Wikipedia, Reddit, YouTube)
- Author credentials / Person schema
- More blog posts (Twitch, newsletter sponsorships)

## Verification checklist

- [x] `/llms.txt` returns 200
- [x] robots.txt lists AI crawlers
- [x] Calculator pages show example rates in view-source
- [x] No invalid SearchAction on homepage
- [x] 3 blog posts in build output
- [x] `npm run build` passes
