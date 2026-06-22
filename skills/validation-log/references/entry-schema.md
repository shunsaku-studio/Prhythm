# Entry schema — the canonical record

Every entry is one **method × one assumption set**. The schema is identical for value and technical evidence; only the field values differ.

## Fields

| Field | Required | Notes |
|-------|----------|-------|
| `V ID` | ✓ | `V-01`, `V-02` … append-only, never reused |
| 日付 / 期間 | ✓ | **Period** — `2026-06-12` or `2026-06-10〜12` |
| 対象 A ID | ✓ | 1..N 件。`uncertainty-map` の A ID。未登録は `(A候補) A-PROV-NN` |
| 種別 | ✓ | `value` or `technical` |
| 仮説 | ✓ | 検証した信念を 1 文（A ID の仮説文を引用） |
| 検証手段 | ✓ | `#1-14` + 名称（[method-tagging.md](method-tagging.md)） |
| Scale | ✓ | `n=<count>` + 単位。`n=1` は `信頼度 L` 注記必須 |
| Outcome | ✓ | 機械可読な計測値（下表）。無ければ `—` + `要追加計測` |
| 失格条件 | ✓ | 事前に決めた refute 条件 |
| 判定 | ✓ | `合格 / 不合格 / 判定保留` |
| 学び | ✓ | 計測から分かったこと 1 行 |
| 次アクション | ✓ | 次の一手 1 行（再検証 / 本実装 / 棄却 等） |
| 生データ | 任意 | 録画・analytics・ベンチ出力へのリンク |

## Outcome の書き方（種別別）

| 種別 | Scale 単位の例 | Outcome の例 |
|------|---------------|-------------|
| value（#1-9） | users / 訪問 / 申込 | 完了率 100% / CVR 4.2% / 離脱率 12% / NPS +30 |
| technical（#10-14） | trials / cases / requests / 端末 | p95 2.3s / 有効率 94% / CLS 0.04 / 3 件中 3 件成功 / 月コスト ¥8,400 |

**不可な outcome**: 「動いた」「だいたいOK」「問題なさそう」「数人が好評」。これらは `—` + `要追加計測` に倒す。

## 3 要素が揃わないとき

| 欠落 | 扱い |
|------|------|
| Scale 欠落 | `n=—` + `要追加計測`。`uncertainty-map` は 🟡 据え置き |
| Period 欠落 | `期間=—` + `要追加計測` |
| Outcome 欠落 | `Outcome=—` + `要追加計測`。「実装した」だけは technical でも 🟡 |

`要追加計測` が付いたエントリは記録として有効だが、**✅ 昇格の根拠にはならない**（🟡 まで）。

## エントリ例（value）

```
### V-03 — メール登録動線
- 日付: 2026-06-12
- 対象 A ID: A-D01-01-01
- 種別: value
- 仮説: ターゲットは email 登録に抵抗がなく 1 分以内に完了できる
- 検証手段: #8 5 ユーザーテスト
- Scale: n=5 users
- Outcome: 完了率 100% / 平均 47 秒
- 失格条件: 完了率 < 80% または 平均 > 120 秒
- 判定: 合格
- 学び: PW マネージャ利用者はさらに速い（平均 31 秒）
- 次アクション: A-D01-01-01 を ✅ 昇格候補へ。PW マネージャ非利用者向けのヒント文を検討
- 生データ: docs/usability/2026-06-12-signup.md
```

## エントリ例（technical）

```
### V-04 — DOM→pptx エクスポート実現可能性
- 日付: 2026-06-13
- 対象 A ID: A-D02-06-T1
- 種別: technical
- 仮説: DOM ツリーから純粋な PowerPoint ファイルを出力できる
- 検証手段: #10 エンジニアリングスパイク
- Scale: n=3 cases（表 / 画像 / 箇条書きスライド）
- Outcome: 3 件中 3 件で PowerPoint で開けた（図形ズレ 1 件あり）
- 失格条件: 1 ケースも開けない / レイアウト崩壊
- 判定: 合格（信頼度 M、図形ズレは要追加検証）
- 学び: テキストと画像は安定。複雑な図形は座標変換に追加実装が必要
- 次アクション: 図形ケースを増やしたスパイク（n≥10）で信頼度を上げる
- 生データ: spikes/pptx-export/RESULT.md
```

## エントリ例（要追加計測で 🟡 据え置き）

```
### V-05 — AI 生成の JSON 有効性
- 日付: 2026-06-13
- 対象 A ID: A-D03-02-T1
- 種別: technical
- 仮説: 同一プロンプトで AI が一貫して有効な JSON を返す
- 検証手段: #13 品質変動計測
- Scale: n=— （試行回数未記録）
- Outcome: — 「だいたい返ってきた」→ 計測値なし
- 失格条件: 有効率 < 90%
- 判定: 判定保留
- 学び: 体感では概ね有効だが定量データなし
- 次アクション: n=100 試行で有効率を実測（要追加計測）
- 生データ: —
```
