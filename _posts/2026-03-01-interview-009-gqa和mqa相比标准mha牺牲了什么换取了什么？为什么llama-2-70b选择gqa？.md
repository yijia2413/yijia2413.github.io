---
layout: post
title: "Interview: GQA和MQA相比标准MHA牺牲了什么换取了什么？为什么LLaMA-2 70B选择GQA？"
category: interviews
tags: [GQA, MQA, KV Cache, 推理效率]
difficulty: "中级"
question_id: 9
permalink: /interviews/2026-03-01-009
---

## 题目解析

GQA（Grouped Query Attention）是MHA和MQA之间的折中方案。这道题考察候选人对注意力变体的理解以及工程权衡的能力。面试官想看你是否清楚这些设计在质量和效率之间的精确trade-off，以及LLaMA-2做出选择的技术考量。


## 解答思路

MHA：每个query头有独立的KV头，总共h组KV。MQA：所有query头共享同一组KV，只有1组KV。GQA：将query头分成g组，每组共享一组KV，共g组KV。MQA大幅减少KV Cache但质量损失明显，GQA在减少KV Cache的同时保持接近MHA的质量。以LLaMA-2 70B为例：64个query头分8组GQA，KV Cache减少到MHA的1/8。


## 关键要点

核心trade-off是推理时KV Cache的显存占用与模型质量。KV Cache大小正比于KV头数，长序列推理时KV Cache可能超过模型参数本身的显存占用。GQA的g=8意味着KV Cache为MHA的1/8，在70B模型上这是数GB级别的节省。LLaMA-2的实验表明GQA在困惑度上几乎与MHA持平（损失<0.5%），但推理吞吐量提升显著。


## 加分回答

可以讨论从MHA到GQA的训练策略：可以从预训练好的MHA模型出发，通过mean pooling将KV头合并后继续训练（uptrain），比从零训练更高效。还可以分析不同模型的选择：PaLM使用MQA，LLaMA-2 70B使用GQA(g=8)，Mistral使用GQA——规模越大，KV Cache优化越关键。


## 常见踩坑

常见错误是认为GQA只影响推理不影响训练——GQA在训练时同样减少参数量和计算量。另一个坑是没有量化分析：面试官期望你能估算具体的KV Cache节省量。也有人混淆GQA减少的是KV头数而非query头数——query头数不变，保证了模型的多样化注意力模式。
