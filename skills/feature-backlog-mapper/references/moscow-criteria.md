# MoSCoW criteria — yardstick and rationale

MoSCoW is only useful when the user can read the rationale. Otherwise it becomes a popularity contest. Force a 1-line rationale per Must, and use the three yardsticks below.

## Three yardsticks

Apply in order. The first that gives a definitive answer wins.

### 1. Vision yardstick (primary)

Read `docs/product-vision.md` if present, otherwise the user's stated one-line statement.

- Does removing this feature **break the one-line statement**? → **Must**
- Does removing it **degrade the experience but the statement still holds**? → **Should**
- Does removing it leave the statement intact and only matters for power users / nice-to-have? → **Could**

### 2. Constraint yardstick

When vision is ambiguous, fall back to constraints.

- Required by law, security policy, contractual SLA → **Must** (rationale: regulatory)
- Required by a critical integration / external dependency → **Must** (rationale: dependency)
- Required for the team to operate the system at all (login, audit) → **Must** (rationale: operability)

### 3. Cost yardstick

When vision and constraint both pass, use cost to push down.

- Implementation cost > expected user value (rough) → **Could** or **Won't**
- Cheap to add and unlocks adjacent value → **Should** or **Could**

## MoSCoW labels

| Label | Meaning | Required field | Position in output |
|-------|---------|----------------|--------------------|
| **Must** | Vision-critical / regulation / dependency | `根拠 (1行)` mandatory | Top of inventory |
| **Should** | Important to UX, MVP-deferrable | rationale optional | Below Must |
| **Could** | Cheap nice-to-have | rationale optional | Below Should |
| **Won't (this cycle)** | Explicitly out of this cycle | `理由 (1行)` mandatory | Move to「棄却したアイデアと理由」section, not inventory |

Won't items live **only** in the rejection section. Never let them appear in the main feature table.

## The Must rationale

Each Must row gets a single line. Examples:

| Feature | Must rationale |
|---------|----------------|
| メール+パスワードでログイン | ビジョン「個人で使い始められる」を満たすには認証必須 |
| 操作監査ログ | SOC2 取得要件で必須 |
| 招待リンク発行 | 「2 分でチームが動き出す」を満たすにはこれが起点 |

If you cannot write a 1-line rationale, the item is not Must. Downgrade to Should.

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| All features marked Must | Force user to pick top 30%; rest auto-downgrade to Should |
| Must with no rationale | Auto-downgrade to Should |
| Won't in inventory table | Move to rejection section |
| Rationale = restatement of feature name | Reject; rationale must reference vision / constraint / cost |
| MoSCoW changed mid-write without ledger | Update both the table and the rejection section if Won't |

## Pressure handling

When the user pushes "全部 Must で" or "とりあえず Must にしておいて":

- **Refuse.** Reply: "Must の根拠を 1 行で書けない項目は Should に降ります。物差しは vision / 制約 / コストの 3 つです。"
- Apply the 3 yardsticks to each item; downgrade what fails.
- Surface the count diff to the user (e.g. "Must: 12 → 5, Should: 0 → 7").

## Hand-off to Step 4

After MoSCoW, you should have:

- Every feature labeled Must / Should / Could / Won't
- Every Must has a 1-line rationale
- Every Won't has a 1-line reason and lives outside the inventory

Proceed to writing cards (Mode A) or PBIs (Mode B) using [proposal-template.md](proposal-template.md) or [backlog-template.md](backlog-template.md).

## 代替優先度フレームワーク (補足)

MoSCoW が本スキルの primary だが、ユーザーが別フレームワークでの判定を求めた場合に対応する切り口。本スキルの出力は MoSCoW を保ち、補助として下記を引用する。

| フレーム | 用途 | 強み | 弱み | 本スキルでの位置付け |
|---------|------|------|------|---------------------|
| **Kano model** (Noriaki Kano, 1984) | ユーザー満足度との非線形関係を捉える | Must-be / One-dimensional / Attractive / Indifferent / Reverse の 5 区分で「あって当然」と「あるとうれしい」を明示分離 | 5 区分のヒアリングが必要、軽量プロジェクトには重い | Should の中で「Attractive (delighter)」を識別したい場合に補助として併用 |
| **WSJF** (Weighted Shortest Job First, SAFe) | 大規模プロジェクトでの実行順序最適化 | Cost of Delay / Job Size の比で算出、定量的な順位付け | 数値化のオーバーヘッド大、提案フェーズには重い | Mode B のスプリント切り出し提案で、Must が多すぎる場合の二次優先度として |
| **RICE** (Reach × Impact × Confidence ÷ Effort) | 多数の機能候補の相対比較 | 4 軸の積で simple、議論の起点になりやすい | Confidence が定性的でブレやすい | Could の中で「採用するか否か」を decision するときの sub-tool |
| **ICE** (Impact × Confidence × Ease) | グロース実験の優先度付け | 3 軸で simple、RICE より軽い | スコアの一貫性が個人差に依存 | uncertainty-map の検証アクション選定時の補助（grow と検証の境目） |

### いつ MoSCoW 以外を選ぶか

- **Kano 併用**: Should/Could が多く、「驚きの機能」「魅力的品質」を切り出してアピールしたい提案フェーズ
- **WSJF 併用**: Must が 20 件超で、SAFe / 大規模プロセスを採用しているチーム
- **RICE / ICE 併用**: グロース機能（コア外の数値改善系）の優先順位付けが主目的のとき

これらは MoSCoW を **置き換えない**。Must / Should / Could / Won't のラベルは維持し、別フレームの結果は注記列に追加する形で併記する。
