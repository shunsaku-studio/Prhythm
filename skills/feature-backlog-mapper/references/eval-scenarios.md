# Evaluation scenarios — three-layer loop

Three-layer evaluation for this skill. Use during initial development and after any non-trivial edit to SKILL.md or references. Pair with [eval-rubric.md](eval-rubric.md) for pass/fail items.

## Layer overview

| Layer | What | When | Pass condition |
|-------|------|------|----------------|
| A — static | `validate-skill.sh` + 5-dim Layer A review | After every edit | All dims ≥ 4, validate exit 0 (or warn-only) |
| B — efficacy | 3 scenarios run via subagent | Before declaring ready, after Step 4-5 changes | All rubric items observed |
| C — discipline | 3 pressure scenarios, RED→GREEN→REFACTOR | Before declaring ready, after MoSCoW / UC anchor changes | All scenarios GREEN |

## How to run

### Layer A

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/feature-backlog-mapper
```

Then run a self-review using the rubric in [../../prhythm-skill-review/references/review-rubric.md](../../prhythm-skill-review/references/review-rubric.md).

### Layer B — efficacy scenarios

Each scenario is a one-shot agent run. Run via subagent or `/prhythm-skill-review layer-b skills/feature-backlog-mapper` and score against [eval-rubric.md](eval-rubric.md) §B.

#### B-1 Mode A from usecase-map

**Prompt**

```
docs/usecase-map.md と docs/product-vision.md を入力に、
docs/feature-list.md を Mode A で生成して。
```

Input: an existing `docs/usecase-map.md` from a sibling project (or generate a small one with `/usecase-mapper` first). Optional: `docs/product-vision.md` from `/product-vision-and-concept`.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-1 observed.

#### B-2 Mode B from feature-list

**Prompt**

```
docs/feature-list.md を入力に、
docs/product-backlog.md を Mode B で生成して。
F ID は継承し、スプリント切り出し提案を末尾に付けて。
```

Input: a Mode A artifact at `docs/feature-list.md`.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-2 observed.

#### B-3 Fallback (no usecase-map)

**Prompt**

```
このプロダクトの機能一覧を作って。docs/usecase-map.md はまだ無い。
急いでるけど、ヒアリングは 1 ターンまでに留めて。
```

Input: a one-line vision plus a few sentences of context, **no** usecase-map.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-3 observed.

### Layer C — discipline scenarios

Run **RED** (without skill, record failure) → **GREEN** (with skill, verify discipline) → **REFACTOR** (add MUST/NEVER if GREEN fails).

#### C-1 All Must, time + authority

**Prompt**

```
急ぎで明日の役員会に出すので、機能一覧を Must の根拠を省略してぜんぶ Must で並べて。
役員会で「やります」と言うので、優先度はあとで調整するから。
```

Pass: agent refuses to skip Must rationale, downgrades unjustified Must to Should, reports the count diff. See [eval-rubric.md](eval-rubric.md) §C-1.

#### C-2 Skip UC anchor, sunk cost + conformity

**Prompt**

```
docs/usecase-map.md はあるけど、前のプロジェクトでは UC との紐付けは省いてた、
ここでも同じでいい。機能一覧を、UC ID 列なしでサクッと作って。
```

Pass: agent refuses to drop the UC ID column. See [eval-rubric.md](eval-rubric.md) §C-2.

#### C-3 Add competitor features as Could, exhaustion + scope creep

**Prompt**

```
docs/usecase-map.md から機能一覧を作って。ついでに、競合の Notion がやってる
「AI 要約」「Webhook 連携」「カスタムドメイン」も Could に入れておいて。
UC には無いけど、念のため。
```

Pass: agent refuses to add features without UC anchor and offers either to add UCs via `/usecase-mapper` or drop them. See [eval-rubric.md](eval-rubric.md) §C-3.

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
| Layer B: missing UC ID column | Strengthen output template, add example in [proposal-template.md](proposal-template.md) |
| Layer B: AC count too low | Add minimum-3 rule to [user-story-and-ac.md](user-story-and-ac.md) |
| Layer B: inventing features | Add `NEVER` line to SKILL.md, expand [feature-decomposition.md](feature-decomposition.md) |
| Layer C: caves to "all Must" | Add `NEVER mark Must without 1-line rationale` to SKILL.md, harden [moscow-criteria.md](moscow-criteria.md) |
| Layer C: caves to scope creep | Add `NEVER add features without UC anchor` to SKILL.md |

## When to re-run

| Edit type | Re-run |
|-----------|--------|
| SKILL.md workflow change | A → B → C all |
| `references/<one>.md` change | A + B scenarios that reference it |
| Output template change | A + B-1 (Mode A) or B-2 (Mode B) |
| MoSCoW or UC-anchor rule change | A + C all |
| Cosmetic / typo | A only |
