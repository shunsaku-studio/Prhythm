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

- Can we **build** this within budget? (feasibility)
- Will the **dependency** (vendor / API / dataset) hold? (supply)
- Will the **cost per user** stay within plan price? (unit economics)

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
