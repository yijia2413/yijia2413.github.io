---
layout: post
title: "BPE/WordPiece/SentencePiece分词算法"
category: llm
tags: [BPE, WordPiece, SentencePiece, 分词算法, 子词]
topic_id: 11
permalink: /llm/2026-03-04-011
---

## 一句话总结

BPE、WordPiece和SentencePiece是三种主流子词(subword)分词算法，它们通过数据驱动的方式自动构建词表，在词表大小和语义完整性之间取得平衡。


## 核心概念

BPE(Byte Pair Encoding)：从字符级开始，反复合并最高频的相邻符号对，直至达到目标词表大小。GPT系列使用。WordPiece：类似BPE，但合并标准是选择使语言模型似然最大提升的符号对，BERT使用。SentencePiece：将文本视为Unicode字符或字节流(不依赖预分词)，支持BPE和Unigram两种模式。Unigram从大词表开始逐步剪枝，保留损失最小的子词。Byte-level BPE(如GPT-2)在字节级操作，可以编码任意文本，彻底消除OOV问题。


## 为什么重要

分词算法决定了模型的输入粒度和表示效率。好的分词算法能在有限词表内覆盖尽可能多的语言现象，减少Token数量从而降低计算成本。对于多语言模型，分词算法的选择直接影响各语言的公平性——词表中某语言Token覆盖不足会导致该语言效率极低。


## 实践要点

训练自定义Tokenizer时，语料需覆盖目标场景；词表大小通常32K-150K，更大的词表编码效率高但Embedding参数增加；Byte-level BPE已成主流，因为它零OOV且对任意语言友好；中文场景可考虑在BPE前先进行字级预分词以提升效果。


## 常见误区

误区一：BPE和WordPiece是一回事——它们的合并策略不同(频率 vs 似然增益)。误区二：分词只需运行一次就行——不同模型的Tokenizer不可混用，必须使用模型配套的Tokenizer。误区三：子词分词总是最优的——对于某些特定领域(如生物序列)，字符级或领域专用分词可能更好。
