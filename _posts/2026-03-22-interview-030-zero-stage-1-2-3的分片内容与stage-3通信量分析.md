---
layout: post
title: "Interview: ZeRO Stage 1/2/3的分片内容与Stage 3通信量分析"
category: interviews
tags: [ZeRO, DeepSpeed, 显存优化, 分布式训练]
difficulty: "高级"
question_id: 30
permalink: /interviews/2026-03-22-030
---

## 题目解析

ZeRO是DeepSpeed的核心技术，通过渐进式分片消除数据并行中的内存冗余。精确理解各Stage的分片内容和通信代价是大模型训练调优的必备知识。


## 解答思路

Stage 1分片优化器状态(如Adam的m和v)，每张卡只存1/N的优化器状态，显存从12M减至4M+8M/N(混合精度下M为fp16参数量)。Stage 2在此基础上分片梯度，显存进一步降至2M+10M/N。Stage 3连模型参数也分片，每张卡只存1/N的参数，显存降至14M/N。Stage 1/2的通信量与标准数据并行相同(2M)，Stage 3额外需要在前向和反向时AllGather参数，通信量增加到约3M(多了约50%)。


## 关键要点

1. Stage 1几乎无额外通信开销，是最常用的选择；2. Stage 2需要在反向传播时做Reduce-Scatter替代AllReduce；3. Stage 3前向和反向各需要一次AllGather收集完整参数；4. Stage 3的通信量约为标准数据并行的1.5倍。


## 加分回答

ZeRO-Offload和ZeRO-Infinity进一步将状态卸载到CPU/NVMe。实际使用中，Stage 3配合Gradient Checkpointing可以在有限显存下训练超大模型，但需要仔细调整prefetch和partition策略来隐藏通信延迟。


## 常见踩坑

最常见的误解是认为Stage越高一定越好——Stage 3虽然省显存但通信量增加且实现复杂度高，如果显存够用，Stage 1+2往往是更好的选择。
