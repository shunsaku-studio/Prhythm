---
name: prhythm-skill-review
description: >-
  Standardize and review Agent Skills in the Prhythm format. Use when authoring,
  reviewing, or fixing SKILL.md and README.md under skills/, or when the user
  mentions prhythm-skill-review, skill review, or skill standardization.
disable-model-invocation: true
rank: meta
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

Adopt the editor role in [references/readme-principles.md](references/readme-principles.md) §0. Keep the heading structure. When principles conflict, prefer 大原則. Write complete sentences; do not use bold-dash fragments or arrow notation as the main style.

1. Read the target skill's `SKILL.md`.
2. Read [references/readme-principles.md](references/readme-principles.md), then [references/readme-template.md](references/readme-template.md).
3. Create or update `README.md` in Japanese with these headings:
   - Required: 概要, 利用メリット, 利用シーン, 使い方, 具体例, 構成, 前提条件, 関連スキル
   - Optional: 注意事項 (omit the heading when there is no non-obvious pitfall)
4. Write **概要** — 2–3 sentences of input → output. Define coined terms here once. Mention other skills only when they are true upstream/downstream work, not structural similarity.
5. Write **利用メリット** — how the user's work gets easier versus doing it by hand or with a plain LLM. Translate any leftover design trait into a user benefit, or drop it. Do not restated 概要.
6. Write **利用シーン** — concrete situations the user is in. Add 1–2 example prompts they would type. Do not invent scenes from mode structure. Do not 1:1-map bullets to 利用メリット (that causes paraphrase).
7. Write **使い方** — (1) **いつ使うか** in one paragraph against the process (e.g. prep before the meeting, analysis after); (2) numbered steps with an explicit subject per step (user vs skill). Mid-process checkpoints belong in the matching step, not in 前提条件. Do not embed 具体例 here.
8. Write **具体例** immediately after 使い方 — one request prompt plus an excerpt of the actual output (table rows, a sentence, or a few lines of a diagram), not a list of artifact types. Do not wrap tables or Mermaid in ```markdown```; leave GFM tables and ```mermaid``` so the docs site can render them. Wrap the excerpt in `::: info 出力される …の抜粋:` so that phrase is the container title (not INFO). Append a `...` row to excerpted tables. If the skill has example.md, keep the excerpt minimal and link it.
9. Write **構成** comments as signposts for customization / deep dive, not as "what the model reads".
10. Write **前提条件** as full sentences of required-at-launch inputs and environment. Omit repo-wide obvious runtime (Claude Code / Cursor) and "you may also use X".
11. Write **関連スキル** with relative README links and "when to move there".
12. Run the §4 checklist in [readme-principles.md](references/readme-principles.md), then validate:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh path/to/skill-dir
```

12. Fix validate failures before finishing.

## Review workflow (Layer A)

1. Read `SKILL.md`, `README.md` (if present), and linked files one level deep. For README prose, also read [references/readme-principles.md](references/readme-principles.md).
2. Run validate:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh path/to/skill-dir
```

3. Score each dimension using [references/review-rubric.md](references/review-rubric.md):
   - Discoverability, Conciseness, Instruction quality, Structure, Observability
   - README prose checks (design-brag, duplication, coined-term, sentence, subject, excerpt, prerequisite, example, link)
4. Record findings with severity: **Critical**, **Suggestion**, **Strength**.
5. Compute verdict: Approve / Revise / Major rewrite (see rubric).
6. Output report using [references/review-report-template.md](references/review-report-template.md).

### Review rules

- Flag textbook explanations the model already knows.
- Flag hedging language (see **Hedging patterns** in [review-rubric.md](references/review-rubric.md)).
- Prefer imperative verbs and **If X → Y** branches in SKILL.md.
- Check progressive disclosure: long content belongs in `references/`, not SKILL.md.
- Flag README against [readme-principles.md](references/readme-principles.md):
  - design-brag (responsibility split, mode architecture, structural similarity to other skills)
  - section paraphrase (概要 / メリット / シーン restating the same claim)
  - bold-dash fragments or arrow notation as the main style
  - steps with no actor (user vs skill)
  - coined terms used before definition, or slogan-repeated across sections
  - 前提条件 that are mid-process, optional-permission, or repo-wide runtime
  - 注意事項 that repeat other sections, or exist only to fill the heading
  - 具体例 missing, or the artifact side lists types instead of excerpting the output
  - 関連スキル rows without a relative link or without "when to move there"
- Mark Observability as N/A for pure reference skills with no workflow.

Do NOT run Layer B or C unless the user explicitly requests efficacy or behavioral testing.

## Fix workflow

1. Use findings from the latest review, or review first if none exists.
2. For README fixes, adopt the editor role in [references/readme-principles.md](references/readme-principles.md) §0. Keep headings; rewrite body to the principles. Prefer 大原則 on conflict.
3. Apply **minimal diffs** to SKILL.md. For README prose that fails the principles, rewrite the failing section rather than patching slogans.
4. Keep SKILL.md in English. Keep README.md in Japanese.
5. Re-run validate and confirm verdict improves.
6. Summarize what changed.

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

- [readme-principles.md](references/readme-principles.md) — README writing and revision rules (source of truth)
- [readme-template.md](references/readme-template.md) — heading skeleton
- [review-rubric.md](references/review-rubric.md) — Layer A scoring
- [review-report-template.md](references/review-report-template.md) — Report output format
- [validate-skill.sh](scripts/validate-skill.sh) — Mechanical checks

## Prhythm conventions

- Skills live at `skills/<skill-name>/SKILL.md`.
- Follow [agentskills.io](https://agentskills.io/specification) layout: `references/`, `scripts/`, `assets/`.
- SKILL.md body: English, under 500 lines, imperative style.
- README.md: Japanese, human-facing catalog. Follow [readme-principles.md](references/readme-principles.md). Required headings: 概要, 利用メリット, 利用シーン, 使い方, 具体例, 構成, 前提条件, 関連スキル. 注意事項 is optional.
- Set `disable-model-invocation` explicitly in frontmatter (`true` for explicit-only skills).
- Set `rank` explicitly: `meta` | `core` | `utility`.
  - `core` — produces artifacts other skills consume as inputs
  - `utility` — terminal deliverable or cross-cutting tool
  - `meta` — authors/maintains skills themselves (omit `categories`)
- Set `categories` (1–2) for core/utility: `business` | `design` | `tech` | `delivery`.
  - Injected perspective, not who uses the skill. Dual categories are OK (dialogue inducers).
