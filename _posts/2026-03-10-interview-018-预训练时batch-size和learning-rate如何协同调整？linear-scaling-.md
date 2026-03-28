---
layout: post
title: "Interview: 预训练时Batch Size和Learning Rate如何协同调整？Linear Scaling Rule的局限性是什么？"
category: interviews
tags: [训练策略, 批量大小, 学习率, Linear Scaling]
difficulty: "高级"
question_id: 18
permalink: /interviews/2026-03-10-018
---

## 题目解析

Batch Size和Learning Rate的协同调整是大规模预训练中最基础也最关键的问题。Linear Scaling Rule（学习率与batch size成正比）被广泛使用但有明显局限。这道题考察候选人对优化动态的深层理解以及大规模训练的实战经验。


## 解答思路

Linear Scaling Rule的基本逻辑：增大batch size k倍，学习率也增大k倍。直觉是大batch的梯度噪声更小（方差降低k倍），需要更大的步长来弥补更新次数的减少。数学依据来自SGD的随机分析：小batch的梯度估计有噪声，大batch的梯度更准确，可以沿更准确的方向走更大步。


## 关键要点

Linear Scaling的局限：(1)仅在训练初期（大学习率阶段）近似成立，训练后期梯度方向趋于一致时不再适用；(2)对Adam等自适应优化器效果不如SGD——Adam已经在每个参数维度上做了自适应缩放，全局学习率的线性缩放不完全合理；(3)存在最大有效batch size——超过某个阈值后，增大batch size的边际收益急剧下降。Warmup的必要性：大学习率+大batch在训练初期会导致不稳定，需要warmup让参数先移到损失曲面较平坦的区域。


## 加分回答

可以讨论McCandlish等人关于梯度噪声尺度（gradient noise scale）的工作，它定义了临界batch size——低于此值增大batch几乎线性提升效率，高于此值回报递减。对于LLM预训练，典型做法是使用逐步增大batch size的策略（如GPT-3从32K token逐步增大到3.2M token），同时配合cosine学习率衰减。还可以提到sqrt scaling rule作为替代方案。


## 常见踩坑

最大的坑是盲目应用Linear Scaling Rule到Adam优化器——实际上Adam需要更保守的学习率调整（有人用sqrt scaling而非linear scaling）。另一个错误是不理解warmup的必要性，或者不知道大batch训练的泛化性能可能不如小batch（batch size存在最优值，不是越大越好）。
