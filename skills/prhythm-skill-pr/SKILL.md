---
name: prhythm-skill-pr
description: >-
  Create GitHub pull requests for Prhythm skill additions and updates. Use when
  opening a PR for skills/, skill addition PR, gh pr create, or publishing a new
  Agent Skill to the Prhythm repo.
disable-model-invocation: true
---

# Prhythm Skill PR

Create pull requests for branches that add or update skills under `skills/`.

## Modes

| Mode | Trigger | Output |
|------|---------|--------|
| **create** | `/prhythm-skill-pr` or "skill の PR を作って" | Push branch + `gh pr create` |
| **draft** | "draft PR" / "下書き PR" | Same, with `--draft` |

Default base branch: `main`.

## Workflow

### 1. Preflight

Read [preflight-checklist.md](references/preflight-checklist.md). Run checks before drafting the PR.

For each changed skill directory under `skills/`:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<skill-name>
```

If validate fails → fix or stop. Do not open the PR.

### 2. Gather git state

Run in parallel:

```bash
git status
git diff
git diff --cached
git branch -vv
git log --oneline -10
git diff main...HEAD
```

Identify:

- New vs updated skills (`skills/<name>/`)
- Whether root [README.md](../../README.md) catalog lists new skills
- Commits since diverging from `main`

### 3. Fix blockers (minimal)

| Blocker | Action |
|---------|--------|
| New skill missing from root README catalog | Add table row: name, link, one-line description from skill README 概要 |
| Validate fail | Run `prhythm-skill-review fix` or fix manually |
| Uncommitted changes user expects in PR | Stage and commit before push (ask if scope is unclear) |

Do not commit secrets. Do not push force to `main`.

### 4. Draft PR

Use [pr-body-template.md](references/pr-body-template.md).

- **Title:** English, imperative, ≤72 chars — e.g. `feat: add graphql-schema-design skill`
- **Body:** **Japanese.** Fill 概要, スキル table, スキルチェックリスト (check only if verified), テスト計画
- Multi-skill branch → one 概要 bullet per skill

### 5. Push and create

```bash
git push -u origin HEAD
gh pr create --base main --title "TITLE" --body "$(cat <<'EOF'
BODY
EOF
)"
```

Draft variant: add `--draft`.

Return the PR URL to the user.

## Title conventions

| Change | Prefix |
|--------|--------|
| New skill | `feat: add <skill-name> skill` |
| Skill update | `refactor:` or `fix:` + skill name |
| Meta-skill + new skill (same branch) | `feat: add <skill-name> skill` — mention meta changes in body |

Match recent `git log` style when history exists.

## NEVER

- Force-push `main` / `master`
- Open PR without running validate for touched skills
- Skip root README catalog update for new skills
- Commit `.env`, credentials, or `node_modules/`
- Write PR body in English — body must be Japanese (title may stay English)

## References

- [preflight-checklist.md](references/preflight-checklist.md) — gates before PR
- [pr-body-template.md](references/pr-body-template.md) — `gh pr create` body
- [.github/PULL_REQUEST_TEMPLATE/skill_addition.md](../../.github/PULL_REQUEST_TEMPLATE/skill_addition.md) — GitHub UI template
- [prhythm-skill-review](../prhythm-skill-review/SKILL.md) — quality review before PR
