# ooui-architect

## 概要

フロントエンド向け **OOUI（Object-Oriented UI）アーキテクチャ** スキル。`common` / `model` に加え、**フレームワークが定めるルーティング dir** にページコンポーネント（薄い組み立て）を置く。4-file コンポーネント、新エンティティ scaffold、テスト方針、Biome import 順を一貫して適用する。

<details>
<summary>例: 記事投稿アプリのディレクトリ構成</summary>

Waku 想定（ルーティング dir は `src/pages/`。Next なら `src/app/`、Remix なら `app/routes/`）。

```
src/
├── common/
│   ├── ui/                    # TextInput, Dialog など
│   ├── lib/
│   │   ├── slug.ts
│   │   └── slug.test.ts
│   └── hooks/
├── model/
│   ├── common/
│   │   └── const/
│   │       └── MODELS.ts      # Article, User のラベル
│   ├── article/               # 単数形
│   │   ├── type.ts            # Article 型・状態
│   │   ├── path.ts            # /articles/:id など
│   │   └── components/
│   │       ├── list/          # 一覧（4-file）
│   │       │   ├── index.tsx
│   │       │   ├── server.tsx
│   │       │   ├── view.tsx
│   │       │   └── loading.tsx
│   │       ├── detail/        # 詳細（4-file）
│   │       └── form/          # 投稿・編集（4-file）
│   └── user/
│       ├── type.ts
│       ├── path.ts
│       └── components/
│           └── card/          # <UserAvatar user={user} />
└── pages/                     # フレームワークのルーティング dir
    ├── articles/              # 複数形 URL
    │   ├── index.tsx          # 一覧ページ — <ArticleList /> を組み立て
    │   ├── [id].tsx           # 詳細ページ
    │   └── new.tsx            # 新規投稿ページ
    └── users/
        └── [id].tsx
```

- **model/** — オブジェクトごとの型・画面ロジック（Article, User）
- **pages/** — URL 入口。fetch やドメイン処理は置かず model コンポーネントを組み立てるだけ

</details>

- **入力:** チャット上の依頼（配置の相談、新オブジェクト追加、コンポーネントレビューなど）
- **出力:** レイヤーに沿ったディレクトリ配置、コンポーネント構成、scaffold 生成物
- **スコープ外:** GraphQL SDL 設計、DB / API 詳細、本番インフラ、特定フレームワークの選定

## 利用メリット

- **オブジェクト中心で UI が揃う** — 記事・ユーザーなど「もの」ごとに画面とコンポーネントが整理され、バラバラな UI 設計を避けられる
- **レイヤーの役割がはっきりする** — portable な共通部品とドメイン固有の部品、ページコンポーネントの組み立てが分かれ、どこに何を置くか迷いにくい
- **新しい「もの」の立ち上げが速い** — 一覧・詳細のひな形が揃い、実装開始までの空白が短くなる
- **ページコンポーネントにロジックが溜まりにくい** — URL 入口は組み立て専用に保て、ビジネスロジックの置き場所がブレにくい
- **テストしやすい構造になる** — ロジックを共通化する方針で、安定した単体テストの土台が作れる
- **依存の向きが読みやすい** — レイヤーに沿った import 順で、逆依存や越境 import に気づきやすい

## 利用シーン

- **新しいオブジェクト（記事・商品など）の画面を追加するとき** — 一覧・詳細のひな形から始めたい
- **コンポーネントをどのフォルダに置くか毎回迷うとき** — common / model / ルーティング dir の判断を揃えたい
- **ページコンポーネントにロジックが溜まってきたとき** — 組み立てだけの薄いシェルに戻したい
- **props をフィールド単位にばらけさせてきたとき** — `<ArticleCard article={article} />` のようにオブジェクト単位に揃えたい
- **プロジェクトのルーティング規約を変えずに OOUI を適用したいとき** — フレームワークの dir にそのまま載せたい
- **ooui-graphql-modeling で固めた type から UI を組み立て始めるとき** — スキーマ上のオブジェクトと画面の対応を崩したくない

依頼の例: 「article エンティティを scaffold して」「このコンポーネントの配置を OOUI でレビューして」「MODELS.ts と import 順を整えて」

## 使い方

**新エンティティ追加** — scaffold 後、生成物を確認してから nav / Provider を配線:

```
/ooui-architect article エンティティを追加して。一覧と詳細の scaffold から
```

**配置・依存の相談**:

```
/ooui-architect この hooks は common と model のどちらに置くべき？
```

**コンポーネントレビュー** — 4-file 構成・オブジェクト props・命名:

```
/ooui-architect ArticleList の 4-file 構成と props を OOUI ルールでレビューして
```

**テスト / TDD** — common への抽出とテストピラミッド:

```
/ooui-architect この変換ロジックを common に移して TDD で進めたい
```

**Biome import 順**:

```bash
bash skills/ooui-architect/scripts/apply-biome-imports.sh
```

**新エンティティ scaffold**（例: model `article`, route `articles`）:

```bash
bash skills/ooui-architect/scripts/init-entity.sh article articles Article
```

`init-entity.sh` が使えないプロジェクトでも、エージェントが [docs/scaffold.md](docs/scaffold.md) に従い `model/` とページコンポーネントを構成する。

タスクに応じて `docs/architecture.md` / `docs/components.md` / `docs/scaffold.md` / `docs/testing.md` / `docs/biome-imports.md` / `reference.md` を参照する。

## 構成

```
ooui-architect/
├── README.md              # このファイル（人間向け）
├── SKILL.md               # エージェント向けエントリ
├── reference.md           # MODELS、ルーティング dir、レイアウト例
├── docs/
│   ├── architecture.md    # レイヤー、依存、MODELS、配置チェックリスト
│   ├── components.md      # 4-file、OOUI props、命名
│   ├── scaffold.md        # init-entity、Phase 手順
│   ├── testing.md         # テストピラミッド、common への抽出
│   └── biome-imports.md   # import グループ、biome.json
├── scripts/
│   ├── init-entity.sh     # 新エンティティ scaffold
│   └── apply-biome-imports.sh
└── templates/             # model / pages / app ひな形
```

## 前提条件

- 対象プロジェクトに `src/` 以下へファイルを書き込めること（`common/`、`model/` がなくても scaffold で作成する）
- scaffold / Biome 設定に **bash**
- スキル配置: Prhythm の `skills/` または `~/.cursor/skills/`（`scripts/link-cursor-skills.sh` で symlink 可）

## 注意事項

- **scaffold 後は一度確認してから次へ** — 増えたファイルを見て OK してから、nav や Provider の配線に進む
- **GraphQL スキーマ設計は含まない** — ドメインの設計は [ooui-graphql-modeling](../ooui-graphql-modeling/)、こちらは画面・ディレクトリ構成

## 関連スキル

| スキル | 関係 |
|--------|------|
| ooui-graphql-modeling | 前提 — オブジェクトモデル（SDL）を設計してから OOUI で画面ひな形へ進む |
