# Intake — input sources and missing-input fallback

Confirm what is on the table before decomposing. Never decompose against assumptions you have not surfaced to the user.

## Required input

- `docs/usecase-map.md` — produced by [usecase-mapper](../../usecase-mapper/SKILL.md). Contains:
  - `## ユースケース一覧` table with `UC ID`, `ユースケース`, `アクター`, `ドメイン`, `状態`, `関連API/画面`
  - Per-domain sections with use case diagrams and activity tables

Read the **ユースケース一覧** table and the **ドメイン概要一覧** first. They are sufficient inputs for Mode A in 90% of cases.

## Optional inputs

| Source | Path / format | What it adds |
|--------|---------------|--------------|
| Vision | `docs/product-vision.md` (or `docs/vision.md`) | One-line statement → MoSCoW Must yardstick |
| Competitive notes | inline chat or `docs/competitive-research/*` | Should / Could candidates with provenance |
| Hearing notes | `docs/hearing/*.md`, Notion exports | Constraints, deadlines, regulatory limits |
| **Previous output** | `docs/feature-list.md` (Mode A) or `docs/product-backlog.md` (Mode B) | Existing F IDs / MoSCoW labels to inherit; triggers diff-update mode |

Read optional inputs only when present. Do not block on them.

## Diff-update mode (when previous output exists)

When `docs/feature-list.md` (Mode A) or `docs/product-backlog.md` (Mode B) already exists, treat the run as **incremental update**, not full regeneration.

| Sub-step | Action |
|----------|--------|
| 1 | Read the previous output and extract its existing F IDs, MoSCoW labels, and Won't entries |
| 2 | Compare against the current `docs/usecase-map.md` |
| 3 | Identify three diff types: **新規** (UC added since), **変更** (priority / 概要 changed), **削除** (UC removed) |
| 4 | Preserve F IDs from the previous output verbatim — never reuse retired IDs, allocate the next Seq for new features |
| 5 | Surface a one-line diff summary to the user before re-emitting |

Diff summary format:

```
📥 前回出力検出: docs/feature-list.md (機能 N 件)
📊 差分: 新規 +<a> / 変更 <b> / 削除 -<c>
   - 新規: F-D04-03 (UC-D04-NN 由来)
   - 変更: F-D01-02 Should → Must (vision 更新による)
   - 削除: (取下げ) F-D02-XX → 棄却理由を「棄却したアイデアと理由」へ移動
```

If the user wants a full regeneration instead, they explicitly say "ゼロから作り直して". Otherwise default to diff-update.

## When `docs/usecase-map.md` is missing

Run the fallback in this order. Do **not** silently invent UC IDs.

1. **Suggest `/usecase-mapper` first.** One sentence: "先に `usecase-mapper` でユースケースマップを作ると機能の根拠が明確になります。先に走らせますか？"
2. If the user accepts → stop here and let `usecase-mapper` run; resume after.
3. If the user declines → run a **single-turn UC interview** (template below).

### Single-turn UC interview template (verbatim)

Send **one message** with the prompts below. Accept partial answers; do not loop more than once.

```
docs/usecase-map.md が無いので、最低限の文脈を 1 メッセージで教えてください
（推奨は先に /usecase-mapper を走らせること）。

1. プロダクト名 / 一行ビジョン: <空欄>
2. アクター 1-3 種類: <例: 一般ユーザー / 管理者 / 組織オーナー>
3. ユースケース 3-6 件（誰が・何を達成するか の 1 行）:
   - <例: 一般ユーザーがメールでログインする>
   - <例: 一般ユーザーがファイルを共有する>
   - <例: 管理者がメンバーを招待する>

回答に基づき機能一覧を作成し、すべて `(UC候補)` ラベル + 暫定 UC ID `UC-PROV-NN` で出力します。
1 ループのみで確定し、ループは追加しません。
```

### Dialog branch handling (verbatim)

User の応答パターンに対する agent の振る舞い:

| User reply | Agent action |
|------------|--------------|
| 「OK」「お願い」「進めて」 | そのまま emit へ。再質問しない |
| Partial reply（actor だけ / UC だけ） | 答えられた部分のみ反映、足りない部分は `(仮)` で埋め、`(UC候補)` ラベルで出力 |
| 「全部 Must で」 | 拒否: "Must の根拠を 1 行で書けない項目は Should に降ります（vision / 制約 / コストの 3 物差し）。" |
| 「UC ID 列は省いて」 | 拒否: "UC ID 列を抜くと、機能の根拠が再構成できなくなります。1 行追加で十分です。" |
| 「とりあえず競合の機能も入れて」 | 拒否: "UC アンカーが無い機能は追加しません。UC を追加するか、機能を取下げるかを選んでください。" |
| 追加 UC が出てきた | 1 件まで受付、UC-PROV-NN+1 を発行。N+1 件目以降は「次の更新サイクルで」と回答 |
| 「もう一度確認したい」 | 1 ラウンドのみ追加質問可。2 ラウンド目以降は emit を強制し、不確定項目には `(仮)` ラベル |

## Anti-fabrication policy (inherits from usecase-mapper)

- **Never fill cells you cannot verify.** Use `—` for unknown API paths, screen routes, or actors.
- Distinguish "実装で確認できた" vs "文書に書いてある" vs "推測"; only the first two go into the inventory without `(UC候補)`.
- If two sources conflict (e.g. spec says X, code says Y), record both and let the user choose; do not silently pick.

## Reading order for usecase-map.md

1. `## ユースケース一覧` — the master table; this drives Step 2 decomposition
2. `## システム概要` → `アクター一覧` — used in User Story actor field for Mode B
3. Per-domain `### アクティビティ` tables — for `関連API/画面` to seed Mode A acceptance sketch and Mode B AC

Skip the Mermaid diagrams unless you need to verify a relationship.

## Hand-off to Step 1

After reading inputs, output a one-line summary:

```
📥 入力: docs/usecase-map.md (UC 全 N 件 / M ドメイン) + docs/product-vision.md
```

Then proceed to Step 1 of [SKILL.md](../SKILL.md).
