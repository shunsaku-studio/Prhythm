#!/usr/bin/env bash
# Initialize slide deck content workspace.
# Usage: init-deck.sh slides/my-deck
set -euo pipefail

OUT="${1:-}"
if [[ -z "$OUT" ]]; then
  echo "Usage: init-deck.sh slides/my-deck" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES="$SKILL_DIR/templates/content"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
DECK_DIR="$(cd "$REPO_ROOT" && mkdir -p "$(dirname "$OUT")" && cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
CONTENT="$DECK_DIR/content"

if [[ -e "$DECK_DIR/index.html" ]]; then
  echo "Viewer already exists: $DECK_DIR/index.html" >&2
  echo "Remove index.html to re-init, or use mode: edit." >&2
  exit 1
fi

if [[ -d "$CONTENT/sections" ]] && [[ -n "$(ls -A "$CONTENT/sections" 2>/dev/null)" ]]; then
  echo "Content already initialized: $CONTENT" >&2
  exit 1
fi

mkdir -p "$CONTENT/sections"
DECK_NAME="$(basename "$DECK_DIR")"
DECK_TITLE="$(echo "$DECK_NAME" | tr '_-' '  ')"

cp "$TEMPLATES/outline.md" "$CONTENT/outline.md"
cp "$TEMPLATES/meta.json" "$CONTENT/meta.json"
cp "$SKILL_DIR/templates/themes/default.css" "$CONTENT/tokens.css"
cp "$TEMPLATES/speaker-notes.json" "$CONTENT/speaker-notes.json"

if [[ "$(uname)" == "Darwin" ]]; then
  sed -i '' "s/{{DECK_NAME}}/$DECK_NAME/g" "$CONTENT/meta.json"
  sed -i '' "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$CONTENT/meta.json"
  sed -i '' "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$CONTENT/outline.md"
else
  sed -i "s/{{DECK_NAME}}/$DECK_NAME/g" "$CONTENT/meta.json"
  sed -i "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$CONTENT/meta.json"
  sed -i "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$CONTENT/outline.md"
fi

echo "Created content workspace: $CONTENT"
echo "Next: outline (Phase 1) → theme (Phase 1b) → sections → assemble.sh $OUT"
