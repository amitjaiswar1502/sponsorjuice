# UI and Routes

Last updated: 2026-07-12
Status: draft

## Confirmed facts

### Routes (`src/pages/`)

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `index.astro` | Home hub + calculator island + FAQ schema |
| `/calculator/tiktok/` | `calculator/[platform].astro` | TikTok pSEO landing + calculator |
| `/calculator/instagram/` | `calculator/[platform].astro` | Instagram pSEO landing |
| `/calculator/youtube/` | `calculator/[platform].astro` | YouTube pSEO landing |
| `/calculator/facebook/` | `calculator/[platform].astro` | Facebook pSEO landing |
| `/blog/` | `blog/index.astro` | Blog index |
| `/blog/{slug}/` | `blog/[slug].astro` | MDX post pages |
| `/about/` | `about.astro` | About / methodology |
| `/contact/` | `contact.astro` | Contact |
| `/privacy/` | `privacy.astro` | Privacy policy |
| `/robots.txt` | `robots.txt.ts` | Robots generator |

Trailing slashes enforced site-wide.

### Layout and chrome

- `src/layouts/Layout.astro` — meta, canonical URLs, Organization schema, AdSense script hook
- `src/components/Header.astro`, `Footer.astro`
- `src/components/seo/BreadcrumbSchema.astro`
- Site typography uses Plus Jakarta Sans for UI/prose and JetBrains Mono for numeric data.
- Reading copy follows a 16px / 1.65 line-height / 65ch measure baseline; lead copy uses 18px with the same measure.
- Text below 16px is reserved for navigation, metadata, captions, labels, and compact controls.

### Calculator components (`src/components/calculator/`)

- `CalculatorIsland.tsx` — main interactive app
- `MetricsSliders.tsx`, `PlatformAccountCard.tsx`, `DeliverablesBasket.tsx`
- `RateSummary.tsx`, `PitchTemplate.tsx`, `CalculationHistory.tsx`
- `CalculatorStaticFallback.astro` — static SEO fallback

### Page components (`src/components/pages/`)

- `PageHero`, `ContentSection`, `ContactCard`, `FaqItem`, `PolicyToc`

### Blog posts (3)

- `how-to-pitch.mdx`
- `instagram-reels-pricing-guide.mdx`
- `tiktok-sponsorship-rates-2026.mdx`

## Important files inspected

- `src/pages/*`
- `src/components/calculator/*`
- `src/layouts/Layout.astro`
- `src/content/blog/*`

## Assumptions

- Platform landing pages share one dynamic template with `SEOConfig.json` props.

## Unknowns / documentation gaps

- Full content and CTA structure of about/contact/privacy pages.
- Blog pagination strategy if post count grows.

## Maintenance notes

- Update when adding routes, renaming URLs, or restructuring components.
- Keep `SEOConfig.json` and route list in sync for new platforms.
