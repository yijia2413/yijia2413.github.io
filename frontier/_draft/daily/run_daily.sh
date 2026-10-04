#!/bin/bash
# Frontier 每日技术博客。cron 在 UTC 13:00 触发，即北京时间 21:00。
# 当天已经有按标题命名的 HTML 则不再跑 pi，避免覆盖人工改过的稿。旧的 -daily.html 只当跳转，不算当天稿。
# 推送只走 gh 的 HTTPS 凭证，不改仓库 remote，不打印 token。
# 远端 master 必须是本地祖先，且本次相对远端只动 frontier/ 与 _data/frontier.yml，才允许快进推送。
set -u
REPO=/config/workspace/code/yijia2413.github.io
LOGDIR=/config/workspace/drive/ai-tmp/frontier-daily/logs
PROMPT=/config/workspace/code/yijia2413.github.io/frontier/_draft/daily/PROMPT.md
PUSH_URL=https://github.com/yijia2413/yijia2413.github.io.git
mkdir -p "$LOGDIR"
export TZ=Asia/Shanghai
DAY=$(date +%F)
LOG="$LOGDIR/$DAY.log"
find_html() {
  ls -1 "$REPO/frontier/${DAY}"-*.html 2>/dev/null | grep -v -- "-daily.html" | head -n 1 || true
}
HTML=$(find_html)

push_if_safe() {
  local remote_sha
  remote_sha=$(gh api repos/yijia2413/yijia2413.github.io/commits/master --jq .sha) || {
    echo "push skip: cannot read remote master"
    return 1
  }
  echo "remote master $remote_sha"
  git cat-file -e "${remote_sha}^{commit}" 2>/dev/null || {
    echo "push skip: remote sha not in local object store"
    return 1
  }
  git merge-base --is-ancestor "$remote_sha" HEAD || {
    echo "push skip: remote is not an ancestor of HEAD"
    return 1
  }
  local other
  other=$(git diff --name-only "$remote_sha" HEAD | grep -v -e '^frontier/' -e '^_data/frontier.yml$' || true)
  if [ -n "$other" ]; then
    echo "push skip: non-frontier paths between remote and HEAD"
    echo "$other"
    return 1
  fi
  git -c credential.helper='!gh auth git-credential' push "$PUSH_URL" HEAD:master
}

{
  echo "=== $(date '+%F %T %Z') start ==="
  if [ -n "$HTML" ] && [ -f "$HTML" ]; then
    echo "skip pi: $HTML already exists, try push only"
    cd "$REPO" || exit 1
    push_if_safe
    rc=$?
    echo "=== $(date '+%F %T %Z') push-only exit $rc ==="
    exit $rc
  fi
  if [ ! -f "$PROMPT" ]; then
    echo "missing prompt: $PROMPT"
    exit 1
  fi
  cd "$REPO" || exit 1
  pi --print --name "frontier-daily-$DAY" --thinking high \
    "$(cat "$PROMPT")" \
    "今天的日期是 $DAY（北京时间）。文件名必须是 frontier/${DAY}-短英文主题.html，用标题起 slug，不要用 -daily。只本地提交这一篇和 _data/frontier.yml 的对应一条。不要 push，不要 git add -A，不要改 remote。Reddit 和 X 没有登录态时写明今日未覆盖，不要用二手转述填。"
  echo "=== $(date '+%F %T %Z') pi exit $? ==="
  HTML=$(find_html)
  if [ -z "$HTML" ] || [ ! -f "$HTML" ]; then
    echo "no html, skip push"
    exit 1
  fi
  # 抓取缓存不留。要上传的只有 frontier HTML 和索引。
  rm -rf /tmp/frontier-daily
  rm -rf /config/workspace/drive/ai-tmp/frontier-daily/sources
  push_if_safe
  echo "=== $(date '+%F %T %Z') push exit $? ==="
} >>"$LOG" 2>&1
