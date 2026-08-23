# defining-personas-and-segments

## 概要

インタビューメモ、ディスカバリーノート、プロダクトブリーフなどを渡すと、ターゲットユーザーの候補と比較表、チームが決める論点を返す。チームが Primary（主要ターゲット）を選んだあと、その人物像、JTBD、検証計画まで深掘りする。スキルは Primary を確定させず、人間が決める材料を揃える。

## 利用メリット

- 候補と比較表と論点が揃うので、会議で「なぜその人か」を決められる。
- 事実、仮定、未知、リスクが区別されるので、どこまで分かっているかが一目で分かる。
- Primary と中核軸で正反対の対極ペルソナがあるので、最適化すると誰を失うかが言葉になる。
- 反証条件付きの検証計画が残るので、「やる前から結論ありき」の確認作業になりにくい。

## 利用シーン

- インタビュー記録はあるが、誰向けに作るか整理できていないとき
- 「全員に届けたい」になっていて、取れない人を可視化したいとき
- プロトや MVP の前に、誰に当てるかを言語化したいとき
- Primary は決まっていて、人物像と検証計画を深掘りしたいとき

依頼の例: 「インタビューメモを渡すのでペルソナを整理して」「Primary を Segment 1 にしたから深掘りして」

## 使い方

**いつ使うか:** インタビュー記録はあるが「誰向けに作るか」が決まっていないときに入る。`market-landscape` で空白や軸が見えたあとに使うことが多い。主役が決まったら `create-journey-map` へ。指定がなければ俯瞰から始まる。

**俯瞰**

1. ユーザーがインタビューメモやブリーフを渡す。無ければスキルが最小限を聞く。
2. スキルが関係者、軸、セグメント比較、ペルソナ比較（対極ペルソナを含む）、人間が決める論点を出す。
3. チームがセグメントまたはペルソナを Primary として明示する。

**深掘り**

1. ユーザーが選んだ Primary を渡す。
2. スキルが選んだ人物の JTBD、利用シーン、検証計画、スコープ外にした理由を残す。対極ペルソナも同じ深さまで書く。顔写真用のプロンプトは任意。

## 具体例

依頼: 「社内公募アプリのインタビューメモを渡すのでペルソナを整理して。」

::: info 出力される比較表の抜粋:

| Persona | ラベル | 状況（一行） | 主要バリア |
|---|---|---|---|
| 佐藤さん：興味はあるが手を挙げられない営業企画 | Primary candidate (hypothesis) | 金曜夕方、イントラの募集を見て閉じる | 上司の目と、手挙げが評価に残ること |
| 公募を回す側の人事企画 · 鈴木さん | Secondary candidate | 応募率 1.2% のまま改善策を探している | 現場の声が届かず、募集が空振りする |
| ... | ... | ... | ... |

:::

## 構成

```
defining-personas-and-segments/
├── README.md
├── SKILL.md
├── templates/
│   └── docs/
│       ├── index.md       # 打ち合わせ用 Markdown の型（prhythm-docs が埋める）
│       └── sections.html  # スライド本体の型
├── references/
│   ├── segmentation-axes.md      # よく使う軸
│   ├── persona-template.md       # 比較表と深掘りの型
│   ├── evidence-levels.md        # Fact / Assumption / Unknown / Risk
│   ├── human-decision-gates.md   # 人間に返す判断ポイント
│   ├── prototype-connection.md   # 検証計画の書き方
│   └── anti-patterns.md          # よくある失敗
├── examples/
│   ├── input-example*.md
│   ├── output-example-stage1.md  # 俯瞰の出力例
│   └── output-example-stage2.md  # 深掘りの出力例
└── scripts/
    └── validate_output.sh
```

## 前提条件

- インタビューメモ、プロダクトブリーフ、または既存ユーザーリストのいずれか。

## 注意事項

- 対極ペルソナは Primary の劣化版にしない。中核軸で正反対の人物を最低 1 つ置く。
- 主張には `[Fact]` / `[Assumption]` / `[Unknown]` / `[Risk]` を付ける。1 人の発言だけでは Fact にせず、矛盾する声は平均で丸めずに両極か論点として返す。
- 検証計画には反証条件を書く。「うまくいったら成功」だけでは確認作業になる。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [market-landscape](../market-landscape/README.md) | 市場地図の軸や空白から、誰向けかの候補を拾うときに使う |
| [create-journey-map](../create-journey-map/README.md) | Primary を主役に As-Is / To-Be JM へ進むとき |
| [function-usecase-map](../function-usecase-map/README.md) | 確定した Primary をアクターに、ユースケース図へ展開するとき |
| [product-vision-and-concept](../product-vision-and-concept/README.md) | Who / Why をコンセプトに落としたいときに使う |
| [prhythm-docs](../prhythm-docs/README.md) | 出力を打ち合わせ用の Markdown と HTML にまとめたいときに使う |
