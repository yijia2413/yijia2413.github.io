---
layout: post
title: 'Interview: 投机解码(Speculative Decoding)的正确性是如何数学保证的？什么时候效果最好？'
category: interviews
tags: [投机解码, 推理加速, 自回归, 拒绝采样, Draft模型]
difficulty: "高级"
question_id: 54
permalink: /interviews/2026-04-13-054
---

## 题目解析

投机解码是一种无损加速自回归生成的技术。核心思想是用一个小的draft模型快速生成k个候选token，然后用大的target模型并行验证。关键问题是：为什么这种方法能保证最终输出分布与直接用target模型生成完全一致？


## 解答思路

数学保证来自修改后的拒绝采样(modified rejection sampling)。设draft模型分布为q(x)，target模型分布为p(x)。对每个候选token x：以min(1, p(x)/q(x))的概率接受。若接受，输出x；若拒绝，从修正分布norm(max(0, p(x)-q(x)))中重新采样。可以证明：接受的概率恰好等于p(x)中被q(x)"覆盖"的部分，拒绝后重采样的概率恰好是p(x)中"超出"q(x)的部分，两者之和就是p(x)。因此最终分布严格等于p(x)。


## 关键要点

1. 效果最好的条件：draft模型与target模型分布越接近，接受率越高，加速比越大
2. 典型加速比2-3x，取决于接受率α，理论加速比为(1-α^(k+1))/(1-α)
3. draft模型的选择至关重要：同系列小模型、量化模型、或者用target模型的浅层子网络
4. 对于高温度(high temperature)采样效果更好，因为分布更平坦，接受率更高
5. greedy解码时退化为简单的token匹配验证


## 加分回答

可以讨论Medusa方法如何通过多个prediction head替代独立的draft模型，避免了额外模型的内存开销。还可以分析Eagle方法通过特征级别的draft（而非token级别）实现更高接受率。以及在batch场景下，投机解码的收益会降低，因为验证步骤增加了计算量但batch推理本身已经是计算受限的。


## 常见踩坑

1. 误以为投机解码是近似方法——它是数学上严格无损的
2. 忽略了draft模型本身也需要显存和计算，实际加速比低于理论值
3. 在batch size较大时使用投机解码反而可能降低吞吐量
