# proto-storyboard

## 概要

選定済みのコアシーンと To-Be ジャーニー、一行コンセプトを渡すと、提案当日およそ 5 分のデモプレイ絵コンテに落とす。基本は導入 / 山場 / 着地の 3 カットで、それぞれに画面、操作、台本を付け、`docs/proto-storyboard.md` に残す。顧客が社内で同じデモを再現するときの台本にもなる。見た目のトーンは DESIGN.md へ回す。

## 利用メリット

- デモで見せる範囲が 3 カットに絞れるので、プロトの力の入れどころが揃う。
- 「こう見せたい」の台本が残るので、顧客が社内で同じデモを再現できる。
- ジャーニーとコンセプトが一本の話になるので、提案の筋が通る。

## 利用シーン

- プロトは作るが、提案当日に何を触るか決まっていないとき
- 顧客が持ち帰って同じデモを回せそうにないとき
- ジャーニーとコンセプトはあるが、画面に落ちていないとき

依頼の例: 「To-Be とコアシーンから、提案当日5分の絵コンテを作って」

## 使い方

**いつ使うか:** プロトは作るが、提案当日に何を触るか決まっていないときに入る。`create-journey-map` の To-Be でコアシーンを 1 つ選んだあと、`product-vision-and-concept` の一行コンセプトと揃えて使う。見た目のトーンは `prototype-design-md` へ。

1. ユーザーが To-Be ジャーニー、選定済みコアシーン、一行コンセプト、デモの主人公を渡す。コアシーンが未選定なら To-Be へ戻す。
2. スキルが導入 / 山場 / 着地のカット構成を出す（基本 3、最大 4）。ユーザーが構成を見てから、画面と台本に進む。
3. スキルが各カットに見せる画面、触る操作、話す一文を付け、`docs/proto-storyboard.md` にまとめる。

## 具体例

依頼: 「社内公募アプリの To-Be とコアシーンから、提案当日5分の絵コンテを作って。」

::: info 出力される `docs/proto-storyboard.md` の抜粋:

**CUT 1 出会う  0:00–1:30  導入**

**画面**
- Chrome: 社内公募 / badge `3`
- `NEW MISSION` 販促データの可視化を手伝ってほしい
- CTA: 見てみる

**操作**
- tap

**台本**
スキルタグに合うミッションが向こうから届く。探しに行かなくていい。

:::

カットの書き方の見本は [references/example-uchinaka.md](references/example-uchinaka.md)（ウチナカ公募）。

## 構成

```
proto-storyboard/
├── README.md
├── SKILL.md
├── references/
│   ├── cut-grammar.md        # 画面 / 操作 / 台本の書き方
│   └── example-uchinaka.md   # 3 カットの見本
└── templates/
    └── docs/
        ├── index.md
        └── sections.html
```

## 前提条件

- To-Be ジャーニーと、チームが選んだコアシーン（候補一覧のままでは進めない）。
- 一行コンセプトと、デモの主人公ペルソナ。

## 注意事項

- To-Be の全フェーズを再掲せず、デモに出すカットだけを書く。基本 3 カット、最大 4、5 分以内。
- 機能カタログを絵コンテにしない。各台本は主張の一文にする。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [create-journey-map](../create-journey-map/README.md) | To-Be のコアシーンを選んだ次に入る |
| [product-vision-and-concept](../product-vision-and-concept/README.md) | 一行コンセプトをカットの主張に使う |
| [ooui-graphql-modeling](../ooui-graphql-modeling/README.md) | 画面に載せるオブジェクト名が欲しいときに使う |
| [prototype-design-md](../prototype-design-md/README.md) | 見せ方の次に、見た目・トーンの DESIGN.md へ |
| [delivery-team-plan](../delivery-team-plan/README.md) | 提案パックの体制と RACI を書きたいときに使う |
| [delivery-phase-plan](../delivery-phase-plan/README.md) | 提案パックの矢羽と Go/No-Go を書きたいときに使う |
| [prhythm-docs](../prhythm-docs/README.md) | 出力を打ち合わせ用の Markdown と HTML にまとめたいときに使う |
