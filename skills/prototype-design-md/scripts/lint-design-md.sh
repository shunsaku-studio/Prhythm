#!/usr/bin/env bash
# Lint DESIGN.md against Google spec (structure, refs, WCAG).
# Usage: lint-design-md.sh [path/to/DESIGN.md]
set -euo pipefail

find_project_root() {
  local dir="${1:-$PWD}"
  local root
  if root="$(git -C "$dir" rev-parse --show-toplevel 2>/dev/null)"; then
    printf '%s\n' "$root"
    return 0
  fi
  while [[ "$dir" != "/" ]]; do
    if [[ -d "$dir/.git" ]]; then
      printf '%s\n' "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  printf '%s\n' "${1:-$PWD}"
}

PROJECT_ROOT="$(find_project_root "$PWD")"
DESIGN_PATH="${1:-$PROJECT_ROOT/DESIGN.md}"

if [[ ! -f "$DESIGN_PATH" ]]; then
  echo "DESIGN.md not found: $DESIGN_PATH" >&2
  exit 1
fi

echo "Linting: $DESIGN_PATH"
npx -y @google/design.md lint "$DESIGN_PATH"
