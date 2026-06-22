# Method tagging — pick one of the 14 methods

Tag every entry with exactly one method. The **catalog of record** (full descriptions, 工数, 規模, 失格条件 examples, 実在ケース) lives in [uncertainty-map action-playbook](../../uncertainty-map/references/action-playbook.md). This file is a compact lookup so you can tag fast.

## Value / market / behavior methods (#1-9)

| # | 手段 | 何を記録するか | Scale 単位 | Outcome 例 |
|---|------|---------------|-----------|-----------|
| 1 | RAT (Riskiest Assumption Test) | 致命的価値の最小検証 | users / 申込 | CVR / 申込数 |
| 2 | コンシェルジュ | 手動提供での需要・満足 | users | 継続率 / 満足度 |
| 3 | スモークテスト (LP) | 需要・支払意思 | 訪問 / 申込 | CVR / 事前登録数 |
| 4 | Wizard of Oz | 自動化前提の価値 | users / セッション | 完了率 / 満足度 |
| 5 | ペーパープロト | UX の方向性 | users | タスク成功率 |
| 6 | ユーザーインタビュー | 課題の実在 | 人数 | 課題言及率 |
| 7 | A/B テスト | コピー / UI 比較 | 訪問 | 指標差分 + 有意性 |
| 8 | 5 ユーザーテスト | 操作完了率 / 障害 | users (n=5 目安) | 完了率 / 平均時間 |
| 9 | アナログ計測 | 紙票・スプレッドシート計測 | 回答 / 申込 | 数値 |

## Technical / implementation methods (#10-14)

| # | 手段 | 何を記録するか | Scale 単位 | Outcome 例 |
|---|------|---------------|-----------|-----------|
| 10 | エンジニアリングスパイク | 実現可能性（できる/できない） | cases | 成功数 / 制約一覧 |
| 11 | PoC | end-to-end の動作デモ | シナリオ | 動作可否 + 制約 |
| 12 | 性能ベンチマーク | レイテンシ / スループット / コスト | requests | p50/p95/p99 / 月コスト / エラー率 |
| 13 | 品質変動計測 | 非決定的出力のばらつき | trials (N≥100) | 有効率 / 失敗率 / outlier |
| 14 | 実装観察 | 実装依存 UX（CLS/FCP 等） | 端末 × ページ | LCP / FCP / CLS / INP |

## 種別フラグの判定

| 仮説が問うているもの | 種別 |
|---|---|
| ユーザーが価値を感じるか / 行動するか / 払うか | **value** |
| 実装できるか / 速いか / 安定か / 噛み合うか / 触った挙動 | **technical** |

1 機能から value と technical の両方が出ることは正常（例: pptx 出力は「出せるか」technical と「共有が増えるか」value）。**別エントリ + 別 A ID** で記録する。混在させない。

## 手段が決まらないとき

- 「ユーザーに見せた」だけ → 何を計測したかで分岐: タスクをやらせた=#8、意見を聞いた=#6。
- 「実装して試した」だけ → 実現可否=#10、性能=#12、ばらつき=#13、画面挙動=#14。
- どうしても 1 つに絞れない複合活動 → 主たる計測で 1 つ選び、副次計測は学び欄に記す。エントリを水増ししない。
