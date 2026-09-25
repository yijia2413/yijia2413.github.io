---
layout: post
title: 'Interview: Process Reward Model vs Outcome Reward Model'
category: interviews
tags: [PRM, ORM, Reward Model, 过程监督, 推理验证]
difficulty: "高级"
question_id: 88
permalink: /interviews/2026-05-25-088
---

## 题目解析

PRM和ORM是推理模型训练中两种核心的奖励建模策略。此题考察你对两者差异的深入理解，以及为什么PRM更有效但更难训练。


## 解答思路

ORM(Outcome Reward Model)只对最终结果打分——答案对得高分、错得低分，不关心推理过程。PRM(Process Reward Model)对推理的每一步都打分——即使最终答案错误，正确的中间步骤也能获得正向reward。PRM更有效的原因：(1)提供更密集的reward信号，缓解稀疏奖励问题；(2)可以精准定位推理链中的错误步骤，便于纠正；(3)鼓励正确的推理过程而非碰运气得到正确答案。


## 关键要点

PRM难训练的根本原因是标注成本——需要人工逐步判断每个推理步骤的正确性，比ORM的结果标注贵几十倍。OpenAI的PRM800K数据集就是人工逐步标注的。替代方案：(1)使用蒙特卡洛方法自动估计step-level reward——从某一步出发多次采样，用最终成功率近似该步的质量；(2)使用强模型自动标注弱模型的推理步骤。但自动标注的质量仍不及人工标注。


## 加分回答

可以引用Lightman et al.(2023)的"Let us Verify Step by Step"论文，该工作证明了PRM在数学推理中显著优于ORM。还可以讨论Math-Shepherd等自动化PRM标注方法，以及PRM在Best-of-N采样中的应用——用PRM对多条推理链评分选最优，比用ORM选择效果更好。


## 常见踩坑

常见错误是认为PRM完全替代ORM——实际上二者可以结合使用，ORM保证结果导向，PRM保证过程质量。另一个坑是忽略PRM的标注一致性问题——不同标注者对中间步骤是否"正确"的判断标准可能不一致，这会引入标注噪声。
