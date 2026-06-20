---
name: uncertainty-map
description: >-
  Map prototype assumptions on a Core/Peripheral × Verified/Unverified 2x2 grid
  to surface the riskiest unverified assumptions and the prototype's proven
  value. Use when the user wants 不確実性マップ, 仮説検証マップ, リスクマップ, プロト価値レポート,
  プロトの成果, 何を検証すべきか, 次に何を検証, RAT, Riskiest Assumption, validation map,
  assumption map, proto-value, "プロトで何が検証できた", "投資家向けにプロトの成果", or wants to
  turn docs/feature-list.md + プロト実装 into a prioritized validation backlog.
disable-model-invocation: false
---

# Uncertainty Map

Map prototype assumptions on a 2x2 (Core/Peripheral × Verified/Unverified) grid. Surface the riskiest unverified assumptions for the team (Mode A) and the proven value of the prototype for stakeholders (Mode B). Inherit F IDs from `feature-backlog-mapper` so traceability runs from UC → Feature → Assumption → Validation Action.

> Human-facing overview: [README.md](README.md). Detailed references: [references/](references/).

## When to use

- "不確実性マップ / 仮説検証マップ / リスクマップ を作って" → Mode A
- "プロト価値レポート / 投資家向けにプロトの成果 / プロトで何を検証できたか" → Mode B
- "次に何を検証すべき / Riskiest Assumption / RAT" → Mode A
- The user wants to triage validation backlog after a prototype lands

## When NOT to use

- Vision / one-line statement → use [product-vision-and-concept](../product-vision-and-concept/SKILL.md)
- Use case extraction → use [usecase-mapper](../usecase-mapper/SKILL.md)
- Feature inventory or PBI → use [feature-backlog-mapper](../feature-backlog-mapper/SKILL.md)
- Prototype design judgment (feel/surface) → use [prototype-design-md](../prototype-design-md/SKILL.md)

## Reference router

| Task | Doc |
|------|-----|
| Confirm inputs, hybrid intake, missing-input fallback | [references/intake.md](references/intake.md) |
| Extract assumptions from features (粒度・ID) | [references/assumption-extraction.md](references/assumption-extraction.md) |
| Decide Core vs Peripheral (axis 1) | [references/core-vs-peripheral.md](references/core-vs-peripheral.md) |
| Decide Verified / Partial / Unverified (axis 2) | [references/verification-classifier.md](references/verification-classifier.md) |
| Mode A output template (`docs/uncertainty-map.md`) | [references/matrix-template.md](references/matrix-template.md) |
| Mode B output template (`docs/proto-value-report.md`) | [references/report-template.md](references/report-template.md) |
| 4-quadrant action playbook + 9 validation methods | [references/action-playbook.md](references/action-playbook.md) |
| Coverage / anti-slop / quality gate | [references/quality-checklist.md](references/quality-checklist.md) |
| Self-evaluation scenarios (Layer B/C) | [references/eval-scenarios.md](references/eval-scenarios.md) |
| Pass/fail rubric for evaluations | [references/eval-rubric.md](references/eval-rubric.md) |

Read reference files at the relevant step. Do not load all upfront.

## Workflow

### Step 0 — Confirm inputs (hybrid intake)

Read [references/intake.md](references/intake.md). Inputs are gathered in this priority order:

1. `docs/product-vision.md` — vision yardstick for axis 1
2. `docs/feature-list.md` — Must = Core, Should/Could = Peripheral seed
3. `DESIGN.md` and prototype implementation files (`git ls-files`) — axis 2 evidence
4. User observation / measurement logs — promote 🟡 → ✅
5. Single-turn dialog only when seeds are missing

If all of (1)(2) are missing, suggest `/product-vision-and-concept` and `/feature-backlog-mapper` first. If the user declines, run a single-turn assumption interview and label every emitted assumption `(コア候補)`.

### Step 1 — Pick mode

| Trigger | Mode | Output file |
|---------|------|-------------|
| 不確実性マップ / リスクマップ / 何を検証 / RAT / validation map | **Mode A** | `docs/uncertainty-map.md` |
| プロト価値 / 投資家向け / プロトの成果 / proto-value | **Mode B** | `docs/proto-value-report.md` |

Mode B requires `docs/uncertainty-map.md`. If absent, run Mode A inline first.

### Step 2 — Extract assumptions

Read [references/assumption-extraction.md](references/assumption-extraction.md).

