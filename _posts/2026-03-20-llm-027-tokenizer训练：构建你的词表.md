---
layout: post
title: "Tokenizer训练：构建你的词表"
category: llm
tags: [Tokenizer, BPE, 词表, 分词]
topic_id: 27
permalink: /llm/2026-03-20-027
---

## 一句话总结

Tokenizer将原始文本转化为模型可处理的token序列，其设计直接影响模型的语言覆盖能力和训练效率。


## 核心概念

主流算法包括BPE(Byte Pair Encoding)、WordPiece和Unigram。BPE从字符级开始，迭代合并最高频的相邻token对，GPT系列和LLaMA均采用此方法。现代实践多用Byte-level BPE，以UTF-8字节为基础单元，天然支持任何语言无需预分词。词表大小是关键超参数：太小则序列过长增加计算成本，太大则嵌入层参数过多且低频token学不充分。典型设置在32K到128K之间。


## 为什么重要

Tokenizer决定了模型的输入粒度。中文若用英文为主的tokenizer，一个汉字可能被拆成多个token，导致序列变长、效率降低、上下文窗口被浪费。好的tokenizer能在压缩率(每字符平均token数)和词表大小之间取得平衡。


## 实践要点

训练tokenizer需要在目标语言分布上采样足够数据(通常几GB文本即可)。添加特殊token(如BOS、EOS、PAD)要在训练前规划好。建议用sentencepiece或HuggingFace tokenizers库训练。多语言场景需确保各语言在训练数据中的比例合理，避免某语言压缩率过低。


## 常见误区

误区一：直接复用开源tokenizer而不考虑目标领域。领域专用术语(如医学、法律)可能被过度拆分。误区二：词表越大越好。词表过大会导致嵌入矩阵占用大量参数且很多token训练不充分。误区三：忽视tokenizer对下游任务的影响，如代码生成需要保留缩进空格为独立token。
