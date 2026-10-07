#!/bin/bash
# Frontier 每日收尾。写作由 cc-connect 每晚 21:00（北京时间）触发。
# 本脚本不再调用 pi：当天 HTML 已在则快进推送，没有稿就退出。
# 旧的 -daily.html 只当跳转，不算当天稿。
# 推送只走 gh 的 HTTPS 凭证，不改仓库 remote，不打印 token。
# 远端 master 必须是本地祖先，且本次相对远端只动 frontier/ 与 _data/frontier.yml，才允许快进推送。
set -u
REPO=/config/workspace/code/yijia2413.github.io
LOGDIR=/config/workspace/drive/ai-tmp/frontier-daily/logs
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
  cd "$REPO" || exit 1
  HTML=$(find_html)
  rm -rf /tmp/frontier-daily
  rm -rf /config/workspace/drive/ai-tmp/frontier-daily/sources
  if [ -z "$HTML" ] || [ ! -f "$HTML" ]; then
    echo "no html for $DAY, skip push"
    echo "=== $(date '+%F %T %Z') exit 0 ==="
    exit 0
  fi
  echo "push $HTML"
  push_if_safe
  echo "=== $(date '+%F %T %Z') push exit $? ==="
} >>"$LOG" 2>&1
