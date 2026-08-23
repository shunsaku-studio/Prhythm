# Intake

Read before the layer draft. Do not fill RACI in this step.

## Sources (none mandatory except scope + keys)

Gather in this order:

1. User utterance — scope, named people, orgs
2. Hearing / vision notes in the thread or `docs/`
3. `docs/delivery-team-plan.md` if it already exists (diff-update)
4. Single-turn questions when keys are missing — batch them, one turn

Do not block on `delivery-phase-plan` or `uncertainty-map`.

## Fields

| Field | If missing |
|-------|------------|
| Case scope | Ask once. If still blank, stop — do not invent a product |
| Customer keys | Role labels + `※推測` |
| 瞬作 entry | Default: proto改修 · 計測実装 · 分析レポート. Mark `※推測` |
| Named Owner | Role label (`人事企画リード`) + `※推測`. Do not invent a full name |

## Diff-update

If `docs/delivery-team-plan.md` exists and the user did not say ゼロから:

- Keep existing role names
- Surface 新規 / 変更 / 削除 of lanes and RACI rows
- Do not reuse a retired decision-row name for a different decision
