#!/usr/bin/env bash
# Validate GraphQL SDL syntax (Node.js).
# Usage: validate-schema.sh path/to/schema.graphql
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCHEMA="${1:-}"

if [[ -z "$SCHEMA" ]]; then
  echo "Usage: validate-schema.sh <schema.graphql>" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node is required (https://nodejs.org/)" >&2
  exit 1
fi

if [[ ! -d "$SCRIPT_DIR/node_modules/graphql" ]]; then
  echo "Installing graphql (first run only)..." >&2
  npm install --prefix "$SCRIPT_DIR" --silent
fi

node "$SCRIPT_DIR/validate-schema.mjs" "$SCHEMA"
