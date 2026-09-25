---
layout: post
title: "Chain-of-Thought推理"
category: llm
tags: [chain-of-thought, 推理, 思维链, CoT]
topic_id: 105
permalink: /llm/2026-06-10-105
---

## 一句话总结

Chain-of-Thought通过引导模型输出中间推理步骤，显著提升LLM在数学、逻辑、常识推理等复杂任务上的表现。


## 核心概念

CoT的核心思想是让模型"展示解题过程"而非直接给答案。变体包括：Zero-shot CoT（添加"让我们一步步思考"）、Few-shot CoT（给出带推理过程的示例）、Self-Consistency（多次CoT取一致性最高的答案）、Tree-of-Thought（探索多个推理分支）、Graph-of-Thought（非线性推理结构）。CoT有效的原因可能是将复杂推理分解为模型擅长的简单步骤。


## 为什么重要

CoT是解锁LLM推理能力的关键技术。在GSM8K等数学基准上，CoT可将准确率从基线的20%提升至80%以上。它也是o1等推理模型的核心思想基础。


## 实践要点

对简单任务不需要CoT，反而可能降低效率。推理链越详细效果越好，但会增加token开销。结合Self-Consistency可进一步提升可靠性。可以要求模型在推理后进行自我验证。


## 常见误区

认为CoT对所有任务都有效，实际在简单任务上可能适得其反。忽视CoT带来的延迟和成本增加。错误的推理链比没有推理链更危险，模型可能"自圆其说"得出错误结论。
