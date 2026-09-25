---
layout: post
title: "Reranking重排序技术"
category: llm
tags: [重排序, reranking, cross-encoder, RAG优化]
topic_id: 90
permalink: /llm/2026-05-26-090
---

## 一句话总结

Reranking使用Cross-Encoder等精排模型对初步检索结果重新排序，显著提升检索精度，是RAG系统中投入产出比最高的优化之一。


## 核心概念

两阶段检索：第一阶段用Bi-Encoder（embedding模型）从大量文档中快速召回候选集，第二阶段用Cross-Encoder对query-document对逐一精细评分排序。Cross-Encoder将query和document拼接输入，能捕捉更细粒度的交互信息，但计算成本远高于Bi-Encoder。主流Reranker包括：Cohere Rerank、BGE-Reranker、bce-reranker等。


## 为什么重要

Bi-Encoder的向量相似度是粗粒度匹配，会遗漏语义相关但表述不同的文档。Reranking能将Top-20的检索结果重排后显著提升Top-5的相关性。通常能将RAG端到端效果提升5-15%。


## 实践要点

先召回较多候选（如Top-20或Top-50），再用Reranker精排取Top-5。中文场景推荐BGE-Reranker或bce-reranker。注意Reranker的延迟开销，控制候选集大小。可以用LLM作为Reranker但成本更高。Reranker也可以微调以适应特定领域。


## 常见误区

误以为好的embedding模型就不需要Reranking。将Reranker用于全量文档检索导致延迟过高。忽视Reranker模型与具体语言和领域的匹配度。只关注排序质量不考虑延迟预算。
