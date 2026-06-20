# Verification classifier — axis 2 (3 labels)

Axis 2 records what the prototype **actually verified**. Three labels separate "code exists" from "user-observed truth". The label determines how the assumption is reported and what the next action is.

## The three labels

| Label | Meaning | Required evidence | Confidence |
|-------|---------|-------------------|------------|
| ✅ 検証済 | Truth confirmed by user observation or measurement | Reference to log / analytics / interview note + sample size + period | H or M |
| 🟡 部分検証 | Implementation works (tests green, e2e green) but no user has touched it | Reference to test file / e2e suite / smoke run | M or L |
| ⬜ 未検証 | Not in prototype, or built without any test confirmation | None required | — |

**The line between 🟡 and ✅ is user contact.** Animation of green tests is `🟡` only. To reach `✅`, real users must have engaged with this part of the prototype, and the engagement must have been observed or measured.

## Hybrid classification (5 sub-steps)

### Sub-step 1 — Seed everything as ⬜

Start with all assumptions at `⬜ 未検証`. This is the safe default.

### Sub-step 2 — Probe the codebase

Run:

```bash
git ls-files
```

For each assumption with a feature anchor (`A-<F-ID>-<Seq>`), run three greps:

| Grep | Pattern | Promotes to |
|------|---------|-------------|
| F-ID literal | `F-D01-01` (or whatever the F ID is) | 🟡 if found in implementation file |
| Feature name keyword | Japanese name + English equivalent (use `feature-list.md` 機能名 + reasonable EN) | 🟡 if matched (multiple files) |
| Test file existence | glob `*<feature-key>*.test.*`, `*<feature-key>*.spec.*` | 🟡 if a test file exists |

A feature with implementation **and** at least one test gets 🟡. A feature with only stub or only types stays ⬜.

### Sub-step 3 — Look for observation evidence

Read these files if present:

- `docs/usability-log.md` (or any markdown matching `usability` / `観察` / `interview`)
- `docs/analytics/*`, `docs/measurements/*`
- Hearing notes referenced in the conversation

If an entry references a specific assumption (by feature name, A ID, or behavior), promote 🟡 → ✅ **only if** all three are present:

- Sample size (≥1 user observed)
- Period (date or duration)
- Outcome description (what was learned, not just "tested")

If any of the three is missing, leave at 🟡 and note "観察根拠の数値要確認".

### Sub-step 4 — Single-turn diff confirmation

Show the inferred matrix to the user. Format:

```
✅ A-D01-01-01 ターゲットは email 登録に抵抗ない
   根拠: usability-log.md #L23 (5 ユーザー / 2026-06 / 完了率 100%)

🟡 A-D01-01-02 ロックアウト挙動はサポート負荷許容
   根拠: src/auth/lockout.ts + lockout.test.ts (テスト緑のみ)

⬜ A-CORE-05 月額 X 円を支払う
   根拠: 該当する実装/観察なし

差分があれば教えてください。なければそのまま確定します。
```

Accept user diffs. Do not re-loop the dialog more than once.

### Sub-step 5 — Lock in

After diff confirmation, every assumption has `(axis1, axis2)` finalized. Proceed to Step 5 emit.

## Promotion / demotion rules

| From | To | Required |
|------|-----|----------|
| ⬜ → 🟡 | 🟡 | Implementation file + ≥1 passing test |
| 🟡 → ✅ | ✅ | + observation log entry with sample size, period, outcome |
| ✅ → ✅ (stay) | ✅ | Original evidence still cited |
| Any → ⬜ | ⬜ | User explicitly says "not verified" or evidence retracted |

**Never** promote ⬜ → ✅ in one step. ✅ requires the 🟡 prerequisite implicitly (you can't observe what doesn't exist).

## Pressure handling

When the user says "動かしてるから検証済でいい":

- **Refuse.** Reply: "実装+テストは 🟡 部分検証どまりです。✅ にはユーザー観察 / 計測の根拠（人数 + 期間 + 結果）が必要です。"

When the user says "投資家向けに『全部検証済』に書き換えて":

- **Refuse.** Reply: "未検証コアを ✅ に書き換えると、レポートが信用を失います。残課題セクションで併記し、次の検証計画として正直に出した方が説得力が上がります。"

When the user says "観察人数は 1 人だけど ✅ にしたい":

- Accept ✅ if ≥1 user with explicit confidence note: "信頼度: L (n=1)". Do not pad the number.

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Code only → ✅ | Demote to 🟡; ✅ requires user contact |
| Test name as evidence ("テスト緑なので ✅") | Demote to 🟡; tests are 🟡 evidence only |
| Padded sample size ("ユーザーが触った気がする") | Stay at 🟡 until concrete numbers present |
| Empty 観察ログ but ✅ claimed | Demote; ask user for log location |
| All ⬜ in Mode B | Mode B requires showing prototype value; if all ⬜, the prototype hasn't been built — re-check inputs |

## Coverage check after classification

After all assumptions are labeled:

| Distribution | Reading |
|--------------|---------|
| Many ✅, few ⬜ | Mature prototype; Mode B emphasis on success |
| Many 🟡, few ✅ | Engineered prototype, no user contact yet — schedule observation as the top action |
| Many ⬜, few 🟡 | Early prototype; Mode A emphasis on "what to build for next validation" |
| All ⬜ | Re-check inputs (DESIGN.md scope, code presence) before emit |

Report the distribution in the output's カバレッジ・サマリ section.

## Hand-off to Step 5

After axis 2 classification you should have:

- Every assumption labeled ✅ / 🟡 / ⬜
- Every ✅ has an observation reference (file + sample size + period)
- Every 🟡 has a code+test reference (file paths)
- Every ⬜ for a Core assumption has at least one validation action proposed (see [action-playbook.md](action-playbook.md))

Proceed to emit using [matrix-template.md](matrix-template.md) (Mode A) or [report-template.md](report-template.md) (Mode B).
