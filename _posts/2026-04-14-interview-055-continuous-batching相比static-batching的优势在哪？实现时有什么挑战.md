---
layout: post
title: 'Interview: Continuous Batching相比Static Batching的优势在哪？实现时有什么挑战？'
category: interviews
tags: [Continuous Batching, 动态批处理, 推理服务, 调度, 吞吐量]
difficulty: "中级"
question_id: 55
permalink: /interviews/2026-04-14-055
---

## 题目解析

Static Batching要求一个batch内所有请求同时开始、同时结束，短请求必须等待最长请求完成才能返回。Continuous Batching（也叫iteration-level batching）允许在每一步解码后动态插入新请求和移除已完成请求，极大提升了GPU利用率和用户体验。


## 解答思路

Static Batching的问题：假设batch中最长请求需要生成500个token，最短只需50个token，那么短请求完成后GPU有90%的时间在做无用计算（padding）。Continuous Batching在每个decode step检查：1）哪些请求已生成EOS，立即释放资源并返回结果；2）等待队列中哪些请求可以加入当前batch。这样GPU的每一步都在做有效计算。Orca论文报告吞吐量提升可达4-8倍。


## 关键要点

1. 实现挑战一：prefill和decode阶段的计算特性不同，prefill是计算密集，decode是内存带宽密集，混合调度需要权衡
2. 实现挑战二：新请求插入需要与现有batch的KV Cache兼容，内存管理复杂
3. 实现挑战三：prefill一个长请求会阻塞所有decode请求，导致延迟抖动(jitter)
4. 分离prefill和decode（即Splitwise/DistServe架构）是解决上述问题的前沿方案


## 加分回答

可以分析chunked prefill策略：将长的prefill请求切分为多个chunk，每个chunk与decode请求交替执行，既避免了长时间阻塞decode又保持了GPU利用率。还可以讨论优先级调度策略，如FCFS vs SJF在不同SLA要求下的选择。


## 常见踩坑

1. 误以为Continuous Batching只提升吞吐量——它同时降低了平均延迟
2. 忽略了prefill插入对现有decode请求延迟的影响
3. 没有考虑请求长度预估错误对调度效率的影响
