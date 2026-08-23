---
name: delivery-phase-plan
description: >-
  Turn a pilot into a role-lane 矢羽 (chevron) phase plan with gates and
  Go/No-Go metrics. Use when the user wants 検証計画, 矢羽,
  デリバリープランニング, Go/No-Go, 成功指標, or a phased validation /
  rollout plan after a prototype pitch.
disable-model-invocation: false
rank: core
categories:
  - delivery
  - business
---

# Delivery Phase Plan

Turn a pilot into a **矢羽**: role lanes × phases × gates × judgment metrics. The chart is the artifact.

Human-facing overview: [README.md](README.md).

| File | When to read |
|------|--------------|
| [references/intake.md](references/intake.md) | Before the phase spine |
| [references/yahane-grammar.md](references/yahane-grammar.md) | After the user confirms the spine; before filling arrows |
| [references/example-uchinaka.md](references/example-uchinaka.md) | After confirmation; match this shape |

## When to use

- Want a pilot but duration, scale, and pass/fail are empty
- "We'll validate" with no disqualify line
- Team lanes exist (`delivery-team-plan`) but they are not yet one chart

Do NOT use:

- User wants which hypothesis is riskiest → `uncertainty-map` (optional seed, not a substitute)
- User wants Owner / RACI only → `delivery-team-plan`
- User wants to log observation results → not this skill

## MUST / NEVER

MUST:

- Write the north-star metric as **current → target**. One side only is invalid
- Put an observable judgment on **every gate**. Last gate includes the miss move (`未達なら概念を再検討`)
- Treat arrows as **evidence-producing work**, not a task dump
- Stop after the phase spine. Do not fill arrows until the user confirms
- Use 3–5 phases. Default is **4**: 設計・提案 / 準備 / パイロット / 評価・展開

NEVER:

- Mark implemented as verified
- Fill every lane across every phase (empty cells are valid)
- Ship a Gantt with no gates
- Copy the 14-method catalog from `uncertainty-map` — pick methods there, timebox them here

## 1. Intake

Read [references/intake.md](references/intake.md). Collect these. Guess only when the user cannot supply the field; mark guesses `※推測`.

| Field | Required |
|-------|----------|
| North-star metric (current → target) | yes |
| Pilot scale (who × how many × how long) | yes |
| Role lanes | no — use `docs/delivery-team-plan.md` if present; else infer and mark `※推測` |
| Core × Unverified from `docs/uncertainty-map.md` | no |

If north-star is one-sided → ask once for the missing side. If still blank, stop.

If the user asks for RACI here → refuse. Point to `delivery-team-plan`. Then continue with lanes.

Output a one-block frame, then go to step 2:

```markdown
## Frame
- North star: {current} → {target}
- Pilot scale: …
- Lanes: …
- Seed hypotheses: {A-IDs or —}
```

## 2. Phase spine — then stop

Propose 4 phases (3–5). Each column: name, duration, gate, judgment.

```markdown
## Phase spine (confirm before 矢羽)

主指標: {current} → {target}

| PHASE | Name | Duration | Gate | Judgment |
|-------|------|----------|------|----------|
| 0 | 設計・提案 | | 提案承認 | |
| 1 | 準備 | | 開始判定 | |
| 2 | パイロット | | パイロット完了 | |
| 3 | 評価・展開 | | Go / No-Go | + 未達時の一手 |

Confirm this spine (especially the last-gate miss move). I will not write 矢羽 until you say yes.
```

If the spine is **not** confirmed → do not write arrows or `docs/delivery-phase-plan.md`.

## 3. Fill and write

After confirmation, read [references/yahane-grammar.md](references/yahane-grammar.md). Fill one arrow row per lane. Then write `docs/delivery-phase-plan.md` using the template in that file.

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/delivery-phase-plan/templates/docs/sections.html docs/prhythm/delivery-phase-plan/index.html --title "…"`
4. Write `docs/prhythm/delivery-phase-plan/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

## Done / fail

| State | Evidence |
|-------|----------|
| Waiting | Transcript has phase names, durations, gates, judgments, and north-star both sides; the turn stopped for confirmation |
| Done | `docs/delivery-phase-plan.md` exists; north-star both sides; every gate has an observable judgment; last gate has a miss move; arrows sit on role lanes |
| Fail | Gantt with no gates; every lane filled in every phase; north-star one-sided; implementation written as verified |

Pre-send (also in yahane-grammar):

- [ ] North-star current → target
- [ ] 3–5 phases, each with a gate and a judgment
- [ ] Last gate has a miss move
- [ ] At least one empty lane-cell
- [ ] Arrows name evidence work, not chores
