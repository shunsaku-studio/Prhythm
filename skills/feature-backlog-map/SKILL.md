---
name: feature-backlog-mapper
description: >-
  Generate three linked artifacts in one pass — a project-facing feature list,
  a product backlog of user stories, and an acceptance-criteria list. Use when
  the user wants 機能一覧, コア機能一覧, 簡易要件定義書, プロダクトバックログ (PBL), ユーザーストーリー,
  受入基準 / 受け入れ条件一覧, or wants to turn a vision / description / docs/usecase-map.md
  into features. Triggers on "機能一覧を作って", "要件定義書を作って", "プロダクトバックログを作って",
  "ユーザーストーリーにして", "受け入れ条件を出して", "feature list", "product backlog", "user
  story", "acceptance criteria".
disable-model-invocation: false
---

# Feature Backlog Mapper

Generate three linked artifacts in one pass, then let the reader use whichever they need:

| 成果物 | ファイル | 観点 | 中身 |
|---|---|---|---|
| ① 機能一覧 | `docs/feature-list.md` | プロジェクト | 機能ごとの 概要 / 入力・出力 / 基本ルール / 制約・前提 |
| ② プロダクトバックログ (PBL) | `docs/product-backlog.md` | プロダクト | ユーザーストーリー「〇〇は〇〇できる」を**優先度順**に列挙 |
| ③ 受け入れ条件一覧 | `docs/acceptance-criteria.md` | 検証 | Given / When / Then を機能・ストーリー単位で列挙 |

The three artifacts are linked **internally** by ID (`F-NN` → `S-NN` → `AC-NN`). The skill **stands alone**: it works from a vision, a description, or `docs/usecase-map.md` if present — but never requires another skill's output, and never depends on cross-skill ID traceability.

> Human-facing overview: [README.md](README.md). Detailed references: [references/](references/).

## When to use

- "機能一覧 / コア機能一覧 / 要件定義書 を作って"
- "プロダクトバックログ / ユーザーストーリー にして"
- "受け入れ条件 / 受入基準 を出して"
- "この vision / 説明 / docs/usecase-map.md から機能を整理して"

毎回 3 成果物を生成する。モード選択はしない（使うものだけ読んでもらう）。

## When NOT to use

- Use case extraction itself → run [usecase-mapper](../usecase-mapper/SKILL.md) (任意の上流; 無くても本スキルは動く)
- Vision / one-line statement → use [product-vision-and-concept](../product-vision-and-concept/SKILL.md)
- Prototype assumptions / risk map → use the `uncertainty-map` skill
- Implementation scaffolding → use [ooui-architect](../ooui-architect/SKILL.md)
- Schema / data model → use [ooui-graphql-modeling](../ooui-graphql-modeling/SKILL.md)

## Reference router

| Task | Doc |
|------|-----|
| Confirm inputs, standalone & diff-update | [references/intake.md](references/intake.md) |
| Decompose into features | [references/feature-decomposition.md](references/feature-decomposition.md) |
| Order PBL by priority (human-owned) | [references/prioritization.md](references/prioritization.md) |
| ① 機能一覧 template | [references/feature-list-template.md](references/feature-list-template.md) |
| ② PBL template | [references/backlog-template.md](references/backlog-template.md) |
| ③ 受け入れ条件一覧 template | [references/acceptance-template.md](references/acceptance-template.md) |
| User stories & acceptance criteria writing | [references/user-story-and-ac.md](references/user-story-and-ac.md) |
| Estimation / split (optional add-on) | [references/estimation-guide.md](references/estimation-guide.md) |
| Linkage / coverage / anti-slop checks | [references/quality-checklist.md](references/quality-checklist.md) |
| Self-evaluation scenarios (Layer B/C) | [references/eval-scenarios.md](references/eval-scenarios.md) |
| Pass/fail rubric for evaluations | [references/eval-rubric.md](references/eval-rubric.md) |

Read reference files at the relevant step. Do not load all upfront.

