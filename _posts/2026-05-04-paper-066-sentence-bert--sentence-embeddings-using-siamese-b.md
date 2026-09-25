---
layout: post
title: "Paper: Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"
category: papers
tags: [Sentence-BERT, 句子嵌入, 孪生网络, 语义相似度]
authors: "Reimers & Gurevych, 2019"
paper_id: 66
permalink: /papers/2026-05-04-066
arxiv: '1908.10084'
---
## 一句话概括

Sentence-BERT通过孪生BERT网络结构生成高质量句子嵌入，将语义相似度计算从交叉编码的分钟级降至毫秒级。


## 核心思想

原始BERT计算两句相似度需要将句子对输入交叉编码器，N个句子需要N的平方次前向传播，计算成本极高。Sentence-BERT使用孪生网络结构，让每个句子独立通过BERT编码后池化为固定维度向量，通过余弦相似度快速计算语义相似性。训练时使用NLI数据集进行对比学习。


## 关键创新

将BERT适配为高效的句子嵌入模型；孪生网络结构实现句子独立编码；语义搜索效率从O(N平方)降至O(N)；提出多种池化策略和训练目标；在语义文本相似度任务上大幅超越先前方法。


## 深远影响

Sentence-BERT奠定了现代句子嵌入的基础，使得大规模语义搜索成为可能。其思想直接影响了后续所有基于BERT的嵌入模型，也为RAG系统的向量检索提供了关键技术支撑。


## 启发与思考

Sentence-BERT的贡献在于让语义理解变得高效可扩展。这提醒我们：再好的模型如果无法高效部署也难以发挥价值。在RAG系统中，嵌入模型的效率和质量同样关键。
