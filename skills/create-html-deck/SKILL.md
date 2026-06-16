---
name: create-html-deck
description: >-
  Create HTML slide decks and browser presentations with deck-stage viewer in
  phased steps with user checkpoints. Use for slide deck, HTML slides,
  presentation, or demo slides. After outline and theme selection, stop for
  user approval. Detects project CSS tokens or offers preset themes. After
  assemble, run preview.sh.
disable-model-invocation: false
---

# HTML Deck

Phased slide deck builder: outline → theme → sections → assemble → preview.
Read linked references before working.

## Iron rules

1. **Never skip gates** — outline OK → theme OK, in that order
2. **One phase per turn** — do not advance until the user says continue
3. **Always preview after assemble** — run `preview.sh`

## Phases

```
Phase 0  init        → auto
Phase 1  outline     → ⛔ user approval
Phase 1b theme       → ⛔ user approval (after outline OK only)
Phase 2  sections    → 1–3 slides per batch
Phase 3  notes       → speaker-notes + validate
Phase 4  assemble    → assemble → preview.sh (required)
Phase 5  bundle      → on delivery request only
```

## Task router — read the matching doc first

| Task | Doc |
|------|-----|
| Full workflow, gate messages | [references/workflow.md](references/workflow.md) |
| Theme selection, tokens | [references/themes.md](references/themes.md) |
| Section markup, layouts | [references/sections.md](references/sections.md) |
| Assemble, preview, bundle, export | [references/publish.md](references/publish.md) |
| deck-stage API, directory layout | [reference.md](reference.md) |

## Modes

| User intent | Phases |
|-------------|--------|
| New deck | 0 → 1 → 1b → 2 → 3 → 4 |
| Outline only | 1 |
| Theme change | 1b (before sections: apply-theme only; after assemble: edit tokens → re-assemble) |
| Edit slides | edit sections → re-assemble + preview |
| Deliver / Downloads | 5 (`export-download.sh`) |

## Edit boundaries

**NEVER**

- Rewrite `deck-stage.js`, `image-slot.js`, `bundler.js`
- Generate all sections at once without gates
- Invent new layout CSS classes

**MAY**

- `content/outline.md`, `sections/*.html`, `tokens.css` (`:root` only), `speaker-notes.json`

## Common commands

```sh
bash skills/create-html-deck/scripts/init-deck.sh slides/{deck}
bun skills/create-html-deck/scripts/detect-project-theme.mjs slides/{deck}
bash skills/create-html-deck/scripts/apply-theme.sh slides/{deck} <theme-id>
bun skills/create-html-deck/scripts/validate-content.mjs slides/{deck}
bash skills/create-html-deck/scripts/assemble.sh slides/{deck}
bash skills/create-html-deck/scripts/preview.sh slides/{deck}
bun skills/create-html-deck/scripts/bundle-standalone.mjs slides/{deck}
bash skills/create-html-deck/scripts/export-download.sh slides/{deck}
```
