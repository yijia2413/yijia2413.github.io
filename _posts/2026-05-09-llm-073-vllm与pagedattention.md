---
layout: post
title: "vLLM与PagedAttention"
category: llm
tags: [vLLM, PagedAttention, 连续批处理, 高吞吐推理]
topic_id: 73
permalink: /llm/2026-05-09-073
---

## 一句话总结

vLLM通过PagedAttention技术以类似操作系统虚拟内存的方式管理KV Cache，实现了近乎零浪费的显存利用和高吞吐推理服务。


## 核心概念

PagedAttention的核心创新：将KV Cache分成固定大小的块(Block)，像操作系统管理虚拟内存页一样动态分配和回收。解决的问题：传统方案需要为每个请求预分配最大序列长度的连续显存，导致60-80%的显存浪费。vLLM还实现了：连续批处理(Continuous Batching)——请求完成后立即让新请求加入，不必等待整个batch完成；前缀缓存(Prefix Caching)——共享相同前缀的请求复用KV Cache；Tensor并行支持多GPU推理。


## 为什么重要

vLLM将LLM推理吞吐量提升了2-4倍，是目前最流行的开源LLM推理框架。其高效的显存管理让同一块GPU可以服务更多并发请求，直接降低了部署成本。API兼容OpenAI格式使迁移成本极低。


## 实践要点

通过--gpu-memory-utilization控制显存使用比例(默认0.9)；使用--max-model-len限制最大序列长度；开启前缀缓存(--enable-prefix-caching)对共享System Prompt的场景效果显著。支持AWQ/GPTQ量化模型的直接加载。


## 常见误区

误区一：vLLM只提升吞吐量不改善延迟——Continuous Batching也能显著降低排队延迟。误区二：vLLM适合所有场景——对于单条低延迟需求，轻量级框架可能更合适。
