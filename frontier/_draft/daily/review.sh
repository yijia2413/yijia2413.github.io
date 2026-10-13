#!/bin/bash
# Frontier 发稿前的独立评审。
# 新开一个只读会话，只给它稿件、重新抓的原文和 REVIEW.md 里的评审标准，不给写稿过程。
# 用法：review.sh /绝对路径/frontier/YYYY-MM-DD-xxx.html
# 结果打到标准输出，同时存到 /tmp/frontier-review/<稿件文件名>/review.md。
# 默认评审是 Claude Sonnet 的新会话；调不通时换 pi 的新会话。首行写明这次用的是哪一个。
# FRONTIER_REVIEWER=claude 或 pi 可以指定只用其中一个。
# 退出码：0 评审跑完并给出结论行；2 用法错；3 评审没跑成。
# 抓到的原文只放 /tmp/frontier-review/，run_daily.sh 推送时会删掉，不进仓库。
set -u
export PATH="/config/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
HERE=$(cd "$(dirname "$0")" && pwd)
HTML=${1:-}
if [ -z "$HTML" ] || [ ! -f "$HTML" ]; then
  echo "用法：review.sh <稿件 html 的绝对路径>" >&2
  exit 2
fi
CLAUDE_MODEL=${FRONTIER_REVIEW_CLAUDE_MODEL:-sonnet}
PI_MODEL=${FRONTIER_REVIEW_PI_MODEL:-xai-oauth/grok-4.7}
LIMIT=${FRONTIER_REVIEW_TIMEOUT:-1500}
WORK=/tmp/frontier-review/$(basename "$HTML" .html)
rm -rf "$WORK"
mkdir -p "$WORK/src"
cp "$HTML" "$WORK/article.html"
cp "$HERE/REVIEW.md" "$WORK/prompt.txt"

# 把稿件里的外链重新抓一遍，转成纯文本给评审对数字。arXiv 的 abs 链接换成全文 HTML。
/usr/bin/python3 - "$WORK" <<'PY'
import re
import subprocess
import sys
import urllib.request
from html.parser import HTMLParser

work = sys.argv[1]
art = open(f"{work}/article.html", encoding="utf-8").read()
BLOCK = {"p", "div", "tr", "li", "br", "section", "figure", "figcaption", "table", "caption",
         "h1", "h2", "h3", "h4", "h5", "h6", "title", "blockquote", "pre"}
SKIP = {"script", "style", "annotation", "annotation-xml", "noscript"}


class Text(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out, self.skip = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.skip += 1
        elif tag == "br":
            self.out.append("\n")

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)
        elif tag in ("td", "th"):
            self.out.append(" | ")
        elif tag in BLOCK:
            self.out.append("\n")

    def handle_data(self, data):
        if not self.skip:
            self.out.append(data)


def to_text(raw):
    p = Text()
    p.feed(raw)
    t = "".join(p.out)
    t = re.sub(r"[ \t\r\f\v]+", " ", t)
    return re.sub(r"\n\s*\n+", "\n", t).strip()


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (frontier-review)"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.headers.get("Content-Type", ""), r.read(8_000_000)


links = []
for u in re.findall(r'href="(https?://[^"#]+)', art):
    if u not in links:
        links.append(u)
index = []
for n, u in enumerate(links[:15], 1):
    targets = [u]
    m = re.match(r"https?://arxiv\.org/abs/(\d{4}\.\d{4,5})(v\d+)?", u)
    if m:
        ver = m.group(2) or ""
        if not ver:
            cited = re.search(re.escape(m.group(1)) + r"(v\d+)", art)
            ver = cited.group(1) if cited else ""
        targets = [f"https://arxiv.org/html/{m.group(1)}{ver}", u]
    host = re.sub(r"[^a-z0-9]+", "-", re.sub(r"^https?://", "", u).lower())[:48].strip("-")
    name = f"{n:02d}-{host}.txt"
    status = "抓取失败"
    for t in targets:
        try:
            ctype, body = fetch(t)
            if "pdf" in ctype or body[:4] == b"%PDF":
                pdf = f"{work}/src/{n:02d}.pdf"
                open(pdf, "wb").write(body)
                text = subprocess.run(["pdftotext", "-layout", pdf, "-"], capture_output=True,
                                      encoding="utf-8", errors="replace", timeout=120).stdout
            else:
                text = to_text(body.decode("utf-8", "replace"))
            if len(text) < 200:
                status = f"抓取失败：正文不足 200 字（{t}）"
                continue
            open(f"{work}/src/{name}", "w", encoding="utf-8").write(f"URL: {t}\n\n{text}\n")
            status = f"已抓 {len(text)} 字 -> src/{name}（实际请求 {t}）"
            break
        except Exception as e:  # noqa: BLE001
            status = f"抓取失败：{type(e).__name__} {getattr(e, 'code', '')}（{t}）"
    index.append(f"{u}\n    {status}")
if len(links) > 15:
    index.append(f"另有 {len(links) - 15} 个外链没有抓，评审需要时自己打开。")
open(f"{work}/src/INDEX.txt", "w", encoding="utf-8").write("\n".join(index) + "\n")
PY

# 全角冒号写成 (:|：) 而不是放进方括号：没有 UTF-8 语言环境时方括号按单字节匹配，会认不出结论行。
has_verdict() {
  grep -q -E '^[#*> ]*结论(:|：) *\**(BLOCK|REVISE|PASS)' "$WORK/review.md" 2>/dev/null
}

run_claude() {
  command -v claude >/dev/null 2>&1 || return 1
  (cd "$WORK" && timeout "$LIMIT" claude -p --restricted --strict-mcp-config --no-session-persistence \
    --model "$CLAUDE_MODEL" --effort high \
    --tools "Read,Grep,Glob,WebFetch" --allowedTools "Read,Grep,Glob,WebFetch" \
    <prompt.txt >review.md 2>review.err)
  has_verdict
}

run_pi() {
  command -v pi >/dev/null 2>&1 || return 1
  (cd "$WORK" && timeout "$LIMIT" pi -p --no-session --model "$PI_MODEL" --tools read,grep,find,ls \
    "$(cat prompt.txt)" </dev/null >review.md 2>review.err)
  has_verdict
}

WHO=""
case "${FRONTIER_REVIEWER:-auto}" in
  claude) run_claude && WHO="Claude $CLAUDE_MODEL 新会话" ;;
  pi) run_pi && WHO="pi $PI_MODEL 新会话" ;;
  *)
    if run_claude; then
      WHO="Claude $CLAUDE_MODEL 新会话"
    elif run_pi; then
      WHO="pi $PI_MODEL 新会话（Claude 没调通）"
    fi
    ;;
esac

if [ -z "$WHO" ]; then
  echo "评审没跑成。最后一次的错误输出："
  tail -n 15 "$WORK/review.err" 2>/dev/null
  exit 3
fi
echo "评审者：$WHO"
echo "原文抓取：$(grep -c '已抓' "$WORK/src/INDEX.txt") 个成功，$(grep -c '抓取失败' "$WORK/src/INDEX.txt") 个失败"
echo
cat "$WORK/review.md"
