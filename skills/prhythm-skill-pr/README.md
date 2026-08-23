# prhythm-skill-pr

## 概要

Prhythm リポジトリでスキル追加・更新の Pull Request を作る。形式チェックと README カタログ確認のあと、日本語の PR 本文を揃え、`gh pr create` まで進める。

## 利用メリット

- スキル品質チェックとカタログ追記を出す前に揃えられるので、PR 前の抜け漏れが減る。
- 概要、スキルチェックリスト、テスト計画が入った本文の型が最初から揃うので、レビューが楽になる。

## 利用シーン

- 新スキルをブランチに載せて PR を出したいとき
- 複数スキルやメタスキル変更が同一ブランチにあり、本文を 1 本にまとめたいとき
- ルートのスキル一覧更新を忘れがちなとき

依頼の例: 「このブランチで skill の PR を作って」「feat/modeling-skill を PR して」

## 使い方

**いつ使うか:** スキルの追加・更新を GitHub の PR にしたいときに入る。`prhythm-skill-review` で品質と README 型を揃えたあと。形式チェックとカタログ追記を済ませてから PR を出す。

1. スキルが形式チェックとルートのスキル一覧を確認する。失敗したら先に直す。
2. スキルが概要、スキルチェックリスト、テスト計画を日本語で書く。
3. スキルが push して PR を作る。下書きなら draft。未コミットがあれば先に確認する。

## 具体例

依頼: 「このブランチで skill の PR を作って。」

::: info 出力される PR 本文の抜粋:

**概要**

- 社内公募アプリ案件向けに `hearing` の進行カード出力を明確化した
- README の具体例を独立セクションにし、中身の抜粋を置いた

:::

## 構成

```
prhythm-skill-pr/
├── README.md
├── SKILL.md
└── references/
    ├── preflight-checklist.md
    └── pr-body-template.md
```

GitHub UI 用テンプレ: [.github/PULL_REQUEST_TEMPLATE/skill_addition.md](../../.github/PULL_REQUEST_TEMPLATE/skill_addition.md)

## 前提条件

- `gh` CLI がインストール済みで GitHub にログイン済みであること。
- 対象ブランチが `origin` に push 可能なこと。ベースブランチは `main`（変更時は依頼で指定）。

## 注意事項

- PR 本文は日本語。タイトルは `feat: add ...` など英語でよい。
- 新スキルはルート [README.md](../../README.md) のスキル一覧への追記が必須。
- コミットと push は依頼内容に含まれる場合のみ実行する。未コミット変更があるときは確認する。`main` への force-push はしない。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [prhythm-skill-review](../prhythm-skill-review/README.md) | PR の前に、README と手順の品質を点検したいときに使う |
