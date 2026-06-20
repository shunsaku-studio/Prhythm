# User stories and acceptance criteria

User Story is **why this PBI exists**. AC is **how we know it's done**. Both must be in every Mode B PBI.

## User Story format

```
As a <actor with role / persona>
I want <observable system behavior>
so that <user outcome / benefit>
```

Rules:

- **actor** — match the actor name in `docs/usecase-map.md` (`一般ユーザー`, `管理者`, `組織オーナー`...). Never just「ユーザー」.
- **want** — what the system lets the actor do. **Not** how it's implemented.
- **so that** — the value to the actor. Not "to satisfy the requirement".

### Examples

Good:

```
As a 組織オーナー
I want メンバーをメールアドレスで招待できる
so that 知っているメンバーを 1 分でチームに追加できる
```

Bad (implementation leak):

```
As a ユーザー
I want POST /invite API を呼び出せる
so that メンバーを追加できる
```

Bad (no value):

```
As a ユーザー
I want メンバーを招待できる
so that メンバーが招待される
```

## Acceptance Criteria — Given / When / Then

3-5 ACs per PBI. Cover at minimum:

- **Happy path** — the primary success scenario
- **At least one failure mode** — wrong input, conflict, or rate limit
- **At least one boundary** — empty input, max input, time-based edge

### Format

```
- AC<N> — <one-line label>
  - Given <pre-condition>
  - When <action>
  - Then <observable outcome>
```

### Examples

```
- AC1 — メンバー招待 正常系
  - Given 既存組織のオーナーとしてログイン中
  - When `/team/invite` で `member@example.com` を送信
  - Then 招待メールが送信され、組織の招待一覧に「pending」として行が増える

- AC2 — 重複招待
  - Given 同一 email にすでに pending 招待がある
  - When 同じ email を送信
  - Then 「すでに招待済みです」と表示され、新規行は増えない

- AC3 — メール無効
  - Given 不正な email 形式
  - When フォーム送信
  - Then クライアント側でフォームエラーになり、サーバーへリクエストが飛ばない
```

## Granularity rules

- One AC per behavior. **Do not** chain "Given X, when Y and Z, then A and B and C".
- Each AC must be independently testable — automated test or manual smoke.
- "Given" can be empty when truly unconditional, but prefer making the precondition explicit.

## Common pitfalls

| Pitfall | Fix |
|---------|-----|
| AC = restating the user story | Write the observable outcome, not the wish |
| "Then it works" / "Then no error" | Replace with what the user / system does (URL, message, state change) |
| Multiple "When" steps in one AC | Split into multiple ACs |
| Performance / non-functional baked into AC | Use a separate NFR section or DoD; AC is functional |
| Internal state changes only | Surface a user-observable outcome (UI message, redirect, log entry visible to user) |

## Hand-off

PBIs that fail AC granularity get sent back to Step 4 of [SKILL.md](../SKILL.md) for rewrite. Do not let a PBI ship to backlog with AC < 3 or AC that fail the testability check.

## Job Story 形式 (代替形式の注記)

User Story 形式 (`As a / I want / so that`) は本スキルの primary だが、近年は **Job Story** (Alan Klement / Intercom 流) も普及している。**Job Story** は **Job to be Done (JTBD)** の文脈に近く、状況・動機・期待結果を明示する。

### Job Story 形式

```
When <situation>,
I want to <motivation>,
so I can <expected outcome>.
```

### 使い分け

| 観点 | User Story | Job Story |
|------|-----------|-----------|
| 焦点 | actor / role 中心 | situation 中心 |
| 強み | チームメンバー（actor）が複数いる場合の整理に向く | 状況・タイミングを記述しやすい、ペルソナを過剰定義しない |
| 弱み | 「ペルソナ＝役割」になりがちで、状況の差を捕えにくい | 同じ状況に複数の actor が混在する場合、誰の動機かが曖昧になる |
| 推奨ケース | B2B SaaS、ロール（PM / dev / PO）が分離した業務システム | B2C、ライフスタイル系、行動データ駆動のグロース機能 |

### 例（同じ機能を両形式で）

User Story 形式:

```
As a 組織オーナー
I want メンバーをメールで招待できる
so that 知っているメンバーを 1 分でチームに追加できる
```

Job Story 形式:

```
When チームに新メンバーを迎える状況になったとき
I want to メールアドレス 1 つで招待を送れるようにしたい
so I can 知っているメンバーを 1 分でチームに追加できる
```

### 本スキルでの方針

- Mode B PBI は **User Story 形式を primary** とする（Scrum 標準互換、INVEST チェックが回しやすい）
- ユーザーが Job Story を希望した場合（特に JTBD interview 由来の仮説検証文脈）、**PBI 詳細の補助欄として併記** する形で対応
- 両形式を混在させない（バックログ全体で統一する）
