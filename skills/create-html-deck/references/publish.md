# Publish

Phases 3–5: validate, assemble, preview, bundle, export.

## Phase 3 — speaker notes

Edit `content/speaker-notes.json` — keys match `sections/*.html` basenames.

```sh
bun skills/create-html-deck/scripts/validate-content.mjs slides/{deck}
```

Fix all errors before assemble.

## Phase 4 — assemble + preview

```sh
bun skills/create-html-deck/scripts/validate-content.mjs slides/{deck}
bash skills/create-html-deck/scripts/assemble.sh slides/{deck}
bash skills/create-html-deck/scripts/preview.sh slides/{deck}
```

`preview.sh` uses `npx serve` (default port **3456**) and opens the browser.

### Re-assemble after edits

Remove generated files, then assemble + preview again:

```sh
rm -f slides/{deck}/index.html slides/{deck}/deck-stage.js slides/{deck}/image-slot.js slides/{deck}/slide-styles.css slides/{deck}/slide-section.stub.html
bash skills/create-html-deck/scripts/assemble.sh slides/{deck}
bash skills/create-html-deck/scripts/preview.sh slides/{deck}
```

**Partial re-assemble** (keep local `slide-styles.css` edits):

```sh
rm slides/{deck}/index.html slides/{deck}/deck-stage.js slides/{deck}/image-slot.js
bash skills/create-html-deck/scripts/assemble.sh slides/{deck}
bash skills/create-html-deck/scripts/preview.sh slides/{deck}
```

Generated files — do not hand-edit: `index.html`, `deck-stage.js`, `image-slot.js`.

## Phase 5 — standalone bundle

```sh
bun skills/create-html-deck/scripts/bundle-standalone.mjs slides/{deck}
```

Output: `slides/{deck}/dist/standalone.html`
Inlines CSS, base64-encodes JS/assets, wraps with `templates/standalone/bundler.js`. Opens via `file://`.

## Export to Downloads (macOS)

Bundle + copy to `~/Downloads/YYYY-MM-DD_{title}.html`, open Finder:

```sh
bash skills/create-html-deck/scripts/export-download.sh slides/{deck}
```

Filename from `content/meta.json` → `title` (fallback: folder name). Slug: spaces → hyphens, unsafe chars stripped. Collisions get `-2`, `-3`, …
