---
layout: post
title: "采样策略：Top-k/Top-p/Temperature"
category: llm
tags: [采样策略, Temperature, Top-k, Top-p, 生成控制]
topic_id: 75
permalink: /llm/2026-05-11-075
---

## 一句话总结

Temperature、Top-k和Top-p是控制LLM生成随机性和多样性的三大核心采样参数，它们的组合决定了输出的创造性与确定性之间的平衡。


## 核心概念

Temperature(温度)：对logits除以T后再softmax，T<1使分布更尖锐(更确定)，T>1使分布更平坦(更随机)，T→0退化为贪心搜索。Top-k：只从概率最高的k个token中采样，过滤掉低概率token。Top-p(Nucleus Sampling)：动态选取累积概率达到p的最小token集合采样，比Top-k更自适应——在模型确定时选择少量token，不确定时选择更多。三者通常组合使用：先除温度，再做Top-k截断，最后Top-p过滤。


## 为什么重要

采样策略直接决定用户感知到的模型行为：代码生成需要低温度高确定性，创意写作需要高温度高多样性。错误的采样参数会让优秀的模型输出质量大幅下降。这是部署时最重要的可调参数。


## 实践要点

事实性任务(问答、摘要)建议Temperature 0-0.3，Top-p 0.9；创意任务(写作、头脑风暴)建议Temperature 0.7-1.0，Top-p 0.95；代码生成建议Temperature 0-0.2。通常固定Top-p=0.9-0.95再调Temperature比单独调Top-k更灵活。重复惩罚(repetition_penalty)也很常用。


## 常见误区

误区一：Temperature为0就是贪心解码——严格的贪心需要设do_sample=False，T=0在某些实现中可能有数值问题。误区二：Top-k和Top-p功能完全一样——Top-p会根据分布动态调整候选集大小，更为灵活。
