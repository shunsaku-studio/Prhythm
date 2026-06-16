# Anti-Slop

Generic AI UI defaults to statistically common patterns. Counter with explicit, verifiable prohibitions in Do's and Don'ts.

## Signature tells (cluster = slop)

- Dark hero + purple/indigo gradient
- Glassmorphism cards with glow shadows
- Inter / Roboto / Arial as only typeface
- Navbar → Hero → 3 feature cards → CTA → Footer skeleton
- Emoji as feature icons
- Low-contrast cyan CTAs on dark backgrounds
- Nested cards
- Decorative gradients filling empty space

## Forbidden defaults (unless user explicitly requests)

| Category | Forbidden |
|----------|-----------|
| Fonts | Inter, Roboto, Arial, system-ui-only stacks |
| Layout | Hero on operational screens; 3-column feature grid as app home |
| Color | Purple-indigo gradient accents; rainbow chart palettes |
| Effects | Glass blur, neon glow, gradient blobs as decoration |
| Spacing | Tailwind-only 4px multiples with no intentional break |

## Required alternatives

| Instead of | Use |
|------------|-----|
| Hero on tool screen | Page title + toolbar + content |
| Feature card grid | Table, list, or master-detail |
| Glass card | Solid `surface` + border or tonal layer |
| Generic "modern" | Named surface + material metaphor |
| One-off hex in components | CSS `var(--*)` role references |

## Do's and Don'ts templates

Verifiable — an agent or human can check compliance:

```markdown
## Do's and Don'ts

**Do**
- Use exactly one `button-primary` per screen for the main action
- Keep table row height compact on operational surfaces
- Use `neutral` background for page chrome; `surface` for elevated panels

**Don't**
- Add hero sections or full-width gradient bands on operational tool screens
- Nest a card inside another card
- Use Inter, Roboto, or Arial without explicit project approval
- Place more than two font weights on one screen
- Use decorative blur or glass effects on data-dense views

### Agent Instructions
- Read this file before generating any UI
- Match the declared surface type; default to operational tool density when unsure
- Use CSS `var(--*)` for values — no raw hex in generated components
- Capture desktop and mobile screenshots before marking UI complete
```

## Surface-specific prohibitions

| Surface | Extra don't |
|---------|-------------|
| operational tool | No testimonial blocks, no "features" section |
| dashboard | No marketing copy in KPI cards |
| docs | No animated hero backgrounds |
| marketing | No copy-paste of reference brand colors |
