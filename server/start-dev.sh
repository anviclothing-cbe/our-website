#!/usr/bin/env bash
set -e


# Start the API server
exec npm run dev -w @workspace/api-server
