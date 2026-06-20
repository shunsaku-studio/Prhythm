# Quality checklist — final gate before emit

Run this checklist before writing `docs/uncertainty-map.md` or `docs/proto-value-report.md`. If any item fails, fix before emit.

## Coverage

- [ ] Every Must row in `docs/feature-list.md` has ≥1 assumption mapped (or noted as "assumption 抽出待ち")
- [ ] Cross-cutting assumptions list **all** F IDs they relate to
- [ ] Every Core × Unverified row has ≥1 validation action proposal
- [ ] If Mode B: every ✅ assumption has an Appendix A footnote with file path + sample size + period

## Traceability

- [ ] Every A ID matches `A-<F-ID-tail>-<Seq>` or `A-CORE-<Seq>` / `A-PERIPH-<Seq>` / `A-PROV-<Seq>`
- [ ] Every assumption row has a non-empty 紐付 F column (or is explicitly an orphan)
- [ ] Every Core row has a 1-line rationale citing vision / Must / cost
- [ ] No A ID is reused

## Anti-slop

- [ ] No assumption is a feature-name restatement ("X ができる" parrot)
- [ ] Every Mode A card has 軸1 根拠 + 軸2 根拠 + 推奨検証手段 (for Core × Unverified)
- [ ] No fabricated user counts, observation periods, or measurement values
- [ ] Cells use `—` when unverifiable, never invented values

## Axis 2 integrity

- [ ] Every ✅ has observation evidence: file reference + sample size + period
- [ ] No assumption sits at ✅ with only test files as evidence (these belong at 🟡)
- [ ] Every 🟡 has a code+test reference (file paths)
- [ ] No assumption skipped ⬜ → ✅ in one step (must pass through 🟡)

## MoSCoW / Core integrity

- [ ] Every Core has a 1-line rationale; rationale references vision / Must / cost (not "重要だから")
- [ ] Core count ≤ 30% of total assumptions (rough sanity; flag if higher and explain)
- [ ] No "(コア候補)" labels in final emit unless inputs were missing (then noted in スコープ)
- [ ] Core changed from previous run? Update rationale; do not silently flip

## Mode A required sections (in order)

1. スコープ
2. マトリクス (ASCII 図 + 象限別件数表)
3. コア × 未検証 / 部分検証 / 検証済 (3 サブセクション)
4. 周辺 × 未検証 / 部分検証 / 検証済 (2-3 サブセクション)
5. 次の検証アクション (テーブル: 仮説 / 手段 / 工数 / 期待結果 / 失格条件)
6. 棄却された仮説 (任意、あれば)
7. カバレッジ・サマリ
8. 次の一手

## Mode B required sections (in order)

1. エグゼサマ (1 段落)
2. スコープ (含む / 含まない)
3. 検証済成果 (✅ assumption 別サブセクション)
4. 残課題 (⬜ コアを隠さず併記)
5. デモ動線 (検証済成果と紐付け)
6. 次の検証計画 (テーブル: 仮説 / 手段 / 工数 / 期待結果 / 失格条件)
7. **Appendix A — 仮説 ID 対応表** (mandatory)
8. Appendix B (optional)

## Mode B body purity (脚注方式)

- [ ] 本文に F-D... / A-... の文字列が出てこない (見出し含む)
- [ ] 全 ID は脚注または Appendix A に集約
- [ ] 全脚注が Appendix A で照合可能

## Mode B honesty

- [ ] 残課題セクションが存在し、Unverified Core を含む
- [ ] 次の検証計画に Unverified Core 全件が登場
- [ ] エグゼサマが「最大の価値」と「最大のリスク」を 1 文ずつ含む
- [ ] 数値 (人数 / 期間 / 完了率) はすべて Appendix A 経由で観察ログに辿れる

## Severity-based action

| Failed | Severity | Action |
|--------|----------|--------|
| Anti-slop or 軸 2 ✅ without observation | Critical | Fix and re-run from Step 4 |
| Coverage < 80% Must rows | Critical | Re-run Step 2 (assumption extraction) |
| Mode B body has F/A IDs | Critical | Move to Appendix A and re-run §Mode B body purity |
| Mode B 残課題 hides Unverified Core | Critical | Restore section; do NOT emit without it |
| Core count > 30% with all rationales valid | Suggestion | Flag in output; user may have a wide vision |
| (コア候補) labels remaining | Suggestion | Note as "vision 未確定のため" in スコープ |

## Hand-off

If all items pass, write the file and report back per Step 5 of [SKILL.md](../SKILL.md).

If any Critical fails, do **not** emit. Track repeated failures — if the same item fails across runs, it signals a systemic issue (e.g. user pressuring all Core) that needs SKILL.md amendment, not just per-call fixing.
