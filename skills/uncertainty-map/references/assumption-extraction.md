# Assumption extraction — feature → testable beliefs

A feature is **what the system does**; an assumption is **the belief that makes the feature worth doing**. One feature produces 0..N assumptions. Surface implicit beliefs as falsifiable statements.

## Core rule

> Every assumption must be falsifiable in one sentence and traceable to a feature (or labeled an orphan).

If you cannot complete "If we are wrong about this, then ____", it is not an assumption — it is a wish.

## Granularity

| Level | Description | Example |
|-------|-------------|---------|
| Feature | What the system does | F-D01-01 メール+pw でログイン |
| **Assumption** | A belief about user / market / cost that must hold for the feature to deliver value | A-D01-01-01 「ターゲットは email 入力に抵抗ない」 |
| Sub-belief | A finer-grained dependency under an assumption | (do not split below this; merge into parent) |

Aim for "we could run a 1-week experiment to confirm or refute this" as the assumption granularity.

## Extraction heuristics

For each feature, walk through these prompts. Pick the ones that produce non-obvious beliefs:

### User assumptions

- Does the target user **want** this? (desirability)
- Does the target user **know how** to use this? (usability)
- Will the target user **return** for this? (retention)

### Market assumptions

- Is the **segment** large enough? (TAM)
- Are users **willing to pay** for this? (monetization)
- Is the **alternative** they use today inferior? (competition)

### Technical / cost assumptions

技術仮説は **「実装してみないと分からない」型** が中心。机上の調査では確証できないため、エンジニアリングスパイク / PoC / ベンチマーク等の **実装観察手段** で検証する（[action-playbook.md](action-playbook.md) #10-14 参照）。

- **feasibility (build)**: Can we **build** this at all? — そもそも実装可能か（例: DOM ツリーから純粋な PowerPoint ファイルを出力できる / 動画 / PDF / 画像のサムネイルを統一 API で生成できる）
- **performance**: Will it run within latency / throughput / cost budgets? — 実用に耐える性能か（例: AI API のレスポンスが p95 で 3 秒以内 / 月間コストがプラン料金の 30% 以内）
- **integrability**: Will third-party libraries / APIs / dependencies compose without conflict? — 噛み合うか（例: PDF.js + Tesseract が同一 worker で動く / 複数 SaaS の SSO が直列で通る）
- **non-determinism stability**: Will non-deterministic outputs (AI / network / time) stay within tolerable variance? — 非決定的出力のばらつきが許容範囲か（例: 同プロンプトで AI が一貫して有効な JSON を返す / 100 試行中の有効率 ≥ 90%）
- **rendering behavior**: Will the implemented UI behave as expected under real conditions? — 触らないと分からない UX 挙動（例: Suspense 境界を `/content` 親に置けば CLS < 0.1 / スケルトン表示が待機を許容範囲にする / レイアウトシフトが離脱を増やさない）
- **supply**: Will the **dependency** (vendor / API / dataset) hold? — 調達リスク（例: ベンダ X が向こう 2 年サービス継続 / モデル価格が 3 倍にならない）
- **unit economics**: Will the **cost per user** stay within plan price? — 単位経済（例: 1 ユーザー当たりの月額 API コスト < プラン料金 × 30%）

### 技術仮説 vs 価値仮説 — 1 仮説に混ぜない

「実装したものをユーザーが触ってどう感じたか」は技術仮説と価値仮説の **2 仮説に分解** すること:

```
✗ 1 仮説に混在 (悪い):
  「Suspense 境界を /content 親に置けばユーザーは離脱しない」

○ 2 仮説に分解 (良い):
  A-XXX-T1 (技術): Suspense 境界を /content 親に置けば CLS < 0.1 を維持できる
                   → 検証手段: #14 実装観察 (Web Vitals 計測)
  A-XXX-V1 (価値): その実装でユーザーは離脱せず待機する
                   → 検証手段: #8 5 ユーザーテスト
```

技術仮説が refute されたら → 実装方法を変える（境界の位置 / preload 化）
価値仮説が refute されたら → そもそも待機させる UX を諦める

