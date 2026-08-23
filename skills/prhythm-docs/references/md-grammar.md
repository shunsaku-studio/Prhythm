# Markdown grammar — prhythm-docs

`docs/prhythm/{skill}/index.md` の書き方。スライド（文字数・枚数）は [slide-grammar.md](slide-grammar.md)。共通の禁止事項と出力モードは [shared-rules.md](shared-rules.md)。

マークダウンは **そのスキルの問いに答えるブリーフィング** である。プロダクト物語の再掲でも、スライドの写しでも、本体 `docs/` の短縮コピーでもない。

新しいスキルのテンプレを足すときは、このファイルのあとに [../templates/docs/index.md](../templates/docs/index.md) をコピーし、Frame の列と Evidence だけを差し替える。埋めるときは各スキルの `templates/docs/index.md` を使う。

---

## 1. 5 ブロック。各ブロックは固有の情報だけを運ぶ

順番は固定。`Synthesis` は置かない。

| ブロック | 固有情報 | 失敗 |
|----------|----------|------|
| **Answer** | そのスキルの問いに対する結論 1 文 + 根拠 3 行 | 毎回ビジョンの一行を結論にする |
| **Frame** | この回の観測条件。見たもの / 見なかったもの / 根拠の強さ | 顧客ストーリーの再話。Answer の言い換え |
| **Evidence** | Answer を信じられる最小の構造物、原則 1 つ | カタログ。Answer を表で繰り返す |
| **Decision Gates** | このスキルが見つけた、人間だけの分かれ目（最大 3） | 上流スキルと同じ問いを新規であるかのように再掲 |
| **Gaps & Next Steps** | 誰が何をするか（最大 3）。次スキルへの手渡し | 「チームで議論する」 |

Answer が Frame より前なのは意図的。読み手はまず結論を知りたい。

あるブロックを消しても失われる情報がないなら、そのブロックは言い換えになっている。

---

## 2. 情報量

目安は **50〜80 行**。200 行を超えたら、本体成果物かチャットに戻す。

- Evidence は構造物 1 つ（表 1 枚、または図 1 つ + それを読む短い表）
- 本体 `docs/` があるスキルは切片だけを載せ、末尾にパスを 1 行置く
- 本体が無いスキル（hearing, market-landscape, personas, journey, assumption-breaker）では、この md が正本になる。それでもカタログは置かない
- プレースホルダが余ったら **行ごと削除** する。`{{GATE_3}}` を残さない
- 使わないモードの見出しは、中身ごと削除する

---

## 3. スライドと同じ主張、違う密度

共有するのは **同じ Answer と、同じ Gates**。形は分けてよい。

マークダウンだけが持てばよいもの:

- 確からしさ・未確定・創作した部分の列
- 上流成果物と本体 `docs/` へのリンク
- Next の「誰が / 何を」表

スライドに任せて、md から外すもの:

- Cover
- メッセージライン（`h2.msg`）。md の見出しは Answer で足りる
- 4 象限のビジュアル。md は表で書く

appendix を「余白があるから」足さない。

---

## 4. 出力に入れない

- `Synthesis` / `Formatting rules` / `Anti-patterns`（それらはこの文法の話であり、成果物ではない）
- カタログ・質問プール・AC・台本全セリフ・SDL 全文
- 他スキルが正本を持つ物語（金曜の台本は journey、一行は vision）
- 上流で開いた Gates の再掲。未決なら Frame に「personas の Gate 1 が未決」と書く

分かれ目の所有権:

| 分かれ目 | オーナー |
|----------|----------|
| 誰向けか | defining-personas-and-segments |
| 空白の軸 | market-landscape |
| 解く瞬間 | create-journey-map |
| 対外の一行 | product-vision-and-concept |
| 初回スコープ | feature-backlog-map |
| 失格ライン | uncertainty-map |
| 誰が Go を握るか | delivery-team-plan |
| 何で Go を切るか | delivery-phase-plan |

出力がそこで止まるときだけ、同じ分かれ目を自分の語彙で聞き直す。

---

## 5. スキルごとの Evidence（置き換えてよい箇所）

Frame の列名と Evidence の構造物は、スキル側テンプレが決める。共通骨格を壊さない。

| スキル | この md が答える問い | Evidence に置くもの | 置かないもの |
|--------|----------------------|---------------------|--------------|
| hearing (prep) | 今日何を聞くか | 当日の論点と、今日は出さないもの | ボトルネック断定、質問プール |
| hearing (analysis) | 何が分かって何が分かっていないか | 事実 / 観測 / 推測の分離表と、仮説 1 つ | 逐語録、解決策の確定 |
| market-landscape | 空白の右上はどこか | 2 軸、4 象限の配置要約、偽空白リスク | 個別サービスカタログ |
| defining-personas-and-segments | 誰向けの候補は誰か | 比較表（Counter 必須）と未確定の Primary 仮説 | ペルソナ小説、Primary 確定 |
| create-journey-map (asis) | 解くべき瞬間はどこか | 鋭い 1–2 シーンが目立つフェーズ俯瞰と Insight → HMW | 全セリフ |
| create-journey-map (tobe) | 理想の核はどのシーンか | As-Is / To-Be 対比とコアシーン候補 | HMW 未合意なのに確定 |
| function-usecase-map | 中心の行為は何か | 全体図と Top UC（未確定列つき） | 機能別図全量 |
| product-vision-and-concept | これは何でなぜ勝てるか | Why / Who / What / 差別化と、置いた前提 | 対話ログ、一行の再掲 |
| assumption-breaker | 何を疑うと設計が変わるか | 推奨 3 picks と、元提案への問い返し | 前提百科 |
| ooui-graphql-modeling | 何の型で足りるか | ER 要約と、能力 → 操作 | SDL 全文 |
| feature-backlog-map | 最初に何を作るか | 優先ストーリー Top N と、カバレッジの穴 | AC 全件 |
| uncertainty-map | 次に何を検証するか | コア × 未検証と、失格条件つきの次検証 | 全仮説の長表 |
| proto-storyboard | 5 分で何を見せるか | 3 カット表と、山場の画面 1 つ | To-Be 全フェーズ、DESIGN.md |
| delivery-team-plan | 誰が Go を握るか | 層（Owner / Exec / Support）と決め事 RACI | 矢羽、KPI |
| delivery-phase-plan | 何で Go を切るか | 主指標（現状 → 目標）とフェーズの背骨 | 全レーン全セル |

埋めた見本: [../examples/slot-northline/](../examples/slot-northline/)。
