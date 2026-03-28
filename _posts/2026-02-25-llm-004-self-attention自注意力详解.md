---
layout: post
title: "Self-Attention自注意力详解"
category: llm
tags: [self-attention, 自注意力, QKV, 因果掩码]
topic_id: 4
permalink: /llm/2026-02-25-004
---

## 一句话总结

Self-Attention是指Q、K、V均来自同一个输入序列的注意力机制，让序列中的每个Token都能关注序列内的其他所有Token，从而建模全局依赖关系。


## 核心概念

给定输入X(shape为n×d)，通过三个可学习的权重矩阵W_Q、W_K、W_V分别投影得到Q=XW_Q、K=XW_K、V=XW_V。然后执行标准Attention计算。在自回归(Causal)模型中，会加入因果掩码(Causal Mask)，将未来位置的注意力权重设为负无穷(softmax后为0)，确保生成第i个Token时只能看到前i-1个Token。这是GPT类模型的核心约束。Cross-Attention则不同，Q来自一个序列，K和V来自另一个序列。


## 为什么重要

Self-Attention使模型能够捕获输入序列内部的任意依赖关系。一个句子中主语和谓语可能相隔很远，Self-Attention可以直接建立它们之间的联系。因果掩码则确保了自回归生成的合法性——不能'偷看'未来信息。


## 实践要点

KV Cache是推理优化的关键——已生成Token的K和V可以缓存复用，避免重复计算；Self-Attention的参数量为3×d×d(三个投影矩阵)，与序列长度无关；注意区分训练时(并行计算所有位置)和推理时(逐Token生成)的计算模式。


## 常见误区

误区一：Self-Attention的Q、K、V是相同的——它们由同一输入经过不同的线性变换得到，值并不相同。误区二：因果掩码在训练和推理中作用不同——训练时掩码让所有位置并行计算成为可能，推理时则自然只能看到已生成的部分。误区三：Self-Attention本身具有位置感知能力——它是置换不变的，必须配合位置编码才能区分Token顺序。
