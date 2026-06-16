# PR 本文テンプレート

プレースホルダを埋める。**本文は日本語**（タイトルは conventional commits の英語で可）。HTML コメントは `gh pr create` 前に削除。

```markdown
## 概要

- {何を追加/変更したか・なぜか}
- {副次変更があれば — 例: prhythm-skill-review の README 品質基準の見直し}

## スキル

| 項目 | 値 |
|------|-----|
| パス | `skills/{skill-name}/` |
| 種別 | 新規 / 更新 |
| `disable-model-invocation` | {true / false} |

## スキルチェックリスト

- [x] `SKILL.md` — 英語、500 行未満
- [x] `README.md` — 日本語、8 見出し
- [x] `validate-skill.sh` pass
- [x] ルート README のスキル一覧を更新
- [x] secrets や node_modules を commit していない
- [x] Layer A レビュー — Approve

## テスト計画

- [x] `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/{skill-name}`
- [ ] {手動スモーク — 例: 「/ooui-graphql-modeling ブログのスキーマを設計して」}
```

## 複数スキルが同一ブランチの場合

概要にスキルごと 1 行。Skill テーブルを繰り返すか、一覧表にまとめる:

```markdown
## 概要

- `ooui-graphql-modeling` を新規追加 — プロト段階の GraphQL SDL 設計（段階ゲート付き）
- `prhythm-skill-review` を更新 — README の利用メリット/利用シーン品質基準を明確化

## 変更内容

| スキル | 種別 |
|--------|------|
| `ooui-graphql-modeling` | 新規 |
| `prhythm-skill-review` | 更新 |
```

## タイトル例（英語）

```
feat: add ooui-graphql-modeling skill
feat: add prhythm-skill-pr meta-skill
refactor: improve prhythm-skill-review README rubric
```
