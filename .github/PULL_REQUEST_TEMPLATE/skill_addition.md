## 概要

<!-- `skills/` 配下の Agent Skill 新規追加・更新（日本語） -->

-

## スキル

| 項目 | 値 |
|------|-----|
| パス | `skills/<skill-name>/` |
| 種別 | 新規 / 更新 |
| `disable-model-invocation` | true / false |

## スキルチェックリスト

- [ ] `SKILL.md` — 英語、命令形、500 行未満、`references/` へ progressive disclosure
- [ ] `README.md` — 日本語。[readme-principles.md](../../skills/prhythm-skill-review/references/readme-principles.md) に従う。必須見出し: 概要, 利用メリット, 利用シーン, 使い方, 具体例, 構成, 前提条件, 関連スキル。注意事項は任意
- [ ] 利用メリット — 手作業や素の LLM との差。実装詳細・電報調は書かない
- [ ] 利用シーン — 具体的な状況と依頼例。概要・メリットの言い換えにしない
- [ ] `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<name>` — pass
- [ ] ルート [README.md](README.md) のスキル一覧に行を追加（新規スキルのみ）
- [ ] secrets、`.env`、`node_modules/` を commit していない
- [ ] `prhythm-skill-review` Layer A — Approve（または本 PR で修正）

## テスト計画

- [ ] validate スクリプトを実行した
- [ ] 代表フレーズでスキルを起動した
- [ ] 期待する成果物・エージェントの挙動を確認した
