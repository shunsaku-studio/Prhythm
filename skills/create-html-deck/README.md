# create-html-deck

## 概要

**HTML スライドデッキ**を、ブラウザでそのまま再生できる形式で作るスキル。`deck-stage` ビューア上に、アウトライン → テーマ → スライド本文 → 組み立て → プレビュー、の順で進める。

- **入力:** チャット上の依頼（新規デッキ、構成の相談、テーマ変更、スライド修正、納品など）
- **出力:** `slides/{deck}/` 以下のコンテンツと、組み立て後の `index.html`（必要なら単体 HTML）
- **スコープ外:** PowerPoint / Keynote / Figma Slides、Slidev（Markdown）スライド、PDF/PPTX 直接エクスポート

## 利用メリット

- **ブラウザだけで発表できる** — 専用アプリなしで矢印キー操作のスライドショーが動く
- **構成を先に固められる** — 枚数と流れを確認してから本文を書き始められるので、後から大幅な組み替えが減る
- **見た目を先に合意できる** — プロジェクトの CSS トークンやプリセットからテーマを選び、スライド作成前に雰囲気を揃えられる
- **アプリと同じトーンで見せられる** — リポジトリのデザイントークンを取り込めるので、デモ資料がプロダクトと浮きにくい
- **その場でプレビューできる** — 組み立て後にブラウザで確認でき、修正→再プレビューのサイクルが短い
- **1 ファイルで渡せる** — スタンドアロン HTML にまとめて共有・オフライン配布がしやすい

## 利用シーン

- **社内デモや勉強会の資料を急ぎで作りたいとき** — ブラウザだけで再生できれば十分
- **話の骨子はあるが、何枚でどう流すか決まっていないとき** — 先にアウトラインを表にして合意したい
- **スライドの色やフォントをプロダクトに合わせたいとき** — 既存 CSS 変数からテーマを当てたい
- **レビュー前に全体像を見せたいとき** — 組み立て後すぐブラウザで流してフィードバックをもらいたい
- **相手にファイル1つで渡したいとき** — Downloads へエクスポートして共有したい
- **発表ノートも一緒に残したいとき** — スライドとセットで話す内容を残したい

依頼の例: 「このリポジトリ向けに技術発表の HTML スライドを作って」「アウトラインだけ先に」「テーマをもう少し青寄りに」「完成版を Downloads に出して」

## 使い方

スラッシュコマンド不要。`slide deck` / `HTML slides` / `presentation` などの自然言語でも起動する（例: 「技術発表の HTML スライドを作って」）。

**新規デッキ（フルフロー）** — アウトラインとテーマは途中で一度ずつ確認:

```
/create-html-deck 新規デッキ slides/demo-talk を作って。テーマはプロジェクトから取り込みたい
```

**アウトラインだけ**:

```
/create-html-deck slides/demo-talk のアウトラインを一緒に作って
```

**テーマ変更**（セクション作成前 / 作成後で手順が異なる）:

```
/create-html-deck slides/demo-talk のテーマを warm-neutral に変えて
```

**スライド修正** — 該当セクションを直して再組み立て・プレビュー:

```
/create-html-deck slides/demo-talk の 3 枚目を修正してプレビューまで
```

**納品（スタンドアロン HTML / Downloads）**:

```
/create-html-deck slides/demo-talk を standalone にバンドルして Downloads に出して
```

**よく使うコマンド** — 一覧は [SKILL.md](SKILL.md) の Common commands を参照。

タスクに応じて `references/workflow.md` / `references/themes.md` / `references/sections.md` / `references/publish.md` / `reference.md` を読む。

## 構成

```
create-html-deck/
├── README.md
├── SKILL.md
├── reference.md           # deck-stage API、slides/{deck}/ レイアウト
├── references/
│   ├── workflow.md        # フェーズ、ゲート、停止メッセージ
│   ├── themes.md          # プロジェクト検出、プリセット、tokens.css
│   ├── sections.md        # セクション markup、レイアウト class
│   └── publish.md         # assemble、preview、bundle、export
├── scripts/
│   ├── init-deck.sh
│   ├── detect-project-theme.mjs
│   ├── apply-theme.sh
│   ├── validate-content.mjs
│   ├── assemble.sh
│   ├── preview.sh
│   ├── bundle-standalone.mjs
│   └── export-download.sh
├── templates/             # viewer、themes、content ひな形
└── examples/minimal-deck/ # 最小セクション例
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
├── index.html             # 生成物 — 手編集しない
├── slide-styles.css
├── deck-stage.js
├── image-slot.js
└── dist/standalone.html   # bundle 時
```

## 前提条件

- **bash** — init / assemble / preview / export
- **bun** — テーマ検出、コンテンツ validate、standalone バンドル
- **npx serve** — `preview.sh` がローカルサーバー（既定 port 3456）を起動
- デッキ出力先 `slides/{deck}/` はアプリのフロントエンドビルド対象外（[reference.md](reference.md) 参照）。`preview.sh` で確認し、プロダクトに載せる場合はリンクや埋め込みで別途配線する
- スキル配置: Prhythm の `skills/` または `~/.cursor/skills/`（`scripts/link-cursor-skills.sh` で symlink 可）

## 注意事項

- **アウトライン → テーマの順で合意してから本文** — 順を飛ばして一括生成しない
- **生成ファイルは手編集しない** — `index.html` / `deck-stage.js` / `image-slot.js` は assemble の出力。編集は `content/` のみ
- **新しいレイアウト class は追加しない** — `slide-styles.css` 既存の class のみ使う
- **`export-download.sh` は macOS 向け** — Finder で Downloads を開く
- **Markdown 系スライドツール（Slidev 等）とは別系統** — Markdown から PPTX/PDF が欲しい場合はそちらを検討

## 関連スキル

| スキル | 関係 |
|--------|------|
| usecase-mapper | 前段 — `docs/usecase-map.md` の整理結果をアウトライン・構成の素材にする |
