# Deck shell — prhythm-docs

スライドの見た目とビューアは **1 箇所**にある。スキル側のテンプレはスライド本体だけを持つ。

```
skills/prhythm-docs/
  assets/
    deck.css        デザインシステム（1920×1080 前提、px 固定）
    deck-stage.js   ビューア（固定キャンバス / ナビ / 印刷 / はみ出し検出）
    shell.html      上 2 つを差し込む器
  scripts/
    build-deck.mjs  sections.html → 自己完結 index.html
    lint-deck.mjs   情報量バジェット検査 / --visual で実オーバーフロー検査

skills/{skill}/templates/docs/
  sections.html     <section class="slide"> だけを並べたフラグメント
  index.md          同じ内容の Markdown 版
```

CSS も JS もテンプレにコピーしない。**デザインを直すときは `assets/deck.css` の 1 ファイルだけを直す**。以前は同じシェルが 10 個のテンプレに複製されていて、`.trio` が一部にしか無いといったドリフトが起きていた。

---

## ビルド

```bash
node skills/prhythm-docs/scripts/build-deck.mjs \
  skills/market-landscape/templates/docs/sections.html \
  docs/prhythm/market-landscape/index.html \
  --title "◯◯の市場地図 — market-landscape"
```

- 出力は **単一ファイル・自己完結**。サーバ不要、ローカルで開けば動く
- `{{PLACEHOLDER}}` が残っていると警告が出る。埋める材料が無い行は `<li>` や `<tr>` ごと削除する
- mermaid の CDN は sections 内に `.mermaid` があるときだけ注入される

## 検査

```bash
node skills/prhythm-docs/scripts/lint-deck.mjs docs/prhythm/*/index.html --visual
```

静的検査は文字数・件数・メッセージラインの規則・Answer スライドの有無。`--visual` は headless Chromium で実際にレンダリングして、キャンバスからはみ出しているスライドを報告する。予算の一覧は [slide-grammar.md](slide-grammar.md)。

ブラウザで `index.html?debug` を開くと、はみ出しているスライドが赤枠になりコンソールに超過 px が出る。

---

## ビューア（deck-stage）

`<deck-stage width="1920" height="1080">` の直下の子要素が 1 スライド。

- **固定キャンバス + scale-to-fit** — 1920×1080 で描いてビューポートに合わせて縮小・レターボックス。`clamp()` や `vw` を使わないので、どの画面でも同じ組版になり、はみ出しが機械判定できる
- **ナビ** — `←` `→` `Space` `PageUp/Down` `Home` `End`、数字キー `1`–`9`（`0` は 10 枚目）、画面の左右半分クリック
- **印刷** — `@page` がデザインサイズに設定され、1 スライド 1 ページ。ブラウザの Print → Save as PDF でそのまま配布用 PDF になる
- **`?debug`** — はみ出し検出

Web フォントの読み込みが終わるまで（最大 2 秒）ステージを伏せてから表示する。見出しが 900 ウェイト依存なので FOUT が目立つため。

---

## スライドの骨格

```html
<section class="slide" data-label="Answer">
  <div class="frame">
    <header class="head">
      <div class="eyebrow">Evidence<span class="sep"></span>4象限マップ</div>
      <h2 class="msg">…主張を 1 文で…</h2>
    </header>
    <div class="body">
      …レイアウト部品…
    </div>
    <footer class="foot"><span>左</span><span>右</span></footer>
  </div>
</section>
```

`.body` は既定で縦中央寄せ。上寄せにしたいときは `.body.top`。

## レイアウト部品

| クラス | 用途 |
|--------|------|
| `.s-cover` | 表紙。`h1` + `.sub` + `.ink-rule` |
| `.s-statement` + `.statement` / `.because` | Answer スライド。`.msg` は置かない（同じことを 2 回言うことになる） |
| `.tracks.n2` / `.n3` / `.n4` + `.track` | 罫線区切りの並列カラム。`.tnum` `.tlabel` `.tbody`。強調は `.track.is-key` |
| `.rows` + `.row` (`.rk` / `.rv`) | 項目と説明のペア。行が本文高を等分する |
| `table.t` | 比較・一覧。`thead th` は極太下線。強調行は `tr.is-key`、数値セルは `td.num` |
| `.split` (`.wide-l` / `.wide-r`) + `.col-label` | 2 カラム対比。中央に縦罫 |
| `.quadrant` | 2 軸マッピング。`.qy` / `.qx` / `.qgrid` / `.qcell`。狙う象限は `.qcell.is-target`、自案は `.qitem.own` |
| `.diagram > pre.mermaid` | ER・ユースケース図。それ以外に mermaid は使わない |
| `.bullets` / `.bullets.numbered` / `.bullets.lg` | 箇条書き。`.lg` は Gates 用の大サイズ |
| `.callout` / `.callout.warn` + `.lbl` | 注意・リスク |
| `.tag` / `.tag.fill` / `.tag.on` | ラベル |
| `.anim` `.d1`–`.d4` | 入場アニメーション。印刷と reduced-motion では無効 |

`.qy` の span は上から順に **高 → 軸名 → 低**。縦書きなので回転させない。

## 新しいスキルにデッキを足すとき

1. 近いスキルの `sections.html` をコピーして `skills/{skill}/templates/docs/sections.html` に置く
2. Cover → Frame → Answer → Evidence 1–2 → Gates → Next の順を崩さない
3. `build-deck.mjs` で組み、`lint-deck.mjs --visual` を通す
4. [SKILL.md](../SKILL.md) のルーティング表に行を足す

## 禁止

- テンプレに `<style>` や `<script>` を書くこと
- スライド CSS に `clamp()` / `vw` / `vh` を使うこと
- `assets/` を経由せずに HTML を直接手書きすること
