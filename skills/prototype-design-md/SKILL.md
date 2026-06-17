---
name: prototype-design-md
description: >-
  Write the initial DESIGN.md for prototype phase — a one-page brief AI reads
  before v0, Cursor, or other UI generation. Product feel, surface/density,
  forbidden patterns, component selection. Use when feel is vague (getdesign.md).
  Design tokens own values; DESIGN.md owns judgment.
disable-model-invocation: true
---

# Prototype DESIGN.md

**Output:** `DESIGN.md` at project root — the **first brief** for prototype UI work.  
**Not:** token hex, full component specs, or pixel-perfect layout.

Read [prototype-brief.md](references/prototype-brief.md) for the content model.  
Read [workflow.md](references/workflow.md) for gates.  
Read [theme-discovery.md](references/theme-discovery.md) for Phase 0 ([getdesign.md](https://getdesign.md/)).

## What this file is

| Design tokens (CSS `var(--*)`) | DESIGN.md |
|-----|-----------|
| Values (`--primary`, sizes, radii) | Judgment (feel, surface, forbidden, selection) |

AI reads DESIGN.md **before** generating UI. Prototype grows; this brief stays the tone contract.

## Iron rules

1. **Judgment, not values** — no `colors` / `typography` / `components` in YAML
2. **YAML metadata only** — `name`, `description`, optional `version`
3. **Product Feel includes negatives** — 「〜ではない」で AI 装飾を抑止
4. **Surface + density explicit** — per [surface-types.md](references/surface-types.md)
5. **Component Selection, not specs** — which pattern when; defer hover/padding tokens
6. **Forbidden Patterns verifiable** — [anti-slop.md](references/anti-slop.md)
7. **Responsive priority is intake-driven** — not always desktop-first
8. **One gate** — Phase 1 intent OK → Phase 2 write + lint. See [workflow.md](references/workflow.md)
9. **Phase 0 (when feel vague):** 5 reference themes from getdesign.md + token strategy A/B/C — [theme-discovery.md](references/theme-discovery.md). **Each candidate must include `https://getdesign.md/<slug>/design-md`** (or webdesignhot fallback if 404)
10. **Before Phase 1:** [intake.md](references/intake.md) + [prototype-brief.md](references/prototype-brief.md)

## Five pillars (map to sections)

| Pillar | Where |
|--------|--------|
| Product feel | `## Overview` → ### Product Feel |
| Surface & density | `## Overview` → ### Surface Type, ### Density |
| Layout rules | `## Layout` |
| Forbidden patterns | `## Forbidden Patterns` (after §8) |
| Component selection | `## Components` |

**Extensions:** `## Copy Guidelines`, `## Responsive Priority`, `## Minimum Verification`

Thin canonical sections for lint: Colors (CSS path + usage limits), Typography, Elevation, Shapes.

## CSS detection (during Phase 2)

```sh
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
```

- CSS found → role → `var(--*)` usage limits in Colors prose
- CSS missing → note path in Colors + Agent Instructions; optional `:root` in chat only

## Modes

| Intent | Flow |
|--------|------|
| New prototype (vague feel) | 0 → 1 → 2 |
| New prototype (clear direction) | 0 (light) → 1 → 2 |
| Guardrails only | 1 (light) → 2 |
| After tokens themed | detect → 1 → 2 |
| Existing brand locked | 1 → 2 (token strategy C) |
| Post-prototype detail | edit DESIGN.md or split spec files — out of scope here |

## NEVER

- YAML token blocks or hex in DESIGN.md body
- Full component specs at prototype
- Generic feel without negatives ("modern and clean")
- Universal "always Table" / "always desktop-first" without surface/intake
- Multiple approval sub-gates
- Inter / Roboto / Arial without explicit request
- Phase 0 shortlist entries without a preview URL
- getdesign.md URLs for slugs not in `npx getdesign@latest list` (catalog mismatch)

## Commands

```sh
bash skills/prototype-design-md/scripts/init-design-md.sh
bash skills/prototype-design-md/scripts/lint-design-md.sh [DESIGN.md]
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
npx getdesign@latest list
npx @webdesignhot/design-md category <name>
npx @webdesignhot/design-md add <slug> -o /tmp/ref.md
npx @webdesignhot/design-md export /tmp/ref.md --to css
```

## After Phase 2

Use DESIGN.md as context for UI generation (Cursor, v0).  
When the product matures, add component specs or split files — do not bloat the prototype brief.
