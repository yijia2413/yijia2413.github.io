---
layout: post
title: "Multi-Head Attention多头注意力"
category: llm
tags: [multi-head, 多头注意力, attention head, 子空间]
topic_id: 5
permalink: /llm/2026-02-26-005
---

## 一句话总结

Multi-Head Attention将Q、K、V分别拆分为多个'头'(head)，每个头独立进行Attention计算后拼接，让模型能同时关注不同子空间的不同类型信息。


## 核心概念

假设模型维度d=512，头数h=8，则每个头的维度d_k=d/h=64。实际操作是将QKV各自投影到h个d_k维子空间，并行执行h次Attention，然后将h个输出拼接(Concat)并通过一个线性层投影回d维。参数量与单头Attention相同(都是4×d×d，含输出投影)，但表达能力更强。不同的头可以学习到不同的注意力模式：有的头关注局部语法关系，有的关注长距离语义依赖，有的关注位置信息。


## 为什么重要

单个Attention头只能计算一种加权模式。语言理解需要同时捕获语法、语义、共指、因果等多种关系。多头机制提供了多个并行的'视角'，使模型的表示能力远超单头。同时，多头计算可以高度并行化，不增加额外计算步骤。


## 实践要点

头数通常设为64或128(大模型)。GQA(Grouped Query Attention)让多个Query头共享一组KV头，显著减少KV Cache大小，LLaMA-2 70B就采用了GQA。MQA(Multi-Query Attention)更激进，所有Query头共享同一组KV。可以通过注意力头剪枝(Head Pruning)去除冗余头来加速推理。


## 常见误区

误区一：头数越多越好——超过最优值后性能反而下降，每个头的维度过小会限制表示能力。误区二：每个头都有明确的语义分工——部分头可能学到冗余模式，这也是Head Pruning的理论基础。误区三：Multi-Head比Single-Head多了很多参数——参数量相同，只是将计算分配到多个子空间中。
