---
layout: post
title: "Paper: C-Pack: Packaged Resources To Advance General Chinese Embedding (BGE)"
category: papers
tags: [中文嵌入, BGE, 文本表示, MTEB中文]
authors: "Xiao et al., 2023"
paper_id: 65
permalink: /papers/2026-04-25-065
arxiv: '2309.07597'
---
## 一句话概括

BGE（BAAI General Embedding）提供了一套完整的中文文本嵌入资源包，包括模型、数据和评估基准，显著推进了中文嵌入的发展。


## 核心思想

C-Pack包含三大组件：BGE嵌入模型系列（多种规模）、大规模中文文本对数据集、以及中文MTEB评估基准。BGE模型通过三阶段训练策略（RetroMAE预训练、弱监督对比学习、有监督微调）实现高质量中文文本嵌入，并支持通过指令前缀适应不同检索场景。


## 关键创新

构建了完整的中文嵌入生态系统；三阶段渐进式训练策略；RetroMAE预训练增强文本理解；建立中文MTEB标准评估基准；开源所有模型、数据和代码。


## 深远影响

BGE填补了中文嵌入领域的重要空白，成为中文RAG系统最常用的嵌入模型之一。C-MTEB评估基准为中文嵌入研究提供了标准化的比较平台。


## 启发与思考

BGE的成功展示了构建完整生态系统（模型+数据+评估）的重要性。对于中文RAG应用，使用专门针对中文优化的嵌入模型比直接使用多语言模型通常能获得更好的效果。
