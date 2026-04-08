---
layout: post
title: "ORPO/SimPO/KTO新型对齐算法"
category: llm
tags: [ORPO, SimPO, KTO, 对齐算法, 偏好优化]
topic_id: 50
permalink: /llm/2026-04-08-050
---

## 一句话总结

ORPO、SimPO和KTO分别从不同角度改进DPO，解决参考模型依赖、长度偏差和非配对数据利用等问题，代表了对齐算法的最新演进方向。


## 核心概念

ORPO(Odds Ratio Preference Optimization)将SFT和偏好优化合并为一步训练：在标准语言模型损失基础上添加基于odds ratio的偏好项，无需单独的参考模型。SimPO(Simple Preference Optimization)用序列平均对数概率替代DPO中的对数概率比作为隐式奖励，并引入目标奖励间距(target reward margin)，有效解决了DPO的长度偏差问题。KTO(Kahneman-Tversky Optimization)基于前景理论，只需标注回复为好或坏(二分类)，不需要配对比较数据，这使得数据收集成本大幅降低。


## 为什么重要

这些新算法各解决了DPO/RLHF的一个痛点：ORPO简化训练流程减少一半计算量；SimPO改善了输出质量和长度控制；KTO降低了数据标注门槛。它们共同推动对齐技术向更简单、更高效、更实用的方向发展。


## 实践要点

ORPO适合资源有限且数据充足的场景，一步训练省时省力。SimPO在需要精确控制输出长度和质量时表现突出，gamma参数(奖励间距)建议从0.5开始调。KTO适合只有点赞/点踩标注的场景，好坏数据比例建议控制在1:1到1:2之间。实际选型建议：先试DPO作为baseline，再根据具体需求尝试SimPO(追求质量)或KTO(数据限制)。


## 常见误区

误区一：盲目追新算法而忽略数据质量。任何对齐算法都依赖高质量偏好数据。误区二：认为这些算法完全取代了RLHF/PPO。在超大规模和复杂对齐需求下PPO仍有其优势。误区三：不做消融实验直接选用某算法。不同模型、数据和任务下各算法表现差异显著，需要实验验证。
