# defining-personas-and-segments

## 概要

新規プロダクト・機能・プロトタイプの**ターゲットユーザー、ペルソナ、セグメント**を、人間が判断できる形に整理するスキル。Agent は「Primary persona は X」と決めない。**意思決定は PM・創業者・デザインリードに返し、判断のための材料を揃える**ことに徹する。Primary が決まったあとは、そのセグメント/ペルソナの深掘りに進む。

- **入力:** インタビューメモ・ディスカバリーノート・プロダクトブリーフ・既存のステークホルダーリスト（粗くてもよい）
- **出力:**
  - Stage 1（俯瞰）: User/Stakeholder Candidates 表、Segmentation Axes、Segment Comparison Table、Persona Comparison Table（**Counter-persona を含む**）、Human Decision Gates、Next Action
  - Stage 2（深掘り）: 選ばれた Primary の Persona Deep Dive（人物の具体像・JTBD階層・利用シーン・顔写真生成プロンプト等）、Validation Plan、Out-of-scope Rationale
- **スコープ外:** マーケティングコピーの執筆、定量クラスタリングによるセグメンテーション、確定したペルソナの A/B 検証

## 利用メリット

- **判断が人間に残る** — Agent が「Primary はこれ」と書きそうになったら止まり、`Primary candidate (hypothesis)` として論点に格上げする。後で「なぜそうなった？」が辿れる
- **根拠の強さが一目で分かる** — すべての主張に `[Fact] / [Assumption] / [Unknown] / [Risk]` タグ。サンプル1からの過剰一般化や、暗黙の前提への依存が可視化される
- **比較表で人間が編集できる** — Stage 1 は Markdown 表。気になる軸や違うと思うセルを、人間が列・行を足して直接書き換えられる
- **対極ペルソナ（Counter-persona）で設計の境界が見える** — Primary だけ並べると見えない「最適化することで誰を失うか」が可視化される
- **検証が確認にならない** — Stage 2 の Validation Plan は反証条件必須。「やる前から結論が決まっている」検証を弾く
- **次のアクションが出力に埋め込まれる** — Stage 1 末尾に Next Action 節があり、人間が次に何をすればよいかが artifact 自体に書かれている

## 利用シーン

- **インタビュー記録があるが、誰向けに作るか整理できていないとき** — 軸を出し、セグメント・ペルソナの比較表まで一気通貫で揃えたい
- **「全員に届けたい」幻想を解きたいとき** — Out of scope を明示し、Counter-persona で取れない人を可視化したい
- **プロト・MVP の前に、誰に当てるかを言語化したいとき** — Validation Plan まで具体化して、反証条件を持って検証に入りたい
- **既存のペルソナを批判的にレビューしたいとき** — Fact/Assumption の比率や Counter-persona の欠落をチェックしたい
- **Primary は既に決まっていて、その人物像と検証計画を深掘りしたいとき**（Stage 2） — JTBD 階層・人物の具体像・顔写真プロンプトまで揃えたい

依頼の例: 「インタビューメモを渡すのでペルソナを整理して」「このプロダクトのターゲットを切って」「Primary を Segment 1 にしたから深掘りして」

## 使い方

**Stage 1（俯瞰）** — 入力を渡してターゲット整理を依頼。比較表 + 論点が返ってくる:

```
ペルソナとセグメントを整理して。インタビューメモを貼る：...
このディスカバリーノートからターゲットを切り出して
誰向けに作るべきか、軸から整理して
```

出力末尾の Next Action に従って、Human Decision Gates に答える / 比較表の列・行を直接書き換える。

**Stage 2（深掘り）** — Primary を選んだあと、深掘りを依頼:

```
Primary は Segment 1 で進める。ペルソナを深掘りして
ペルソナ 1 を Stage 2 で具体化して。顔写真プロンプトも欲しい
```

JTBD 階層・人物の具体像・利用シーン・Validation Plan・Out-of-scope Rationale が返る。

**Counter-persona の確認** — Primary だけ並んでいたら「対極の人物」を要求:

```
Counter-persona も置いて。Primary の defining trait は何？
```

**検証** — 出力後、Markdown を `scripts/validate_output.sh` でチェック可能（bash + grep のみ）:

```bash
./scripts/validate_output.sh <output.md>             # 自動判定
./scripts/validate_output.sh --stage 1 <output.md>
./scripts/validate_output.sh --stage 2 <output.md>
```

## 構成

```
defining-personas-and-segments/
├── README.md
├── SKILL.md
├── references/
│   ├── segmentation-axes.md      # よく使う軸（役割、JTBD、文脈、習熟度など）
│   ├── persona-template.md       # Stage 1 比較表 / Stage 2 深掘り / Counter-persona 節
│   ├── evidence-levels.md        # Fact / Assumption / Unknown / Risk の定義・タグ付け
│   ├── human-decision-gates.md   # 人間に返す判断ポイントの類型
│   ├── prototype-connection.md   # Validation Plan の書き方（反証条件必須）
│   └── anti-patterns.md          # 17 件のアンチパターン
├── examples/
│   ├── input-example*.md         # 粒度・ドメイン別の入力サンプル
│   ├── output-example-stage1.md  # 俯瞰の出力例（介護現場の引き継ぎノート）
│   └── output-example-stage2.md  # 深掘りの出力例（Primary を Segment 1 にした）
└── scripts/
    └── validate_output.sh        # Stage 1/2 自動判定 + 必須セクション検証
```

## 前提条件

- 最低限のインプット — インタビューメモ、プロダクトブリーフ、または既存ユーザーリストのいずれか。何もない場合はゼロから創作せず、ユーザーに尋ねる
- 出力の言語は **日本語**（SKILL.md / references は英語、生成物は日本語）
- スキル配置: Prhythm の `skills/` または `~/.cursor/skills/`

## 注意事項

- **Primary を Agent が確定させない** — 「主要ペルソナは X」と書きそうになったら止まり、`Primary candidate (hypothesis)` に書き換えて Human Decision Gates に格上げする
- **Counter-persona を最低1つ置く** — Primary 候補と中核軸で正反対の人物。Primary の劣化版を Counter にしない
- **タグなしの主張を書かない** — `[Fact]` / `[Assumption]` / `[Unknown]` / `[Risk]` を必須化
- **1人の発言を Fact にしない** — Fact は「3人中3人」「ログで確認」レベル。それ以下は Assumption
- **矛盾する声を平均で丸めない** — 両極を別ペルソナにする、または論点として人間に返す
- **Stage 1 で深掘りしすぎない** — 比較表に収まらない情報は Stage 2 に持ち越す
- **Validation Plan に反証条件を必ず書く** — 反証条件のない「検証」は確認作業

詳細は `references/anti-patterns.md`（17 件）を参照。

## 関連スキル

| スキル | 関係 |
|--------|------|
| competitive-research | 前段 — 競合・参考サービスの調査結果から、軸・代替手段・JTBD の候補を拾える |
| product-vision-and-concept | 前段 / 並走 — Why / Who が言語化されると、Who をここで具体化できる |
| usecase-mapper | 後続 — 確定した Primary ペルソナをアクターに、ユースケース図に展開できる |
| ooui-graphql-modeling | 後続 — ペルソナと JTBD を素材に、ドメイン SDL を設計できる |
| prototype-design-md | 後続 — Validation Plan の検証手段（プロト形式）を具体化する DESIGN.md に渡せる |
