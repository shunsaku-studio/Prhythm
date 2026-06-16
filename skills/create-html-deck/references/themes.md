# Themes

Phase 1b — runs only after outline is OK.

## Step 1 — detect project theme (if repo has tokens)

```sh
bun skills/create-html-deck/scripts/detect-project-theme.mjs slides/{deck}
```

Reads `src/styles.css`, `components.json` (shadcn), etc. Writes `theme-detected.css`.
If detection succeeds, offer **project** first in the choice list.

## Step 2 — preset catalog

[templates/themes/catalog.json](../templates/themes/catalog.json)

| id | Description |
|----|-------------|
| `default` | Skill standard (Violet Bloom, purple gradient). **Use when unspecified** |
| `project` | Map from repo CSS variables |
| `omelette` | Legacy standard. Off-white + pink/purple/blue gradient |
| `minimal-mono` | Black & white, IBM Plex |
| `warm-neutral` | Beige, terracotta |
| `dark-editorial` | Dark, serif-leaning |

## Step 3 — present 3–5 options

Put **project** first when detection ran. Example prompt:

```
Pick a theme:
A) Project — from src/styles.css (neutral / base-nova)
B) Default — Violet Bloom purple gradient (standard)
C) Minimal Mono — Swiss black & white
D) Warm Neutral — beige corporate
E) Dark Editorial — dark magazine
(Legacy Omelette: id `omelette`)

Reply with a letter or theme id. Describe a mood in words if none fit.
```

## Step 4 — apply

```sh
bash skills/create-html-deck/scripts/apply-theme.sh slides/{deck} <theme-id>
```

Examples:

```sh
bash skills/create-html-deck/scripts/apply-theme.sh slides/my-deck default
bash skills/create-html-deck/scripts/apply-theme.sh slides/my-deck project
bash skills/create-html-deck/scripts/apply-theme.sh slides/my-deck minimal-mono
```

## Step 5 — confirm with user

**Stop.** After apply, show token summary:

```
Applied theme "{themeLabel}".
- paper / ink / accent colors
- font direction

Reply "OK" to start sections.
```

## Custom tweaks

For requests like "more blue" or "more purple" — edit only `content/tokens.css` `:root`.
`--ink-3` and `--grad` hue (286–300) drive the overall impression.

## Token mapping

Map project or external CSS variables into `content/tokens.css` `:root`:

| Slide var | Source var | Note |
|-----------|------------|------|
| `--paper` | `--background` | |
| `--ink` | `--foreground` | |
| `--line` | `--border` | |
| `--grad` | `--primary` + `--chart-*` | hue 286–300 for slides |
| `--ink-3` | primary hue ~290 | avoid `accent-foreground` (~259, reads blue) |

`detect-project-theme.mjs` applies this for **project**. For presets, `apply-theme.sh` handles it.

## External theme CSS

When presets do not fit:

1. Ask the user to paste `:root` CSS variables, **or** fetch a public theme page (e.g. `https://www.shadcn.io/theme/{slug}`) and copy its variables
2. Map with the table above into `content/tokens.css`
3. Show token summary and wait for OK (same gate as Step 5)

Do not load other skills for theming — stay inside this skill's presets, project detection, or manual `tokens.css` edits.

Default preset is **Violet Bloom** (purple-tuned `--grad` / `--ink-3`). Legacy: `apply-theme.sh … omelette`.
