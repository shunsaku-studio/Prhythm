#!/usr/bin/env bash
# Initialize GraphQL schema design workspace.
# Usage: init-schema.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
SCHEMA_PATH="$REPO_ROOT/src/model/schema.graphql"
TEMPLATES="$SKILL_DIR/templates"

if [[ -f "$SCHEMA_PATH" ]]; then
  echo "Schema already exists: $SCHEMA_PATH" >&2
  echo "Edit src/model/schema.graphql directly, or remove it to re-init." >&2
  exit 1
fi

mkdir -p "$(dirname "$SCHEMA_PATH")"
cp "$TEMPLATES/schema.stub.graphql" "$SCHEMA_PATH"

echo "Created: $SCHEMA_PATH"
echo "Next: structure → mutations → validate (requirements come from user message)"
