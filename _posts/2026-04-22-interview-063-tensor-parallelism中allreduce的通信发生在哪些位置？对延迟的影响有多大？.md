---
layout: post
title: 'Interview: Tensor Parallelism中AllReduce的通信发生在哪些位置？对延迟的影响有多大？'
category: interviews
tags: [Tensor Parallelism, AllReduce, 分布式推理, 通信开销, 模型并行]
difficulty: "高级"
question_id: 63
permalink: /interviews/2026-04-22-063
---

## 题目解析

Tensor Parallelism(TP)将每一层的参数沿特定维度切分到多个GPU上并行计算。切分后的部分结果需要通过AllReduce通信同步。理解AllReduce发生的确切位置和频率是评估TP通信开销的关键——这直接决定了TP是否值得在特定硬件拓扑下使用。


## 解答思路

在Transformer层中，TP的AllReduce发生在：1）自注意力层的输出投影(O projection)之后——因为注意力头被分到不同GPU，输出需要合并；2）MLP的第二个线性层(down projection)之后——因为中间激活被列切分，需要行聚合。因此每个Transformer层需要2次AllReduce。对于N层模型使用T路TP，总共需要2N次AllReduce。每次AllReduce通信量=2×(T-1)/T × hidden_size × batch_size × seq_len × sizeof(dtype)。


## 关键要点

1. AllReduce在NVLink互联下延迟约10-50μs，PCIe下约100-500μs
2. decode阶段每个token都要做2N次AllReduce，对小batch延迟影响显著
3. NVLink带宽900GB/s vs PCIe 5.0 64GB/s，因此TP强烈依赖NVLink
4. TP度数通常不超过8（一台机器的GPU数），跨机TP因网络延迟太大通常不可行


## 加分回答

可以讨论Sequence Parallelism(SP)如何与TP配合减少冗余计算：LayerNorm和Dropout在TP中被冗余地在所有GPU上执行，SP将这些操作也并行化，但引入额外的AllGather和ReduceScatter通信。还可以分析为什么DeepSeek-V2使用MLA后TP通信量大幅减少——因为KV维度被压缩，head级别的并行更高效。


## 常见踩坑

1. 忽略AllReduce是同步操作——任何GPU慢都会拖慢整体
2. 认为TP总是越多越好——通信开销随TP度数增加而增大，存在最优值
3. 没有区分AllReduce和AllGather的开销差异
