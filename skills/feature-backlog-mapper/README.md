# feature-backlog-mapper

> ビジョン・説明・ユースケースから **機能一覧 / プロダクトバックログ / 受け入れ条件一覧** の 3 成果物を一度に生成するエージェントスキル。

vision・説明・`docs/usecase-map.md`（あれば）のいずれかを起点に、機能を分解し、3 つの成果物を同時に出力します。**モード選択はありません**——毎回 3 つ出して、読み手は必要なものだけ使います。3 成果物は ID（`F-NN` → `S-NN` → `AC-NN`）で**内部連携**しますが、他スキルの出力には依存しません（単体で成立）。

- **入力:** vision / 説明 / `docs/usecase-map.md`（すべて任意。何もなければ 1 ターンの簡易ヒアリング）
- **出力:**
  - ① `docs/feature-list.md` — 機能一覧（プロジェクト観点：概要・I/O・基本ルール・制約）
  - ② `docs/product-backlog.md` — PBL（プロダクト観点：「〇〇は〇〇できる」を優先度順）
  - ③ `docs/acceptance-criteria.md` — 受け入れ条件一覧（Given/When/Then）
- **スコープ外:** ユースケース抽出（→ `usecase-mapper`）/ ビジョン言語化（→ `product-vision-and-concept`）/ 仮説整理（→ `uncertainty-map`）/ スキーマ・UI 設計（→ `ooui-graphql-modeling` / `ooui-architect`）

---

## 概要

3 つの観点を意図的に分離します。

| 成果物 | 観点 | 答えるもの |
|--------|------|-----------|
| ① 機能一覧 | プロジェクト | システムが**何をするか** |
| ② PBL | プロダクト | ユーザーが**何をできるか**（優先度順） |
| ③ 受け入れ条件 | 検証 | **完了したと言える条件**は何か |

優先度は **PBL の並び順** で表します（上ほど高優先度・人が並べ替える）。機能一覧には優先度を持たせません。出力は Markdown のため GitHub・VS Code でそのまま閲覧・差分レビューできます。

## 利用メリット

- **観点が混ざらない** — プロジェクト観点（機能一覧）とプロダクト観点（PBL）を別ファイルに分離。必要な人が必要な成果物だけ読める
- **優先度は人が決める** — PBL の並び順がそのまま優先度。スキルは初期順序を提案するだけで、ラベル付けを強制しない
- **受け入れ条件が独立** — Given/When/Then を別成果物にすることで、各観点をミニマムに保てる
- **単体で動く** — usecase-map が無くても vision や説明から生成できる。他スキルへの ID 依存を持たない
- **作り直しがいらない** — 再実行は差分更新（`F`/`S`/`AC` ID を保持し、新規/変更/削除を提示）

## 利用シーン

- **何を作るか言語化したいとき** — 機能を分解して 概要・I/O・基本ルール・制約 を整理したい
- **提案資料に「機能一覧」を入れたいとき** — 入出力が一目で分かる軽量版が欲しい
- **プロダクトバックログを優先度順に持ちたいとき** — 「〇〇は〇〇できる」のストーリー一覧が欲しい
- **受け入れ条件を別に管理したいとき** — Given/When/Then を機能・ストーリーに紐付けて列挙したい

依頼の例:

```
このプロダクトの機能一覧を作って
プロダクトバックログを優先度順で出して
受け入れ条件を出して
docs/usecase-map.md から 3 点セットを作って
```

## 使い方

Claude Code / Cursor 上で次のように依頼すると起動します。

```
/feature-backlog-mapper このビジョンから機能一覧・PBL・受け入れ条件を作って
/feature-backlog-mapper PBL だけ優先度を見直して更新して
```

スラッシュ無しでも、機能一覧・要件定義書・プロダクトバックログ・ユーザーストーリー・受け入れ条件などのキーワードを含む依頼で自動起動します。

入力ソース（usecase-map.md・ビジョン・説明など）が複数ある場合は、依頼時に対象を伝えてください。

## 出力例（抜粋）

**① 機能一覧 (`docs/feature-list.md`)** — 優先度なし

```markdown
| F ID | 機能名 | 概要(1行) |
|---|---|---|
| F-01 | メール+パスワードでログイン | 認証してセッション開始 |
| F-03 | 共有リンク発行 | URL 1 個でファイル共有 |

### F-01 メール+パスワードでログイン
- **概要**: 登録済みユーザーが認証してセッションを開始する
- **入力**: email, password (≥ 8 文字)
- **出力**: セッション (JWT or Cookie), `/dashboard` へリダイレクト
- **基本ルール**: 失敗 5 回でアカウントロック 15 分 / パスワードは bcrypt で保存
- **制約・前提**: SMTP プロバイダの選定は別タスク
```

