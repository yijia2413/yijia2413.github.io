---
layout: post
title: 'Interview: Embedding模型和Reranker模型在RAG中各自的角色是什么？能不能只用一个？'
category: interviews
tags: [Embedding, Reranker, 双阶段检索, Cross-Encoder, Bi-Encoder]
difficulty: "中级"
question_id: 68
permalink: /interviews/2026-05-05-068
---

## 题目解析

RAG系统通常采用两阶段检索架构：第一阶段用Embedding模型(Bi-Encoder)快速召回候选文档，第二阶段用Reranker模型(Cross-Encoder)精细排序。两者在精度和效率上有根本性的trade-off。这道题考察对两种模型工作原理差异的深入理解。


## 解答思路

Embedding模型(Bi-Encoder)：query和document独立编码为向量，通过向量相似度衡量相关性。优点是document向量可预计算存储，检索时只需编码query+向量搜索，速度极快(ms级)。缺点是query和document之间没有交互注意力，无法捕捉细粒度的语义匹配。Reranker模型(Cross-Encoder)：将query和document拼接输入模型，通过完整的注意力交互计算相关性分数。精度远高于Bi-Encoder(通常高5-15个百分点)，但需要对每个候选文档独立计算，速度极慢。


## 关键要点

1. 只用Embedding：速度快但精度不够，尤其对于需要推理的查询（如"哪个产品不支持退货")
2. 只用Reranker：对全库(百万级)文档逐一计算不可行，延迟会到秒甚至分钟级
3. 工程最佳实践：Embedding召回Top-100，Reranker精排取Top-5送入LLM
4. 最新趋势：用LLM本身做Reranker(RankGPT)，精度更高但成本也更高


## 加分回答

可以讨论ColBERT的late interaction思路——介于Bi-Encoder和Cross-Encoder之间：document的每个token独立编码并存储，query时做token级别的MaxSim匹配。既保留了预计算优势又有较强的交互能力。还可以分析listwise reranking(如LRL)相比pointwise reranking的优势——前者同时看到多个候选文档，可以做更好的比较排序。


## 常见踩坑

1. Reranker的输入长度有限(通常512 token)，长文档需要截断或分段处理
2. Embedding模型和Reranker模型的训练数据分布不同，可能导致排序不一致
3. 忽略了Reranker的计算成本——候选集太大时Reranker本身成为瓶颈
