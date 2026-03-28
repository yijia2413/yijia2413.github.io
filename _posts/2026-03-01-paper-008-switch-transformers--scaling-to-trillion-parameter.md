---
layout: post
title: "Paper: Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
category: papers
tags: [MoE, 稀疏模型, 专家混合, 高效扩展]
authors: "Fedus et al., 2021"
paper_id: 8
permalink: /papers/2026-03-01-008
arxiv: '2101.03961'
---

> **Authors**: Fedus et al., 2021



> **arxiv**: [2101.03961](https://arxiv.org/abs/2101.03961)



---



## 一句话概括

Switch Transformer通过简化的单专家路由MoE机制，实现了万亿参数规模的稀疏模型训练，在保持计算量不变的情况下大幅提升模型容量。


## 核心思想

在Transformer的前馈网络（FFN）层引入多个并行的专家网络，每个输入token通过路由函数只被分配到一个专家处理（Switch路由），而非传统MoE的top-k多专家策略。这种设计极大简化了路由机制和通信开销。模型总参数量可以大幅增加到万亿级别，但由于每个token只激活一个专家，实际计算量保持不变，巧妙实现了参数量和计算量的解耦。


## 关键创新

简化为每token选择单一专家的Switch路由策略；引入辅助负载均衡损失确保各专家被均匀利用；混合精度训练策略有效解决了稀疏模型的训练不稳定问题；成功将模型扩展到1.6万亿参数规模。


## 深远影响

有力证明了MoE是扩展模型规模的高效可行途径，直接影响了后续Mixtral 8x7B、DeepSeek-V2等重要模型的架构设计。稀疏MoE思想已成为大模型在降低推理和训练成本方面的重要技术路线，改变了行业对模型规模扩展的思考方式。


## 启发与思考

并非所有参数都需要参与每次计算——稀疏激活是实现高效规模扩展的关键思路。参数量和计算量应该被解耦考虑和独立优化。有趣的是，简化的设计（top-1路由）反而比更复杂的top-k设计更稳定且更有效，这再次印证了奥卡姆剃刀原则。
