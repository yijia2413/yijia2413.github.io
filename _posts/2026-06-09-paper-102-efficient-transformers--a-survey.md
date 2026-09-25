---
layout: post
title: "Paper: Efficient Transformers: A Survey"
category: papers
tags: [高效注意力, 线性注意力, 稀疏注意力, 综述]
authors: "Tay et al., 2022"
paper_id: 102
permalink: /papers/2026-06-09-102
arxiv: '2009.06732'
---
## 一句话概括

系统综述了各种高效Transformer变体，旨在解决标准自注意力机制O(n²)复杂度带来的长序列处理瓶颈。


## 核心思想

标准Transformer的自注意力对序列长度呈二次复杂度，严重限制了长文本处理能力。本综述将高效注意力方法分为固定模式(如局部窗口、分块)、可学习模式(如Reformer的LSH)、低秩近似(如Linformer)、核方法(如Performer的随机特征映射)以及记忆/压缩方法等类别。


## 关键创新

提出了统一的分类框架来理解不同高效注意力方法的设计哲学。特别值得注意的方法包括：Longformer的滑动窗口+全局注意力组合、BigBird的理论保证、Flash Attention从IO层面优化而非改变注意力机制本身。


## 深远影响

这些研究直接推动了长上下文LLM的发展。Flash Attention成为事实标准，GPT-4、Claude等模型支持超长上下文窗口。高效注意力的研究从算法近似转向硬件感知优化，开辟了全新方向。


## 启发与思考

Flash Attention的成功说明：有时最好的优化不是改变算法而是更好地利用硬件。未来随着上下文窗口持续扩展到百万级token，注意力效率仍是核心研究课题。
