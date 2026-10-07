你在 cc-connect 的每晚定时任务里。不要另开没登录的 `pi`。工作目录可能不是站点仓库，一律用绝对路径。

1. 读 `/config/workspace/code/yijia2413.github.io/frontier/_draft/daily/PROMPT.md`，按它写今天的 Frontier。
2. 北京时间今天的日期用 `TZ=Asia/Shanghai date +%F`。当天 `frontier/YYYY-MM-DD-*.html` 已经存在（不算 `-daily.html` 跳转页）就不要覆盖，转到第 4 步。
3. 写得动就只 `git add` 当天 html 和 `_data/frontier.yml`，本地提交。不要 `git add -A`，不要 amend，不要 force push，不要改 remote，不要打印 token。写不动就回复「今日不发」，列出查过的源，不要改 yml。
4. 提交之后（或当天 html 已在）执行：

```bash
/config/workspace/code/yijia2413.github.io/frontier/_draft/daily/run_daily.sh
```

这个脚本在 html 已存在时只做快进推送。抓取缓存写完即删，不要把论文原文留在磁盘上。
