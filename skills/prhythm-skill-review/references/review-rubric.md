# Layer A Review Rubric

Score each dimension 1–5. Use observable evidence from SKILL.md and README.md.

## Dimensions

### Discoverability (weight: 20%)

| Score | Criteria |
|-------|----------|
| 5 | `name` matches directory; description is third-person, states WHAT + WHEN with specific trigger terms |
| 4 | Minor gaps in trigger terms or description clarity |
| 3 | Description vague or missing WHEN; trigger terms generic |
| 2 | Wrong person (I/you), or name mismatch |
| 1 | Missing frontmatter or description under 20 chars |

### Conciseness (weight: 25%)

| Score | Criteria |
|-------|----------|
| 5 | SKILL.md under 300 lines; no textbook explanations; 2–3 focused modules; details in references/ |
| 4 | Under 500 lines; minor redundancy or one verbose section |
| 3 | 300–500 lines with noticeable filler or duplicate instructions |
| 2 | Over 500 lines or heavy general-knowledge padding |
| 1 | Mostly generic content the model already knows |

### Instruction quality (weight: 25%)

| Score | Criteria |
|-------|----------|
| 5 | Imperative verbs; If → Then branches; MUST/NEVER where needed; no hedging |
| 4 | Mostly imperative; one or two vague modals |
| 3 | Mixed passive/suggestive language; unclear defaults |
| 2 | Frequent hedging (should, might, try to, you may want) |
| 1 | No actionable procedure; purely informational |

**Hedging patterns to flag:** `should consider`, `try to`, `might`, `you may want`, `it can be helpful`, `consider`

### Structure (weight: 20%)

| Score | Criteria |
|-------|----------|
| 5 | Progressive disclosure; file refs one level deep; forward slashes; scripts state execute vs read |
| 4 | One minor structural issue |
| 3 | Deeply nested refs, Windows paths, or missing script intent |
| 2 | Multiple anti-patterns from create-skill checklist |
| 1 | Unnavigable or broken file references |

### Observability (weight: 10%)

| Score | Criteria |
|-------|----------|
| 5 | Success/failure conditions verifiable from transcript or artifacts |
| 4 | Mostly observable; one vague completion criterion |
| 3 | Some steps lack clear done-state |
| 2 | Workflow skill with no success criteria |
| 1 | No way to tell if the agent followed the skill |

Skip or mark N/A for reference-only skills with no workflow.

## README 利用メリット（review / standardize）

| Score | Criteria |
|-------|----------|
| 5 | Outcomes for user/team; no implementation detail; each bullet answers "what becomes better?" |
| 4 | Mostly outcome-focused; one bullet drifts into HOW |
| 3 | Mix of value and implementation (phases, scripts, naming rules) |
| 2 | Mostly trigger terms, commands, or SKILL.md mechanics |
| 1 | Missing, generic, or unreadable to humans |

Flag as **Suggestion** when README 利用メリット scores ≤ 3. Reference: [readme-template.md](readme-template.md).

## README 利用シーン（review / standardize）

| Score | Criteria |
|-------|----------|
| 5 | User situations/problems; aligned with 利用メリット; no commands or technical ops |
| 4 | Mostly situation-focused; one bullet drifts into HOW or misaligned with メリット |
| 3 | Mix of situations and technical operations (add type, re-validate, run phase) |
| 2 | Mostly commands, trigger terms, or SKILL.md mechanics |
| 1 | Missing, generic, or disconnected from メリット |

Flag as **Suggestion** when README 利用シーン scores ≤ 3. Reference: [readme-template.md](readme-template.md).

## Verdict

| Verdict | Rule |
|---------|------|
| **Approve** | All scored dimensions ≥ 4 (N/A excluded) |
| **Revise** | Any dimension = 3, none ≤ 2 |
| **Major rewrite** | Any dimension ≤ 2 |

## Finding severity

| Level | Use when |
|-------|----------|
| **Critical** | Must fix before merge; breaks discovery, safety, or compliance |
| **Suggestion** | Improves clarity, tokens, or consistency |
| **Strength** | Worth keeping; cite as positive example |

## Weighted score (optional)

```
score = (D×0.20 + C×0.25 + I×0.25 + S×0.20 + O×0.10) / sum(weights for non-N/A dimensions)
```

Round to one decimal. Report alongside verdict.
