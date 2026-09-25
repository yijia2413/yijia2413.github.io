---
layout: post
title: "Paper: LLM Powered Autonomous Agents"
category: papers
tags: [Agent, 自主智能体, 工具使用, 规划推理]
authors: "Lilian Weng, 2023"
paper_id: 120
permalink: /papers/2026-06-27-120
---
## 一句话概括

Lilian Weng的经典博文综述了LLM驱动的自主智能体系统，提出规划、记忆、工具使用三大核心组件的理论框架。


## 核心思想

LLM Agent是以大语言模型为大脑的自主智能体系统，其核心架构包含三大组件：(1)规划(Planning)——将复杂任务分解为子任务(如CoT、ToT)，并通过自我反思和纠错进行迭代改进(如Reflexion)；(2)记忆(Memory)——短期记忆(上下文窗口)和长期记忆(外部向量数据库)；(3)工具使用(Tool Use)——调用API、搜索引擎、代码执行器等外部工具扩展LLM的能力边界。


## 关键创新

建立了理解LLM Agent的统一框架。关键系统包括：(1)ReAct——交替进行推理(Reasoning)和行动(Acting)的范式；(2)AutoGPT/BabyAGI——早期的自主任务执行Agent；(3)Toolformer/Gorilla——教LLM学会调用工具；(4)Generative Agents——在虚拟环境中模拟人类社会行为。综述将这些零散工作整合为连贯的理论体系。


## 深远影响

这篇综述为整个LLM Agent领域提供了思维框架，深刻影响了后续的Agent研究和产品设计。从OpenAI的GPTs、Anthropic的Computer Use，到开源的AutoGen、LangGraph，几乎所有Agent系统都遵循了规划-记忆-工具的三元架构。Agent被认为是LLM走向实际应用的关键形态。


## 启发与思考

当前LLM Agent的核心瓶颈在于长程规划的可靠性——在多步任务中错误会累积放大。未来的突破可能来自更好的规划算法(如蒙特卡洛树搜索)、更可靠的自我纠错机制、以及多Agent协作系统。Agent代表了从AI作为工具到AI作为同事的范式转变。
