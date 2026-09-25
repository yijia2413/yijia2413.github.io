---
layout: post
title: 'Interview: DeepSeek-R1的核心技术贡献与RL的可能性'
category: interviews
tags: [DeepSeek-R1, 强化学习, 推理, GRPO, aha moment]
difficulty: "高级"
question_id: 89
permalink: /interviews/2026-05-26-089
---

## 题目解析

DeepSeek-R1是开源社区在推理模型方面的标志性工作，其技术路线与o1有相似之处但也有重要差异。此题考察你对该工作核心贡献的理解。


## 解答思路

DeepSeek-R1的核心贡献：(1)证明了纯RL(不依赖大量SFT数据)可以从基座模型直接训练出强推理能力——R1-Zero仅用RL就展现出self-verification、reflection等涌现行为；(2)提出了GRPO(Group Relative Policy Optimization)算法，相比PPO不需要单独的critic模型，降低了训练成本；(3)发现了"aha moment"现象——模型在RL训练过程中突然学会了某种推理模式，表现为reward的跳跃式提升。


## 关键要点

R1证明的关键可能性：RL可以引导模型发现人类没有显式教授的推理策略。R1-Zero训练中模型自发学会了用更多token来"思考"(输出长度随训练增加)，这是模型自己发现test-time compute scaling的价值。但R1-Zero也暴露了纯RL的问题：可读性差、语言混杂(中英文混用)，因此最终R1采用了SFT冷启动+RL的两阶段方案。


## 加分回答

可以讨论R1的蒸馏策略——将R1的推理能力蒸馏到更小的模型(如Qwen-7B)中，蒸馏后的小模型推理能力甚至超过直接RL训练的同规模模型。这说明推理能力可以有效迁移。还可以分析GRPO相比PPO的具体优势：用组内相对排名替代绝对value估计，减少了训练不稳定性。


## 常见踩坑

常见错误是认为R1完全复现了o1——实际上R1在某些维度(如英文创作)仍有差距。另一个误区是过度解读"aha moment"——这可能只是RL训练中常见的性能跳变，而非真正的"顿悟"。
