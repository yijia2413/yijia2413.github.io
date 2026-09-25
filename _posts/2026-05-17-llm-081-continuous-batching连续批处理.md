---
layout: post
title: "Continuous Batching连续批处理"
category: llm
tags: [continuous batching, 推理优化, 吞吐量, 动态批处理]
topic_id: 81
permalink: /llm/2026-05-17-081
---

## 一句话总结

Continuous Batching（连续批处理）允许在batch中的某个请求完成后立即插入新请求，避免静态批处理中短请求等待长请求的资源浪费。


## 核心概念

传统Static Batching中，一个batch必须等所有请求都生成完毕才能处理下一个batch，导致短序列padding浪费。Continuous Batching（也称Iteration-level Scheduling）在每个解码步骤检查是否有请求完成，完成的请求立即释放资源并被新请求替换。Orca论文首次提出该方法，vLLM、TGI等框架都已实现。


## 为什么重要

LLM推理是自回归过程，不同请求的输出长度差异很大。Static Batching的GPU利用率可能不到50%。Continuous Batching可以将吞吐量提升2-5倍，是高性能推理服务的基础优化。


## 实践要点

配合PagedAttention使用效果最佳。合理设置最大batch大小平衡延迟和吞吐。监控请求排队时间避免饥饿。设置合理的max_tokens限制防止单个请求占用过长时间。预留一定的显存余量应对突发大batch。


## 常见误区

误以为Continuous Batching能无限提升吞吐量，实际受限于显存和计算资源。忽视batch过大时单个请求延迟增加。认为实现简单，实际上内存管理和调度逻辑相当复杂。
