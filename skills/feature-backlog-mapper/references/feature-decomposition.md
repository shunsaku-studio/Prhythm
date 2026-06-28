# Feature decomposition — Goal → Features

A goal (a use case, or a one-line "誰が何を達成したいか") is **what the actor wants**; a feature is **what the system must do** to satisfy it. One goal produces 1..N features. Decompose from whatever source exists — `docs/usecase-map.md` if present, otherwise the vision / description / single-turn intake.

## Core rule

> Every feature traces to a source goal. The skill is standalone — the goal can come from a UC, a vision, or a description. A 紐付 UC column is added **only when `docs/usecase-map.md` exists**.

When `docs/usecase-map.md` is present, list each feature's source UC ID in the 紐付 UC column for convenience. When it is absent, omit the column — do not invent UC IDs.

## Decomposition heuristics

### One goal → One feature

When the goal describes a single, atomic interaction.

```
「ログインする」 → F-01 メール+パスワードでログイン
```

### One goal → N features

When the goal implies multiple distinct system behaviors.

```
「ファイルを共有する」
  → F-03 共有リンク発行
  → F-06 共有相手の権限設定
  → F-07 共有取消
```

Split when each piece has separate I/O, separate failure modes, or maps to a different user story.

### Shared / cross-cutting features

Authentication, notification, audit log, error handling, search, file upload — these often serve multiple goals / stories. Extract them once; multiple PBL stories can link to the same `F`:

```
| F ID | 機能名 | 概要(1行) | 紐付 UC |
| F-04 | 操作監査ログ | 主要操作を tamper-evident に記録 | UC-D01-01, UC-D02-03 |
```

When `docs/usecase-map.md` exists, list all the UC IDs a shared feature serves; otherwise omit the column.

## Granularity

Aim for "one engineer, two days, one pull request" as the target size for a feature card. Aim for "one user-meaningful behavior" as the lower bound — do not split below the level a user can describe in one sentence. If a feature is large, keep it as one card; size is handled in the optional estimation add-on ([estimation-guide.md](estimation-guide.md)), not in the default output.

## F ID rules

- Format: `F-<Seq>` — e.g. `F-01`, `F-15` (Seq is zero-padded 2 digits)
- If the source has domain structure (usecase-map domains), `F-<DomainID>-<Seq>` grouping is **allowed but optional** — e.g. `F-D01-01`. Pick one style and stay consistent.
- Once assigned, **never reuse** an F ID even when the feature is removed; use a new Seq instead

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Feature name = UC name verbatim | Add the system behavior verb ("〜を発行する", "〜を保存する") |
| One feature = whole domain | Split per actor goal, not per data model |
| Sub-feature with no I/O distinct from parent | Merge into parent |
| Inventing a UC ID when no usecase-map exists | Omit the 紐付 UC column; trace to the vision / description instead |
| Auth / logging / notification scattered across many cards | Extract once as cross-cutting |

## Hand-off to Step 2

After decomposition, you should have:

- A working list of `F-NN` → 機能名 → 1-line summary (→ 紐付 UC when usecase-map exists)
- Cross-cutting features extracted once

Proceed to ordering in [prioritization.md](prioritization.md) (priority = PBL order), then emit the three artifacts.

## 関連流派 (補足)

Goal → Feature 分解とは別に、ユーザー体験全体を可視化するアプローチがある。本スキルは構造化を優先するが、以下の流派の発想は補助的に取り込める。

| 流派 | 発想 | 強み | 本スキルでの位置付け |
|------|------|------|---------------------|
| **User Story Mapping** (Jeff Patton, 2005) | ユーザーの行動順序を横軸（バックボーン）、深さを縦軸でマップする | リリース計画とユーザージャーニーが一目で揃う、横断機能や時間順序が見える | PBL を時系列のバックボーンで並べたい場合の補助。横軸＝ユーザー行動順、縦軸＝優先度として読み替える |
| **Event Storming** (Alberto Brandolini, 2013) | ドメインイベント（業務上で起きること）を起点に、コマンド・アグリゲート・ポリシーを付箋で発掘する | 業務ロジックの境界・並行性・状態遷移が早期に見える、DDD への接続が良い | 業務ロジックが複雑なプロジェクトで機能発掘のヒアリング補助として |
| **Impact Mapping** (Gojko Adzic, 2012) | Goal → Actors → Impacts → Deliverables の 4 階層で目的駆動の機能発見 | 「なぜ作るか」と「何を作るか」が紐付く | Vision (Why) と 機能 (What) を繋ぐ橋として、`product-vision-and-concept` 出力をより細粒度に展開する補助 |

### いつこれらを参照するか

- **User Story Mapping**: ユーザー導線が長い B2C プロダクトで、リリース順序とユーザー価値の累積を見せたい時
- **Event Storming**: 既存業務システムをリプレースする / B2B で複雑な業務ロジックがある時
- **Impact Mapping**: vision はあるが目的と機能の橋渡しを強化したい時

これらは Goal → Feature 分解を **置き換えない**。補助発想として取り込み、出力は 3 成果物（機能一覧 / PBL / 受け入れ条件）に集約する。
