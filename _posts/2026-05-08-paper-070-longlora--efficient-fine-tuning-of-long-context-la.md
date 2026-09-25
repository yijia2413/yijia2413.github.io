---
layout: post
title: "Paper: LongLoRA: Efficient Fine-tuning of Long-Context Large Language Models"
category: papers
tags: [LongLoRA, 长上下文微调, 移位稀疏注意力, 高效微调]
authors: "Chen et al., 2023"
paper_id: 70
permalink: /papers/2026-05-08-070
arxiv: '2309.12307'
---
## 一句话概括

LongLoRA通过移位稀疏注意力和改进的LoRA策略，以极低的计算成本将LLM的有效上下文长度大幅扩展。


## 核心思想

标准全注意力在长序列上计算成本极高，LongLoRA提出移位稀疏注意力（Shifted Sparse Attention）：在训练时将序列分组分别计算注意力，并通过在不同注意力头之间移位分组边界来实现跨组信息交换。推理时仍使用标准全注意力保证质量。同时发现嵌入层和归一化层也需可训练才能有效扩展上下文。


## 关键创新

移位稀疏注意力大幅降低训练计算成本；训练时稀疏注意力、推理时全注意力的策略兼顾效率与效果；发现LoRA扩展上下文需解冻嵌入层和归一化层；成功将Llama2-7B扩展到100K上下文。


## 深远影响

LongLoRA降低了长上下文模型训练的门槛，使得在单机上即可进行长文本微调。为开源社区快速适配长上下文模型提供了实用工具，推动了长文本LLM的平民化。


## 启发与思考

LongLoRA的训练-推理不对称策略很有创意：训练时用近似方法降低成本，推理时用精确方法保证质量。这种务实的工程思维在RAG系统构建中同样适用。
