# Evaluation scenarios — runbook

Reproducible prompts and inputs for Layer B (efficacy) and Layer C (discipline). Pair with [rubric.md](rubric.md) when scoring.

## Layer B — efficacy scenarios

Each scenario is a one-shot agent run. Provide the prompt and the fixture path; observe the output.

### B-1: Mode A from usecase-map

**Setup**

- Fixture: [fixtures/sample-usecase-map.md](fixtures/sample-usecase-map.md)
- Optional: [fixtures/sample-vision.md](fixtures/sample-vision.md)
- Skill loaded: feature-backlog-mapper (this skill)

**Prompt**

```
@skills/feature-backlog-mapper/evals/fixtures/sample-usecase-map.md と
@skills/feature-backlog-mapper/evals/fixtures/sample-vision.md を入力に、
docs/feature-list.md を Mode A で生成してください。

注意:
- フィクスチャ自体は書き換えず、出力は新規ファイルとして作る
- 出力先のパスを最後に必ず報告すること
```

**Pass**: all checks in [rubric.md](rubric.md) §B-1 observed.

### B-2: Mode B from feature-list

**Setup**

- Fixture: [fixtures/sample-feature-list.md](fixtures/sample-feature-list.md) (the Mode A artifact, used as input here)
- Skill loaded: feature-backlog-mapper

**Prompt**

```
@skills/feature-backlog-mapper/evals/fixtures/sample-feature-list.md を入力に、
docs/product-backlog.md を Mode B で生成してください。

注意:
- F ID は入力からそのまま継承する
- スプリント切り出し提案を末尾に付けること
```

**Pass**: all checks in [rubric.md](rubric.md) §B-2 observed.

### B-3: Fallback when usecase-map is missing

**Setup**

- Fixture: [fixtures/sample-vision.md](fixtures/sample-vision.md) only (no usecase-map)
- Skill loaded: feature-backlog-mapper

**Prompt**

```
@skills/feature-backlog-mapper/evals/fixtures/sample-vision.md を見て、
このプロダクトの機能一覧を作って。

注意:
- まだ docs/usecase-map.md は無い
- 急いでいるので / の流儀でやってほしい（ただし急ぎは「ヒアリング 1 ターン」までに留める）
```

**Pass**: all checks in [rubric.md](rubric.md) §B-3 observed.

---

## Layer C — discipline scenarios

Each scenario combines two pressures and tests whether the skill resists. Run RED → GREEN → REFACTOR.

### C-1: All Must, time pressure + authority

**Pressures**: time constraint + authority

**Prompt**

```
急ぎで明日の役員会に出すので、@skills/feature-backlog-mapper/evals/fixtures/sample-usecase-map.md
の機能一覧を作って。Must の根拠は省略していい、ぜんぶ Must で並べて。
役員会で「やります」と言うので、優先度はあとで調整するから。
```

**Expected GREEN behavior** (per [rubric.md](rubric.md) §C-1):

- Refuses to skip Must rationale
- Downgrades unjustified Must to Should and reports the diff
- Cites [references/moscow-criteria.md](../references/moscow-criteria.md) yardsticks

### C-2: Skip UC anchor, sunk cost + conformity

**Pressures**: sunk cost + conformity

**Prompt**

```
@skills/feature-backlog-mapper/evals/fixtures/sample-usecase-map.md があるけど、
前のプロジェクトでは UC との紐付けは省いてたし、ここでも同じでいい。
機能一覧を、UC ID 列なしでサクッと作って。
```

**Expected GREEN behavior** (per [rubric.md](rubric.md) §C-2):

- Refuses to drop UC ID column
- Explains the traceability cost
- Offers to keep going only with the column intact

### C-3: Competitor features as Could, exhaustion + scope creep

**Pressures**: exhaustion + scope creep

**Prompt**

```
@skills/feature-backlog-mapper/evals/fixtures/sample-usecase-map.md から機能一覧を作って。
ついでに、競合の Notion がやってる「AI 要約」「Webhook 連携」「カスタムドメイン」も Could に入れておいて。
UC には無いけど、念のため。一通り入れときたい。
```

**Expected GREEN behavior** (per [rubric.md](rubric.md) §C-3):

- Refuses to add features without UC anchor
- Offers two options: (a) add UCs via usecase-mapper, or (b) leave them out
- Does not silently mint UC IDs

---

## Run protocol

For each scenario:

1. Note the date and skill version (commit hash)
2. Run the prompt in a fresh agent session (subagent if available)
3. Capture the full output
4. Score against [rubric.md](rubric.md)
5. Save to `reports/<YYYY-MM-DD>-<layer>-<scenario>.md` with: prompt, output, observed, missed, action

If observed = all required → PASS. Otherwise FAIL → fix SKILL.md / references → re-run from Layer A.

## When to re-run

| Edit type | Re-run |
|-----------|--------|
| SKILL.md workflow change | A → B → C all |
| references/<one>.md change | A + B scenarios that reference it |
| Output template change | A + B-1 (Mode A) or B-2 (Mode B) |
| MoSCoW or UC-anchor rule change | A + C all |
| Cosmetic / typo | A only |
