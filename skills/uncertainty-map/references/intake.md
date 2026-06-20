# Intake — input sources and hybrid strategy

Confirm what is on the table before extracting assumptions. Hybrid input means: **seed from documents → probe codebase → confirm only diffs with the user**. Never assume axis values you have not surfaced.

## Required / recommended inputs

| Source | Path | Role |
|--------|------|------|
| Vision | `docs/product-vision.md` | Axis 1 yardstick (Core if breaking it; Peripheral otherwise) |
| Feature list | `docs/feature-list.md` | Axis 1 seed (Must = Core, Should/Could = Peripheral). Source of F IDs |
| Prototype design | `DESIGN.md` (project root) | Prototype scope; what was intentionally in/out |
| Implementation | `git ls-files` results | Axis 2 evidence (code present? tests present?) |
| Observation logs | `docs/usability-log.md`, hearing notes, analytics | Axis 2 evidence (✅ requires this) |

Read in this order. The first three give 90% of axis 1. The last two drive axis 2.

## Hybrid strategy (5 sub-steps)

| Step | Action | Output |
|------|--------|--------|
| 1 | Read vision + feature-list (Must/Should/Could) | Axis 1 seed for every F ID |
| 2 | Run `git ls-files`; for each F ID grep for: F-ID comments, feature name keywords (Japanese + English), test file names | Code presence map |
| 3 | Read DESIGN.md to confirm intended prototype scope; confirm if observation logs exist | Axis 2 inferred labels |
| 4 | Single-turn dialog: present inferred matrix, ask user only for diffs | User-confirmed labels |
| 5 | Lock (axis1, axis2) per assumption | Ready for Step 5 emit |

Do not loop the dialog more than once before emit. If the user adds new info mid-emit, treat it as a follow-up edit, not a re-run.

## Optional inputs

| Source | When useful |
|--------|-------------|
| `docs/usecase-map.md` | When the team wants assumption traceability all the way back to UC IDs |
| `docs/competitive-research/*` | When axis 1 (Core) needs an external benchmark |
| `docs/hearing/*.md` | When vision is ambiguous; pull constraints to apply axis 1 |
| **Previous output** | `docs/uncertainty-map.md` (Mode A) or `docs/prototype-value-report.md` (Mode B) — triggers diff-update mode |

Read optional inputs only when present. Do not block on them.

## Diff-update mode (when previous output exists)

When `docs/uncertainty-map.md` (Mode A) or `docs/prototype-value-report.md` (Mode B) already exists, treat the run as **incremental update**, not full regeneration. This is the natural flow after a validation spike resolves one or more assumptions.

| Sub-step | Action |
|----------|--------|
| 1 | Read the previous output and extract its existing A IDs, axis 1 / axis 2 labels |
| 2 | Compare against current vision / feature-list / observation logs |
| 3 | Identify four diff types: **新規** (assumption added), **昇格** (⬜ → 🟡 → ✅ verification advanced), **降格** (✅ → 🟡 evidence weakened), **削除** (assumption retired) |
| 4 | Preserve A IDs from the previous output verbatim — never reuse retired IDs |
| 5 | Surface a one-line diff summary to the user before re-emitting |

Diff summary format:

```
📥 前回出力検出: docs/uncertainty-map.md (仮説 N 件)
📊 差分: 新規 +<a> / 昇格 <b> / 降格 <c> / 削除 -<d>
   - 新規: A-CORE-07 (vision 更新で追加)
   - 昇格: A-D01-01-01 ⬜ → ✅ (5 ユーザーテスト n=5 / 完了率 100%)
          A-CORE-05 ⬜ → 🟡 (LP CTR 4.2% / 有意性は要追加サンプル)
   - 降格: A-D03-XX-01 ✅ → 🟡 (再観察で離脱率上昇)
   - 削除: A-D02-XX-01 (機能削除に伴い棄却)
```

✅ 昇格時は **観察根拠が必須**。コードが追加されただけ（実装済）では昇格させない（[verification-classifier.md](verification-classifier.md) §「実装済 ≠ 検証済」を参照）。

