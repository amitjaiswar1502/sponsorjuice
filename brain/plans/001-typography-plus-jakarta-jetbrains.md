---
id: "001"
title: Typography upgrade — Plus Jakarta Sans + JetBrains Mono
tier: quick
type: repo-maintenance
status: done
created: 2026-07-12
approved: 2026-07-12
completed: 2026-07-12
files:
  - package.json
  - src/styles/global.css
  - src/layouts/Layout.astro
  - src/components/calculator/CalculatorIsland.tsx
  - src/components/calculator/PlatformAccountCard.tsx
  - src/components/calculator/RateSummary.tsx
  - src/components/calculator/CalculationHistory.tsx
  - src/components/calculator/MetricsSliders.tsx
  - src/components/calculator/CalculatorStaticFallback.astro
  - brain/rules/ui.md
  - brain/kb/02-stack-and-dependencies.md
  - brain/CHANGELOG.md
related_issues: []
related_plans: []
---

## Summary

Replace Outfit (single sans for everything) with a two-font system optimized for SponsorJuice: **Plus Jakarta Sans Variable** for UI and prose readability, **JetBrains Mono Variable** for rate displays and numeric data. Self-host via `@fontsource-variable` (same pattern as current Outfit setup). No Google Fonts CDN changes required.

## Goal

- Crisper, more readable typography across calculator UI, marketing pages, and blog prose
- Numeric data (rates, follower/view counts) scannable via monospace + tabular figures
- Zero regression on build, CSP, performance, or existing Tailwind v4 theme
- Remove unused Outfit dependency after migration

## Current state

| Item | Today |
| --- | --- |
| Sans | `@fontsource-variable/outfit` → `--font-sans: "Outfit Variable"` |
| Mono | None |
| Preload | `outfit-latin-wght-normal.woff2` in `Layout.astro` |
| Numeric styling | `.tabular-nums` utility in `global.css`; applied in 6+ calculator components |
| Prose | `max-w-[65ch] leading-relaxed` already set in `global.css` |
| CSP | `font-src 'self'` — self-hosted fonts only (no change needed) |

## Target typography system

| Role | Font | CSS token | Usage |
| --- | --- | --- | --- |
| UI + body + headings | Plus Jakarta Sans Variable | `--font-sans` | `font-sans` (default on `body`) |
| Rates, counts, money | JetBrains Mono Variable | `--font-mono` | `.font-data` utility (new) |

### Why this pairing

- **Plus Jakarta Sans**: product/SaaS clarity — trustworthy for pricing tool, strong at 14–16px labels and long blog paragraphs
- **JetBrains Mono**: crisp `$90 – $234`, slider values, saved calculation history
- Both OFL-1.1, variable weight, available on Fontsource (matches existing Astro self-host pattern)

---

## Implementation plan

### Phase 1 — Dependencies and theme tokens

**1.1 Install fonts**

```bash
npm install @fontsource-variable/plus-jakarta-sans @fontsource-variable/jetbrains-mono
npm uninstall @fontsource-variable/outfit
```

Use `npm` (repo has `package-lock.json`; do not switch to pnpm without explicit approval).

**1.2 Update [`src/styles/global.css`](src/styles/global.css)**

```css
@import "@fontsource-variable/plus-jakarta-sans/wght.css";
@import "@fontsource-variable/jetbrains-mono/wght.css";

@theme {
  --font-sans: "Plus Jakarta Sans Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}
```

Remove `@import "@fontsource-variable/outfit"`.

**1.3 Add `.font-data` utility** (centralizes numeric styling)

