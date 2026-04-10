---
layout: post
title: 'Interview: 量化中INT4和FP8各适合什么场景？为什么有些层不能量化？'
category: interviews
tags: [量化, INT4, FP8, 模型压缩, 数值精度]
difficulty: "高级"
question_id: 51
permalink: /interviews/2026-04-10-051
---

## 题目解析

本题考察对不同量化格式的深入理解。INT4是均匀量化，只有16个离散值，适合权重分布均匀的场景；FP8保留了浮点的动态范围，分为E4M3和E5M2两种格式，更适合激活值量化。关键在于理解不同数值格式对精度-效率trade-off的影响。


## 解答思路

INT4适合权重量化，因为权重分布相对稳定且近似正态分布，可通过缩放因子有效映射。FP8适合激活值量化，因为激活值的动态范围大且含有离群值(outlier)。某些层不能量化的原因：1）注意力层的QK点积对精度极敏感，微小误差会被softmax放大；2）LayerNorm层的统计量计算需要高精度；3）模型的第一层和最后一层承载了输入映射和输出概率分布，量化损失最大。GPTQ等方法通过Hessian矩阵识别这些敏感层。


## 关键要点

1. INT4：16个值，需要group quantization缓解精度损失，每组通常64或128个元素共享scale/zero-point
2. FP8 E4M3：4位指数3位尾数，适合前向推理；E5M2：5位指数2位尾数，适合反向传播梯度
3. 混合精度量化(Mixed-Precision)是实践中的主流策略，敏感层保持FP16
4. 激活值的outlier问题是量化的核心挑战，SmoothQuant通过数学等价变换将难度从激活转移到权重


## 加分回答

可以提到NVIDIA H100原生支持FP8，相比INT8在transformer推理上性能接近但精度损失更小。还可以讨论最新的AQLM和QuIP#等方法如何通过格点量化(lattice quantization)突破INT4的精度瓶颈，以及为什么MoE模型的量化比dense模型更难——因为不同expert的权重分布差异极大。


## 常见踩坑

1. 误以为INT4一定比FP8差——在纯权重量化场景INT4的压缩比更高且精度可接受
2. 忽略量化的校准数据选择对结果的巨大影响
3. 混淆量化训练(QAT)和训练后量化(PTQ)的适用场景
