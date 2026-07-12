# UI and design

## When this file applies

- Layout, visual design, components, accessibility, motion, or UX copy.

## Impeccable skill

- For substantial UI design, redesign, or polish, use the **impeccable** skill when installed.

## Baseline

- Preserve existing design system tokens, spacing, and component patterns (juice-themed gradients, Plus Jakarta Sans, JetBrains Mono for rates, gray scale).
- Use `.font-data` for rate displays, follower/view counts, and other numeric UI.
- Reading copy uses `text-base`, `leading-[1.65]`, and a maximum measure of `65ch`; lead copy uses `text-lg` with the same leading and measure.
- Reserve `text-sm` for navigation, metadata, captions, labels, and other UI chrome rather than paragraph content.
- Use `text-pretty` for paragraph copy and `text-balance` for prominent headings where wrapping benefits from it.
- Blog `.prose blockquote` renders TL;DR summaries as juice-tinted callout cards (left accent border).
- Blog `.prose table` renders bordered, scrollable data tables; last column uses `.font-data` for rates and numeric values.
- Accessible defaults: semantic HTML, labels on forms, visible focus, sufficient contrast.
- Responsive behavior should match patterns already in the repo.
- Static fallback: `CalculatorStaticFallback.astro` provides no-JS SEO content on calculator pages.
- Reusable page primitives: `PageHero`, `ContentSection`, `ContactCard`, `FaqItem`, `PolicyToc` under `src/components/pages/`.