```css
.font-data {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

Keep existing `.tabular-nums` for backward compatibility; prefer `.font-data` on new/edited numeric spans.

**1.4 Refine prose typography** (small, high-impact readability tweaks)

```css
.prose p {
  @apply text-base leading-[1.7]; /* was leading-relaxed only */
}
```

Optional: add `letter-spacing: -0.02em` on `.prose h1, .prose h2` via `tracking-tight` (already on many headings).

---

### Phase 2 — Font loading and performance

**2.1 Update [`src/layouts/Layout.astro`](src/layouts/Layout.astro)**

- Replace Outfit preload import with Plus Jakarta Sans latin woff2:

```astro
import plusJakartaLatin from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';
```

- Add JetBrains Mono preload (latin subset only):

```astro
import jetbrainsMonoLatin from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
```

- In `<head>`:

```html
<link rel="preload" href={plusJakartaLatin} as="font" type="font/woff2" crossorigin="anonymous" />
<link rel="preload" href={jetbrainsMonoLatin} as="font" type="font/woff2" crossorigin="anonymous" />
```

**2.2 Performance guardrails**

- Preload **latin only** (site is English-only today)
- Do **not** preload italic axes (unused in UI)
- JetBrains Mono loads for calculator pages primarily — acceptable at ~50–80KB variable; if bundle audit shows concern, defer mono preload to calculator routes only (Phase 2b, optional)

**2.3 CSP**

No change required — fonts served from `'self'`. Existing `fonts.googleapis.com` / `fonts.gstatic.com` in CSP are unused today; optional cleanup in a separate hygiene task.

---

### Phase 3 — Apply fonts to components

Replace `tabular-nums` with `font-data` on **money and count displays** (not on entire cards or headings).

| File | Elements to update |
| --- | --- |
| [`CalculatorIsland.tsx`](src/components/calculator/CalculatorIsland.tsx) | Hero rate `formatCurrency(displayLow)` block; base rate line |
| [`PlatformAccountCard.tsx`](src/components/calculator/PlatformAccountCard.tsx) | Follower/view slider values; platform rate range |
| [`RateSummary.tsx`](src/components/calculator/RateSummary.tsx) | Line-item rates; package total |
| [`CalculationHistory.tsx`](src/components/calculator/CalculationHistory.tsx) | Saved rate ranges |
| [`MetricsSliders.tsx`](src/components/calculator/MetricsSliders.tsx) | Follower/view display spans (add `font-data`) |
| [`CalculatorStaticFallback.astro`](src/components/calculator/CalculatorStaticFallback.astro) | Example estimate `<strong>` rate range |

**Do not** change:

- Pitch template textarea (prose/email copy stays sans)
- Navigation, buttons, FAQ questions (sans)
- [`about.astro`](src/pages/about.astro) stat numbers — optional `font-data` for "3", "4", "Free" block

---

### Phase 4 — Weight hierarchy audit

Ensure Tailwind weight classes align with Plus Jakarta Sans variable axis (200–800):

| Element | Weight class | Notes |
| --- | --- | --- |
| Body | default (400) | `body` in global.css |
| Labels, nav | `font-medium` (500) | Already used |
| Card titles, section headings | `font-semibold` (600) | Already used |
| Page H1, hero | `font-bold` (700) | Already used |
| Avoid | `font-extrabold` (800) | Not needed; keep hierarchy subtle |

No global class renames required — Outfit and Plus Jakarta Sans share similar weight semantics.

---

### Phase 5 — Documentation and KB

| File | Update |
| --- | --- |
| [`brain/rules/ui.md`](brain/rules/ui.md) | Plus Jakarta Sans + JetBrains Mono; `.font-data` for rates |
| [`brain/kb/02-stack-and-dependencies.md`](brain/kb/02-stack-and-dependencies.md) | Replace Outfit row in dependencies table |
| [`brain/kb/05-api-and-integrations.md`](brain/kb/05-api-and-integrations.md) | Font integration note (self-hosted fontsource) |
| [`brain/CHANGELOG.md`](brain/CHANGELOG.md) | Typography upgrade entry |

---

## Verification checklist

### Automated

- [ ] `npm run build` succeeds (no missing font imports)
- [ ] `npm test` passes (no font-related test changes expected)
- [ ] Grep confirms zero remaining `@fontsource-variable/outfit` references

### Visual (manual)

- [ ] Home hero H1 renders Plus Jakarta Sans (not system fallback)
- [ ] Calculator main rate `$X – $Y` uses JetBrains Mono
- [ ] Slider follower/view counts use mono
- [ ] Blog prose at `/blog/how-to-pitch/` readable at 16px / 1.7 line-height
- [ ] Mobile nav and platform cards unchanged in layout (no overflow from wider mono digits)
- [ ] `font-data` digits align in RateSummary column (tabular alignment)

### Performance

- [ ] Network tab: 2 woff2 preloads (Plus Jakarta + JetBrains latin)
- [ ] No Google Fonts network requests
- [ ] Lighthouse text contrast unchanged (gray-700 on gray-50)

---

## Rollback plan

If typography regresses readability or layout:

1. `npm install @fontsource-variable/outfit`
2. Revert `global.css` imports and `--font-sans`
3. Revert `Layout.astro` preload
4. Remove `font-data` class usages (restore `tabular-nums` only)
5. `npm uninstall @fontsource-variable/plus-jakarta-sans @fontsource-variable/jetbrains-mono`

Single commit revert is safe — no data model or API changes.

---

## Out of scope

- Instrument Serif / Source Sans editorial pairing (Option 2)
- Outfit + DM Sans split (Option 3)
- Loading fonts per-route (calculator-only mono) — defer unless bundle size issue found
- Changing font on pitch email textarea
- Google Fonts CDN migration
- Logo/wordmark redesign

---

## Acceptance criteria

1. Outfit fully removed; Plus Jakarta Sans is the sole sans family site-wide
2. All calculator rate and count displays use JetBrains Mono via `.font-data`
3. Fonts self-hosted via Fontsource; build and CSP unchanged
4. Prose readability improved (`text-base`, `leading-[1.7]`, 65ch max-width preserved)
5. Brain KB and changelog updated
6. No visual layout breaks on mobile (375px) or desktop (1280px)

## Estimated effort

**~45–60 minutes** — dependency swap, 6 component touch points, preload update, KB docs, visual QA.
