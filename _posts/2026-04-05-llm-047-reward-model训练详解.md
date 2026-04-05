---
layout: post
title: "Reward Model训练详解"
category: llm
tags: [Reward Model, 奖励模型, 偏好学习, Bradley-Terry]
topic_id: 47
permalink: /llm/2026-04-05-047
---

## 一句话总结

奖励模型通过学习人类偏好对的排序关系，为强化学习提供可微分的奖励信号，其质量直接决定RLHF的效果上限。


## 核心概念

奖励模型(RM)通常在SFT模型基础上，将最后一层替换为标量输出头(线性层输出单个数值)。训练使用Bradley-Terry排序模型：给定同一prompt下的chosen和rejected回复对，RM应给chosen更高分数。损失函数为：L = -log(sigmoid(r_chosen - r_rejected))，即最大化chosen和rejected分数之差。数据格式为三元组(prompt, chosen, rejected)，其中偏好由人类标注或AI标注(如GPT-4)给出。


## 为什么重要

RM是RLHF的核心组件——它将模糊的人类偏好转化为精确的数值信号。RM的偏差会被RL放大：如果RM偏好长回复，RL优化后模型就会输出冗长内容。因此RM的准确性和鲁棒性直接决定最终模型质量。


## 实践要点

数据规模建议50K-500K偏好对。RM通常用与策略模型同规模或更小的模型。训练1个epoch为主避免过拟合。评估RM时关注偏好准确率(应>65%)和校准度(分数差与人类确信度的相关性)。可使用margin loss：对高确信度的偏好对增加loss权重。建议对RM输出做归一化避免分数漂移。


## 常见误区

误区一：RM训练数据只包含明显好坏对比。实际应包含难区分的case，否则RM在边界情况上表现差。误区二：过度训练RM导致过拟合训练集的标注偏差。误区三：忽视RM的长度偏差。如不控制，RM往往倾向于给长回复更高分，导致RL后模型过度冗长。建议在训练数据中控制chosen和rejected的长度分布。
