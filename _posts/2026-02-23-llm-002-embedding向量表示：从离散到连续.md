---
layout: post
title: "Embedding向量表示：从离散到连续"
category: llm
tags: [embedding, 向量表示, 词嵌入, 语义空间]
topic_id: 2
permalink: /llm/2026-02-23-002
---

## 一句话总结

Embedding将离散的Token ID映射为连续的高维向量，使得语义相近的Token在向量空间中距离更近，这是LLM理解语义的基础。


## 核心概念

Embedding本质是一个查找表(Lookup Table)，维度为V×d，其中V为词表大小，d为嵌入维度。Token ID作为索引，取出对应的d维向量。GPT-3的d=12288，LLaMA-7B的d=4096。这些向量在训练过程中不断更新，最终编码了丰富的语义信息。相似概念的向量余弦相似度高，甚至支持类比运算如king-man+woman≈queen。Embedding层参数量=V×d，对于10万词表和4096维，约4亿参数。


## 为什么重要

离散符号无法直接参与神经网络的矩阵运算和梯度反传。Embedding将符号转为连续向量后：(1)可以用距离度量语义相似性；(2)可以通过梯度优化学习语义表示；(3)为后续Attention等操作提供了数学基础。没有Embedding，就没有现代LLM。


## 实践要点

Embedding维度需与模型规模匹配，过小则表示能力不足，过大则参数浪费；可以用t-SNE或UMAP可视化Embedding空间来分析模型学到的语义结构；预训练好的Embedding可以迁移用于下游任务，如文本检索、聚类等。


## 常见误区

误区一：Embedding是固定的——Embedding在训练中持续更新，不同训练阶段的Embedding语义不同。误区二：Embedding维度越大越好——超过模型容量后收益递减且增加计算开销。误区三：只有Token有Embedding——位置编码也是一种Embedding，两者相加后送入模型。
