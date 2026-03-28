---
layout: post
title: "Paper: FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
category: papers
tags: [FlashAttention, IO感知, 高效注意力, GPU优化]
authors: "Dao et al., 2022"
paper_id: 17
permalink: /papers/2026-03-10-017
arxiv: '2205.14135'
---

> **Authors**: Dao et al., 2022



> **arxiv**: [2205.14135](https://arxiv.org/abs/2205.14135)



---



## 一句话概括

FlashAttention通过IO感知的分块计算策略，在不引入任何近似的情况下将注意力计算速度提升2-4倍，内存使用从二次方降至线性。


## 核心思想

传统注意力实现需要将完整的N×N注意力得分矩阵从GPU快速SRAM计算后写入慢速HBM显存再读回，造成巨大的内存访问（IO）开销。FlashAttention利用分块（tiling）策略，将Q、K、V矩阵分块加载到SRAM中完成局部注意力计算，通过在线softmax技巧逐块累积结果，完全避免了在HBM中存储完整注意力矩阵。IO复杂度从O(N²)降至O(N²d/M)，其中d为头维度，M为SRAM大小。


## 关键创新

IO感知的算法设计思想，充分利用GPU的SRAM-HBM内存层次结构；在线softmax技巧巧妙实现了精确注意力的分块流式计算；无需任何近似就能获得显著的实际加速；使得训练更长上下文序列成为可能。


## 深远影响

迅速成为现代大模型训练和推理的标配基础组件。后续FlashAttention-2和FlashAttention-3持续优化实现了更高的硬件利用率。使得32K、128K甚至更长上下文的训练变得切实可行。深刻影响了所有主流深度学习框架中注意力算子的底层实现。


## 启发与思考

算法优化不能只关注计算复杂度——IO数据搬运才是GPU上的实际瓶颈。深入理解硬件内存层次特性是设计高效算法的必要前提。FlashAttention生动告诉我们：理论计算最优和实际运行最优可能截然不同，找到真实瓶颈并针对性优化才是关键。
