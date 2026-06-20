# Quality checklist — final gate before emit

Run this checklist before writing `docs/feature-list.md` or `docs/product-backlog.md`. If any item fails, fix before emit.

## Coverage

- [ ] Every UC ID in `docs/usecase-map.md` ユースケース一覧 appears in **at least one** F ID's UC column
- [ ] Uncovered UCs are listed in the **カバレッジ・サマリ** with reason: `仕様確認待ち` / `次フェーズ` / `Won't`
- [ ] Cross-cutting features list **all** UC IDs they serve (not just one)

## Traceability

- [ ] Every feature row has a non-empty UC ID column (or `(UC候補)`)
- [ ] Every PBI in Mode B references its F ID
- [ ] F IDs are unique and follow `F-<DomainID>-<Seq>` format
- [ ] PBI dependencies use F IDs, not free-text feature names

## Anti-slop

- [ ] No card whose 概要 is only "ユーザーが〜できる" or "システムが〜する"
- [ ] Every Mode A card has 入力 / 出力 / 基本ルール / 受入のスケッチ
- [ ] Every Mode B PBI has User Story + AC + 見積 + DoD + INVEST
- [ ] AC use Given / When / Then, not "正常に動くこと"

## MoSCoW integrity

- [ ] Every Must has a 1-line rationale
- [ ] Every Won't has a 1-line reason
- [ ] Won't items are **not** in the main inventory table
- [ ] Won't items **are** in the「棄却したアイデアと理由」section
- [ ] Must rationale references vision / 制約 / コスト, not the feature name

## INVEST (Mode B only)

For each PBI, check:

| Letter | Check |
|--------|-------|
| **I**ndependent | Can be developed without waiting on another PBI in the same sprint |
| **N**egotiable | Implementation details are not locked into AC |
| **V**aluable | The "so that" clause is clearly user-valuable |
| **E**stimable | A concrete size is assigned (not "?") |
| **S**mall | Fits in one sprint with buffer (no XL / no 13 SP) |
| **T**estable | Each AC is observable / verifiable |

If any letter fails:

- **I** fail → reorder or split
- **N** fail → soften AC, move impl details to DoD or notes
- **V** fail → rewrite story or drop the PBI
- **E** fail → add AC or run a spike
- **S** fail → split per [estimation-guide.md](estimation-guide.md)
- **T** fail → rewrite ACs in Given / When / Then

## Output structure

### Mode A required sections (in order)

1. スコープ
2. 機能インベントリ
3. 機能カード (Must → Should → Could)
4. 棄却したアイデアと理由
5. カバレッジ・サマリ
6. 次の一手

### Mode B required sections (in order)

1. スコープ
2. バックログインデックス
3. PBI 詳細
4. スプリント切り出し提案
5. カバレッジ・サマリ

## Hand-off

If all items pass, write the file and report back per Step 5 of [SKILL.md](../SKILL.md).

If any item fails, do not emit. Fix and re-run this checklist. Track repeated failures — they signal a systemic issue (e.g. user pressuring all Must) that needs SKILL.md amendment, not just per-call fixing.
