#!/bin/bash
set -Eeuo pipefail

PORT="${DEPLOY_RUN_PORT:-5000}"

echo "Starting HTTP service on port ${PORT} for deploy..."
PORT=${PORT} node dist/server.js
