---
layout: post
title: "Interview: 为什么Decoder-only架构在大规模预训练中胜出？Encoder-Decoder架构真的不行吗？"
category: interviews
tags: [架构选择, Decoder-only, Encoder-Decoder, 预训练范式]
difficulty: "高级"
question_id: 7
permalink: /interviews/2026-02-27-007
---

## 题目解析

GPT系列的成功使Decoder-only成为LLM的主流架构，但T5/UL2等Encoder-Decoder模型在某些任务上并不逊色。这道题考察候选人是否理解架构选择背后的深层原因，包括训练效率、任务适配和工程实践等多个维度。


## 解答思路

Decoder-only胜出的原因有多个层面：(1)训练效率——causal LM的每个token都参与loss计算，Encoder-Decoder中encoder的输入token不直接贡献loss；(2)范式统一——所有任务都可以表述为文本生成，无需区分输入输出格式；(3)涌现能力——大规模实验表明decoder-only在few-shot和zero-shot场景下表现更好；(4)工程简洁性——单一架构简化了代码和优化流程。


## 关键要点

Encoder-Decoder并非不行：(1)在翻译、摘要等有明确输入输出分离的任务上，Encoder-Decoder的双向编码提供了更好的输入理解；(2)T5和Flan-T5在instruction following任务上表现优异；(3)Encoder-Decoder可以用prefix LM的方式训练，兼具双向注意力和生成能力。Decoder-only的真正优势在于规模效应——当模型足够大时，单向注意力的劣势被参数量弥补。


## 加分回答

可以讨论Raffel等人在T5论文中的系统对比实验，以及Wang等人关于架构对比的研究。值得一提的是Google的PaLM和Gemini选择Decoder-only，但其搜索和理解相关的模型仍使用双向编码器。架构选择不是非此即彼，而是根据应用场景的最优匹配。


## 常见踩坑

最大的坑是武断地说Decoder-only在所有任务上都更好——这忽略了Encoder-Decoder在条件生成任务上的优势。另一个错误是将Decoder-only的成功完全归因于架构本身，而忽略了训练数据规模、目标函数和工程优化等因素的共同作用。
