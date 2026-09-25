---
layout: post
title: "Embedding模型选型与评估"
category: llm
tags: [embedding, 向量表示, 语义搜索, MTEB]
topic_id: 88
permalink: /llm/2026-05-24-088
---

## 一句话总结

Embedding模型将文本转换为稠密向量表示，其质量直接决定RAG系统的检索效果，选型需基于MTEB等基准和实际任务评估。


## 核心概念

主流Embedding模型包括：OpenAI text-embedding-3系列（商用标杆）、BGE系列（中文优秀的开源方案）、GTE系列（阿里开源）、E5系列（微软）、Jina Embeddings（支持长文本）。评估维度包括：语义相似度、检索准确率、聚类效果等。MTEB（Massive Text Embedding Benchmark）是标准评测榜单。向量维度在768-3072之间，维度越大表达力越强但存储和计算成本更高。


## 为什么重要

Embedding模型是RAG检索质量的第一道门槛。低质量的向量表示会导致相关文档无法被召回。中文场景尤其需要选择中文能力强的模型。


## 实践要点

中文场景优先评估BGE和GTE系列。在自己的数据集上做评估而非只看榜单。考虑模型的max_token限制和实际分块长度的匹配。注意query和document可能需要不同的编码方式。可通过微调embedding模型提升领域内效果。Matryoshka表示允许灵活截断维度。


## 常见误区

只看MTEB排名不做实际任务评估。忽视中英文能力差异。使用不匹配的embedding模型和向量数据库配置。认为更大的模型一定更好而忽视延迟和成本。
