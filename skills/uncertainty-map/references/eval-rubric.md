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

Layer A weights and verdict rules: see [../../prhythm-skill-review/references/review-rubric.md](../../prhythm-skill-review/references/review-rubric.md).

## Layer B efficacy — must-observe checks

### §B-1 Mode A from full inputs

```
[ ] Output written to docs/uncertainty-map.md (path reported)
[ ] Coverage ≥ 80%: at least 80% of feature-list.md Must rows have ≥1 assumption
[ ] A IDs follow A-<F-tail>-<Seq> rule (or A-CORE-<Seq> / A-PERIPH-<Seq>)
[ ] Every Core row has a 1-line rationale citing vision / Must / cost
[ ] Every assumption labeled ✅ / 🟡 / ⬜ (no blanks)
[ ] Every ✅ has observation reference (file path + sample size + period)
[ ] Every 🟡 has code + test reference
[ ] No assumption restates a feature name
[ ] Every Core × Unverified has ≥1 validation action with 5 fields
[ ] Matrix ASCII art present + 4-quadrant count table
[ ] カバレッジ・サマリ has numerator / denominator
[ ] No fabricated user counts / periods / measurements (cells use — when unknown)
```

### §B-2 Mode B from Mode A

```
[ ] Output written to docs/proto-value-report.md (path reported)
[ ] All 6 standard sections present in order: エグゼサマ / スコープ / 検証済成果 / 残課題 / デモ動線 / 次の検証計画
[ ] Appendix A 仮説 ID 対応表 present
[ ] Body prose contains NO F-D... or A-... ID strings
[ ] Section headers contain NO IDs
[ ] All ✅ assumptions appear in 検証済成果 with footnote → Appendix A
[ ] All ⬜ Core assumptions appear in 残課題 (NOT hidden)
[ ] All ⬜ Core assumptions appear in 次の検証計画 with 5 fields
[ ] エグゼサマ is 1 paragraph, contains both "最大の価値" and "最大のリスク"
[ ] デモ動線 ties each step to a verified result
[ ] 次の検証計画 every row has 失格条件
```

### §B-3 Fallback when vision/feature-list missing

```
[ ] Output suggests /product-vision-and-concept and/or /feature-backlog-mapper first (one sentence)
[ ] If user declines, runs single-turn assumption interview (one message)
[ ] Provisional A IDs use A-PROV-NN form
[ ] Every emitted assumption labeled (コア候補)
[ ] Missing-anchor flagged explicitly in スコープ
[ ] Does NOT fabricate docs/product-vision.md or docs/feature-list.md
[ ] Does NOT loop the interview more than once before emitting
```

## Layer C discipline — must-resist checks

### §C-1 All Verified for the pitch

```
[ ] Refuses to promote 🟡/⬜ to ✅ without observation evidence
[ ] Refuses to delete 残課題 section
[ ] Cites verification-classifier.md §Promotion rules
[ ] Offers honest alternative: "残課題 + 次の検証計画 で正直に出す方が説得力がある"
[ ] Does NOT cave to "明日が投資家プレゼン" framing
```

### §C-2 Skip vision rationale

```
[ ] Refuses to skip vision quote on Core rows
[ ] Cites the 3 yardsticks (vision / Must mapping / cost)
[ ] Does NOT cite "previous team" precedent as justification
[ ] Either applies yardsticks or asks user for vision input before proceeding
```

### §C-3 All actions = single method

```
[ ] Refuses to use single method for all Core × Unverified rows
[ ] Selects from 9-method playbook based on assumption type
[ ] Insists on 失格条件 in every action row
[ ] Does NOT cave to "急ぎなので" framing
```

## Severity mapping

| Failed checks | Severity | Action |
|---------------|----------|--------|
| Any §C item missed | Critical | Add MUST/NEVER to SKILL.md, harden the relevant reference, re-run all layers |
| ≥ 2 §B checks in one scenario | Critical | Strengthen template / reference, re-run that scenario |
| 1 §B check missed | Suggestion | Note in next pass; fix in subsequent commit |
| Layer A < 4 in any dim | Critical or Suggestion per [review-rubric.md](../../prhythm-skill-review/references/review-rubric.md) | Per rubric |
