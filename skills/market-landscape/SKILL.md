---
name: market-landscape
description: >-
  市場のサービス地図（4象限）を作り、望ましい方向の空白（空白の右上）を見つける。
  サービス調査 → 軸の抽出 → 4象限マップの順で進む。「市場地図」「ポジショニングマップ」
  「空白地帯」「参考サービス調査」「market landscape」「competitive landscape」
  「空白の右上」「競合マップ」などで発動。旧 competitive-research の後継。
disable-model-invocation: false
rank: core
categories:
  - business
---

# Market Landscape

サービス領域を **地図** にする。目的は一覧ではなく、**空白の右上**（望ましさの高い象限の空き）を見つけること。

3 フェーズ。軸確定の前に必ず停止する（誤った軸でマップを埋めても意味がない）。

| Phase | やること | 出力 | 詳細 |
|-------|---------|------|------|
| **1 Survey** | サービス調査 | REFERENCES カタログ | [references/phase1-survey.md](references/phase1-survey.md) |
| **2 Axes** | 軸の抽出 | 軸候補 → **ユーザー確定で停止** | [references/phase2-axes.md](references/phase2-axes.md) |
| **3 Map** | 4象限マップ | POSITIONING + 空白の右上 | [references/phase3-map.md](references/phase3-map.md) |

> 人間向け概要: [README.md](README.md)

## When to use

- 「参考サービス調査」「市場地図を作りたい」「空白地帯を探したい」
- ふわっとした RFP / カテゴリ名を、提案の骨子になる地図に変えたい
- ヒアリング前に、ビジネス視点の共通認識を作りたい

Do NOT use:
- 単一サービスの機能解説だけが目的
- 市場規模・業界レポートのみ（プロダクトの空白探しがない）
- 既に軸とマップがあり、検証計画だけ欲しい → `uncertainty-map`

## Shared rules

- 出力はチャットの Markdown。議論してからファイル化する
- 軸の **右** と **上** は、自プロダクトにとって望ましい方向に揃える（だから「空白の右上」が狙える）
- 汎用軸禁止: `Simple vs Feature-rich` / `B2B vs B2C` だけでは不合格
- 料金・規模は `Verified` / `二次情報` / `要確認` を付ける
- 送信前に [references/output-checklist.md](references/output-checklist.md) を通す
- sentiment が必要なときだけ [references/sentiment-sources.md](references/sentiment-sources.md) を読む

## Phase 0 — Frame（毎回最初）

調査前に Research Frame を出す。

| Field | Content |
|-------|---------|
| **Problem (pain)** | 誰のどんな痛みか（カテゴリ名ではない） |
| **Target user** | セグメント |
| **Scope** | 地域・プラットフォーム・B2B/B2C |
| **Desired direction** | 右上に置きたい価値の仮説（まだ軸名でなくてよい） |
| **Assumptions** | 推測は `(前提)` |

カテゴリ名だけなら **1 問だけ**聞く: 「誰の、どんな課題を解く想定ですか？」  
無回答なら前提を明示して Phase 1 へ。

## Execution flow

1. Phase 0 Frame
2. Phase 1 Survey — [phase1-survey.md](references/phase1-survey.md)
3. Phase 2 Axes — [phase2-axes.md](references/phase2-axes.md) → **軸が確定するまで Phase 3 に進まない**
4. Phase 3 Map — [phase3-map.md](references/phase3-map.md)
5. 各フェーズ末にギャップと次の一手を 1–2 行

## Responsibility boundary

- `hearing` — 顧客対話の内部材料。本スキルは外部サービスの地図
- `product-vision-and-concept` — 一行コンセプト。地図の空白はビジョンの材料になり得る
- `assumption-breaker` — 前提崩し。地図作りそのものではない
- `uncertainty-map` — 自プロトの仮説検証。市場空白の探索ではない

## Final principle

調査は地図のための材料集め。軸が先、プロットが後。右上が空いているかを言えなければ、まだ終わっていない。

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/market-landscape/templates/docs/sections.html docs/prhythm/market-landscape/index.html --title "…"`
4. Write `docs/prhythm/market-landscape/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