- One feature produces 0..N assumptions. Surface implicit beliefs as testable statements.
- **NEVER** restate the feature name as an assumption (parrot anti-pattern).
- A ID rule: `A-<F-ID>-<Seq>` (e.g. `A-D01-01-01`); orphans use `A-CORE-<Seq>` / `A-PERIPH-<Seq>`.
- Each assumption must be falsifiable in one sentence.

### Step 3 — Axis 1: Core vs Peripheral

Read [references/core-vs-peripheral.md](references/core-vs-peripheral.md).

Apply 3 yardsticks in order until a definitive answer:

1. **Vision** — does failing this assumption break the one-line vision? → Core
2. **Must mapping** — does it back a `feature-list.md` Must row? → Core
3. **Otherwise** → Peripheral

Each assumption MUST carry a 1-line rationale citing vision quote / F-ID + Must rationale / cost trade-off. If the user pressures to mark everything Core, refuse and downgrade.

### Step 4 — Axis 2: Verification status (3 labels, hybrid)

Read [references/verification-classifier.md](references/verification-classifier.md). Run 5 sub-steps:

1. Seed every assumption as `⬜ 未検証`
2. Probe codebase: `git ls-files`, then grep for F-ID comments / feature name keywords / test files; promote to `🟡 部分検証` when implementation+tests exist
3. Promote to `✅ 検証済` only when user observation / measurement evidence is present (count, period, sample size required)
4. Single-turn dialog: present the inferred matrix, ask only for diffs
5. Lock in (axis1, axis2) pair per assumption

**NEVER** mark `✅` without observation evidence. Animation of code passing tests is `🟡` only.

### Step 5 — Emit & cross-check

Read [references/matrix-template.md](references/matrix-template.md) (Mode A) or [references/report-template.md](references/report-template.md) (Mode B).

- **Mode A** card: A ID, 仮説, 紐付 F, 軸1 根拠, 軸2 根拠, 推奨検証手段 (from [references/action-playbook.md](references/action-playbook.md))
- **Mode B** PBI-equivalent: 検証済成果は本文自然言語で説明、F ID / A ID は脚注または Appendix に集約（脚注方式）

Cross-check with [references/quality-checklist.md](references/quality-checklist.md) before write:

- **Coverage**: every `feature-list.md` Must has ≥1 assumption mapped
- **Action**: every Core × Unverified row has ≥1 validation action proposal
- **Honesty**: no fabricated user counts, observation periods, or measurement values
- **Mode B integrity**: Unverified Core is **not hidden** — it must appear in 残課題 + 次の検証計画

Write to the mode's output file. For Mode B, include the standard 6 sections in order: エグゼサマ → スコープ → 検証済成果 → 残課題 → デモ動線 → 次の検証計画.

## Report back

After emitting, tell the user:

```
docs/uncertainty-map.md (or docs/proto-value-report.md) に出力しました。
- 全仮説: <N> 件 / コア: <C> / 周辺: <P>
- ステータス: ✅<v> / 🟡<p> / ⬜<u>
- 最優先 (コア × 未検証): <n> 件 / 検証アクション提案済
- 次の一手: 提案済み検証スパイクの実行 → 結果反映で再 mapping
```

## NEVER

- Mark `✅ 検証済` without user observation / measurement evidence (animations of green tests are `🟡` only)
- Place an assumption in Core without citing vision or a Must rationale
- Empty the 「未検証」 column in Mode B to look better — Unverified Core must appear in 残課題
- Use a single validation method (e.g. "ユーザーテスト") for every action — pick from the 9-method playbook
- Restate a feature name as an assumption (e.g. "X ができる" is not an assumption)
- Fabricate user counts, observation periods, or measurement numbers

## MUST

- Inherit F IDs from `docs/feature-list.md` and reference them on every A ID
- Carry a 1-line rationale for each Core classification (vision quote or F-ID Must reason)
- Propose ≥1 validation action for every Core × Unverified row
- In Mode B, surface Unverified Core in 残課題 and 次の検証計画 — never hide it
- Use `—` for unverifiable cells; never invent metrics or user counts

## Self-evaluation loop

Run all three layers before declaring the skill ready or after edits. Full scenarios, prompts, and rubric live in [references/eval-scenarios.md](references/eval-scenarios.md) and [references/eval-rubric.md](references/eval-rubric.md).

1. **Layer A static**: `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/uncertainty-map`
2. **Layer B efficacy**: 3 scenarios (Mode A / Mode B / fallback) — pass when all rubric items observed
3. **Layer C discipline**: 3 pressure scenarios — RED → GREEN → REFACTOR

If any layer fails, fix SKILL.md / references and re-run from Layer A. Stop after 3 cycles and revisit § Workflow or § Reference router.
