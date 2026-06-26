---
name: defining-personas-and-segments
description: プロダクト・機能・プロトタイプのターゲットユーザー、ペルソナ、セグメントを整理したいときに使う。ユーザーがインタビューメモ・ディスカバリーの記録・プロダクトブリーフを共有してきたり、「誰向けに作るべきか」「ターゲットを整理したい」「ペルソナを作って」「セグメントを切って」と依頼したときに発動する。出力は俯瞰用の比較表 + 人間が決めるべき論点。Primary が決まったら、そのセグメント/ペルソナの深掘りに移る2段階フロー。意図的に「Primary（主要ターゲット）」は確定させない — 人間が決めるための材料を揃えるSkill。
---

# Persona & Segment Definition Skill

## Output language

**All user-facing output (segment tables, personas, decision gates, etc.) must be written in Japanese.** This Skill's instructions are in English for token efficiency, but the artifacts you produce go to Japanese-speaking PMs, founders, and designers.

Concept names stay in English when they have a stable label (`Primary candidate (hypothesis)`, `Counter-persona`, `[Fact]`, `[Assumption]`, `[Unknown]`, `[Risk]`, `JTBD`, etc.).

## Your role

You are a **facilitator, not a decision-maker.**

Choosing the target user is a strategic call that belongs to the human (PM, founder, design lead). Your job is to lay out the material that makes that call a good one, and — after the human decides — to give the chosen target concrete shape.

If you find yourself about to write "Primary persona is X" without explicit human agreement, **stop**. Reword as "Primary candidate (hypothesis)" and hand the decision back to the human.

## When to use this Skill

Use when any of these apply:
- The user shares interview notes, discovery memos, or research artifacts and asks you to organize users / personas / segments
- The user asks "who should we build for", "let's sort out the target", "draft a persona", "split into segments" (or Japanese equivalents)
- A prototype, MVP, or concept validation needs a clear target
- An existing persona/segment definition needs review or critique
- A Primary has already been chosen and the user wants Stage 2 deep-dive

Do NOT use when:
- Writing marketing copy for an already-locked persona (different task)
- Doing quantitative segmentation via statistical clustering (this Skill produces qualitative, hypothesis-level segments)

## Required input

Before producing output, confirm at least one of these is available:
- Interview notes, transcripts, or qualitative research
- A product brief, problem hypothesis, or problem definition
- An existing user/stakeholder list (even rough)

If nothing is available, ask the user for minimum context first. **Do not invent users from scratch.**

For Stage 2 (deep-dive), additionally require:
- Which segment/persona the human picked as Primary (explicit human selection)
- The Stage 1 output (if any — otherwise run Stage 1 first)

## Two-stage flow

The Skill **defaults to Stage 1**. Move to **Stage 2** once the human selects a Primary.

### Stage 1: Overview (lay out the material for human judgment)

Read the input and produce the sections listed below. **Personas and segments are written as tables** so the human can compare side-by-side and add columns/rows themselves.

### Stage 2: Deep-dive (concretize the human-selected Primary)

Triggered when the human says "Primary is X", "let's go with X", "we'll adopt X" — i.e., an explicit selection. Deepen and concretize that segment/persona.

If the user's statement is ambiguous, **confirm before proceeding**. Never auto-select.

---

## Stage 1 output structure (6 required sections)

Every output includes the 6 sections below in this order. Verify with `scripts/validate_output.sh --stage 1`.

### 1. User / Stakeholder Candidates

All actors who appear in the input (users, buyers, influencers, blockers). One row per person, with their role. **Table form**:

| # | 関係者 | 役割 | 入力での代表的な声 / 関心 |
|---|---|---|---|
| U1 | ... | ... | ... |

(Header keys are stable English-labelable concepts but rendered in Japanese in the actual artifact. Copy this exact header in output.)

### 2. Segmentation Axes

3–6 meaningful axes that cut users along distinctions that matter for the product. For each axis, include "axis name / why it matters / observed values". See `references/segmentation-axes.md`.

### 3. Segment Comparison Table

Candidate segments as a **comparison table**. Minimum columns:

