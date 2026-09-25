---
layout: post
title: "TensorRT-LLM推理加速"
category: llm
tags: [TensorRT-LLM, NVIDIA, 算子融合, 高性能推理]
topic_id: 74
permalink: /llm/2026-05-10-074
---

## 一句话总结

TensorRT-LLM是NVIDIA推出的专为LLM优化的推理框架，通过深度融合GPU硬件特性实现极致的推理性能。


## 核心概念

TensorRT-LLM基于TensorRT引擎，针对LLM做了大量专项优化：自定义Attention Kernel(支持FlashAttention、MQA/GQA)；算子融合将多个小操作合并为单个高效kernel；FP8/INT8/INT4量化的原生硬件加速(尤其在H100上)；In-flight Batching(类似Continuous Batching)；支持多GPU张量并行和流水线并行。构建流程：Python定义模型→编译为优化后的TensorRT引擎→C++运行时高效执行。配合Triton Inference Server实现生产级部署。


## 为什么重要

在NVIDIA GPU上，TensorRT-LLM通常能达到最高的推理性能(比vLLM快20-50%)。对于追求极致性能和成本控制的大规模部署场景，它是首选方案。H100上的FP8推理性能尤为突出。


## 实践要点

模型需要先经过build步骤编译为引擎文件，编译参数与部署配置绑定；版本迭代快，注意与CUDA和驱动版本的兼容性；使用Triton Server管理多模型和负载均衡。预构建Docker镜像可简化部署流程。


## 常见误区

误区一：TensorRT-LLM使用门槛和vLLM一样低——它的编译流程更复杂，学习曲线更陡。误区二：只有最新GPU才能用——它支持Ampere及以上架构，但FP8加速仅Hopper架构可用。