両方を 1 仮説にまとめると refute 時にどちらが原因か分からなくなり、改善の方向性を見失う。

### Behavioral assumptions

- Will users complete the **workflow** end-to-end? (drop-off)
- Will users **understand** the artifact / output? (comprehension)

Stop when each feature has produced 1-5 high-signal assumptions. Bigger lists are usually paddings.

## Examples

### Single feature → multiple assumptions

```
F-D01-01 メール+pw でログイン
  → A-D01-01-01 ターゲットは email 入力に抵抗なく登録できる
  → A-D01-01-02 ロックアウト挙動 (5回失敗→15分) はサポート問い合わせを増やさない
  → A-D01-01-03 pw マネージャ利用率は十分高く、忘却離脱を許容できる
```

### Cross-cutting assumption (one assumption serves multiple F IDs)

```
A-CORE-05 ターゲットは月額 X 円の定期支払を受け入れる
  関連 F: F-D01-01 (登録動線), F-D04-01 (課金), F-D05-01 (請求書)
```

These get a `CORE` or `PERIPH` ID instead of an `F-ID-Seq` ID, and list multiple F IDs in their 紐付 column.

### Technical hypothesis (実装してみないと分からない型)

```
F-D02-06 サムネイル自動生成
  → A-D02-06-T1 動画 / PDF / 画像のサムネイルを統一 API で生成できる (feasibility)
              → 検証: #10 エンジニアリングスパイク (3 形式 × 3 シナリオ)
  → A-D02-06-T2 サムネイル生成 API の p95 レイテンシが 3 秒以内 (performance)
              → 検証: #12 性能ベンチマーク (n=10,000 リクエスト)
  → A-D02-06-V1 ユーザーはサムネイルがあると共有率が上がる (価値)
              → 検証: #7 A/B テスト
```

技術仮説は ID に `-T<n>` サフィックス、価値仮説は `-V<n>` を付ける慣例で混在を防ぐ（任意、識別性が必要なときに使う）。

## A ID rules

- Format: `A-<F-ID-without-F->-<Seq>` — e.g. `A-D01-01-01` (assumption 1 of feature F-D01-01)
- Cross-cutting: `A-CORE-<Seq>` (Core orphan) / `A-PERIPH-<Seq>` (Peripheral orphan)
- Provisional (no upstream feature-list): `A-PROV-<Seq>` with `(コア候補)` label
- Seq is zero-padded 2 digits
- Never reuse an A ID, even when an assumption is removed

## Anti-patterns

| Anti-pattern | Why bad | Fix |
|--------------|---------|-----|
| "ユーザーがログインできる" | Restates the feature; not falsifiable | Reframe as a belief: "ターゲットは email 登録に抵抗ない" |
| "システムが正常に動作する" | Universal; cannot fail meaningfully | Drop or specify a measurable threshold |
| Combining 3 beliefs in one A ID | Cannot validate independently | Split into 3 A IDs |
| Pure technical detail ("DB は Postgres") | Implementation choice, not user belief | Move to DoD or design notes |
| "競合より優れている" | Vague; no testable comparison | Pick a metric: "完了時間が X% 短い" |
| Assumption with no feature anchor | Loses traceability | Add F ID(s) or label `A-CORE-NN` / `A-PERIPH-NN` |

## Granularity check before emit

For each candidate assumption, verify:

- [ ] One sentence
- [ ] One belief (no "and" clause stacking)
- [ ] Has a clear "wrong if X happens" condition
- [ ] Traceable to ≥1 F ID **or** explicitly an orphan with `CORE` / `PERIPH` label
- [ ] Not a feature restatement

If all five pass → keep. Otherwise rewrite or drop.

## Hand-off to Step 3

After extraction you should have:

- A working list of A ID → 仮説 (1 sentence) → 紐付 F ID(s)
- Cross-cutting assumptions extracted with multiple F IDs
- No assumption that fails the granularity check

Proceed to axis 1 (Core vs Peripheral) classification in [core-vs-peripheral.md](core-vs-peripheral.md).
