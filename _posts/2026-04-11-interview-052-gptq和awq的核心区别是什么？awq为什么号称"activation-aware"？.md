---
layout: post
title: 'Interview: GPTQ和AWQ的核心区别是什么？AWQ为什么号称"activation-aware"？'
category: interviews
tags: [GPTQ, AWQ, 权重量化, PTQ, 激活感知]
difficulty: "高级"
question_id: 52
permalink: /interviews/2026-04-11-052
---

## 题目解析

GPTQ和AWQ都是训练后权重量化方法，但设计哲学不同。GPTQ基于OBS(Optimal Brain Surgeon)框架，逐列量化并通过Hessian信息补偿误差。AWQ则基于一个关键观察：权重的重要性不是由权重本身的大小决定的，而是由对应的激活值大小决定的。


## 解答思路

GPTQ的核心流程：对每一列权重，计算量化误差，然后利用Hessian逆矩阵将误差分摊到尚未量化的列上。这是一种贪心的逐列最优策略。AWQ的核心洞察：只有约1%的"显著"权重通道对模型性能至关重要，而这些通道对应的激活值的magnitude特别大。AWQ对这些显著通道乘以一个大于1的缩放因子，使得量化的相对误差变小，然后在对应的下一层权重中除以该因子保持等价。所谓activation-aware就是用激活值的统计信息来指导哪些权重需要保护。


## 关键要点

1. GPTQ需要逐层校准，计算量较大但理论上更优；AWQ只需统计激活值的channel-wise均值，速度快得多
2. AWQ的缩放因子搜索是per-channel的，通过grid search在[0,1]区间找最优α
3. GPTQ量化顺序对结果有影响，通常需要做列重排序(column reordering)
4. AWQ在4-bit量化下通常比GPTQ精度更高，尤其在小模型上差异更明显


## 加分回答

可以分析两者的硬件友好性差异：AWQ生成的量化模型更适合GPU kernel优化，因为其缩放因子是per-channel的，而GPTQ的group quantization在反量化时需要更多的indexing操作。另外，AutoAWQ库相比AutoGPTQ在端到端推理速度上通常快15-25%，原因在于kernel实现差异。


## 常见踩坑

1. 误以为AWQ需要在推理时计算激活值——实际上激活统计只在校准阶段使用
2. 认为GPTQ一定需要大量校准数据——通常128条样本就足够
3. 忽略了两者都是weight-only量化，激活值仍然是FP16
