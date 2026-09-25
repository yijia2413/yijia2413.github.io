---
layout: post
title: "Beam Search vs Sampling对比"
category: llm
tags: [解码策略, beam search, sampling, 文本生成]
topic_id: 76
permalink: /llm/2026-05-12-076
---

## 一句话总结

Beam Search通过维护多个候选序列寻找高概率输出，Sampling通过随机采样引入多样性，两者适用于不同场景。


## 核心概念

Beam Search保留top-k个最优序列并逐步扩展，倾向于生成高概率但可能重复的文本。Sampling包括Top-k Sampling（只从概率最高的k个token中采样）、Top-p/Nucleus Sampling（从累积概率达到p的最小token集合中采样）和Temperature控制（温度越高分布越平均，越低越集中）。Greedy Decoding是Beam Search在beam_size=1时的特例。


## 为什么重要

解码策略直接决定生成文本的质量和风格。翻译、摘要等任务需要确定性输出适合Beam Search；创意写作、对话等需要多样性适合Sampling。选错策略会导致输出质量严重下降。


## 实践要点

确定性任务（翻译、代码）使用Beam Search或低温度Sampling。创意任务使用Top-p=0.9配合Temperature=0.7-1.0。避免beam_size过大导致生成空洞。可组合使用如Top-k+Top-p双重过滤。实际服务中Sampling更常用因为计算效率更高。


## 常见误区

误以为Beam Search总能找到最优解，实际上它是近似搜索。误以为Temperature越低越好，过低会导致重复退化。忽视repetition_penalty等辅助参数的作用。混淆Top-k和Beam Search中的k含义。
