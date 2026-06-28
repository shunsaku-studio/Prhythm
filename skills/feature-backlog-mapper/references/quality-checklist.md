# Quality checklist — final gate before emit

Run this before writing the three artifacts. If any item fails, fix before emit.

## Internal linkage (the only required linkage)

- [ ] Every PBL story references **≥1 `F-NN`** that exists in the feature list
- [ ] Every AC references its `S-NN` and (when applicable) `F-NN`, all of which exist
- [ ] No dangling IDs across the three files (no story pointing at a deleted feature, no AC orphaned)
- [ ] `F` / `S` / `AC` IDs are unique and never reuse a retired ID
- [ ] The skill did **not** require or depend on another skill's output to run

## Feature list (① project view)

- [ ] **No 優先度 / MoSCoW column** anywhere in the feature list
- [ ] **No acceptance / 受入 field** in any feature card
- [ ] Every card has 概要 / 入力 / 出力 / 基本ルール / 制約・前提
- [ ] 紐付 UC column present **only** when `docs/usecase-map.md` exists (otherwise omitted, not faked)
- [ ] No card whose 概要 is only "ユーザーが〜できる" or "システムが〜する"

## PBL (② product view)

- [ ] Stories are in **「<主語> は <振る舞い> できる」** form; subject is a concrete actor, never bare「ユーザー」
- [ ] Stories are **ordered top = highest priority**, and the file states 「順序＝優先度」
- [ ] No MoSCoW / priority label column (labels, if requested, are an optional annotation only)
- [ ] No acceptance criteria embedded in the PBL
- [ ] No implementation leak (API paths, routes) in story text

## Acceptance criteria (③ verification view)

- [ ] Each story has **≥3 AC**, covering happy / ≥1 failure / ≥1 boundary
- [ ] AC use Given / When / Then; `Then` is observable (URL / message / state), never "正常に動く"
- [ ] One observable outcome per AC (no chained When/Then)

## Anti-slop & fabrication

- [ ] Cells use `—` when unverifiable; no invented API paths or screen routes
- [ ] Guesses are not presented as confirmed facts

## Output structure (required sections, in order)

### ① `docs/feature-list.md`
1. スコープ
2. 機能インベントリ
3. 機能カード
4. カバレッジ・サマリ

### ② `docs/product-backlog.md`
1. スコープ（順序＝優先度の明記を含む）
2. バックログ（優先度順）
3. カバレッジ・サマリ
（ストーリー詳細は任意）

### ③ `docs/acceptance-criteria.md`
1. インデックス
2. ストーリー／機能ごとの AC
3. カバレッジ・サマリ

## Hand-off

If all items pass, write the files and report back per Step 4 of [SKILL.md](../SKILL.md).

If any item fails, do not emit. Fix and re-run this checklist. Track repeated failures — they signal a systemic issue (e.g. priority leaking into the feature list, or acceptance creeping into the PBL) that needs SKILL.md amendment, not just per-call fixing.
