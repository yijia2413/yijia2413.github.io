---
layout: post
title: 'Interview: 设计日均百万请求的LLM推理服务架构'
category: interviews
tags: [系统设计, 推理服务, 高并发, 架构设计]
difficulty: "高级"
question_id: 101
permalink: /interviews/2026-06-07-101
---

## 题目解析

本题考察候选人对大规模LLM推理服务的整体架构设计能力，需要综合考虑吞吐、延迟、成本和可用性之间的权衡。日均100万请求意味着峰值QPS可能达到50-100，每个请求可能耗时数秒，对GPU资源和调度能力要求极高。这类系统的设计需要深入理解LLM推理的特殊性质。


## 解答思路

核心架构分为接入层、调度层和推理层。接入层负责限流、鉴权和请求分级；调度层实现请求队列管理、动态批处理（continuous batching）和优先级调度；推理层部署多个推理实例，采用Tensor Parallelism或Pipeline Parallelism。关键决策包括KV Cache管理策略（如PagedAttention）、批处理粒度和GPU显存分配方案。还需要设计完善的监控告警体系。


## 关键要点

瓶颈主要在GPU显存和计算：长序列的KV Cache占用大量显存，decode阶段是memory-bound的。需要引入vLLM等框架的PagedAttention技术，通过分页管理KV Cache提升显存利用率。同时需要设计合理的SLO分级，区分实时请求和离线批量请求，对不同优先级采用差异化的调度策略。


## 加分回答

提到预测性自动扩缩容、基于请求长度的智能路由、Speculative Decoding加速、多级缓存（Prompt Cache和Semantic Cache）、以及A/B测试框架支持模型灰度发布等高级话题。还可以讨论多区域部署和容灾方案。


## 常见踩坑

只关注单卡推理性能而忽略系统层面的调度优化；未考虑长尾请求（超长输出）对整体吞吐的影响；忽略了冷启动和模型加载时间对可用性的影响；未设计优雅降级策略导致流量高峰时全面崩溃。
