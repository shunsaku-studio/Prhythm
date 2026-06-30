# Intake — standalone inputs and diff-update

The skill is **standalone**: it never requires another skill's output. Gather whatever context exists, surface it to the user in one line, then decompose. Never decompose against assumptions you have not surfaced.

## Input priority order

Use the first available source. None is mandatory.

| Priority | Source | Path / format | What it adds |
|----------|--------|---------------|--------------|
| 1 | Use case map | `docs/usecase-map.md` (if present) | Use cases to decompose; an optional 紐付 UC column |
| 2 | Vision | `docs/product-vision.md` (or stated one-liner) | Yardstick for PBL ordering |
| 3 | Description | pasted requirements / chat description | Direct decomposition source |
| 4 | Single-turn intake | the interview below | Last resort when nothing else exists |

Optional extras (read when present, never block on them): competitive notes (`docs/competitive-research/*`), hearing notes (`docs/hearing/*.md`, Notion exports).

> `docs/usecase-map.md` is **optional**, not required. If it exists, use its use cases and add a 紐付 UC column. If it does not, drop the column and work from vision / description — the skill still produces all three artifacts.

## Diff-update mode (when previous output exists)

When **any** of `docs/feature-list.md` / `docs/product-backlog.md` / `docs/acceptance-criteria.md` already exists, treat the run as **incremental update**, not full regeneration.

| Sub-step | Action |
|----------|--------|
| 1 | Read the existing artifact(s) and extract their `F` / `S` / `AC` IDs |
| 2 | Compare against the current source (vision / description / usecase-map) |
| 3 | Identify three diff types per artifact: **新規** (added), **変更** (wording / order / link changed), **削除** (removed) |
| 4 | Preserve all `F` / `S` / `AC` IDs verbatim — never reuse retired IDs; allocate the next Seq for additions |
| 5 | Surface a one-line diff summary per artifact before re-emitting |

Diff summary format:

```
📥 前回出力検出: feature-list.md (機能 F件) / product-backlog.md (S件) / acceptance-criteria.md (AC件)
📊 差分:
   - ① 機能一覧: 新規 +<a> / 変更 <b> / 削除 -<c>
   - ② PBL: 新規 +<a> / 変更 <b> / 削除 -<c>（並べ替えは「変更」に含む）
   - ③ 受け入れ条件: 新規 +<a> / 変更 <b> / 削除 -<c>
```

If the user wants a full regeneration instead, they explicitly say "ゼロから作り直して". Otherwise default to diff-update.

When only one artifact is requested ("PBL だけ更新して"), update that file but keep its IDs consistent with the other two if they exist.

## When no document source exists

Run the fallback in this order. Do **not** silently invent a usecase-map.

1. If `docs/usecase-map.md` could help, mention it once: "先に `/usecase-mapper` を走らせると機能の根拠が揃いますが、無くても進められます。"
2. If the user wants to proceed without it → run the **single-turn intake** below.

### Single-turn intake template (verbatim)

Send **one message** with the prompts below. Accept partial answers; do not loop more than once.

```
最低限の文脈を 1 メッセージで教えてください（先に /usecase-mapper を走らせるのも有効です）。

1. プロダクト名 / 一行ビジョン: <空欄>
2. アクター 1-3 種類: <例: 一般ユーザー / 管理者 / 組織オーナー>
3. 実現したいこと 3-6 件（誰が・何を達成するか の 1 行）:
   - <例: 一般ユーザーがメールでログインする>
   - <例: 一般ユーザーがファイルを共有する>
   - <例: 管理者がメンバーを招待する>

回答に基づき 機能一覧 / PBL / 受け入れ条件 の 3 成果物を作成します。
1 ループのみで確定し、ループは追加しません。
```

### Dialog branch handling (verbatim)

| User reply | Agent action |
|------------|--------------|
| 「OK」「お願い」「進めて」 | そのまま emit へ。再質問しない |
| Partial reply（actor だけ / 目的だけ） | 答えられた部分のみ反映、足りない部分は `(仮)` で埋めて emit |
| 「全部最優先で」 | 拒否: "PBL は順序で優先度を表します。上位を一緒に選びましょう（vision / 制約 / コストの 3 物差し）。" |
| 「機能一覧に優先度を付けて」 | 拒否: "優先度は PBL の並び順で表します。機能一覧には優先度を持たせません。" |
| 「受け入れ条件も機能一覧に書いて」 | 拒否: "受け入れ条件は `docs/acceptance-criteria.md` に分離します。各観点をミニマムに保つためです。" |
| 追加の目的が出てきた | 受付、次の Seq の `F` / `S` を発行 |

## Anti-fabrication policy

- **Never fill cells you cannot verify.** Use `—` for unknown API paths, screen routes, or actors.
- Distinguish "実装で確認できた" vs "文書に書いてある" vs "推測"; do not present a guess as confirmed.
- If two sources conflict (spec says X, code says Y), record both and let the user choose; do not silently pick.

## Hand-off to Step 1

After reading inputs, output a one-line summary of what was actually found, e.g.:

```
📥 入力: docs/usecase-map.md (UC 全 N 件) + docs/product-vision.md
```
or, when standalone:
```
📥 入力: 一行ビジョン + 口頭説明（usecase-map なし → 紐付 UC 列は省略）
```

Then proceed to Step 1 of [SKILL.md](../SKILL.md).
