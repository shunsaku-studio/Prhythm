# Workflow

Phased gates are mandatory. Details for theme, sections, and publish live in sibling docs.

## Phase 0 — init

```sh
bash skills/create-html-deck/scripts/init-deck.sh slides/{deck}
```

- Creates `slides/{deck}/content/` from templates
- `tokens.css` starts as **default** — theme is finalized in Phase 1b

## Phase 1 — outline ⛔

1. Fill every row in `content/outline.md`
2. Adjust `content/meta.json` title

**Stop.** Show the user the outline table:

```
Outline ready. (paste the table)
Slides: N. Reply "OK" to continue, or give line numbers to fix.
Do not start sections or theme until outline is OK.
```

## Phase 1b — theme ⛔

Outline must be OK first. Full steps: [themes.md](themes.md).

**Stop** after presenting theme options.
**Stop** again after applying a theme — show token summary, wait for OK before Phase 2.

## Phase 2 — sections

Start only after theme OK.

- Process outline **1–3 rows per batch**
- Create `content/sections/{file}` from [slide-section.stub.html](../templates/viewer/slide-section.stub.html)
- Markup rules: [sections.md](sections.md)

**Stop after each batch.** Show slide titles (and layout intent if non-obvious). Wait for OK or edits before the next batch.

## Phase 3 — notes

```sh
bun skills/create-html-deck/scripts/validate-content.mjs slides/{deck}
```

- Fill `content/speaker-notes.json` (keys match section filenames)
- Fix any validation errors before assemble

**Stop.** Show notes summary:

```
Speaker notes ready. (N slides covered)
Validation: pass | list errors if any
Reply "OK" to assemble, or give slide numbers to fix.
```

## Phase 4 — assemble + preview

```sh
bun skills/create-html-deck/scripts/validate-content.mjs slides/{deck}
bash skills/create-html-deck/scripts/assemble.sh slides/{deck}
bash skills/create-html-deck/scripts/preview.sh slides/{deck}
```

`preview.sh` opens the browser — required after every assemble.

Re-assemble after content edits: [publish.md](publish.md)

## Phase 5 — bundle / export

On delivery request only: [publish.md](publish.md)

## Gate summary

| Phase | Output | Stop for user? |
|-------|--------|----------------|
| 0 init | `content/` dir | No |
| 1 outline | `outline.md` filled | **Yes** |
| 1b theme | `tokens.css` + `meta.theme` | **Yes — propose, apply, wait OK** |
| 2 sections | `sections/*.html` | **Yes — per batch (1–3 slides)** |
| 3 notes | `speaker-notes.json` + validate | **Yes — show summary, wait OK** |
| 4 assemble | `index.html` + preview | Auto-open browser |
| 5 bundle | `dist/standalone.html` | On request |
