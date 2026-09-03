# Prhythm MD紹介 — Slide Outline

Fill this table **before** writing section HTML. One row per slide.

| # | file | type | data-label | layout | message (1 line) |
|---|------|------|------------|--------|------------------|
| 1 | 01-title.html | s-title | 表紙 | — | 瞬作スタジオ / Prhythm — ビジョンを多面的に形にし、繰り返し現実に近づける |
| 2 | 02-summary.html | s-content | サマリー | tracks.stack | Prhythmが支えることと、PMにとっての価値を2点で整理 |
| 3 | 03-challenge.html | s-content | 課題意識 | stack+duo | 表層（単価2倍で開発取れない）→本質（志向性ミスマッチ×心理的ハードル） |
| 3-1 | 03z-pm-moments.html | s-content | PMに効く2つの瞬間 | two-entry value flow | ACN提案と既存案件拡大という2つの入口を、Prhythmが「次の提案」へ変える |
| 4 | 04-prhythm-concept.html | s-content | Prhythmとは | stack+tracks.n3 | 提案瞬作に踏み出せる土壌。スキルセット＋ワークフローでプロダクト視点が身につく |
| 5 | 05-prhythm-detail.html | s-content | Prhythm詳細 | cmp | ビジネス/UX/開発/実行計画の観点別スキル一覧と提案品質の底上げ |
| 6 | 06-demo-00-story.html | s-content | デモストーリー | stack+case | ミライト社×ウチナカ公募 — 現状1.2%とRFPを提示し、8スキルの流れをチップで見せる |
| 6-1 | 06-demo-01-reference-research.html | s-content | 参考サービス調査 | image+notes | 主担当：ビジネス — 参考調査とポジション整理 |
| 6-2 | 06-demo-02-hearing.html | s-content | ヒアリング | image+notes | 主担当：ビジネス — 応募率1.2%の背景を構造化 |
| 6-3 | 06-demo-03-journey-map.html | s-content | ジャーニーマップ | image+notes | 主担当：デザイン — 4者ジャーニーでペイン特定 |
| 6-4 | 06-demo-04-vision-concept.html | s-content | ビジョン・コンセプト | image+notes | 主担当：ビジネス — 一言コンセプトと Why/Who/What |
| 6-5 | 06-demo-05-modeling.html | s-content | モデリング | image+notes | 主担当：テック — OOUI・スキーマで骨格を固める |
| 6-6 | 06-demo-06-proto-storyboard.html | s-content | プロト紹介の絵コンテ | image+notes | 主担当：デザイン — デモプレイ絵コンテと台本 |
| 6-7 | 06-demo-07-team-plan.html | s-content | 体制立案 | image+notes | 主担当：実行計画 — パイロット〜展開の体制・RACI |
| 6-8 | 06-demo-08-validation-plan.html | s-content | 検証計画 | image+notes | 主担当：実行計画 — KPI・仮説・Go/No-Go |
| 7 | 07-vision.html | s-content | ビジョン | PM journey | 提案作成→提案時→受注後→その先をつなぎ、手戻りを減らして次の契約へ進むPMの時間軸 |
| A | 10-appendix.html | s-divider | Appendix | — | 補足資料（Prhythmの展開計画） |
| A1 | 10z-roadmap.html | s-content | ロードマップ | cmp | 点火→実戦→定着の3フェーズと状態ゴール・指標 |

## Layout codes

| code | component |
|------|-----------|
| tracks.n3 | 3-column arguments |
| tracks.stack | stacked arguments |
| stack+duo | vertical stack with two-column sub-section |
| toc | table of contents |
| flow | horizontal steps |
| proc.n3 / proc.n4 | process with image slots |
| duo | two-column comparison |
| cmp | comparison table |

## Section rhythm (recommended)

```
s-title → s-content × N → s-divider → s-content × N → …
```
