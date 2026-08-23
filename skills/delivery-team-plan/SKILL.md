---
name: delivery-team-plan
description: >-
  Design a delivery team (Owner / execution lanes / Support) and a RACI of
  who decides what after a prototype pitch. Use when the user wants 体制立案,
  RACI, デリバリープランニング, 実行計画, who owns Go/No-Go, or a staffing
  plan for a pilot.
disable-model-invocation: false
rank: core
categories:
  - delivery
---

# Delivery Team Plan

Turn a pitch into a **体制**: Owner, 2–4 execution lanes, Support (瞬作), and a RACI of who decides what.

Human-facing overview: [README.md](README.md).

| File | When to read |
|------|--------------|
| [references/intake.md](references/intake.md) | Before the layer draft |
| [references/raci.md](references/raci.md) | After the user confirms layers; before filling RACI |
| [references/example-uchinaka.md](references/example-uchinaka.md) | After confirmation; match this shape |

## When to use

- Prototype and demo exist, post-award motion does not
- Many parties, unclear who signs Go / No-Go
- HR / IT / field run in parallel with no named holds

Do NOT use:

- User wants 矢羽 / KPI / phase dates → `delivery-phase-plan`
- User wants which hypothesis to test next → `uncertainty-map`
- User wants a sprint roster (PO / SM / Dev) → refuse; this is customer delivery, not engineering org

## MUST / NEVER

MUST:

- Keep **one Owner** + **2–4 execution lanes** + **Support (瞬作)**. Do not flatten into one list
- Name Owner as a person or a role (`鈴木さん`, `人事企画リード`). Department-only Owner is invalid
- Stop after the layer draft. Do not fill RACI until the user confirms
- After confirmation: one **A per RACI row**. Put A and R in different cells

NEVER:

- Write 矢羽, KPI, or phase durations here
- Swap in Scrum roles
- Invent a named person when the user gave none — use a role label and mark `※推測`

## 1. Intake

Read [references/intake.md](references/intake.md). Collect these. Guess only when the user cannot supply the field; mark guesses `※推測`.

| Field | Required |
|-------|----------|
| Case scope (what the pilot is for) | yes |
| Customer-side key people / orgs | yes — roles ok if names missing |
| How 瞬作 enters (build / measure / report) | yes |
| Vision / hearing notes | no |

If the user asks for 矢羽 or Go / No-Go metrics here → refuse. Point to `delivery-phase-plan`.

If `docs/delivery-team-plan.md` already exists and the user did not say ゼロから → update in place; keep role names.

Output a one-block frame, then go to step 2:

```markdown
## Frame
- Scope: …
- Customer keys: …
- 瞬作 enters as: …
```

## 2. Layer draft — then stop

Propose layers. Default: Owner 1, execution 2–4, Support = 瞬作.

```markdown
## Layer draft (confirm before RACI)

| Layer | Who | Holds |
|-------|-----|-------|
| Owner | … | scope / budget / Go/No-Go |
| Exec | … | … |
| Exec | … | … |
| Support | 瞬作 (Eng × Design) | proto / measure / report |

Confirm these layers. I will not write RACI until you say yes.
```

If layers are **not** confirmed → do not write RACI or `docs/delivery-team-plan.md`.

## 3. Fill and write

After confirmation, read [references/raci.md](references/raci.md). Fill 4–6 decision rows. Then write `docs/delivery-team-plan.md` using the template in that file.

Point next work to `delivery-phase-plan` (矢羽 / gates / KPI).

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/delivery-team-plan/templates/docs/sections.html docs/prhythm/delivery-team-plan/index.html --title "…"`
4. Write `docs/prhythm/delivery-team-plan/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

## Done / fail

| State | Evidence |
|-------|----------|
| Waiting | Transcript has Owner / 2–4 exec lanes / Support, and the turn stopped for confirmation |
| Done | `docs/delivery-team-plan.md` exists; Owner is a person or role; each RACI row has one A; A and R are different cells |
| Fail | Scrum roster; 矢羽 / KPI / phase dates written here; Owner is a department name only |

Pre-send (also in raci.md):

- [ ] One Owner, 2–4 exec lanes, Support
- [ ] Owner is a person or role, not a department alone
- [ ] Each RACI row has exactly one A
- [ ] A and R are not in the same cell
- [ ] No 矢羽, KPI, or phase durations
