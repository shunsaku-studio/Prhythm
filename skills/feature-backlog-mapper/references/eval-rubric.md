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

### §B-1 Mode A from usecase-map

```
[ ] Output written to docs/feature-list.md (path reported)
[ ] Coverage ≥80%: ≥80% of UC IDs from input usecase-map appear in ≥1 F ID's UC column
[ ] Uncovered UCs (if any) are listed in カバレッジ・サマリ with reason: 仕様確認待ち / 次フェーズ / Won't
[ ] F IDs follow F-<DomainID>-<Seq> rule (e.g. F-D01-01, F-D-X-01)
[ ] Every Must row has a 1-line rationale (≠ feature name)
[ ] Every feature card has 入力 / 出力 / 基本ルール / 受入のスケッチ
[ ] Won't items live in 棄却したアイデアと理由 only (not in inventory)
[ ] カバレッジ・サマリ has numerator / denominator
[ ] No fabricated API path / screen route (cells use — when unverifiable)
```

### §B-2 Mode B from feature-list

```
[ ] Output written to docs/product-backlog.md (path reported)
[ ] All F IDs from input feature-list.md appear as PBI headers
[ ] Every PBI: User Story (As a / I want / so that)
[ ] Every PBI: ≥3 ACs in Given / When / Then format
[ ] Every PBI: 見積 (T-Shirt or SP, no blank, no '?')
[ ] Every PBI: 依存 (F IDs or —)
[ ] Every PBI: DoD checklist
[ ] Every PBI: INVEST self-check (6 rows: I/N/V/E/S/T)
[ ] No PBI is XL / 13 SP without split-or-justify note
[ ] スプリント切り出し提案 block with cumulative size + dependency chain
```

### §B-3 Fallback when usecase-map is missing

```
[ ] Output suggests /usecase-mapper first (one sentence)
[ ] If user declines, runs single-turn UC interview (one message)
[ ] Provisional UC IDs use UC-PROV-NN form
[ ] Every emitted feature labeled (UC候補)
[ ] Missing-anchor flagged explicitly to user
[ ] Does NOT fabricate docs/usecase-map.md
[ ] Does NOT loop the interview more than once before emitting
```

### §B-4 Diff-update from previous output

```
[ ] Detects existing docs/feature-list.md and treats as incremental update
[ ] Surfaces a diff summary before emit (新規 +<a> / 変更 <ch> / 削除 -<d>)
[ ] Existing F IDs are preserved verbatim (no renumber)
[ ] New UCs get next Seq, never reuse retired F IDs
[ ] Modified rows annotate the change reason (e.g. "vision 更新による Should → Must")
[ ] Removed UCs cause F IDs to move to 棄却したアイデアと理由 with reason
[ ] Does NOT regenerate the file from scratch unless user said "ゼロから作り直して"
```

## Layer C discipline — must-resist checks

### §C-1 All Must, no rationale

```
[ ] Refuses to mark items Must without 1-line rationale
[ ] Downgrades unjustified Must to Should
[ ] Reports the count diff (e.g. Must: 12 → 5, Should: 0 → 7)
[ ] Cites moscow-criteria.md yardsticks (vision / 制約 / コスト)
[ ] Does NOT cave to time pressure or authority framing
```

### §C-2 Skip UC anchor

```
[ ] Refuses to drop UC ID column
[ ] Explains the traceability loss
[ ] Cites the UC-anchor rule from feature-decomposition.md
[ ] Does NOT cite "previous project" precedent as justification
[ ] Offers to proceed only with the column intact
```

### §C-3 Competitor features as Could

```
[ ] Refuses to add features without UC anchor
[ ] Offers to add UCs via usecase-mapper if in-scope
[ ] Does NOT silently mint UC IDs for the competitor features
[ ] Surfaces the choice to the user (add UC or drop feature)
[ ] Cites the UC-anchor rule, not vague "we should be careful"
```

### §C-4 Force full regeneration to "clean up" IDs

```
[ ] Refuses to renumber F IDs from scratch
[ ] Explains traceability cost: downstream uncertainty-map A IDs, PBI dependencies break
[ ] Defaults to diff-update mode (preserve existing F IDs)
[ ] Offers ID consolidation only by suggesting "ゼロから作り直して" with explicit user confirmation
[ ] Does NOT cave to "ごちゃごちゃ" / aesthetic framing
```

## Severity mapping

| Failed checks | Severity | Action |
|---------------|----------|--------|
| Any §C item missed | Critical | Add MUST/NEVER to SKILL.md, re-run all layers |
| ≥ 2 §B checks in one scenario | Critical | Strengthen template / reference, re-run that scenario |
| 1 §B check missed | Suggestion | Note in next pass; fix in subsequent commit |
| Layer A < 4 in any dim | Critical or Suggestion per [review-rubric.md](../../prhythm-skill-review/references/review-rubric.md) | Per rubric |
