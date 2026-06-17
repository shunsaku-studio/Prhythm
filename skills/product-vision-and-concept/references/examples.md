# Examples — Vision & Concept Statements

Reference for draft tone, granularity, and Phase 6 comparison. Quotes are short phrases only; commentary is original.

**Last verified:** 2025–2026 (Tesla mission updated Jan 2026; Zoom mission evolved ~2023)

## Contents

- [One-line statement examples](#one-line-statement-examples)
- [Concept paragraph examples](#concept-paragraph-examples)
- [Full package example](#full-package-example)
- [Bad examples (Phase 6)](#bad-examples-phase-6)

---

## One-line statement examples

Ideal length: one breath.

### Tesla

> **Current (2026):** "Our mission is to build a world of amazing abundance."
> **Previous:** "Accelerate the world's transition to sustainable energy."

**Why it works:** States outcome (abundance), not cars or batteries.

**Caution:** "Amazing abundance" is broad — early-stage startups need a tighter anchor.

---

### Google

> **Mission:** "Organize the world's information and make it universally accessible and useful."
> **Vision (often cited):** "Provide access to the world's information in one click."

**Why it works:** Outcome at scale + **"in one click"** as a concrete constraint.

---

### Sonos

> "Fill every home with music and make listening a valued experience again."

**Why it works:** Sensory, emotional outcome. "Again" implies a problem.

---

### LinkedIn

> "Create economic opportunity for every member of the global workforce."

**Why it works:** **Economic opportunity**, not "professional network" (category).

---

### Slack

> **Mission:** "Make people's working lives simpler, more pleasant, and more productive."

**Why it works:** Daily user feeling (pleasant!) in one line.

**Caution:** Three adjectives can feel like a list — works because each is distinct.

---

### Figma

> "Make design accessible to all."

**Why it works:** Five words. "Accessible" = democratization without category jargon.

**Caution:** So short it could sound generic — product story carries specificity.

---

### Stripe

> "Increase the GDP of the internet."

**Why it works:** Bold metaphor without listing payment features.

**Caution:** Only credible at economy-scale — copying without scale feels pretentious.

---

## Concept paragraph examples

PRD / brief granularity.

### Example — B2B SaaS (sprint planning tool)

**Why**
Teams ship faster than they document. Decisions made in Slack threads vanish before the next sprint. We exist so product teams don't re-debate settled questions.

**Who**
PMs and tech leads at 5–50 person product teams who spend the first hour of planning reconstructing "why we said no last time."

**What**
Before planning starts, everyone sees the same timeline of decisions, linked to tickets and shipped code — so planning is about what's next, not archaeology.

**How it's different**
Wikis require maintenance; our tool captures decisions from where they already happen. We don't replace Jira or Notion — we connect them.

---

### Example — Consumer (language learning)

**Why**
Adults quit language apps because streaks feel like homework, not conversation. We believe practice should feel like texting a patient friend.

**Who**
Working professionals (28–45) who studied English in school but freeze in meetings — they have 15 minutes on the commute, not an hour for lessons.

**What**
Daily 10-minute scenarios pulled from their industry (standups, client emails) with instant feedback on phrasing, not grammar scores.

**How it's different**
Duolingo optimizes streaks; tutors optimize fluency but don't scale. We optimize **meeting-ready phrases** in micro-sessions.

---

### Example — Internal tool (gratitude / feedback)

**Why**
Good work and mutual support happen every day, but on chat they scroll away — contributions and thanks rarely become shared culture.

**Who**
All employees who collaborate in chat daily; especially teams where praise feels like a special event, not a habit.

**What**
Send thanks and feedback without leaving chat; each message shares a teammate's contribution and builds a visible habit of recognition.

**How it's different**
Unlike a `#thanks` channel or HR-only recognition, thanks, feedback, and sharing contributions are one flow — not separate tools.

---

## Full package example

Shows how one-liner and concept align (test-play output shape).

### Feedit (internal gratitude app)

**One-line statement**
> 感謝やフィードバックを通じて仲間の活躍をシェアすることを習慣にする

**Concept**

**Why** — チームの中では毎日、誰かの活躍が起きている。でもチャット上では流れて埋もれ、本人も周りも「誰が何をして助けたか」を共有できない。感謝やフィードバックは特別なタイミングになりがちで、活躍を伝える習慣にならない。

**Who** — 日々チャットで協力する全社員。仲間の良い仕事を見ているのに、言葉にして届ける機会が少ないチーム。

**What** — Feedit では、チャットの流れのまま感謝やフィードバックを送る。その行為そのものが仲間の活躍をシェアする手段になり、全員が使うことで「伝える・見る・返す」が当たり前の習慣になる。

**How it's different** — 活躍の可視化ツールや `#thanks` チャンネルは、見せるか送るかが分かれがち。Feedit は感謝・フィードバックと活躍のシェアを一体に設計する。別アプリを開かず、会話の延長で culture が積み上がる。

**Alignment note:** One-liner's「感謝やフィードバックを通じて」「シェア」「習慣」each map to **What** and **How it's different**.

---

## Bad examples (Phase 6)

See [antipatterns.md](antipatterns.md) for full diagnosis.

| Bad | Primary antipattern |
|-----|---------------------|
| すべての人に最高の体験を | #1 Universal target |
| AI駆動の革新的プラットフォーム | #2 Buzzword stack |
| チャット・タスク・ファイル共有を統合 | #3 Feature list |
| 2025年Q3にモバイル版リリース | #4 Roadmap |
| 最高のUXとサポートを提供 | #5 No differentiation |
| 人類の可能性を解放（3人スタートアップ） | #6 Incredible ambition |
| 業界No.1のSaaSになる | #7 Inward-facing |
| 3文以上の一行ステートメント | #8 Too long |

---

## Using examples in drafts

1. **Match tone, not content** — don't copy Stripe's GDP line for a local bakery app
2. **Match stage** — Figma simplicity vs Notion's complexity trade-off
3. **Always show full packages** — one-liner + four paragraphs, plus a 統合案 when variations differ by angle
4. **Cite one example** when explaining a revision: "Short like Figma, but with your 'meeting-ready' anchor like the language-learning **What**"
