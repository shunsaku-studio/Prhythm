# prhythm-skill-review

## 概要

Prhythm に追加する Agent Skill の `SKILL.md` と日本語 README を、同じ型で点検・修正する。対象スキルのディレクトリを渡すと、テンプレに沿った README の作成、品質チェック、指摘の修正のいずれかを行う。判定基準の正本は [references/readme-principles.md](references/readme-principles.md)。

## 利用メリット

- README の型が揃うので、スキル一覧で「これ何に使うの？」を探す手間が減る。
- 曖昧な手順や冗長な説明を、エージェントに渡す前に人間目線で洗い出せる。
- テンプレとレビュー基準が共通なので、スキル追加・改修のたびに説明のばらつきを抑えられる。

## 利用シーン

- スキルを追加したが、人間向けの README がないとき
- エージェントに渡す前に、手順の曖昧さを確認したいとき
- スキル改修後に、フォーマットや説明がブレていないか確かめたいとき
- レビュー指摘を受けて、最小限だけ直したいとき

依頼の例: 「`skills/hearing` をレビューして」「README をテンプレから作って」

## 使い方

**いつ使うか:** スキルを書いた・直したあと、人間向け README とエージェント向け手順の品質を揃えたいときに入る。PR の前。出す作業そのものは `prhythm-skill-pr`。指定がなければ文書の品質チェックから始まる。効果測定（layer-b）や圧力テスト（layer-c）は、明示したときだけ。

1. ユーザーが対象ディレクトリを指定する。スキルが `SKILL.md` と README、一段下の参照を読む。
2. スキルが必須見出し・行数・リンク切れなどを機械チェックする。
3. スキルが発見しやすさ、簡潔さ、手順の質、構成、完了の見分けやすさ、README の原則適合をレポートする。

**README を揃える**

対象スキルの手順から、原則に沿った日本語 README を作る／直す。

**指摘を直す**

最新レビューの Critical から直し、再チェックする。README の原則違反は該当セクションを書き直す。

## 具体例

依頼: 「`skills/hearing` をレビューして。」

::: info 出力されるレビューレポートの抜粋:

**Summary**

- **Target:** `skills/hearing/`
- **Verdict:** Revise
- **Validate script:** pass
- **Top issues:**
  - [README] 具体例が成果物の種類の列挙になっている → 中身の抜粋に差し替える

:::

## 構成

```
prhythm-skill-review/
├── README.md
├── SKILL.md
├── references/
│   ├── readme-principles.md     # README 執筆・推敲原則（正本）
│   ├── readme-template.md       # 見出し骨格
│   ├── review-rubric.md         # レビュー観点
│   └── review-report-template.md
└── scripts/
    └── validate-skill.sh
```

## 前提条件

- 対象スキルは `skills/<skill-name>/` 配下にあること。
- 形式チェックスクリプトの実行には bash 環境が必要。

## 注意事項

- レビューはドキュメントの品質チェックがデフォルト。実際のタスクで試す評価は、明示的に依頼したときだけ行う。
- 形式チェックスクリプトは機械的な項目のみ。説明が冗長かどうかなどはレビューで判断する。
- `SKILL.md` は英語、`README.md` は日本語。効果測定とストレステストは手順ガイドのみで、自動テスト基盤は未同梱。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [prhythm-skill-pr](../prhythm-skill-pr/README.md) | README と手順の品質を揃えたあと、GitHub の PR に出したいときに使う |
