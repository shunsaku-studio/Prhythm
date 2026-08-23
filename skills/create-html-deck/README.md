# create-html-deck

## 概要

チャットで発表の依頼を渡すと、ブラウザでそのまま再生できる HTML スライドデッキを `slides/{deck}/` に作る。アウトライン、テーマ、スライド本文、組み立て、プレビューの順で進み、成果物は組み立て後の `index.html`（必要なら単体 HTML）。PowerPoint や Slidev は扱わない。

## 利用メリット

- 専用アプリなしで、矢印キー操作のスライドショーがブラウザだけで動く。
- 枚数と流れを確認してから本文を書き始められるので、後から大幅な組み替えが減る。
- プロジェクトの CSS トークンやプリセットからテーマを選べるので、スライド作成前に雰囲気を揃えられる。デモ資料がプロダクトと浮きにくい。
- 組み立て後にブラウザで確認でき、1 ファイルのスタンドアロン HTML で渡せる。

## 利用シーン

- 社内デモや勉強会の資料を、ブラウザ再生で急ぎ作りたいとき
- 話の骨子はあるが、何枚でどう流すか決まっていないとき
- スライドの色やフォントをプロダクトに合わせたいとき
- 相手にファイル 1 つで渡したいとき

依頼の例: 「このリポジトリ向けに技術発表の HTML スライドを作って」「アウトラインだけ先に」

## 使い方

**いつ使うか:** ブラウザで再生する発表資料が欲しいときに入る。`function-usecase-map` などで話の骨子が揃ったあとでも、単独でも使える。コンサル向けの Markdown と HTML 要約は `prhythm-docs`。

**新規デッキ**

1. スキルが `slides/{deck}/` を切る。
2. スキルが枚数と流れの表を出す。ユーザーがアウトラインを見てからテーマと本文に進む。
3. ユーザーがプロジェクトの CSS トークンかプリセットを当てる。雰囲気の OK を見てから本文に進む。
4. スキルがセクションを数枚ずつ出し、ユーザーが都度確認する。
5. スキルがスピーカーノートと検査のあと組み立て、ユーザーがブラウザでプレビューする。

**途中からの枝**

アウトラインだけ先に、テーマ変更、スライド修正、スタンドアロン納品。組み立てたあとにテーマを変えるときは `content/tokens.css` の `:root` だけ直し、組み立て直す。セクション HTML は触らない。

## 具体例

依頼: 「社内公募アプリの提案向けに HTML スライドを作って。」

::: info 出力される `content/outline.md` の抜粋:

| # | file | type | data-label | message (1 line) |
|---|---|---|---|---|
| 1 | 01-title.html | s-title | Title | 社内公募アプリ 提案 |
| 2 | 02-agenda.html | s-content | Agenda | 応募率が 1.2% で止まる理由 |
| 3 | 03-demo.html | s-content | Demo | 匿名の一歩で越境が始まる |
| ... | ... | ... | ... | ... |

:::

## 構成

```
create-html-deck/
├── README.md
├── SKILL.md
├── reference.md           # deck-stage API と slides/{deck}/ のレイアウト
├── references/
│   ├── workflow.md
│   ├── themes.md
│   ├── sections.md
│   └── publish.md         # 組み立て、プレビュー、バンドル、書き出し
├── scripts/
│   ├── init-deck.sh
│   ├── detect-project-theme.mjs
│   ├── apply-theme.sh
│   ├── validate-content.mjs
│   ├── assemble.sh
│   ├── preview.sh
│   ├── bundle-standalone.mjs
│   └── export-download.sh
├── templates/
│   ├── themes/     # プリセット CSS
│   ├── viewer/     # deck-stage
│   └── content/    # アウトラインとセクションの型
└── examples/minimal-deck/
```

生成されるデッキ（例）:

```
slides/{deck}/
├── content/
│   ├── outline.md
│   ├── meta.json
│   ├── tokens.css
│   ├── speaker-notes.json
│   └── sections/NN-*.html
├── index.html             # 組み立ての出力。手編集しない
├── slide-styles.css
├── deck-stage.js
├── image-slot.js
└── dist/standalone.html   # バンドル時
```

## 前提条件

- bash（init、assemble、preview、export）。
- bun（テーマ検出、コンテンツ検査、スタンドアロンバンドル）。
- python3 の http.server（`preview.sh` が既定 port 3456 でローカルサーバーを起動）。
- デッキ出力先 `slides/{deck}/` はアプリのフロントエンドビルド対象外（[reference.md](reference.md) 参照）。プロダクトに載せる場合はリンクや埋め込みで別途配線する。

## 注意事項

- `index.html`、`deck-stage.js`、`image-slot.js` は組み立ての出力なので手編集しない。編集は `content/` のみ。
- `slide-styles.css` にある既存のレイアウト class だけを使う。新しい class は追加しない。
- `export-download.sh` は macOS 向けで、Finder で Downloads を開く。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [function-usecase-map](../function-usecase-map/README.md) | `docs/usecase-map.md` の整理結果をアウトラインや構成の素材にするとき |
| [prhythm-docs](../prhythm-docs/README.md) | コンサル向けの Markdown と HTML 要約はあちら。こちらは発表用 HTML デッキ |