## Entry-point shortcuts

| Situation | Flow |
|-----------|------|
| Fresh run (vision / description / usecase-map) | Step 0 → 1 → 2 → 3 (① ② ③) → 4 |
| Any of the 3 artifacts exists (re-run) | Step 0 (diff-update) → 3 (changed rows only) → 4 |
| Only one artifact requested ("PBL だけ更新して") | Step 0 → 3 (target artifact) → 4 — still keep IDs consistent with the others if they exist |

Announce the chosen flow in one line before Step 3 emit.

## Workflow

### Step 0 — Confirm inputs

Read [references/intake.md](references/intake.md). The skill is **standalone** — gather inputs in this priority order, stopping at the first available:

1. `docs/usecase-map.md` (if present) — use cases as a decomposition source
2. `docs/product-vision.md` (if present) — one-line statement for ordering
3. A pasted description / requirements doc
4. A **single-turn intake** (1-3 actors, 3-6 goals) when nothing else exists

Optional inputs (read when present): competitive notes from [competitive-research](../competitive-research/SKILL.md), hearing notes.

**Diff-update mode**: when any of the three output files already exists, default to incremental update — preserve existing `F`/`S`/`AC` IDs verbatim, surface 新規/変更/削除 diff per artifact. Full regeneration only when the user says "ゼロから作り直して". See [references/intake.md](references/intake.md) §Diff-update mode.

### Step 1 — Decompose into features

Read [references/feature-decomposition.md](references/feature-decomposition.md).

- One source goal / UC produces 1..N features. Extract shared features explicitly (auth, notification, audit log, etc.).
- Feature ID rule: `F-NN` (2-digit zero-padded). If the source has domain structure (e.g. usecase-map domains), `F-<DomainID>-<NN>` grouping is **allowed but optional**.
- Each feature gets 概要 / 入力 / 出力 / 基本ルール / 制約・前提. **No priority, no acceptance** in the feature list.

### Step 2 — Order by priority (human-owned)

Read [references/prioritization.md](references/prioritization.md).

- Priority lives in the **PBL row order** — top = highest. There is **no MoSCoW label** on the feature list.
- Propose a reasonable initial order using the yardsticks (vision / constraint / cost), then state clearly: **順序＝優先度。並べ替えは人が決めてよい。**
- If the user wants a labeled framework (MoSCoW / Kano / RICE), offer it as an optional annotation — do not make it the backbone.

### Step 3 — Emit the three artifacts

Write all three (or the requested subset), using the templates:

1. ① `docs/feature-list.md` — [references/feature-list-template.md](references/feature-list-template.md)
2. ② `docs/product-backlog.md` — [references/backlog-template.md](references/backlog-template.md). Each story is **「<主語> は <観察可能な振る舞い> できる」**, listed in priority order, carrying its `S-NN` ID and 紐付 `F-NN`.
3. ③ `docs/acceptance-criteria.md` — [references/acceptance-template.md](references/acceptance-template.md). Given / When / Then per story/feature (≥3 each: happy / failure / boundary), carrying `AC-NN` and 紐付 `S-NN` / `F-NN`.

Estimation / sprint slicing is an **optional add-on** ([references/estimation-guide.md](references/estimation-guide.md)) — not part of the default output.

### Step 4 — Cross-check & emit

Read [references/quality-checklist.md](references/quality-checklist.md). Verify:

- **Internal linkage**: every story references ≥1 `F-NN`; every AC references its `S-NN`/`F-NN`; no dangling IDs across the three files
- **No priority leak**: the feature list carries no MoSCoW / 優先度 column
- **Story form**: every PBL row is in 「〇〇は〇〇できる」 form (subject explicit, not bare「ユーザー」)
- **AC separation**: acceptance is in ③ only, in Given/When/Then form (not "正常に動く")
- **Anti-slop**: no feature whose 概要 is only "ユーザーが〜できる"; cells use `—` when unverifiable

## Final deliverable

Every session ends with the report block below — even partial / interrupted sessions. **Do not exit without it.**

