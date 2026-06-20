# Evaluation scenarios — index and runbook

Three-layer evaluation loop for this skill. Use during initial development and after any non-trivial edit to SKILL.md or references.

## Layer overview

| Layer | What | When | Pass condition |
|-------|------|------|----------------|
| A — static | `validate-skill.sh` + 5-dim Layer A review | After every edit | All dims ≥ 4, exit 0 (or warn-only) |
| B — efficacy | 3 scenarios with fixtures, run via subagent | Before declaring ready, after Step 4-5 changes | All `evals/rubric.md` checks observed |
| C — discipline | 3 pressure scenarios, RED→GREEN→REFACTOR | Before declaring ready, after MoSCoW / UC anchor changes | All scenarios GREEN |

Detailed runbooks: [../evals/scenarios.md](../evals/scenarios.md). Pass/fail items: [../evals/rubric.md](../evals/rubric.md). Inputs: [../evals/fixtures/](../evals/fixtures/).

## How to run

### Layer A

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/feature-backlog-mapper
```

Then run a self-review using the rubric in [../../prhythm-skill-review/references/review-rubric.md](../../prhythm-skill-review/references/review-rubric.md).

### Layer B

For each scenario in [../evals/scenarios.md](../evals/scenarios.md) §B:

1. Spawn a subagent with the scenario prompt and the fixture path
2. Have the subagent invoke `feature-backlog-mapper` (or simulate by reading SKILL.md)
3. Capture the output
4. Score against [../evals/rubric.md](../evals/rubric.md) §B-<n>
5. Save the report at `evals/reports/<YYYY-MM-DD>-layer-b-<scenario>.md`

### Layer C

For each scenario in [../evals/scenarios.md](../evals/scenarios.md) §C:

1. **RED** — Spawn a subagent without this skill loaded; record the failure (do they cave to the pressure?)
2. **GREEN** — Spawn a subagent with this skill; verify the discipline holds
3. **REFACTOR** — If GREEN fails, add a MUST or NEVER line to SKILL.md and re-run

Save the report at `evals/reports/<YYYY-MM-DD>-layer-c-<scenario>.md`.

## Loop stopping conditions

| Cycle | Run | Exit if |
|-------|-----|---------|
| 1 | A → B → C | All three pass |
| 2 | Fix → A → B → C | All three pass |
| 3 | Fix → A → B → C | All three pass |
| > 3 | **Stop** | Re-examine workflow split or reference structure (see SKILL.md § Workflow / § Reference router) |

After 3 cycles, do not keep patching. Step back to the design.

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

## Where to record results

- `evals/reports/<date>-<layer>-<scenario>.md` — per-run detail
- PR body — short summary with pass / fail per layer; cite report file paths
