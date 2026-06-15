# prhythm-skill-review

## 概要

Prhythm に追加する Agent Skill の **品質管理用スキル**。

各スキルは2つのファイルで構成される:

| ファイル | 読者 | 言語 | 役割 |
|----------|------|------|------|
| `SKILL.md` | AI エージェント | 英語 | 実行手順・判断基準 |
| `README.md` | 人間 | 日本語 | 何ができて、どう使うか |

本スキルは、この2ファイルを **テンプレートに沿って整えたり、品質をチェックしたり、指摘を直したり** する。

## 利用メリット

- スキルごとに README の形式が揃うので、一覧から目的がすぐわかる
- エージェント向けの `SKILL.md` が長すぎたり曖昧だったりする問題を、レビューで事前に潰せる
- 形式チェック用スクリプト（必須項目・行数など）を自動実行できる
- 修正は必要最小限に絞るので、改善のサイクルを短く回せる

## 利用シーン

| やりたいこと | スラッシュコマンド |
|-------------|-------------------|
| スキルの品質をチェックする | `/prhythm-skill-review {path} をレビューして` |
| README をテンプレから作る・直す | `/prhythm-skill-review standardize {path} の README を作って` |
| レビュー指摘を反映する | `/prhythm-skill-review fix {path} の指摘を直して` |
| スキルなし vs ありで効果を比べる（任意） | `/prhythm-skill-review layer-b {path}` |
| ルールが守られるか試す（任意） | `/prhythm-skill-review layer-c {path}` |

通常は **品質チェック（review）** だけで十分。下2つは「本当に効くか試したい」ときだけ使う。

## 使い方

**品質チェック** — 書き方・構成・説明のわかりやすさをレビューし、レポートを返す:

```
/prhythm-skill-review skills/my-skill をレビューして
```

**README 整備** — 日本語 README を Prhythm 標準フォーマットで生成・更新:

```
/prhythm-skill-review standardize skills/my-skill の README を作って
```

**指摘の反映** — レビュー結果をもとに、最小限の修正を入れる:

```
/prhythm-skill-review fix skills/my-skill の指摘を直して
```

**形式チェック（手動）** — 必須項目・行数・リンク切れなどを機械的に確認:

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/<skill-name>
```

## 構成

```
prhythm-skill-review/
├── README.md              # このファイル（人間向け）
├── SKILL.md               # エージェント向け手順
├── references/
│   ├── readme-template.md       # README の雛形
│   ├── review-rubric.md         # レビュー観点
│   └── review-report-template.md # レポートの雛形
└── scripts/
    └── validate-skill.sh        # 形式チェックスクリプト
```

## 前提条件

- 対象スキルは `skills/<skill-name>/` 配下にあること
- 形式チェックスクリプトの実行には bash 環境が必要
- 効果測定・ストレステスト（layer-b / layer-c）は手順ガイドのみ。自動テスト基盤は未同梱

## 注意事項

- レビューは **ドキュメントの品質チェック** がデフォルト。実際のタスクで試す評価は、明示的に依頼したときだけ行う
- 形式チェックスクリプトは機械的な項目のみ。内容の良し悪し（説明が冗長かどうか等）はレビューで判断する
- Prhythm の規約: `SKILL.md` は英語、`README.md` は日本語

## 関連スキル

| スキル | 関係 |
|--------|------|
| （今後追加される Prhythm スキル） | 本スキルで整備・レビューする対象 |
