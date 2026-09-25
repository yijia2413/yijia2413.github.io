---
layout: post
title: "Paper: Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)"
category: papers
tags: [语音识别, Whisper, 弱监督, 多任务学习]
authors: "Radford et al., 2022"
paper_id: 111
permalink: /papers/2026-06-18-111
arxiv: '2212.04356'
---
## 一句话概括

Whisper通过在68万小时多语言弱标注数据上训练Transformer模型，实现了接近人类水平的鲁棒语音识别。


## 核心思想

传统语音识别依赖大量精标注数据和复杂的流水线系统。Whisper回归简洁的端到端方法：直接训练一个Encoder-Decoder Transformer，输入是音频的梅尔频谱图，输出是文本。关键在于规模——使用从互联网收集的68万小时弱标注(自动转录)音频数据进行训练，涵盖多语言和多任务。


## 关键创新

核心创新：(1)大规模弱监督——证明海量噪声数据优于少量精标数据；(2)多任务统一格式——用特殊token统一语音识别、翻译、语种识别、时间戳预测等任务；(3)零样本泛化——不在特定数据集上微调就能达到优秀性能，鲁棒性远超专用模型。


## 深远影响

Whisper彻底改变了语音识别的部署方式。其开源模型成为事实标准，被广泛集成到各种应用中。Whisper验证了LLM时代的核心范式：用互联网规模的弱标注数据训练大模型，获得强大的零样本泛化能力。


## 启发与思考

Whisper的方法论与GPT系列一脉相承：规模+弱监督+简洁架构。这启示我们，在很多专业领域，与其追求精标数据和复杂系统，不如利用互联网上已有的海量弱标注数据进行大规模预训练。
