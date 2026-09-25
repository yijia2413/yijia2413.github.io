---
layout: post
title: "Paper: RedPajama: An Open Dataset for Training LLMs"
category: papers
tags: [开源数据, LLaMA复现, 数据透明]
authors: "Together AI, 2023"
paper_id: 37
permalink: /papers/2026-08-03-037
---
## 一句话概括

RedPajama是一个开源的预训练数据集项目，旨在忠实复现LLaMA的训练数据组成和配比，全力推动LLM训练的透明化和完全可复现性。


## 核心思想

LLaMA虽然开源了模型权重，但训练数据并未完全公开，这限制了社区的深入研究。RedPajama项目的核心目标是根据LLaMA论文中描述的数据来源和配比，从公开可获取的源头重新构建一个等价的1.2万亿token数据集。数据来源包括CommonCrawl网页、C4、GitHub代码、Wikipedia、Books、ArXiv论文和StackExchange问答，每个来源都严格按照LLaMA的比例进行混合。后续的RedPajama-V2进一步将规模扩展到30万亿token。


## 关键创新

1) 作为首个系统性复现商业级LLM训练数据的开源项目，填补了关键空白；2) 提供了完整详细的数据处理流程文档，极大增强了可复现性；3) RedPajama-V2引入了质量信号标注体系，方便用户根据需求自主筛选数据。


## 深远影响

RedPajama有力推动了开源LLM生态的完善——不仅模型权重要开源，训练数据也要透明公开。它被OpenLLaMA、MPT等多个重要模型用于训练，显著加速了开源社区的创新步伐。


## 启发与思考

真正的开源不只是模型权重的开放，还包括训练数据、处理代码和评估方法的完整透明。RedPajama深刻体现了开源社区的协作精神：当一个关键环节缺失时，社区会自发组织力量来填补这一空白。
