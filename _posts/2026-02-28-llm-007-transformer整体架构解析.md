---
layout: post
title: "Transformer整体架构解析"
category: llm
tags: [transformer, 架构, encoder-decoder, FFN]
topic_id: 7
permalink: /llm/2026-02-28-007
---

## 一句话总结

Transformer由交替堆叠的多头注意力层和前馈网络层组成，配合残差连接与LayerNorm，形成了现代LLM的基础架构。


## 核心概念

标准Transformer Block包含两个子层：(1)Multi-Head Attention——捕获Token间的依赖关系；(2)FFN(Feed-Forward Network)——通常为两层MLP，先升维(4d)再降维(d)，对每个位置独立地进行非线性变换。每个子层都包裹着残差连接和LayerNorm。多个Block堆叠形成深层网络：GPT-3有96层，LLaMA-70B有80层。现代变体中，FFN常用SwiGLU替代ReLU激活，维度设为8d/3而非4d。整体流程：输入Token→Embedding+位置编码→N个Transformer Block→输出层(线性+Softmax)→预测下一个Token的概率分布。


## 为什么重要

Transformer统一了NLP领域的架构选择，其成功源于：(1)全局注意力捕获任意距离的依赖；(2)FFN提供逐位置的非线性变换能力，被认为是知识存储的主要载体；(3)残差连接确保深层网络的梯度流动；(4)高度可并行化，充分利用GPU算力。


## 实践要点

模型规模由层数L、隐藏维度d、头数h三个核心参数决定；FFN参数量约占总参数的2/3；Pre-Norm(先Norm再Attention)比Post-Norm训练更稳定，现代LLM普遍采用；推理时每个Block的计算完全串行，是延迟的主要来源。


## 常见误区

误区一：Transformer只有Attention——FFN同样关键，研究表明FFN存储了大量事实知识。误区二：层数越多越好——过深的网络可能出现训练不稳定，需要配合合适的初始化和Norm策略。误区三：所有Transformer架构都一样——GPT(Decoder-only)、BERT(Encoder-only)、T5(Encoder-Decoder)架构差异显著。
