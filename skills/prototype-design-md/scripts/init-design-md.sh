#!/usr/bin/env bash
# Initialize prototype DESIGN.md at project root.
# Usage: init-design-md.sh
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

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(find_project_root "$PWD")"
DESIGN_PATH="$PROJECT_ROOT/DESIGN.md"
TEMPLATES="$SKILL_DIR/templates"

if [[ -f "$DESIGN_PATH" ]]; then
  echo "DESIGN.md already exists: $DESIGN_PATH" >&2
  echo "Edit DESIGN.md directly, or remove it to re-init." >&2
  exit 1
fi

cp "$TEMPLATES/DESIGN.stub.md" "$DESIGN_PATH"

echo "Created: $DESIGN_PATH"
echo "Next: Phase 1 intent → Phase 2 write + lint (prototype brief; CSS owns values)"
