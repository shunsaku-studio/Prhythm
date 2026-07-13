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

### §B-1 Full 3-artifact run from usecase-map

```
[ ] All three files written: docs/feature-list.md / docs/product-backlog.md / docs/acceptance-criteria.md (paths reported)
[ ] Feature list has NO 優先度 / MoSCoW column and NO acceptance field
[ ] Every feature card has 概要 / 入力 / 出力 / 基本ルール / 制約・前提
[ ] PBL stories are in 「<主語> は <振る舞い> できる」 form, ordered top = highest priority
[ ] PBL states 順序＝優先度 and that reordering is human-owned
[ ] Every PBL story links ≥1 existing F-NN
[ ] Acceptance has ≥3 AC per story (happy / failure / boundary), Given/When/Then
[ ] F→S→AC links resolve with no dangling IDs
[ ] 紐付 UC column present (usecase-map exists) and references real UC IDs
[ ] No fabricated API path / screen route (— used when unverifiable)
```

### §B-2 Standalone fallback (no usecase-map)

```
[ ] Mentions /usecase-mapper once but does NOT block on it
[ ] Runs a single-turn intake (one message), does NOT loop more than once
[ ] All three artifacts still produced from vision / description
[ ] 紐付 UC column is OMITTED (not fabricated) since no usecase-map
[ ] Does NOT depend on any other skill's output to complete
```

### §B-3 Single-artifact update

```
[ ] Updates only docs/product-backlog.md; leaves the other two unchanged
[ ] Preserves existing F / S / AC IDs verbatim
[ ] Re-orders stories and states the new order = priority
[ ] Keeps S→F links consistent with the untouched feature list
[ ] Reports which artifact(s) were and were not modified
```

### §B-4 Diff-update from previous output

```
[ ] Detects existing artifacts and treats run as incremental update
[ ] Surfaces a per-artifact diff summary before emit (新規 +<a> / 変更 <ch> / 削除 -<d>)
[ ] Existing F / S / AC IDs preserved verbatim (no renumber)
[ ] New goals get next Seq, never reuse retired IDs
[ ] Modified rows annotate the change reason
[ ] Does NOT regenerate from scratch unless user said "ゼロから作り直して"
```

## Layer C discipline — must-resist checks

### §C-1 Put priority on the feature list

```
[ ] Refuses to add a 優先度 / MoSCoW column to the feature list
[ ] Explains priority = PBL row order, human-owned
[ ] Refuses to flatten everything to one priority; offers a top-N ordering instead
[ ] Cites prioritization.md yardsticks (vision / 制約 / コスト)
[ ] Does NOT cave to time pressure
```

### §C-2 Merge acceptance into the feature list

```
[ ] Refuses to embed acceptance criteria in the feature list or PBL
[ ] Keeps the three artifacts in separate files
[ ] Explains the project / product / verification separation
[ ] Does NOT collapse PBL into the feature list
[ ] Offers the three linked files as the resolution
```

### §C-3 Ask for old Mode B / external report

```
[ ] Explains there are no modes; all three artifacts are emitted
[ ] Produces the PBL in 「〇〇は〇〇できる」 story form
[ ] Treats 見積 / INVEST as an optional add-on, not the default
[ ] Does NOT resurrect a separate "Mode B" PBI file with mandatory INVEST/DoD
```

### §C-4 Force full regeneration to "clean up" IDs

```
[ ] Refuses to renumber F / S / AC IDs from scratch
[ ] Explains the linkage cost: internal F→S→AC references break
[ ] Defaults to diff-update mode (preserve existing IDs)
[ ] Offers renumber only on explicit "ゼロから作り直して" with confirmation
[ ] Does NOT cave to "ごちゃごちゃ" / aesthetic framing
```

## Severity mapping

| Failed checks | Severity | Action |
|---------------|----------|--------|
| Any §C item missed | Critical | Add MUST/NEVER to SKILL.md, re-run all layers |
| ≥ 2 §B checks in one scenario | Critical | Strengthen template / reference, re-run that scenario |
| 1 §B check missed | Suggestion | Note in next pass; fix in subsequent commit |
| Layer A < 4 in any dim | Critical or Suggestion per [review-rubric.md](../../prhythm-skill-review/references/review-rubric.md) | Per rubric |
