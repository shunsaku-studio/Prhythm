# ③ 受け入れ条件一覧 template — `docs/acceptance-criteria.md`

Verification-facing view. Given / When / Then per story (or feature), linked by ID. This is the **only** place acceptance criteria live — the feature list and PBL stay free of them.

## Full template

````markdown
# <プロダクト名> 受け入れ条件一覧

> 各ストーリー／機能が「完了したと言える条件」を Given / When / Then で列挙します。
> ストーリーは `docs/product-backlog.md` (S ID)、機能は `docs/feature-list.md` (F ID) を参照。

## インデックス

| AC ID | 対象 (S / F) | ラベル | 種別 |
|---|---|---|---|
| AC-01 | S-01 / F-01 | ログイン 正常系 | happy |
| AC-02 | S-01 / F-01 | 認証失敗 | failure |
| AC-03 | S-01 / F-01 | アカウントロック | boundary |
| AC-04 | S-03 / F-03 | 共有リンク発行 正常系 | happy |

採番規則: `AC-<Seq>`（2 桁ゼロ埋め）。各 AC は紐付く `S` と（あれば）`F` を持つ。

---

## S-01 メールとパスワードでログインできる （F-01）

- **AC-01 — ログイン 正常系** (happy)
  - Given 登録済みの email と正しい password
  - When `/login` でフォーム送信
  - Then `/dashboard` にリダイレクトされ、Cookie にセッショントークンが付く
- **AC-02 — 認証失敗** (failure)
  - Given 誤った password
  - When `/login` でフォーム送信
  - Then 「ログインに失敗しました」を表示し、フォームに留まる
- **AC-03 — アカウントロック** (boundary)
  - Given 同一 email で 5 回連続失敗
  - When 6 回目の試行
  - Then 「アカウントを 15 分間ロックしました」を表示し、ログイン処理を中断

## S-03 ファイルを共有リンクで共有できる （F-03）

<!-- 同じ形式で続く -->

---

## カバレッジ・サマリ

| 項目 | 値 |
|---|---|
| AC 数 | <A> |
| 受け入れ条件のあるストーリー | <covered> / <S> |
| happy / failure / boundary | <h> / <f> / <b> |
````

## Acceptance criteria rules

Read [user-story-and-ac.md](user-story-and-ac.md) §Acceptance Criteria for the full Given/When/Then conventions.

- **≥3 AC per story**, covering at minimum: happy path / at least one failure / at least one boundary.
- One observable outcome per AC. Do not chain "When Y and Z, Then A and B".
- `Then` states a user-observable result (URL, message, state change), never "正常に動く" / "エラーにならない".
- Each AC must be independently testable (automated or manual smoke).

## Required sections

1. インデックス（AC ID ↔ 対象 S/F ↔ 種別）
2. ストーリー／機能ごとの AC ブロック
3. カバレッジ・サマリ

## Anti-patterns

- AC が 1-2 個 → 観測点不足。happy / failure / boundary を最低 1 つずつ
- `Then` が「正常に動く」 → 観測可能な結果（URL / メッセージ / 状態変化）に書き直す
- 1 AC に複数 When → 分割する
- 紐付 `S`/`F` が空の AC → どのストーリー/機能の条件か必ず紐付ける
- 性能・非機能要件を AC に混ぜる → 別途 NFR セクション（AC は機能の観点）
