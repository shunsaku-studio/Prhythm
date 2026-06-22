# Verification classifier — axis 2 (3 labels)

Axis 2 records what the prototype **actually verified**. Three labels separate "code exists" from "user-observed truth". The label determines how the assumption is reported and what the next action is.

## The three labels

| Label | Meaning | Required evidence | Confidence |
|-------|---------|-------------------|------------|
| ✅ 検証済 | Truth confirmed by **observation or measurement** (user engagement, performance benchmark, spike outcome, etc.) | Reference to log / analytics / interview note / spike report + scale + period + outcome | H or M |
| 🟡 部分検証 | Implementation works (tests green, e2e green) but no observation has been performed | Reference to test file / e2e suite / smoke run | M or L |
| ⬜ 未検証 | Not in prototype, or built without any test confirmation | None required | — |

**The line between 🟡 and ✅ is observation.** Animation of green tests is `🟡` only. To reach `✅`:

- **価値 / 市場 / 行動仮説**: 実ユーザーがプロトに触れ、その engagement が観察 / 計測された
- **技術仮説 (feasibility / performance / non-determinism)**: スパイク / PoC / ベンチマーク等が **計測 outcome** を残した（試行回数 / レイテンシ / 失敗率など機械可読な数値）
- **rendering behavior 仮説 (CLS / FCP / Suspense 等)**: 実機で計測ツール (Web Vitals / Lighthouse) によって観測された

つまり ✅ は「ユーザー接触」だけでなく「**観察可能な outcome を伴う計測一般**」を指す。

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

- `docs/validation-log.md` — **正準の検証ログ**（`validation-log` スキルが産出。V ID 付きエントリで Scale + Period + Outcome を構造化済み）
- `docs/usability-log.md` (or any markdown matching `usability` / `観察` / `interview`) — レガシー互換
- `docs/analytics/*`, `docs/measurements/*`
- `docs/spike-log.md` / `docs/poc-log.md` / `docs/perf-log.md` (技術スパイク / PoC / ベンチマーク結果)
- `docs/web-vitals/*` / Lighthouse レポート (rendering behavior 計測)
- Hearing notes referenced in the conversation

`docs/validation-log.md` のエントリは V ID で 1 件 = 1 手段 × 1 仮説に整理されているため、A ID で突き合わせれば Scale/Period/Outcome を機械的に拾える。`要追加計測` タグが付いたエントリは 3 要素が欠けているので 🟡 据え置き。観察ログが未整備のときは `validation-log` スキルでの記録を先に提案する。

If an entry references a specific assumption (by feature name, A ID, or behavior), promote 🟡 → ✅ **only if** all three are present:

- **Scale**: ≥1 計測単位 — 文脈に応じた分母（user / trial / case / 端末 / request 等）
  - 価値仮説の例: `n=5 ユーザー`, `n=120 訪問`
  - 技術仮説の例: `n=3 シナリオ試行`, `n=10,000 リクエスト`, `n=100 試行`, `n=5 端末 × 5 ページ = 25 観測点`
- **Period**: date or duration（例: `2026-06-10〜12`, `1 週間`）
- **Outcome**: measurable result — 計測値 / 数値目標 / 動作可否
  - 価値仮説の例: `完了率 100%`, `CVR 4.2%`, `離脱率 12%`
  - 技術仮説の例: `p95 = 2.3 秒`, `有効率 94%`, `CLS = 0.04`, `3/3 ケースで成功`

If any of the three is missing, leave at 🟡 and note "観察根拠の数値要確認".

**Anti-pattern**: スパイクが「動いた」「OK だった」とだけ書かれている → outcome が機械可読な数値ではないので 🟡 据え置き。`p95 / 成功数 / 有効率 / CLS` などの **計測値** を要求する。

### Sub-step 4 — Single-turn diff confirmation

Show the inferred matrix to the user. **Dialog opener template** (verbatim, fill placeholders):

