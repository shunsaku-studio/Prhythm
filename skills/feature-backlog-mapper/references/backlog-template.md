# Mode B output template — `docs/product-backlog.md`

Sprint-ready product backlog. Inherit F IDs from `docs/feature-list.md` (Mode A). Each PBI is a row in the index plus a detailed card.

## Full template

````markdown
# <プロダクト名> プロダクトバックログ

> 開発スプリント向け。`docs/feature-list.md` の F ID を引き継ぎ、ユーザーストーリー・受入基準・見積・依存・DoD・INVEST を揃えています。

## スコープ

- **ビジョン**: <一行ステートメント>
- **対象ユーザー**: <ペルソナ要約>
- **このバックログのスコープ**: <例: D01 認証 / D02 共有 / D-X 監査>
- **見積もり単位**: T-Shirt (XS / S / M / L / XL) または ストーリーポイント (1, 2, 3, 5, 8, 13)
- **入力ソース**: `docs/feature-list.md` (機能 全 <N> 件)

## バックログインデックス

| F ID | 機能名 | UC ID | 優先度 | 見積 | 依存 | スプリント候補 |
|---|---|---|---|---|---|---|
| F-D01-01 | メール+パスワードでログイン | UC-D01-01 | Must | M | F-X-01 | Sprint 1 |
| F-X-01 | 操作監査ログ | UC-D01-01, UC-D02-03 | Must | S | — | Sprint 1 |
| F-D01-02 | パスワードリセット | UC-D01-02 | Should | M | F-D01-01 | Sprint 2 |
| F-D02-01 | 共有リンク発行 | UC-D02-03 | Must | L | F-D01-01, F-X-01 | Sprint 2 |

優先度は Mode A の MoSCoW を引き継ぐ。Won't はこの表に出さない（Mode A のままで参照）。

---

## PBI 詳細

### F-D01-01 メール+パスワードでログイン

- **UC**: UC-D01-01
- **優先度**: Must — ビジョン「個人で使い始められる」を成立させる起点
- **見積**: M (T-Shirt) ≒ 2-3 day
- **依存**: F-X-01 (監査ログを先に通す必要)

**ユーザーストーリー**

```
As a 一般ユーザー
I want メールアドレスとパスワードでログインできる
so that 自分のアカウントの作業を再開できる
```

**受入基準 (Acceptance Criteria)**

- **AC1 — 正常系**
  - Given 登録済みの email と正しい password
  - When `/login` でフォーム送信
  - Then `/dashboard` にリダイレクトされ、Cookie にセッショントークンが付く
- **AC2 — 認証失敗**
  - Given 誤った password
  - When `/login` でフォーム送信
  - Then 「ログインに失敗しました」を表示し、フォームに留まる
- **AC3 — アカウントロック**
  - Given 同一 email で 5 回連続失敗
  - When 6 回目の試行
  - Then 「アカウントを 15 分間ロックしました」を表示し、ログイン処理を中断
- **AC4 — セッション更新**
  - Given 有効なセッション Cookie
  - When 任意のページをリロード
  - Then 再ログイン無しで描画される

**Definition of Done**

- [ ] 単体テスト: パスワード比較・ロック判定の境界値
- [ ] E2E: AC1 / AC2 / AC3 が緑
- [ ] 監査ログ (F-X-01) に「login_success」「login_failure」「account_locked」が出る
- [ ] エラーメッセージは i18n リソースから取得
- [ ] 関連 docs (`docs/auth.md`) に挙動を追記

**INVEST セルフチェック**

| 項目 | 判定 | 補足 |
|---|---|---|
| Independent | ✅ | F-X-01 完了後は単独で動く |
| Negotiable | ✅ | ロック閾値・期間は調整可 |
| Valuable | ✅ | ユーザーが価値を直接認識 |
| Estimable | ✅ | M (2-3 day) |
| Small | ✅ | 1 スプリント内で完了見込み |
| Testable | ✅ | AC1-AC4 で観測可能 |

---

### F-X-01 操作監査ログ

<!-- 同じ形式で続く -->

---

## スプリント切り出し提案

### Sprint 1 (Must 中心 / 〜M2 まで)

| F ID | 見積 | 累積 |
|---|---|---|
| F-X-01 | S | S |
| F-D01-01 | M | S+M |

合計: <X day> 程度。ベロシティ仮置き（チームに合わせて調整）。

依存連鎖: なし → F-X-01 → F-D01-01

### Sprint 2 (Must の続き + Should)

| F ID | 見積 | 累積 |
|---|---|---|
| F-D02-01 | L | L |
| F-D01-02 | M | L+M |

依存連鎖: F-D01-01 → F-D02-01 / F-D01-01 → F-D01-02

### 持ち越し候補 (Could / 余剰時間)

- F-D02-XX <優先度低の Could>

---

## カバレッジ・サマリ

| 項目 | 値 |
|---|---|
| Mode A の機能数 | <N> |
| PBI 化済 | <covered> / <N> |
| 未着手の機能 | <list> |
| 合計見積 | <X day or Y SP> |
````

## Required fields per PBI

Verify each PBI has all of:

1. UC ID(s)
2. 優先度 + 1-line rationale (for Must)
3. 見積 (T-Shirt or SP)
4. 依存 (F IDs or "—")
5. ユーザーストーリー (3-line `As a / I want / so that`)
6. AC × 3-5 (Given / When / Then format)
7. DoD checklist
8. INVEST セルフチェック (6 行)

## Required global sections

1. スコープ
2. バックログインデックス（表）
3. PBI 詳細（全 PBI）
4. スプリント切り出し提案
5. カバレッジ・サマリ

## Anti-patterns

- AC が 1-2 個しかない → 観測点不足、3 個以上に増やす
- AC が「正常に動く」程度の粒度 → Given/When/Then で書き直す
- INVEST.S が ✅ なのに見積が XL → 矛盾、分割するか見積を直す
- ユーザーストーリーの actor が「ユーザー」だけ → ペルソナ・ロールに具体化
- DoD が「テストを書く」だけ → 観測可能な完了状態（境界値、E2E、ログ、ドキュメント）まで分解
