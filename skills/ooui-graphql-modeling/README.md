# ooui-graphql-modeling

## 概要

プロト段階の **GraphQL SDL 設計** 用スキル。チャットで伝えたアプリ概要・ユーザータスク・参考プロダクトから、ビジネスドメイン中心の `src/model/schema.graphql` を段階的に設計する。

- **入力:** チャット上の要求（別ファイルへの転記は不要）
- **出力:** `src/model/schema.graphql`（GraphQL SDL が唯一の構造の正）
- **スコープ外:** アプリコードの scaffold、画面実装、DB / resolver の詳細

## 利用メリット

- **アプリの「もの」と「できること」が先に言葉になる** — 記事・いいね・通知など、オブジェクトと操作が揃うと、これから何を作るかチームで共有しやすい
- **画面のたたき台になる** — type がオブジェクト、リストが一覧、mutation がアクション。スキーマが固まると、どの画面に何が要るかが自然に読める
- **OOUI 実装にそのままつながる** — 設計した type から、オブジェクトごとの一覧・詳細・アクションの画面ひな形へ進め、UI をバラバラに作り始めなくていい
- **実装前に形を固められる** — DB テーブルや画面項目の写像ではなく、ユーザーがやりたいこと起点で設計するので、後からドメインがブレにくい
- **プロトの共通の正になる** — `schema.graphql` 1 本を起点に会話と実装が進む

## 利用シーン

- **アイデアはあるが、何が「もの」で何が「操作」かまだ曖昧なとき** — 記事・いいね・通知などを言葉にして、チームで共有したい
- **画面を描き始める前に、全体像を揃えたいとき** — どの画面に何が要るかのたたき台が欲しい
- **OOUI で UI を組み立てる前に、画面の元になるオブジェクトモデルを固めたいとき** — バラバラに画面実装を始めたくない
- **実装に入る前に、ドメインの形を決めたいとき** — DB や画面の写像ではなく、ユーザーがやりたいこと起点で設計したい
- **会話や実装のたびに要件がブレてきたとき** — `schema.graphql` を共通の正にして、プロトを進めたい

依頼の例: 「ブログアプリのスキーマを一緒に設計して」「記事といいねの関係をスキーマに追加して」

## 使い方

**新規スキーマ** — Phase 0 → 1 → 2 → 3。各ゲートで OK をもらってから次へ:

```
/ooui-graphql-modeling ブログアプリのスキーマを設計して。ユーザーは記事を書いて公開したい、いいねしたい
```

**型・関係の追加・修正** — Phase 1 のみ:

```
/ooui-graphql-modeling schema.graphql に Comment 型と Article との関係を追加して
```

**mutation の追加** — Phase 2 のみ（構造が固まっている前提）:

```
/ooui-graphql-modeling articleLike と articlePublish の mutation を追加して
```

**既存 SDL の編集** — 直接編集後に validate:

```bash
bash skills/ooui-graphql-modeling/scripts/validate-schema.sh src/model/schema.graphql
```

## 構成

```
ooui-graphql-modeling/
├── README.md              # このファイル（人間向け）
├── SKILL.md               # エージェント向け手順
├── references/
│   ├── workflow.md        # フェーズ手順・ゲートメッセージ
│   ├── principles.md      # 設計原則・外部リンク
│   ├── modeling-patterns.md  # Bad→Good 例・自己レビュー
│   ├── extraction.md      # 名詞/動詞抽出・ドメインイベント
│   ├── sdl-conventions.md # SDL 記述規約
│   └── schema-screen-mapping.md  # スキーマ→画面の読み方・example 参照
├── scripts/
│   ├── init-schema.sh     # Phase 0: stub 生成
│   ├── validate-schema.sh # SDL 検証（Node.js）
│   └── validate-schema.mjs
└── templates/
    ├── schema.stub.graphql
    └── example.graphql
```

## 前提条件

- 対象プロジェクトに `src/model/` を書き込めること
- SDL 検証に **Node.js** と **npm**（初回のみ `graphql` を自動インストール）
- Phase 0 の init に bash
- スキル配置: Prhythm の `skills/` または `~/.cursor/skills/`

## 注意事項

- **1 ターン 1 フェーズ** — ユーザーが continue / OK するまで次フェーズに進まない
- **要求は会話で完結** — エージェントが Phase 1 で要約をチャットに返す。別ファイルは作らない
- **Mermaid ER 図は作らない** — SDL を [Basedash GraphQL schema visualizer](https://www.basedash.com/tools/graphql-schema-visualizer) に貼って可視化
- constraint・validation・fragment・DB 詳細はプロト SDL に含めない
- Phase 3 完了後は、各 type の OOUI 画面ひな形（一覧・詳細・アクション）を起こす別タスクへ進む

## 関連スキル

| スキル | 関係 |
|--------|------|
| ooui-architect | 後続 — Phase 3 完了後、設計した type から OOUI の画面ひな形（一覧・詳細・アクション）へ進む |
