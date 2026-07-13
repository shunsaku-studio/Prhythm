# Segmentation Axes Catalog

Segments emerge as **intersections of axes**. Writing segments first slides into stereotypes ("women in their 30s with jobs"). Lay out 3–6 axes first, then assemble segment candidates from axis combinations.

The axes below are a starting point. Pick, drop, and add based on the product and context.

## Axis categories

### 1. Role / Relationship

What role the user can play with respect to the product.

- **End user**: uses it themselves
- **Proxy user**: uses it on behalf of someone else (caregivers, parents, supervisors)
- **Purchase decider**: pays but does not use
- **Influencer / gatekeeper**: holds the power to recommend, refuse, or approve
- **Affected party**: only receives the outcome (beneficiary or casualty)

In B2B, "user", "decider", "payer", and "blocker" are often separate people.

### 2. JTBD (Jobs to be Done)

"What is being hired, and what is being finished." Even in the same product, different users hire it for different reasons.

Example (calendar app):
- Not forgetting their own appointments
- Sharing schedules with family
- Coordinating time with colleagues
- Looking back on past activity

JTBD axes sit closer to behavior than to demographics, so they connect directly to prototype validation.

### 3. Context / Situation

When, where, and under what conditions the product is used.

- Physical environment: office / home / commuting / on-site
- Time pressure: urgent / planned / pocket-of-time
- Co-presence: alone / in front of customer / in front of boss / with family
- Device constraint: PC / phone / shared device

There are cases where "the same person in a different situation is a different persona" (e.g., weekday-noon-self vs. weekend-night-self).

### 4. Sophistication

Domain knowledge and tool experience.

- Beginner / experienced / expert
- Years in the industry
- History with similar tools

Sophistication connects directly to UI abstraction level, terminology choices, and defaults.

### 5. Motivation

Why the user is doing this at all, and how seriously.

- Self-driven vs. mandated (forced by company policy, etc.)
- Goal-directed vs. exploratory
- Required work vs. discretionary improvement

"Forced" and "self-driven" users feel value differently and have entirely different drop-off conditions.

### 6. Constraints

Time, money, skills, authority, internal politics — anything that binds action.

- Budget: personal discretion / departmental budget / executive sign-off
- Time: only during work hours / after-hours OK / on personal time
- Authority: can adopt unilaterally / needs manager approval / company-wide consensus

Constraints usually shape pricing, distribution path, and sales strategy more than feature requirements.

### 7. Beliefs / Values

Worldview, what they treat as good, what they avoid.

- Data-driven vs. experience/intuition
- Collectivist vs. individualist
- Risk tolerance

Value-based axes are harder to use, but they help when choosing wording (marketing copy) or how to frame the pitch.

### 8. Alternatives

What the user is doing **right now** to solve this problem.

- A user of competing tool X
- An ad-hoc Excel workflow
- Asking colleagues on Slack
- Doing nothing (resigned)

"What the alternative is" determines competitors and switching cost. "Doing nothing" users are often the hardest customers.

## How to pick axes

- **Narrow to 3–6**: too many causes combinatorial explosion and the segments stop meaning anything
- **Pick axes that drive product decisions**: axes like "blood type" that have no design implication should be cut
- **Pick observable, validatable axes**: it should be possible to later recruit interview subjects or slice data along the axis
- **Pick orthogonal axes**: collapse axes that are saying the same thing in different words

## Output format

Write each axis as:

```
### 軸N: <axis name>
- なぜ重要か: <what this axis reveals, which decision it informs>
- 観測された値: <concrete values read off the input>
- 補足: <caveats, limits, prerequisites for this axis>
```

(Axis section headings and bullet labels are in Japanese because the output artifact is Japanese — the axis name itself may be English or Japanese as fits the domain.)
