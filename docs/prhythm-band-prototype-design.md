---
version: alpha
name: Prhythm Band Workflow Prototype
description: >-
  Prototype brief for validating Prhythm as a band-facing workflow artifact.
  Token values live in project CSS only. This file defines judgment.
---

# Prhythm Band Workflow Prototype — DESIGN.md Draft

対象スキル: `prototype-design-md`  
用途: バンドメンバー向けに、Prhythm 成果物の導線やプロトタイプ画面を作る場合の判断ブリーフ。

## Overview

### Product Feel

Prhythm は、案件初期の散らかった情報を「次に判断できる形」へ整える作業台として振る舞う。静かで実務的、読み返しやすく、会議直後の短い時間でも使えることを優先する。派手なAIツール感、マーケティングサイト風の高揚感、装飾的なダッシュボードではない。

### Surface Type

- **Primary:** operational tool
- **Secondary:** docs / structured report
- **Tertiary:** validation checklist

### Density

- Primary surface: medium-high
- Docs surface: medium
- Checklist surface: high

## Colors

**Token source:** proposed — create CSS first if implementing UI.

Document role to `var(--*)` usage limits only. No hex values in this brief.

- **Primary (`--primary`):** one main progression action per screen.
- **Accent (`--accent`):** evidence tags, phase markers, or selected HMW only.
- **Muted (`--muted`):** assumptions, unknowns, and secondary metadata.
- **Danger (`--danger`):** risks, falsification conditions, and blocked states.

## Typography

Use a Japanese-first sans-serif with clear numerals and compact table readability. Avoid expressive display typography inside the tool surface. Copy should be direct, operational, and short.

## Layout

- Use a two-pane work surface when possible: left for phase / artifact navigation, right for the current artifact.
- Keep tables readable without horizontal scanning on desktop.
- On mobile, collapse navigation into a top control and keep one artifact section per screen.
- Avoid hero sections, oversized cards, decorative illustrations, and marketing-style introductions.
- Put `Next Action`, `Unknown`, and `Risk` near the artifact they affect.

## Elevation & Depth

Use shallow elevation only for sticky controls or focused modals. The main reading surface should feel like a working document, not a stack of floating cards.

## Shapes

Use small radii. Avoid pill-heavy UI except for compact tags such as `Fact`, `Assumption`, `Unknown`, and `Risk`.

## Components

- Artifact list → dense sidebar list
- Persona / segment comparison → table
- Journey map phases → vertical timeline or collapsible sections
- Validation plan → structured checklist
- Evidence tags → compact label
- Human Decision Gates → comparison table with explicit options
- Primary action → verb-first button
- Risk and falsification conditions → callout with restrained visual weight

## Do's and Don'ts

**Do**

- Keep the current artifact and next action visible together.
- Distinguish Fact, Assumption, Unknown, and Risk consistently.
- Allow single-skill usage without forcing the full pipeline.
- Show which artifact can feed the next skill.
- Keep generated text scannable in tables and short sections.

**Don't**

- Do not present Prhythm as a generic AI assistant.
- Do not make the interface a dashboard full of metrics before usage data exists.
- Do not hide assumptions in polished prose.
- Do not force users through all skills in sequence.
- Do not use decorative gradients, hero banners, or abstract illustrations.

### Agent Instructions

- Read project CSS for values; read this file for judgment.
- Keep the tool optimized for repeated work, not first-time marketing explanation.
- Do not invent UI features beyond the artifact flow being validated.

## Forbidden Patterns

- Marketing landing page hero as the first screen
- Large decorative cards for every artifact
- Generic "modern and clean" copy
- AI magic language such as "automatically understands everything"
- Icon-only controls without labels or tooltips
- Evidence tags that rely on color alone
- Long generated prose without a visible decision or next action

## Copy Guidelines

- Button labels: verb-first, e.g. `次の論点を作る`, `HMWを選ぶ`, `検証条件を書く`
- Errors: state what happened and what the user can do next
- Empty states: ask for the minimum input needed for the current skill only
- Avoid saying the whole pipeline is required

## Responsive Priority

1. Desktop 1280px for side-by-side artifact work
2. Laptop 1024px for meeting-time usage
3. Mobile 375px for reading and quick review only

## Minimum Verification

- [ ] Density matches operational tool usage
- [ ] No Forbidden Patterns
- [ ] Evidence tags remain readable without color alone
- [ ] Text does not overflow tables or phase cards
- [ ] Single-skill usage is possible
- [ ] Next action is visible in every artifact view
