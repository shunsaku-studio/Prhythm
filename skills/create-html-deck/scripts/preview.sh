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
REPO_ROOT="$(cd "$SKILL_DIR/../.." && pwd)"
TARGET="$(cd "$REPO_ROOT" && cd "$(dirname "$OUT")" 2>/dev/null && pwd)/$(basename "$OUT")"

if [[ ! -f "$TARGET/index.html" ]]; then
  echo "Not found: $TARGET/index.html — run assemble.sh first" >&2
  exit 1
fi

LOG="$TARGET/.preview-server.log"
PIDFILE="$TARGET/.preview-server.pid"

wait_for_port() {
  local i
  for i in {1..25}; do
    if lsof -i ":$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
      return 0
    fi
    sleep 0.2
  done
  return 1
}

start_server() {
  echo "Starting server on port $PORT ..."
  nohup sh -c "cd '$TARGET' && exec python3 -m http.server '$PORT'" >>"$LOG" 2>&1 </dev/null &
  SERVE_PID=$!
  echo "$SERVE_PID" >"$PIDFILE"
  disown "$SERVE_PID" 2>/dev/null || disown

  if ! wait_for_port; then
    echo "Failed to start server — see $LOG" >&2
    exit 1
  fi

  echo "Server PID: $SERVE_PID"
  echo "Log: $LOG"
}

if lsof -i ":$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "Port $PORT in use — opening existing server"
else
  start_server
fi

URL="http://localhost:$PORT"

if [[ "$(uname)" == "Darwin" ]]; then
  open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"
else
  echo "Open manually: $URL"
fi

echo "Preview: $URL"
