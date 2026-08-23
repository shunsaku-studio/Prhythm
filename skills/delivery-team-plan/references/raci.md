# RACI grammar

Read after the user confirms layers. Letters: **A 決裁 / R 実行 / C 相談 / I 報告**.

## Rules

- One **A** per row. Two A's → pick the signer; demote the other to C
- **A and R are different cells.** If one party both signs and does the work, they are A; assign R to the party that produces the artifact (often 瞬作 or an exec lane)
- Every row has at least one R
- Blank cell = not involved. Do not fill every cell

## Decision rows (default 5)

Use these labels unless the case needs different ones. 4 min, 6 max.

1. 対象部署・スコープ
2. 運用ルール（匿名性など、the rule that makes the product safe)
3. 権限・システム連携
4. 現場の呼びかけ / 登録
5. Go / No-Go 判断

Owner is A on scope and Go / No-Go. IT is A on 権限・連携. Field is A on 呼びかけ.

## Anti-patterns

- Scrum roster (PO / SM / Dev) as lanes
- Owner = department name only (`人事企画部` with no person or role)
- Same letter dumped in every cell
- Decision row that is a task (`Jira を切る`) — rows are **decisions**

## Artifact: `docs/delivery-team-plan.md`

```markdown
# 体制立案 — {product}

- **Scope:** {pilot in one line}
- **Owner:** {name or role} — スコープ・予算・Go / No-Go
- **瞬作:** {what Support holds}

## Layers

| Layer | Who | Holds |
|-------|-----|-------|
| Owner | | |
| Exec | | |
| Exec | | |
| Support | 瞬作 | |

## RACI

| 意思決定事項 | {lane 1} | {lane 2} | {lane 3} | 瞬作 |
|--------------|----------|----------|----------|------|
| 対象部署・スコープ | A | C | C | I |
| … | | | | |
| Go / No-Go 判断 | A | C | C | R |

A 決裁 / R 実行 / C 相談 / I 報告

## Next

- `delivery-phase-plan` — 役割レーンで矢羽・ゲート・KPI を書く
```

## Pre-send checklist

- [ ] One Owner, 2–4 exec lanes, Support
- [ ] Owner is a person or role, not a department alone
- [ ] Each RACI row has exactly one A
- [ ] A and R are not in the same cell
- [ ] 4–6 decision rows, not a task list
- [ ] No 矢羽, KPI, or phase durations
