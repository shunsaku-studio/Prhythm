# Core vs Peripheral — axis 1 classification

Axis 1 separates assumptions whose **failure breaks the product** from assumptions whose failure **degrades but does not break it**. The wrong split makes the matrix worthless. Force a 1-line rationale per Core, and use the three yardsticks below.

## Three yardsticks

Apply in order. The first definitive answer wins.

### 1. Vision yardstick (primary)

Read `docs/product-vision.md` if present, otherwise the user's stated one-line statement.

- If this assumption **fails**, does the one-line statement **break**? → **Core**
- If failure **degrades** the experience but the statement still holds? → **Peripheral**
- If the user can't tell either way? → continue to yardstick 2

### 2. High-priority mapping yardstick

Read `docs/feature-list.md` / `docs/product-backlog.md` if present. Priority lives in the **PBL row order** (top = highest), not in a label.

- Backs a **high-priority (top-of-PBL) story / feature** → likely **Core** (verify with yardstick 1 if vision exists)
- Backs only **lower-priority** stories → **Peripheral**
- Backs no feature / no feature list present → orphan; default **Peripheral** unless vision says otherwise

### 3. Cost yardstick (tiebreaker)

When yardsticks 1 and 2 are both ambiguous:

- High validation cost + small impact on vision → **Peripheral** (and consider dropping)
- Low validation cost + critical to vision if true → **Core**

## Output requirements

| Field | Required | Format |
|-------|----------|--------|
| 軸1 ラベル | Yes | Core / Peripheral / (コア候補) |
| 根拠 | Yes (Core only) | 1 line citing vision quote OR 紐付 F + priority OR cost trade-off |
| Vision 引用 | Recommended for Core | Direct quote from `docs/product-vision.md` |

### Examples

| Assumption | 軸1 | 根拠 |
|------------|-----|------|
| ターゲットは email 登録に抵抗ない | Core | vision「個人で 2 分で使い始められる」を成立させる起点 |
| ロックアウト 15 分はサポート負荷を許容範囲に保つ | Peripheral | UX 影響あるが vision には直結しない |
| ターゲットは月額 X 円を支払う | Core | vision に「持続可能な事業として」とある + PBL 上位 F-08 と一致 |
| dark mode を好む | Peripheral | 低優先度の F-12 紐付き、vision に該当語なし |

## The Core rationale (mandatory)

Each Core row gets a 1-line rationale. **MUST NOT omit.**

| Good rationale | Bad rationale |
|----------------|---------------|
| `vision「2 分で使い始められる」の起点が登録動作` | `重要だから` |
| `PBL 上位 F-01「認証が無いと SaaS が成立しない」と一致` | `優先度高いから`（F ID も理由も無い） |
| `失敗すると単価設計が崩れる（cost: 月 $X が前提）` | `お金大事`（数字なし） |

If you cannot write a 1-line rationale citing vision / 高優先度の機能 / cost, the item is **not** Core. Downgrade to Peripheral.

## Pressure handling

When the user pushes "全部コアで" or "感覚で振っていい":

- **Refuse.** Reply: "コア判定は vision / 高優先度の機能紐付 / コストの 3 つの物差しが必要です。書けない項目は Peripheral に降ります。"
- Apply yardsticks; downgrade what fails.
- Surface the count diff (e.g. "コア: 18 → 7, Peripheral: 0 → 11").

When the user says "vision 参照は省いて":

- **Refuse.** Reply: "vision 参照を抜くと、後で『なぜコアか』が再構成できなくなります。1 行引用で十分です。"

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Everything Core | Force the 3 yardsticks; expect ≤30% of assumptions to land in Core |
| Core with no vision quote and no F-ID | Auto-downgrade to Peripheral |
| Vision exists but ignored | Quote one phrase per Core row |
| "重要だから" rationale | Reject; rationale must reference vision / 高優先度の機能 / cost |
| Core changed mid-write | Re-run yardsticks; update rationale; do not silently flip |

## When vision is missing

If `docs/product-vision.md` is absent and the user has only a paragraph or fragment:

- Apply yardstick 2 (high-priority mapping) directly when a feature list exists
- Mark Core rows that lack a vision quote as `(コア候補)` for transparency
- Recommend running `/product-vision-and-concept` after the map is emitted

## Hand-off to Step 3

After axis 1 classification you should have:

- Every assumption labeled Core / Peripheral / (コア候補)
- Every Core has a 1-line rationale citing vision / 高優先度の機能 / cost
- Count diff reported to user if downgrades happened under pressure

Proceed to axis 2 (verification status) in [verification-classifier.md](verification-classifier.md).
