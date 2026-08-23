# ooui-architect

## 概要

フロントエンドの置き場所とコンポーネント構成を、OOUI（Object-Oriented UI。画面を「もの」単位で組み立てるやり方）に揃える。チャットで配置の相談、新オブジェクトの追加、コンポーネントレビューなどを依頼すると、`common` / `model` とフレームワークが定めるルーティング dir に、4-file コンポーネントと scaffold を置く。GraphQL SDL の設計そのものは扱わない。

## 利用メリット

- 記事やユーザーなど「もの」ごとに画面が揃うので、新しい画面を足すとき置き場所に迷わない。
- 一覧・詳細のひな形から始められるので、実装開始までの空白が短い。
- URL 入口は組み立て専用に保てるので、ページにロジックが溜まりにくい。
- レイヤーに沿った import 順で、逆依存や越境に気づきやすい。

## 利用シーン

- 新しいオブジェクト（記事、商品など）の画面を追加するとき
- コンポーネントをどのフォルダに置くか毎回迷うとき
- ページコンポーネントにロジックが溜まってきたとき
- props をフィールド単位にばらけさせてきたとき

依頼の例: 「article エンティティを scaffold して」「このコンポーネントの配置を OOUI でレビューして」

## 使い方

**いつ使うか:** SDL は固まったが画面ひな形がないとき、または配置・props が崩れているときに入る。`ooui-graphql-modeling` のあとに新規エンティティを足すことが多い。既存コードの相談、レビュー、TDD だけでも使える。

**新エンティティを足す**

1. スキルがプロジェクトのルーティング dir を検出する。OOUI 専用 dir は作らない。
2. スキルが `model/{entity}/` とページの scaffold を出す。ユーザーが増えたファイルを見てから、nav / Provider を配線する。
3. ユーザーが一覧・詳細の実装に入る。

**配置・レビュー・TDD**

置き場所の相談、4-file とオブジェクト props の点検、common への抽出とテスト、のどれか 1 本。生成物の確認を挟んでから次の配線や実装に進む。

## 具体例

依頼: 「社内公募アプリの mission エンティティを scaffold して。」

::: info 出力される配置の抜粋:

```
src/
├── common/
├── model/mission/   # 型・画面ロジック（単数形）
└── pages/missions/  # URL 入口。model コンポーネントを組み立てるだけ
```

:::

script がページを置くのは Waku の `src/pages/` と Next の `src/app/`。それ以外のルーティング dir は、検出した置き場所にテンプレを手で置く。[docs/scaffold.md](docs/scaffold.md) を参照。

## 構成

```
ooui-architect/
├── README.md
├── SKILL.md
├── reference.md           # MODELS、ルーティング dir、レイアウト例
├── docs/
│   ├── architecture.md
│   ├── components.md
│   ├── scaffold.md
│   ├── testing.md
│   └── biome-imports.md
├── scripts/
│   ├── init-entity.sh
│   └── apply-biome-imports.sh
└── templates/
    ├── app/      # Next のページひな形
    ├── pages/    # Waku のページひな形
    └── model/    # 4-file コンポーネント
```

## 前提条件

- 対象プロジェクトに `src/` 以下へファイルを書き込めること（`common/`、`model/` がなくても scaffold で作成する）。
- scaffold と Biome 設定に bash。

## 注意事項

- scaffold のあと、増えたファイルを見て OK してから nav や Provider の配線に進む。一気に次の実装へ飛ばない。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [ooui-graphql-modeling](../ooui-graphql-modeling/README.md) | オブジェクトモデル（SDL）を設計してから画面ひな形へ |
| [prototype-design-md](../prototype-design-md/README.md) | 見た目・トーンの DESIGN.md を先に置きたいときに使う |
| [shadcn-explorer](../shadcn-explorer/README.md) | UI 候補を探してから画面に載せたいときに使う |
