# prototype-design-md

## 概要

製品名、用途、空気感を渡すと、v0 や Cursor で UI を生成する前に AI が読む 1 枚の判断ブリーフ `DESIGN.md` を一緒に作る。hex や padding の値は CSS トークンに任せ、ここでは性格、サーフェス、禁止パターン、コンポーネント選びだけを固定する。

## 利用メリット

- feel、禁止パターン、コンポーネント選びを先に 1 枚に固定できるので、生成 UI のトーンがブレにくい。
- 色の値は CSS、性格は DESIGN.md に分かれるので、トークンと判断基準を混ぜなくてよい。
- hero 乱立や Inter デフォルト、業務画面なのにマーケ風レイアウトなどを、生成前に意図的に排除できる。
- 生成前に意図を要約して確認してから書き起こせるので、着手前にチームで合意できる。

## 利用シーン

- v0 や Cursor で UI 生成を始める直前
- 「モダンでクリーン」だけでは具体性が足りないとき
- 業務ツールなのにランディングページ風 UI が出やすいとき
- デザイントークンはあるが、feel と layout の判断基準がないとき

依頼の例: 「社内感謝ツール feedit の DESIGN.md を一緒に書いて。イエローでハッピーだが誠実、Bonusly 寄り」

## 使い方

**いつ使うか:** 見せる順は決まったが、トーン、禁止パターン、コンポーネント選びが無いときに入る。`proto-storyboard` のあと、v0 / Cursor で UI を生成する前。テーマ探索だけなら `shadcn-explorer`、画面ひな形は `ooui-architect`。

1. ユーザーが製品名、用途、空気感を伝える。スキルが [getdesign.md](https://getdesign.md/) から参考テーマ 5 件（各候補のプレビュー URL と Match / Borrow / Avoid）と、既存 CSS の検出結果、トークン方針 A/B/C を返す。方向がはっきりしていれば飛ばせる。
2. ユーザーが slug と方針を選ぶ。スキルが Intent Summary（feel、サーフェス、禁止のプレビュー）をチャットに出す。足りない点を直して「OK」する。承認はここ 1 回。
3. スキルがプロジェクトルートに `DESIGN.md` を書き、lint を通す。以降の v0 / Cursor はこのファイルを読む。

## 具体例

依頼: 「社内公募アプリの DESIGN.md を一緒に書いて。匿名で近づけるが、人事の管理画面っぽくしない。」

::: info 出力される `DESIGN.md` の抜粋:

**Product Feel**
社内公募。ミッションが向こうから届くカード。匿名の一歩は軽いが、合意のあとは誠実。
**近くないもの:** タレントマネジメントの管理画面、全面コーポレートカラー、ランキング。

:::

## 構成

```
prototype-design-md/
├── README.md
├── SKILL.md
├── references/
│   ├── theme-discovery.md
│   ├── intake.md
│   ├── prototype-brief.md
│   ├── workflow.md
│   ├── surface-types.md
│   ├── anti-slop.md           # 禁止パターン
│   ├── prose-guide.md
│   ├── quality-checklist.md
│   └── google-spec-summary.md
├── scripts/
│   ├── init-design-md.sh
│   ├── lint-design-md.sh
│   └── detect-project-tokens.mjs
└── templates/
    └── DESIGN.stub.md
```

## 前提条件

- Node.js（トークン検出、`npx @google/design.md lint`、テーマ探索用）。
- bash。

## 注意事項

- トークンの hex や YAML token blocks、全コンポーネント詳細 spec、モーション詳細、ガバナンス文書は扱わない。
- 「一覧は常に Table」「Desktop 最優先」は鵜呑みにしない。サーフェスと intake（モバイル critical など）で決める。
- Product Feel は「modern and clean」だけにせず、否定制約（「〜ではない」）を書く。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [proto-storyboard](../proto-storyboard/README.md) | 見せ方（どの画面を、どの順で）。こちらは見た目・トーンの DESIGN.md |
| [ooui-architect](../ooui-architect/README.md) | DESIGN.md のあと、画面ひな形を実装するとき |
| [shadcn-explorer](../shadcn-explorer/README.md) | テーマやコンポーネント候補だけ先に探したいときに使う |
| [uncertainty-map](../uncertainty-map/README.md) | DESIGN.md をプロト範囲の解釈源にして、仮説の検証ステータスを判定するとき |
