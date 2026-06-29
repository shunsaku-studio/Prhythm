# Persona Description Template

A persona is **not a demographic profile**. It is a **model of decision-making and behavior under a specific situation**.

This Skill writes personas in **two stages**:
- **Stage 1 (overview)**: one row in a comparison table. Short, easy to compare side-by-side
- **Stage 2 (deep-dive)**: thick characterization of the persona after the human picks Primary

Every assertion gets a **Fact / Assumption / Unknown / Risk** tag (see `evidence-levels.md`).

The artifact is rendered in Japanese; English appears only for the stable concept labels.

---

## Stage 1: Comparison-table template

A persona is one row. Minimum columns:

| Persona | ラベル | 対応セグメント | 状況（一行） | 主要 JTBD | 現在の代替手段 | 主要バリア | 成功の定義 | F/A/U/R |
|---|---|---|---|---|---|---|---|---|
| ペルソナ 1: 〈状況+動機の短い識別名〉 | Primary candidate (hypothesis) | Segment 1 | 〈時刻・場所・トリガーを一行で〉 | 〈主な JTBD を一行で〉 | 〈今、何でこの問題を解いているか〉 | 〈最も大きい妨げ〉 | 〈どうなれば成功か〉 | F:3 A:2 U:1 R:1 |
| ペルソナ 2: 〈Primary の対極にいる識別名〉 | Counter-persona | Segment 3 | 〈Primary と中核軸で正反対の状況〉 | 〈Primary とは別方向の JTBD、または「片付けたい仕事がない」〉 | 〈Primary とは異なる代替手段、または何もしていない〉 | 〈Primary とは別軸のバリア〉 | 〈Primary の成功と整合しない、別の成功定義〉 | F:1 A:3 U:2 R:1 |

Rules:
- 2–4 personas. **At least one must be a Counter-persona.**
- Label is one of: `Primary candidate (hypothesis)` / `Secondary candidate` / `Counter-persona`
- Name personas by "situation + motivation", not job title. Example: "忙しい現場マネージャー（属人化を解消したい）"
- Keep cells to 1–2 lines, terse
- Insert `[Fact]` `[Assumption]` etc. tags inside cells as needed
- `F:3 A:2 U:1 R:1` (final column) is the tag-count summary for that persona
- Do not write the average / median user. Push to the edge.

---

## How to place a Counter-persona

A Counter-persona is a person with **opposite traits on a critical axis** from the Primary candidate. The mechanism is not just "who to aim at" — it makes visible **who you lose by optimizing**.

### What the Counter-persona does

- **Surfaces the boundary of design decisions** — you can lay out how a Primary-oriented UI/wording/flow choice impacts the Counter
- **Prevents the "appeal to everyone" illusion** — avoids middling design; treats it as an explicit tradeoff
- **Robustness check** — if a Primary-targeted design happens to work for the Counter too, that is a strength signal
- **Makes strategic exclusion explicit** — if Primary optimization will reliably lose the Counter, write that as a deliberate cut

### How to choose one

