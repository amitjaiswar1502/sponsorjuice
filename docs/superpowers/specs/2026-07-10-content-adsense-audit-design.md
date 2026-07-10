# Content Repetition & AdSense Compliance — Design Spec

**Date:** 2026-07-10  
**Status:** Approved for implementation

## Summary

Audit of all 9 SponsorJuice routes found duplicate calculator boilerplate, overlapping FAQs across Home and Contact, and several AdSense compliance gaps. This spec defines remediation for both content quality and publisher readiness.

## Content repetition — findings

### High severity

1. **Calculator "How to Use" section** — identical on TikTok, Instagram, and YouTube pages.
2. **Calculator cross-link paragraph** — identical on all three platform pages.
3. **Cross-page FAQs** — Home and Contact share verbatim answers for free tier, data storage, and offline use.

### Low severity (acceptable)

- Platform-specific intros and FAQs in `SEOConfig.json` are unique.
- About page pricing methodology is editorial, not duplicate FAQ format.

## AdSense compliance — findings

### Passing

- Privacy policy with AdSense and cookie disclosures
- Privacy linked in header and footer
- About and Contact pages present
- AdSense script in `Layout.astro`
- robots.txt and sitemap
- CSP allows AdSense domains

### Failing / at risk

- Missing `ads.txt`
- No ad unit placements (containers removed)
- Misleading PWA/service worker claims on homepage
- Misleading open-source claims (no LICENSE file)
- No cookie consent for EEA traffic (deferred)
- Placeholder ad slot IDs invalid

## Remediation design

### 1. Fix misleading claims (`index.astro`)

- **Free FAQ:** Remove "open-source"; state "100% free" only.
- **Offline FAQ:** Remove PWA/service worker claims; describe client-side browser operation and local storage.

### 2. Deduplicate calculator pages

Add per-platform fields to `SEOConfig.json`:

- `howToUse` — platform-specific usage instructions
- `crossLinkIntro` — platform-aware cross-link copy

Wire fields into `calculator/[platform].astro`; remove hardcoded duplicate paragraphs.

### 3. Trim Contact FAQs

Remove FAQs that duplicate Home:

- Is SponsorJuice free?
- Do you store my calculation data?
- Can I use the rate calculator offline?
- How are the platform coefficients determined?

Keep Contact-specific FAQs: feature requests, troubleshooting, response times.

### 4. AdSense infrastructure

- Add `public/ads.txt` with publisher ID `pub-1680488274273475`
- Re-add homepage `AdSenseContainer` gated on `PUBLIC_ADSENSE_HOME_SLOT` env var (real slot ID from AdSense dashboard)

### 5. Deferred (optional follow-up)

- Terms of Service page
- Cookie consent CMP for EU traffic
- Additional blog posts for content depth

## Verification

- [x] No identical paragraph on more than one calculator page
- [x] Home and Contact FAQs have no verbatim duplicates
- [x] PWA and open-source claims are accurate
- [x] `/ads.txt` serves correctly
- [x] Homepage ad unit renders when `PUBLIC_ADSENSE_HOME_SLOT` is set
- [x] `npm run build` passes
