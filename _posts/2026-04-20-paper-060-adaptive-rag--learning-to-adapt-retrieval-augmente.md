---
layout: post
title: "Paper: Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity"
category: papers
tags: [Adaptive-RAG, 自适应策略, 问题复杂度, 动态路由]
authors: "Jeong et al., 2024"
paper_id: 60
permalink: /papers/2026-04-20-060
arxiv: '2403.14403'
---
## 一句话概括

Adaptive-RAG根据问题复杂度动态选择最合适的处理策略，简单问题直接回答，复杂问题使用多步检索推理。


## 核心思想

训练一个轻量级分类器评估输入问题的复杂度，将问题分为简单、中等和复杂三个级别。简单问题无需检索直接由LLM回答；中等问题执行单步检索增强生成；复杂问题使用迭代多步检索推理。通过自动化路由避免对所有问题使用统一策略的低效。


## 关键创新

引入问题复杂度感知的自适应处理策略；轻量级分类器实现高效路由决策；从简单到复杂的渐进式处理流程；在效率和效果之间取得更好平衡。


## 深远影响

Adaptive-RAG推动了RAG系统从一刀切到自适应的进化，体现了智能路由在AI系统中的重要性。其思想启发了更多动态化、个性化的RAG策略研究。


## 启发与思考

并非所有问题都需要相同的处理力度，过度检索既浪费资源又可能引入噪声。根据问题特征动态调整策略，是构建高效实用RAG系统的重要设计原则。
