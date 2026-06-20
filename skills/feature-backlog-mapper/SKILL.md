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

## Mode flow (entry-point shortcuts)

| Situation | Flow |
|-----------|------|
| `docs/usecase-map.md` exists, fresh inventory | Step 0 → 1 (Mode A) → 2 → 3 → 4 → 5 |
| Mode A artifact exists, sprint-ready needed | Step 0 → 1 (Mode B) → 2 (skip when F IDs exist) → 3 → 4 → 5 |
| `docs/feature-list.md` or `docs/product-backlog.md` exists (re-run) | Step 0 (diff-update) → 4 (changed rows only) → 5 |
| `usecase-map.md` missing, user wants quick draft | Step 0 (single-turn UC interview) → 2 → 3 → 4 → 5 with `(UC候補)` labels |
| User pasted requirements doc, no UC | Step 0 (suggest `/usecase-mapper` first) → if declined, fallback above |
| Vision changed, want to re-balance MoSCoW | Step 0 (diff-update) → 3 (re-apply yardstick) → 5 |

Announce the chosen flow in one line before Step 1 emit.

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

## Final deliverable

Every session ends with the report block below — even partial / interrupted sessions. **Do not exit without it.**

```
✅ docs/feature-list.md (Mode A) または docs/product-backlog.md (Mode B) に出力しました
- カバレッジ: <observed>/<total UC> 件 (UC anchor 確認済)
- 内訳: Must <m> / Should <s> / Could <c> / Won't <w>
- 棄却: <r> 件（理由は「棄却したアイデアと理由」セクション）
- 差分更新: 新規 +<a> / 変更 <ch> / 削除 -<d>（diff-update mode のとき）
- 次の一手: /prototype-design-md → /uncertainty-map → /ooui-architect / /ooui-graphql-modeling
```

Output file shape (Mode A — summary; full template in [references/proposal-template.md](references/proposal-template.md)):

- 概要 / 想定ターゲット / 一行価値（vision 引用）
- Must / Should / Could 各表（機能カード: I/O・基本ルール・制約・受入スケッチ）
- 「棄却したアイデアと理由」セクション
- カバレッジ・サマリ

Output file shape (Mode B — summary; full template in [references/backlog-template.md](references/backlog-template.md)):

- 概要 + Must 件数
- PBI 群（User Story + AC × 3-5 + 見積 + 依存 F IDs + DoD + INVEST self-check）
- 「スプリント切り出し提案」（Must 累計 + 依存チェーン）
- 棄却サブセクション

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

## Principles

The stance behind the workflow. When references conflict with these, the principles win.

1. **UC anchor first** — Never invent a feature without a UC ID. If needed, label it `(UC候補)` and propose adding a UC via [usecase-mapper](../usecase-mapper/SKILL.md).
2. **Must requires rationale** — Every Must has a 1-line vision / UC / cost justification. Refuse Must without it; downgrade silently is also forbidden.
3. **Must (What の核) ≠ コア仮説 (Why の核)** — Must 機能は「システムが何をするか」を決める。これに対し下流の `uncertainty-map` スキルが扱う「コア仮説」は「vision を成立させる暗黙の前提」を指す。両者は別レイヤー。Must を決めるのが本スキル、Must の背後にある暗黙の前提を仮説として検証対象に翻訳するのが `uncertainty-map`。
4. **Won't is honest** — Reject ideas openly in the「棄却したアイデアと理由」section with reason. Never drop silently to make the inventory cleaner.
5. **Coverage transparency** — Always report `<observed>/<total UC>` numerator/denominator. "Fully covered" is a number, not a feeling. 未カバー UC は理由（仕様確認待ち / 次フェーズ / Won't）を必ず明記。
6. **Mode separation** — Mode A is judgment (what to build), Mode B is sprint readiness (how to build it). Do not mix outputs in one file.
7. **Diff-update is the default for re-runs** — Preserve existing F IDs verbatim. Full regeneration is only on explicit "ゼロから作り直して".
8. **Always land the deliverable** — Every session ends with the Final deliverable block, even when partial. The user must always know the current state.

## Anti-patterns for the agent

- Asking the user clarifying questions one-by-one across many turns instead of one batched intake
- Asking "do you want Must / Should / Could split?" — apply MoSCoW with rationale first, then confirm
- Dropping UC IDs from cards because "the user knows the context"
- Marking everything Must to please the user under pressure (refuse and downgrade)
- Skipping the rejection section to keep the deliverable shorter
- Re-using a retired F ID in diff-update mode (always allocate next Seq)
- Claiming "fully covered" without checking the numerator/denominator
- Producing Mode B without ever running Mode A internally first
- Generating a backlog when `docs/usecase-map.md` is obviously missing instead of suggesting `/usecase-mapper`
- Loading all references upfront instead of on-demand at each step

## Self-evaluation loop

Run all three layers before declaring the skill ready or after edits. Full scenarios, prompts, and rubric live in [references/eval-scenarios.md](references/eval-scenarios.md) and [references/eval-rubric.md](references/eval-rubric.md).

1. **Layer A static**: `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/feature-backlog-mapper`
2. **Layer B efficacy**: 3 scenarios (Mode A / Mode B / fallback) — pass when all rubric items observed
3. **Layer C discipline**: 3 pressure scenarios — RED → GREEN → REFACTOR

If any layer fails, fix SKILL.md / references and re-run from Layer A. Stop after 3 cycles and revisit the design (revisit § Workflow or § Reference router first).