If the user wants a full regeneration instead, they explicitly say "ゼロから作り直して". Otherwise default to diff-update.

## When inputs are missing

### Case A: vision missing, feature-list present

- Read `feature-list.md`. Use Must as the Core seed.
- One-line message to user: "ビジョン文書が無いので Must 機能を起点にコア判定します。後で `docs/product-vision.md` を作ると判定が安定します。"

### Case B: feature-list missing, vision present

- Read `product-vision.md`. Run a single-turn assumption interview based on vision.
- Recommend running `/feature-backlog-mapper` after this run.

### Case C: both missing

- Suggest the upstream skills first (one sentence): "先に `product-vision-and-concept` と `feature-backlog-mapper` を走らせると、不確実性マップの精度が大きく上がります。先に走らせますか？"
- If accepted → stop here and let the upstream skills run; resume after.
- If declined → run a single-turn assumption interview:
  - Ask for one-line vision + 3-5 risky beliefs about the prototype in one message
  - Accept partial answers; do not loop more than once
  - Tag every emitted assumption with `(コア候補)` to flag the missing anchor

### Case D: prototype implementation absent

- Mark all axis 2 labels as `⬜ 未検証` provisionally.
- Note in output header: "プロト実装が未確認のため検証ステータスは全件 `⬜` で初期化しています。"

## Codebase probing rules

When step 2 of the hybrid strategy runs, scope the search to:

- All files from `git ls-files` (no node_modules, no build artifacts — git already excludes them)
- Three grep patterns per F ID:
  1. F-ID literal: `F-D01-01` (catches comments and docs)
  2. Feature name keyword: Japanese name + English equivalents (e.g. "ログイン" + "login" + "signin")
  3. Test file name: glob `*<feature-key>*.test.*`, `*<feature-key>*.spec.*`

Treat zero hits as "未実装の可能性"; do not jump to ⬜ without checking the project structure (the project may use a different naming convention).

## Anti-fabrication policy

- Never invent observation counts, durations, or measurement values.
- Never claim ✅ unless an observation log / analytics output is referenced.
- When two sources conflict (e.g. DESIGN.md says X, code shows Y), record both and let the user choose; do not silently pick.
- Use `—` for cells you cannot verify.

## Single-turn interview templates

### When vision + feature-list exist (only confirming scope)

Send **one message** with confirmation prompts:

```
不確実性マップ作成のため、以下を確認させてください（部分回答 OK・スキップ OK）:

1. 対象プロト範囲: <DESIGN.md から推定: ファイル共有の招待〜閲覧動線> ← この範囲で OK?
2. 観察ログ: docs/usability-log.md / hearing notes はありますか？ ない場合は全件 🟡/⬜ 初期化
3. Mode: 「A 内部チーム向け（マップ）」 or 「B ステークホルダー向け（レポート）」

3 つすべて答えてくれれば 1 ターンで確定します。
```

### When vision + feature-list both missing (Case C, 1-shot interview)

```
docs/product-vision.md と docs/feature-list.md が無いので、最低限の文脈を 1 メッセージで教えてください
（推奨は先に /product-vision-and-concept と /feature-backlog-mapper を走らせること）。

1. ビジョン 1 行: <空欄>
2. 想定ターゲット: <空欄>
3. リスクが大きいと感じる仮説 3-5 件:
   -
   -
   -

回答に基づき仮説を抽出し、すべて `(コア候補)` ラベルで出力します。1 ループのみで確定します。
```

### Dialog opener for sub-step 4 (codebase probed, ready to confirm)

Use the verbatim opener in [verification-classifier.md](verification-classifier.md) §Sub-step 4 — Single-turn diff confirmation.

## Hand-off to Step 1

After reading inputs, output a one-line summary:

```
入力: docs/product-vision.md ✓ / docs/feature-list.md ✓ (機能 N 件) /
      DESIGN.md ✓ / 実装 git ls-files = M 件
      観察ログ — なし → 対話で確認
モード: Mode A として進めます
```

Then proceed to Step 1 of [SKILL.md](../SKILL.md).
