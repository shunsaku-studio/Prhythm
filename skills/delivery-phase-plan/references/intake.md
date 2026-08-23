# Intake

Read before the phase spine. Do not fill 矢羽 in this step.

## Sources (none mandatory except north-star + scale)

Gather in this order:

1. User utterance — metric, scale, dates
2. `docs/delivery-team-plan.md` — role lanes
3. `docs/uncertainty-map.md` — Core × Unverified rows (A IDs only; do not re-rank)
4. Vision / hearing notes for the current metric
5. Single-turn questions when metric or scale is missing — batch them, one turn

Do not block on team-plan or the map. Missing lanes → infer 2–4 + 瞬作, mark `※推測`.

## Fields

| Field | If missing |
|-------|------------|
| North-star current → target | Ask once for the blank side. Still blank → stop |
| Pilot scale | Ask once. Still blank → stop |
| Lanes | Infer from orgs in the thread + 瞬作. Mark `※推測` |
| Hypotheses | Leave `—`. Do not invent A IDs |

## Diff-update

If `docs/delivery-phase-plan.md` exists and the user did not say ゼロから:

- Keep phase numbers unless the user renamed the spine
- Surface 新規 / 変更 / 削除 of arrows and gate judgments
- Do not silently drop a miss move on the last gate
