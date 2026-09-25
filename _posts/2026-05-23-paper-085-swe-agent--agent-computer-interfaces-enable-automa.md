---
layout: post
title: "Paper: SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
category: papers
tags: [Agent, 软件工程, 人机接口, 代码修复]
authors: "Yang et al., 2024"
paper_id: 85
permalink: /papers/2026-05-23-085
arxiv: '2405.15793'
---
## 一句话概括

SWE-agent设计了专门的Agent-Computer Interface，让LLM Agent能够高效地与计算机交互来解决真实的软件工程问题，在SWE-bench上取得突破性成绩。


## 核心思想

就像HCI设计关注人如何高效使用计算机一样，SWE-agent提出ACI设计关注LLM Agent如何高效使用计算机。核心发现是：给Agent提供精心设计的交互界面比简单地让Agent使用原始命令行更有效。SWE-agent设计了文件查看器、搜索工具、代码编辑器等专用接口，让Agent能够方便地浏览代码库、定位bug和编写修复代码。


## 关键创新

1) 提出ACI概念，强调接口设计对Agent性能的关键影响；2) 设计了适合LLM特点的文件导航和编辑工具；3) 在SWE-bench上解决了12.5%的真实GitHub issue；4) 系统性地研究了不同接口设计对Agent表现的影响。


## 深远影响

SWE-agent将AI编程Agent从简单代码生成提升到解决真实软件工程问题的层面。ACI的概念启发了整个行业思考如何为AI Agent设计更好的工具和界面。


## 启发与思考

SWE-agent最大的洞察是：Agent的能力不仅取决于底层模型，更取决于它与环境交互的方式。好的接口设计可以显著放大Agent的能力，这对构建实用的AI Agent系统具有重要指导意义。
