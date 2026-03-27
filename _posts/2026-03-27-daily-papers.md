---
layout: post
title: "Daily Papers - 2026-03-27"
category: papers
tags: [papers, ai]
paper_source: huggingface
---

This daily digest collects the top 10 papers from the Hugging Face papers feed for 2026-03-27.

[Browse the daily feed](https://huggingface.co/papers/date/2026-03-27)

## 1. PixelSmile: Toward Fine-Grained Facial Expression Editing

[Read the paper](https://huggingface.co/papers/2603.25728)

PixelSmile 是一个扩散模型框架，通过对称联合训练和对比学习来解耦面部表情语义，从而实现精确、可控、细粒度的表情编辑，并能稳健地保持身份信息。

## 2. Intern-S1-Pro: Scientific Multimodal Foundation Model at Trillion Scale

[Read the paper](https://huggingface.co/papers/2603.25040)

Intern-S1-Pro 是一个拥有万亿参数的科学多模态基础模型，它通过先进的智能体功能和跨多个科学领域的专业任务掌握能力，增强了通用和科学能力。

## 3. RealRestorer: Towards Generalizable Real-World Image Restoration with Large-Scale Image Editing Models

[Read the paper](https://huggingface.co/papers/2603.25502)

开发了一个大规模数据集和开源模型，以提高图像修复性能，并缩小与闭源替代方案的差距，同时提供了一个专门用于真实世界退化评估的基准。

## 4. Calibri: Enhancing Diffusion Transformers via Parameter-Efficient Calibration

[Read the paper](https://huggingface.co/papers/2603.24800)

通过参数高效的校准方法可以增强扩散 Transformer，从而在减少推理步数的同时提高生成质量。

## 5. MACRO: Advancing Multi-Reference Image Generation with Structured Long-Context Data

[Read the paper](https://huggingface.co/papers/2603.25319)

引入了一个大规模数据集和基准，通过提供结构化的长上下文监督和标准化的评估协议，来解决多参考图像生成中的局限性。

## 6. Voxtral TTS

[Read the paper](https://huggingface.co/papers/2603.25551)

Voxtral TTS 是一个多语言文本到语音模型，它结合了语义 token 生成和声学 token 的流匹配混合架构，能够从短参考音频生成自然语音。

## 7. SlopCodeBench: Benchmarking How Coding Agents Degrade Over Long-Horizon Iterative Tasks

[Read the paper](https://huggingface.co/papers/2603.24755)

软件开发是迭代的，但现有的智能编码基准主要评估针对完整规范的单次解决方案。代码可能通过测试套件，但随着时间的推移会变得越来越难以扩展。最近的迭代基准试图弥合这一差距，但对智能体的设计决策限制过严，无法真实衡量代码质量如何影响未来的扩展。我们引入了 SlopCodeBench，这是一个不依赖语言的基准，包含 20 个问题和 93 个检查点，智能体在其中根据不断演变的规范反复扩展自己先前的解决方案，这些规范迫使进行架构决策而不规定内部结构。我们跟踪两个轨迹级别的质量信号：冗余度（冗余或重复代码的比例）和结构侵蚀（复杂性集中在高复杂度函数中的份额）。在 11 个模型上，没有智能体能够端到端地解决任何问题；最高检查点的解决率为 17.2%。质量稳步下降：侵蚀率上升...

## 8. MSA: Memory Sparse Attention for Efficient End-to-End Memory Model Scaling to 100M Tokens

[Read the paper](https://huggingface.co/papers/2603.23516)

内存稀疏注意力（MSA）通过稀疏注意力和文档级 RoPE 等创新，实现了大型语言模型以线性复杂度和高效率处理极长上下文的能力。

## 9. AVControl: Efficient Framework for Training Audio-Visual Controls

[Read the paper](https://huggingface.co/papers/2603.24793)

AVControl 在 LTX-2 的并行画布上将控制模态作为独立的 LoRA 适配器进行训练，从而实现了高效、模块化的视听生成，在各种控制任务上取得了卓越的性能，同时所需的计算资源极少。

## 10. Less Gaussians, Texture More: 4K Feed-Forward Textured Splatting

[Read the paper](https://huggingface.co/papers/2603.25745)

LGTM 是一个前馈框架，通过预测具有每个原始体纹理的紧凑高斯原始体，实现高保真 4K 新视角合成，从而将几何复杂性与渲染分辨率解耦。
