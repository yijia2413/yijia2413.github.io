---
layout: post
title: "Paper: An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale"
category: papers
tags: [ViT, 视觉Transformer, 图像识别, 跨模态]
authors: "Dosovitskiy et al., 2020"
paper_id: 7
permalink: /papers/2026-02-28-007
arxiv: '2010.11929'
---

> **Authors**: Dosovitskiy et al., 2020



> **arxiv**: [2010.11929](https://arxiv.org/abs/2010.11929)



---



## 一句话概括

ViT将图像分割为固定大小的patch序列，直接用标准Transformer处理，首次证明了纯Transformer架构在大规模视觉任务中的强大有效性。


## 核心思想

将图像分割为16x16的patch块，每个patch通过线性投影变为一个token嵌入向量，加上可学习的位置编码后送入标准Transformer编码器。通过特殊的[CLS]标记的输出进行图像分类。在JFT-300M等大规模数据集上预训练后微调，ViT在ImageNet等主流基准上超越了当时最好的CNN模型，且计算效率更高。


## 关键创新

将图像tokenize为patch序列的简洁优雅设计；证明纯Transformer无需任何卷积归纳偏置也能出色处理视觉任务；发现视觉Transformer同样具有显著的规模扩展优势；为视觉和语言共享统一架构铺平了道路。


## 深远影响

开启了视觉Transformer的研究浪潮，催生了DeiT、Swin Transformer、MAE等大量有影响力的后续工作。使得视觉和语言可以共享统一的Transformer架构，为CLIP、DALL-E、GPT-4V等多模态大模型奠定了架构基础。


## 启发与思考

通用的架构加上充足的数据和计算规模，最终可以超越领域特定的归纳偏置。ViT的成功有力地证明了Transformer是一种真正通用的序列处理架构，不局限于语言领域。简洁的设计往往比过度复杂的设计更有生命力和扩展潜力。
