---
name: feature-backlog-mapper
description: >-
  Map use cases to a prioritized feature inventory (Mode A) or sprint-ready
  product backlog (Mode B). Use when the user wants 機能一覧, コア機能一覧, 簡易要件定義書,
  プロダクトバックログ, スプリントバックログ, MoSCoW 優先度付け, ユーザーストーリー, 受入基準, INVEST チェック,
  or wants to turn docs/usecase-map.md into features. Triggers on "機能一覧を作って",
  "要件定義書を作って", "プロダクトバックログを作って", "スプリントに割れる形にして", "MoSCoW で優先度", "feature
  list", "product backlog", "user story", "acceptance criteria".
disable-model-invocation: false
---

# Feature Backlog Mapper

Turn use cases into a prioritized feature inventory (Mode A) or sprint-ready product backlog (Mode B). Inherit UC IDs from `usecase-mapper` so traceability runs from UC → Feature → PBI without rework.

> Human-facing overview: [README.md](README.md). Detailed references: [references/](references/).

## When to use

- "機能一覧 / コア機能一覧 / 要件定義書 を作って" → Mode A
- "プロダクトバックログ / スプリントに割れる形 / 受入基準 / ユーザーストーリー" → Mode B
- "docs/usecase-map.md から機能を出して" → Mode A
- The user wants MoSCoW prioritization or estimation kickoff

## When NOT to use

- Use case extraction itself → run [usecase-mapper](../usecase-mapper/SKILL.md) first
- Vision / one-line statement → use [product-vision-and-concept](../product-vision-and-concept/SKILL.md)
- Implementation scaffolding → use [ooui-architect](../ooui-architect/SKILL.md)
- Schema / data model → use [ooui-graphql-modeling](../ooui-graphql-modeling/SKILL.md)

## Reference router

| Task | Doc |
|------|-----|
| Confirm inputs, handle missing usecase-map | [references/intake.md](references/intake.md) |
| Decompose 1 UC → N features | [references/feature-decomposition.md](references/feature-decomposition.md) |
| Apply MoSCoW with rationale | [references/moscow-criteria.md](references/moscow-criteria.md) |
| Mode A output template | [references/proposal-template.md](references/proposal-template.md) |
| Mode B output template | [references/backlog-template.md](references/backlog-template.md) |
| User stories and acceptance criteria | [references/user-story-and-ac.md](references/user-story-and-ac.md) |
| Estimation and split rules | [references/estimation-guide.md](references/estimation-guide.md) |
| INVEST / coverage / anti-slop checks | [references/quality-checklist.md](references/quality-checklist.md) |
| Self-evaluation scenarios (Layer B/C) | [references/eval-scenarios.md](references/eval-scenarios.md) |
| Pass/fail rubric for evaluations | [references/eval-rubric.md](references/eval-rubric.md) |

Read reference files at the relevant step. Do not load all upfront.

## Workflow

### Step 0 — Confirm inputs

Read [references/intake.md](references/intake.md). Required input is `docs/usecase-map.md` produced by [usecase-mapper](../usecase-mapper/SKILL.md).

If `docs/usecase-map.md` is missing:

1. Suggest running `/usecase-mapper` first.
2. If the user declines, run a **single-turn UC interview** (1-3 actors, 3-6 use cases) and label every emitted feature with `(UC候補)` to flag the missing anchor.

Optional inputs (read when present): `docs/product-vision.md`, competitive notes from [competitive-research](../competitive-research/SKILL.md), hearing notes.

**Diff-update mode**: when `docs/feature-list.md` or `docs/product-backlog.md` already exists, default to incremental update (preserve existing F IDs, surface 新規/変更/削除 diff). Full regeneration only when the user says "ゼロから作り直して". See [references/intake.md](references/intake.md) §Diff-update mode.

### Step 1 — Pick mode

| Trigger phrase | Mode | Output file |
|----------------|------|-------------|
| 機能一覧 / コア機能 / 要件定義書 / feature list / spec | **Mode A** | `docs/feature-list.md` |
| プロダクトバックログ / スプリント / バックログ / story / acceptance | **Mode B** | `docs/product-backlog.md` |

