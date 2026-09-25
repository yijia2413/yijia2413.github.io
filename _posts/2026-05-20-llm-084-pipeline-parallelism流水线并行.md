---
layout: post
title: "Pipeline Parallelism流水线并行"
category: llm
tags: [流水线并行, pipeline, 层间并行, micro-batch]
topic_id: 84
permalink: /llm/2026-05-20-084
---

## 一句话总结

流水线并行将模型的不同层分配到不同设备上，通过micro-batch流水线化执行减少设备空闲时间。


## 核心概念

模型的连续层被划分为多个stage，每个stage放在一个设备上。Naive Pipeline存在严重的bubble问题（设备空闲等待）。GPipe将mini-batch拆分为多个micro-batch流水线执行，减少bubble比例。1F1B（One Forward One Backward）调度进一步优化内存使用。Interleaved Pipeline将非连续的层组分配给同一设备，减少bubble但增加通信。


## 为什么重要

流水线并行通信量远小于张量并行（只需点对点传输激活值），适合跨节点部署。与张量并行互补，大规模训练中通常节点内用张量并行、节点间用流水线并行。


## 实践要点

合理划分stage使各设备负载均衡。增加micro-batch数量减少bubble比例但增加内存。Embedding层和输出层的负载较重需特殊处理。推理场景流水线并行不如张量并行常用，因为单请求无法流水线化。训练中结合DP+TP+PP实现3D并行。


## 常见误区

误以为流水线并行完全消除了bubble，实际只是减少了比例。忽视层间负载不均导致的效率损失。在推理单请求场景使用流水线并行无法降低延迟。
