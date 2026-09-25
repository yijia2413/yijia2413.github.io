---
layout: post
title: 'Interview: Agent场景中Prompt Engineering vs Fine-tuning的边界'
category: interviews
tags: [Prompt Engineering, Fine-tuning, Agent, 工程决策]
difficulty: "中级"
question_id: 95
permalink: /interviews/2026-06-01-095
---

## 题目解析

在Agent开发中，何时用Prompt何时用Fine-tuning是一个关键的工程决策。面试官希望你能给出清晰的决策框架而非模糊的"视情况而定"。


## 解答思路

Prompt Engineering更适合的场景：(1)任务定义频繁变化——Agent的工具集和行为规则可能随时调整，prompt修改零成本；(2)需要即时部署——没有时间和数据做微调；(3)通用能力为主——任务主要需要模型的通用理解和推理能力。Fine-tuning更适合的场景：(1)特定格式输出——如Agent需要严格遵循特定的JSON schema做function calling，微调后compliance rate更高；(2)领域专业性——Agent需要深入理解特定领域的术语和规则；(3)效率要求——微调后可以用更短的prompt达到相同效果，降低推理成本。


## 关键要点

Agent场景的特殊性在于：(1)prompt已经很长(system prompt+工具描述+历史交互)，再加few-shot示例可能超出上下文窗口，此时微调优势明显；(2)Agent需要在多轮交互中保持一致的行为模式，微调比prompt约束更稳定；(3)Agent的错误成本高(可能执行不可逆操作)，微调可以更精细地控制行为边界。


## 加分回答

可以提出混合策略：先用prompt快速迭代验证Agent设计，确认有效后收集交互数据做微调固化。还可以讨论LoRA等高效微调方法如何降低Agent微调的门槛，以及使用模型蒸馏将大模型Agent的能力迁移到可微调的小模型上。


## 常见踩坑

常见错误是过早微调——在Agent的行为规范还没稳定时就投入微调，导致反复训练浪费资源。另一个坑是认为微调能解决prompt解决不了的问题——如果模型基础能力不足，微调也很难弥补。还有人忽略了微调的数据质量要求——低质量的Agent交互数据微调后可能让Agent行为更差。
