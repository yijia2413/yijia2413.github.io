---
layout: post
title: "Paper: A Survey on Mixture of Experts"
category: papers
tags: [MoE, 稀疏激活, 条件计算, 综述]
authors: "Cai et al., 2024"
paper_id: 101
permalink: /papers/2026-06-08-101
arxiv: '2407.06204'
---
## 一句话概括

全面综述混合专家(MoE)架构的发展历程、核心设计和在大语言模型中的广泛应用。


## 核心思想

MoE通过门控网络将输入动态路由到不同的专家子网络，实现条件计算——每次推理只激活部分参数，从而在大幅扩展模型容量的同时保持计算成本可控。综述梳理了从Shazeer早期工作到Switch Transformer、GShard再到Mixtral等现代MoE模型的完整演进脉络。


## 关键创新

系统总结了MoE的三大核心设计维度：(1)门控策略——Top-K路由、Expert Choice路由、软路由等；(2)负载均衡——辅助损失、容量因子等防止专家坍缩的机制；(3)架构集成——将MoE嵌入Transformer的FFN层，以及细粒度专家、共享专家等变体。


## 深远影响

MoE已成为训练超大规模语言模型的主流范式。Mixtral 8x7B证明稀疏MoE可在推理成本与7B模型相当的情况下达到接近70B稠密模型的性能，DeepSeek-V2/V3进一步推动了MoE的工程落地。


## 启发与思考

MoE体现了大而稀疏优于小而稠密的思路。未来的挑战在于专家的可解释性、更高效的路由策略、以及如何在推理阶段降低MoE的内存开销。MoE与模型压缩技术的结合也是值得探索的方向。
