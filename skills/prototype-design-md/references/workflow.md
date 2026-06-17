# Workflow

Three phases, **one approval gate** (Phase 1 → Phase 2).  
Read [theme-discovery.md](theme-discovery.md), [intake.md](intake.md), [prototype-brief.md](prototype-brief.md).

**Goal:** prototype brief = judgment for AI, not pixel spec.

## Phase 0 — theme discovery ⛔

Skip when: guardrails only, existing brand locked, or tokens already themed. See [theme-discovery.md](theme-discovery.md).

1. Minimum intake: product name, purpose, surface guess, feel (if any)
2. Run search on [getdesign.md](https://getdesign.md/) using 4 axes (surface, domain, mood, canvas)
3. Present **exactly 5** candidates — roles in [theme-discovery.md](theme-discovery.md)
4. Run early detect:
   ```sh
   node skills/prototype-design-md/scripts/detect-project-tokens.mjs
   ```
5. User picks **1–2 slugs** (or `none` for original direction)
6. Ask **token strategy** A / B / C with recommended default

**Stop (Phase 0):**

```
Theme candidates ready.

## Theme Shortlist (5)
### 1. <slug> — Anchor ★
- **URL:** https://getdesign.md/<slug>/design-md
- Tagline: …
- Match: …
- Borrow: …
- Avoid: …

### 2. <slug> — Alt anchor
- **URL:** https://getdesign.md/<slug>/design-md
…

### 3. <slug> — Contrast
- **URL:** https://getdesign.md/<slug>/design-md
…

### 4. <slug> — Adjacent
- **URL:** https://getdesign.md/<slug>/design-md
…

### 5. <slug> — Domain peer
- **URL:** https://getdesign.md/<slug>/design-md
…

Pick 1–2 slugs (or reply "none").

---
CSS detect: <found path | none>

Token strategy?
A) 判断のみ — CSS 既存のまま
B) 判断 + CSS 変数 — export → globals.css（推奨: <A|B|C>）
C) CSS 既存優先 — 参考は mood のみ

Reply with slug(s) + A/B/C. Then Phase 1 continues.
```

Phase 0 is **not** a separate OK gate — selections feed Phase 1 Intent Summary.

## Phase 1 — intent ⛔

1. Gather missing [intake.md](intake.md) fields
2. Translate Phase 0 picks → **patterns only** (not slug names in final DESIGN.md)
3. Note stack / CSS path, responsive priority, token strategy
4. Preview forbidden patterns from [anti-slop.md](anti-slop.md)
5. Draft **Intent Summary** in chat

**Stop:**

```
Intent ready.

## Intent Summary
- Product:
- Product Feel: (2–3 sentences + what it is NOT)
- Surface Type: (primary; secondary/tertiary if mixed)
- Density: (per surface if needed)
- Responsive priority: (ordered — from intake, not default desktop-first)
- Reference slugs: (Phase 0 picks, or none)
- References: (patterns only — for DESIGN.md prose)
- Token strategy: (A | B | C + CSS path)
- CSS path guess:
- Forbidden preview: (bullets)

Reply "OK" to write DESIGN.md.
```

## Phase 2 — write + validate

After intent OK:

```sh
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
```

If token strategy **B**:

```sh
npx @webdesignhot/design-md add <slug> -o /tmp/ref.md
npx @webdesignhot/design-md export /tmp/ref.md --to css
```

Merge exported `:root` into project CSS (semantic map — see [theme-discovery.md](theme-discovery.md)). Re-run detect.

Write `DESIGN.md`:

1. YAML: `name`, `description` only
2. Canonical §1–8 in order ([google-spec-summary.md](google-spec-summary.md))
3. Extensions: Forbidden Patterns, Copy Guidelines, Responsive Priority, Minimum Verification
4. See [prototype-brief.md](prototype-brief.md) for pillar → section map

```sh
bash skills/prototype-design-md/scripts/lint-design-md.sh DESIGN.md
```

Self-review [quality-checklist.md](quality-checklist.md).

```
DESIGN.md done: DESIGN.md

Lint: pass
Token strategy: <A|B|C>
This is the prototype brief — expand specs when UI stabilizes.
```

## Optional init

```sh
bash skills/prototype-design-md/scripts/init-design-md.sh
```

## Edit mode

Edit `DESIGN.md` in place. Re-lint. Do not add YAML token blocks.

## Mode shortcuts

| Intent | Flow |
|--------|------|
| New prototype (vague feel) | 0 → 1 → 2 |
| New prototype (clear direction) | 0 (light) → 1 → 2 |
| Guardrails only | 1 (light) → 2 |
| After tokens themed | detect → 1 → 2 (skip 0) |
| Existing brand locked | 1 → 2 (strategy C) |
