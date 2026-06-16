---
name: prhythm-skill-review
description: >-
  Standardize and review Agent Skills in the Prhythm format. Use when authoring,
  reviewing, or fixing SKILL.md and README.md under skills/, or when the user
  mentions prhythm-skill-review, skill review, or skill standardization.
disable-model-invocation: true
---

# Prhythm Skill Review

Meta-skill for Prhythm Agent Skills. Generates Japanese READMEs, reviews English SKILL.md files, and applies minimal fixes.

## Modes

Pick one mode from the user request:

| Mode | Slash command | Output |
|------|---------------|--------|
| **review** | `/prhythm-skill-review {path} をレビューして` | Review report + validate output |
| **standardize** | `/prhythm-skill-review standardize {path} の README を作って` | README.md from template |
| **fix** | `/prhythm-skill-review fix {path} の指摘を直して` | Minimal edits to SKILL.md / README.md |
| **layer-b** | `/prhythm-skill-review layer-b {path}` | Efficacy eval (optional) |
| **layer-c** | `/prhythm-skill-review layer-c {path}` | Behavioral eval (optional) |

Default review is **Layer A only**. Use **layer-b** or **layer-c** modes only when the user explicitly asks.

## Standardize workflow

1. Read the target skill's `SKILL.md`.
2. Read [references/readme-template.md](references/readme-template.md).
3. Create or update `README.md` in Japanese with these 8 headings:
   - 概要, 利用メリット, 利用シーン, 使い方, 構成, 前提条件, 注意事項, 関連スキル
4. Write **利用メリット** — answer "what becomes better for the user?" (outcomes, shared understanding, less rework). See [readme-template.md](references/readme-template.md).
   - DO: user/team value, before/after state, downstream wins (e.g. connects to next workflow step)
   - DON'T: trigger terms, phase names, naming rules, scripts, gates, or other SKILL.md implementation detail
5. Write **利用シーン** — situations where those outcomes matter. Align with 利用メリット (ideally 1:1). See [readme-template.md](references/readme-template.md).
   - DO: user problems, timing ("before X", "when Y is unclear"), tie each bullet to a benefit
   - DON'T: technical operations, slash commands, trigger-term lists — those belong in **使い方**
6. Write **使い方** from the target skill's workflows and trigger terms. Do not copy prhythm-skill-review commands.
7. Align terminology with SKILL.md. Do not duplicate full procedures.
8. Run validate:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh path/to/skill-dir
```

8. Fix validate failures before finishing.

## Review workflow (Layer A)

1. Read `SKILL.md`, `README.md` (if present), and linked files one level deep.
2. Run validate:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh path/to/skill-dir
```

3. Score each dimension using [references/review-rubric.md](references/review-rubric.md):
   - Discoverability, Conciseness, Instruction quality, Structure, Observability
4. Record findings with severity: **Critical**, **Suggestion**, **Strength**.
5. Compute verdict: Approve / Revise / Major rewrite (see rubric).
6. Output report using [references/review-report-template.md](references/review-report-template.md).

### Review rules

- Flag textbook explanations the model already knows.
- Flag hedging language (see **Hedging patterns** in [review-rubric.md](references/review-rubric.md)).
- Prefer imperative verbs and **If X → Y** branches.
- Check progressive disclosure: long content belongs in `references/`, not SKILL.md.
- Flag README **利用メリット** that list implementation detail (phases, scripts, naming rules) instead of user/team outcomes — see [readme-template.md](references/readme-template.md).
- Flag README **利用シーン** that list technical operations or commands instead of user situations aligned with メリット — see [readme-template.md](references/readme-template.md).
- Mark Observability as N/A for pure reference skills with no workflow.

Do NOT run Layer B or C unless the user explicitly requests efficacy or behavioral testing.

## Fix workflow

1. Use findings from the latest review, or review first if none exists.
2. Apply **minimal diffs**. Fix Critical first, then Suggestions the user cares about.
3. Keep SKILL.md in English. Keep README.md in Japanese.
4. Re-run validate and confirm verdict improves.
5. Summarize what changed.

## Layer B efficacy eval (layer-b mode)

Run only in **layer-b** mode when the user asks to measure whether the skill actually helps.

1. Pick 3 representative tasks for the skill.
2. For each task, define `expected_behavior` (observable outcomes):

```json
{
  "query": "User task description",
  "expected_behavior": [
    "Observable outcome 1",
    "Observable outcome 2"
  ]
}
```

3. Run each task **without** the skill. Record failures.
4. Run each task **with** the skill. Compare outcomes.
5. Report pass rate delta and token cost if available.
6. Note: v1 has no automated harness. Document results manually.

Reference: [Claude Skill authoring — Evaluation and iteration](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Layer C behavioral eval (layer-c mode)

Run only in **layer-c** mode for **discipline** skills (rules the agent tends to break under pressure).

1. **RED:** Run 3+ pressure scenarios WITHOUT the skill. Record failures and rationalizations verbatim.
2. **GREEN:** Run the same scenarios WITH the skill. Verify compliance.
3. **REFACTOR:** Plug loopholes. Re-run until compliant.

Combine 3+ pressures when possible: time constraint, sunk cost, exhaustion, authority.

Use a subagent for scenarios when available. Document scenario text and outcomes in the review report.

Reference: [Superpowers writing-skills](https://github.com/obra/superpowers-skills/blob/main/skills/meta/writing-skills/SKILL.md)

## References

- [readme-template.md](references/readme-template.md) — Prhythm README format
- [review-rubric.md](references/review-rubric.md) — Layer A scoring
- [review-report-template.md](references/review-report-template.md) — Report output format
- [validate-skill.sh](scripts/validate-skill.sh) — Mechanical checks

## Prhythm conventions

- Skills live at `skills/<skill-name>/SKILL.md`.
- Follow [agentskills.io](https://agentskills.io/specification) layout: `references/`, `scripts/`, `assets/`.
- SKILL.md body: English, under 500 lines, imperative style.
- README.md: Japanese, 8 required headings, human-facing catalog.
- Set `disable-model-invocation` explicitly in frontmatter (`true` for explicit-only skills).
