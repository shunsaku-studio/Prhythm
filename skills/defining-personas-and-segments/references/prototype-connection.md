# Validation Plan: Translating the chosen segment/persona into a prototype validation plan

All the persona / segment organizing ultimately exists to answer: "so, who do we hit with what?" The Stage 2 Validation Plan section is the part that answers this as a concrete validation plan.

Write this **after** the human selects Primary. Do not write it in Stage 1 (a directional note is the most you should add there).

## Questions this section must answer

For the chosen Primary segment / persona, make these explicit:

1. **Who**: which persona / segment is the subject
2. **Which situation**: what usage context is in scope for validation
3. **What hypothesis**: what specifically do you want to test about this segment
4. **What would falsify it**: the observation condition for "this hypothesis was wrong"
5. **How to verify**: the validation method (prototype, survey, Wizard of Oz, etc.)

## Output format

(Artifact is in Japanese; labels appear in Japanese in the actual output.)

```
### 検証対象 N: <name of the candidate segment>

**対応するペルソナ**: <ペルソナ N>

**検証する状況**: <concrete description of usage context>
例: 「夜勤者への引き継ぎを書く 19時前後、現場のPCから」

**検証する仮説**: <short and specific>
例: 「ヒヤリハットを構造化フォームで入力するなら、本人にとって 90秒以内で完了し、紙ノートより楽だと感じる」

**仮説のうち最も Risk が高い部分**: <corresponds to a Risk tag from evidence-levels.md>
例: 「90秒以内に収まる」「紙ノートより楽だと感じる」のどちらが先に外れそうか

**反証条件（これが起きたら仮説は外れた）**:
- 5人中3人以上が「紙のほうが楽」と回答
- 平均入力時間が 180秒を超える
- 「上司に怒られそう」という不安が言及される

**確証条件（これが起きたら仮説は支持された）**:
- 5人中4人以上が「これなら使う」と回答
- 平均入力時間が 90秒以内
- 翌日も使いたいと言われる

**検証手段**:
- プロトの形式: <ペーパープロト / Figma クリッカブル / Wizard of Oz / 実機>
- 検証セッションの形式: <1on1 / グループ / 現場観察>
- サンプル数の目安: <number and rationale>

**この検証で答えられない問い（次のフェーズに残す）**:
- 例: 「3ヶ月後も使い続けるか」（長期検証は別途）
```

## Distinguish "validation" from "confirmation"

- **Validation**: admits the possibility that the hypothesis is wrong. "It turned out users said the new form was easier than paper" alone is confirmation, not validation.
- **Confirmation**: a question phrased to elicit the desired answer.

Self-check: "could this validation reach the conclusion 'we were wrong'?" If no, it is not validation.

## Sample-size rule of thumb

Heuristic for qualitative validation:
- ~80% of major usability issues surface with 5 users (Nielsen's rule of thumb)
- 5 users per segment. Mixing segments produces cross-talk between different problems
- To detect differences between segments: 5 × number of segments

These are guides, not absolutes.

## Persona-to-validation mapping

Always state the link explicitly:

```
ペルソナ A → 検証対象 1
ペルソナ B → 検証対象 2
ペルソナ C → 今回は検証対象外（理由: ...）
```

Stating "not in scope this round" prevents the human from attempting "validate everyone at once" and failing.

## Anti-patterns

- **Writing only "validate with persona A"** — what, in which situation, and under what falsification condition is unstated.
- **No falsification condition** — that is a PoC, not validation. Easy to conflate "prototype to gather info" with "prototype to make an impression".
- **Validating all segments simultaneously** — resource-impossible. Surface the priority as a Human Decision Gate.
- **Lavish validation method, vague hypothesis** — "let's build something and show it" is not hypothesis-driven.
