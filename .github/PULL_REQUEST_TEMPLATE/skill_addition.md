## Summary

<!-- New or updated Agent Skill under `skills/` -->

-

## Skill

| Field | Value |
|-------|-------|
| Path | `skills/<skill-name>/` |
| Type | new / update |
| `disable-model-invocation` | true / false |

## Skill checklist

- [ ] `SKILL.md` — English, imperative, under 500 lines, progressive disclosure to `references/`
- [ ] `README.md` — Japanese, 8 headings (概要, 利用メリット, 利用シーン, 使い方, 構成, 前提条件, 注意事項, 関連スキル)
- [ ] 利用メリット — user/team outcomes, not implementation detail
- [ ] 利用シーン — aligned with 利用メリット, no slash commands
- [ ] `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<name>` — pass
- [ ] Root [README.md](README.md) skills catalog row added (new skills)
- [ ] No secrets, `.env`, or `node_modules/` committed
- [ ] `prhythm-skill-review` Layer A — Approve (or fixes in this PR)

## Test plan

- [ ] Run validate script
- [ ] Trigger skill with representative user phrase
- [ ] Confirm expected artifacts or transcript behavior
