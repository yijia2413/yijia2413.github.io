---
layout: post
title: 'Interview: 模型服务的First Token Latency和Throughput之间有什么trade-off？如何平衡？'
category: interviews
tags: [TTFT, 吞吐量, 延迟, 推理服务, SLA]
difficulty: "中级"
question_id: 58
permalink: /interviews/2026-04-17-058
---

## 题目解析

First Token Latency(TTFT)是用户提交请求到看到第一个token的时间，直接影响用户体验。Throughput是系统单位时间处理的总token数，决定服务成本。两者存在根本性矛盾：提升吞吐量通常需要增大batch size，但这会延长排队时间和计算时间，增加TTFT。


## 解答思路

矛盾的根源：1）大batch的prefill阶段计算量线性增长，每个请求的TTFT也相应增加；2）新请求必须等待当前batch完成一步迭代才能加入（即使用continuous batching）；3）GPU调度的开销随batch size增长。平衡策略：1）设置max_batch_size上限，在throughput和latency间找甜点；2）优先级队列，对延迟敏感的请求优先处理；3）分离prefill和decode到不同GPU，消除相互干扰；4）chunked prefill避免长prefill阻塞。


## 关键要点

1. TTFT主要由排队时间+prefill时间决定，与生成长度无关
2. 在线服务通常设定TTFT的P99 SLA（如<2s），这限制了最大batch size
3. 离线batch处理可以完全倾向throughput，不关心单个请求的延迟
4. Token Streaming让用户感知延迟降低，但实际TTFT不变


## 加分回答

可以讨论Sarathi-Serve的做法：将prefill切分成多个chunk与decode交替执行，每个chunk固定大小(如512 token)，保证decode请求的step间延迟稳定。还可以分析实际生产中的AB测试结果——TTFT每增加100ms，用户留存率下降约1-2%，因此低延迟通常比高吞吐更重要。


## 常见踩坑

1. 只关注throughput而忽略延迟尾部(tail latency)，P99远高于平均值
2. 测试时用固定输入长度，忽略了真实场景中长度分布的方差对调度的影响
3. 将TTFT和Time Per Output Token (TPOT)混淆
