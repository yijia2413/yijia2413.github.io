---
layout: post
title: 'Interview: Synthetic Data训练推理能力：STAR和ReST的核心思想'
category: interviews
tags: [Synthetic Data, STAR, ReST, 自训练, 推理数据]
difficulty: "高级"
question_id: 100
permalink: /interviews/2026-06-06-100
---

## 题目解析

高质量推理数据稀缺是训练推理模型的瓶颈。用模型自身生成的合成数据来训练推理能力是一条重要路径，STAR和ReST是代表性方法。此题考察你对这一技术路线的理解。


## 解答思路

核心思想是自举(Self-Bootstrapping)：(1)STAR(Self-Taught Reasoner)——让模型对训练问题生成推理链(rationale)，只保留最终答案正确的推理链作为训练数据，用这些数据SFT模型，然后迭代这个过程。关键创新是"rationalization"——对模型无法直接解决的问题，提供正确答案作为hint让模型生成推理链。(2)ReST(Reinforced Self-Training)——类似但更结合RL思想：Generate(模型生成多个候选解)→Filter(用reward model或验证器筛选)→Train(用筛选后的数据训练)→循环迭代。


## 关键要点

这些方法的有效性基于一个关键假设：模型能生成正确的推理链但不能稳定生成——通过大量采样和筛选可以获得高质量样本。成功的前提是模型已有一定的基础推理能力，完全不会推理的模型无法自举。ReST*变体引入了offline RL的思想，对筛选阈值做了改进——不只保留完全正确的，还保留"相对较好的"样本，使数据利用率更高。


## 加分回答

可以将STAR/ReST与Rejection Sampling Fine-tuning(RFT)做对比——RFT是这些方法的简化版本。还可以讨论合成数据的"天花板效应"——模型只能从自己能生成的范围内学习，存在能力上界。以及STaR的迭代过程与EM算法的理论联系，以及Yuan et al.的Self-Play方法如何将这一思路推广。


## 常见踩坑

最大的误区是认为合成数据可以无限提升推理能力——当模型能力饱和后，自举数据的质量不再提升，训练也随之停滞(甚至退化，因为模型在自己的分布上过拟合)。另一个坑是忽略数据多样性——反复用同类型的合成数据训练会导致模型在该类型上过拟合而丧失泛化性。
