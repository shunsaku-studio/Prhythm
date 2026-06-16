# Surface Types

Declare one primary surface in Overview. Wrong surface type is the main cause of AI marketing-page slop in operational apps.

## Types

| Surface | User goal | Density | Typical layout |
|---------|-----------|---------|----------------|
| **operational tool** | Complete tasks fast | high | tables, filters, side panels, inline actions |
| **dashboard** | Scan metrics, drill down | medium–high | cards with data, charts, KPI rows |
| **docs** | Read and navigate content | medium | sidebar nav, prose column, TOC |
| **marketing** | Convert visitors | low–medium | hero, sections, testimonials, CTA bands |

## Selection guide

```
Daily repeat tasks, CRUD, admin?     → operational tool
Metrics overview, monitoring?      → dashboard
Long-form reading, API reference?    → docs
Landing, pricing, campaign page?     → marketing
```

Mixed products: pick the **default shell** for most screens. Marketing pages are exceptions, not the template for the whole app.

## Per-surface rules

### operational tool

- No hero sections on app screens
- Primary action per screen: one high-emphasis button
- Prefer tables and dense lists over feature card grids
- Filters and search visible without scrolling
- Empty states: message + single CTA

### dashboard

- Cards hold **data**, not decoration
- No nested cards
- Chart colors from semantic palette only
- KPI numbers use `headline-*`; labels use `label-*`

### docs

- Readable line length (≈65–75ch prose column)
- Generous vertical rhythm between sections
- Code blocks monospace; body sans-serif
- Nav persistent; content scrolls

### marketing

- Hero allowed **only** on marketing surfaces
- Still forbid generic AI templates (purple gradient + 3 cards)
- CTA hierarchy: one primary per viewport

## Overview template snippet

```markdown
## Overview

**Surface:** operational tool — users process records daily, not browse marketing content.
**Density:** high — prioritize scanability and keyboard-friendly density.

[3–5 sentences: world view, audience, emotional feel with concrete metaphors]
```
