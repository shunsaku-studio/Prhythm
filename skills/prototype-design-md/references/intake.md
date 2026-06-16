# Intake

Gather before Phase 1. Ask **missing required** items only.

**Goal:** enough for prototype brief (feel + surface + forbidden). Not pixel spec.

## Required

| Field | Question |
|-------|----------|
| Product name | What is it called? |
| One-line purpose | What does it do? |
| Target users | Who uses it daily? |
| Product feel | Material metaphors + **what it is NOT** |
| Primary surface | tool / dashboard / docs / marketing |

## Ask when relevant

| Field | When |
|-------|------|
| Secondary/tertiary surfaces | Mixed product (settings form, onboarding) |
| Density | Unclear from surface + purpose |
| Reference products | Vague tone or "like X" |
| Responsive priority | Mobile-critical vs desktop-first |
| Tech stack | CSS path guess |
| Existing brand | Locked colors/fonts mentioned |
| Forbidden aesthetics | Prior AI slop experiences |

## Tone translation

| User says | Translate |
|-----------|-----------|
| "modern and clean" | Linear / Notion / NYT — pick one |
| "happy" | sunshine desk, not confetti app |
| "like Bonusly" | casual feed, short messages — patterns only |

## CSS detection (Phase 2)

```sh
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
```

CSS authoritative. No token values in DESIGN.md.
