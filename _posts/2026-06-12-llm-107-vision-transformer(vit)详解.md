---
layout: post
title: "Vision Transformer(ViT)详解"
category: llm
tags: [ViT, 视觉Transformer, 图像分类, patch embedding]
topic_id: 107
permalink: /llm/2026-06-12-107
---

## 一句话总结

Vision Transformer将图像分割为固定大小的patch序列，用Transformer架构处理视觉任务，证明了Transformer在计算机视觉领域的强大能力。


## 核心概念

ViT的处理流程：将图像切分为固定大小的patch（如16x16），每个patch通过线性投影映射为embedding向量，加上位置编码后送入标准Transformer Encoder。使用[CLS] token的输出进行分类。关键变体包括DeiT（数据高效训练）、Swin Transformer（层级化窗口注意力）、DINO/DINOv2（自监督预训练）。ViT在大规模数据上表现优于CNN。


## 为什么重要

ViT打通了视觉和语言模型的架构统一，为多模态模型奠定了基础。CLIP等视觉语言模型的视觉侧就基于ViT。它已成为现代计算机视觉的标准架构。


## 实践要点

Patch大小决定精度和计算量的权衡，小patch精度高但计算量大。预训练规模对ViT至关重要，小数据集上不如CNN。使用预训练权重进行微调是最佳实践。注意输入分辨率与预训练一致性。


## 常见误区

认为ViT在所有数据规模上都优于CNN，实际在小数据集上CNN仍有优势。忽视位置编码对不同分辨率的影响。认为ViT不需要数据增强，实际上合理的增强仍然重要。
