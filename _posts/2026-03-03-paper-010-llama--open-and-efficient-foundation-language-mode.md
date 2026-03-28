---
layout: post
title: "Paper: LLaMA: Open and Efficient Foundation Language Models"
category: papers
tags: [LLaMA, 开源, 高效, 基础模型]
authors: "Touvron et al., 2023"
paper_id: 10
permalink: /papers/2026-03-03-010
arxiv: '2302.13971'
---

> **Authors**: Touvron et al., 2023



> **arxiv**: [2302.13971](https://arxiv.org/abs/2302.13971)



---



## 一句话概括

LLaMA以较小的模型规模（7B至65B）通过在大量数据上充分训练，在开源社区实现了接近甚至匹敌闭源大模型的强劲性能。


## 核心思想

坚定遵循Chinchilla的计算最优理念，在1.4万亿token的公开数据上充分训练不同规模（7B、13B、33B、65B）的模型。架构上采用了Pre-RMSNorm、SwiGLU激活函数、RoPE旋转位置编码等经过社区验证的最佳实践。LLaMA-13B在多数基准上超越了GPT-3（175B），LLaMA-65B的性能与Chinchilla-70B和PaLM-540B不相上下。


## 关键创新

以实践证明了开源小模型通过充分训练可以匹敌闭源大模型；系统整合了RoPE、SwiGLU、Pre-RMSNorm等架构最佳实践；训练完全使用公开可获取的数据，保证了可复现性；开放模型权重极大促进了全球社区的研究创新。


## 深远影响

引发了开源大模型的爆发式发展浪潮，Alpaca、Vicuna、Llama-2、Llama-3等大量有影响力的工作基于此展开。从根本上降低了大模型研究和应用的门槛，使学术界和中小企业也能参与其中。深刻改变了大模型领域开源与闭源的行业竞争格局。


## 启发与思考

开放科学能推动更快、更广泛的技术进步。小而精的模型在实际部署和应用中可能比庞大模型更有实用价值。LLaMA有力证明了技术民主化的巨大力量——当优秀的基础模型被开源后，整个生态系统和社区都会从中受益并加速发展。
