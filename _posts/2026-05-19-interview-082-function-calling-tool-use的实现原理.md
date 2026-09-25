---
layout: post
title: 'Interview: Function Calling/Tool Use的实现原理'
category: interviews
tags: [Function Calling, Tool Use, 微调, API设计]
difficulty: "中级"
question_id: 82
permalink: /interviews/2026-05-19-082
---

## 题目解析

Function Calling是当前Agent系统的基石能力。面试官不只想听API用法，而是想了解模型内部是如何学会识别调用时机、选择正确函数并生成合法参数的。


## 解答思路

Function Calling的实现有两个层面：(1)训练层面——模型在SFT阶段被喂入大量function calling的标注数据，格式通常是将可用函数的schema拼入system prompt，模型学会在需要调用工具时生成特殊格式的输出(如JSON格式的函数名+参数)。训练数据中包含何时该调用、何时不该调用的正负样本；(2)推理层面——API服务端实现了特殊的解析逻辑，检测模型输出中的函数调用标记，暂停生成，执行函数，将结果注入上下文后继续生成。


## 关键要点

核心挑战在于：参数类型约束——模型需要生成符合schema的JSON；多函数选择——在几十个可用函数中选择正确的那个；嵌套调用——一个函数的输出作为另一个函数的输入。GPT的实现中function schema会被转换为特殊token序列，经过专门的fine-tuning让模型理解这种结构。


## 加分回答

可以对比Anthropic的Tool Use和OpenAI的Function Calling在设计理念上的差异。还可以讨论Gorilla项目如何通过大规模API调用数据训练专门的tool-use模型，以及ToolBench等基准如何评估tool use能力。开源模型中可以提及Qwen的tool calling训练方法。


## 常见踩坑

常见误解是认为Function Calling是一个独立模块——实际上它就是模型文本生成能力的特化，本质仍是next token prediction。另一个错误是忽略了并行函数调用和顺序函数调用的区别，以及函数调用失败后的重试策略。
