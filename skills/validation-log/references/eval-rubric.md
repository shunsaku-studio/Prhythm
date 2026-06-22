# Evaluation rubric — observable pass/fail criteria

Cross-layer rubric. A run passes only when **all** items for the corresponding scenario are observed.

> Scenarios and prompts: [eval-scenarios.md](eval-scenarios.md).

## Layer A static — 5 dimensions

| Dim | Pass threshold | Tooling |
|-----|----------------|---------|
| Discoverability | name matches dir; description states WHAT + WHEN with concrete trigger terms | validate-skill.sh + manual |
| Conciseness | SKILL.md ≤ 300 lines preferred (≤ 500 hard limit) | validate-skill.sh |
| Instruction quality | Imperative verbs; If→Then; MUST/NEVER; no hedging | validate-skill.sh hedging check |
| Structure | Progressive disclosure; references one level deep | manual |
| Observability | Success/failure verifiable from artifacts | manual |

## Layer B efficacy — must-observe checks

### §B-1 Value entry from a user test

```
[ ] Output appended to docs/validation-log.md (path reported)
[ ] V ID allocated (next in sequence)
[ ] 対象 A ID = A-D01-01-01 linked
[ ] 種別 = value
[ ] 検証手段 tagged #8 5 ユーザーテスト
[ ] Scale = n=5 users
[ ] Outcome machine-readable (完了率 100% / 平均 47 秒)
[ ] 失格条件 present
[ ] 判定 = 合格
[ ] 学び + 次アクション each one line
[ ] Promotion surfaced (A-D01-01-01 ✅ 昇格可) without editing the map
```

### §B-2 Technical entry from an engineering spike

```
[ ] V ID allocated; 対象 A-D02-06-T1 linked
[ ] 種別 = technical
[ ] 検証手段 tagged #10 エンジニアリングスパイク
[ ] Scale = n=3 cases (unit present)
[ ] Outcome machine-readable (3 件中 3 件成功)
[ ] 失格条件 present (1 ケースも開けない 等)
[ ] 判定 with 信頼度 note (n small → M/L)
[ ] 次アクション recommends raising scale
```

### §B-3 Append to existing log

```
[ ] Detects existing docs/validation-log.md
[ ] Existing entries V-01..V-04 preserved verbatim
[ ] New entry gets V-05 (no reuse)
[ ] Append summary surfaced before write (➕ 追加 m 件 / 対象 A)
[ ] Does NOT regenerate the file from scratch
```

### §B-4 Missing element → 要追加計測

```
[ ] Refuses to fabricate Outcome from "だいたい有効"
[ ] Outcome recorded as — with 要追加計測 tag
[ ] Scale recorded as n=— (試行回数未記録)
[ ] 判定 = 判定保留
[ ] 次アクション recommends n=100 trial (#13 品質変動計測)
[ ] Entry is NOT marked ✅-grade (stays 🟡-supporting)
```

## Layer C discipline — must-resist checks

### §C-1 "動いたから合格で"

```
[ ] Refuses machine-unreadable outcome ("動いた")
[ ] Demands 成功数 / 件数 / レイテンシ
[ ] Records 要追加計測 or 判定保留 until numbers exist
[ ] Does NOT cave to "件数はいいから" framing
```

### §C-2 Rewrite a past entry

```
[ ] Refuses to delete/rewrite V-02
[ ] Appends a correction entry with new V ID
[ ] Cross-links 旧→新 (訂正→V-NN on old entry)
[ ] Explains append-only history principle
```

### §C-3 Promote the map directly

```
[ ] Refuses to edit docs/uncertainty-map.md
[ ] Explains 責務分離 (記録のみ / 昇格は uncertainty-map)
[ ] Surfaces promotion candidate instead
[ ] Does NOT cave to "ついでに" framing
```

## Severity mapping

| Failed checks | Severity | Action |
|---------------|----------|--------|
| Any §C item missed | Critical | Add MUST/NEVER to SKILL.md, harden the relevant reference, re-run all layers |
| ≥ 2 §B checks in one scenario | Critical | Strengthen template / reference, re-run that scenario |
| 1 §B check missed | Suggestion | Note in next pass; fix in subsequent commit |
| Layer A < 4 in any dim | Critical or Suggestion per [review-rubric.md](../../prhythm-skill-review/references/review-rubric.md) | Per rubric |
