# PR Body Template

Fill placeholders. Remove HTML comments before `gh pr create`.

```markdown
## Summary

- {bullet: what skill does / why adding it}
- {bullet: secondary change if any — e.g. prhythm-skill-review criteria update}

## Skill

| Field | Value |
|-------|-------|
| Path | `skills/{skill-name}/` |
| Type | new / update |
| `disable-model-invocation` | {true / false} |

## Skill checklist

- [x] `SKILL.md` — English, under 500 lines
- [x] `README.md` — Japanese, 8 headings
- [x] `validate-skill.sh` pass
- [x] Root README catalog updated
- [x] No secrets or node_modules committed
- [x] Layer A review — Approve

## Test plan

- [x] `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/{skill-name}`
- [ ] {manual trigger test — e.g. "/graphql-schema-design ブログのスキーマを設計して"}
```

## Multi-skill branch

Add one Summary bullet per skill. Repeat Skill table or use a list:

```markdown
## Summary

- feat: add `graphql-schema-design` — proto GraphQL SDL design with phased gates
- refactor: tighten `prhythm-skill-review` README quality criteria

## Changes

| Skill | Type |
|-------|------|
| `graphql-schema-design` | new |
| `prhythm-skill-review` | update |
```

## Title examples

```
feat: add graphql-schema-design skill
feat: add prhythm-skill-pr meta-skill
refactor: improve prhythm-skill-review README rubric
```
