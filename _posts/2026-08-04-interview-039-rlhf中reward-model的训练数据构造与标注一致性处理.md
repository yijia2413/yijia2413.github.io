---
layout: post
title: 'Interview: RLHF中Reward Model的训练数据构造与标注一致性处理'
category: interviews
tags: [RLHF, Reward Model, 偏好数据, 标注一致性]
difficulty: "高级"
question_id: 39
permalink: /interviews/2026-08-04-039
---

## 题目解析

Reward Model的质量直接决定RLHF的效果上限。训练数据的构造方式和标注者之间的不一致性是实践中最核心的挑战。


## 解答思路

RM训练数据构造流程：1. 用SFT模型对同一prompt生成K个回复(通常K=4-9)；2. 标注者对回复做排序或两两比较；3. 将排序转化为偏好对(chosen, rejected)用Bradley-Terry模型训练。标注一致性问题解决方案：1. 详细的标注规范(Annotation Guideline)，明确各维度的优先级(安全>有用>无害)；2. 多人标注同一样本取多数投票；3. 计算标注者间一致性(Cohen's Kappa或Fleiss' Kappa)，剔除低一致性样本；4. 分维度标注后加权融合。


## 关键要点

1. 偏好对的质量比数量重要，模糊样本应丢弃而非强行标注；2. RM的泛化能力受限于偏好对的分布；3. 标注偏差(如偏好长回答)会被RM放大；4. RM的过拟合比SFT更危险，因为PPO会exploit任何RM的弱点。


## 加分回答

可以训练多个RM组成ensemble来提高鲁棒性。另外Anthropic的做法是区分"明确偏好"和"微弱偏好"，给不同的margin。还可以用AI标注(如Constitutional AI)辅助人工标注来降低成本，但需要人工做质量审核。


## 常见踩坑

最大的坑是让RM在分布外的prompt上打分——RM的泛化能力有限，超出训练分布会给出不可靠的分数。另一个坑是忽略标注者的系统性偏差(如某些标注者始终偏好安全回答)。
