# Human Decision Gates: Judgment Points Returned to the Human

The Agent does **not** decide personas / segments. Instead, surface the judgment calls the human must make, each with its tradeoffs.

This file lists the common categories of decisions to write into the Human Decision Gates section, and the format.

## Output format

Write each decision point with this structure (the artifact is in Japanese, so the labels appear in Japanese):

```
### 論点 N: <short title of the issue>

**問い**: <the question this decision must answer>

**選択肢**:
- A: <option A> — メリット: ... / デメリット: ...
- B: <option B> — メリット: ... / デメリット: ...
- (C, D if needed)

**現時点での情報**: <what is confirmed as Fact>

**判断のために必要な追加情報**: <what would resolve the Unknowns>

**判断の保留がもたらすコスト**: <cost of moving forward without deciding>

**Agent の推奨**: <if you must — but always state "this is a recommendation; the decision belongs to the human">
```

"Agent's recommendation" is optional. If included, always pair it with its grounds (Fact or explicitly named Assumption).

## Common decision-point categories

### 1. Selecting the Primary segment / persona

**Question**: Which segment do we hit first with the prototype?

This is the single biggest call the Agent must not make. Present multiple candidates with their tradeoffs.

Example tradeoff axes:
- Market size vs. validation cost
- Depth of problem vs. ease of access
- Strategic importance vs. fit with existing resources

### 2. Scope boundary

**Question**: How far do we extend the target, and where do we say "out of scope for now"?

"We want to deliver value to everyone" almost always fails in implementation. The courage to explicitly exclude is required.

### 3. Stance toward competitors / alternatives

**Question**: Do we go after users who have existing tools/habits, or after those doing nothing?

- Users on existing tools: problem is clear, but switching cost is high
- Users doing nothing: no switching cost, but they may not recognize the problem to begin with

### 4. "User" vs. "decider" priority when they differ

**Question**: Optimize usability for the user, or value proposition for the decider?

Common in B2B. If you cannot serve both, "who to hit first" is a strategic call.

### 5. Persona abstraction level

**Question**: At what granularity do we define the persona?

- Fine-grained: easier to predict behavior, but easier to dismiss internally as "not our user"
- Coarse-grained: easier to win agreement, but weaker for actual implementation decisions

### 6. Validation order

**Question**: Which hypothesis / Risk do we test first?

You cannot test everything simultaneously. Test the one whose falsification would most change strategy.

### 7. Handling contradictory voices

**Question**: When the input contains contradictory voices, which way do we lean?

- Do not average
- The choice is: pick one, split into two personas, or run additional research to resolve

### 8. How to treat the Counter-persona

**Question**: How much do we accommodate the Counter-persona in design?

The Counter is at the opposite pole on the Primary's central axis. The moment Primary is chosen, the Counter is structurally left behind. **How much** they are left behind is the strategic call.

Options:
- A: **Cleanly exclude** — Prioritize Primary optimization. Counter dropping off is expected and stated explicitly
- B: **Secondary consideration** — Design preserves a minimum baseline for the Counter without compromising Primary (core features only, toggleable settings, etc.)
- C: **Solve both poles simultaneously** — UI / flow / copy that bridges both needs at the detail level. High design cost; potentially wider market

Factors:
- Is it really OK to cut the Counter on market-size grounds (headcount / revenue)?
- Could the Counter become the "future Primary" (market shifts may invert)?
- Will pursuing both poles dilute resolution on Primary?
- Are we falling into the "appeal to everyone" trap? (Especially when picking C)

"Ignoring the Counter exists" is not an option. At minimum, state "explicitly cut".

## Writing notes

- **Limit to 3–7 gates** — too many and the human stops reading. Pick the important ones.
- **The moment the Agent wants to decide, escalate to a Decision Gate** — "this is obviously A" is the warning signal.
- **State "do not decide" as an explicit option** — write both the gain and the cost of deferring.
- **Note dependencies between gates** — "if Gate 1 is decided, Gate 3 follows automatically".

## Anti-patterns

- **Turning Decision Gates into a to-do list** — those are different things. A list of tasks, not judgment calls.
- **Writing only the Agent recommendation, omitting options** — that is pushing a conclusion, not surfacing a decision.
- **Writing "needs more research" on every gate** — deferring all calls leaves the human with nothing to act on.
