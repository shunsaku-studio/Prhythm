# Google DESIGN.md Spec Summary

Upstream: [google-labs-code/design.md](https://github.com/google-labs-code/design.md)  
CLI: `npx @google/design.md lint`

## Prototype mode (this skill)

| Layer | Content |
|-------|---------|
| YAML | `name`, `description` only |
| §1–8 | Required order; thin where judgment lives in extensions |
| Extensions | Forbidden Patterns, Copy Guidelines, Responsive Priority, Minimum Verification |

Lint passes without YAML token blocks.

## Canonical order (§1–8)

1. Overview — **Product Feel + Surface + Density** as ### subsections
2. Colors — CSS path + usage limits
3. Typography — direction
4. Layout — rules
5. Elevation & Depth
6. Shapes
7. Components — **selection guide**
8. Do's and Don'ts + Agent Instructions

Extensions after §8.

## Full YAML schema

Reference only — **not used** in prototype-design-md default flow.  
Values belong in project CSS.
