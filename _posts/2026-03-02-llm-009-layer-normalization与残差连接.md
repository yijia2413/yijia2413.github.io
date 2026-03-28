---
layout: post
title: "Layer Normalization与残差连接"
category: llm
tags: [layer norm, 残差连接, residual, RMSNorm, 训练稳定性]
topic_id: 9
permalink: /llm/2026-03-02-009
---

## 一句话总结

Layer Normalization稳定各层激活值的分布，残差连接(Residual Connection)让梯度直接回传到浅层，两者协同保障了深层Transformer的可训练性。


## 核心概念

Layer Normalization：对每个样本的隐藏维度做归一化，计算均值和方差后标准化，再通过可学习的缩放(γ)和偏移(β)参数恢复表达能力。与Batch Norm不同，LayerNorm不依赖batch内其他样本，适合序列任务和小batch场景。RMSNorm是简化版，去掉了均值中心化，只做方差归一化，计算更快，LLaMA等模型采用。残差连接：输出=子层(输入)+输入。确保信息可以直接跨层传递，梯度也可以跳过子层直达浅层，有效缓解梯度消失。


## 为什么重要

没有这两个组件，96层的GPT-3根本无法训练。LayerNorm防止激活值爆炸或消失，残差连接提供梯度高速公路。二者缺一不可：没有残差连接，深层梯度几乎为零；没有LayerNorm，激活值分布不稳定导致训练发散。


## 实践要点

Pre-Norm(x+SubLayer(Norm(x)))比Post-Norm(Norm(x+SubLayer(x)))训练更稳定，已成为主流；RMSNorm比LayerNorm快5-10%且效果相当；残差连接要求子层输入和输出维度相同，这也是为什么FFN最终要投影回原始维度d。


## 常见误区

误区一：LayerNorm和BatchNorm可以互换——BatchNorm在小batch和变长序列上表现差，在LLM中几乎不使用。误区二：残差连接只是为了缓解梯度消失——它还保留了浅层特征，让模型可以选择性地利用不同层次的信息。误区三：Pre-Norm和Post-Norm效果一样——Post-Norm训练不稳定但收敛后性能可能略高，Pre-Norm更稳定是工程上的优选。