**② PBL (`docs/product-backlog.md`)** — 優先度順

```markdown
| 順 | S ID | ユーザーストーリー（〇〇は〇〇できる） | 紐付 F |
|---|---|---|---|
| 1 | S-01 | 一般ユーザーは、メールとパスワードでログインできる | F-01 |
| 2 | S-02 | 一般ユーザーは、ファイルを共有リンクで共有できる | F-03 |
```

**③ 受け入れ条件 (`docs/acceptance-criteria.md`)**

```markdown
## S-01 メールとパスワードでログインできる （F-01）
- AC-01 — 正常系 (happy): Given 正しい credentials / When `/login` 送信 / Then `/dashboard` リダイレクト
- AC-02 — 失敗 (failure): Given 誤った password / When 送信 / Then エラー表示
- AC-03 — ロック (boundary): Given 5 回失敗 / When 6 回目 / Then 15 分ロック表示
```

詳細テンプレートは [`references/feature-list-template.md`](references/feature-list-template.md) / [`references/backlog-template.md`](references/backlog-template.md) / [`references/acceptance-template.md`](references/acceptance-template.md) を参照。

## 構成

```
feature-backlog-mapper/
├── SKILL.md                          # エージェントが読む本体（モデル向け、英語）
├── README.md                         # 本ファイル（人間向け、日本語）
└── references/                       # 進行のための詳細
    ├── intake.md                     # 入力確認・単体成立・差分更新
    ├── feature-decomposition.md      # Goal → 機能 の分解
    ├── prioritization.md             # 優先度＝PBL の並び順（人が決める）
    ├── feature-list-template.md      # ① 機能一覧テンプレ
    ├── backlog-template.md           # ② PBL テンプレ
    ├── acceptance-template.md        # ③ 受け入れ条件一覧テンプレ
    ├── user-story-and-ac.md          # ストーリー / 受け入れ条件の書き方
    ├── estimation-guide.md           # 見積・分割（任意の追補）
    ├── quality-checklist.md          # 内部連携・分離の最終ゲート
    ├── eval-scenarios.md             # Layer A/B/C 評価シナリオ + プロンプト
    └── eval-rubric.md                # 観測すべき合否項目チェックリスト
```

## 前提条件

- Claude Code または Cursor（プラグイン `prhythm` の一部として配布）
- 入力はすべて任意。`docs/usecase-map.md`（[usecase-mapper](../usecase-mapper/) 生成）や `docs/product-vision.md`（[product-vision-and-concept](../product-vision-and-concept/) 生成）があれば活用するが、無くても vision・説明から生成できる

## 注意事項

- **3 成果物を毎回生成** — モード選択はしません。使うものだけ読んでもらう前提です（単一の成果物だけ更新する依頼にも対応）
- **機能一覧に優先度を持たせない** — 優先度は PBL の並び順で表現します
- **受け入れ条件は分離** — Given/When/Then は `docs/acceptance-criteria.md` にのみ書きます
- **単体成立** — 他スキルの出力や ID 連携には依存しません。内部の `F→S→AC` 連携のみ必須です
- **空欄を捏造しない** — 文書だけでは確定できない API・画面パスなどは `—` のまま残します
- 既存の 3 ファイルがある場合は上書き前に差分を確認します（ID 保持）
- 出力は Markdown のみで、JIRA / Linear などの外部ツールへの直接連携は行いません

## 関連スキル

| スキル | 関係 |
|--------|------|
| [usecase-mapper](../usecase-mapper/) | 任意の上流。あれば UC を入力ソースに使う（無くても動く） |
| [product-vision-and-concept](../product-vision-and-concept/) | 任意の上流。PBL の並び順の物差しになる一行ステートメント |
| [competitive-research](../competitive-research/) | 任意の上流。機能候補の参考ソース |
| [uncertainty-map](../uncertainty-map/) | 並行。機能一覧/PBL を起点に暗黙の仮説を整理する（行き来する反復関係） |
| [prototype-design-md](../prototype-design-md/) | 下流。機能一覧を受けてプロトの DESIGN.md を書く |
| [ooui-architect](../ooui-architect/) | 下流。PBL を受けて common/model/pages を実装する |
| [ooui-graphql-modeling](../ooui-graphql-modeling/) | 下流。PBL を受けて GraphQL SDL を設計する |
| [prhythm-skill-review](../prhythm-skill-review/) | メタ。本スキルの評価ループ（Layer A/B/C）を回す相方 |
