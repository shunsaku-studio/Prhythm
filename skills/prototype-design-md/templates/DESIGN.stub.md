---
version: alpha
name: Untitled Product
description: >-
  Prototype brief for coding agents. Token values live in project CSS only.
  This file defines judgment — feel, surface, forbidden patterns, selection.
---

## Overview

### Product Feel

_(2–3 sentences: material metaphors for tone. Include what this product is **NOT**.)_

### Surface Type

- **Primary:** _(operational tool | dashboard | docs | marketing — main shell)_
- **Secondary:** _(optional — e.g. form, settings)_
- **Tertiary:** _(optional — empty/onboarding)_

### Density

_(Per surface if mixed — e.g. dashboard high, form medium.)_

## Colors

**Token source:** _(path to globals.css, or "proposed — create CSS first")_

Document role → `var(--*)` **usage limits** only. No hex in this file.

- **Primary (`--primary`):** one CTA driver per screen — never page backgrounds.

## Typography

Font direction + copy posture. Sizes/weights live in CSS.

## Layout

Layout **rules** — shell pattern, column limits, card policy, no-hero rule.

## Elevation & Depth

One-line strategy or "follow project CSS tokens."

## Shapes

Follow `--radius` from CSS unless a product-specific rule is needed.

## Components

**Selection guide** — which pattern for which job. Not full component specs.

Example bullets:

- List of records → Table _(CRUD/admin surfaces)_
- Feed of messages → card list _(social/recognition surfaces)_
- Destructive action → danger variant + confirm

## Do's and Don'ts

**Do**

- (verifiable — min 5)

**Don't**

- (verifiable — min 5)

### Agent Instructions

- Read project CSS for values; read this file for judgment
- Check Forbidden Patterns and Minimum Verification before marking UI done
- Do not invent hex or layout detail not implied by this brief

## Forbidden Patterns

- (verifiable AI-slop defenses — gradients, hero bands, icon-only labels, etc.)

## Copy Guidelines

- Button labels: verb-first
- Errors: what happened + what to do
- No obvious placeholder filler

## Responsive Priority

1. _(from intake — e.g. Mobile 375px first, or Desktop 1280px first)_
2. ...

## Minimum Verification

- [ ] Density matches surface type
- [ ] No Forbidden Patterns
- [ ] Text does not overflow at priority viewport
- [ ] Primary / secondary / destructive actions distinguishable
- [ ] Empty / loading / error considered
