---
layout: post
title: "Interview: KV Cache在推理时如何工作？它的显存占用公式是什么？什么因素影响最大？"
category: interviews
tags: [KV Cache, 推理优化, 显存占用, 自回归生成]
difficulty: "中级"
question_id: 10
permalink: /interviews/2026-03-02-010
---

## 题目解析

KV Cache是LLM推理的核心优化技术，也是理解推理性能的基础。这道题考察候选人是否真正理解自回归生成的计算过程，以及KV Cache如何将推理复杂度从O(n²)降到O(n)。同时考察对显存管理的定量分析能力。


## 解答思路

自回归生成时，每步只生成一个新token。不使用KV Cache时，每步需要用所有历史token重新计算Attention，第t步的计算量为O(t·d)。KV Cache将前t-1步的K和V向量缓存在显存中，第t步只需计算新token的Q、K、V，新K和V追加到缓存，Q与完整的KV Cache做Attention。这将每步的注意力计算从O(t·d)降到O(d)级别（忽略与缓存的点积）。


## 关键要点

KV Cache显存公式：2 × num_layers × num_kv_heads × head_dim × seq_len × batch_size × dtype_bytes。以LLaMA-2 70B为例：2×80×8×128×4096×1×2(BF16) ≈ 10.7GB。影响最大的因素：(1)序列长度——线性增长，长上下文场景下KV Cache可能超过模型参数本身；(2)batch size——线性增长，限制了推理并发；(3)模型层数和KV头数——架构决定。


## 加分回答

讨论KV Cache的优化策略：PagedAttention（vLLM）通过虚拟内存管理减少碎片；量化KV Cache（如INT8/INT4）减少显存；滑动窗口KV Cache只保留最近的窗口；Token pruning/eviction策略动态管理缓存。还可以分析prefill和decode两个阶段的不同特性：prefill是compute-bound，decode是memory-bound。


## 常见踩坑

常见错误是忘记乘以2（K和V各一份）或忘记乘以层数。另一个坑是不理解prefill和decode阶段的区别——prefill阶段一次性处理所有输入token并填充KV Cache，decode阶段每步追加一个KV对。有人误以为KV Cache存储了Attention权重，实际上存储的是K和V的隐藏向量。
