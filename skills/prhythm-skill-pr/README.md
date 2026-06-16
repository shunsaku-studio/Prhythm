# prhythm-skill-pr

## 概要

Prhythm リポジトリで **スキル追加・更新の PR を作る** メタスキル。  
preflight（validate・README カタログ確認）→ PR 本文ドラフト → `gh pr create` までを型通りに進める。

## 利用メリット

- **PR 前の抜け漏れを減らせる** — validate や README カタログ更新を PR 作成前にチェックできる
- **PR 本文が毎回同じ型になる** — 概要 / スキルチェックリスト / テスト計画が揃い、レビューが楽になる（本文は日本語）
- **スキル追加の手順が再利用できる** — ブランチごとに gh コマンドを毎回考え直さなくていい

## 利用シーン

- **新スキルをブランチに載せて PR を出したいとき** — 品質ゲートを通してから GitHub に出したい
- **複数スキルやメタスキル変更が同一ブランチにあるとき** — 本文を整理して1本の PR にまとめたい
- **README カタログ更新を忘れがちなとき** — ルート README への追記を preflight で確認したい

依頼の例: 「このブランチで skill の PR を作って」「feat/modeling-skill を PR して」

## 使い方

**PR 作成（通常）:**

```
/prhythm-skill-pr このブランチで PR を作って
```

**下書き PR:**

```
/prhythm-skill-pr draft PR を作って
```

**手動 preflight のみ:**

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<skill-name>
```

## 構成

```
prhythm-skill-pr/
├── README.md
├── SKILL.md
└── references/
    ├── preflight-checklist.md   # PR 前チェックリスト
    └── pr-body-template.md      # gh pr create 用本文テンプレ
```

GitHub UI 用テンプレ: [.github/PULL_REQUEST_TEMPLATE/skill_addition.md](../../.github/PULL_REQUEST_TEMPLATE/skill_addition.md)

## 前提条件

- `gh` CLI がインストール済みで GitHub にログイン済み
- 対象ブランチが `origin` に push 可能
- ベースブランチ: `main`（変更時は依頼で指定）

## 注意事項

- PR **本文は日本語**（タイトルは `feat: add ...` など英語で可）
- validate 失敗時は PR を作らず、先に修正する
- 新スキルはルート [README.md](../../README.md) のスキル一覧への追記が必須
- コミット・push は依頼内容に含まれる場合のみ実行（未コミット変更があるときは確認）
- `main` への force-push はしない

## 関連スキル

| スキル | 関係 |
|--------|------|
| [prhythm-skill-review](../prhythm-skill-review/) | PR 前の Layer A レビュー・validate |
| [graphql-schema-design](../graphql-schema-design/) | 例: スキル追加 PR の対象 |
