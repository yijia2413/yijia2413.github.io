---
layout: post
title: "Interview: Adam和AdamW的区别不只是名字——解释weight decay在这两个优化器中的数学差异。"
category: interviews
tags: [优化器, Adam, AdamW, 权重衰减, L2正则化]
difficulty: "高级"
question_id: 19
permalink: /interviews/2026-03-11-019
---

## 题目解析

Adam和AdamW的区别是一个看似简单实则深刻的问题。很多工程师知道AdamW解耦了权重衰减但无法准确解释这意味着什么。Loshchilov和Hutter在2019年的工作指出，在自适应优化器中L2正则化和weight decay不等价，这颠覆了SGD时代的常识。


## 解答思路

在SGD中，L2正则化（loss中加λ||w||²项）和weight decay（更新时减去λw）是数学等价的：∇(L+λ||w||²)=∇L+2λw，所以SGD的更新公式w←w-lr·(∇L+2λw)等价于w←(1-2lr·λ)w-lr·∇L。但在Adam中，梯度会被一阶和二阶矩估计缩放。如果用L2正则化，2λw这项也被自适应缩放了，导致不同参数的有效衰减力度不同——梯度大的参数衰减反而更小。


## 关键要点

核心差异：Adam+L2正则化时，权重衰减项被自适应学习率调制，实际衰减量为lr·2λw/√(v+ε)，v大的参数衰减小。AdamW直接在参数更新后减去lr·λ·w，衰减量对所有参数是均匀的，与梯度统计量无关。这使得AdamW的正则化行为更可预测、更均匀。实验表明AdamW在各种任务上都优于Adam+L2正则化，尤其在LLM预训练中AdamW是标准选择。


## 加分回答

更深入的分析：AdamW的解耦设计使得学习率和weight decay可以独立调优，降低了超参数搜索的复杂度。还可以讨论AdamW在训练大模型时的最佳实践：weight decay通常设为0.1，学习率通过warmup+cosine decay调度。提及新的优化器如LION、Sophia等对AdamW的改进尝试，以及为什么AdamW仍然是LLM训练的黄金标准。


## 常见踩坑

最大的坑是说Adam和AdamW的区别只是实现细节——这是一个根本性的数学差异，导致完全不同的正则化行为。另一个错误是在SGD上讨论这个问题——SGD中L2和weight decay确实等价，问题只出现在自适应优化器上。也有人无法写出两种方式的具体更新公式，表明对基础知识掌握不够。
