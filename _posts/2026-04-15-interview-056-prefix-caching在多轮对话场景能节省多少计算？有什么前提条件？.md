---
layout: post
title: 'Interview: Prefix Caching在多轮对话场景能节省多少计算？有什么前提条件？'
category: interviews
tags: [Prefix Caching, KV Cache复用, 多轮对话, System Prompt, 推理优化]
difficulty: "中级"
question_id: 56
permalink: /interviews/2026-04-15-056
---

## 题目解析

Prefix Caching指对相同前缀的请求复用已计算好的KV Cache，避免重复计算。在多轮对话中，每轮的前缀包含system prompt和之前所有轮次的对话历史，这部分是完全相同的，可以被缓存和复用。这道题考察对KV Cache复用条件和收益的深入理解。


## 解答思路

计算节省分析：假设system prompt 1000 token，前3轮历史2000 token，新一轮用户输入100 token。无Prefix Caching时需要计算3100 token的prefill；有缓存时只需计算100 token的prefill，节省约97%的prefill计算量。多轮对话中第N轮的节省比例约为(total_prefix_len)/(total_prefix_len + new_input_len)。前提条件：1）前缀必须严格逐token匹配，任何modification都会使缓存失效；2）需要足够的显存存储缓存的KV；3）缓存淘汰策略(LRU等)要合理设计。


## 关键要点

1. 最大受益场景：长system prompt + 短用户输入，节省可达90%以上
2. SGLang的RadixAttention用前缀树管理缓存，支持部分匹配，比vLLM的hash-based方案更灵活
3. 缓存粒度影响效率：token级别最精确但管理开销大，block级别(如16 token)是实际选择
4. 多用户场景下，共享的system prompt缓存价值最大，个性化历史缓存命中率低


## 加分回答

可以讨论Prefix Caching与投机解码的结合：缓存的KV可以作为投机解码的验证context，进一步加速。还可以分析在分布式推理中跨节点的缓存共享问题，以及缓存预热(warm-up)策略对冷启动延迟的影响。另外prompt engineering中的prompt顺序也会影响缓存命中率。


## 常见踩坑

1. 忽略了缓存占用的显存——缓存太多前缀可能导致可用于新请求的显存不足
2. 误以为语义相似的前缀也能复用——必须是逐token精确匹配
3. 没有考虑缓存的时效性——对话间隔太长缓存可能已被淘汰
