---
layout: post
title: "Interview: 预训练loss突然出现spike，你的排查思路和应对策略是什么？"
category: interviews
tags: [训练调试, loss spike, 训练稳定性, 工程实践]
difficulty: "高级"
question_id: 21
permalink: /interviews/2026-03-13-021
---

## 题目解析

Loss spike是大模型预训练中最常见也最让人头痛的问题。一次severe spike可能导致数天的训练时间浪费。这道题考察候选人的工程实战经验和问题排查的系统性思维。面试官想知道你是否真正参与过大模型训练，能否在压力下做出正确判断。


## 解答思路

排查思路按优先级：(1)首先检查数据——当前batch是否包含异常数据（如乱码、超长序列、重复pattern），这是最常见的原因；(2)检查梯度——是否出现梯度爆炸（grad norm突增），查看各层梯度分布；(3)检查学习率——当前lr schedule是否正常，是否在warmup或decay阶段的关键转折点；(4)检查硬件——是否有GPU异常、NaN出现、通信错误。


## 关键要点

应对策略的选择取决于spike的严重程度：(1)轻微spike（loss上升不到2倍后自行恢复）——通常由数据噪声引起，可以观察是否在几百步内自行恢复，无需干预；(2)中等spike（loss上升显著但未发散）——跳过当前batch或回退到最近的checkpoint继续训练；(3)严重spike（loss发散到NaN/Inf）——必须从checkpoint重启，可能需要降低学习率或增大gradient clipping阈值。预防措施：定期保存checkpoint、数据质量过滤、gradient clipping设为合理值（通常1.0）。


## 加分回答

提到PaLM论文中的做法：遇到spike时直接从spike之前的checkpoint重启，并跳过导致spike的约200个batch的数据。这暗示spike的原因往往是特定的有毒数据。还可以讨论z-loss（对logits施加正则化，如PaLM使用的10⁻⁴·log²Z）来预防softmax的数值不稳定。以及gradient clipping的选择：按global norm还是per-parameter norm。


## 常见踩坑

最大的坑是遇到spike就立刻降低学习率重训——应该先诊断原因，可能只是数据问题，降lr会浪费之前的训练进度。另一个错误是没有checkpoint保存策略，导致spike发生后无法回退。也有人不知道gradient clipping的存在或设置了不合理的阈值。实际工程中，每隔几千步保存checkpoint、监控grad norm和loss曲线是基本操作。
