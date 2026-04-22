---
layout: post
title: 'Interview: Pipeline Parallelism的bubble比例如何计算？有什么方法降低bubble？'
category: interviews
tags: [Pipeline Parallelism, 流水线并行, Bubble, 微批次, 分布式训练]
difficulty: "高级"
question_id: 64
permalink: /interviews/2026-04-23-064
---

## 题目解析

Pipeline Parallelism(PP)将模型的不同层分配到不同设备上。由于前后级之间有数据依赖，在流水线启动和结束阶段会产生"气泡"(bubble)——某些设备空闲等待。bubble比例直接决定了PP的效率，是设计分布式策略时的关键指标。


## 解答思路

基本PP（GPipe方式）的bubble计算：将batch切分为m个微批次(microbatch)，流水线有p个stage。前向传播需要p-1步启动时间，反向传播同样需要p-1步。总的计算步数=2m(前向+反向的microbatch数)，bubble步数=2(p-1)。bubble比例=(p-1)/m(近似)。例如p=4, m=8时bubble比例≈37.5%。降低bubble的方法：1）增加microbatch数m——但受显存限制；2）1F1B调度——前向完成一个microbatch后立即开始反向，减少峰值显存的同时bubble比例不变但显存效率更高。


## 关键要点

1. Interleaved 1F1B(如Megatron的方案)：每个设备分配多个不连续的层(virtual stages)，bubble降低到(p-1)/(m×v)，v为virtual stage数
2. PP的通信量只有相邻stage之间的激活值传输，远小于TP的AllReduce
3. PP适合跨节点并行（对带宽要求低），TP适合节点内并行（需要高带宽）
4. Zero Bubble PP通过拆分反向传播为两部分(B和W)来填充气泡


## 加分回答

可以分析DualPipe(DeepSeek使用的方案)如何通过双向流水线将bubble降到接近零：在前向传播的bubble中执行反向传播的计算，将计算和通信完全重叠。还可以讨论推理场景下PP与TP的选择——推理不需要反向传播，PP的bubble模式与训练不同，通常更倾向于使用TP。


## 常见踩坑

1. 只计算前向的bubble忽略反向——实际bubble是两倍
2. 层分配不均导致部分stage成为瓶颈——要根据每层的计算量均匀分配
3. 忽略了PP在推理中的特殊性——推理是逐token的，PP的pipeline效率取决于batch size
