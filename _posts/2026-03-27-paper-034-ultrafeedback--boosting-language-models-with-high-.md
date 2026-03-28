---
layout: post
title: "Paper: UltraFeedback: Boosting Language Models with High-quality Feedback"
category: papers
tags: [反馈数据, 偏好数据集, AI标注]
authors: "Cui et al., 2023"
paper_id: 34
permalink: /papers/2026-03-27-034
arxiv: '2310.01377'
---

> **Authors**: Cui et al., 2023



> **arxiv**: [2310.01377](https://arxiv.org/abs/2310.01377)



---



## 一句话概括

UltraFeedback构建了一个大规模、高质量、多维度评估的AI反馈数据集，为开源社区的偏好优化训练提供了关键的数据基础设施支撑。


## 核心思想

UltraFeedback的系统化构建流程是：首先收集多样化的用户提示（prompts），然后让多个不同架构和规模的LLM分别生成回答，最后使用GPT-4从多个评估维度（有用性、诚实性、安全性、指令遵循度等）对每个回答进行详细的评分和文字评论。最终形成一个包含约6万条提示、每条配有多个模型回答以及详细多维评分的大规模偏好数据集。


## 关键创新

1) 设计了多模型生成、多维度评估的系统化偏好数据构建框架，提供了丰富立体的偏好信号；2) 建立了GPT-4作为自动标注器的完整方法论，包括详细的评分标准和提示模板；3) 数据集完全开源，迅速成为DPO和PPO训练的标准数据源。


## 深远影响

UltraFeedback成为开源对齐训练的标准数据集，被Zephyr、Notus、Neural-Chat等众多知名模型广泛使用。它展示了AI反馈可以大规模替代昂贵的人类标注，极大降低了对齐训练的数据获取成本和门槛。


## 启发与思考

UltraFeedback深刻提醒我们，在AI发展进程中，高质量的数据集往往比单一的算法创新更具基础设施价值。好的数据集能催生一系列后续研究成果，其长期价值远超单篇论文。"数据即平台"的理念值得每个研究者重视。
