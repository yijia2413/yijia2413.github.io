---
layout: post
title: "Paper: AgentBench: Evaluating LLMs as Agents"
category: papers
tags: [评测基准, Agent, 多环境, 能力评估]
authors: "Liu et al., 2023"
paper_id: 91
permalink: /papers/2026-05-29-091
arxiv: '2308.03688'
---
## 一句话概括

AgentBench构建了一个系统性的多维度评测基准，在8个不同的真实环境中全面评估LLM作为自主Agent的能力表现。


## 核心思想

现有基准主要评估LLM的文本生成能力，缺乏对Agent能力的系统评估。AgentBench设计了8个多样化的交互环境：操作系统、数据库、知识图谱、数字卡牌游戏、家居环境、网页浏览、网上购物和横向思维谜题。在每个环境中，Agent需要通过多轮交互来完成目标任务。评测覆盖了规划、推理、工具使用、指令遵循等多种Agent核心能力。


## 关键创新

1) 首个系统性的LLM Agent评测基准；2) 涵盖8个多样化的真实交互环境；3) 评估了25个LLM的Agent能力；4) 发现商业模型和开源模型之间存在显著差距；5) 揭示了Agent能力与传统NLP能力的不同维度。


## 深远影响

AgentBench为Agent研究提供了标准化的评估框架，使不同Agent系统之间的比较成为可能。它也暴露了当前LLM在实际Agent场景中的不足，为后续改进指明了方向。


## 启发与思考

AgentBench的重要发现是：模型在传统NLP任务上的表现不能直接预测其Agent能力。这提醒我们，构建真正有用的AI Agent需要关注交互能力、环境适应性等新维度。
