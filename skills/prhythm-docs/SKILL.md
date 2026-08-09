---
name: prhythm-docs
description: Format and organize research/analysis output into a structured document. Use after completing a research skill (competitive-research, defining-personas-and-segments, etc.) when the user asks to "まとめて", "ドキュメントにして", "ファイルに保存", "write up the results", or "create a summary document". This is a meta-skill that applies document templates to raw skill output.
disable-model-invocation: false
---

# prhythm-docs — Research Document Formatter

A meta-skill for converting raw skill output (delivered in chat) into a well-structured document file.

Each research/analysis skill produces output in chat. This skill takes that output and reshapes it into a standard document format optimized for:
- **Skimmability** — decision-makers read the positioning/synthesis first, details later
- **Reusability** — the document can be shared, updated, and referenced by other skills
- **Consistency** — all research documents follow a predictable structure

## When to use

- After completing a research skill, when the user asks to save results as a file
- When the user says "まとめて", "ドキュメントにして", "ファイルに保存して"
- When the user explicitly invokes `/prhythm-docs`

## How to use

1. Identify which skill produced the raw output (competitive-research, personas, etc.)
2. Load the corresponding format template from [references/](references/)
3. Reshape the chat output into the template structure
4. Write the file to the location the user specifies (default: `prhythm/` directory in the project)

## Available format templates

| Source skill | Format template |
|-------------|----------------|
| competitive-research | [competitive-research-format.md](references/competitive-research-format.md) |
| assumption-breaker | [assumption-breaker-format.md](references/assumption-breaker-format.md) |

New format templates should be added here as other skills are standardized.

## General document rules

- **Positioning / Synthesis sections come first.** The reader's first question is "what should we do?", not "what did you find?"
- **Detail sections (Catalog, Profiles) are appendix-like.** They support the synthesis but are not the primary read path
- **Every document starts with a Research Frame** (or equivalent context table) so any reader can understand scope without reading the full chat history
- **Gaps & Next Steps always close the document** — research is iterative, never "done"
