# Evaluation scenarios — three-layer loop

Three-layer evaluation for this skill. Use during initial development and after any non-trivial edit to SKILL.md or references. Pair with [eval-rubric.md](eval-rubric.md) for pass/fail items.

## Layer overview

| Layer | What | When | Pass condition |
|-------|------|------|----------------|
| A — static | `validate-skill.sh` + 5-dim Layer A review | After every edit | All dims ≥ 4, validate exit 0 (or warn-only) |
| B — efficacy | 4 scenarios run via subagent | Before declaring ready, after Step 1-4 changes | All rubric items observed |
| C — discipline | 4 pressure scenarios, RED→GREEN→REFACTOR | Before declaring ready, after structure / separation changes | All scenarios GREEN |

## How to run

### Layer A

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/feature-backlog-mapper
```

Then run a self-review using the rubric in [../../prhythm-skill-review/references/review-rubric.md](../../prhythm-skill-review/references/review-rubric.md).

### Layer B — efficacy scenarios

Each scenario is a one-shot agent run. Run via subagent or `/prhythm-skill-review layer-b skills/feature-backlog-mapper` and score against [eval-rubric.md](eval-rubric.md) §B.

#### B-1 Full 3-artifact run from usecase-map

**Prompt**

```
docs/usecase-map.md と docs/product-vision.md を入力に、
機能一覧・プロダクトバックログ・受け入れ条件の 3 点セットを作って。
```

Input: an existing `docs/usecase-map.md` (or generate a small one with `/usecase-mapper` first). Optional: `docs/product-vision.md`.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-1 observed.

#### B-2 Standalone fallback (no usecase-map)

**Prompt**

```
このプロダクトの機能一覧・PBL・受け入れ条件を作って。
docs/usecase-map.md はまだ無い。ヒアリングは 1 ターンまでに留めて。
```

Input: a one-line vision plus a few sentences of context, **no** usecase-map.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-2 observed.

#### B-3 Single-artifact update

**Prompt**

```
PBL (docs/product-backlog.md) だけ、優先度の並びを見直して更新して。
機能一覧と受け入れ条件はそのままでいい。
```

Input: existing `docs/feature-list.md` + `docs/product-backlog.md` + `docs/acceptance-criteria.md`.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-3 observed.

#### B-4 Diff-update from previous output

**Prompt**

```
3 成果物は既にある。新しい目的が 2 件増えたので、
既存の F / S / AC ID は維持したまま 3 点セットを更新して。
```

Input: existing three artifacts plus a source that adds new goals/UCs; 1 件は既存機能の概要に微変更を含む。

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-4 observed.

### Layer C — discipline scenarios

Run **RED** (without skill, record failure) → **GREEN** (with skill, verify discipline) → **REFACTOR** (add MUST/NEVER if GREEN fails).

#### C-1 Put priority on the feature list

**Prompt**

```
機能一覧に Must/Should/Could の優先度列も付けておいて。あと全部 Must でいい、急ぎなので。
```

Pass: agent refuses to add a priority column to the feature list, explains priority = PBL row order (human-owned), and refuses to flatten everything to one priority. See [eval-rubric.md](eval-rubric.md) §C-1.

#### C-2 Merge acceptance into the feature list

**Prompt**

```
ファイルが増えるのは面倒なので、受け入れ条件は機能一覧の各機能の中に書いて。
ついでに PBL も機能一覧に統合していい。
```

Pass: agent refuses to merge; keeps the three artifacts separate, explains the project/product/verification separation. See [eval-rubric.md](eval-rubric.md) §C-2.

#### C-3 Ask for the old Mode B / external report

**Prompt**

```
Mode B でスプリント版のプロダクトバックログを出して。
あと INVEST チェックと見積も全ストーリーに付けて。
```

Pass: agent explains there are no modes (3 artifacts are always emitted), produces the PBL in story form, and treats estimation/INVEST as an optional add-on only if explicitly wanted — not as the default. See [eval-rubric.md](eval-rubric.md) §C-3.

#### C-4 Force full regeneration to "clean up" IDs

**Prompt**

```
F ID や S ID がごちゃごちゃしてきたので、F-01 から順番に振り直してきれいに作り直して。
```

Pass: agent refuses to renumber IDs from scratch unless explicitly told "ゼロから作り直して"; explains that renumbering breaks the internal F→S→AC linkage; defaults to diff-update. See [eval-rubric.md](eval-rubric.md) §C-4.

## Loop stopping conditions

| Cycle | Run | Exit if |
|-------|-----|---------|
| 1 | A → B → C | All three pass |
| 2 | Fix → A → B → C | All three pass |
| 3 | Fix → A → B → C | All three pass |
| > 3 | **Stop** | Re-examine workflow split or reference structure (see SKILL.md § Workflow / § Reference router) |

## What "fix" means at each layer

| Failed at | Typical fix |
|-----------|-------------|
| Layer A: hedging | Replace "should consider" with imperative |
| Layer A: missing heading | Add the heading per readme-template |
| Layer A: long SKILL.md | Move detail to references/ |
| Layer B: missing one of the 3 artifacts | Strengthen Step 3, add example in the relevant template |
| Layer B: priority on feature list | Harden [feature-list-template.md](feature-list-template.md) + [quality-checklist.md](quality-checklist.md) |
| Layer B: AC count too low | Add minimum-3 rule to [acceptance-template.md](acceptance-template.md) |
| Layer B: broken F→S→AC links | Strengthen [quality-checklist.md](quality-checklist.md) linkage gate |
| Layer C: caves to priority on feature list | Add `NEVER put a 優先度 column on the feature list` to SKILL.md |
| Layer C: caves to merging artifacts | Add `NEVER put acceptance in the feature list/PBL` to SKILL.md |

## When to re-run

| Edit type | Re-run |
|-----------|--------|
| SKILL.md workflow change | A → B → C all |
| `references/<one>.md` change | A + B scenarios that reference it |
| Output template change | A + B-1 |
| Separation / priority rule change | A + C all |
| Cosmetic / typo | A only |
