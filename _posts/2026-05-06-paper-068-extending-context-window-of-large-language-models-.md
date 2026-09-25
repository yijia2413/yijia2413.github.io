---
layout: post
title: "Paper: Extending Context Window of Large Language Models via Positional Interpolation"
category: papers
tags: [位置插值, 上下文扩展, RoPE, 长文本]
authors: "Chen et al., 2023"
paper_id: 68
permalink: /papers/2026-05-06-068
arxiv: '2306.15595'
---
## 一句话概括

位置插值通过线性缩放位置编码将LLM的上下文窗口扩展数倍，仅需少量微调即可有效处理更长文本。


## 核心思想

直接外推位置编码到训练范围之外会导致性能崩溃。位置插值（Position Interpolation）将新的位置映射压缩到原始训练范围内，即将长序列的位置索引线性缩放到模型训练时见过的范围内。例如将4K窗口扩展到32K时，将位置除以8使其落在0到4K范围内。仅需1000步微调即可恢复性能。


## 关键创新

提出位置插值替代外推避免性能崩溃；仅需极少量微调即可扩展上下文窗口；理论分析证明插值的注意力分数更稳定；方法简单通用适用于各种RoPE编码的模型。


## 深远影响

位置插值为扩展LLM上下文窗口提供了最简单有效的方法之一，被广泛应用于各种开源模型的长文本适配。为后续的NTK-aware、YaRN等更先进的扩展方法奠定了理论基础。


## 启发与思考

上下文窗口扩展对RAG有重要意义：更长的窗口允许注入更多检索文档。但结合Lost in the Middle的发现，更长的窗口不等于更好的信息利用，需要在窗口长度和利用效率间寻找平衡。
