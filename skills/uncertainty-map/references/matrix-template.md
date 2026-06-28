# Output + visualization template — `docs/uncertainty-map.md`

The single output of this skill. The **visualization** (quadrantChart + ASCII fallback) is the centerpiece — it is what you show the team and anyone else. Copy the structure verbatim. Fill placeholders. Do not add new top-level sections without a reason.

## Full template

````markdown
# <プロダクト名> 不確実性マップ

> 各機能の暗黙の仮説を 2x2 (コア/周辺 × 検証済/部分検証/未検証) で可視化したマップ。
> ビジョン（`docs/product-vision.md`）と、あれば機能一覧（`docs/feature-list.md` の F ID）を物差しにしています。

## スコープ

- **ビジョン**: <一行ステートメント> （出典: `docs/product-vision.md`、無ければユーザー記述）
- **対象プロト**: <例: 個人ユーザーがファイル共有を始めるまでの動線>
- **入力ソース**: <docs/feature-list.md (機能 N 件) があれば記載> + `DESIGN.md` + `git ls-files` (<M> ファイル) + 観察ログ <あり/なし>

## マトリクス（可視化）

```mermaid
quadrantChart
    title Uncertainty Map
    x-axis Unverified --> Verified
    y-axis Peripheral --> Core
    quadrant-1 Proven value
    quadrant-2 Validate first
    quadrant-3 Defer or drop
    quadrant-4 Maintain
    A-05 Pricing intent: [0.1, 0.85]
    A-01 Email signup: [0.85, 0.9]
    A-03 PW manager use: [0.2, 0.75]
    A-07 Dark mode: [0.3, 0.25]
    A-08 Keyboard SC: [0.7, 0.3]
```

> Mermaid `quadrantChart` は GitHub・VS Code の Markdown プレビュー（v10+）でレンダリング可能。座標は 0-1 の正規化値で、x=検証進度 / y=価値の階層を表す。

ASCII 並記（プレビュー非対応環境向け）:

```text
              未検証 ─────────────────► 検証済
            ┌─────────────────┬─────────────────┐
       コア │ <n> 件          │ <n> 件          │
       価値 │ ⚠️ 最優先       │ 確かな価値      │
            ├─────────────────┼─────────────────┤
       周辺 │ <n> 件          │ <n> 件          │
       価値 │ 後回し or 落とす│ メンテ          │
            └─────────────────┴─────────────────┘
```

| 象限 | 件数 | 推奨アクション |
|---|---|---|
| コア × 未検証 (⬜) | <n> | 次サイクルで検証スパイク |
| コア × 部分検証 (🟡) | <n> | ユーザー観察を追加して ✅ へ昇格 |
| コア × 検証済 (✅) | <n> | 確かな価値として前面化、計測継続 |
| 周辺 × 未検証 | <n> | コスト > 価値なら Won't 候補 |
| 周辺 × 部分検証 / 検証済 | <n> | メンテのみ |

---

## コア × 未検証 (最優先)

> 検証アクションは [action-playbook.md](action-playbook.md) の 14 種カタログから選択。

| A ID | 仮説 | 紐付 F | 軸1 根拠 | 軸2 根拠 | 推奨検証手段 |
|---|---|---|---|---|---|
| A-05 | ターゲットは月額 X 円を支払う | F-08 | vision「持続可能な事業として」+ PBL 上位 | 該当実装/観察なし | LP + Stripe スモークテスト |
| A-03 | pw マネージャ利用率は十分高く忘却離脱を許容 | F-01 | vision「2 分で使い始められる」起点 | 計測なし | 5 ユーザーテスト + アナリティクス |

## コア × 部分検証

| A ID | 仮説 | 紐付 F | 軸1 根拠 | 軸2 根拠 (実装/テスト) | 観察への昇格手段 |
|---|---|---|---|---|---|
| A-02 | ロックアウト 15 分はサポート負荷許容 | F-01 | vision 起点 | `src/auth/lockout.ts` + `lockout.test.ts` | β 期間中のサポートチケット計測 |

## コア × 検証済

| A ID | 仮説 | 紐付 F | 軸1 根拠 | 観察根拠 (人数/期間/結果) |
|---|---|---|---|---|
| A-01 | ターゲットは email 登録に抵抗ない | F-01 | vision「2 分で使い始められる」起点 | 5 ユーザー / 2026-06 / 完了率 100% (`docs/validation-log.md` #L23) |

## 周辺 × 未検証

| A ID | 仮説 | 紐付 F | 取扱い |
|---|---|---|---|
| A-07 | dark mode を好む | F-12 | 検証コスト中、影響小。Phase 2 候補 |

## 周辺 × 部分検証 / 検証済

| A ID | 仮説 | 紐付 F | ステータス | 取扱い |
|---|---|---|---|---|
| A-08 | キーボードショートカットを覚える | F-13 | 🟡 | メンテのみ |

---

## 次の検証アクション (コア未検証への対策)

> 各仮説に検証手段 / 必要工数 / 期待結果 / 失格条件を 1 行で。

| A ID | 検証手段 | 必要工数 | 期待結果 | 失格条件 |
|---|---|---|---|---|
| A-05 | LP + Stripe スモークテスト | 5 日 | CVR 3% 以上 | CVR 1% 未満 |
| A-03 | 5 ユーザーテスト + アナリティクス | 3 日 | 完了率 80% 以上 | 完了率 50% 未満 |

棄却された仮説:

| A ID | 仮説 | 棄却理由 |
|---|---|---|
| (取下げ) | コラボ機能を即座に使い始める | vision に該当語なし、機能にも未紐付 |

---

## カバレッジ・サマリ

| 項目 | 値 |
|---|---|
| 全 assumption | <N> |
| コア / 周辺 | <c> / <p> |
| ✅ / 🟡 / ⬜ | <v> / <pp> / <u> |
| 高優先度の機能カバー（feature-list がある場合）| <covered>/<total> |
| 観察ログ参照件数 | <ref count> |

未カバーの高優先度機能があれば理由（assumption 抽出待ち / Won't）を明記。

---

## 次の一手

- 検証スパイク実行 → 結果でマップを再生成（diff-update）
- 検証で構造変化があれば → `/feature-backlog-mapper` と行き来して機能・優先度を見直す
````

## Required sections

Verify before emit:

1. **スコープ** — vision + 対象プロト + 入力ソース
2. **マトリクス（可視化）** — quadrantChart + ASCII 図 + 象限別件数 + 推奨アクション表
3. **4 象限の詳細表** — コア × {未検証 / 部分検証 / 検証済} + 周辺 × {未検証 / 部分検証または検証済}
4. **次の検証アクション** — 検証手段 / 工数 / 期待結果 / 失格条件
5. **カバレッジ・サマリ** — 数値で

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| 可視化（図）が無く表だけ | quadrantChart + ASCII 図を必ず入れる（一目で見える） |
| 「次の検証アクション」に手段だけ | 工数 + 期待結果 + 失格条件を必ず添える |
| カバレッジ・サマリの数値が numerator のみ | denominator を併記 |
| Won't 相当が本表に混在 | 棄却された仮説サブセクションへ移動 |
| 観察根拠なしの ✅ | [verification-classifier.md](verification-classifier.md) §Promotion rules を参照して 🟡 に降格 |
