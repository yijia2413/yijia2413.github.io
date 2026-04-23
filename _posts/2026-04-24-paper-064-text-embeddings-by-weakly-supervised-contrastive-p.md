---
layout: post
title: "Paper: Text Embeddings by Weakly-Supervised Contrastive Pre-training (E5)"
category: papers
tags: [文本嵌入, E5, 对比学习, 弱监督预训练]
authors: "Wang et al., 2022"
paper_id: 64
permalink: /papers/2026-04-24-064
arxiv: '2212.03533'
---
## 一句话概括

E5通过弱监督对比预训练在大规模文本对上学习通用文本嵌入，实现了跨任务的优秀迁移能力。


## 核心思想

从互联网上收集大量自然存在的文本对（如问答对、标题-正文对等）作为弱监督信号，通过对比学习预训练文本嵌入模型。模型名称E5代表EmbEddings from bidirEctional Encoder rEpresentations，统一使用query和passage前缀来区分不同角色的文本输入。


## 关键创新

利用自然存在的文本对构建大规模弱监督训练数据；统一的文本嵌入模型支持多种下游任务；简单的前缀指令区分查询和文档角色；在MTEB基准上取得全面领先的结果。


## 深远影响

E5证明了弱监督预训练可以产生高质量通用文本嵌入，降低了构建高质量嵌入模型的数据标注成本。E5系列模型成为RAG系统中广泛使用的嵌入选择。


## 启发与思考

E5说明了互联网中蕴含着大量可利用的弱监督信号。在构建RAG系统时，选择合适的嵌入模型至关重要，而E5及其后续版本为此提供了强有力的开箱即用方案。
