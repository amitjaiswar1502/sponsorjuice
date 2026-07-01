# Multi-Platform Creator Pitch — Design Spec

**Date:** 2026-06-29  
**Status:** Approved for implementation

## Overview

Extend SponsorJuice so creators with multiple social accounts can toggle active platforms (1–3), configure per-platform metrics, see line-item + total pricing, and draft both a combined cross-platform pitch and individual platform pitches.

## Decisions

| Topic | Choice |
|-------|--------|
| Email output | Combined pitch + per-platform pitches |
| Metrics | Per-platform followers, views, niche, geo |
| Combined pricing | Line-item breakdown + sum total |
| Platform UI | Toggle active platforms |
| Deliverables | One shared basket for all active platforms |
| Combined currency | Each line in platform geo currency; total in first active platform's currency with footnote |

## Data model

- `PlatformProfile` — platform, active, followers, views, niche, geo
- `PlatformRateLine` — platform + package rate range
- `PitchMode` — `'combined'` or a `Platform`
- `SavedCalculation` v2 — `version: 2`, `platformProfiles`, `pitchTexts`, `activePitchMode`; v1 entries migrate on load

## UI

- **PlatformAccountCard** — toggle + per-platform metrics + mini rate preview
- **RateSummary** — line items + package total
- **PitchTemplate** — segmented control: Combined (2+ active) | each active platform
- Per-mode editable pitch with independent dirty state

## Out of scope

Bundle discounts, per-platform baskets, live FX, platforms beyond TikTok/Instagram/YouTube, backend accounts.
