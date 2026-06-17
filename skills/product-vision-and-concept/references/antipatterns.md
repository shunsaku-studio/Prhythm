# Antipatterns — Vision & Concept Failures

Use in Phase 6 quality check. Each pattern: bad example → problem → fix direction → improved example.

Map to quality check items 1–8 in SKILL.md.

---

## Pattern 1: Universal target（ターゲット全方位）

**Maps to:** Check #1 Target clarity

**Bad:**
> すべての人に最高の体験を届ける

**Problem:** No one is the core user. Cannot prioritize features or say no.

**Fix:** Ask "who feels this pain most strongly today?" — start with them.

**Improved:**
> 小規模チームのPMが、散らばった要件と議事録から、次のスプリントの判断材料を10分で組み立てられるようにする

---

## Pattern 2: Buzzword stack（バズワード羅列）

**Maps to:** Check #2 No buzzword soup

**Bad:**
> AI駆動の革新的ソリューションでビジネスを変革する

**Problem:** Describes technology, not user outcome. Could be any startup.

**Fix:** Remove tech nouns; describe what the user's day looks like after success.

**Improved:**
> 営業が顧客訪問前に、過去のやり取りと提案の要点を1分で把握できるようにする

---

## Pattern 3: Feature list（機能リスト化）

**Maps to:** Check #3 Outcome over features

**Bad:**
> チャット、タスク管理、ファイル共有、カレンダーを一つの画面に統合する

**Problem:** Features change in a year; vision becomes stale.

**Fix:** One level up — what job do those features complete together?

**Improved:**
> チームが「どこを見ればいいか」で迷わず、会話から次のアクションまで途切れないようにする

---

## Pattern 4: Roadmap confusion（ロードマップ混同）

**Maps to:** Check #4 Not a roadmap

**Bad:**
> 2025年Q3にモバイルアプリをリリースし、2026年にエンタープライズ対応を完了する

**Problem:** Vision = destination; roadmap = path. Dates expire in months.

**Fix:** Ask "after those ships, what world exists?" — write that.

**Improved:**
> 現場の判断が、デスクでも現場でも同じ情報で即座にできる世界にする

---

## Pattern 5: No differentiation（差別化不在）

**Maps to:** Check #5 Differentiation

**Bad:**
> 私たちは最高のユーザー体験とカスタマーサクセスを提供します

**Problem:** Swap any competitor name — still works.

**Fix:** Name what you do that others don't, or what you refuse to do.

**Improved:**
> 他ツールが「全部入り」を目指す中、非エンジニアの企画担当だけに深く最適化し、設定画面すら見せない

---

## Pattern 6: Incredible ambition（壮大すぎて信憑性ゼロ）

**Maps to:** Check #6 Credible ambition

**Bad:**
> 3人のスタートアップ: 人類の可能性を解放し、意識の進化を加速する

**Problem:** Scale mismatch — audience stops listening.

**Fix:** Keep ambition, add one **concrete anchor** (Google's "in one click" model).

**Improved:**
> フリーランスデザイナーが、クライアントへの初回提案を半日から1時間に短縮できるようにする（その先に、独立クリエイターの仕事の再定義がある）

---

## Pattern 7: Inward-facing（内向き）

**Maps to:** Check #7 User-outward

**Bad:**
> 国内No.1のSaaSベンダーになる

**Problem:** Users don't care about your rank. (Netflix's market-position vision works only when tied to user outcome — exception, not template.)

**Fix:** Translate to user benefit: "when we're #1, what's true for the customer?"

**Improved:**
> 日本の中小企業が、大企業並みの分析基盤を、専任エンジニアなしで使えるようにする

---

## Pattern 8: Too long to memorize（長すぎて暗唱不能）

**Maps to:** Check #8 Memorability

**Bad:**
> 私たちは、テクノロジーの力を活用し、多様なステークホルダーの皆様と協働しながら、持続可能で inclusive な未来のワークプレイスを…（3文以上続く）

**Problem:** Nobody remembers; won't guide daily decisions.

**Fix:** Cut to one sentence for the one-liner; move the rest to concept paragraphs.

**Improved (one-liner):**
> リモートチームが、会議後5分で「誰が何をいつまでに」を全員同じ理解で持てるようにする

**Improved (concept):** Move stakeholder / sustainability detail to Why or How it's different.

---

## Diagnosis output template

When flagging issues in Phase 6:

```markdown
**⚠️ Pattern N: [name]**
Your draft: "[quote the problematic phrase]"
Issue: [one sentence]
Suggestion: [concrete rewrite direction]
Reference: [link to improved example above]
```

Multiple patterns can apply to one draft. Prioritize fixes that unlock the most clarity (usually #1, #5, #3 first).

---

## Facilitator note

When diagnosing, be direct but not dismissive. The user's draft often contains **raw material** buried in antipatterns — extract their phrases when rewriting, don't replace everything with generic copy.
