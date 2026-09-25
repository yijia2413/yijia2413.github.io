---
layout: post
title: "Paper: CAMEL: Communicative Agents for Mind Exploration of Large Language Model Society"
category: papers
tags: [多Agent, 角色扮演, 协作对话, 社会模拟]
authors: "Li et al., 2023"
paper_id: 83
permalink: /papers/2026-05-21-083
arxiv: '2303.17760'
---
## 一句话概括

CAMEL提出了一种角色扮演框架，让两个LLM Agent通过自主对话协作完成复杂任务，探索了多Agent通信与协作的可能性。


## 核心思想

CAMEL框架中，一个Agent扮演"用户"，另一个扮演"助手"，通过inception prompting给定任务描述和角色设定后，两个Agent完全自主地进行多轮对话来协作完成任务。AI User负责分解任务和提出具体指令，AI Assistant负责执行并反馈结果。这种设计避免了人类持续参与的需要。


## 关键创新

1) 提出了role-playing多Agent协作框架；2) Inception prompting技术确保Agent保持角色一致性；3) 生成了大规模的Agent对话数据集用于研究；4) 系统分析了多Agent对话中的行为模式和失败模式。


## 深远影响

CAMEL是最早系统研究LLM多Agent协作的工作之一，其角色扮演框架被广泛采用。它开源的框架和数据推动了多Agent系统的研究发展。


## 启发与思考

CAMEL揭示了一个有趣的可能性：AI之间的对话可能产生比单个AI更好的结果。但也暴露了挑战——Agent可能陷入虚假共识或角色偏离。如何设计更稳健的多Agent通信协议仍是开放问题。
