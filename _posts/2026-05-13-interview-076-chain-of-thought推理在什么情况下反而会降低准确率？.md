---
layout: post
title: 'Interview: Chain-of-Thought推理在什么情况下反而会降低准确率？'
category: interviews
tags: [Chain-of-Thought, CoT, 推理失败, prompt engineering]
difficulty: "高级"
question_id: 76
permalink: /interviews/2026-05-13-076
---

## 题目解析

这道题考察对CoT局限性的深入理解。很多人只知道CoT能提升推理能力，但不清楚它在多种场景下反而有害。面试官想看到你对CoT的理性认知，而非一味推崇。


## 解答思路

CoT降低准确率的场景主要有：(1)简单事实检索类问题——模型本可直接回忆答案，CoT引入的中间步骤反而带来累积误差，例如"法国首都是哪？"加CoT后模型可能绕弯路出错；(2)小模型上使用CoT——研究表明参数量低于约60B的模型CoT效果不稳定甚至负面，因为小模型无法可靠执行多步逻辑；(3)CoT的忠实性问题——模型生成的推理链可能是事后合理化而非真实推理过程，导致看似合理但结论错误的输出。


## 关键要点

CoT本质是用更多token换取推理空间，但更多token也意味着更多出错机会。Wei et al.的原始论文就指出CoT在简单任务上无增益。另外CoT对prompt措辞极度敏感，同一问题不同CoT模板可能导致截然不同的结果。关键判断标准：任务是否真正需要多步推理。


## 加分回答

可以提到Faithful CoT和CoT Faithfulness的研究，说明模型的推理链与实际计算路径可能不一致。还可以引用Turpin et al.(2023)的研究，证明CoT可以被biased exemplars误导，模型会在推理链中编造理由来支持有偏的结论。


## 常见踩坑

最常见的错误是认为CoT总是有益的，或者认为只要推理链看起来合理结果就一定正确。另一个陷阱是忽略CoT的计算成本——在延迟敏感场景中，CoT的额外token生成可能无法接受。
