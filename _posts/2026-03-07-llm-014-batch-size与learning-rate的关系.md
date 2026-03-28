---
layout: post
title: "Batch Size与Learning Rate的关系"
category: llm
tags: [batch size, learning rate, 训练策略, scaling rule]
topic_id: 14
permalink: /llm/2026-03-07-014
---

## 一句话总结

Batch Size和Learning Rate存在密切的协同关系：增大Batch Size通常需要相应增大Learning Rate，两者的匹配关系直接影响训练效率和最终性能。


## 核心概念

小Batch Size的梯度估计噪声大，起到隐式正则化作用，但训练慢；大Batch Size的梯度估计更准确，GPU利用率更高，但可能陷入尖锐极小值(sharp minima)泛化差。经典的线性缩放规则(Linear Scaling Rule)：Batch Size扩大k倍时，Learning Rate也扩大k倍，保持单步更新的期望幅度不变。但这只在一定范围内有效。更精确的是平方根缩放：LR扩大√k倍。Warmup在大Batch训练中至关重要——训练初期用较小的LR逐步增大，防止初始阶段大梯度导致的训练不稳定。


## 为什么重要

LLM预训练动辄使用数百甚至数千张GPU，大Batch Size(百万级Token)几乎不可避免。如果LR与Batch Size不匹配：LR过小浪费算力(梯度准确但步幅太小)，LR过大训练发散或收敛到差的解。正确的缩放策略是大规模训练的基础。


## 实践要点

梯度累积(Gradient Accumulation)可在有限GPU显存下模拟大Batch；LLM训练中典型配置：Batch Size 2-4M Token，Peak LR 1e-4到3e-4；LR Schedule通常采用Cosine衰减配合Warmup；Critical Batch Size概念指出存在一个最优Batch Size使得计算效率最大化。


## 常见误区

误区一：Batch Size越大训练一定越快——超过Critical Batch Size后，增加Batch Size的边际效率递减。误区二：线性缩放规则总是适用——非常大的Batch Size下线性缩放会导致LR过大训练发散。误区三：Batch Size只影响训练速度不影响性能——大Batch可能导致泛化性下降，需要额外的正则化手段。