```
入力 (vision <あり/なし> / feature-list 機能 <N> 件 / git ls-files <M> ファイル / 観察ログ <あり/なし>) を読み、
仮説 <T> 件を以下のように分類しました。差分があれば教えてください。なければそのまま確定します。

✅ A-D01-01-01 ターゲットは email 登録に抵抗ない
   根拠: usability-log.md #L23 (5 ユーザー / 2026-06 / 完了率 100%)

🟡 A-D01-01-02 ロックアウト挙動はサポート負荷許容
   根拠: src/auth/lockout.ts + lockout.test.ts (テスト緑のみ)

⬜ A-CORE-05 月額 X 円を支払う
   根拠: 該当する実装/観察なし

確定の合言葉: 「OK」「そのまま」「確定」 → そのまま emit
差分の伝え方: 「A-CORE-05 は LP で測ったので 🟡」「A-D02-XX は降格」など 1 行ずつ
```

### Dialog branch handling (verbatim responses)

User の応答パターンに対する agent の振る舞い:

| User reply | Agent action |
|------------|--------------|
| 「OK」「そのまま」「確定」「いい」 | そのまま Step 5 emit へ。再質問しない |
| 「A-XXX を ✅ に変更」+ 観察根拠あり | 当該行を更新、他はそのまま emit |
| 「A-XXX を ✅ に変更」+ 観察根拠なし | 拒否: "✅ には観察ログ（人数 + 期間 + 結果）が必要です。`docs/usability-log.md` がなければ 🟡 までとなります。" |
| 「全部 ✅」「動かしてるから検証済」 | 拒否: "実装+テストは 🟡 部分検証どまりです。" → Pressure handling §All Verified へ |
| 「vision 省略でいい」 | 拒否: "vision 引用を抜くと『なぜコアか』が再構成できなくなります。" → §Skip vision |
| Partial reply（一部しか答えない） | 答えられた部分のみ反映、残りは inferred のまま emit。再ループしない |
| 「もう一度確認したい」「もう少し精緻に」 | 1 ラウンドのみ追加質問可。2 ラウンド以降は emit を強制し残課題に「軸2 要確認」マーク |
| 仮説の追加要望 | 1 件まで受付、A ID は次の Seq で発行。N+1 件目以降は「次の更新サイクルで」と回答 |

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

- **Refuse.** Reply: "実装+テストは 🟡 部分検証どまりです。✅ には観察 / 計測の根拠（scale + 期間 + 結果）が必要です。"

When the user says "投資家向けに『全部検証済』に書き換えて":

- **Refuse.** Reply: "未検証コアを ✅ に書き換えると、レポートが信用を失います。残課題セクションで併記し、次の検証計画として正直に出した方が説得力が上がります。"

When the user says "観察人数は 1 人だけど ✅ にしたい" / "スパイクは 1 ケースだけ通った":

- Accept ✅ if scale ≥ 1 with explicit confidence note: "信頼度: L (n=1)". Do not pad the number.
- 技術仮説では特に「1 ケース成功」を `信頼度 L` で扱う運用が多い。本格採用前に scale を増やす検証スパイクを追加提案する。

When the user says "スパイクは『動いた』だから ✅ で":

- **Refuse.** Reply: "「動いた」は outcome として弱すぎます。何ケース試して何件成功したか / レイテンシは何 ms か / 失敗時の挙動は何か、機械可読な計測値が無いと 🟡 までです。"

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Code only → ✅ | Demote to 🟡; ✅ requires observation/measurement, not just compilation |
| Test name as evidence ("テスト緑なので ✅") | Demote to 🟡; tests are 🟡 evidence only |
| Padded scale ("ユーザーが触った気がする" / "だいたい動いた") | Stay at 🟡 until concrete numbers present |
| Empty 観察ログ but ✅ claimed | Demote; ask user for log location |
| All ⬜ in Mode B | Mode B requires showing prototype value; if all ⬜, the prototype hasn't been built — re-check inputs |
| 技術仮説に「動いた」「OK だった」だけの outcome | Demote to 🟡; require 機械可読な計測値（成功数 / p95 / 有効率 / CLS 等） |
| 「スパイクで実装したから検証済」 | スパイクは 🟡 までの根拠 (= 実装あり)。outcome の計測が無ければ ✅ にしない |

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
