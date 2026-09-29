#!/bin/bash
# Start Milan Portfolio Server
cd "$(dirname "$0")"
echo "🚀 Starting Milan Portfolio at http://localhost:8080"
echo "Press Ctrl+C to stop"
python3 -m http.server 8080
