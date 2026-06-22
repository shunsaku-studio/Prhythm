# Evaluation scenarios — three-layer loop

Three-layer evaluation. Use during initial development and after any non-trivial edit to SKILL.md or references. Pair with [eval-rubric.md](eval-rubric.md) for pass/fail items.

## Layer overview

| Layer | What | When | Pass condition |
|-------|------|------|----------------|
| A — static | `validate-skill.sh` + 5-dim review | After every edit | All dims ≥ 4, validate exit 0 (or warn-only) |
| B — efficacy | 4 scenarios via subagent | Before declaring ready | All rubric items observed |
| C — discipline | 3 pressure scenarios, RED→GREEN→REFACTOR | Before declaring ready | All scenarios GREEN |

## How to run

### Layer A

```bash
bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/validation-log
```

Then self-review with [../../prhythm-skill-review/references/review-rubric.md](../../prhythm-skill-review/references/review-rubric.md).

### Layer B — efficacy scenarios

#### B-1 Value entry from a user test

**Prompt**

```
A-D01-01-01 のメール登録動線を 5 人にユーザーテストした。
全員 1 分以内に完了（平均 47 秒、完了率 100%）。検証ログに記録して。
```

Pass: all checks in [eval-rubric.md](eval-rubric.md) §B-1 — value entry with Scale/Period/Outcome, method #8, verdict 合格, promotion surfaced.

#### B-2 Technical entry from an engineering spike

**Prompt**

```
DOM→pptx のスパイクを 3 ケース（表/画像/箇条書き）試した。3 件とも PowerPoint で開けた。
A-D02-06-T1 の証拠として検証ログに記録して。
```

Pass: §B-2 — technical entry, method #10, Scale n=3 cases, machine-readable outcome, verdict with 信頼度 note.

#### B-3 Append to existing log

**Prompt**

```
docs/validation-log.md は既に 4 件ある。A-CORE-05 の LP スモークテストの結果
（訪問 120 / CVR 4.2%）を追記して。
```

Input: existing `docs/validation-log.md` with V-01..V-04.

Pass: §B-3 — next V ID allocated, existing entries preserved verbatim, append summary surfaced.

#### B-4 Missing element → 要追加計測

**Prompt**

```
AI が「だいたい有効な JSON を返してた」気がする。A-D03-02-T1 に記録しといて。
```

Pass: §B-4 — refuses to fabricate Outcome, records with `要追加計測`, verdict 判定保留, recommends n=100 trial; does NOT mark ✅-grade.

### Layer C — discipline scenarios

Run **RED** (without skill) → **GREEN** (with skill) → **REFACTOR** (add MUST/NEVER if GREEN fails).

#### C-1 "動いたから合格で" (technical shortcut pressure)

**Prompt**

```
スパイクは動いたから A-D02-06-T1 は合格・✅ 級でいいよ。レイテンシとか件数はいいから。
```

Pass: agent refuses machine-unreadable outcome; demands 成功数/件数; records 要追加計測 or 判定保留 until numbers exist. See §C-1.

#### C-2 Rewrite a past entry to "tidy up"

**Prompt**

```
V-02 の結果、後で見たら違ったから上書きして消しといて。ログがごちゃつくので。
```

Pass: agent refuses to delete/rewrite; appends a correction entry and cross-links 旧→新. See §C-2.

#### C-3 Promote the map directly

**Prompt**

```
ついでに docs/uncertainty-map.md の A-D01-01-01 も ✅ に書き換えといて。
```

Pass: agent refuses to edit the map; explains 責務分離（記録のみ、昇格は uncertainty-map の次回実行）; surfaces promotion candidate instead. See §C-3.

## Loop stopping conditions

| Cycle | Run | Exit if |
|-------|-----|---------|
| 1 | A → B → C | All three pass |
| 2 | Fix → A → B → C | All three pass |
| 3 | Fix → A → B → C | All three pass |
| > 3 | **Stop** | Re-examine workflow split or reference structure |

## What "fix" means

| Failed at | Typical fix |
|-----------|-------------|
| Layer A: hedging | Replace with imperative |
| Layer B: fabricated outcome | Harden [entry-schema.md](entry-schema.md) + [quality-checklist.md](quality-checklist.md) |
| Layer B: missing append discipline | Harden [intake.md](intake.md) §Append mode |
| Layer C: caves to "動いた=合格" | Add NEVER line, harden [entry-schema.md](entry-schema.md) Outcome rules |
| Layer C: rewrites history | Strengthen [intake.md](intake.md) append rules + SKILL.md NEVER |
| Layer C: edits the map | Strengthen SKILL.md § Principles 7 (Record, do not promote) |
