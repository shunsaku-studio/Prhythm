---
name: validation-log
description: >-
  Record validation / observation results into a structured docs/validation-log.md
  so uncertainty-map can promote assumptions ⬜ → 🟡 → ✅. Use when the user wants
  検証ログ, 観察ログ, ユーザーテスト結果を記録, スパイク結果を残す, ベンチマーク結果を記録, A/B 結果を記録,
  validation log, observation log, 検証結果をまとめて, "プロトをユーザーに触ってもらった結果",
  "スパイクの結果を残したい", or wants to capture evidence (scale + period + outcome)
  for a specific A ID before re-running uncertainty-map.
disable-model-invocation: false
---

# Validation Log

Capture validation and observation results — value tests (#1-9) and technical spikes / benchmarks (#10-14) — into a structured, append-only `docs/validation-log.md`. Each entry carries the three elements `uncertainty-map` requires to promote an assumption: **Scale + Period + Outcome**, linked back to an A ID. This skill is the upstream producer of the observation evidence that `uncertainty-map` consumes.

> Human-facing overview: [README.md](README.md). Detailed references: [references/](references/).

## When to use

- "ユーザーテストの結果を記録して / 観察ログに残して" → record a value-test entry
- "スパイク / PoC / ベンチマークの結果を残して" → record a technical entry
- "A-D01-01-01 を検証したので記録して" → record an entry for a specific A ID
- "検証ログをまとめて / プロトをユーザーに触ってもらった結果を整理して" → batch-record multiple entries
- After a validation activity, **before** re-running `uncertainty-map` to promote statuses

## When NOT to use

- Deciding what to verify next / building the matrix → use [uncertainty-map](../uncertainty-map/SKILL.md)
- Extracting assumptions from features → use [uncertainty-map](../uncertainty-map/SKILL.md)
- Feature inventory / PBI → use [feature-backlog-mapper](../feature-backlog-mapper/SKILL.md)
- Running the validation activity itself (writing the spike code, recruiting testers) → separate engineering / research task; this skill only **records the result**

## Reference router

| Task | Doc |
|------|-----|
| Confirm what activity happened, find log + uncertainty-map, diff-append | [references/intake.md](references/intake.md) |
| Entry schema (mandatory fields, value vs technical) | [references/entry-schema.md](references/entry-schema.md) |
| Tag the validation method (#1-14) | [references/method-tagging.md](references/method-tagging.md) |
| Full `docs/validation-log.md` output template | [references/log-template.md](references/log-template.md) |
| Anti-slop / honesty gate before write | [references/quality-checklist.md](references/quality-checklist.md) |
| Self-evaluation scenarios (Layer B/C) | [references/eval-scenarios.md](references/eval-scenarios.md) |
| Pass/fail rubric for evaluations | [references/eval-rubric.md](references/eval-rubric.md) |

Read reference files at the relevant step. Do not load all upfront.

## Mode flow (entry-point shortcuts)

| Situation | Flow |
|-----------|------|
| 1 件の検証結果を記録 | Step 0 → 1 → 2 → 3 → 4 |
| 複数の検証結果をまとめて記録 | Step 0 → (1→2→3 を件数分) → 4 |
| `docs/validation-log.md` 既存（追記） | Step 0 (append mode) → 1 → 2 → 3 → 4 |
| 過去エントリの訂正 | Step 0 → 新エントリで上書きせず追記し、旧エントリに `訂正→V-NN` 注記 |
| A ID が `uncertainty-map` に無い | Step 0 → ユーザーに A ID を確認 or `(A候補)` 暫定 ID で記録 |

Announce the chosen flow in one line before Step 1.

## Workflow

### Step 0 — Intake

Read [references/intake.md](references/intake.md).

1. Identify the validation activity: what was tested, who/what was the subject, when.
2. Find `docs/validation-log.md`. If present, **append** (preserve existing entries verbatim, allocate next entry ID). Never rewrite history.
3. Find `docs/uncertainty-map.md` to align each entry with an existing A ID. If the A ID is absent, ask once, then fall back to `(A候補)` provisional tagging.

### Step 1 — Classify the activity

Read [references/method-tagging.md](references/method-tagging.md).

- Tag the method as one of the 14 catalog methods (`#1-9` value / `#10-14` technical). The catalog of record lives in [uncertainty-map action-playbook](../uncertainty-map/references/action-playbook.md).
- Mark the entry as **value** or **technical** so downstream promotion applies the right yardstick.

### Step 2 — Capture the three mandatory elements

Read [references/entry-schema.md](references/entry-schema.md). Every entry MUST carry all three:

1. **Scale** — `n=<count>` with unit (users / trials / cases / requests / 端末). `n=1` is valid with a 信頼度 L note; never pad the number.
2. **Period** — date or duration (`2026-06-10〜12`, `1 週間`).
3. **Outcome** — machine-readable measurement (完了率 100% / CVR 4.2% / p95 2.3s / 有効率 94% / CLS 0.04 / 3 件中 3 件成功). "動いた" / "だいたいOK" is **not** an outcome.

If any of the three is absent, do not fabricate it. Record what exists and mark the entry `要追加計測` so `uncertainty-map` keeps the assumption at 🟡.

### Step 3 — Verdict against the failure threshold

- State the 失格条件 (refute condition) that was set, and whether the outcome cleared it: `合格 / 不合格 / 判定保留`.
- `判定保留` when scale is too small for the claim (e.g. n=1 spike) — record it, recommend a follow-up to raise scale.
- Capture 学び (what was learned) and 次アクション in one line each.

### Step 4 — Emit & hand-off

Read [references/log-template.md](references/log-template.md). Then cross-check with [references/quality-checklist.md](references/quality-checklist.md).

- Append the entry block to `docs/validation-log.md` (create the file with the header if absent).
- Surface which `uncertainty-map` assumptions the new entries support, and the promotion they enable (⬜ → 🟡 → ✅), but do **not** edit `docs/uncertainty-map.md` here — that is `uncertainty-map`'s job on its next run.

## Final deliverable

Every session ends with the report block below — even partial / interrupted sessions. **Do not exit without it.**

```
✅ docs/validation-log.md に記録しました
- 追加エントリ: <N> 件（value <v> / technical <t>）
- 対象 A ID: <A-..., A-...>
- 判定: 合格 <p> / 不合格 <f> / 判定保留 <h>
- 要追加計測: <q> 件（Scale/Period/Outcome のいずれか欠落）
- 次の一手: /uncertainty-map を再実行すると <昇格可能件数> 件の昇格判定が走ります
```

Output file shape (summary; full template in [references/log-template.md](references/log-template.md)):

- ヘッダ（目的 / 対象プロト / 凡例）
- エントリ一覧（時系列、各エントリは V ID / 日付 / 対象 A ID / 手段 / Scale / Outcome / 判定 / 学び）
- 昇格サマリ（このログで `uncertainty-map` のどの仮説が昇格可能か）

## NEVER

- Record `✅`-grade evidence missing any of Scale / Period / Outcome — mark `要追加計測` instead
- Write "動いた" / "だいたい" / "数人" as an outcome — outcomes are machine-readable numbers or `—`
- Fabricate user counts, durations, latencies, or success rates
- Rewrite or delete a past entry — append a new entry and cross-link the correction
- Edit `docs/uncertainty-map.md` directly — surface promotions for its next run only
- Reuse a retired V ID

## MUST

- Link every entry back to an A ID (or `(A候補)` when the assumption is not yet in `uncertainty-map`)
- Tag every entry with a method (`#1-14`) and value/technical flag
- Carry the 失格条件 and the 合格/不合格/判定保留 verdict on every entry
- Accept `n=1` only with an explicit 信頼度 L note, and recommend raising scale
- Use `—` for any element you cannot verify; never invent it

## Principles

The stance behind the workflow. When references conflict with these, the principles win.

1. **Evidence = Scale + Period + Outcome** — 3 点が揃って初めて ✅ 級の証拠。1 つでも欠ければ 🟡 級として記録し、捏造で埋めない。
2. **Outcome is machine-readable** — 「動いた」「だいたい」は outcome ではない。完了率 / CVR / p95 / 有効率 / CLS / 成功数で書く。
3. **Append-only history** — 過去エントリは書き換えない。訂正は新エントリ + 相互リンクで、検証の軌跡を保全する。
4. **Traceability to A ID** — すべてのエントリは A ID に紐付く。紐付かない観察は `(A候補)` で記録し、後で `uncertainty-map` に取り込む。
5. **Failure threshold defines learning** — 失格条件と合否を必ず残す。期待値だけでは学びが歪む。
6. **Technical ≠ value evidence** — スパイク / ベンチの計測（成功数 / p95 / 有効率）も観察証拠として正当。ただし価値証拠（ユーザー観察）と混同せず、entry に value/technical を明示する。
7. **Record, do not promote** — このスキルは証拠を残すだけ。昇格判定は `uncertainty-map` が行う。責務を越えてマップを書き換えない。
8. **Honesty over optics** — n=1 を多く見せない。判定保留を隠さない。正直さが検証ログの価値。
9. **Always land the deliverable** — Every session ends with the Final deliverable block, even when partial.

## Anti-patterns for the agent

- Recording an entry without a linked A ID — always tie it back or tag `(A候補)`
- Accepting "動いた" as a technical outcome — demand 成功数 / レイテンシ / 有効率
- Padding `n=1` to look like more — keep the number honest with a 信頼度 L note
- Rewriting a past entry for "tidy up" — append + cross-link instead
- Editing `docs/uncertainty-map.md` from this skill — surface promotions only
- Looping the intake dialog more than once before recording
- Loading all references upfront instead of on-demand at each step

## Self-evaluation loop

Run all three layers before declaring the skill ready or after edits. Full scenarios, prompts, and rubric live in [references/eval-scenarios.md](references/eval-scenarios.md) and [references/eval-rubric.md](references/eval-rubric.md).

1. **Layer A static**: `bash skills/prhythm-skill-review/scripts/validate-skill.sh skills/validation-log`
2. **Layer B efficacy**: scenarios (value entry / technical entry / append / missing element) — pass when all rubric items observed
3. **Layer C discipline**: pressure scenarios — RED → GREEN → REFACTOR

If any layer fails, fix SKILL.md / references and re-run from Layer A. Stop after 3 cycles and revisit § Workflow or § Reference router.
