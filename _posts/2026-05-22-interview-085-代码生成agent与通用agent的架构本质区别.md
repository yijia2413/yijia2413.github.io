---
layout: post
title: 'Interview: 代码生成Agent与通用Agent的架构本质区别'
category: interviews
tags: [SWE-Agent, 代码生成, Agent架构, 软件工程]
difficulty: "高级"
question_id: 85
permalink: /interviews/2026-05-22-085
---

## 题目解析

SWE-Agent等代码Agent在SWE-bench上取得了令人瞩目的成绩，但其架构设计与通用Agent有显著差异。此题考察你对不同Agent范式的深入理解。


## 解答思路

核心区别体现在三个方面：(1)环境特性——代码环境是确定性的、可验证的(编译/测试可自动验证正确性)，通用Agent面对的环境往往是随机的、难以自动验证的；(2)动作空间——代码Agent的动作空间相对受限且结构化(编辑文件、运行命令、搜索代码)，通用Agent面对开放动作空间；(3)反馈机制——代码Agent有丰富的即时反馈(编译错误、测试失败、lint警告)，通用Agent的反馈往往稀疏或延迟。


## 关键要点

SWE-Agent的关键设计创新是Agent-Computer Interface(ACI)——专门为LLM设计的代码交互界面，包括优化的文件浏览、搜索和编辑命令。这说明Agent的性能不仅取决于模型能力，还高度依赖人机交互界面的设计。代码Agent还大量利用了代码的结构化特性(AST、依赖图、符号表)来缩小搜索空间。


## 加分回答

可以对比Devin、SWE-Agent和OpenHands在架构上的差异。还可以讨论代码Agent独有的verification优势——可以编写测试来自动验证修改正确性，这在其他Agent场景中很难做到。以及discuss代码Agent向"自主软件工程师"演进的技术挑战。


## 常见踩坑

容易犯的错误是将代码Agent等同于"能写代码的ChatGPT"——实际上关键差异在于与代码环境的交互循环而非单次代码生成。另外不要高估SWE-bench得分的含义，benchmark性能与真实软件工程场景还有很大差距。