```
✅ 出力しました
- ① docs/feature-list.md (機能 <F> 件)
- ② docs/product-backlog.md (ストーリー <S> 件 / 優先度順)
- ③ docs/acceptance-criteria.md (AC <A> 件)
- 内部連携: F↔S↔AC 全て紐付け済（未連携 <n> 件）
- 差分更新: 新規 +<a> / 変更 <ch> / 削除 -<d>（diff-update mode のとき）
- 次の一手: /uncertainty-map（仮説整理）→ /prototype-design-md → /ooui-architect / /ooui-graphql-modeling
```

## NEVER

- Put a 優先度 / MoSCoW column on the feature list (priority = PBL order, human-owned)
- Put acceptance criteria inside the feature list or PBL (they live in ③ only)
- Require another skill's output or cross-skill ID linkage to run
- Write a PBL story that is not in 「〇〇は〇〇できる」 form, or whose subject is a bare「ユーザー」
- Reuse a retired `F`/`S`/`AC` ID in diff-update mode (always allocate the next Seq)
- Fabricate API paths or screen routes — use `—` for unverifiable cells

## MUST

- Emit all three artifacts (or the explicitly-requested subset) in one pass
- Keep the three artifacts internally linked by `F-NN` → `S-NN` → `AC-NN`
- Order the PBL so that row position = priority, and say so to the user
- Output the report block with per-artifact counts and the linkage status

## Principles

The stance behind the workflow. When references conflict with these, the principles win.

1. **Three artifacts, one pass** — 機能一覧 (project view) / PBL (product view) / 受け入れ条件 (verification view) are separated on purpose. Emit all; let the reader pick.
2. **Each skill stands alone** — Work from vision / description / usecase-map, whichever exists. Never depend on another skill's output or on cross-skill ID traceability. Internal `F→S→AC` linkage is the only required linkage.
3. **Priority is human-owned** — The feature list carries no priority. PBL row order = priority, proposed by the skill but freely reordered by people. MoSCoW is an optional annotation, never the backbone.
4. **Project view ≠ product view** — 機能一覧 describes what the system does (project planning). PBL describes what a user can do, in story form (product value). Keep them in separate files.
5. **Acceptance is separable** — Given/When/Then lives in its own artifact so each view stays minimal.
6. **Minimal beats complete** — Prefer the smallest artifact that is still useful. Drop fields that nobody reads.
7. **Diff-update is the default for re-runs** — Preserve existing IDs verbatim. Full regeneration only on explicit "ゼロから作り直して".
8. **Always land the deliverable** — Every session ends with the Final deliverable block, even when partial.

## Anti-patterns for the agent

- Asking the user clarifying questions one-by-one across many turns instead of one batched intake
- Asking "Mode A か Mode B か?" — there are no modes; emit all three artifacts
- Putting a 優先度 column on the feature list "because it's convenient"
- Cramming acceptance criteria into the PBL to "save a file"
- Refusing to run because `docs/usecase-map.md` is missing (it is optional — fall back to vision / description / single-turn intake)
- Writing PBL stories with a bare「ユーザー」 subject instead of a concrete actor
- Re-using a retired ID in diff-update mode (always allocate next Seq)
- Loading all references upfront instead of on-demand at each step

## Self-evaluation loop

Run all three layers before declaring the skill ready or after edits. Full scenarios, prompts, and rubric live in [references/eval-scenarios.md](references/eval-scenarios.md) and [references/eval-rubric.md](references/eval-rubric.md).

1. **Layer A static**: `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/feature-backlog-mapper`
2. **Layer B efficacy**: scenarios (full 3-artifact run / standalone fallback / single-artifact / diff-update) — pass when all rubric items observed
3. **Layer C discipline**: pressure scenarios — RED → GREEN → REFACTOR

If any layer fails, fix SKILL.md / references and re-run from Layer A. Stop after 3 cycles and revisit the design (§ Workflow or § Reference router first).
