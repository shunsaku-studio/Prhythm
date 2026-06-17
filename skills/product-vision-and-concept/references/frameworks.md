# Frameworks — One-line Statement & Concept

Writing rules for Phase 3. Read before generating drafts.

The deliverable is always **both parts** — never draft them as separate optional outputs.

---

## Part 1: One-line statement

### Role

Declares the product's **purpose** — the change you want to see in the user's world. North Star for decisions; not category positioning or feature summary.

### How to write

- Start with a strong verb: Accelerate / Enable / Transform / Make / Connect / Organize / 〜を習慣にする
- Describe **outcomes**, not features or technology
- Add one **practical constraint** when possible ("in one click", "without leaving the conversation", "チャットの流れのまま") — makes it a decision filter
- Length: **one breath** — ~40 Japanese characters soft target; 10–20 words in English

### Template

```
[Verb] [beneficiary or scope] [desired outcome] [optional constraint]
```

### Common failures

| Failure | Fix |
|---------|-----|
| Too abstract ("make the world better") | Add who benefits or one concrete constraint |
| Too grand for stage ("transform humanity") | Anchor to a reachable domain the product actually touches |
| Feature disguised as vision ("the best AI chat app") | Ask: what changes in the user's day because of it? |

---

## Part 2: Concept (four paragraphs)

### Structure

| Paragraph | Role | Length |
|-----------|------|--------|
| **Why** | Problem background, reason to exist | 1–3 sentences |
| **Who** | Target user and their pain | 1–3 sentences |
| **What** | Value delivered, ideal experience | 1–3 sentences |
| **How it's different** | vs alternatives and trade-offs | 1–3 sentences |

Lightweight version of a press-release / FAQ intro — enough for PRD header or internal spec, not a full PR/FAQ document.

### Paragraph guide

| Paragraph | Write | Avoid |
|-----------|-------|-------|
| **Why** | Pain or gap in the world today | Solution features |
| **Who** | Specific persona or situation + their pain | "Everyone", demographics only |
| **What** | Ideal experience after success; use product name | Feature bullet list |
| **How it's different** | True trade-off vs named alternatives | "Best UX", "AI-powered" |

---

## Consistency between one-liner and concept

When delivering the full package:

- One-liner outcome must appear in **What**
- **Who** must be specific enough to explain who the one-liner is for
- **How it's different** must explain why the one-liner's constraint (e.g. chat-native) is real
- If they contradict, flag to the user — usually **What** or **How it's different** needs updating

---

## Draft package rules (Phase 3)

1. Each variation = one-liner + all four paragraphs
2. Angle-split drafts (habit-only, visibility-only) are OK as variations **only if** a **統合案** is always included
3. Label variations by angle or number — never A/B/C
4. If the user later supplies their own one-liner, rewrite concept paragraphs to align; do not rewrite their one-liner unless asked

---

## Language notes

### Japanese

- One-liner: avoid 〜を実現する spam; prefer 動詞 + 具体的成果
- Concept labels: **Why / Who / What / How it's different** or なぜ/誰/何/違い — match user preference

### English

- One-liner: active voice, no "We aim to"
- Keep paragraph labels consistent within one deliverable
