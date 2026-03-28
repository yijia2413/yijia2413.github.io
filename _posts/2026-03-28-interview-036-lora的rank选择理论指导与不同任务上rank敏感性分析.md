---
layout: post
title: 'Interview: LoRA的rank选择理论指导与不同任务上rank敏感性分析'
category: interviews
tags: [LoRA, 低秩适配, rank选择, 参数高效微调]
difficulty: "高级"
question_id: 36
permalink: /interviews/2026-03-28-036
---

## 题目解析

LoRA的rank是最关键的超参数，直接决定了可学习参数量和表达能力。理解不同任务对rank的敏感性，能指导实际工程中的高效选择。


## 解答思路

理论上，LoRA假设微调的权重更新矩阵ΔW是低秩的。rank的选择取决于任务与预训练分布的偏移程度：偏移越大需要越高的rank。经验规则：简单格式适配任务rank=8-16即可；复杂推理或领域适配任务rank=64-256效果更好。关键差异体现在：1. 知识密集型任务(医疗QA)对rank更敏感，需要高rank；2. 格式转换任务(JSON输出)低rank即可；3. 数学/代码任务中rank=8到rank=128的差异显著。


## 关键要点

1. rank不是越大越好，过大的rank在小数据集上会过拟合；2. 不同层对rank的需求不同，Attention层通常比FFN层需要更高rank；3. rank和alpha(缩放系数)需要联合调整，常见设置alpha=2*rank；4. 可以对不同模块设置不同的rank(非对称LoRA)。


## 加分回答

AdaLoRA通过SVD分解动态调整每层的rank，让重要层获得更多参数预算。另外可以先用较大rank训练，再通过SVD截断找到有效rank来确定最小必要rank。PiSSA方法初始化LoRA为主成分方向，比随机初始化收敛更快。


## 常见踩坑

最常见的错误是固定alpha不变只调rank——alpha/rank的比值才是实际的缩放因子，改rank不改alpha会隐式改变学习率。另一个坑是用验证集loss选rank而非用下游任务指标。
