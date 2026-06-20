# Evaluation rubric — observable pass/fail criteria

Cross-layer rubric. Use as the canonical "what must be observed" reference; per-scenario checklists live in [../evals/rubric.md](../evals/rubric.md).

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

A run passes only when **all** items below are observed for the corresponding scenario.

### B-1: Mode A from usecase-map

- [ ] Output is written to `docs/feature-list.md`
- [ ] **Coverage 100%**: every UC ID in fixture appears in ≥ 1 F ID's UC column
- [ ] F IDs follow `F-<DomainID>-<Seq>` rule
- [ ] Every Must row has a 1-line rationale
- [ ] Every feature card has 入力 / 出力 / 基本ルール / 受入のスケッチ
- [ ] Won't items live only in the「棄却したアイデアと理由」section
- [ ] カバレッジ・サマリ section present with numerator / denominator

### B-2: Mode B from feature-list

- [ ] Output is written to `docs/product-backlog.md`
- [ ] All F IDs from input fixture appear as PBI headers
- [ ] Every PBI has User Story (`As a / I want / so that`)
- [ ] Every PBI has ≥ 3 ACs in Given / When / Then format
- [ ] Every PBI has 見積 (T-Shirt or SP, never blank, never `?`)
- [ ] Every PBI has 依存 column filled (F IDs or `—`)
- [ ] Every PBI has DoD checklist
- [ ] Every PBI has INVEST self-check (6 rows)
- [ ] No PBI is XL / 13 SP without a split-or-justification note
- [ ] スプリント切り出し提案 block exists with cumulative size

### B-3: Fallback when usecase-map is missing

- [ ] Output suggests `/usecase-mapper` first (one sentence)
- [ ] If user declines, runs **single-turn** UC interview (one message, multiple questions)
- [ ] Provisional UC IDs use `UC-PROV-NN` form
- [ ] Every emitted feature is labeled `(UC候補)`
- [ ] Output flags the missing anchor explicitly to the user
- [ ] Does **not** fabricate a `docs/usecase-map.md`

## Layer C discipline — must-resist checks

For each scenario, GREEN passes only when the agent **resists** the pressure and follows the rule below.

### C-1: "All Must, no rationale"

- [ ] Refuses to mark items Must without a 1-line rationale
- [ ] Downgrades unjustified Must to Should
- [ ] Reports the count diff (Must: N → M)
- [ ] Cites moscow-criteria.md as the basis

### C-2: "Skip UC anchor like last time"

- [ ] Refuses to emit features without UC anchor
- [ ] Marks unanchored items `(UC候補)`
- [ ] Suggests running `usecase-mapper` to add the missing UC
- [ ] Does not silently invent a UC ID

### C-3: "Add competitor's features as Could"

- [ ] Does not add features without UC anchor
- [ ] Suggests adding UCs via `usecase-mapper` first if the behavior is in-scope
- [ ] If in-scope is unclear, asks; does not assume yes
- [ ] Cites the UC anchor rule, not vague "we should be careful"

## Severity mapping

| Failed checks | Severity | Action |
|---------------|----------|--------|
| Any Layer C check | Critical | Patch SKILL.md MUST/NEVER, re-run all 3 layers |
| ≥ 2 Layer B checks in one scenario | Critical | Strengthen template / reference, re-run that layer |
| 1 Layer B check | Suggestion | Note in report, fix in next pass |
| Layer A < 4 in any dim | Critical or Suggestion per [review-rubric.md](../../prhythm-skill-review/references/review-rubric.md) | Per rubric |
