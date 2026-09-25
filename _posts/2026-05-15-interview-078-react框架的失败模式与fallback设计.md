---
layout: post
title: 'Interview: ReAct框架的失败模式与fallback设计'
category: interviews
tags: [ReAct, Agent, 失败模式, fallback, 鲁棒性]
difficulty: "高级"
question_id: 78
permalink: /interviews/2026-05-15-078
---

## 题目解析

ReAct是Agent领域最经典的框架之一，但在实际部署中失败率很高。此题考察你是否有真实的Agent开发经验，能否识别典型失败模式并设计有效的容错机制。


## 解答思路

ReAct的典型失败模式包括：(1)无限循环——Agent反复执行相同Action却期望不同Observation，常见于搜索查询未找到结果时；(2)幻觉Action——模型生成不存在的工具名称或参数格式错误；(3)推理链漂移——随着对话轮次增加，Thought逐渐偏离原始目标；(4)Observation过载——返回信息过长导致上下文窗口溢出或关键信息被淹没；(5)过早终止——模型在未完成任务时错误地给出最终答案。


## 关键要点

Fallback设计策略：设置最大循环次数硬限制；实现Action白名单和参数校验层；引入摘要机制压缩历史Observation；添加自检Thought步骤让Agent周期性评估进度；设计graceful degradation路径，当Agent无法完成时返回部分结果而非报错。


## 加分回答

可以提到LATS(Language Agent Tree Search)框架将ReAct与蒙特卡洛树搜索结合，通过回溯机制解决线性ReAct的不可逆问题。还可以讨论在ReAct循环中嵌入critic模型来评估每一步Action的合理性。


## 常见踩坑

最常见的错误是只关注happy path而忽略异常处理。另一个陷阱是将所有Observation原文塞入上下文，实际工程中必须对Observation做截断或摘要。还有人忽略了超时机制——外部工具调用可能hang住整个Agent循环。
