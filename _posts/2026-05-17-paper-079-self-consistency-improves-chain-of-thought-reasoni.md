---
layout: post
title: "Paper: Self-Consistency Improves Chain of Thought Reasoning in Language Models"
category: papers
tags: [推理, 自一致性, 采样策略, 思维链]
authors: "Wang et al., 2022"
paper_id: 79
permalink: /papers/2026-05-17-079
arxiv: '2203.11171'
---
## 一句话概括

Self-Consistency通过对同一问题采样多条推理路径，然后对最终答案进行多数投票，显著提升了CoT推理的准确性和鲁棒性。


## 核心思想

CoT的一个问题是单次生成可能走错推理路径。Self-Consistency的核心直觉是：正确答案更可能从不同的推理路径中被反复得出。方法很简单：用较高温度多次采样生成不同的推理链，提取每条链的最终答案，通过多数投票选择最一致的答案。不同的推理路径可能犯不同的错误，但正确答案会趋于一致。


## 关键创新

1) 用采样多样性替代贪婪解码的单一性；2) 多数投票机制简单有效；3) 不需要额外训练或标注；4) 与CoT正交互补，可以直接叠加使用；5) 在多个数学和推理基准上带来显著提升。


## 深远影响

Self-Consistency开创了"通过多次采样提升推理质量"的思路，后续的Best-of-N采样、过程奖励模型等方法都延续了这一理念。它也是test-time compute scaling的早期实践。


## 启发与思考

这种方法体现了"集体智慧"的思想——多个独立的推理者比单个推理者更可靠。它提示我们，在推理时投入更多计算资源（生成更多样本）是提升性能的有效途径。
