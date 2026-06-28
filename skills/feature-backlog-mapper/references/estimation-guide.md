# Estimation and split rules (optional add-on)

> **Optional.** Estimation and sprint slicing are **not** part of the default three-artifact output. Use this only when the user explicitly asks for sprint-readiness. When used, add a clearly-marked optional section to the PBL — do not bloat the minimal story list.

Estimate at the story level. Split before estimating XL.

## Two scales

Pick one per backlog. Stay consistent.

### T-Shirt sizes

| Size | Rough effort | Typical scope |
|------|--------------|---------------|
| XS | 0.5 day | One config change, one copy edit, one trivial endpoint |
| S | 1 day | One CRUD endpoint with simple validation |
| M | 2-3 days | One feature with a small UI + 2-3 ACs of logic |
| L | 4-5 days | One feature with non-trivial state, integration, or migration |
| XL | > 5 days | **Split required.** Anything that can't fit in one sprint with buffer |

### Story Points (Fibonacci)

`1, 2, 3, 5, 8, 13` (skip larger).

| Size | T-Shirt equivalent |
|------|--------------------|
| 1 | XS |
| 2 | S |
| 3 | M (small) |
| 5 | M (large) / L (small) |
| 8 | L |
| 13 | XL — **Split required** |

Treat SP > 13 the same as XL: split.

## Split triggers

Split a story when **any** of these is true:

- T-Shirt = XL or SP ≥ 13
- More than one sprint of work
- AC count ≥ 7 (the story is doing too much)
- Multiple actors with different needs in one story
- Crosses two unrelated feature areas in one story

## Split patterns

| Pattern | Example | Result |
|---------|---------|--------|
| **Workflow split** | Invite member → Email → Accept | 3 stories along the user journey |
| **Rule split** | Login (happy path) vs Lockout (rate-limit) | 2 stories: core + protection |
| **Data split** | Search (text) vs Search (filters) vs Search (sort) | Ship text first |
| **CRUD split** | Article: Read+List first, then Create, then Edit/Delete | Validate read before mutating |
| **Spike split** | Unknown integration → Spike (timebox) + Implementation | Reduce risk before estimating |

## Sprint slicing for the「スプリント切り出し提案」block

After all stories are estimated:

1. Sort by PBL order (top = highest priority) and dependencies (topological)
2. Group into sprints assuming a default velocity:
   - 1-person team: 5 day / sprint
   - 2-person team: 9 day / sprint
   - Use SP velocity if available
3. Show cumulative size and dependency chain per sprint
4. Identify the "Phase 1 stop line" — the smallest sprint set that covers the top of the PBL

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Estimate without AC written | Write AC first; AC count drives size feel |
| Mixing units (some stories in T-Shirt, others in SP) | Pick one and rewrite |
| XL stories left unsplit | Block emit; split before continuing |
| Sprint capacity exceeds the team's actual velocity | Halve and explain that Phase 1 will need Sprint 3 |
| Dependencies not surfaced | Walk back through F ID list; every story lists its required predecessors |

## Hand-off

After estimation:

- Every story has a size that is not XL / not 13 SP
- Sprint切り出し提案 contains 2-4 sprints with cumulative totals
- Phase 1 stop line is identifiable

Continue to [quality-checklist.md](quality-checklist.md) for final checks before emit.
