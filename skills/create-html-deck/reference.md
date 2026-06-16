# Reference

Runtime: Anthropic Omelette starter scaffold (vendored in `templates/viewer/`).

Workflow, themes, sections, publish: see [references/](references/).

## Directory layout

```
slides/{deck}/
├── content/                 # edit in content / edit modes
│   ├── outline.md
│   ├── meta.json
│   ├── tokens.css
│   ├── speaker-notes.json
│   └── sections/NN-*.html
├── index.html               # generated — do not hand-edit
├── slide-styles.css
├── deck-stage.js            # frozen copy from templates/viewer/
├── image-slot.js
└── dist/standalone.html     # bundle mode
```

## deck-stage API

```js
const deck = document.querySelector('deck-stage');
deck.goTo(0);
deck.addEventListener('slidechange', (e) => e.detail.index);
```

Keyboard: `→` `←` `Space` `Home` `End` `1-9` `R`

Custom element attributes: `width`, `height` (default 1920×1080).

## Repo layout

Place decks under `slides/{deck}/` outside the app bundler entry (repo root or a dedicated folder). Generated HTML is static — not part of the frontend build. Open via `preview.sh`, or link/embed from the product when needed.
