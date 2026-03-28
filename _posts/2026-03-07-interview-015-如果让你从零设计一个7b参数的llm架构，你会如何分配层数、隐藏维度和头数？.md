---
layout: post
title: "Interview: 如果让你从零设计一个7B参数的LLM架构，你会如何分配层数、隐藏维度和头数？"
category: interviews
tags: [架构设计, 参数分配, 超参数选择, 工程实践]
difficulty: "高级"
question_id: 15
permalink: /interviews/2026-03-07-015
---

## 题目解析

这道开放性题目考察候选人的架构设计能力和工程直觉。7B参数的LLM有无数种配置方式，但好的设计需要考虑计算效率、训练稳定性、硬件利用率和性能等多个因素。面试官想看你的设计决策是否有理有据。


## 解答思路

参数量估算：Transformer每层参数约12d²（Attention的QKV+O共4d²，SwiGLU的FFN约8d²）。7B参数用32层的话，每层约219M参数，解方程12d²≈219M得d≈4272，取整到4096（方便硬件对齐）。32层×12×4096²≈6.4B，加上embedding层（vocab_size×d≈32000×4096≈0.5B）约7B。头数取32（head_dim=128），GQA取8组KV头。


## 关键要点

关键设计原则：(1)隐藏维度应为128或256的倍数以利用Tensor Core；(2)head_dim通常取64或128——128在现代GPU上效率更高（Flash Attention优化）；(3)层数和隐藏维度的trade-off——更深的模型有更强的特征抽象能力，但训练更不稳定；(4)FFN中间维度取d的8/3倍约10922，取整到256的倍数为11008；(5)词表大小影响embedding层参数，通常32K-128K。


## 加分回答

可以对标LLaMA-2 7B的实际配置（d=4096，32层，32头，FFN_dim=11008）并解释每个选择的理由。讨论宽而浅vs窄而深的trade-off：宽模型并行度更高但特征抽象层次少，深模型表达能力强但梯度传播困难。还可以提到Chinchilla optimal的训练token数（约140B tokens），以及是否选择tied embedding。


## 常见踩坑

常见错误是无法估算参数量——作为候选人你应该能快速心算Transformer每层的参数量。另一个坑是忽略硬件对齐（如维度不是8的倍数会导致Tensor Core利用率下降）。也有人设计出不合理的配置（如过深过窄或过浅过宽），表明缺乏对实际LLM架构的了解。
