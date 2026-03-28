---
layout: post
title: "Encoder与Decoder的区别与联系"
category: llm
tags: [encoder, decoder, encoder-decoder, decoder-only, BERT, GPT]
topic_id: 8
permalink: /llm/2026-03-01-008
---

## 一句话总结

Encoder进行双向编码理解输入，Decoder进行单向自回归生成输出，两者可独立使用或组合使用，不同架构适合不同任务。


## 核心概念

Encoder：使用无掩码的Self-Attention，每个Token能看到序列中所有其他Token(双向)。适合理解任务，代表模型BERT。Decoder：使用因果掩码的Self-Attention，每个Token只能看到它之前的Token(单向)。适合生成任务，代表模型GPT系列。Encoder-Decoder：Encoder编码输入，Decoder通过Cross-Attention访问Encoder输出来生成。代表模型T5、BART。当前LLM主流为Decoder-only架构，因为它在大规模下表现出更强的涌现能力和few-shot学习能力。


## 为什么重要

架构选择决定了模型的能力边界：Encoder-only擅长分类、检索等理解任务；Decoder-only天然适合文本生成和对话；Encoder-Decoder在翻译、摘要等条件生成任务上有优势。理解架构差异有助于为具体场景选择合适的模型。


## 实践要点

Decoder-only在大规模预训练中胜出的原因之一是训练效率高——每个Token都参与损失计算；Encoder模型(如BERT)用于Embedding和检索仍然是主流选择；T5证明了所有NLP任务都可以转化为text-to-text格式，统一了不同任务的处理范式。


## 常见误区

误区一：Decoder-only模型不能做理解任务——通过适当的Prompt设计，GPT类模型在理解任务上也表现出色。误区二：Encoder-Decoder一定比Decoder-only好——在相同参数量下，Decoder-only在大规模上通常更有优势。误区三：BERT类模型已经过时——在文本检索和语义匹配领域，Encoder模型仍是首选。
