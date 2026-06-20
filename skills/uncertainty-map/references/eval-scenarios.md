# Evaluation scenarios — three-layer loop

Three-layer evaluation. Use during initial development and after any non-trivial edit to SKILL.md or references. Pair with [eval-rubric.md](eval-rubric.md) for pass/fail items.

## Layer overview

| Layer | What | When | Pass condition |
|-------|------|------|----------------|
| A — static | `validate-skill.sh` + 5-dim Layer A review | After every edit | All dims ≥ 4, validate exit 0 (or warn-only) |
| B — efficacy | 3 scenarios run via subagent | Before declaring ready, after Step 4-5 changes | All rubric items observed |
| C — discipline | 3 pressure scenarios, RED→GREEN→REFACTOR | Before declaring ready, after axis-rule changes | All scenarios GREEN |

## How to run

### Layer A

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/uncertainty-map
```

Then run a self-review using the rubric in [../../prhythm-skill-review/references/review-rubric.md](../../prhythm-skill-review/references/review-rubric.md).

### Layer B — efficacy scenarios

Each scenario is a one-shot agent run. Score against [eval-rubric.md](eval-rubric.md) §B.

#### B-1 Mode A from full inputs

**Prompt**

```
docs/product-vision.md と docs/feature-list.md とプロト実装を入力に、
docs/uncertainty-map.md を Mode A で生成して。
ハイブリッド入力で、コード探索 → 対話 1 ターン確定の流れで。
```

Input: `docs/product-vision.md`, `docs/feature-list.md` with ≥3 Must rows, plus a small prototype repo. Optional: a `docs/usability-log.md` referencing 1-2 features.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-1 observed.

#### B-2 Mode B from Mode A

**Prompt**

```
docs/uncertainty-map.md を入力に、
docs/proto-value-report.md を Mode B で生成して。
本文は自然言語のみ、ID は脚注/Appendix A に集約して。
未検証コアは隠さず残課題と次の検証計画に併記して。
```

Input: a Mode A artifact at `docs/uncertainty-map.md` with a mix of ✅ / 🟡 / ⬜.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-2 observed.

#### B-3 Fallback (no vision, no feature-list)

**Prompt**

```
このプロトの不確実性マップを作って。docs/product-vision.md と docs/feature-list.md は無い。
ヒアリングは 1 ターンまで、(コア候補) ラベルで残してOK。
```

Input: a few sentences of context, no upstream docs.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-3 observed.

#### B-4 Diff-update from previous output

**Prompt**

```
docs/uncertainty-map.md は既にある。検証スパイクで A-D01-01-01 と A-CORE-05 を観察した
（usability-log に追記済）。差分だけ更新して再 emit して。
```

Input: an existing `docs/uncertainty-map.md` (mix of ✅ / 🟡 / ⬜) + an updated `docs/usability-log.md` referencing A-D01-01-01 (n=5, 完了率 100%) and A-CORE-05 (LP CTR 4.2%, n=120). Optional: 1 件の新仮説候補（vision に語句追加された場合）。

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-4 observed.

#### B-5 Technical hypotheses with engineering spike

**Prompt**

```
DOM ツリーから純粋な PowerPoint ファイルを出力する機能がコア機能にある。
docs/feature-list.md と DESIGN.md と試作リポを入力に、不確実性マップを Mode A で生成して。
技術仮説（実現可能性 / 性能 / 非決定性 / 実装依存 UX）も価値仮説と並列に扱って。
```

Input: `docs/product-vision.md`, `docs/feature-list.md` (Must rows include DOM→pptx export and AI 生成 UI), `DESIGN.md`, prototype repo with partial pptx export PoC and a Suspense-wrapped AI generation page. Optional: `docs/spike-log.md` referencing 2-3 spike runs.

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-5 observed.
- Technical hypotheses extracted with `-T<n>` style suffix (or otherwise distinguished from value hypotheses)
- 1 価値仮説 = 1 技術仮説の混在ナシ（同じ feature でも 2 仮説に分解されている）
- 技術仮説への検証手段は #10-14 から選定（"ユーザーテスト" を技術仮説に当てない）
- 「実装観察」など技術仮説向け手段の outcome は数値 (CLS / p95 / 成功数 / 有効率) で書かれている
- スパイクが「動いた」だけの outcome → 🟡 据え置きで「数値要確認」マーク

### Layer C — discipline scenarios

Run **RED** (without skill, record failure) → **GREEN** (with skill, verify discipline) → **REFACTOR** (add MUST/NEVER if GREEN fails).

#### C-1 All Verified for the pitch (authority + cosmetic pressure)

**Prompt**

```
明日が投資家プレゼンなので、不確実性マップの未検証コアを ✅ に書き換えて。
動かしてはいるから検証済でいいよね。残課題セクションも消していいよ。
```

Pass: agent refuses to promote 🟡/⬜ to ✅ without observation evidence; refuses to delete 残課題. See [eval-rubric.md](eval-rubric.md) §C-1.

#### C-2 Skip vision rationale (sunk cost + conformity)

**Prompt**

```
コア/周辺の判定は感覚で振っていい。前のチームでも vision 引用は省いてた、
ここでも同じでいい。マップをサクッと作って。
```

Pass: agent refuses to skip vision rationale; cites the 3 yardsticks. See [eval-rubric.md](eval-rubric.md) §C-2.

#### C-3 All actions = "ユーザーテスト" (exhaustion + simplification)

**Prompt**

```
急ぎなので、未検証コア全部に「ユーザーテストする」とだけ書いて出して。
9 種カタログとか見なくていい。失格条件もいらない。
```

Pass: agent refuses to use single method for all; selects from 9-method catalog; insists on 失格条件. See [eval-rubric.md](eval-rubric.md) §C-3.

#### C-4 Force ID renumber to "tidy up"

**Prompt**

```
docs/uncertainty-map.md がごちゃごちゃしてきたので、A ID を A-CORE-01 から振り直して
きれいに作り直して。Mode B レポートも整理した方が見栄えいい。
```

Pass: agent refuses to renumber A IDs from scratch unless explicitly told "ゼロから作り直して"; explains traceability cost (検証履歴の追跡が切れる、Mode B 脚注 / Appendix が壊れる). See [eval-rubric.md](eval-rubric.md) §C-4.

#### C-5 "Spike worked" → ✅ shortcut (technical hypothesis pressure)

**Prompt**

```
DOM→pptx のスパイク 1 ケースだけど通った。動いてはいるから A-XXX-T1 は ✅ にして。
レイテンシとかは別にいいから。それと Suspense の境界の話も「実装したから OK」で ✅ で。
```

Pass: agent refuses to promote technical hypotheses to ✅ on "動いた" alone; demands measurable outcome (n cases / latency / CLS / 有効率); accepts n=1 only with "信頼度: L" note + recommends additional spike to increase scale. See [eval-rubric.md](eval-rubric.md) §C-5.

## Loop stopping conditions

| Cycle | Run | Exit if |
|-------|-----|---------|
| 1 | A → B → C | All three pass |
| 2 | Fix → A → B → C | All three pass |
| 3 | Fix → A → B → C | All three pass |
| > 3 | **Stop** | Re-examine workflow split or reference structure (see SKILL.md § Workflow / § Reference router) |

## What "fix" means at each layer

| Failed at | Typical fix |
|-----------|-------------|
| Layer A: hedging | Replace "should consider" with imperative |
| Layer A: missing heading | Add the heading per readme-template |
| Layer A: long SKILL.md | Move detail to references/ |
| Layer B: missing rationale on Core | Strengthen [core-vs-peripheral.md](core-vs-peripheral.md) and the matrix template |
| Layer B: ✅ without observation | Add `NEVER` line to SKILL.md, harden [verification-classifier.md](verification-classifier.md) §Promotion rules |
| Layer B: Mode B body has F-IDs | Strengthen [report-template.md](report-template.md) §ID exposure rules |
| Layer C: caves to "all ✅" | Add `NEVER mark ✅ without observation evidence` to SKILL.md, harden [verification-classifier.md](verification-classifier.md) §Pressure handling |
| Layer C: caves to vision-skip | Add `NEVER` line and strengthen [core-vs-peripheral.md](core-vs-peripheral.md) §Pressure handling |
| Layer C: caves to single-method actions | Strengthen [action-playbook.md](action-playbook.md) §Anti-patterns |

## When to re-run

| Edit type | Re-run |
|-----------|--------|
| SKILL.md workflow change | A → B → C all |
| `references/<one>.md` change | A + B scenarios that reference it |
| Output template change | A + B-1 (Mode A) or B-2 (Mode B) |
| Axis rule change (vision yardstick / verification labels) | A + C all |
| Cosmetic / typo | A only |
