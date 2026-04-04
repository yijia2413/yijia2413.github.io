---
layout: post
title: 'Interview: 多轮对话训练中loss计算策略的深度分析'
category: interviews
tags: [多轮对话, loss mask, SFT, 训练策略]
difficulty: "中级"
question_id: 45
permalink: /interviews/2026-04-04-045
---

## 题目解析

多轮对话SFT时，是否对所有轮次回复都计算loss直接影响训练效率和模型行为，但业界实践并不统一，需要深入分析权衡。


## 解答思路

两种策略：1. 只对最后一轮回复计算loss——认为之前的轮次是上下文，只需要学习最终回答；2. 对所有轮次的assistant回复都计算loss——最大化利用每条训练数据。推荐策略是对所有assistant回复都计算loss，但mask掉user和system部分。原因：1. 数据利用效率更高——一条5轮对话等价于5条训练样本；2. 模型能学习到在对话不同阶段的合适回复方式；3. 早期轮次的回复通常更简短，有助于模型学习简洁回答的能力。


## 关键要点

1. 绝对不能对user部分计算loss，否则模型会学习模仿用户；2. System prompt部分也应该mask；3. 对所有assistant轮次计算loss时，各轮次的权重可以相同也可以递增(侧重后期轮次)；4. Loss mask的实现需要精确对齐token位置。


## 加分回答

进阶做法：根据每轮回复的质量给不同的loss权重——高质量回复高权重，低质量回复低权重或直接跳过。另外在packing(将多条短对话拼接为一条长序列)场景下，需要特别注意不同对话之间的attention mask，避免跨对话的信息泄露。


## 常见踩坑

最严重的坑是loss mask实现错误——off-by-one导致model学到了user的最后一个token或没学到assistant的第一个token。调试建议：打印loss mask和token的对齐情况来验证正确性。
