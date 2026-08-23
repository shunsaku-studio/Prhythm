---
name: hearing
description: "顧客ヒアリング支援スキル。ヒアリング前の準備・進行カード、ヒアリング後のボトルネック分析と擦り合わせ質問設計を行う。「ヒアリング準備」「進行カード」「質問集」「ヒアリング後の整理」「ボトルネック仮説」「擦り合わせ質問」などのリクエストで発動する。2つのモードを持つ。mode:prep — 会議前準備と当日の進行カード。mode:analysis — 会議後の整理と擦り合わせ質問。モード未指定時は mode:prep。"
disable-model-invocation: false
rank: core
categories:
  - business
---

# 顧客ヒアリング支援ガイド

顧客ヒアリングの準備と事後分析を支援する。2つのモードを持ち、サブコマンドとして使い分ける。

> 人間向けの概要・使い方は [`README.md`](README.md) を参照。

## モード一覧

| モード | コマンド例 | インプット | アウトプット | 詳細手順 |
|-------|-----------|-----------|-------------|---------|
| **mode:prep** | 「ヒアリング準備して」「進行カードを作って」 | 顧客情報、営業メモ、会議目的 | 会議目的、進行カード、選定質問、カテゴリ別質問集 | [`references/mode-prep.md`](references/mode-prep.md) |
| **mode:analysis** | 「ヒアリング結果を整理して」「ボトルネック仮説を出して」 | 会議メモ、文字起こし、prep 出力、社内仮説 | ボトルネック仮説、根拠、解決方向、擦り合わせ質問集 | [`references/mode-analysis.md`](references/mode-analysis.md) |

## モード判定ルール

- 事前準備、質問集、進行、会議前、初回ヒアリング、営業同席前 → **mode:prep**
- 会議中に見る台本、進行カード、そのまま読む質問 → **mode:prep**
- ヒアリング後、議事録整理、ボトルネック分析、仮説更新、次回確認 → **mode:analysis**
- モード指定がない場合 → **mode:prep** をデフォルトとする
- mode:analysis 実行時に会議メモ・文字起こし・prep 出力のいずれかが無い場合 → 実行せず、材料を求めるか mode:prep を促す

依頼が曖昧でも、まず「これから会うのか」「会った後なのか」で判定する。

## なぜ2モードに分かれているか

prep と analysis の間には、**実際の顧客ヒアリング（会議）** が入る。このゲートをスキップして会議前にボトルネックや解決策を断定すると、顧客の言葉を聞かずに仮説を固めすぎる。mode:prep は分析せず準備だけを出し、会議後に初めて mode:analysis で仮説を立てる。

---

## Shared Principles

両モードに共通する原則:

- 顧客の言葉をそのまま結論にしない
- こちらの仮説を隠さないが、事実と混ぜない
- AI 化 / 自動化を前提にしない
- 顧客向け質問は平易にする
- 開発観点では、誰が、どこで、何に詰まるかを具体に落とす

## Responsibility Boundary

このスキルは以下と責務を分ける。

- `defining-personas-and-segments`
  - 誰向けに作るかの比較とセグメント整理が主題のときに使う
  - `hearing` は 1 回の会議で何を聞き、何が分かったかに集中する
- `product-vision-and-concept`
  - プロダクト構想そのものをまとめるスキル
  - `hearing` は構想を決めず、材料収集と検証論点に留める
- `market-landscape`
  - 外部サービスの市場地図・空白の右上
  - `hearing` は顧客対話の内部材料だけを扱う
- `create-journey-map`
  - 体験の時系列可視化と HMW
  - `hearing` の出力は JM の材料になり得るが、JM 自体は作らない

---

## 実行フロー

1. **モードを判定する**（上記「モード判定ルール」）
2. **Shared Principles を確認する**（本ファイル）
3. **該当モードの詳細手順を読み、実行する**
   - mode:prep → [`references/mode-prep.md`](references/mode-prep.md)
   - mode:analysis → [`references/mode-analysis.md`](references/mode-analysis.md)
4. **該当モードだけを実行する**（もう一方の出力フォーマットや分析フレームを混ぜない）

## Final Principle

ヒアリング前は事実を取りに行く設計だけを出し、ヒアリング後に初めてボトルネックと解決方向を考える。

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/hearing/templates/docs/sections.html docs/prhythm/hearing/index.html --title "…"`
4. Write `docs/prhythm/hearing/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

