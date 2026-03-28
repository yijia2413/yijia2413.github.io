---
layout: post
title: "Paper: Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
category: papers
tags: [Mamba, SSM, 状态空间模型, 线性复杂度, 非Transformer]
authors: "Gu & Dao, 2023"
paper_id: 12
permalink: /papers/2026-03-05-012
arxiv: '2312.00752'
---

> **Authors**: Gu & Dao, 2023



> **arxiv**: [2312.00752](https://arxiv.org/abs/2312.00752)



---



## 一句话概括

Mamba通过引入选择性机制的状态空间模型实现了线性时间复杂度的序列建模，在保持与Transformer可比性能的同时大幅提升长序列处理效率。


## 核心思想

基于此前的结构化状态空间模型（S4），引入输入依赖的选择性机制，使模型参数（如状态转移矩阵）随输入内容动态变化，实现了内容感知的信息选择性过滤与记忆。通过精心设计的硬件感知并行扫描算法在GPU上高效实现递归计算。时间复杂度为线性O(N)，打破了Transformer的二次方O(N²)限制，且推理时内存占用恒定不变。


## 关键创新

选择性SSM机制让模型能根据输入内容动态调整状态转移行为；硬件感知的并行扫描算法实现了高效的GPU并行训练；线性时间复杂度彻底打破了Transformer的二次方序列长度瓶颈；推理时恒定内存占用不随序列增长。


## 深远影响

为Transformer架构的替代方案研究注入了强劲的新活力。有力证明了非注意力架构同样能实现强大的序列建模能力。启发了Jamba、Mamba-2、Zamba等后续工作，MoE与Mamba的混合架构也成为活跃的研究方向。


## 启发与思考

Transformer并非序列建模的唯一答案，架构的多样性探索仍有巨大价值。线性复杂度对于处理百万级超长序列场景至关重要。硬件和算法的深度协同设计是实现高效模型的关键——理论上的复杂度优势必须通过精心的工程实现才能转化为实际的速度提升。
