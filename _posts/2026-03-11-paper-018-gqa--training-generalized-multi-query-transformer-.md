---
layout: post
title: "Paper: GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints"
category: papers
tags: [GQA, 分组查询注意力, KV缓存, 推理优化]
authors: "Ainslie et al., 2023"
paper_id: 18
permalink: /papers/2026-03-11-018
arxiv: '2305.13245'
---

> **Authors**: Ainslie et al., 2023



> **arxiv**: [2305.13245](https://arxiv.org/abs/2305.13245)



---



## 一句话概括

分组查询注意力（GQA）在多头注意力和多查询注意力之间找到了最佳平衡点，以极小的性能代价换取显著的推理加速。


## 核心思想

标准多头注意力（MHA）为每个注意力头维护独立的Key和Value投影，KV缓存随头数线性增长，成为推理瓶颈。多查询注意力（MQA）让所有查询头共享同一份KV，虽然大幅减少缓存但过于激进可能损失模型性能。GQA将查询头分为若干组，每组内的查询头共享一份KV投影，在性能与效率之间找到优雅的平衡。论文还提出了从已有MHA模型通过少量额外训练（uptrain）高效转换为GQA模型的实用方法。


## 关键创新

分组共享KV的简洁直觉设计思想；从已训练好的MHA模型高效转换为GQA模型的uptrain方法；在几乎不损失模型性能的前提下大幅减少KV缓存占用；同时显著提升推理吞吐量并降低生成延迟。


## 深远影响

GQA被LLaMA-2、Mistral、Qwen等几乎所有主流开源大模型广泛采用，事实上成为了现代大模型注意力层的标准配置。在长上下文推理场景中，KV缓存的大幅节省尤为重要。深刻改变了注意力头设计的工程实践和行业标准。


## 启发与思考

工程实践中的最佳选择往往是两个极端方案之间的精心折中。推理效率在模型架构设计中应该与训练性能受到同等程度的重视。简单的分组共享策略就能带来巨大的实际收益，这再次说明好的设计不一定要很复杂。