Mode B requires either an existing `docs/feature-list.md` OR Mode A inline first. Never skip Mode A internally.

### Step 2 — Decompose UC → Features

Read [references/feature-decomposition.md](references/feature-decomposition.md).

- One UC produces 1..N features. Extract shared features explicitly (auth, notification, audit log, etc.).
- **NEVER invent a feature without a UC anchor.** If the user asks for one, mark it `(UC候補)` and propose adding a UC via [usecase-mapper](../usecase-mapper/SKILL.md).
- Feature ID rule: `F-<DomainID>-<Seq>` matching the UC domain ID — e.g. `F-D01-01` for domain D01.

### Step 3 — Apply MoSCoW

Read [references/moscow-criteria.md](references/moscow-criteria.md).

- **Must**: required for the one-line vision statement to hold. Write a 1-line rationale per Must — **MUST NOT omit**.
- **Should**: important to UX but MVP can ship without it.
- **Could**: ship if cheap; cut first when over budget.
- **Won't (this cycle)**: explicitly out — record in the「棄却したアイデアと理由」section with reason.

If the user pressures to mark everything Must, refuse and downgrade items lacking rationale.

### Step 4 — Write feature cards (Mode A) or PBIs (Mode B)

Read [references/proposal-template.md](references/proposal-template.md) for Mode A and [references/backlog-template.md](references/backlog-template.md) for Mode B.

- **Mode A card**: Input / Output / Basic rule / Constraint or precondition / Acceptance sketch — a few lines each.
- **Mode B PBI**: User Story (`As a / I want / so that`) + Acceptance Criteria (Given / When / Then × 3-5) + Estimate (T-Shirt or SP) + Dependencies (F IDs) + DoD + INVEST self-check.

If a PBI fails INVEST.Small (too big), split per [references/estimation-guide.md](references/estimation-guide.md).

### Step 5 — Cross-check & emit

Read [references/quality-checklist.md](references/quality-checklist.md). Verify:

- **Coverage**: every UC ID in `docs/usecase-map.md` has ≥1 feature anchored to it
- **Anti-slop**: no card with only "ユーザーが〜できる" or "システムが〜する" — must include I/O or AC
- **Traceability**: each F ID lists its UC ID; each PBI lists its F ID
- **Won't isolation**: Won't items appear only in the rejection section, never in the inventory

Write to `docs/feature-list.md` (Mode A) or `docs/product-backlog.md` (Mode B). For Mode B, also append a「スプリント切り出し提案」block with Must totals and dependency chains.

## Report back

After emitting, tell the user:

```
docs/feature-list.md (or docs/product-backlog.md) に出力しました。
- カバレッジ: <observed>/<total UC> 件
- Must: N 件 / Should: N / Could: N / Won't: N
- 次の一手: prototype-design-md / ooui-architect / ooui-graphql-modeling のいずれかへ
```

## NEVER

- Invent a feature without a UC anchor (or `(UC候補)` label)
- Mark a feature Must without a 1-line rationale
- List Won't items in the main inventory table
- Drop the UC ID column when emitting Mode A
- Emit Mode B without User Story + AC + INVEST per PBI

## MUST

- Inherit F IDs from Mode A when generating Mode B
- Keep `—` for unverifiable cells; never fabricate API paths or screen routes
- Output report block back to the user with coverage and MoSCoW counts

## Self-evaluation loop

Run all three layers before declaring the skill ready or after edits. Full scenarios, prompts, and rubric live in [references/eval-scenarios.md](references/eval-scenarios.md) and [references/eval-rubric.md](references/eval-rubric.md).

1. **Layer A static**: `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/feature-backlog-mapper`
2. **Layer B efficacy**: 3 scenarios (Mode A / Mode B / fallback) — pass when all rubric items observed
3. **Layer C discipline**: 3 pressure scenarios — RED → GREEN → REFACTOR

If any layer fails, fix SKILL.md / references and re-run from Layer A. Stop after 3 cycles and revisit the design (revisit § Workflow or § Reference router first).
