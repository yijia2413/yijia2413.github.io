---
layout: post
title: "Interview: Transformer的计算瓶颈在Attention还是FFN？训练和推理时有什么不同？"
category: interviews
tags: [计算瓶颈, Attention, FFN, 性能分析]
difficulty: "中级"
question_id: 14
permalink: /interviews/2026-03-06-014
---

## 题目解析

这道题考察候选人对Transformer计算特性的系统理解。很多人想当然地认为Attention是瓶颈（因为O(n²)复杂度），但实际情况取决于序列长度、模型大小和运行阶段。面试官想看你能否做出精确的定量分析。


## 解答思路

FLOPs分析：对于隐藏维度d、序列长度n，每层的Attention计算量约为4nd²（QKV投影和输出投影）+2n²d（注意力矩阵计算），FFN计算量约为8nd²（SwiGLU时更多）。当n<4d时（如d=4096，n<16384），FFN的FLOPs大于Attention；当n>4d时，Attention的O(n²d)项开始主导。这意味着在常见的短-中等长度序列下，FFN才是计算瓶颈。


## 关键要点

训练vs推理的关键差异：训练时全序列并行计算，Attention和FFN都是矩阵乘法，计算密集型（compute-bound）。推理decode阶段每次只处理一个token，batch维度很小，矩阵乘法退化为矩阵-向量乘法，变成访存密集型（memory-bound），瓶颈转移到模型权重的加载速度和KV Cache的读写。推理时Attention的瓶颈不在计算而在KV Cache的显存访问。


## 加分回答

可以引入算术强度（Arithmetic Intensity）的概念：计算量/访存量。训练时矩阵乘法的算术强度高，GPU计算单元是瓶颈。推理decode时算术强度低，HBM带宽是瓶颈。这也是为什么推理优化的重点是减少访存（如量化、GQA减少KV Cache）而非减少计算。还可以讨论长上下文场景下Attention的n²项如何成为训练的瓶颈。


## 常见踩坑

最大的坑是不区分训练和推理，笼统地说Attention是瓶颈。另一个错误是只看FLOPs不看访存，在推理场景下即使FFN的FLOPs更多，但由于是简单的矩阵-向量乘法且权重需要从HBM加载，FFN的时间开销可能与Attention相当。也有人忽略了batch size对算术强度的影响。
