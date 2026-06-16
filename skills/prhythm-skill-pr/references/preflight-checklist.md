# Preflight Checklist

Run before `git push` and `gh pr create`.

## Per changed skill (`skills/<name>/`)

- [ ] `SKILL.md` exists with valid frontmatter (`name`, `description`, `disable-model-invocation`)
- [ ] `README.md` exists with 8 required headings
- [ ] Validate passes:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<name>
```

- [ ] Layer A review done (Approve or fixes applied) — use `prhythm-skill-review` when not yet reviewed

## Repo-level (new skills only)

- [ ] Root [README.md](../../../README.md) skills table includes the new skill
- [ ] Link target: `skills/<skill-name>/`
- [ ] Description: one line from README 概要

## Git hygiene

- [ ] Working tree clean (or only intentional uncommitted files)
- [ ] Branch tracks remote or ready for `git push -u origin HEAD`
- [ ] No secrets, `.env`, credentials
- [ ] No `node_modules/` staged (check `git diff --cached`)

## PR body

- [ ] **本文は日本語**（タイトルのみ英語 conventional commits で可）
- [ ] 概要に **なぜ** 変えたかを書いた（ファイル一覧だけにしない）
- [ ] スキルチェックリストは確認済み項目だけ `[x]`
- [ ] テスト計画に validate スクリプト実行を含めた
