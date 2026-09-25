---
layout: post
title: "Prompt Engineering进阶技巧"
category: llm
tags: [prompt engineering, 提示工程, few-shot, 系统提示]
topic_id: 104
permalink: /llm/2026-06-09-104
---

## 一句话总结

进阶Prompt Engineering通过结构化指令、角色设定、示例引导等策略，最大化提取LLM的能力并获得稳定高质量输出。


## 核心概念

进阶技巧包括：结构化输出控制（JSON模式、XML标签约束）、元提示（让LLM优化自己的prompt）、自洽性采样（多次生成取多数票）、提示链（将复杂任务拆分为多个prompt串联）。系统提示设计原则：明确角色、给出约束、提供示例、指定输出格式。动态prompt技术根据输入特征自适应调整提示策略。


## 为什么重要

同一模型在不同prompt下性能差异可达30%以上。掌握进阶技巧能在不改变模型的情况下大幅提升效果，是最低成本的优化方式。


## 实践要点

使用分隔符清晰区分指令和内容。给出正反示例帮助模型理解边界。利用XML标签结构化长prompt。测试prompt在不同输入上的鲁棒性。建立prompt版本管理和效果追踪体系。


## 常见误区

prompt越长越好，实际上冗余信息会降低效果。一味依赖prompt技巧而忽视任务本身的简化。不做系统性测试，凭直觉判断prompt优劣。忽视不同模型对prompt风格的偏好差异。
