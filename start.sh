#!/bin/bash
# Linux / macOS 终端一键启动：bash start.sh
cd "$(dirname "$0")" || exit 1

PORT=8931
while lsof -nP -i :"$PORT" >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  if [ "$PORT" -gt 8951 ]; then
    echo "错误：8931-8951 端口都被占用。"
    exit 1
  fi
done

URL="http://127.0.0.1:$PORT"

# AI 助手的本地 CORS 代理（仅当 Node 可用且 8966 空闲时启动；不用 AI 助手可忽略）
PROXY_PID=''
if command -v node >/dev/null 2>&1 && ! lsof -nP -i :8966 >/dev/null 2>&1; then
  node tools/cors-proxy.mjs >/dev/null 2>&1 &
  PROXY_PID=$!
  trap 'kill "$PROXY_PID" 2>/dev/null' EXIT
fi

if command -v python3 >/dev/null 2>&1; then
  CMD=(python3 -m http.server "$PORT" --bind 127.0.0.1)
elif command -v node >/dev/null 2>&1; then
  CMD=(node tools/serve.js "$PORT")
else
  echo "错误：未找到 Python 3 或 Node.js，请先安装其一。"
  exit 1
fi

echo "启动：$URL （按 Ctrl+C 停止）"

# 尝试自动打开浏览器（失败则手动复制地址）
( sleep 1
  if command -v open >/dev/null 2>&1; then open "$URL"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"
  fi ) &

"${CMD[@]}"
