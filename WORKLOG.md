# 工作记录

## 2026-11-15 23:56:28 +08:00｜Frontier 科技视觉改版

状态：完成本地修改，未推送、未发布。

入口改为墨蓝科技刊物风格，增加银白大标题、冰蓝点阵轨道图、文章网格和更新日期。48 条文章标题、摘要、日期与链接完整保留，继续从 `_data/frontier.yml` 生成。48 篇文章共用的导航和标题区同步采用深色视觉，正文保留浅色阅读区、原图表和目录交互。首页图形只运行 3 秒，支持减少动态效果与无 JavaScript 的静态降级。

使用 `npx -y modern-web-guidance@latest install --agent codex -y` 安装 1.0.0 到项目 `.agents/skills/modern-web-guidance/`，本地副本加入忽略规则，`skills-lock.json` 记录来源与哈希。来源 GoogleChrome/modern-web-guidance，Apache-2.0，核对远端 HEAD 为 `4dd968349e54ca45a05dd5c818fb035c9054b022`；安装副本共 210 个 Markdown/JSON 文件，无可执行脚本。执行安装、查询时设置 `DISABLE_TELEMETRY=1`。采用 css-layout 与 motion 指南，未添加前端运行时依赖；可通过该 CLI uninstall 命令移除项目安装。

验证：

- PASS — 151 次 Chromium 渲染：首页 4 种宽度，目录内 49 个独立 HTML 各 3 种宽度；无全页横溢、缺图、目录断锚或脚本异常。48 篇收录文章之外另含 1 个历史 HTML。桌面和手机代表页截图已目检。
- PASS — 键盘跳过链接与文章焦点、手机折叠目录、章节定位、阅读进度、返回顶部、减少动态效果、无 JavaScript 阅读、打印标题对比度。
- PASS — Liquidjs 严格模板渲染、48 条索引内容与源 YAML 一致、内部文章路径、UTF-8、安装锁文件结构、两份 JavaScript 的 `node --check`、`git diff --check`。
- PASS — 独立只读评审，无 Critical/Major；打印首篇标题颜色的 Minor 已修复并在浏览器复验。
- FAIL（已有问题）— 原有模板测试 4 通过、1 失败：Papers 测试仍断言旧过滤语法，`papers.html` 本轮未修改。
- NOT RUN — 完整 Jekyll 构建，环境未安装 Ruby/Jekyll；入口只完成 Liquid 严格渲染与浏览器验证。
- PASS — 渲染后的栏目入口已更新到 Notion「04 预研与调研 → Frontier」，页面 `41928be7-1f6b-8141-8bf8-f2e7b0dad275`。

Git 内容提交：`d28f1743cdf6c4e1ed61be2181558f321f6a4d3a`。

## 2026-11-12 01:10:55 +08:00｜Frontier 文章排版与文字优化

状态：完成。

44 篇独立文章统一为白底阅读版式，调整正文宽度、标题层级和图表间距。桌面目录置于右侧，手机目录可以折叠；补充阅读进度、当前章节提示、返回顶部和跳到正文。样式和交互集中在 `frontier/assets/`，不依赖外部字体或脚本。

逐篇改写导语、小节标题和生硬中文，删除采集日志、评审过程说明及重复表述；23 篇主标题与栏目索引一并更新。文献元数据移到来源部分，保留代码、引用、视频和图表数据。依据原论文第 6.6 节，将根因分析文章中的成本单位修正为美分：约 5 美分、26 美分，耗时 277 秒。

验证：

- PASS — 44 页 × 1440 / 768 / 390 / 320 像素，共 176 次最终浏览器渲染；无全页横溢、缺图、目录断锚或 JavaScript 异常。已目检代表页面的桌面和手机截图。
- PASS — 手机目录、章节定位、当前章节提示、阅读进度、跨屏宽切换、返回顶部及无 JavaScript 阅读。
- PASS — 44 页 UTF-8、相对资源、内部锚点、索引标题、SVG 几何、代码块、引用块与视频完整性检查；图表几何与修改前一致。
- PASS — `node --check frontier/assets/article.js`；`git diff --check`；栏目 YAML 解析出 44 条记录，URL 无重复。
- PASS — 独立排版及文字保真复核，Critical / Major 均已清零；减少动态效果和目录键盘交互问题已修复。
- PASS — 44 篇 HTML 已同步到 Notion 既有「04 预研与调研 → Frontier」，本地文件哈希与归档状态全部一致。
- FAIL（已有问题）— `python3 -m unittest discover -s tests -v`：4 通过、1 失败。失败项 `test_papers_template_includes_only_paper_posts` 检查旧模板写法；`papers.html` 与修改前逐字一致，本次未涉及。
- NOT RUN — 全量 Jekyll 构建；文章为直接发布的静态 HTML，栏目数据已单独解析验证。
- NOT RUN — 全部外部论文重新事实核查；本次检查文字保真，并核对发现歧义的原始段落。

Git 内容提交：`4f19a2f7c36f4ecca2e0d7e446bd58b71a2f6da0`。
