---
layout: post
title: "Paper: Gorilla: Large Language Model Connected with Massive APIs"
category: papers
tags: [API调用, 工具使用, 检索增强微调, API文档]
authors: "Patil et al., 2023"
paper_id: 63
permalink: /papers/2026-04-23-063
arxiv: '2305.15334'
---
## 一句话概括

Gorilla通过检索增强微调让LLM准确调用大量API，显著减少API调用中的幻觉问题。


## 核心思想

构建了包含数千个机器学习相关API的数据集（APIBench），并通过检索增强的方式微调LLM。在推理时，模型先检索相关的API文档，再基于文档生成准确的API调用代码。这种方式让模型能够适应API的频繁更新，始终生成符合最新文档的调用。


## 关键创新

构建了大规模API调用基准数据集APIBench；检索增强微调显著减少API调用幻觉；模型能适应API文档的版本更新；提出了API调用正确性的系统化评估方法。


## 深远影响

Gorilla推动了LLM在实际软件开发中的应用，展示了检索增强在代码生成和API调用场景中的独特价值。为后续的代码Agent和开发工具奠定了基础。


## 启发与思考

Gorilla的成功表明，结合最新文档的检索增强比单纯依赖模型记忆更可靠。这对于任何需要调用外部系统的AI应用都是重要启示：让AI查阅文档再行动，而非凭记忆行事。
