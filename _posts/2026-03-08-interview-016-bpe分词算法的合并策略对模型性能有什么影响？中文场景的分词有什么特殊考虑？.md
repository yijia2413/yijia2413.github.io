---
layout: post
title: "Interview: BPE分词算法的合并策略对模型性能有什么影响？中文场景的分词有什么特殊考虑？"
category: interviews
tags: [BPE, 分词, 词表设计, 中文NLP]
difficulty: "中级"
question_id: 16
permalink: /interviews/2026-03-08-016
---

## 题目解析

分词是LLM的第一步也是被低估的一步。BPE的合并策略直接影响词表的构成，进而影响序列长度、模型效率和对不同语言的覆盖质量。中文作为非空格分隔的语言，在BPE分词中面临独特挑战。面试官想看你是否关注过这些基础但关键的设计决策。


## 解答思路

BPE从字符级别开始，反复合并最高频的相邻token对，直到达到目标词表大小。合并策略的影响：(1)词表大小trade-off——更大的词表减少序列长度但增加embedding参数；(2)合并顺序影响词表构成——高频合并优先可能产生很多英文词根但中文覆盖不足；(3)训练语料的语言分布直接决定了不同语言的分词效率。


## 关键要点

中文特殊考虑：(1)中文字符多——常用汉字3000+，加上UTF-8编码每个字占3字节，在byte-level BPE中需要3个token表示一个字，严重影响效率；(2)解决方案——预分词（先按字分词再BPE）、增加中文语料比例、或显式添加常用汉字到基础词表；(3)LLaMA原始词表对中文极不友好，每个汉字可能被拆成3个byte token，ChatGLM等中文模型专门优化了中文分词效率。词表大小的影响：太小导致序列过长，太大导致embedding层参数爆炸且低频token训练不充分。


## 加分回答

可以讨论SentencePiece的unigram模型与BPE的对比、词表扩展（vocabulary expansion）的技术方案、以及不同模型的词表设计选择（LLaMA 32K、GPT-4 100K、Qwen 150K+）。提到byte-level BPE（GPT-2引入）的优势：不会遇到UNK token，可以处理任意语言和任意输入。


## 常见踩坑

常见错误是不知道BPE的具体工作流程或混淆BPE与WordPiece。另一个坑是忽略分词对序列长度的影响——同样的中文文本，好的分词可能只需要差的分词一半的token数，直接影响训练和推理成本。也有人不理解byte-level和character-level BPE的区别。
