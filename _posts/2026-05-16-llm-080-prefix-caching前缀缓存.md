---
layout: post
title: "Prefix Caching前缀缓存"
category: llm
tags: [前缀缓存, KV cache, 推理优化, 系统提示]
topic_id: 80
permalink: /llm/2026-05-16-080
---

## 一句话总结

Prefix Caching将多个请求共享的前缀部分的KV Cache缓存复用，避免重复计算，显著降低首token延迟和计算成本。


## 核心概念

多个请求通常共享相同的System Prompt或Few-shot示例，这些公共前缀的KV Cache可以计算一次后复用。实现方式包括Radix Tree管理缓存键、LRU淘汰策略和基于哈希的缓存匹配。vLLM的Automatic Prefix Caching自动检测共享前缀。SGLang通过RadixAttention实现高效的前缀复用。


## 为什么重要

实际部署中System Prompt可达数千token，每次请求重复计算造成巨大浪费。Prefix Caching可以将TTFT降低50%以上，吞吐量提升数倍，特别是在长system prompt和few-shot场景下效果显著。


## 实践要点

将固定内容放在prompt最前面以最大化缓存命中率。保持system prompt的一致性避免缓存失效。合理设置缓存大小和淘汰策略。监控缓存命中率评估优化效果。多租户场景按租户分组管理缓存。


## 常见误区

误以为任意位置的重复文本都能被缓存，实际只有前缀部分可以。忽视缓存占用的额外显存。认为缓存永远有效，实际上prompt微小变化就会导致缓存失效。
