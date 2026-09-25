---
layout: post
title: "Paper: Benchmarking Large Language Models in Retrieval-Augmented Generation (RAGAS)"
category: papers
tags: [RAGAS, RAG评估, 自动评估, 评估指标]
authors: "Es et al., 2023"
paper_id: 74
permalink: /papers/2026-05-12-074
arxiv: '2309.15217'
---
## 一句话概括

RAGAS提出了一套无需人工标注的自动化RAG评估框架，通过忠实度、回答相关性和上下文相关性等指标全面评估RAG系统质量。


## 核心思想

设计了三个核心评估维度：忠实度（Faithfulness，生成内容是否忠于检索到的上下文）、回答相关性（Answer Relevancy，回答是否切题）、上下文相关性（Context Relevancy，检索的上下文是否相关）。利用LLM自身作为评判者，通过精心设计的评估流程实现自动化打分，无需昂贵的人工标注。


## 关键创新

提出针对RAG系统的专用评估框架；三维度评估分别覆盖检索和生成质量；利用LLM作为自动评估器降低评估成本；开源工具包便于快速集成到RAG开发流程中。


## 深远影响

RAGAS成为RAG系统最常用的评估框架之一，其评估维度和方法被广泛采纳。推动了RAG评估从手工抽检向系统化自动评估的转变，加速了RAG系统的迭代开发。


## 启发与思考

没有评估就没有改进。RAGAS提供了量化RAG系统质量的实用工具，但使用时需注意LLM评估器自身的偏差和局限性。在实践中，自动评估应与人工抽检结合使用以确保评估的可靠性。