| Segment | ラベル | 主な構成軸 | 主な JTBD | 規模感 | 検証コスト | 主要な前提・リスク |
|---|---|---|---|---|---|---|
| Segment 1: ... | Primary candidate (hypothesis) | ... | ... | ... | ... | ... |
| Segment 2: ... | Primary candidate (hypothesis) | ... | ... | ... | ... | ... |
| Segment 3: ... | Secondary | ... | ... | ... | ... | ... |
| Segment 4: ... | Out of scope (rationale) | ... | ... | ... | ... | ... |

Rules:
- 2–5 segments
- Label is one of `Primary candidate (hypothesis)` / `Secondary candidate` / `Out of scope (rationale)`. Never label Primary as "decided"
- If size or validation-cost numbers are not available, write **[Unknown]**
- Use Markdown table form so the human can add columns/rows afterward

### 4. Persona Comparison Table

Personas as a **comparison table**. Minimum columns:

| Persona | ラベル | 対応セグメント | 状況（一行） | 主要 JTBD | 現在の代替手段 | 主要バリア | 成功の定義 | Fact/Assumption/Unknown/Risk |
|---|---|---|---|---|---|---|---|---|
| ペルソナ 1: ... | Primary candidate (hypothesis) | Segment 1 | ... | ... | ... | ... | ... | F:3 A:2 U:1 R:1 |
| ペルソナ 2: ... | Secondary candidate | Segment 2 | ... | ... | ... | ... | ... | F:2 A:3 U:2 R:1 |
| ペルソナ 3: ... | Counter-persona | Segment 4 | ... | ... | ... | ... | ... | F:1 A:3 U:2 R:1 |

Rules:
- 2–4 personas. **At least one must be a Counter-persona** (see below)
- Label is one of:
  - **Primary candidate (hypothesis)**: leading hypothesis for the primary target. May proceed to Stage 2
  - **Secondary candidate**: not primary, but worth targeting if extra resources allow
  - **Counter-persona**: a person at the **opposite pole on a critical axis** from the Primary candidate. Not an optimization target — placed to make the boundaries of design decisions visible
- Tag cells with **[Fact]** / **[Assumption]** / **[Unknown]** / **[Risk]** as needed (see `references/evidence-levels.md`)
- Keep cells short. Anything that wants to be prose belongs in Stage 2, not in another file
- Final column `F:3 A:2 U:1 R:1` is the tag count summary for that persona

**Why include a Counter-persona**:
If you only line up Primary candidates, "who to optimize for" becomes clear but "what is lost by optimizing" disappears. Placing one persona at the opposite pole on the Primary's defining trait makes visible:
- Who gets dropped when the design leans one way
- If a Primary-oriented decision happens to also work for the Counter, that is a robustness signal
- If Primary optimization is sure to lose the Counter, that is a tradeoff worth stating explicitly

Often the Counter is drawn from an Out-of-scope segment, but Secondary-derived Counters also work. Full write-up in `references/persona-template.md`'s Counter-persona section.

### 5. Human Decision Gates

Surface the judgment calls the human must make. **Limit to 3–5.** Each is brief. See `references/human-decision-gates.md`.

Format:
- Per gate: "問い" (question), "選択肢" (options A/B with pros/cons), "現時点の情報" (what we know), minimum
- An Agent recommendation may be included, but always with "this is a recommendation; the decision belongs to the human"
- Decision Gates are NOT a task list (anti-pattern)

Leave room for the human to add columns/rows to tables #3 and #4. Decision Gates are a starting point for discussion.

### 6. Next Action (always at the end of the output)

Always close Stage 1 with explicit next steps for the human. Example:

```
## Next Action

この Stage 1 出力は「材料」です。次にやることは2つ：

1. **比較表（#3, #4）を見て、列・行を追加・修正してください**
   気になる軸が漏れていれば追加。違うと思うセルは書き換えてください。

2. **Human Decision Gates（#5）の論点に答えてください**
   各論点に「A/B どちらを選ぶか」「なぜ」「どんな前提が変わったら変えるか」を返してもらえれば、
   Primary 候補を確定 → Stage 2（深掘り）に進みます。

判断に必要な追加情報があれば「Unknown のここを埋めたい」と言ってください。
```

Reason: simply emitting comparison tables leaves the reader uncertain about what is expected of them. Embed the intent of the artifact and the next move in the artifact itself.

---

## Stage 2 output structure (3 required sections)

Triggered once the human says "Primary is X". Verify with `scripts/validate_output.sh --stage 2`.

