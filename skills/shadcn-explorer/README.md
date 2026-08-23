# shadcn-explorer

## 概要

探したい UI の種類、用途、雰囲気を渡すと、shadcn/ui エコシステム（コミュニティ registry とテーマ）を横断検索し、コンポーネント、ブロック、UI ライブラリ、テーマ候補を名前・説明・homepage 付きで返す。テーマ依頼なら CSS 変数も付ける。プロジェクトへのインストール手順は扱わない。

## 利用メリット

- 公式以外のコミュニティ registry から、用途に合うコンポーネントや block を絞り込める。
- 認証画面やダッシュボードなど、画面まとまりの候補を比較しやすい。
- テーマの CSS 変数を取り出せるので、プロジェクトの見た目に当てはめやすい。
- 都度取得するので、古い記事や固定リストに頼らず選べる。各候補に homepage が付くので、採用前にソースをたどりやすい。

## 利用シーン

- 標準コンポーネントにない niche な UI が欲しいとき
- 認証、設定、ダッシュボードなど、画面まとまり（block）を探しているとき
- プロジェクトのトーンに合う shadcn テーマを選びたいとき
- どの third-party registry を使うか迷っているとき

依頼の例: 「カレンダー UI の shadcn コンポーネント探して」「ダーク系の shadcn テーマ見つけて」

## 使い方

**いつ使うか:** 既存の shadcn 部品、block、テーマを探したいときに入る。`prototype-design-md` や画面設計の前後どちらでも使える。候補を採用したら `ooui-architect` で画面に載せる。HTML スライドのテーマは `create-html-deck`。

1. ユーザーがコンポーネント / block / registry か、テーマかを決める。両方なら registry を先に、続けてテーマも出す。
2. スキルがコミュニティ registry とテーマ一覧から用途・雰囲気に合うものを拾う。
3. スキルが 3 件以上を名前・説明・homepage（テーマは CSS 変数）で並べる。インストールはしない。

## 具体例

依頼: 「社内公募アプリの募集カード UI を shadcn で探して。」

::: info 返ってくる候補の抜粋:

| name | 説明 | homepage |
|---|---|---|
| origin-ui / card | 余白多めの情報カード。管理画面っぽくなりにくい | https://originui.com |
| magicui / animated-list | 新着が上に積まれるリスト。ミッション到着の演出向け | https://magicui.design |
| aceternity / cards | ホバーで中身が見えるカード。「見てみる」の一歩に向く | https://ui.aceternity.com |
| ... | ... | ... |

:::

## 構成

```
shadcn-explorer/
├── README.md
└── SKILL.md
```

## 前提条件

- `ui.shadcn.com` と `shadcn.io` へ fetch できるネットワークアクセス。
- registry 一覧とテーマページを取得できる URL 取得ツール。

## 注意事項

- 個別テーマ JSON（`shadcn.io/r/{slug}.json`）は Pro 認証が必要。CSS 変数は `shadcn.io/theme/{slug}` から取得する。
- registry の個別 item URL は `{name}` プレースホルダー付きなので、item 名を埋めてから fetch する。
- 検索結果は外部コミュニティ由来。採用前にライセンス、メンテ状況、依存関係を確認する。インストール（`npx shadcn@latest add` など）は別途行う。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [prototype-design-md](../prototype-design-md/README.md) | 探したテーマや空気感を DESIGN.md の判断に落としたいときに使う |
| [ooui-architect](../ooui-architect/README.md) | UI 候補が決まったあと、画面・モデルに載せるとき |
| [create-html-deck](../create-html-deck/README.md) | HTML スライド用テーマ選定（deck-stage 向け。shadcn テーマとは別系統） |
