---
layout: post
title: 'Interview: vLLM的PagedAttention解决了什么问题？与传统静态内存分配相比效率提升多少？'
category: interviews
tags: [vLLM, PagedAttention, KV Cache, 内存管理, 推理引擎]
difficulty: "高级"
question_id: 53
permalink: /interviews/2026-04-12-053
---

## 题目解析

LLM推理中KV Cache的内存管理是核心挑战。传统方式为每个请求预分配最大序列长度的连续内存，导致严重的内存碎片和浪费。PagedAttention借鉴操作系统虚拟内存的分页思想，将KV Cache分成固定大小的块(block)，按需分配，极大提升了内存利用率。


## 解答思路

传统静态分配的问题：1）内部碎片——请求实际长度远小于预分配长度，平均浪费60-80%显存；2）外部碎片——不同请求释放后留下不连续的空间无法被新请求使用；3）无法实现请求间的KV Cache共享（如beam search中的公共前缀）。PagedAttention将KV Cache划分为固定大小的page(通常16个token一个block)，通过block table映射逻辑位置到物理位置。这样可以：1）按需分配，几乎消除内部碎片；2）物理上不连续但逻辑上连续；3）通过copy-on-write实现前缀共享。


## 关键要点

1. 效率提升：vLLM论文报告吞吐量提升2-4x，主要来自更高的batch size（内存利用率提升到接近100%）
2. Block大小是关键超参数：太小导致block table过大，太大导致最后一个block浪费增加
3. PagedAttention需要特殊的CUDA kernel，因为KV在物理上不连续，需要gather操作
4. 显存节省的核心来源是将"预留"变为"按需"，类似malloc vs mmap的区别


## 加分回答

可以讨论PagedAttention的局限性：block内部仍存在少量碎片（平均浪费半个block）；gather操作引入了额外的内存访问开销，在短序列场景下可能不如连续内存快。还可以提到vLLM v2中引入的prefix caching优化，以及SGLang的RadixAttention如何进一步优化了前缀树匹配的效率。


## 常见踩坑

1. 误以为PagedAttention加速了单个请求的推理——实际上单请求可能略慢，优势在于并发吞吐
2. 忽略了block table本身也占用显存，在超长序列时不可忽视
3. 将PagedAttention与FlashAttention混淆——前者解决内存管理，后者解决计算效率
