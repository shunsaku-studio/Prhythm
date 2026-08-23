---
name: assumption-breaker
description: >-
  Extract hidden assumptions from an RFC, proposal, or brief and generate
  radical alternative framings by systematically breaking each assumption.
  Use when the user wants to challenge a proposal's premises, find unconventional
  solutions, think outside the box about a brief, or generate contrarian takes.
  Triggers on "前提を疑って", "別の解き方ない？", "ラディカルな意見",
  "この提案の穴は？", "暗黙の前提", "逆張り", "challenge this RFC",
  "what are we taking for granted", "flip the assumptions",
  "devil's advocate on this".
disable-model-invocation: false
rank: utility
categories:
  - business
---

# Assumption Breaker

RFCや提案書から暗黙の前提を抽出し、それぞれを外すことで別の解を発想する思考ツール。

Goal: 提案者が見えていない解の空間を可視化する。説得術ではなく発想法。

## Reference files

| File | When to read |
|------|--------------|
| [references/thinking-moves.md](references/thinking-moves.md) | Phase 2 — 前提を崩すときの思考ムーブ辞書 |
| [references/output-format.md](references/output-format.md) | Phase 3 — 出力フォーマット |

---

## When to use

- RFC / 提案 / brief を受け取って「他の解き方ないか？」と考えたいとき
- 「なぜそうなの？」が気になるが具体的に何を疑えばいいかわからないとき
- チームの思考がひとつの方向に固まっているとき
- PoC前に解の空間を広げたいとき

## When NOT to use

- 提案の実行計画やスケジュールのレビュー → 通常のレビュー
- 競合・市場リサーチ → market-landscape skill
- ビジョン・コンセプト策定 → product-vision-and-concept skill

---

## Phase 1: 入力の確認と構造化

### 入力

RFC、提案書、brief、Slack投稿、何でもよい。テキストが与えられたら以下を抽出する：

1. **課題** — 何を問題だと言っているか
2. **ほしいもの** — どんな解を求めているか（機能リスト、要件）
3. **制約** — 明示された制約（予算、期限、技術スタック等）
4. **暗黙の前提** — 書かれていないが「当然そう」として扱われているもの

### 暗黙の前提の見つけ方

以下のレンズで入力テキストを走査する：

| レンズ | 問い | 例 |
|--------|------|-----|
| **手段の固定** | 「X が必要」は本当にXである必要があるか？目的は別にないか？ | 「PPTX出力」→ 目的は「顧客提出」、PPTXは手段 |
| **ユーザーの固定** | 誰が使うかが暗黙に決まっていないか？ | 「エンジニアが作る」→ そもそもエンジニアが作る必要があるのか？ |
| **プロセスの固定** | 現在のワークフローを前提にしていないか？ | 「レビュー → 修正」→ レビュー不要な仕組みにできないか？ |
| **技術の固定** | 特定の技術スタックが暗黙に前提になっていないか？ | 「パワポのCursorエディタ」→ PPTXを前提にしている |
| **品質基準の固定** | 何を「品質」と呼んでいるかが暗黙に定義されていないか？ | 「品質を求める正義」→ 品質 = 見た目？構成？正確さ？ |
| **スコープの固定** | 解決範囲が暗黙に広い or 狭いままになっていないか？ | 「作成ツール」→ 作成をなくす方向は検討外？ |

### 出力

抽出結果を以下の形式でユーザーに提示する：

```markdown
## 入力の構造化

**課題:** ...
**ほしいもの:** ...
**明示制約:** ...

## 暗黙の前提（N個検出）

| # | 前提 | レンズ | なぜこれを前提と判断したか |
|---|------|--------|--------------------------|
| 1 | ... | 手段の固定 | ... |
| 2 | ... | プロセスの固定 | ... |
```

ユーザーに確認：「この前提リストで合ってる？追加・修正ある？」

前提リストが確定したら Phase 2 へ。

---

## Phase 2: 前提を崩して代替解を発想する

[references/thinking-moves.md](references/thinking-moves.md) を読む。

**前提ごとに** 以下を実行する：

### Step 1: 反転

前提を逆にする。「PPTXで出力する」→「PPTXを使わない」

### Step 2: 思考ムーブの適用

反転した世界で、thinking-moves.md の中から適切なムーブを **最低2つ** 適用する。
機械的に全ムーブを回す必要はない。前提の性質に合うムーブを選ぶ。

### Step 3: 具体解の生成

ムーブの結果を **具体的な解** に落とす。抽象的な方向性ではなく、「こうすれば動く」レベルまで。

### 出力

```markdown
## 前提 #N: [前提の内容]

**反転:** [逆にしたらどうなるか]

### 代替解 A: [解の名前]
- **ムーブ:** [使った思考ムーブ名]
- **概要:** [1–2文]
- **具体的にどうなるか:** [実装イメージ、ユーザー体験の変化]
- **トレードオフ:** [何を得て何を失うか]

### 代替解 B: ...
```

全前提を処理したら Phase 3 へ。

---

## Phase 3: 統合と評価

[references/output-format.md](references/output-format.md) を読む。

### Step 1: 代替解の一覧化

Phase 2 で出た全代替解を一覧にし、以下の軸で並べる：

| 代替解 | 元の前提 | インパクト | 実現難易度 | 元RFCとの距離 |
|--------|----------|-----------|-----------|--------------|

- **インパクト** — 元の課題をどれだけ根本から解くか（高/中/低）
- **実現難易度** — 技術・組織・市場の壁（高/中/低）
- **元RFCとの距離** — どれくらいラディカルか（近/中/遠）

### Step 2: 組み合わせ解の提案

単体の代替解だけでなく、複数の前提崩しを **組み合わせた解** を1–2個提案する。
これが最もラディカルで面白い解になることが多い。

### Step 3: 推奨の提示

「元RFCのままでいい」も含めて、以下の3つを提示する：

1. **最もインパクトが大きい代替解**
2. **最もラディカルな組み合わせ解**
3. **元RFCに一番近いが前提を1つだけ外した解**

---

## Facilitator principles

1. **RFCを否定しない** — 前提を外すのは「間違いを指摘する」のではなく「解の空間を広げる」行為
2. **具体で語る** — 「別のやり方もある」ではなく「HTMLスライド + Marp で、こうなる」
3. **トレードオフを隠さない** — ラディカルな解にもコストがある。それを提示してこそ選択できる
4. **前提の由来を尊重する** — 「顧客がPPTXを使っている」という前提には理由がある。それを理解した上で崩す
5. **数を出す** — 1つの天才的な解より、5つの「ありえなくもない」解のほうが発想を触発する

---

## Anti-patterns

- 前提抽出をスキップしていきなり代替案を出す（→ 思いつきになる）
- 全前提に同じムーブを適用する（→ 機械的で浅い）
- 代替解が抽象的すぎる（「別のアプローチを取る」はNG。何がどう変わるか書く）
- 元RFCを全否定する（→ 提案者が防衛に回って議論にならない）
- トレードオフを書かない（→ バラ色の妄想）

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/assumption-breaker/templates/docs/sections.html docs/prhythm/assumption-breaker/index.html --title "…"`
4. Write `docs/prhythm/assumption-breaker/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

