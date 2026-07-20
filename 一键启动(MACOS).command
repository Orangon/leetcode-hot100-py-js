#!/bin/bash
# macOS 一键启动：双击本文件即可（首次可能需要在「系统设置 → 隐私与安全性」允许）。
cd "$(dirname "$0")" || exit 1

# 从 8931 开始找第一个空闲端口
PORT=8931
while lsof -nP -i :"$PORT" >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  if [ "$PORT" -gt 8951 ]; then
    echo "错误：8931-8951 端口都被占用，请关闭一些程序后重试。"
    read -r -p "按回车退出..."
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
  echo "错误：未找到 Python 3 或 Node.js。"
  echo "请先安装其一：Python https://www.python.org 或 Node.js https://nodejs.org"
  read -r -p "按回车退出..."
  exit 1
fi

echo "======================================"
echo "  LeetCode Hot 100 刷题"
echo "  地址：$URL"
echo "  停止：按 Ctrl+C 或直接关闭本窗口"
echo "======================================"

# 1 秒后自动打开浏览器
( sleep 1; open "$URL" ) &

"${CMD[@]}"
