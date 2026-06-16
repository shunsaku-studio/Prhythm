---
name: shadcn-explorer
description: Search the shadcn/ui ecosystem — 200+ community registries and 60+ themes — in real time. Use whenever the user wants to find shadcn components, blocks, themes, or UI libraries. Trigger on keywords like shadcn, shadcn/ui, registry, theme, component search, block search, or "find me a UI for X".
disable-model-invocation: false
---

# shadcn-explorer

Search shadcn/ui community registries and themes in real time. Present candidates with `name`, `description`, and `homepage` links.

## Workflow

**If** user asks for a component, block, or UI library → follow **Registry search**.

**If** user asks for a theme or color palette → follow **Theme search**.

**If** both → run registry search first, then theme search.

### Registry search

1. **WebFetch** `https://ui.shadcn.com/r/registries.json`
2. Parse the JSON array. Each entry has `name`, `description`, `homepage`, and `url`.
3. Split the query into keywords. Match case-insensitively: an entry matches when any keyword appears in `name` or `description`.
4. To inspect a specific item, **WebFetch** the registry `url` with `{name}` replaced by the item slug (e.g. `button`, `login-01`).
5. Present **3+ candidates** with `name`, `description`, and `homepage`. If fewer than 3 match, say so and show the closest matches.

### Theme search

1. **WebFetch** `https://www.shadcn.io/theme` (or `https://www.shadcn.io/theme/{slug}` for one theme).
2. Extract theme slugs and CSS variable blocks from the page.
3. **If** the user specified style constraints (e.g. dark, blue, minimal) → filter by slug and CSS values (`--background`, `--primary`, etc.).
4. Present **3+ theme candidates**. For each: `slug`, key preview colors (background, foreground, primary), and a copy-paste CSS block. If fewer than 3 match, say so and show the closest matches.

**NEVER** fetch individual theme JSON at `shadcn.io/r/{slug}.json` — Pro auth required. Use `shadcn.io/theme/{slug}` instead.

## Data sources

| Resource | URL |
|----------|-----|
| Community registries (200+) | `https://ui.shadcn.com/r/registries.json` |
| Theme catalog (60+) | `https://www.shadcn.io/theme` |
| Single theme CSS | `https://www.shadcn.io/theme/{slug}` |
