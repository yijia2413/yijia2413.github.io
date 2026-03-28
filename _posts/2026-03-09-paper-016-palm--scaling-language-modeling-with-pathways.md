---
layout: post
title: "Paper: PaLM: Scaling Language Modeling with Pathways"
category: papers
tags: [PaLM, 规模扩展, Pathways, 涌现能力]
authors: "Chowdhery et al., 2022"
paper_id: 16
permalink: /papers/2026-03-09-016
arxiv: '2204.02311'
---

> **Authors**: Chowdhery et al., 2022



> **arxiv**: [2204.02311](https://arxiv.org/abs/2204.02311)



---



## 一句话概括

PaLM使用5400亿参数和Google Pathways系统在6144个TPU上高效训练，全面系统地展示了大规模语言模型的涌现能力和突破性表现。


## 核心思想

利用Google自研的Pathways分布式计算系统实现了前所未有的高效大规模训练，将密集Transformer模型扩展到5400亿参数规模。核心发现是模型在跨越特定规模阈值后会出现能力的不连续质变跳跃（即涌现能力），包括多步逻辑推理、笑话幽默理解、复杂代码生成等此前无法实现的能力。在超过数百项基准任务上达到了当时最优水平。


## 关键创新

Pathways系统实现了6144个TPU芯片的高效协同训练；系统记录并分析了多种涌现能力随规模出现的现象；采用SwiGLU激活函数和parallel attention等架构优化提升效率；在多语言理解和复杂推理能力方面取得了显著突破。


## 深远影响

涌现能力的系统发现和记录深刻影响了整个AI社区对大模型能力边界的认知和理解。Pathways的大规模分布式训练技术推动了训练基础设施的快速发展。后续PaLM-2进一步优化了模型架构和数据配比，成为Google AI系列产品的核心基础。


## 启发与思考

涌现能力的存在意味着我们可能无法通过小模型实验完全准确地预测大模型的行为和能力边界。大规模训练的系统工程能力本身就是核心竞争力和技术壁垒。模型规模、训练数据和计算基础设施的协同发展缺一不可。
