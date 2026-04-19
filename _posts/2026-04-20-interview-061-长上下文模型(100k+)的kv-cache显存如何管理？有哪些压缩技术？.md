---
layout: post
title: 'Interview: 长上下文模型(100K+)的KV Cache显存如何管理？有哪些压缩技术？'
category: interviews
tags: [KV Cache, 长上下文, 显存优化, 注意力压缩, MQA/GQA]
difficulty: "高级"
question_id: 61
permalink: /interviews/2026-04-20-061
---

## 题目解析

以Llama-3 70B为例，128K上下文的KV Cache在FP16下需要：80层×2(K和V)×128K×128(head_dim)×8(kv_heads_per_layer)×2字节≈40GB。这几乎等于模型参数本身的大小，严重限制了并发能力。如何压缩和管理这些KV Cache是长上下文推理的核心问题。


## 解答思路

主要压缩技术：1）GQA/MQA——从架构层面减少KV head数量，GQA将KV heads减少到query heads的1/8，直接减少KV Cache 8倍；2）KV Cache量化——将KV从FP16量化到INT8/INT4，MiniCache等方法报告INT4量化精度损失可接受；3）Token级别压缩——H2O(Heavy Hitter Oracle)只保留注意力分数最高的token的KV，丢弃不重要的token；4）层级别共享——相邻层共享KV Cache(如CLA)。


## 关键要点

1. GQA是最主流方案，Llama-2/3, Mistral等新模型都采用GQA替代MHA
2. Streaming LLM发现：保留前几个token(attention sink)和最近的滑动窗口就能维持基本连贯性
3. KV Cache量化比权重量化更难——激活值分布随输入变化，且K和V的量化敏感度不同
4. 多级存储方案：热数据在GPU显存，冷数据offload到CPU内存或SSD


## 加分回答

可以讨论最前沿的方法：1）SnapKV通过观察注意力模式自动选择每层保留哪些KV位置，压缩比可达10倍以上；2）Cross-layer KV sharing利用了相邻层KV相似度高的特性；3）Paged KV Cache + offloading结合NVMe SSD实现百万级上下文。还可以分析为什么MLA(Multi-head Latent Attention，DeepSeek-V2提出)可以将KV Cache压缩到极致。


## 常见踩坑

1. 只关注显存占用忽略了长上下文的attention计算是O(n²)的
2. 认为所有token同等重要——实际上attention分布高度稀疏
3. 忽略了KV Cache的读取带宽也是瓶颈，压缩同时降低了带宽需求
