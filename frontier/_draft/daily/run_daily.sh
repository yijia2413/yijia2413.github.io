#!/bin/bash
# Frontier 每日技术博客。cron 在 UTC 13:00 触发，即北京时间 21:00。
# 当天 HTML 已存在则退出，避免重跑覆盖人工改过的稿。
set -u
REPO=/config/workspace/code/yijia2413.github.io
LOGDIR=/config/workspace/drive/ai-tmp/frontier-daily/logs
PROMPT=/config/workspace/code/yijia2413.github.io/frontier/_draft/daily/PROMPT.md
mkdir -p "$LOGDIR"
export TZ=Asia/Shanghai
DAY=$(date +%F)
LOG="$LOGDIR/$DAY.log"
HTML="$REPO/frontier/${DAY}-daily.html"

{
  echo "=== $(date '+%F %T %Z') start ==="
  if [ -f "$HTML" ]; then
    echo "skip: $HTML already exists"
    exit 0
  fi
  if [ ! -f "$PROMPT" ]; then
    echo "missing prompt: $PROMPT"
    exit 1
  fi
  cd "$REPO" || exit 1
  # 非交互。不带 --no-session，方便事后回看这次跑了什么。
  pi --print --name "frontier-daily-$DAY" --thinking high \
    "$(cat "$PROMPT")" \
    "今天的日期是 $DAY（北京时间）。文件名必须是 frontier/${DAY}-daily.html。只提交这一篇和 _data/frontier.yml 的对应一条，不要 git add -A，不要推送其他路径。Reddit 和 X 没有登录态时明确写「今日未覆盖」，不要用二手转述填。"
  echo "=== $(date '+%F %T %Z') pi exit $? ==="
} >>"$LOG" 2>&1
