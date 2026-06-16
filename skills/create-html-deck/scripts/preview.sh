#!/usr/bin/env bash
# Start local server and open deck in browser.
# Usage: preview.sh slides/my-deck [port]
set -euo pipefail

OUT="${1:-}"
PORT="${2:-3456}"

if [[ -z "$OUT" ]]; then
  echo "Usage: preview.sh slides/my-deck [port]" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
TARGET="$(cd "$REPO_ROOT" && cd "$(dirname "$OUT")" 2>/dev/null && pwd)/$(basename "$OUT")"

if [[ ! -f "$TARGET/index.html" ]]; then
  echo "Not found: $TARGET/index.html — run assemble.sh first" >&2
  exit 1
fi

if lsof -i ":$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "Port $PORT in use — opening existing server"
  URL="http://localhost:$PORT"
else
  echo "Starting server on port $PORT ..."
  npx --yes serve -l "$PORT" "$TARGET" >/dev/null 2>&1 &
  SERVE_PID=$!
  sleep 1.5
  URL="http://localhost:$PORT"
  echo "Server PID: $SERVE_PID"
fi

if [[ "$(uname)" == "Darwin" ]]; then
  open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"
else
  echo "Open manually: $URL"
fi

echo "Preview: $URL"
