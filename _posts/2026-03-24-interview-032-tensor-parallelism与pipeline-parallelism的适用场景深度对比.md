---
layout: post
title: "Interview: Tensor Parallelism与Pipeline Parallelism的适用场景深度对比"
category: interviews
tags: [模型并行, 张量并行, 流水线并行, Megatron-LM]
difficulty: "高级"
question_id: 32
permalink: /interviews/2026-03-24-032
---

## 题目解析

当单卡放不下一个模型时，模型并行是必须的选择。Tensor Parallelism(TP)和Pipeline Parallelism(PP)各有优劣，如何组合使用是大规模训练架构设计的关键决策。


## 解答思路

TP将单层的矩阵运算切分到多张卡上，每层需要2次AllReduce通信(前向+反向各一次)，延迟敏感但通信量小。PP将不同层分配到不同卡上，层间只需点对点通信，通信量等于激活值大小。TP适合节点内(NVLink高带宽低延迟)，PP适合节点间(带宽低但只需点对点)。典型配置如Megatron-LM：节点内8卡做TP，节点间做PP。


## 关键要点

1. TP的通信频率高(每层2次)但单次通信量小，对带宽和延迟都敏感；2. PP的通信频率低但存在流水线气泡(bubble)，降低GPU利用率；3. PP的bubble比例约为(PP_size-1)/(micro_batch_num)，可通过增加micro batch缓解；4. TP的并行度通常不超过8(受限于NVLink拓扑)。


## 加分回答

Sequence Parallelism是TP的扩展，将LayerNorm和Dropout等非张量并行操作的激活也切分，进一步减少显存。Interleaved 1F1B Schedule可以有效减少PP的bubble。实际大规模训练通常是3D并行：TP+PP+DP(ZeRO)的组合。


## 常见踩坑

最大误区是在节点间做TP——跨节点的高频AllReduce通信会成为严重瓶颈。另一个坑是PP的层分配不均导致某些Stage成为瓶颈，需要根据每层的计算和通信量做精细分配。
