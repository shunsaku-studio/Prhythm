# Prototype Brief Model

DESIGN.md at prototype phase = **one brief AI reads before generating UI**.  
CSS owns **values**; DESIGN.md owns **judgment**. (Values = design tokens, typically CSS custom properties.)

## Five pillars (+ extensions)

| Pillar | Section | Write |
|--------|---------|-------|
| 1. Product feel | `## Overview` → ### Product Feel | 2–3 sentences + **what it is NOT** |
| 2. Surface & density | `## Overview` → ### Surface Type, ### Density | Primary surface required; secondary/tertiary if mixed product |
| 3. Layout rules | `## Layout` | How to use grid/shell — not pixel specs |
| 4. Forbidden patterns | `## Forbidden Patterns` (extension) | AI-slop defense — verifiable |
| 5. Component selection | `## Components` | **Which** component when — not full specs |

**Extensions** (after canonical §8 Do's and Don'ts):

- `## Copy Guidelines` — button labels, errors, placeholders
- `## Responsive Priority` — ordered breakpoints (**intake-driven**, not always desktop-first)
- `## Minimum Verification` — checklist for AI self-review

## Canonical sections (lint)

Google spec requires §1–8 in order. Keep thin when judgment lives elsewhere:

| Section | Prototype depth |
|---------|-----------------|
| Overview | **Full** (feel + surface + density) |
| Colors | CSS path + role **usage limits** only — no hex |
| Typography | Font direction + pointer to CSS |
| Layout | **Rules** (pillar 3) |
| Elevation & Depth | One-line strategy or "follow CSS" |
| Shapes | "follow `--radius`" or one rule |
| Components | **Selection guide** (pillar 5) |
| Do's and Don'ts | Agent Instructions + overlap OK with Forbidden |

## Do not write at prototype

- Token hex / YAML token blocks
- Full component specs (hover states, padding tokens)
- Motion / animation detail
- Governance / contribution workflow

## Critical nuance (do not copy blindly)

| Generic advice | This skill |
|----------------|------------|
| "Always use Table for lists" | **Surface-dependent** — CRUD/admin → table; feed/social → card list |
| "Desktop-first prototype" | **Intake-driven** — mobile-critical products prioritize accordingly |
| Positive tone only | **Negative constraints** required ("〜ではない") |

See [anti-slop.md](anti-slop.md), [surface-types.md](surface-types.md).
