#!/usr/bin/env bash
# Assemble viewer from templates + content/.
# Usage: assemble.sh slides/my-deck [--minimal]
set -euo pipefail

MINIMAL=false
OUT=""

for arg in "$@"; do
  case "$arg" in
    --minimal) MINIMAL=true ;;
    -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *)
      if [[ -z "$OUT" ]]; then OUT="$arg"
      else echo "Unexpected argument: $arg" >&2; exit 1; fi
      ;;
  esac
done

if [[ -z "$OUT" ]]; then
  echo "Usage: assemble.sh slides/my-deck [--minimal]" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VIEWER="$SKILL_DIR/templates/viewer"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
TARGET="$(cd "$REPO_ROOT" && mkdir -p "$(dirname "$OUT")" && cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
CONTENT_DIR="$TARGET/content"

if [[ -e "$TARGET/index.html" ]]; then
  echo "Already exists: $TARGET/index.html" >&2
  echo "Remove it to re-assemble from content/." >&2
  exit 1
fi

mkdir -p "$TARGET"

DECK_TITLE="$(basename "$TARGET" | tr '_-' '  ')"
HAS_CONTENT=false
if [[ -d "$CONTENT_DIR/sections" ]] && [[ -n "$(ls -A "$CONTENT_DIR/sections"/*.html 2>/dev/null)" ]]; then
  HAS_CONTENT=true
fi

if $HAS_CONTENT; then
  if command -v bun >/dev/null 2>&1; then
    bun "$SCRIPT_DIR/validate-content.mjs" "$OUT" || exit 1
  fi
  if [[ -f "$CONTENT_DIR/meta.json" ]]; then
    META_TITLE="$(python3 -c "import json; print(json.load(open('$CONTENT_DIR/meta.json'))['title'])" 2>/dev/null || true)"
    if [[ -n "$META_TITLE" ]]; then DECK_TITLE="$META_TITLE"; fi
  fi
fi

cp "$VIEWER/index.html" "$TARGET/index.html"
cp "$VIEWER/slide-styles.css" "$TARGET/slide-styles.css"
cp "$VIEWER/deck-stage.js" "$TARGET/deck-stage.js"
cp "$VIEWER/image-slot.js" "$TARGET/image-slot.js"
cp "$VIEWER/slide-section.stub.html" "$TARGET/slide-section.stub.html"

if [[ -f "$CONTENT_DIR/tokens.css" ]]; then
  printf '\n/* --- content/tokens.css --- */\n' >> "$TARGET/slide-styles.css"
  cat "$CONTENT_DIR/tokens.css" >> "$TARGET/slide-styles.css"
fi

if [[ "$(uname)" == "Darwin" ]]; then
  sed -i '' "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$TARGET/index.html"
else
  sed -i "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$TARGET/index.html"
fi

if $HAS_CONTENT; then
  SLIDES_TMP="$(mktemp)"
  for f in "$CONTENT_DIR/sections"/*.html; do
    [[ -f "$f" ]] || continue
    sed "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$f" >> "$SLIDES_TMP"
    printf '\n\n' >> "$SLIDES_TMP"
  done
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "/<deck-stage/,/<\/deck-stage>/{
      /<!-- SLIDES/r $SLIDES_TMP
      /<!-- SLIDES/d
    }" "$TARGET/index.html"
  else
    sed -i "/<deck-stage/,/<\/deck-stage>/{
      /<!-- SLIDES/r $SLIDES_TMP
      /<!-- SLIDES/d
    }" "$TARGET/index.html"
  fi
  rm -f "$SLIDES_TMP"

  if [[ -f "$CONTENT_DIR/speaker-notes.json" ]]; then
    NOTES="$(cat "$CONTENT_DIR/speaker-notes.json")"
    if [[ "$(uname)" == "Darwin" ]]; then
      sed -i '' "s|<script type=\"application/json\" id=\"speaker-notes\">\\[\\]</script>|<script type=\"application/json\" id=\"speaker-notes\">$NOTES</script>|" "$TARGET/index.html"
    else
      sed -i "s|<script type=\"application/json\" id=\"speaker-notes\">\\[\\]</script>|<script type=\"application/json\" id=\"speaker-notes\">$NOTES</script>|" "$TARGET/index.html"
    fi
  fi
  echo "Assembled from: $CONTENT_DIR"
elif $MINIMAL; then
  SLIDES_FILE="$SKILL_DIR/examples/minimal-deck/slides.html"
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "/<deck-stage/,/<\/deck-stage>/{
      /<!-- SLIDES/r $SLIDES_FILE
      /<!-- SLIDES/d
    }" "$TARGET/index.html"
    sed -i '' "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$TARGET/index.html"
  else
    sed -i "/<deck-stage/,/<\/deck-stage>/{
      /<!-- SLIDES/r $SLIDES_FILE
      /<!-- SLIDES/d
    }" "$TARGET/index.html"
    sed -i "s/{{DECK_TITLE}}/$DECK_TITLE/g" "$TARGET/index.html"
  fi
  NOTES='["Welcome to the demo deck.","Edit content/sections/ and re-assemble."]'
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s|<script type=\"application/json\" id=\"speaker-notes\">\\[\\]</script>|<script type=\"application/json\" id=\"speaker-notes\">$NOTES</script>|" "$TARGET/index.html"
  else
    sed -i "s|<script type=\"application/json\" id=\"speaker-notes\">\\[\\]</script>|<script type=\"application/json\" id=\"speaker-notes\">$NOTES</script>|" "$TARGET/index.html"
  fi
else
  echo "No content/sections — empty deck. Add sections or use --minimal." >&2
fi

echo "Created: $TARGET"
echo "Open: npx serve $TARGET"
