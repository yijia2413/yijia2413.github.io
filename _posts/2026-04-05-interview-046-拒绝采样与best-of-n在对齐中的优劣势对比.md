---
layout: post
title: 'Interview: 拒绝采样与Best-of-N在对齐中的优劣势对比'
category: interviews
tags: [拒绝采样, Best-of-N, 对齐, 推理策略]
difficulty: "中级"
question_id: 46
permalink: /interviews/2026-04-05-046
---

## 题目解析

拒绝采样(Rejection Sampling)和Best-of-N都是利用RM在推理时提升输出质量的方法，也常用于对齐训练数据的构造。理解两者的区别和适用场景是对齐工程实践的基础。


## 解答思路

Best-of-N：生成N个回复，用RM选最高分的。简单直接但计算量线性增长。效果提升约随log(N)增长，即N=16比N=4的提升远小于N=4比N=1。拒绝采样：设定一个RM分数阈值，不断生成直到有回复超过阈值。期望采样次数取决于阈值高低。拒绝采样常用于生成高质量SFT/RLHF训练数据(如Llama 2的做法)。关键区别：Best-of-N有固定计算预算，拒绝采样的计算预算不确定但可以保证最低质量。


## 关键要点

1. Best-of-N的效果上界受限于单次采样分布的支撑集；2. 拒绝采样的效率取决于策略分布与RM阈值的匹配；3. 两者都强烈依赖RM质量——RM有偏会导致选出的回复有偏；4. 计算成本是核心劣势，尤其在推理部署时。


## 加分回答

RAFT(Reward rAnked FineTuning)使用拒绝采样生成高质量数据再做SFT，相当于蒸馏了RM的知识到生成模型中，避免了推理时的额外开销。理论上Best-of-N等价于对KL散度施加约束的优化，且N越大KL预算越大。


## 常见踩坑

最大的坑是过度依赖RM分数——当RM存在reward hacking漏洞时，Best-of-N会系统性地选出RM高分但人类低评的回复。建议配合长度惩罚和多样性约束一起使用。
