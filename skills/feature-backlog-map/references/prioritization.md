# Prioritization — PBL order is the priority

Priority is **human-owned** and expressed as the **row order of the PBL** (`docs/product-backlog.md`): top = highest. The feature list carries no priority at all. The skill proposes a reasonable initial order; people reorder freely.

> There is **no MoSCoW column** on the feature list. MoSCoW / Kano / RICE are optional annotations on the PBL, never the backbone.

## How to propose an initial order

Apply these yardsticks in order to sort the PBL. The first that gives a clear signal wins. Then tell the user: **「順序＝優先度です。並べ替えはチームで決めてください。」**

### 1. Vision yardstick (primary)

Read `docs/product-vision.md` if present, otherwise the user's one-line statement.

- Breaks the one-line statement if removed → put near the **top**
- Degrades experience but statement still holds → **middle**
- Power-user / nice-to-have → **lower**

### 2. Constraint yardstick

When vision is ambiguous, fall back to constraints — push to the top when:

- Required by law, security policy, contractual SLA
- Required by a critical integration / external dependency
- Required for the system to operate at all (login, audit)

### 3. Cost yardstick

When vision and constraint both pass, use cost to break ties:

- Implementation cost > expected value → push **down**
- Cheap and unlocks adjacent value → push **up**

## Stance on labels

- Default output: **ordered list only**, no labels. Order conveys priority.
- If the user explicitly wants a labeled framework, add it as an **annotation column** on the PBL (e.g. a `MoSCoW` or `RICE` note), and keep the ordering as the source of truth.
- Never let a label replace the ordering, and never put any label on the feature list.

## Pressure handling

When the user pushes "全部最優先で" / "全部 Must で":

- **Refuse to flatten priority.** Reply: "PBL は順序で優先度を表します。全部を最上位には置けません。上位 30% を一緒に選びましょう。"
- Propose a concrete top-N and explain the yardstick behind it.
- Surface the ordering, not a pile of identical labels.

## Optional alternative frameworks (annotation only)

If a team wants a named framework, offer one of these as an **annotation** alongside the ordering — the order still wins.

| フレーム | 用途 | 本スキルでの位置付け |
|---------|------|---------------------|
| **MoSCoW** | Must/Should/Could/Won't の合意 | PBL に注記列として併記可。順序を置き換えない |
| **Kano model** | 「あって当然」と「あると嬉しい」の分離 | 魅力的品質を際立たせたい提案フェーズで注記 |
| **WSJF** (SAFe) | Cost of Delay ÷ Job Size で実行順最適化 | ストーリーが多い大規模チームの二次ソート |
| **RICE** (Reach×Impact×Confidence÷Effort) | 多数候補の相対比較 | 採否判断の sub-tool |
| **ICE** (Impact×Confidence×Ease) | グロース実験の優先度 | 検証アクション選定の補助 |

These **replace neither the ordering nor the three-artifact structure**. They are notes added on request.

## Hand-off to Step 3

After ordering, you should have:

- A proposed PBL order (top = highest priority)
- A one-line statement to the user that order = priority and is theirs to change
- No priority label anywhere in the feature list

Proceed to emit the three artifacts using the templates.
