# Mode A output template — `docs/feature-list.md`

Copy the structure below verbatim. Fill placeholders. Do not add new top-level sections without a reason — readers expect this shape.

## Full template

````markdown
# <プロダクト名> 機能一覧 / 簡易要件定義書

> 提案フェーズ向けの軽量版。`docs/usecase-map.md` の UC ID に紐付く形で機能を整理しています。
> 詳細な PBI はスプリント版 (`docs/product-backlog.md`) を参照。

## スコープ

- **ビジョン**: <一行ステートメント> （出典: `docs/product-vision.md`）
- **対象ユーザー**: <ペルソナ要約>
- **このサイクルで含むもの**: <例: D01 認証 / D02 共有 / D-X 監査>
- **このサイクルで含まないもの**: <例: D05 通知 / D06 課金>
- **入力ソース**: `docs/usecase-map.md` (UC 全 <N> 件 / <M> ドメイン)

## 機能インベントリ

> Won't はこの表に含めず、後段の「棄却したアイデアと理由」へ。

| F ID | 機能名 | UC ID | 概要(1行) | 優先度 | 状態 |
|---|---|---|---|---|---|
| F-D01-01 | メール+パスワードでログイン | UC-D01-01 | 認証してセッション開始 | Must | 仮 |
| F-D01-02 | パスワードリセット | UC-D01-02 | メール経由でパスワードを再設定 | Should | 仮 |
| F-D02-01 | 共有リンク発行 | UC-D02-03 | URL 1 個でファイル共有 | Must | 仮 |
| F-X-01 | 操作監査ログ | UC-D01-01, UC-D02-03 | 主要操作を tamper-evident に記録 | Must | 仮 |

採番規則:
- `F-<DomainID>-<Seq>`（UC ID と同じドメインID粒度）
- Seq は 2 桁ゼロ埋め
- 横断機能は `F-D-X-<Seq>`

状態:
- `仮` — 文書のみで実装未確認
- `実装済` — 既存実装で確認済
- `—` — 確認できない

---

## 機能カード

### F-D01-01 メール+パスワードでログイン

- **UC**: UC-D01-01
- **優先度**: Must — 根拠: ビジョン「個人で使い始められる」には認証が必須
- **入力**: email (string), password (string ≥ 8 文字)
- **出力**: セッション (JWT or Cookie), `/dashboard` へリダイレクト
- **基本ルール**:
  - 失敗 5 回でアカウントロック 15 分
  - パスワードは bcrypt 等で保存
- **制約・前提**: SMTP プロバイダの選定は別タスク
- **受入のスケッチ**: 正しい credentials → ダッシュボード遷移 / 誤り → エラーメッセージ + ロック挙動

### F-D01-02 パスワードリセット

- **UC**: UC-D01-02
- **優先度**: Should
- **入力**: email
- **出力**: リセットトークン入りメール送信
- **基本ルール**:
  - トークン有効期限 30 分
  - 同一 email への連続発行は 60 秒インターバル
- **制約・前提**: メール配送ベンダ次第で到達率がブレる
- **受入のスケッチ**: 既存ユーザーのメール → リセットリンク送信 / 未登録 → 同じメッセージ（ユーザー存在検知防止）

<!-- 同じ形式で全 Must / Should / Could を続ける -->

---

## 棄却したアイデアと理由 (Won't this cycle)

| F ID 候補 | 機能名 | 理由 |
|---|---|---|
| (取下げ) | SAML SSO | ターゲット規模では ROI 低い・後回し |
| (取下げ) | 多要素認証 | ビジョン優先度低、Phase 2 で再検討 |

---

## カバレッジ・サマリ

| 項目 | 値 |
|---|---|
| UC 全件 | <N> |
| 機能化済 UC | <covered> / <N> |
| 未カバー UC | <uncovered list> |
| Must / Should / Could / Won't | M=<n> / S=<n> / C=<n> / W=<n> |

未カバー UC がある場合は、理由（仕様確認待ち / 次フェーズ / Won't）を明記。

---

## 次の一手

- プロト → [prototype-design-md](../../prototype-design-md/SKILL.md) に渡す
- スプリント版 → 同スキルを Mode B で再実行 (`/feature-backlog-mapper Mode B`)
````

## Required sections

These are mandatory; verify before emit:

1. **スコープ** — ビジョン + 含む / 含まない
2. **機能インベントリ** — 表 + 採番規則
3. **機能カード** — Must / Should / Could すべて
4. **棄却したアイデアと理由** — Won't 専用
5. **カバレッジ・サマリ** — 数値で

Optional:

- 機能のグルーピング見出し（ドメインごと）
- ユースケース横断の依存図（Mermaid）

## Anti-patterns

- Skipping the「棄却したアイデアと理由」section because there are no Won'ts → keep the section header with "該当なし" so the reader knows it was considered
- Mixing Won't into the main inventory
- Feature card without 受入のスケッチ
- カバレッジ・サマリ without numerator/denominator
