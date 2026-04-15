---
layout: post
title: "Paper: Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
category: papers
tags: [Self-RAG, 自我反思, 自适应检索, 生成质量控制]
authors: "Asai et al., 2023"
paper_id: 56
permalink: /papers/2026-04-16-056
arxiv: '2310.11511'
---
## 一句话概括

Self-RAG让语言模型学会自我判断何时需要检索、检索内容是否相关、以及生成结果是否有据可依，实现自适应的检索增强。


## 核心思想

训练语言模型输出特殊的反思token（reflection tokens），包括：是否需要检索（Retrieve）、检索内容是否相关（IsRel）、生成是否有支持（IsSup）、整体有用性（IsUse）。模型按需检索而非总是检索，并通过反思token自我评估生成质量，从多个候选中选择最佳输出。


## 关键创新

引入反思token实现检索与生成的自我批评机制；按需检索避免不必要的检索开销；无需额外奖励模型或强化学习即可提升生成质量；在推理时可通过调整反思token阈值灵活控制行为。


## 深远影响

Self-RAG代表了RAG系统从被动检索到主动反思的重要进化，启发了后续一系列自适应RAG方法。其自我评估机制为构建更可靠的RAG系统提供了新的思路。


## 启发与思考

Self-RAG的核心启示是：不是所有问题都需要检索，盲目检索可能反而引入噪声。让模型学会判断何时检索、如何评估检索质量，是构建高质量RAG系统的关键一步。