1. **Identify the Primary's defining trait (central axis)** — pick the one feature that makes the Primary a Primary.
   Example axes:
   - Strength of motivation in this domain (high ↔ low)
   - Presence of existing tools / habits (have ↔ don't have)
   - Literacy / sophistication (high ↔ low)
   - Engagement frequency (daily ↔ a few times a year)
   - Activeness in solving (drives it themselves ↔ uses what is given)

2. **Invert that axis to build one person** — other attributes (workplace, age) are not required to differ. **Inversion on the central axis is the only requirement.**

3. **Stay within the same problem domain** — a totally unrelated person provides no comparison. Pick someone who could plausibly cross paths with the same product, but stands in the opposite stance.

### The Counter-persona is not a "target"

- The Counter is a **design reference point**, not an optimization target.
- "Whether to also hit the Counter" is itself a Human Decision Gate (see human-decision-gates.md).
- Often the Counter maps to an Out-of-scope segment. Still, write the persona — the point is design reference.

### What to write in the Counter-persona row (Stage 1 table)

- **Situation**: a different time / place / trigger from the Primary
- **Main JTBD**: a job that does not align with the Primary's job — or "no job (does not need this product)"
- **Current alternatives**: different existing tools, or "nothing"
- **Main barrier**: a barrier on a different axis from the Primary's
- **Success definition**: a success state that does not align with the Primary's

If the Counter reads as a "watered-down Primary", the writing is wrong. The Counter operates on a different logic from the Primary.

---

## Stage 2: Deep-dive template

Write the chosen persona thickly. Tag every item with Fact / Assumption / Unknown / Risk.

### ペルソナ: 〈identifier〉

#### 対応するセグメント
〈Which row in the Stage 1 segment table this corresponds to〉

#### サマリー（1段落）
Who, in what situation, trying to finish what. Include relevant background / position in one paragraph.

Example: 「3人の介護スタッフを束ねる現場リーダー。情報共有がノートと口頭に依存していて、夜勤への引き継ぎ漏れで何度かヒヤリハットを経験している。エクセルは使えるが、新しいツールを覚える時間はない。」

#### 典型的な利用シーン
Concrete: time, place, trigger, and the emotion in that moment. 1–3 scenes.

Example:
- 18:50 — 夜勤者の出勤直前。当日昼間の利用者の様子を急いでまとめる。手が震えているくらい急いでいる。
- 翌朝 7:30 — 夜勤者と日勤者の交代。前日書いた引き継ぎに「これ書いてない」と指摘される。

#### JTBD 階層

JTBD (Jobs To Be Done) = the central purpose for which the user "hires" the product to finish a particular situation.
Writing the 4 layers makes both **functional** (Main / Related) and **psychological** (Emotional / Social) requirements visible.

| 階層 | 説明（1行） | 内容 |
|---|---|---|
| Main job | The central job for which the persona "hires" this product | 〈例: 「夜勤への引き継ぎを漏れなく終わらせる」〉 |
| Related job | A nearby job they also want to finish | 〈例: 「自分の業務記録を後から検索できるようにする」〉 |
| Emotional job | Emotional motivation behind the action — "I want to feel X / not feel Y" | 〈例: 「ヒヤリハットを起こすのは怖い、安心して帰宅したい」〉 |
| Social job | How they want to be seen by others / how they don't | 〈例: 「ちゃんとやってる人と思われたい、無責任と思われたくない」〉 |

Each job gets a **[Fact]** or **[Assumption]** tag.

Main / Related are usually addressed via features. Emotional / Social are usually addressed in UI tone, copy, notification wording — the details. Missing these results in "features are there, but it doesn't get used."

#### 人物の具体像（行動・選好の手がかり）

Write "personality / likes / how they speak" **in the range that connects to behavior or design decisions**. Avoid the decorative-demographics trap by adding a one-line "how this informs design decisions" to every item.

| 項目 | 内容（例） | 設計判断への効き方（例） |
|---|---|---|
| 名前（仮） | 〈例: 山田 紀子〉 | A concrete name is easier to recall in discussion than "Persona A". **[Risk]** stereotyping |
| 年齢・属性 | 〈例: 42歳、女性、介護施設勤務7年〉 | Initial estimate of habit strength / IT literacy |
| 性格特性 | 〈例: 慎重、ミスを恐れる、決める前に同僚に相談したい〉 | Tone of error display, granularity of confirm dialogs |
| 決定スタイル | 〈例: 自分一人では決めない、施設長 / ベテランに確認する〉 | Whether the UI needs an approval flow at this point |
| ストレス時の反応 | 〈例: 急いでいる時ほど紙に戻る、新しいことを覚える気が消える〉 | Error recovery UI; whether onboarding can be skipped |
| 普段の口調 | 〈例: 丁寧語、感情を抑えめに表現する〉 | Copywriting tone, notification wording |
| 好きなもの / 慣れているもの | 〈例: LINE、Yahoo!ニュース、紙ノート〉 | Familiar UI patterns to reference; gesture / vocabulary choice |
| 苦手なもの / 避けるもの | 〈例: 英語のメニュー、横文字、Excelの関数〉 | Vocabulary; language choice in UI |
| 平日のリズム | 〈例: 朝6:30起床、家事→出勤→17時上がり、夜は家族と〉 | Push-notification timing; available time inference |

Each item carries **[Fact]** / **[Assumption]** tags. Attributes not in the input must not be invented; choose **[Unknown]** or omit (see anti-pattern #9).

This section is also written for the Counter-persona (in fact, the Counter benefits more — the explicit difference from the Primary becomes visible).

#### インタビュー引用 + 推測の境界

Quote the original phrasing from the input. **Always** separate **Fact** (the actual statement) from **Assumption** (the writer's extrapolation).

Example:
- **[Fact]** 「ベテランの人に聞けるときは聞くが、忙しそうで聞きづらい」（U1直接発言）
- **[Assumption]** 自分の確認不足を上長に咎められることを恐れている（U1が言葉にしていないが、文脈から推測）

#### 現在の代替手段

- ツール / 方法: 〈concretely〉
- 不満点: 〈〉
- 満足している点: 〈〉
- なぜ完全に置き換えられないのか: 〈〉

`[Risk]` tag: strong satisfaction with the existing alternative implies a high switching barrier.

#### バリア（妨げ・離脱要因）

- 心理的: 〈e.g., anxiety about a new tool〉
- 実務的: 〈e.g., gives up if input takes more than 2 minutes〉
- 政治的: 〈e.g., introducing without manager approval gets pushback〉

#### 成功の定義（このペルソナにとっての）

Emotion- and situation-based, not numeric.
Example: 「夜勤者から『助かった』と言われる」「自分が休んでも回ると確信できる」

#### 失敗の定義

The state at which this persona decides "I'm done using it."
Example: 「3回入力したのに役に立たない」「同僚に勧めて拒否された」

#### Fact / Assumption / Unknown / Risk のサマリー

```
- Fact: N項目
- Assumption: M項目
- Unknown: K項目
- Risk: L項目
```

If Assumption clearly outnumbers Fact, state that this persona is at "hypothesis stage".

#### このペルソナで未検証の最大の論点

Narrow to 1–3. These directly become items to check in the Stage 2 Validation Plan.

#### 顔写真生成プロンプト（任意）

A face photo helps with internal recall during persona discussions (but it also carries the risk of cementing stereotypes — see caveat below).

Write one English prompt suitable to paste into an image-generation tool (Midjourney / DALL-E / Imagine / Sora, etc.). Build it from the persona's **behavior, situation, and emotion** in the characterization section. Avoid the occupational-stereotype look (the white-coat doctor, the suited salesperson).

Template:

```
A [age band] [gender or "person"] [ethnic / regional attributes if needed for the call], [work context or place],
photographed in [time and place of typical scene],
expression: [derived from the emotional job — e.g., "tired but focused"],
clothing: [normal dress, matched to the workplace context],
environment: [alternatives or tools in view — e.g., "paper notebook on cluttered desk"],
style: realistic documentary photography, candid, not posed,
avoid: stock photo aesthetic, exaggerated smile, generic office background.
```

Example (for the persona "現場リーダー（紙派）"):

```
A Japanese woman in her early 40s, working as a care home shift leader,
photographed at 18:50 in a small staff room, writing in a paper notebook,
expression: tired but focused, slight worry,
clothing: pale blue caregiver uniform, no makeup, hair tied back,
environment: handwritten notebook in front of her, LINE notification visible on a phone on the desk, fluorescent light,
style: realistic documentary photography, candid, not posed,
avoid: stock photo aesthetic, exaggerated smile, generic office background.
```

**[Risk]** Cautions:
- Images activate discussion, but can also cement unagreed stereotypes (gender / age / ethnicity bias)
- Before sharing "the photo of this persona", confirm with stakeholders that narrowing to one body type does not feel off
- A photo makes the persona feel like "an actual person". Check that the photo does not contradict the summary or JTBD

Generating one for the Counter-persona too makes design conversations like "this design will land for Primary but anger the Counter" easier.

---

## Common notes

- **Do not over-write**: a Stage 2 persona is roughly A4 2–3 pages. Beyond that, it stops being read.
- **Do not lead with demographics**: write age / gender / occupation in the "人物の具体像" section, tied to behavior and design decisions. The opening summary begins with situation and motivation.
- **Photos, names, and characterization activate discussion — and risk cementing stereotypes**: when using the "人物の具体像" and "顔写真生成プロンプト" sections, confirm with stakeholders that committing to one body does not feel off.
- **Do not write the "average user"**: a centered person resonates with no one in particular. Push to the edge.
- **Differentiate personas sharply**: in the Stage 1 table, each column should make the differences across personas legible.
- **Write the Counter-persona at the same depth**: omitting it in Stage 2 destroys the ability to compare design decisions. At minimum, do not skip "人物の具体像" and "design-decision conflict with Primary".
