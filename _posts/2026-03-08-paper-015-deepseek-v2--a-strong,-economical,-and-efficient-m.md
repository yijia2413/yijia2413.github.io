---
layout: post
title: "Paper: DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model"
category: papers
tags: [DeepSeek, MoE, MLA, 高效推理]
authors: "DeepSeek-AI, 2024"
paper_id: 15
permalink: /papers/2026-03-08-015
arxiv: '2405.04434'
---

> **Authors**: DeepSeek-AI, 2024



> **arxiv**: [2405.04434](https://arxiv.org/abs/2405.04434)



---



## 一句话概括

DeepSeek-V2通过创新的多头潜在注意力（MLA）和细粒度MoE专家设计，在保持顶级性能的同时实现了训练和推理成本的大幅降低。


## 核心思想

提出多头潜在注意力（MLA），将Key和Value缓存压缩到低维潜在空间，大幅减少推理时的KV缓存内存占用。同时采用细粒度的MoE设计，将传统的少量大专家拆分为160个小专家（每次激活6个），比粗粒度MoE实现更灵活精细的专家组合和更均匀的负载分配。总参数236B但每个token仅需激活21B参数，在保持强劲性能的同时显著降低了部署和运行成本。


## 关键创新

MLA通过低秩投影压缩将KV缓存减少至原来的5-13%，大幅降低显存占用；细粒度MoE实现了更灵活的专家路由组合和更均匀的负载分配；提出了辅助损失free的负载均衡策略，避免了传统辅助损失对模型性能的干扰；整体实现了极具竞争力的性价比。


## 深远影响

MLA成为大模型推理优化的关键创新技术，被后续的DeepSeek-V3和DeepSeek-R1继承采用。其经济高效的设计理念深刻影响了行业对大模型部署成本控制的思考。有力证明了中国AI公司在基础架构创新方面的国际竞争力。


## 启发与思考

推理效率的真正优化需要从架构层面进行根本性的重新思考。KV缓存是推理的核心瓶颈所在，低秩压缩是一个数学上优雅、工程上实用的解决方案。模型设计必须同时考虑训练性能和实际部署成本，而非只在基准测试上追求极致分数。
