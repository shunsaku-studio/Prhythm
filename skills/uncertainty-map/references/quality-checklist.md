# Quality checklist — final gate before emit

Run this checklist before writing `docs/uncertainty-map.md`. If any item fails, fix before emit.

## Coverage

- [ ] Every high-priority feature (top of `docs/feature-list.md` / PBL, when present) has ≥1 assumption mapped (or noted "assumption 抽出待ち")
- [ ] Cross-cutting assumptions list **all** F IDs they relate to (or 紐付 F = `—` when standalone)
- [ ] Every Core × Unverified row has ≥1 validation action proposal

## Traceability

- [ ] Every A ID matches `A-<Seq>` (optionally `-T<n>` / `-V<n>`)
- [ ] Every assumption row has a 紐付 F column with `F-NN`(s) or `—`
- [ ] Every Core row has a 1-line rationale citing vision / 高優先度の機能 / cost
- [ ] No A ID is reused
- [ ] The run did **not** require another skill's output to complete (standalone)

## Anti-slop

- [ ] No assumption is a feature-name restatement ("X ができる" parrot)
- [ ] Every assumption card has 軸1 根拠 + 軸2 根拠 + 推奨検証手段 (for Core × Unverified)
- [ ] No fabricated user counts, observation periods, or measurement values
- [ ] Cells use `—` when unverifiable, never invented values

## Axis 2 integrity

- [ ] Every ✅ has observation evidence: file reference + sample size + period
- [ ] No assumption sits at ✅ with only test files as evidence (these belong at 🟡)
- [ ] Every 🟡 has a code+test reference (file paths)
- [ ] No assumption skipped ⬜ → ✅ in one step (must pass through 🟡)

## Core integrity

- [ ] Every Core has a 1-line rationale; rationale references vision / 高優先度の機能 / cost (not "重要だから")
- [ ] Core count ≤ 30% of total assumptions (rough sanity; flag if higher and explain)
- [ ] No "(コア候補)" labels in final emit unless inputs were missing (then noted in スコープ)
- [ ] Core changed from previous run? Update rationale; do not silently flip

## Visualization & required sections (in order)

- [ ] The visualization is present: Mermaid `quadrantChart` **and** the ASCII fallback **and** the per-quadrant counts table

1. スコープ
2. マトリクス（可視化: quadrantChart + ASCII 図 + 象限別件数表）
3. コア × 未検証 / 部分検証 / 検証済 (3 サブセクション)
4. 周辺 × 未検証 / 部分検証 / 検証済 (2-3 サブセクション)
5. 次の検証アクション (テーブル: 仮説 / 手段 / 工数 / 期待結果 / 失格条件)
6. 棄却された仮説 (任意、あれば)
7. カバレッジ・サマリ
8. 次の一手

## Severity-based action

| Failed | Severity | Action |
|--------|----------|--------|
| Anti-slop or 軸 2 ✅ without observation | Critical | Fix and re-run from Step 3 |
| Coverage of high-priority features too low | Critical | Re-run Step 1 (assumption extraction) |
| Visualization missing | Critical | Add quadrantChart + ASCII before emit |
| Core count > 30% with all rationales valid | Suggestion | Flag in output; user may have a wide vision |
| (コア候補) labels remaining | Suggestion | Note as "vision 未確定のため" in スコープ |

## Hand-off

If all items pass, write the file and report back per Step 4 of [SKILL.md](../SKILL.md).

If any Critical fails, do **not** emit. Track repeated failures — if the same item fails across runs, it signals a systemic issue (e.g. user pressuring all Core) that needs SKILL.md amendment, not just per-call fixing.
