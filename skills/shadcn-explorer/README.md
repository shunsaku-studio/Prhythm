# shadcn-explorer

## 概要

**shadcn/ui エコシステム**をリアルタイムに横断検索するスキル。200 以上のコミュニティ registry と 60 以上のテーマから、コンポーネント・ブロック・UI ライブラリ・テーマ候補を探す。

- **入力:** チャット上の依頼（探したい UI の種類、用途、雰囲気など）
- **出力:** registry / テーマの候補一覧（名前・説明・homepage など）と、テーマの CSS 変数
- **スコープ外:** shadcn コンポーネントのプロジェクトへのインストール手順、カスタム registry の公開、Figma / デザインツール連携

## 利用メリット

- **公式以外の UI も候補にできる** — 200+ のコミュニティ registry から、用途に合うコンポーネントや block を絞り込める
- **ブロック単位で探せる** — 認証画面やダッシュボードなど、画面まとまりの候補を比較しやすい
- **テーマの CSS をすぐ試せる** — 60+ テーマの CSS 変数を取り出して、プロジェクトの見た目に当てはめやすい
- **最新の一覧で判断できる** — 都度 fetch するので、古い記事や固定リストに頼らず選べる
- **採用前にソースを確認しやすい** — 各 registry の homepage 付きで提示され、デモや README をたどりやすい

## 利用シーン

- **標準コンポーネントにない niche な UI が欲しいとき** — コミュニティ registry から用途に合うものを洗い出したい
- **画面まとまり（block）を探しているとき** — 認証・設定・ダッシュボードなど、ブロック候補を比較したい
- **プロジェクトのトーンに合う shadcn テーマを選びたいとき** — CSS 変数をコピーして試したい
- **どの third-party registry を使うか迷っているとき** — 説明付き一覧で候補を並べて選びたい
- **用途や画面がまだ固まっていないとき** — ざっくりした依頼から registry / テーマ両方を横断して候補を出したい

依頼の例: 「カレンダー UI の shadcn コンポーネント探して」「ダーク系の shadcn テーマ見つけて」「認証画面の block ある registry ない？」

## 使い方

スラッシュコマンド不要。`shadcn` / `shadcn/ui` / `registry` / `theme` / `component search` / `block search` などの自然言語でも起動する。

**コンポーネント・block・registry 検索:**

```
shadcn でデータテーブル向けのコンポーネント探して
```

```
find me a UI for a pricing page — shadcn registry から候補出して
```

**テーマ検索:**

```
shadcn のダーク系テーマ、CSS 変数付きで候補見せて
```

```
このプロジェクトに合いそうな shadcn theme を 3 つ提案して
```

## 構成

```
shadcn-explorer/
├── README.md
└── SKILL.md
```

## 前提条件

- **ネットワークアクセス** — `ui.shadcn.com` / `shadcn.io` へ fetch できること
- **WebFetch 等の URL 取得ツール** — registry 一覧・テーマページの取得に使用
- **保存場所:** Prhythm `skills/` または `~/.cursor/skills/`（[link-cursor-skills.sh](../../scripts/link-cursor-skills.sh) でリンク）

## 注意事項

- 個別テーマ JSON（`shadcn.io/r/{slug}.json`）は Pro 認証が必要 — CSS 変数は `shadcn.io/theme/{slug}` から取得する
- registry の個別 item URL は `{name}` プレースホルダー付き — item 名を埋めてから fetch する
- 検索結果は外部コミュニティ由来 — 採用前にライセンス・メンテ状況・依存関係を確認すること
- 本スキルは**候補探索**が主目的 — `npx shadcn@latest add` などのインストール作業は別途行う

## 関連スキル

| スキル | 関係 |
|--------|------|
| [create-html-deck](../create-html-deck/) | HTML スライド用テーマ選定（deck-stage 向け。shadcn テーマとは別系統） |
| [ooui-architect](../ooui-architect/) | アプリ画面の OOUI 設計 — UI 候補が決まった後の画面・モデル整理 |
