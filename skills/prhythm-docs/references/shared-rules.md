# Shared document rules — prhythm-docs

Applies to every `docs/prhythm/{skill}/index.md` and `index.html`.

マークダウンの書き方は [md-grammar.md](md-grammar.md)。スライドの書き方は [slide-grammar.md](slide-grammar.md)。シェル・部品・ビルドは [deck-shell.md](deck-shell.md)。

## Audience

Prhythm を使うエンジニア ↔ 提案をリードするコンサル。目的は意思決定と擦り合わせ。学習のための「考えの整理」も含む。

## Information budget

情報量より論点。**「で、何？」が冒頭で読めること。** カタログ全量・台本全セリフ・AC 全件は載せない（元 `docs/` やチャットへリンク）。

スライドの文字数・件数の上限は [slide-grammar.md](slide-grammar.md) にあり、`lint-deck.mjs` が機械的に検査する。マークダウンの行数・ブロックの役割は [md-grammar.md](md-grammar.md)。

## Required block order

1. **Answer** — 結論 1 文 + 根拠 3 行。ここが無い成果物は不合格
2. **Frame** — この回の観測条件。**見なかったもの**も書く
3. **Evidence** — 結論を支える、そのスキル固有の構造物 1 つ
4. **Decision Gates** — 人間が決めること。3 つまで、疑問形で
5. **Gaps & Next Steps** — 誰が何をするか。3 つまで、動詞で始める

Answer が Frame より前なのは意図的。読み手はまず結論を知りたい。`Synthesis` は置かない。各ブロックが運ぶ固有情報は [md-grammar.md](md-grammar.md)。

## Modes

| User request | Output |
|--------------|--------|
| （指定なし） | `index.md` + `index.html` 両方 |
| 「md だけ」「ドキュメントだけ」 | `index.md` only |
| 「スライドだけ」「html だけ」 | `index.html` only |

## Hard bans

- Answer の無い成果物
- 体言止めの見出し（「Research Frame」ではなく「調査は◯◯に絞る。△△は見ていない。」）
- カタログ / 質問プール / AC の全量転記
- 絵文字装飾の多用
- スキル出力にない断定・きれいな結論の捏造
- HTML シェル（CSS / JS）をテンプレや出力に手書きすること — `build-deck.mjs` を使う
- create-html-deck への依存（出力は単一ファイルで自己完結）

## File locations

| Role | Path |
|------|------|
| Markdown grammar (shared) | `skills/prhythm-docs/references/md-grammar.md` |
| Markdown skeleton (copy when adding a skill) | `skills/prhythm-docs/templates/docs/index.md` |
| Markdown template (per skill: Frame + Evidence) | `skills/{skill}/templates/docs/index.md` |
| Slide template (per skill) | `skills/{skill}/templates/docs/sections.html` |
| Shared shell / CSS / viewer | `skills/prhythm-docs/assets/` |
| Build & lint | `skills/prhythm-docs/scripts/` |
| Output | `docs/prhythm/{skill}/index.md` + `index.html` |

`{skill}` は `skills/` 配下のディレクトリ名と一致させる。

共通の 5 ブロックは prhythm-docs が持つ。Frame の列名と Evidence の構造物だけ、スキル側テンプレが差し替える。
