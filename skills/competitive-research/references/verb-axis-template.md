# Verb-Axis Research Template

Cross-domain reference search. Finds "X for Y" analogies that same-industry search will never surface.

---

## Step 1: Verb Extraction

Take the product brief and rewrite each capability as a verb phrase. **Strip all domain nouns.**

### How to strip domain nouns

| Domain noun (remove) | Verb phrase (keep) |
|----------------------|--------------------|
| "AI generates slides" | "AI generates artifacts" |
| "reference past presentations" | "search and reuse past work artifacts" |
| "PPTX export" | "output in industry-standard native format" |
| "slide layout suggestion" | "suggest structure/template from past examples" |
| "story structure review" | "collaboratively review and iterate on structure" |

### Verb extraction table (required output)

| # | RFC statement | Domain nouns removed | Verb phrase |
|---|--------------|---------------------|-------------|
| 1 | {original text} | {nouns stripped} | {pure verb phrase} |
| 2 | ... | ... | ... |

Extract **3–5 verbs**. Merge closely related capabilities into one verb.

---

## Step 2: Cross-Domain Search

For each verb, run 1–2 web searches. **Critical rule: do not include any domain nouns in the search query.**

### Search pattern

```
"best product that [verb phrase] [current year]"
"[verb phrase] tool app SaaS [current year]"
```

Bad: "AI presentation generator from past slides" (domain nouns: presentation, slides)
Good: "AI tool that generates artifacts from past work examples"

### Per-verb findings table (required output)

For each verb, output:

### Verb {N}: "{verb phrase}"

| Service | Domain | What it does | Design implication for {product name} |
|---------|--------|-------------|--------------------------------------|
| {Name} | {Domain, e.g. coding / design / knowledge management} | {1–2 sentences} | {Specific pattern to transfer. Not "this is cool" but "steal the X because Y"} |

---

## Step 3: Design Implications Summary

**Most important output.** Synthesize all verb findings into one table:

| Verb | Best reference | Pattern to steal |
|------|---------------|-----------------|
| {verb phrase} | {Service name (domain)} | {Concrete design pattern that transfers} |

Then write a short paragraph: what architecture or UX emerges when you combine these patterns? This is the "X₁ × X₂ × X₃ for Y" formulation.

---

## Quality rules

- Every verb phrase must contain **zero domain nouns** — if you can tell the industry from the verb alone, rewrite it
- At least **2 references must come from completely unrelated domains** (not adjacent)
- Design implications must be **specific and transferable**, not generic praise
- The summary must produce a concrete "combine these patterns" synthesis, not just a list
