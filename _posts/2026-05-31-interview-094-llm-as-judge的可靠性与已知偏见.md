---
layout: post
title: 'Interview: LLM-as-Judge的可靠性与已知偏见'
category: interviews
tags: [LLM-as-Judge, 评估, 偏见, 可靠性]
difficulty: "中级"
question_id: 94
permalink: /interviews/2026-05-31-094
---

## 题目解析

用LLM代替人类做评估(打分、排序、判断质量)已成为主流做法，但其可靠性和bias问题不容忽视。此题考察你对这一范式的批判性思考。


## 解答思路

LLM-as-Judge的已知偏见包括：(1)位置偏见(Position Bias)——在比较两个回答时，模型倾向于偏好第一个或最后一个出现的回答；(2)冗长偏见(Verbosity Bias)——更长的回答倾向于获得更高分数，即使内容质量相当；(3)自我偏好(Self-Enhancement Bias)——模型倾向于给与自己风格相似的回答更高分；(4)权威偏见——包含"研究表明""专家认为"等措辞的回答获得更高评价。


## 关键要点

提升可靠性的方法：(1)交换位置法——将两个回答的位置互换后各评一次，取一致结果；(2)多模型交叉评估——用不同模型做Judge取平均；(3)结构化评分rubric——提供详细的评分标准减少主观性；(4)校准(Calibration)——用人工标注的锚定样本校准模型评分。研究表明GPT-4作为Judge与人类标注者的一致性约为80%，接近人类标注者之间的一致性。


## 加分回答

可以引用Zheng et al.的Chatbot Arena和MT-Bench工作，说明如何通过Elo评分系统和精心设计的评估prompt来提升LLM Judge的质量。还可以讨论"evaluator agreement"指标的重要性，以及用小模型微调专门的Judge模型(如Prometheus)的方案。


## 常见踩坑

最大的陷阱是盲目信任LLM的评分——尤其在评估创造性、文化敏感性等主观维度时。另一个错误是用同一个模型既生成又评估——这会放大self-enhancement bias。还有人忽略了评估prompt本身的设计对结果的巨大影响。
