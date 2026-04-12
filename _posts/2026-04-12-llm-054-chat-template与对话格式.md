---
layout: post
title: "Chat Template与对话格式"
category: llm
tags: [Chat Template, 对话格式, Tokenizer, 特殊标记]
topic_id: 54
permalink: /llm/2026-04-12-054
---

## 一句话总结

Chat Template定义了多轮对话中不同角色消息的组织格式，是模型正确理解对话结构的基础。


## 核心概念

不同模型使用不同的对话格式：ChatML格式用<|im_start|>和<|im_end|>标记消息边界；Llama-2使用[INST]和[/INST]标记；Mistral/Zephyr有各自的模板。HuggingFace的tokenizer.apply_chat_template()方法用Jinja2模板统一处理。关键元素包括：系统提示(system)、用户消息(user)、助手回复(assistant)的标记和分隔方式。


## 为什么重要

使用错误的对话格式会导致模型行为异常，输出质量严重下降。推理时必须使用与训练时一致的模板，这是部署中最常见的错误之一。格式不匹配时模型可能产生乱码或无法停止生成。


## 实践要点

始终使用模型官方提供的Chat Template；自定义微调时在tokenizer_config.json中正确设置chat_template字段；注意特殊token的添加和EOS token的正确使用。测试时打印完整的编码后文本确认格式正确。


## 常见误区

误区一：所有模型用同一套对话格式即可——不同模型训练时使用的格式不同，混用会严重影响效果。误区二：忽略BOS/EOS token的处理——这些特殊标记对模型的生成控制至关重要。
