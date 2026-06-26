# Evidence Levels: Fact / Assumption / Unknown / Risk

Every assertion in a persona gets a tag indicating how strong the evidence is. The result: a reader can tell at a glance where the persona is on solid ground and where it is still a hypothesis.

## The four tags

### Fact

- **Definition**: A statement that can be read directly off the input data (interviews, research, measurements) and is supported by multiple independent observations.
- **Criteria**:
  - The same fact appears in 2+ interview subjects, OR
  - Objectively verifiable evidence exists (numbers, logs, documents)
- **Notation**: `**[Fact]**`
- **Example**: `**[Fact]** 紙のノートを使っている（3人中3人が言及）`

### Assumption

- **Definition**: A statement inferred from part of the input but not yet adequately supported. A remark from a single interview, or a logical extrapolation by the writer.
- **Criteria**:
  - Only one person said it, OR
  - The writer interpreted or extrapolated ("probably this is the case")
- **Notation**: `**[Assumption]**`
- **Example**: `**[Assumption]** 新人スタッフの教育に時間を取られている（1人が言及、他は不明）`

### Unknown

- **Definition**: Something important to the persona that cannot be determined from the input. Explicitly writing "we don't know" is the value.
- **Criteria**:
  - We want to know but have no information
  - Verifiable if we had a means (additional interviews, data pulls)
- **Notation**: `**[Unknown]**`
- **Example**: `**[Unknown]** 個人で意思決定できるか、上長承認が必要か`

### Risk

- **Definition**: An assumption that, if wrong, would overturn the persona's reason for existing or the product decision built on top of it.
- **Criteria**:
  - "If this is false, the whole persona collapses" level
  - The top item to test in prototype validation
- **Notation**: `**[Risk]**`
- **Example**: `**[Risk]** ヒヤリハットを記録するインセンティブが本人にあると仮定しているが、現状は加点も減点もない可能性`

## Tagging rules

1. **Every assertion gets a tag** — untagged assertions tend to be read as the writer's wishful thinking.
2. **Hold the Fact / Assumption line strictly** — a single interview is not Fact. Fact requires multiple sources ("3 of 3", "confirmed in logs") to start.
3. **Do not fear Unknown** — a persona heavy on Unknowns is a "hypothesis-stage persona", and saying so explicitly is not a weakness; it is the entry to the validation plan.
4. **Call out Risk without hesitation** — a persona with no Risks is depending on hidden assumptions and is dangerous. Naming Risk makes the prototype's target visible.

## Sanity check by counting

Count the tags across the whole persona.

- Fact ≫ Assumption: natural for a mature product with existing users. Suspicious for a brand-new product (probably over-generalizing).
- Assumption ≫ Fact: hypothesis-stage persona. Say so out loud and surface items to test in Human Decision Gates / Prototype Connection.
- Unknown = 0: almost impossible. Likely the writer is unaware of what they do not know. Re-inspect.
- Risk = 0: a major oversight. Some assumption is being relied on; surface it.

## Linking to validation method

Add a one-line "how this could be verified" alongside each tag, to connect to downstream work.

- Assumption → additional interviews, quantitative survey, log analysis
- Unknown → stakeholder interview, internal data pull
- Risk → priority target in prototype validation, expert review

## Anti-patterns

- **Tag everything as Fact** — over-confidence when the input is thin.
- **Tag everything as Assumption** — over-cautious to the point where the human cannot make a call. What was actually observed is Fact.
- **Downgrade Risk to Assumption** — the moment you think "it's not really a risk" is usually a Risk.
