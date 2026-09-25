---
layout: post
title: "Paper: Reflexion: Language Agents with Verbal Reinforcement Learning"
category: papers
tags: [Agent, 自我反思, 强化学习, 语言反馈]
authors: "Shinn et al., 2023"
paper_id: 80
permalink: /papers/2026-05-18-080
arxiv: '2303.11366'
---
## 一句话概括

Reflexion让语言Agent通过自然语言形式的自我反思来从失败中学习，无需更新模型权重，实现了一种基于语言反馈的强化学习。


## 核心思想

传统RL通过标量奖励信号更新策略参数。Reflexion将这一过程转化为语言层面：Agent执行任务后，如果失败，会生成一段文字反思（分析失败原因、总结教训），这些反思被存入记忆中。在后续尝试中，Agent可以参考之前的反思来避免重复犯错。整个过程不涉及梯度更新，仅通过语言反馈实现自我改进。


## 关键创新

1) 用自然语言替代标量奖励信号进行学习；2) 反思记忆提供了持久的经验积累机制；3) 无需训练即可实现迭代改进；4) 反思过程可解释、可审查；5) 在编程、决策和推理任务上显著超越基线。


## 深远影响

Reflexion展示了LLM Agent自我改进的可能性，启发了大量关于Agent自主学习、经验积累的研究。它证明语言本身就是一种强大的学习信号载体。


## 启发与思考

人类的成长很大程度上来自对失败的反思。Reflexion将这种能力赋予了AI Agent，让我们看到了不依赖梯度下降的学习新范式。关键挑战是如何确保反思的质量和准确性。
