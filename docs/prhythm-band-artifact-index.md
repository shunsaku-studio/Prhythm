# Prhythm バンド向け成果物セット

このディレクトリの成果物は、Prhythm を「案件初期の情報をバンド資産に変えたい現場メンバー」向けに検討するためのドラフトである。

## 入力

| 種別 | ファイル | 位置づけ |
|---|---|---|
| Persona Stage 1 | `docs/prhythm-band-persona-stage1.md` | セグメント比較と Primary 候補の整理 |
| Persona Stage 2 | `docs/prhythm-band-persona-stage2.md` | Primary 候補の深掘り、Counter-persona、検証計画 |

## 生成済み成果物

| スキル | 成果物 | ファイル |
|---|---|---|
| `hearing-prep` | バンドメンバー検証インタビューの準備カード | `docs/prhythm-band-hearing-prep.md` |
| `hearing-analysis` | 検証インタビュー後に見るべき分析フレーム | `docs/prhythm-band-hearing-analysis.md` |
| `defining-personas-and-segments` | Persona / Segment Stage 1, Stage 2 | `docs/prhythm-band-persona-stage1.md`, `docs/prhythm-band-persona-stage2.md` |
| `create-journey-map` | As-Is / To-Be Journey Map と HMW、表形式まとめ | `docs/prhythm-band-journey-map-asis.md`, `docs/prhythm-band-journey-map-tobe.md`, `docs/prhythm-band-journey-map-table.md` |
| `product-vision-and-concept` | 一行ステートメントと Concept | `docs/prhythm-band-vision-concept.md` |
| `usecase-mapper` | ユースケーススケッチと Mermaid 図 | `docs/usecase-map.md` |
| `prototype-design-md` | プロトタイプ前の DESIGN.md ドラフト | `docs/prhythm-band-prototype-design.md` |

## 未生成 / 後続扱い

| スキル | 理由 |
|---|---|
| `competitive-research` | 調査対象カテゴリと比較軸の確定が必要。Web 調査を含むため別フェーズが妥当 |
| `ooui-graphql-modeling` | 具体的なプロダクト要件とドメインオブジェクトが未確定 |
| `ooui-architect` | UI / アプリ構造がまだないため、DESIGN.md とユースケースの後続 |
| `shadcn-explorer` | UI 実装フェーズで必要なコンポーネント要件が未確定 |
| `create-html-deck` | 提案スライド化は成果物レビュー後の派生 |

## 次の判断

この成果物セットは、まず次の仮説を検証するために使う。

> Prhythm は、全スキルを順番に使わせるよりも、案件初期の断片を「次の判断に使える共有材料」へ変換する場面で価値を出す。

最初の検証では、全スキルを通しで使わせず、`hearing-prep`、`hearing-analysis`、`defining-personas-and-segments`、`product-vision-and-concept` のうち 2〜3 個だけを実案件メモで試す。
