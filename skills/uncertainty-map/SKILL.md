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
- Recording a validation/observation result (user test, spike, benchmark) → use [validation-log](../validation-log/SKILL.md), then re-run this skill to promote statuses

## Reference router

| Task | Doc |
|------|-----|
| Confirm inputs, hybrid intake, missing-input fallback | [references/intake.md](references/intake.md) |
| Extract assumptions from features (粒度・ID) | [references/assumption-extraction.md](references/assumption-extraction.md) |
| Decide Core vs Peripheral (axis 1) | [references/core-vs-peripheral.md](references/core-vs-peripheral.md) |
| Decide Verified / Partial / Unverified (axis 2) | [references/verification-classifier.md](references/verification-classifier.md) |
| Mode A output template (`docs/uncertainty-map.md`) | [references/matrix-template.md](references/matrix-template.md) |
| Mode B output template (`docs/proto-value-report.md`) | [references/report-template.md](references/report-template.md) |
| 4-quadrant action playbook + 14 validation methods (#1-9 価値系 / #10-14 技術系) | [references/action-playbook.md](references/action-playbook.md) |
| Coverage / anti-slop / quality gate | [references/quality-checklist.md](references/quality-checklist.md) |
| Self-evaluation scenarios (Layer B/C) | [references/eval-scenarios.md](references/eval-scenarios.md) |
| Pass/fail rubric for evaluations | [references/eval-rubric.md](references/eval-rubric.md) |

Read reference files at the relevant step. Do not load all upfront.

## Mode flow (entry-point shortcuts)

| Situation | Flow |
|-----------|------|
| Vision + feature-list + プロト実装 ある（新規）| Step 0 → 1 (Mode A) → 2 → 3 → 4 → 5 |
| Mode A 既存 + 投資家プレゼン直前 (対外向け) | Step 0 → 1 (Mode B) → 5 |
| `docs/uncertainty-map.md` 既存（検証スパイク後の更新）| Step 0 (diff-update) → 4 (昇格/降格判定) → 5 |
| プロト未実装、vision + feature-list のみ | Step 0 → 1 (Mode A) → 2 → 3 → 4 (全件 ⬜) → 5 |
| 観察ログだけ追加された | Step 0 (diff-update) → 4 sub-step 3 (✅ 昇格判定) → 5 |
| 技術スパイク / PoC / ベンチマーク結果が追加された | Step 0 (diff-update) → 4 sub-step 3 (技術仮説の ✅ 昇格判定 — outcome 数値必須) → 5 |
| Vision / feature-list 不在 | Step 0 (suggest upstream) → 拒否なら single-turn interview → `(コア候補)` ラベル |

Announce the chosen flow in one line before Step 1 emit.

## Workflow

### Step 0 — Confirm inputs (hybrid intake)

Read [references/intake.md](references/intake.md). Inputs are gathered in this priority order:

1. `docs/product-vision.md` — vision yardstick for axis 1
2. `docs/feature-list.md` — Must = Core, Should/Could = Peripheral seed
3. `DESIGN.md` and prototype implementation files (`git ls-files`) — axis 2 evidence
4. `docs/validation-log.md` (正準、`validation-log` スキル産出) / `docs/usability-log.md` (レガシー) — observation/measurement logs that promote 🟡 → ✅
5. Single-turn dialog only when seeds are missing

If all of (1)(2) are missing, suggest `/product-vision-and-concept` and `/feature-backlog-mapper` first. If the user declines, run a single-turn assumption interview and label every emitted assumption `(コア候補)`.

**Diff-update mode**: when `docs/uncertainty-map.md` or `docs/proto-value-report.md` already exists, default to incremental update. Surface 新規/昇格/降格/削除 diff and preserve existing A IDs. ✅ への昇格は観察根拠が必須（実装済 ≠ 検証済）。Full regeneration only when the user says "ゼロから作り直して". See [references/intake.md](references/intake.md) §Diff-update mode.

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
- **Separate technical from value beliefs**: 「実装してみないと分からない型」(feasibility / performance / integrability / non-determinism / rendering behavior) は **価値仮説と別 A ID** に分ける。1 仮説に混在させると refute 時に原因が判別できない。識別が必要なら `-T<n>` (技術) / `-V<n>` (価値) サフィックスを使う。

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
3. Promote to `✅ 検証済` only when **observation / measurement evidence** is present — scale + period + outcome の 3 点必須。価値仮説はユーザー観察、技術仮説はスパイク / PoC / ベンチマーク / Web Vitals 等の **計測 outcome**（成功数 / p95 / 有効率 / CLS など機械可読な数値）
4. Single-turn dialog: present the inferred matrix, ask only for diffs
5. Lock in (axis1, axis2) pair per assumption

**NEVER** mark `✅` without observation evidence. Animation of code passing tests is `🟡` only. 「スパイクで動いた」だけの outcome も 🟡 据え置き — 計測値が必須。

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

## Final deliverable

Every session ends with the report block below — even partial / interrupted sessions. **Do not exit without it.**

```
✅ docs/uncertainty-map.md (Mode A) または docs/proto-value-report.md (Mode B) に出力しました
- 全仮説: <N> 件 / コア: <C> / 周辺: <P>
- ステータス: ✅<v> / 🟡<p> / ⬜<u>
- 最優先（コア × 未検証）: <n> 件 / 検証アクション提案済
- 差分更新: 新規 +<a> / 昇格 <pr> / 降格 <dm> / 削除 -<d>（diff-update mode のとき）
- 次の一手: 提案済み検証スパイクの実行 → 結果反映で再 mapping
```

Output file shape (Mode A — summary; full template in [references/matrix-template.md](references/matrix-template.md)):

- スコープ（vision / 対象プロト / 入力ソース）
- マトリクス（Mermaid `quadrantChart` + ASCII 図 + 象限別件数表）
- 4 象限の詳細表（コア × 未検証 / 部分検証 / 検証済 + 周辺）
- 次の検証アクション表（仮説 / 手段 / 工数 / 期待結果 / 失格条件）
- カバレッジ・サマリ + 次の一手

Output file shape (Mode B — summary; full template in [references/report-template.md](references/report-template.md)):

- エグゼサマ（最大の価値 + 最大のリスクを 1 文ずつ）
- スコープ（含む / 含まない）
- 検証済成果（自然言語、ID は脚注）
- 残課題（⬜ コアを隠さず併記）
- デモ動線 + 次の検証計画
- Appendix A 仮説 ID 対応表（mandatory）

## NEVER

- Mark `✅ 検証済` without user observation / measurement evidence (animations of green tests are `🟡` only)
- Place an assumption in Core without citing vision or a Must rationale
- Empty the 「未検証」 column in Mode B to look better — Unverified Core must appear in 残課題
- Use a single validation method (e.g. "ユーザーテスト") for every action — pick from the 14-method playbook (#1-9 価値系 / #10-14 技術系)
- Apply "ユーザーテスト" to a technical hypothesis — feasibility / performance / non-determinism は #10-14 (スパイク / PoC / ベンチマーク / 品質変動計測 / 実装観察) で扱う
- Combine technical + value beliefs into a single assumption — refute 時に原因が判別できなくなる。必ず 2 仮説に分解する
- Restate a feature name as an assumption (e.g. "X ができる" is not an assumption)
- Fabricate user counts, observation periods, or measurement numbers

## MUST

- Inherit F IDs from `docs/feature-list.md` and reference them on every A ID
- Carry a 1-line rationale for each Core classification (vision quote or F-ID Must reason)
- Propose ≥1 validation action for every Core × Unverified row
- In Mode B, surface Unverified Core in 残課題 and 次の検証計画 — never hide it
- Use `—` for unverifiable cells; never invent metrics or user counts

## Principles

The stance behind the workflow. When references conflict with these, the principles win.

1. **Implementation ≠ verification** — ✅ requires user observation / measurement evidence (人数・期間・結果). Code passing tests is 🟡, not ✅.
2. **Core is narrow by design** — Core 判定は数を絞るのが目的。絞り込めない仮説は Peripheral に降ろす。Core は ≤30% を目安、超えたら理由を明示。なお本スキルの「コア仮説」は **Why の核**（vision を成立させる暗黙の前提）を指し、上流 `feature-backlog-mapper` の「Must 機能」（**What の核**、システムが何をするか）とは別レイヤー。Must 機能から抽出した暗黙の前提が「コア仮説」候補になる。両者を混同しない。
3. **Vision is the yardstick** — Core 根拠は vision 引用 / Must 紐付 / cost trade-off のいずれかで 1 行書ける。「重要だから」は理由ではない。
4. **Honesty in Mode B** — 未検証コアを残課題セクションから隠さない。隠せばレポートの信頼が崩れる。「正直さ」が最大の信頼資産。
5. **Falsifiable beliefs only** — 仮説は「これが間違っていたら ___」を 1 文で書ける。書けないものは仮説ではなく wish。
6. **Match method to belief** — 検証手段は 14 種カタログ（#1-9 価値系 / #10-14 技術系）から仮説タイプに応じて選ぶ。「ユーザーテスト」一択は思考停止。技術仮説（feasibility / performance / non-determinism / rendering behavior）はスパイク / PoC / ベンチマーク / 品質変動計測 / 実装観察で検証する。
7. **Failure threshold defines learning** — 各検証アクションに失格条件（数値）を必ず付与。期待値だけ書いて失敗判定がないと学びが歪む。
8. **Diff-update preserves history** — A ID は verbatim で維持、retired ID は再利用しない。検証履歴の追跡可能性を最優先。
9. **Technical ≠ value hypotheses** — 「実装してみないと分からない型」(feasibility / performance / integrability / non-determinism / rendering behavior) は価値仮説と **別 A ID** に切り出す。机上の技術調査は検証ではないが、スパイク / PoC / ベンチマーク / Web Vitals 計測など **観察可能な outcome** を伴う実装観察は正当な検証ループに乗る。
10. **Always land the deliverable** — Every session ends with the Final deliverable block, even when partial.

## Anti-patterns for the agent

- Asking the user clarifying questions one-by-one across many turns instead of one batched intake
- 推奨検証手段を 5 つ並べて選ばせる — 第一候補 1 つに絞り、代替は注記程度に
- Probing the codebase silently and reporting the matrix without showing it to the user before emit
- Looping the diff-confirmation dialog more than once before emitting
- 観察ログの数値を「だいたい」「数人」と曖昧に書く — 具体数値か `—` の二択
- Mode B でユーザーが「未検証コアは出すな」と言ったら従う — 拒否して残課題に併記
- Loading all references upfront instead of on-demand at each step
- Promoting ⬜ → ✅ in one step (must pass through 🟡 with implementation+test evidence)
- 「動かしてるから検証済」「テストが緑だから検証済」と書く — 両方とも 🟡 まで
- Re-using a retired A ID in diff-update mode (always allocate next Seq)

## Self-evaluation loop

Run all three layers before declaring the skill ready or after edits. Full scenarios, prompts, and rubric live in [references/eval-scenarios.md](references/eval-scenarios.md) and [references/eval-rubric.md](references/eval-rubric.md).

1. **Layer A static**: `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/uncertainty-map`
2. **Layer B efficacy**: 5 scenarios (Mode A / Mode B / fallback / diff-update / technical hypotheses) — pass when all rubric items observed
3. **Layer C discipline**: 5 pressure scenarios — RED → GREEN → REFACTOR

If any layer fails, fix SKILL.md / references and re-run from Layer A. Stop after 3 cycles and revisit § Workflow or § Reference router.
