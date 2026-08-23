## 概要

<!-- 1〜3 行: 何を変えたか・なぜか（日本語） -->

-

## 変更内容

<!-- 任意: 対象スキル、パス、コミット -->

| 領域 | 内容 |
|------|------|
| スキル | <!-- 例: skills/ooui-graphql-modeling（新規） --> |
| その他 | <!-- ドキュメント、スクリプト、リポジトリ設定 --> |

## スキルチェックリスト

<!-- `skills/` を触らない PR ならこのセクションごと削除 -->

- [ ] 新規/更新スキルに `SKILL.md`（英語）と `README.md`（日本語。必須見出しあり、注意事項は任意。[readme-principles.md](../skills/prhythm-skill-review/references/readme-principles.md) に従う）がある
- [ ] `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<name>` が pass
- [ ] ルート [README.md](README.md) のスキル一覧を更新した（新規スキルのみ）
- [ ] secrets、`.env`、認証情報、`node_modules/` を commit していない
- [ ] Layer A レビュー pass、または本 PR で修正済み（`prhythm-skill-review`）

## テスト計画

- [ ] 変更した各スキルで validate スクリプトを実行した
- [ ] 手動スモークテスト（トリガー文言・期待動作を記載）
- [ ] 該当なし — ドキュメントのみの変更
