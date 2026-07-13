# User stories and acceptance criteria

User Story is **what a user can do** — it lives in the PBL (`docs/product-backlog.md`). AC is **how we know it's done** — it lives in the acceptance list (`docs/acceptance-criteria.md`). They are in **separate artifacts**; this file covers writing both.

## User Story — primary form (PBL)

The primary form is a single short sentence:

```
<主語(具体的なactor)> は <観察可能な振る舞い> できる
```

Rules:

- **主語** — a concrete actor (`一般ユーザー`, `管理者`, `組織オーナー`...). Never a bare「ユーザー」. Match `docs/usecase-map.md` actor names when it exists.
- **振る舞い** — what the system lets the actor do. **Not** how it's implemented (no API paths, no routes).
- One behavior per story. Split "〜でき、かつ〜できる" into two stories.

### Examples

Good:

```
組織オーナーは、メンバーをメールアドレスで招待できる
```

Bad (implementation leak):

```
ユーザーは、POST /invite API を呼び出せる
```

Bad (bare subject / no real behavior):

```
ユーザーは、招待できる
```

## User Story — detailed form (optional)

When a story needs its motivation recorded, expand it in the PBL「ストーリー詳細」section using `As a / I want / so that`:

```
As a <actor with role / persona>
I want <observable system behavior>
so that <user outcome / benefit>
```

Use the detailed form sparingly — the PBL default is the one-line 「〇〇は〇〇できる」 list. See [Job Story 形式](#job-story-形式-代替形式の注記) for the JTBD alternative.

## Acceptance Criteria — Given / When / Then

≥3 ACs per story, written into `docs/acceptance-criteria.md`. Cover at minimum:

- **Happy path** — the primary success scenario
- **At least one failure mode** — wrong input, conflict, or rate limit
- **At least one boundary** — empty input, max input, time-based edge

### Format

```
- AC-<NN> — <one-line label> (<happy / failure / boundary>)
  - Given <pre-condition>
  - When <action>
  - Then <observable outcome>
```

Each AC carries its `AC-NN` ID and links to the story (`S-NN`) and feature (`F-NN`). See [acceptance-template.md](acceptance-template.md).

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

Stories whose AC fail granularity get rewritten before emit. Do not ship a story to `docs/acceptance-criteria.md` with AC < 3 or AC that fail the testability check.

## Job Story 形式 (代替形式の注記)

PBL の primary は 「〇〇は〇〇できる」 短文（詳細形は `As a / I want / so that`）だが、近年は **Job Story** (Alan Klement / Intercom 流) も普及している。**Job Story** は **Job to be Done (JTBD)** の文脈に近く、状況・動機・期待結果を明示する。

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

- PBL は **「〇〇は〇〇できる」短文を primary** とする（一覧性が高く、優先度順に並べやすい）
- 動機を残したいストーリーは PBL「ストーリー詳細」で `As a / I want / so that` に展開する
- ユーザーが Job Story を希望した場合（特に JTBD interview 由来の仮説検証文脈）、**ストーリー詳細の補助欄として併記** する形で対応
- 形式をバックログ全体で混在させない（一覧の短文形は統一する）
