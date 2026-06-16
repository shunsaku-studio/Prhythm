# Sections

Phase 2 — start only after theme OK.

## Batch rule

- Take **1–3 outline rows** per turn
- Stub: [templates/viewer/slide-section.stub.html](../templates/viewer/slide-section.stub.html)
- Output: `content/sections/NN-{slug}.html` (match outline filenames)

## Section skeleton

```html
<section data-label="..." class="s-content">
  <div class="grid-bg"></div>
  <div class="frame">...</div>
</section>
```

Common section classes: `s-title`, `s-content`, `s-divider` (see template sections).

## Layout components

From `slide-styles.css` (copied on assemble):

| Class | Use |
|-------|-----|
| `.tracks.n3` | 3-column arguments |
| `.tracks.stack` | Stacked tracks |
| `.toc` / `.toc-row` | Table of contents |
| `.flow` / `.step` | Horizontal process |
| `.proc.n3` / `.proc.n4` | Process + image-slot |
| `.duo` | Two-column compare |
| `.cmp` | Comparison table |

Do **not** invent new layout classes — use existing ones only.

## image-slot

```html
<image-slot id="unique-id" style="width:100%;height:240px;"
  shape="rect" placeholder="Description"></image-slot>
```

## Animations

Sections use `.anim.d1` … `.anim.d4` for staggered entrance.
Respects `prefers-reduced-motion` via deck-stage styles.

```css
@media (prefers-reduced-motion: no-preference) {
  [data-deck-active] .anim.d1 { animation-delay: .04s; }
}
```

## Minimal example

[examples/minimal-deck/slides.html](../examples/minimal-deck/slides.html) — section markup only.

```sh
bash skills/create-html-deck/scripts/assemble.sh slides/my-deck --minimal
```
