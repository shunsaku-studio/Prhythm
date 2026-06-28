# ① 機能一覧 template — `docs/feature-list.md`

Project-facing view. Describes **what the system does**, minimally. **No priority, no acceptance criteria** — those live in `docs/product-backlog.md` (order = priority) and `docs/acceptance-criteria.md`.

Copy the structure below verbatim. Fill placeholders. Do not add a 優先度 column or a 受入 field.

## Full template

````markdown
# <プロダクト名> 機能一覧

> プロジェクト観点の機能インベントリ。各機能が「何をするか」を 入力・出力・基本ルール・制約 で記述します。
> 優先度は PBL (`docs/product-backlog.md`) の並び順、受け入れ条件は `docs/acceptance-criteria.md` を参照。

## スコープ

- **対象**: <一行で。何のための機能群か>
- **対象ユーザー**: <ペルソナ要約>
- **このサイクルで含むもの**: <例: 認証 / 共有 / 監査>
- **このサイクルで含まないもの**: <例: 通知 / 課金>
- **入力ソース**: <docs/usecase-map.md があれば記載 / 無ければ vision・説明など実際のソース>

## 機能インベントリ

| F ID | 機能名 | 概要(1行) | 紐付 UC |
|---|---|---|---|
| F-01 | メール+パスワードでログイン | 認証してセッション開始 | UC-D01-01 |
| F-02 | パスワードリセット | メール経由でパスワードを再設定 | UC-D01-02 |
| F-03 | 共有リンク発行 | URL 1 個でファイル共有 | UC-D02-03 |
| F-04 | 操作監査ログ | 主要操作を tamper-evident に記録 | UC-D01-01, UC-D02-03 |

採番規則:
- `F-<Seq>`（Seq は 2 桁ゼロ埋め）が基本
- ソースにドメイン構造があれば `F-<DomainID>-<Seq>`（例 `F-D01-01`）でグループ化してよい（任意）
- 一度割り当てた F ID は機能を削除しても**再利用しない**（次の Seq を採番）

「紐付 UC」列は `docs/usecase-map.md` がある場合のみ。無ければ列ごと省略してよい（本スキルは単体成立）。

---

## 機能カード

### F-01 メール+パスワードでログイン

- **概要**: 登録済みユーザーが認証してセッションを開始する
- **入力**: email (string), password (string ≥ 8 文字)
- **出力**: セッション (JWT or Cookie), `/dashboard` へリダイレクト
- **基本ルール**:
  - 失敗 5 回でアカウントロック 15 分
  - パスワードは bcrypt 等で保存
- **制約・前提**: SMTP プロバイダの選定は別タスク

### F-02 パスワードリセット

- **概要**: ユーザーがメール経由でパスワードを再設定する
- **入力**: email
- **出力**: リセットトークン入りメール送信
- **基本ルール**:
  - トークン有効期限 30 分
  - 同一 email への連続発行は 60 秒インターバル
- **制約・前提**: メール配送ベンダ次第で到達率がブレる

<!-- 同じ形式で全機能を続ける。優先度・受入は書かない -->

---

## カバレッジ・サマリ

| 項目 | 値 |
|---|---|
| 機能数 | <F> |
| PBL ストーリーに紐付いた機能 | <covered> / <F> |
| 受け入れ条件のある機能 | <with-ac> / <F> |
| 紐付 UC（usecase-map がある場合） | <covered>/<total UC> |

未連携の機能があれば理由（仕様確認待ち / 次フェーズ）を明記。
````

## Required sections

These are mandatory; verify before emit:

1. **スコープ** — 対象 + 含む / 含まない
2. **機能インベントリ** — 表 + 採番規則
3. **機能カード** — 全機能（概要 / 入力 / 出力 / 基本ルール / 制約・前提）
4. **カバレッジ・サマリ** — F↔S↔AC の内部連携を数値で

Optional:

- 機能のグルーピング見出し（ドメインごと）
- 機能間の依存図（Mermaid）

## Anti-patterns

- Adding a 優先度 / MoSCoW column → priority belongs to the PBL row order
- Adding a 受入のスケッチ / AC field → acceptance belongs to `docs/acceptance-criteria.md`
- Feature card whose 概要 is only "ユーザーが〜できる" → add the system behavior (verb + I/O)
- Requiring a 紐付 UC column when no usecase-map exists → drop the column; the skill stands alone
- カバレッジ・サマリ without numerator/denominator
