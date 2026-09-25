---
layout: post
title: "Paper: Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters"
category: papers
tags: [推理, 测试时计算, 搜索策略, 效率优化]
authors: "Snell et al., 2024"
paper_id: 98
permalink: /papers/2026-06-05-098
arxiv: '2408.03314'
---
## 一句话概括

这项研究系统性地证明了在推理时投入更多计算资源可以比训练更大模型更加高效，为LLM推理能力提升开辟了新维度。


## 核心思想

传统Scaling Law关注训练时的参数量和数据量。本文研究推理时计算资源的扩展规律：给定固定的推理计算预算，如何最优地分配？研究发现两种主要策略各有优势：基于搜索的方法（如beam search配合过程奖励模型PRM）在已知搜索方向时更高效；基于修订的方法（让模型自我检查和修改回答）在模型能力匹配任务难度时更有效。关键发现是：较小的模型通过最优的test-time compute分配，可以超越更大但推理计算更少的模型。


## 关键创新

1) 系统量化了test-time compute的扩展规律；2) 发现了不同搜索策略的最优适用条件；3) 证明了"小模型+多推理"可以优于"大模型+少推理"；4) 为计算资源在训练和推理之间的分配提供了理论指导。


## 深远影响

这项工作为OpenAI o1等"推理模型"的路线提供了理论支撑。它改变了"越大越好"的简单思维，提出了更精细的compute-optimal策略。


## 启发与思考

这个发现的深层含义是：智能不仅来自知识储备（参数），也来自思考过程（推理计算）。就像人类中，"聪明"不只是知道多少，更是能否深入思考。这为AI系统设计开辟了全新的优化维度。
