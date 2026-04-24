---
layout: post
title: 'Interview: RAG系统中，chunk大小的选择背后有什么理论依据？不同场景最优chunk差异多大？'
category: interviews
tags: [RAG, 分块策略, Chunk Size, 检索粒度, 信息密度]
difficulty: "中级"
question_id: 66
permalink: /interviews/2026-04-25-066
---

## 题目解析

Chunk大小是RAG系统最基础也最重要的超参数之一。太小的chunk缺乏上下文导致语义不完整，太大的chunk引入噪声且嵌入向量难以精准表示内容。最优chunk大小取决于文档类型、查询类型和embedding模型的能力，没有放之四海而皆准的答案。


## 解答思路

理论依据：1）信息论角度——chunk应该是一个"语义单元"，内部信息密度高且自包含；2）嵌入模型角度——chunk长度不应超过模型的有效编码长度(通常512 token)，超过后向量质量下降；3）检索精度角度——chunk越小检索越精准但召回率下降；chunk越大召回率高但精准度下降。实践中：FAQ/问答型数据适合100-200 token的小chunk；技术文档适合300-500 token；法律/学术文献适合500-1000 token。


## 关键要点

1. 重叠(overlap)策略：相邻chunk重叠10-20%避免语义被截断
2. 递归分块：先按标题/段落分，不够再按句子分，保持语义完整性
3. Small-to-Big策略：用小chunk检索（精准），但将大chunk（含上下文）送入LLM
4. 不同embedding模型对chunk大小的敏感度不同——最新的模型(如BGE-M3)支持更长输入


## 加分回答

可以讨论Semantic Chunking——基于句子嵌入相似度的自适应分块：计算相邻句子的语义相似度，在相似度突然下降的位置切分。这比固定大小分块更合理但计算成本高。还可以分析Late Chunking的思路——先对整个文档做embedding然后再切分，保留了全局上下文信息。另一个进阶话题是Agentic Chunking——用LLM判断每个段落应归属哪个chunk。


## 常见踩坑

1. 对所有类型文档使用相同chunk大小——表格数据和叙述文本需要完全不同的策略
2. 只看chunk大小不考虑chunk质量——含有大量格式字符的chunk嵌入质量很差
3. 忽略了chunk边界对问答效果的致命影响——答案跨越两个chunk时两个都可能检索不到
