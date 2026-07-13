# ② PBL template — `docs/product-backlog.md`

Product-facing view. A **priority-ordered list of user stories** in 「<主語> は <観察可能な振る舞い> できる」 form. **Row order = priority** (top = highest); people reorder freely. No MoSCoW labels, no acceptance criteria, no estimates by default — acceptance lives in `docs/acceptance-criteria.md`, estimation is an optional add-on.

## Full template

````markdown
# <プロダクト名> プロダクトバックログ (PBL)

> プロダクト観点。ユーザーストーリーを**上から優先度順**に並べています（順序＝優先度・人が並べ替えてよい）。
> 各ストーリーが「何をするか」は `docs/feature-list.md`、受け入れ条件は `docs/acceptance-criteria.md` を参照。

## スコープ

- **対象**: <一行で>
- **対象ユーザー**: <ペルソナ要約>
- **並び順の意味**: 上にあるものほど優先度が高い。並べ替えはチームで決めてよい。

## バックログ

| 順 | S ID | ユーザーストーリー（〇〇は〇〇できる） | 紐付 F |
|---|---|---|---|
| 1 | S-01 | 一般ユーザーは、メールとパスワードでログインできる | F-01 |
| 2 | S-02 | 組織オーナーは、メンバーをメールアドレスで招待できる | F-05 |
| 3 | S-03 | 一般ユーザーは、ファイルを共有リンクで他者に共有できる | F-03 |
| 4 | S-04 | 一般ユーザーは、パスワードを忘れたときに再設定できる | F-02 |

採番規則:
- `S-<Seq>`（2 桁ゼロ埋め）。一度割り当てた S ID は再利用しない
- 1 ストーリーは 1..N 個の `F` を紐付けてよい（横断機能を複数ストーリーが参照する）

---

## ストーリー詳細（任意・必要なものだけ）

ミニマムは上の表だけで成立する。背景や価値を残したいストーリーのみ、下記を追記する。

### S-01 メールとパスワードでログインできる

- **紐付 F**: F-01
- **ストーリー**: 一般ユーザーは、メールとパスワードでログインできる
- **価値（so that, 任意）**: 自分のアカウントの作業を再開できる

> `As a / I want / so that` 形式や Job Story 形式で詳しく書きたい場合は
> [user-story-and-ac.md](user-story-and-ac.md) を参照（PBL の primary は「〇〇は〇〇できる」短文）。

---

## カバレッジ・サマリ

| 項目 | 値 |
|---|---|
| ストーリー数 | <S> |
| 紐付 F が空のストーリー | <orphan list or なし> |
| 機能一覧にあるが未ストーリー化の機能 | <list or なし> |
````

## Story form rules

- Every row is **「<主語> は <観察可能な振る舞い> できる」**.
- **主語** is a concrete actor (`一般ユーザー` / `管理者` / `組織オーナー`), never a bare「ユーザー」.
- The verb phrase describes what the user can do — not how it is implemented (no API paths, no screen routes).
- One behavior per story. If a story needs "〜でき、かつ〜できる", split it.

## Optional add-ons (off by default)

Add these only when the user asks for sprint-readiness — they are not part of the minimal PBL:

- **見積 / スプリント切り出し** → [estimation-guide.md](estimation-guide.md) (T-Shirt or SP, dependency chains)
- **MoSCoW / Kano / RICE annotation** → [prioritization.md](prioritization.md) (a note column, never the backbone)

Keep these in a clearly-marked optional section so the default PBL stays minimal.

## Required global sections

1. スコープ（並び順＝優先度の明記を含む）
2. バックログ（優先度順の表）
3. カバレッジ・サマリ

ストーリー詳細は任意。

## Anti-patterns

- MoSCoW / 優先度ラベル列を足す → 順序がそのまま優先度。ラベルは任意注記列に留める
- 受入基準 (Given/When/Then) を PBL に書く → `docs/acceptance-criteria.md` に分離する
- actor が「ユーザー」だけ → 具体的なロール/ペルソナに
- 「POST /invite を呼べる」のような実装リーク → ユーザーの振る舞いで書く
- 見積・DoD・INVEST を既定で全ストーリーに付ける → optional add-on。要求時のみ
