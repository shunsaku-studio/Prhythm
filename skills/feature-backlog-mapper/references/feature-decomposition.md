# Feature decomposition — UC → Features

A use case is **what the actor wants**; a feature is **what the system must do** to satisfy it. One UC produces 1..N features. Stay anchored to the UC table.

## Core rule

> Every feature has a UC ID. No UC, no feature.

If a feature has no UC anchor:

1. Mark it `(UC候補)`.
2. Tell the user: "この機能は UC に対応する候補がありません。`usecase-mapper` で UC を追加するか、機能を取り下げる必要があります。"
3. Wait for the user to decide before writing it into the inventory.

## Decomposition heuristics

### One UC → One feature

When the UC describes a single, atomic interaction.

```
UC-D01-01 ログインする → F-D01-01 メール+パスワードでログイン
```

### One UC → N features

When the UC implies multiple distinct system behaviors.

```
UC-D02-03 ファイルを共有する
  → F-D02-03 共有リンク発行
  → F-D02-04 共有相手の権限設定
  → F-D02-05 共有取消
```

Split when each piece has separate I/O, separate failure modes, or could ship in different sprints.

### Shared / cross-cutting features

Authentication, notification, audit log, error handling, search, file upload — these often serve multiple UCs. Extract them once and **link multiple UC IDs**:

```
| F ID | 機能名 | UC ID | ... |
| F-X-01 | 操作監査ログ | UC-D01-01, UC-D02-03, UC-D03-02 | ... |
```

Place shared features under a virtual domain `D-X` (cross-cutting) or the most representative domain.

## Granularity

Aim for "one engineer, two days, one pull request" as the target size for a Mode A feature card. If a feature is bigger:

- In Mode A → keep as one card; the size is just a flag for Mode B
- In Mode B → it must be split into PBIs that fit in one sprint (see [estimation-guide.md](estimation-guide.md))

Aim for "one user-meaningful behavior" as the lower bound. Do not split below the level a user can describe in one sentence.

## F ID rules

- Format: `F-<DomainID>-<Seq>` — e.g. `F-D01-01`, `F-D02-15`
- Domain ID matches the UC domain ID (`D01`, `D02`, ...)
- Cross-cutting features use `D-X` (or `D00` if `D-X` is unavailable in tooling)
- Seq is zero-padded 2 digits
- Once assigned, **never reuse** an F ID even when the feature is removed; use a new Seq instead

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Feature name = UC name verbatim | Add the system behavior verb ("〜を発行する", "〜を保存する") |
| One feature = whole domain | Split per actor goal, not per data model |
| Sub-feature with no I/O distinct from parent | Merge into parent |
| Feature anchored to a "状態: 未実装" UC without note | Mark `状態: 仮` in the inventory |
| Auth / logging / notification scattered across many cards | Extract once as cross-cutting |

## Hand-off to Step 3

After decomposition, you should have:

- A working list of F ID → 機能名 → UC ID(s) → 1-line summary
- Cross-cutting features extracted
- No feature without a UC anchor (or all unanchored ones explicitly `(UC候補)`)

Proceed to MoSCoW prioritization in [moscow-criteria.md](moscow-criteria.md).
