---
layout: post
title: "结构化输出（JSON Mode/Grammar）"
category: llm
tags: [结构化输出, JSON mode, grammar, 约束解码]
topic_id: 77
permalink: /llm/2026-05-13-077
---

## 一句话总结

结构化输出技术通过约束解码过程，确保LLM生成符合预定格式（如JSON、XML）的输出，提升下游系统集成的可靠性。


## 核心概念

JSON Mode在解码时强制输出合法JSON格式。Grammar-based Decoding使用上下文无关文法（CFG）或正则表达式约束每一步的token选择，只允许语法合法的token被采样。Outlines和Guidance等库通过修改logits mask实现约束。JSON Schema可以进一步约束字段名、类型和嵌套结构。


## 为什么重要

LLM与外部系统集成时，格式错误会导致解析失败。传统方式依赖prompt工程和后处理，成功率不稳定。结构化输出从根本上保证格式正确性，使LLM可以可靠地作为API后端使用。


## 实践要点

优先使用API提供的原生JSON Mode。复杂格式使用JSON Schema定义约束。Grammar方式可能略微降低生成质量，需要权衡。对性能敏感场景注意约束解码的额外开销。配合few-shot示例提升字段内容质量。


## 常见误区

误以为JSON Mode能保证语义正确，实际只保证格式合法。忽视约束过严会导致模型无法表达最优答案。认为所有模型都支持结构化输出，实际需要特定推理引擎支持。