### 1. Persona Deep Dive

A thick description of the selected persona. Use the deep-dive template in `references/persona-template.md`.

Include:
- **Summary** — situation + motivation in one paragraph
- **Typical scenes of use** — time, place, trigger, and the emotion in that moment, concretely
- **JTBD hierarchy** — main / related / emotional / social, four layers
- **Persona-specific characterization (behavior/preference cues)** — personality, decision style, tone, likes/dislikes, weekday rhythm. Each item gets a one-line "how this informs design decisions" note
- **Interview quotes + the inference boundary** — actual quotes from the input vs. your extrapolation, kept separate
- **Current alternatives, in detail** — thicker than the Stage 1 table
- **Barriers and dropout conditions** — split into psychological / practical / political
- **Concrete definitions of success / failure** — emotion- and situation-based, not numerical
- **Face-photo generation prompt (optional)** — one English prompt for image-generation tools, avoiding occupational stereotypes and grounding in the scene/emotion

Keep tagging with **[Fact] / [Assumption] / [Unknown] / [Risk]** throughout.

Write the Counter-persona at the same depth in Stage 2. At minimum, do not omit the characterization section and the "design-decision conflict with Primary" section.

### 2. Validation Plan

Concretize **what to verify with the prototype, and how**, for the selected segment/persona. See `references/prototype-connection.md`.

Required:
- The situation to validate (concrete scene)
- The hypothesis to validate (short and specific)
- The riskiest part of that hypothesis
- **Falsification condition** (if this happens, the hypothesis was wrong)
- **Confirmation condition** (if this happens, the hypothesis is supported)
- Means of validation (prototype form, session format, sample size)
- Questions this validation cannot answer (defer to a later phase)

"Validation" without a falsification condition is confirmation theater. Do not write it.

### 3. Out-of-scope Rationale

For each segment labelled Secondary / Out of scope in Stage 1, write **why it was excluded** and **what change would justify revisiting**.

Format:
- 2–3 lines per segment
- Pair "reason for exclusion" with "reconsideration trigger (signal that, if observed, means revisit)"

---

## How to proceed

1. **Read the input carefully** — quote the original phrasing. Do not paraphrase away the specifics.
2. **Axes before segments** — segments emerge as intersections of axes. Writing segments first produces stereotypes.
3. **Tag everything** — Fact / Assumption / Unknown / Risk. A persona with too many Assumptions is a hypothesis; say so out loud.
4. **Do not flatten conflicts** — if the input contains contradicting voices, present both interpretations. Never average them.
5. **Use tables** — Stage 1 segments and personas must be tabular. Prose form makes it hard for the human to add to.
6. **Do not mix Stage 1 and Stage 2** — no deep-dive in Stage 1; no falling back to overview tables in Stage 2.

## Reference files

Read from `references/` as needed:
- `segmentation-axes.md` — common axes (role, JTBD, context, expertise) with examples
- `persona-template.md` — Stage 1 comparison-table template and Stage 2 deep-dive template
- `evidence-levels.md` — definitions and tagging rules for Fact / Assumption / Unknown / Risk
- `human-decision-gates.md` — categories of judgment to hand back to the human
- `prototype-connection.md` — how to write the Stage 2 Validation Plan
- `anti-patterns.md` — what not to do (read before starting)

## Validation

After producing the Markdown output, optionally:
```
# Validate as Stage 1
./scripts/validate_output.sh --stage 1 <output.md>

# Validate as Stage 2
./scripts/validate_output.sh --stage 2 <output.md>

# Auto-detect
./scripts/validate_output.sh <output.md>
```

Depends only on bash + grep (works on plain macOS / Linux shells).

## Anti-pattern check (read before writing)

Before finalizing output, cross-check against `references/anti-patterns.md`. Common failures:
- Deciding the Primary persona without human input
- Personas built on demographics rather than behavior/situation
- Treating a single interview's extrapolation as Fact
- Skipping Human Decision Gates "because the answer is obvious"
- Writing Stage 1 segments/personas as prose articles (hard for the human to amend)
- Going too deep in Stage 1 (push prose to Stage 2 if it doesn't fit the table)
- **Omitting Counter-persona, or writing a watered-down version of the Primary as the "Counter"**
- Stage 2 Validation Plan without a falsification condition (that's confirmation, not validation)
