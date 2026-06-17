# Theme Discovery (Phase 0)

Browse [getdesign.md](https://getdesign.md/) for reference themes **before** Phase 1 intent.

**Goal:** turn vague feel into 5 concrete directions + token strategy — not copy hex into DESIGN.md.

## When to run

| Situation | Phase 0 |
|-----------|---------|
| Vague feel ("modern and clean", "happy") | **Required** |
| User names a brand ("Bonusly 寄り") | **Required** — validate slug + add alternates |
| Existing brand locked | **Skip** — go to Phase 1 with token strategy **C** |
| Guardrails only | **Skip** |
| Tokens already themed | **Skip** — detect → Phase 1 |

## Search axes (decide before browsing)

| Axis | Source | Maps to |
|------|--------|---------|
| Surface | intake primary surface | [surface-types.md](surface-types.md) |
| Domain | product purpose | getdesign category |
| Mood | feel words | tags (`dark`, `warm`, `minimal`, `dense`, …) |
| Canvas | light / dark preference | tagline + `preview_swatch` |

### Surface → category hints

| Surface | Start with categories |
|---------|----------------------|
| operational tool | `dev-tools`, `saas` |
| dashboard | `fintech`, `ai`, `observability` |
| docs | `saas`, `media` |
| marketing | `retail`, `media`, `automotive` |

Do **not** search on "modern" or "clean" alone — always combine surface + domain.

## Search methods (priority)

1. **getdesign.md slug list** (URL-safe — use for shortlist slugs)
   ```sh
   npx getdesign@latest list
   ```
   Only slugs from this list may use `https://getdesign.md/<slug>/design-md`.  
   `@webdesignhot/design-md` has a **larger, different catalog** — its slugs are not guaranteed on getdesign.md.
2. **CLI category** (tagline research only — verify slug in step 1 before URL)
   ```sh
   npx @webdesignhot/design-md category dev-tools
   npx @webdesignhot/design-md category fintech
   ```
3. **CLI list + tagline scan** (same caveat — cross-check slug against step 1)
   ```sh
   npx @webdesignhot/design-md list
   ```
4. **Web browse** — [getdesign.md](https://getdesign.md/) one-line taglines for feel match
5. **Slug fetch** (read judgment only)
   ```sh
   npx @webdesignhot/design-md add <slug> -o /tmp/ref.md
   ```
6. **Compare**
   ```sh
   npx @webdesignhot/design-md diff <slug-a> <slug-b>
   npx @webdesignhot/design-md preview <slug>
   ```

Prefer `npx getdesign@latest list` when building the shortlist. Use webdesignhot CLI for taglines / judgment only if the slug exists on getdesign.md.

## Initial shortlist — exactly 5

Always present **5 candidates**. Each slot has a role; fill every slot or explain why one is empty.

| # | Role | Purpose |
|---|------|---------|
| 1 | **Anchor** (recommended) | Closest feel + surface match |
| 2 | **Alt anchor** | Same surface, different mood (light vs dark, warm vs cold) |
| 3 | **Contrast** | Material for 「〜ではない」 — wrong surface or too decorative |
| 4 | **Adjacent** | Borrow copy tone or layout philosophy only — not shell structure |
| 5 | **Domain peer** | Same industry/category, different personality |

Rules:

- **Every candidate must include a clickable URL** — see [Theme URLs](#theme-urls) below
- Slugs must differ across all 5 when possible
- Tagline comes from catalog (do not invent)
- **Borrow** = judgment patterns (§1 atmosphere, §5 layout, Key Characteristics)
- **Avoid** = surface mismatch or slop triggers for this product
- Famous brands (Stripe, Notion) are not automatic picks — match surface first

### What to read from a reference (judgment only)

| Use | Do not copy into DESIGN.md |
|-----|----------------------------|
| YAML `description`, tagline | `colors:` / hex blocks |
| §1 Visual Theme & Atmosphere | typography scale |
| §5 Layout Principles | component padding / hover |
| Key Characteristics bullets | motion / a11y detail |

Marketing-site catalogs ≠ app shell. For operational tools, prefer tags `dense`, `structured`, `dev-tools`.

## Theme URLs

**Required:** each shortlist entry must include a URL the user can open to preview the theme.

| Source | URL pattern | Example |
|--------|-------------|---------|
| getdesign.md (default) | `https://getdesign.md/<slug>/design-md` | [notion](https://getdesign.md/notion/design-md) |
| webdesignhot fallback | `https://www.webdesignhot.com/design-md/<slug>/` | slug not in `npx getdesign@latest list` |

How to resolve:

1. Confirm slug exists: `npx getdesign@latest list | rg '<slug>'`
2. Build URL: `https://getdesign.md/<slug>/design-md`
3. **Verify page content** — getdesign.md returns HTTP 200 even for missing designs (soft 404).  
   **Do not use `curl -sI` alone.** Check the HTML title:
   ```sh
   curl -sL "https://getdesign.md/<slug>/design-md" | rg '<title>'
   ```
   Reject if title contains `Design Not Found`.
4. If slug is missing from getdesign.md, pick another slug from step 1 **or** use webdesignhot URL and label it `webdesignhot fallback` — never invent a getdesign.md URL.
5. Put URL on its own line immediately after the slug heading — do not omit or bury in prose

Shortlist entry shape:

```markdown
### 1. `notion` — Anchor ★
- **URL:** https://getdesign.md/notion/design-md
- **Tagline:** …
- **Match:** …
- **Borrow:** …
- **Avoid:** …
```

## Early CSS detection (end of Phase 0)

Before token strategy question:

```sh
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
```

Use result to recommend default token strategy (see [workflow.md](workflow.md)).

## Token strategy (ask after user picks slug(s))

After user picks 1–2 slugs from the shortlist (or "none"):

```markdown
参考: <slug> (+ optional second)

トークンをどう扱いますか？
A) **判断のみ** — feel / layout / forbidden だけ借りる。CSS は既存のまま
B) **判断 + CSS 変数** — 参考 slug から export して globals.css に反映
C) **CSS 既存優先** — 参考は mood 比較用。トークンは触らない
```

### Default recommendation

| detect result | intake signal | Recommend |
|---------------|---------------|-----------|
| No CSS vars | greenfield prototype | **B** |
| CSS vars found | existing brand locked | **C** |
| CSS vars found | feel vague only | **A** |
| User said "tokens themed" | — | **C** |

If existing brand is locked, do **not** offer **B** without explicit override.

### Phase 2 branch for **B**

```sh
npx @webdesignhot/design-md add <slug> -o /tmp/ref.md
npx @webdesignhot/design-md export /tmp/ref.md --to css
```

- Merge `:root` into project CSS path — do not dump 70+ vars blindly; map to semantic roles or existing shadcn names
- Re-run `detect-project-tokens.mjs`
- DESIGN.md Colors: usage limits + `var(--*)` — **no hex in DESIGN.md**
- Export values are **starting points**, not production brand

## Tone translation → search

| User says | Search |
|-----------|--------|
| "modern and clean" | `category dev-tools` + tags `minimal,dense` |
| "happy" | tags `warm,playful` — not the word "happy" |
| "like Bonusly" | `social`, `marketplace` — intercom, slack |
| "enterprise" | ibm, hashicorp, intercom |
| "editorial" | tags `editorial` + `media` |

See also [intake.md](intake.md) tone table.

## Pitfalls

1. **Brand fame bias** — Stripe for everything (gradient marketing ≠ CRUD tool)
2. **Surface mismatch** — automotive/retail cinematic refs for operational tool primary shell
3. **Token bleed** — YAML from getdesign.md pasted into DESIGN.md (violates iron rules)
4. **Inter default** — Linear/Notion refs pull Inter; note in Contrast / Forbidden unless user asked
5. **Marketing ≠ product** — hero bands and campaign dark zones stay off app screens
6. **Catalog mismatch** — `@webdesignhot/design-md` slug ≠ getdesign.md slug. Example: `hubspot`, `bluesky` exist in webdesignhot but **not** on getdesign.md. Always cross-check with `npx getdesign@latest list`.
7. **Soft 404** — `https://getdesign.md/<slug>/design-md` returns HTTP 200 with "Design Not Found" body. Never trust status code alone; verify `<title>` before presenting URL.
