---
layout: post
title: "Interview: MoE架构的Router负载均衡为什么是一个难题？DeepSeek-V2是怎么解决的？"
category: interviews
tags: [MoE, 负载均衡, 路由策略, DeepSeek]
difficulty: "高级"
question_id: 11
permalink: /interviews/2026-03-03-011
---

## 题目解析

MoE（Mixture of Experts）通过稀疏激活实现了参数量和计算量的解耦，是扩展模型规模的重要方向。但Router的负载均衡是MoE训练和部署中最棘手的问题之一。这道题考察候选人对MoE实际工程挑战的理解，以及对前沿工作的跟踪。


## 解答思路

负载不均衡的根源：Router倾向于将更多token路由给已经训练得更好的expert（马太效应），导致部分expert被过度使用而其余expert欠训练。这造成两个问题：(1)训练时——计算负载不均，并行效率下降，通信瓶颈；(2)推理时——热门expert成为瓶颈，all-to-all通信不均匀。传统方案如Switch Transformer的辅助loss强制均衡，但这引入了额外的超参数且可能损害路由质量。


## 关键要点

DeepSeek-V2的创新方案：引入共享expert和细粒度expert的组合设计。使用更多但更小的expert（如160个细粒度expert，每次激活6个），配合负载均衡loss的改进。关键贡献包括：(1)Device-level负载均衡而非expert-level，允许expert间适度不均衡；(2)引入expert-level辅助loss和device-level辅助loss的分层设计，在均衡性和路由质量间取得更好的平衡。


## 加分回答

可以对比讨论不同的路由策略：Top-k路由（GShard/Switch Transformer）、Expert Choice路由（让expert选择token而非token选择expert，保证严格均衡）、Hash路由（确定性分配）。还可以提到MoE的通信开销：在多机部署时，all-to-all通信与负载均衡直接相关，不均衡意味着部分设备空等。


## 常见踩坑

常见错误是认为负载均衡只是加一个loss就行——实际上辅助loss的权重设置非常敏感，过大损害路由质量，过小无法保证均衡。另一个误区是不区分训练和推理时的负载均衡问题，两者的约束条件和优化目标不同。也有人忽略expert并行的通信开销，这在实际部署中往往是最大的瓶颈。
