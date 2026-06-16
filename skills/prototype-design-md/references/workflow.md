# Workflow

Two phases, one gate. Read [intake.md](intake.md) and [prototype-brief.md](prototype-brief.md) first.

**Goal:** prototype brief = judgment for AI, not pixel spec.

## Phase 1 — intent ⛔

1. Gather product name, purpose, users, **feel** (with negatives), surfaces, density
2. Note stack / CSS path guess, responsive priority (from intake)
3. Preview forbidden patterns from [anti-slop.md](anti-slop.md)
4. Draft **Intent Summary** in chat

**Stop:**

```
Intent ready.

## Intent Summary
- Product:
- Product Feel: (2–3 sentences + what it is NOT)
- Surface Type: (primary; secondary/tertiary if mixed)
- Density: (per surface if needed)
- Responsive priority: (ordered — from intake, not default desktop-first)
- References: (patterns only)
- CSS path guess:
- Forbidden preview: (bullets)

Reply "OK" to write DESIGN.md.
```

## Phase 2 — write + validate

After intent OK:

```sh
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
```

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
This is the prototype brief — expand specs when UI stabilizes.
```

## Optional init

```sh
bash skills/prototype-design-md/scripts/init-design-md.sh
```

## Edit mode

Edit `DESIGN.md` in place. Re-lint. Do not add YAML token blocks.
