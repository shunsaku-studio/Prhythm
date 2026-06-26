# Anti-patterns

Patterns persona / segment work tends to fail on. Cross-check both before and after writing.

## 1. The Agent decides the Primary persona

**Symptom**: Writing "the primary persona is A" / "the target has been decided as B", without explicit human agreement.

**Why it matters**: Target selection is a strategic call beyond the Agent's authority. Once it reads as "decided", reviewers tend to treat it as locked, and revisiting becomes hard.

**Fix**: Write `Primary candidate (hypothesis)`. Surface "which segment to make Primary" as a Human Decision Gate.

## 2. Building personas from demographics

**Symptom**: A profile dominated by "35 years old, female, Tokyo, ¥6M income, married, 2 children".

**Why it matters**: Behavior, situation, and motivation are invisible, so the persona does not inform product decisions. Same demographics + different situation/motivation = different persona.

**Fix**: Build from "situation + JTBD + motivation". Add demographics only when they explain behavior.

## 3. Treating one person's statement as Fact

**Symptom**: Treating content from a single interview as if it were a universal truth.

**Why it matters**: Generalizing from a sample of 1 is over-generalization. When the Fact / Assumption boundary collapses, the grounds for decisions disappear.

**Fix**: Tag per `evidence-levels.md`. Hold the "3 of 3" / "confirmed in logs" criterion strictly for Fact.

## 4. Averaging away contradictory voices

**Symptom**: "A said X and B said not-X, so it's probably around Y in the middle."

**Why it matters**: The average person does not exist. What should have become two distinct personas at the extremes gets flattened into a center that resonates with no one.

**Fix**: Present the contradiction as is. Split into two personas, or surface "which way to lean" as a Human Decision Gate.

## 5. Too many personas

**Symptom**: 5+ personas, each blurring into the next.

**Why it matters**: Too many personas = "we want to serve everyone", which does not inform product decisions.

**Fix**: Narrow to the top 2–3. Explicitly mark the rest as "Out of scope (reason: …)".

## 6. Skipping Segmentation Axes and writing segments directly

**Symptom**: "Segment A: young mothers", "Segment B: elderly", written without articulating the axes.

**Why it matters**: Without articulated axes, "why this segmentation" and "what alternative cuts existed" cannot be discussed. Stereotypes creep in.

**Fix**: Always write the Segmentation Axes section before assembling Segment Candidates.

## 7. Skipping Human Decision Gates

**Symptom**: Decision Gates omitted "because the answer is obvious", or replaced by "next research items".

**Why it matters**: Without a chance to hand decisions back, the Agent's calls pass through implicitly. Later, "why did we go this way?" cannot be traced.

**Fix**: The moment "the answer is obvious" enters your head, escalate to a Decision Gate. Write at least 3.

## 8. Prototype Connection is too abstract

**Symptom**: "Validate with persona A" — that's it. What the hypothesis is, and what would count as falsification, are missing.

**Why it matters**: Validation without falsifiability is confirmation theater. No learning happens.

**Fix**: Write the hypothesis, falsification condition, and confirmation condition concretely. Use the `prototype-connection.md` format.

## 9. Inventing information not in the input

**Symptom**: Auto-filling details the user never shared (family structure, hobbies, values).

**Why it matters**: Inventions look plausible but cannot ground decisions. Things that should be Unknown get filled in.

**Fix**: Mark anything absent from input as **[Unknown]**. Do not invent.

## 10. Writing the "average user"

**Symptom**: The persona reads as "roughly the kind of person who…", centered, edges blunted.

**Why it matters**: An average user resonates with no specific user. Product decisions sharpen only against concrete behavior and situation.

**Fix**: Push to a particular situation / motivation edge. "Weekday 19:00, just before the night-shift handoff" rather than "people who do night shift sometimes".

## 11. Persona-to-segment link missing

**Symptom**: A persona is written, but it is unclear which segment it corresponds to.

**Why it matters**: The chain (axes → segments → personas → prototype validation) breaks upstream.

**Fix**: At the top of each persona, state "corresponds to segment X".

## 12. Mixing existing and prospective users

**Symptom**: "Currently using" and "we hope will use" users blended into one persona.

**Why it matters**: Design calls go opposite ways. Existing users → lean on their habits. Prospective users → propose a new experience.

**Fix**: Include "current alternative" as a Segmentation Axis. Treat existing vs. prospective as separate segments.

## 13. Writing Stage 1 in article form

**Symptom**: Segments and personas as freestanding prose sections — hard to compare side-by-side, hard for the human to amend.

**Why it matters**: It's supposed to be **material for human selection**, but the form fights against editing. Adding columns/rows, reordering, comparing on a new axis — none of that is supported.

**Fix**: Stage 1's Segment Comparison Table / Persona Comparison Table **must** be in Markdown table form. Move prose-style material to Stage 2.

## 14. Going too deep in Stage 1

**Symptom**: The comparison table alone would suffice, but the writer also includes persona narratives, scenes, JTBD hierarchies, all in Stage 1.

**Why it matters**: Stage 1 bloats and the overview disappears. Worse, deep work done before Primary is picked may be discarded when a different Primary is chosen.

**Fix**: Stage 1 is the overview. Note "deferred to Stage 2" for material that does not fit the table.

## 15. The Agent picks Primary in Stage 2

**Symptom**: Without the human's explicit selection, Stage 2 begins with "we'll deep-dive with X as Primary".

**Why it matters**: This breaks the central reason the Stage 1/2 split exists — to preserve the human's decision space.

**Fix**: Before entering Stage 2, confirm explicit selection from the human. Ask if ambiguous.

## 16. No Counter-persona, or the Counter is just a watered-down Primary

**Symptom**: The Persona Comparison Table is filled with Primary and Secondary candidates only — no opposite pole. Or there is a Counter, but it is a slightly-toned-down version of the Primary.

**Why it matters**: Without a Counter, only "who to optimize for" is visible; "who gets cut by the optimization" is not. A watered-down Counter is a variant of "the average", which is the very thing we are trying to avoid — the tradeoff that should have shown up never does.

**Fix**: Identify the Primary's defining trait (the central axis), and place a person at the **opposite end**. Situation, JTBD, alternatives, and success definition should all fail to align with the Primary's. See the Counter-persona section in `persona-template.md`.

## 17. Stage 2 Validation Plan without a falsification condition

**Symptom**: "Validate with persona X" / "build a prototype and show users" — without stating what would count as the hypothesis being wrong.

**Why it matters**: Without falsifiability, this is confirmation theater (the conclusion is set before the test). No learning happens.

**Fix**: Always write falsification and confirmation conditions concretely in the Validation Plan. See `prototype-connection.md`.
