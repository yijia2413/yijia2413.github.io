---
layout: post
title: "Paper: AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
category: papers
tags: [多Agent, 对话框架, 可定制, 工具集成]
authors: "Wu et al., 2023"
paper_id: 93
permalink: /papers/2026-05-31-093
arxiv: '2308.08155'
---
## 一句话概括

微软的AutoGen提供了一个通用的多Agent对话框架，让开发者可以灵活定义Agent角色和对话模式，快速构建各种基于LLM的多Agent应用。


## 核心思想

AutoGen的核心抽象是ConversableAgent——可以发送和接收消息、执行代码、调用工具的通用Agent。开发者可以自定义Agent的角色、能力和行为规则，然后定义Agent之间的对话拓扑（两人对话、群聊、层级结构等）。框架内置了人类参与机制，允许人在任意环节介入。一个关键设计是Agent可以自动执行代码并将结果反馈到对话中。


## 关键创新

1) 高度灵活的Agent定义和对话编排机制；2) 统一的ConversableAgent抽象简化了开发；3) 内置代码执行、工具调用和人类参与支持；4) 支持多种对话模式（双Agent、群聊、嵌套对话）；5) 丰富的应用案例展示了框架的通用性。


## 深远影响

AutoGen迅速成为最流行的多Agent开发框架之一，降低了构建多Agent应用的门槛。它推动了多Agent系统从研究概念走向工程实践。


## 启发与思考

AutoGen的成功在于找到了正确的抽象层次——足够通用以覆盖各种场景，又足够具体以降低开发难度。好的框架设计可以加速整个领域的发展，就像深度学习框架加速了模型研究一样。
