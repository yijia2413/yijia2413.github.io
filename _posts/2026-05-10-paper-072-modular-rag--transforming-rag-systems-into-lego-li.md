---
layout: post
title: "Paper: Modular RAG: Transforming RAG Systems into LEGO-like Reconfigurable Frameworks"
category: papers
tags: [模块化RAG, 系统设计, 可重构架构, RAG流程编排]
authors: "Gao et al., 2024"
paper_id: 72
permalink: /papers/2026-05-10-072
arxiv: '2407.21059'
---
## 一句话概括

模块化RAG将RAG系统解构为可重组的独立模块，如同乐高积木一样灵活组装，支持多样化的RAG流程编排。


## 核心思想

将RAG系统分解为六类核心模块：索引（Indexing）、预检索（Pre-Retrieval）、检索（Retrieval）、后检索（Post-Retrieval）、生成（Generation）和编排（Orchestration）。每个模块内包含多种可选组件，用户可根据具体需求自由组合。编排模块定义了模块间的交互方式，包括线性、分支、循环和自适应等模式。


## 关键创新

提出RAG系统的标准化模块分解框架；六类模块覆盖RAG全流程；灵活的编排模式支持多样化流程设计；从工程架构角度系统化RAG系统设计方法论。


## 深远影响

模块化RAG为RAG系统设计提供了标准化语言和框架，使得不同RAG方法的比较和组合变得更加系统化。推动了RAG框架（如LangChain、LlamaIndex）的模块化设计趋势。


## 启发与思考

模块化思维是复杂系统工程的核心。将RAG系统视为可插拔模块的组合，既便于理解现有系统的优缺点，也便于针对性地改进特定环节。这种思维方式对实际RAG系统的开发和维护极为重要。
