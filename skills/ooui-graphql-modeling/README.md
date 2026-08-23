# ooui-graphql-modeling

## 概要

チャットで伝えたアプリ概要、ユーザータスク、参考プロダクトから、ビジネスドメイン中心の GraphQL SDL を段階的に設計し、`src/model/schema.graphql` に残す。このファイルが構造の正。画面実装や DB / resolver の詳細は扱わない。

## 利用メリット

- 記事・いいね・通知など、「もの」と「できること」が先に言葉になるので、これから何を作るかチームで共有しやすい。
- type がオブジェクト、リストが一覧、mutation がアクションとして読めるので、画面のたたき台になる。
- DB テーブルや画面項目の写像ではなく、ユーザーがやりたいこと起点で設計するので、実装に入ってからドメインがブレにくい。

## 利用シーン

- アイデアはあるが、何が「もの」で何が「操作」かまだ曖昧なとき
- 画面を描き始める前に、全体像を揃えたいとき
- 会話や実装のたびに要件がブレてきたとき

依頼の例: 「ブログアプリのスキーマを一緒に設計して」「記事といいねの関係をスキーマに追加して」

## 使い方

**いつ使うか:** 画面を描く前に、何が「もの」で何が「操作」か曖昧なときに入る。`product-vision-and-concept` やペルソナのあとが多い。画面ひな形は後続の `ooui-architect`。

1. 既存の `schema.graphql` が無ければ、スキルが stub から始める。あれば編集する。
2. スキルが観察から type と関係を出す。ユーザーが構造を見てから mutations に進む。
3. スキルが mutation を載せ、SDL を検証して `src/model/schema.graphql` を正にする。

途中で型だけ足すときは構造の確認だけ、mutation だけ足すときは操作の確認だけを繰り返す。

## 具体例

依頼: 「社内公募アプリのスキーマを一緒に設計して。」

::: info 出力される `src/model/schema.graphql` の抜粋:

```graphql
type Mission {
  id: ID!
  title: String!
  skillTags: [String!]!
  owner: Employee
}

type Mutation {
  missionApplyAnonymously(id: ID!): Mission!
}
```

:::

## 構成

```
ooui-graphql-modeling/
├── README.md
├── SKILL.md
├── references/
│   ├── workflow.md
│   ├── principles.md
│   ├── modeling-patterns.md
│   ├── extraction.md
│   ├── sdl-conventions.md
│   └── schema-screen-mapping.md  # スキーマから画面の読み方
├── scripts/
│   ├── init-schema.sh
│   ├── validate-schema.sh
│   └── validate-schema.mjs
└── templates/
    ├── docs/
    │   ├── index.md       # 打ち合わせ用 Markdown の型（prhythm-docs が埋める）
    │   └── sections.html  # スライド本体の型
    ├── schema.stub.graphql
    └── example.graphql
```

## 前提条件

- 対象プロジェクトに `src/model/` を書き込めること。
- SDL 検証に Node.js と npm（初回のみ `graphql` を自動インストール）。stub 生成に bash。

## 注意事項

- 要件の整理は会話に残す。打ち合わせ用の要約が欲しくなったら `prhythm-docs` で `docs/prhythm/ooui-graphql-modeling/` に書く。
- constraint、validation、fragment、DB 詳細はプロト SDL に含めない。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [product-vision-and-concept](../product-vision-and-concept/README.md) | Why が固まったあと、ドメインの「もの」と「操作」へ進む |
| [defining-personas-and-segments](../defining-personas-and-segments/README.md) | 誰のタスクかをスキーマの動詞に使う |
| [ooui-architect](../ooui-architect/README.md) | type が固まったあと、一覧・詳細・アクションの画面ひな形へ |
| [prhythm-docs](../prhythm-docs/README.md) | 出力を打ち合わせ用の Markdown と HTML にまとめたいときに使う |
