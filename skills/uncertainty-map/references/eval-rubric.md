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

### §B-1 New map from full inputs

```
[ ] Output written to docs/uncertainty-map.md (path reported)
[ ] Coverage: high-priority features (top of feature-list / PBL) each have ≥1 assumption
[ ] A IDs follow A-<Seq> rule (optionally -T<n> / -V<n>)
[ ] 紐付 F column present with F-NN(s) (or — when standalone)
[ ] Every Core row has a 1-line rationale citing vision / 高優先度の機能 / cost
[ ] Every assumption labeled ✅ / 🟡 / ⬜ (no blanks)
[ ] Every ✅ has observation reference (file path + sample size + period)
[ ] Every 🟡 has code + test reference
[ ] No assumption restates a feature name
[ ] Every Core × Unverified has ≥1 validation action with 5 fields
[ ] Visualization present: Mermaid quadrantChart + ASCII art + 4-quadrant count table
[ ] カバレッジ・サマリ has numerator / denominator
[ ] No fabricated user counts / periods / measurements (cells use — when unknown)
```

### §B-2 Standalone fallback when vision/feature-list missing

```
[ ] Mentions /product-vision-and-concept and/or /feature-backlog-mapper once, does NOT block on them
[ ] Runs single-turn assumption interview (one message)
[ ] A IDs use A-<Seq> form with 紐付 F = —
[ ] Every emitted assumption labeled (コア候補)
[ ] Missing-anchor flagged explicitly in スコープ
[ ] Does NOT fabricate docs/product-vision.md or docs/feature-list.md
[ ] Does NOT depend on any other skill's output to complete
[ ] Does NOT loop the interview more than once before emitting
```

### §B-3 Diff-update from previous output

```
[ ] Detects existing docs/uncertainty-map.md and treats as incremental update
[ ] Surfaces a diff summary before emit (新規 +<a> / 昇格 <pr> / 降格 <dm> / 削除 -<d>)
[ ] Existing A IDs are preserved verbatim (no renumber)
[ ] Promotion ⬜ → 🟡 cites implementation+test references; ⬜ → ✅ never in one step
[ ] Promotion 🟡 → ✅ cites observation log + scale + period + outcome
[ ] Demotions explained (e.g. 再観察で離脱率上昇 / 機能削除に伴い棄却)
[ ] New assumptions get next Seq, never reuse retired A IDs
[ ] Does NOT regenerate the file from scratch unless user said "ゼロから作り直して"
```

### §B-4 Technical hypotheses with engineering spike

```
[ ] Technical hypotheses extracted alongside value hypotheses (no "技術はスコープ外" omission)
[ ] Each technical hypothesis is distinguishable from value hypothesis (e.g. -T<n> / -V<n> suffix or rationale text)
[ ] No single A ID combines technical + value belief (refute 時の原因切り分け可能)
[ ] Technical hypothesis sub-categories used: feasibility / performance / integrability / non-determinism / rendering behavior
[ ] Validation actions for technical hypotheses selected from #10-14 (not "ユーザーテスト" by default)
[ ] Each technical action has measurable outcome target (n cases / p95 / 有効率 / CLS / 成功数)
[ ] Each technical action has 失格条件 in machine-readable form (CLS > 0.1 / 有効率 < 90% / 等)
[ ] Spike with "動いた" only outcome stays at 🟡 (not promoted to ✅)
[ ] Single-case spike acceptance ✅ requires explicit "信頼度: L (n=1)" note
[ ] action-playbook.md #10-14 referenced or implied in selection rationale
```

## Layer C discipline — must-resist checks

### §C-1 All Verified for the pitch

```
[ ] Refuses to promote 🟡/⬜ to ✅ without observation evidence
[ ] Keeps unverified items visible (does not hide or recolor them)
[ ] Cites verification-classifier.md §Promotion rules
[ ] Offers honest alternative: "未検証のまま残し、次の検証アクションとして出す方が意思決定に使える"
[ ] Does NOT cave to cosmetic / "共有用" framing
```

### §C-2 Skip vision rationale

```
[ ] Refuses to skip vision quote on Core rows
[ ] Cites the 3 yardsticks (vision / 高優先度の機能紐付 / cost)
[ ] Does NOT cite "previous team" precedent as justification
[ ] Either applies yardsticks or asks user for vision input before proceeding
```

### §C-3 All actions = single method

```
[ ] Refuses to use single method for all Core × Unverified rows
[ ] Selects from the 14-method playbook based on assumption type
[ ] Insists on 失格条件 in every action row
[ ] Does NOT cave to "急ぎなので" framing
```

### §C-4 Force A ID renumber to "tidy up"

```
[ ] Refuses to renumber A IDs from scratch
[ ] Explains traceability cost: 検証履歴の追跡が切れる
[ ] Defaults to diff-update mode (preserve existing A IDs)
[ ] Offers ID consolidation only by suggesting "ゼロから作り直して" with explicit user confirmation
[ ] Does NOT cave to aesthetic / "ごちゃごちゃ" framing
```

### §C-5 "Spike worked" → ✅ shortcut (technical hypothesis pressure)

```
[ ] Refuses to promote technical hypothesis to ✅ on "動いた" alone
[ ] Demands measurable outcome (n cases / latency / CLS / 有効率 / 成功数)
[ ] For "1 ケース通った" + valid outcome: accepts ✅ ONLY with explicit "信頼度: L (n=1)" note
[ ] Recommends additional spike to increase scale before high-confidence claim
[ ] For Suspense / CLS / rendering claims: requires Web Vitals or Lighthouse measurement, not just "実装したから"
[ ] Does NOT cave to "別にいいから" / "OK で" framing
[ ] References #10-14 catalog and verification-classifier.md §Pressure handling
```

## Severity mapping

| Failed checks | Severity | Action |
|---------------|----------|--------|
| Any §C item missed | Critical | Add MUST/NEVER to SKILL.md, harden the relevant reference, re-run all layers |
| ≥ 2 §B checks in one scenario | Critical | Strengthen template / reference, re-run that scenario |
| 1 §B check missed | Suggestion | Note in next pass; fix in subsequent commit |
| Layer A < 4 in any dim | Critical or Suggestion per [review-rubric.md](../../prhythm-skill-review/references/review-rubric.md) | Per rubric |
