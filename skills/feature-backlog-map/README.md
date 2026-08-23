# feature-backlog-map

## 概要

ビジョン、プロダクトの説明、または `docs/usecase-map.md` を渡すと、次の 3 ファイルを一度に出す。機能一覧（システムが何をするか）、プロダクトバックログ（ユーザーが何をできるか。並び順が優先度の提案）、受け入れ条件一覧（完了したと言える条件。Given/When/Then）。何も無ければスキルが 1 ターンだけ聞く。読み手は必要なファイルだけ使う。

## 利用メリット

- 提案、開発、検証の担当が、それぞれ必要な観点だけ読める。
- 優先度は人が PBL の並びを入れ替えて決める。ラベル付けを強制されない。
- 完了条件が別ファイルなので、機能の説明を短く保てる。
- 再実行は差分更新なので、ゼロから作り直さなくてよい。

## 利用シーン

- 何を作るかを、概要・入出力・ルールまで言語化したいとき
- 提案資料に入出力が一目で分かる機能一覧を入れたいとき
- 「〇〇は〇〇できる」のストーリーを優先度順に持ちたいとき
- 受け入れ条件を機能・ストーリーに紐付けて別に管理したいとき

依頼の例: 「このプロダクトの機能一覧を作って」「プロダクトバックログを優先度順で出して」

## 使い方

**いつ使うか:** 「何を作るか」を機能、ストーリー、完了条件に分けたいときに入る。`function-usecase-map` や `product-vision-and-concept` のあとが多い。仮説の優先は `uncertainty-map`、画面やスキーマは実装スキルへ。

1. ユーザーが usecase-map、ビジョン、説明のどれを見るか決める。何も無ければスキルが 1 ターンだけ聞く。
2. スキルがシステムが何をするかを機能に切り出す。ここでは優先度を付けない。
3. スキルが機能一覧、PBL（並び順は優先度の提案）、受け入れ条件を一度に出す。ユーザーが PBL の上から順を入れ替える。再実行は差分更新（ゼロから、と言ったときだけ全再生成）。

## 具体例

依頼: 「このプロダクトの機能一覧を作って。社内公募アプリで、スキルに合うミッションが届くようにしたい。」

::: info 出力される `docs/feature-list.md` の抜粋:

| F ID | 機能名 | 概要(1行) |
|---|---|---|
| F-01 | スキルタグでミッションが届く | 探しに行かなくても募集が手元に来る |
| F-02 | 匿名で興味を伝える | 本名を出す前に、近づける |
| F-03 | 合意のあと上司に届く | 手挙げが評価に残るのは合意後だけ |
| ... | ... | ... |

:::

## 構成

```
feature-backlog-map/
├── SKILL.md
├── README.md
├── templates/
│   └── docs/
│       ├── index.md                  # 打ち合わせ用 Markdown の型（prhythm-docs が埋める）
│       └── sections.html             # スライド本体の型
└── references/
    ├── intake.md                     # 入力確認と差分更新
    ├── feature-decomposition.md      # Goal から機能への分解
    ├── prioritization.md             # 優先度は PBL の並び順
    ├── feature-list-template.md
    ├── backlog-template.md
    ├── acceptance-template.md
    ├── user-story-and-ac.md          # ストーリーと受け入れ条件の書き方
    ├── estimation-guide.md           # 見積・分割（任意）
    ├── quality-checklist.md
    ├── eval-scenarios.md
    └── eval-rubric.md
```

## 前提条件

- ビジョン、説明、`docs/usecase-map.md` のいずれか。何も無ければ 1 ターンの確認で進む。

## 注意事項

- 機能一覧に優先度を持たせない。優先度は PBL の並び順で表す。
- 文書だけでは確定できない API や画面パスは `—` のまま残す。
- 既存の 3 ファイルがある場合は上書き前に差分を確認し、ID を保持する。出力は Markdown のみで、JIRA や Linear へは直接連携しない。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [function-usecase-map](../function-usecase-map/README.md) | ユースケース図があれば入力ソースに使う |
| [product-vision-and-concept](../product-vision-and-concept/README.md) | PBL の並び順の物差しになる一行ステートメントが欲しいときに使う |
| [market-landscape](../market-landscape/README.md) | 機能候補の参考ソースが欲しいときに使う |
| [uncertainty-map](../uncertainty-map/README.md) | 機能一覧や PBL を起点に暗黙の仮説を整理するとき（行き来する） |
| [prototype-design-md](../prototype-design-md/README.md) | 機能一覧を受けてプロトの DESIGN.md を書くとき |
| [ooui-architect](../ooui-architect/README.md) | PBL を受けて画面ひな形を実装するとき |
| [ooui-graphql-modeling](../ooui-graphql-modeling/README.md) | PBL を受けて GraphQL SDL を設計するとき |
| [prhythm-docs](../prhythm-docs/README.md) | 出力を打ち合わせ用の Markdown と HTML にまとめたいときに使う |
