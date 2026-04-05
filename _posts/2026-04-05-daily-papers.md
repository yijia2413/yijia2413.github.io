---
layout: post
title: "Daily Papers - 2026-04-05"
permalink: /daily-papers-2026-04-05
category: papers
tags: [papers, ai]
paper_source: huggingface
---

This daily digest collects the top 10 papers from the Hugging Face papers feed for 2026-04-05.

[Browse the daily feed](https://huggingface.co/papers/date/2026-04-05)

## 1. DataFlex: A Unified Framework for Data-Centric Dynamic Training of Large Language Models

[Read the paper](https://huggingface.co/papers/2603.26164)

DataFlex 是一个统一的框架，用于数据驱动的大型语言模型动态训练。它支持样本选择、领域混合调整和样本重加权，同时保持与标准训练工作流程的兼容性，并支持高效的大规模部署。

## 2. The Latent Space: Foundation, Evolution, Mechanism, Ability, and Outlook

[Read the paper](https://huggingface.co/papers/2604.02029)

潜在空间正成为语言模型的基础计算基底，它通过连续表示克服了语言冗余和序列低效问题，相比显式的 token 级别方法具有优势。

## 3. Generative World Renderer

[Read the paper](https://huggingface.co/papers/2604.02329)

引入了一个来自 AAA 游戏的大规模动态数据集，用于改进生成式逆向和正向渲染。该数据集包含高分辨率同步的 RGB 和 G-buffer 数据，并提出了一种新颖的基于 VLM 的评估方法，该方法与人类判断高度相关。

## 4. SKILL0: In-Context Agentic Reinforcement Learning for Skill Internalization

[Read the paper](https://huggingface.co/papers/2604.02268)

SKILL0 使 LLM 代理能够在训练过程中内化技能，通过动态课程实现零样本自主行为，从而降低上下文开销并提高任务性能。

## 5. Steerable Visual Representations

[Read the paper](https://huggingface.co/papers/2604.02327)

可控视觉表示通过早期融合文本和视觉特征，实现了语言引导的对特定图像元素的关注，同时保持了表示的质量。

## 6. CORAL: Towards Autonomous Multi-Agent Evolution for Open-Ended Discovery

[Read the paper](https://huggingface.co/papers/2604.01658)

自主多智能体进化框架通过持久记忆、异步执行和协作解决问题，实现了开放式发现，并在数学和优化任务上取得了卓越的性能。

## 7. EgoSim: Egocentric World Simulator for Embodied Interaction Generation

[Read the paper](https://huggingface.co/papers/2604.01001)

我们引入了 EgoSim，一个闭环的、以自我为中心的（egocentric）世界模拟器，它可以生成空间一致的交互视频，并持续更新底层的 3D 场景状态以实现连续模拟。现有的以自我为中心的模拟器要么缺乏明确的 3D 基础，导致在视角变化下出现结构漂移，要么将场景视为静态，无法在多阶段交互中更新世界状态。EgoSim 通过将 3D 场景建模为可更新的世界状态来解决这两个局限性。我们通过一个几何-动作感知观测模拟模型生成具身交互，并通过一个交互感知状态更新模块确保空间一致性。为了克服由于难以获取密集对齐的场景-交互训练对所带来的关键数据瓶颈，我们设计了一个可扩展的流水线，从野外的大规模单目以自我为中心的视频中提取静态点云、相机轨迹和具身动作。我们进一步引入了 EgoCap，一个捕捉系统……

## 8. LatentUM: Unleashing the Potential of Interleaved Cross-Modal Reasoning via a Latent-Space Unified Model

[Read the paper](https://huggingface.co/papers/2604.02097)

LatentUM 是一个统一模型，它在共享的语义潜在空间中表示所有模态，从而无需像素空间中介即可实现高效的跨模态推理和生成。

## 9. NearID: Identity Representation Learning via Near-identity Distractors

[Read the paper](https://huggingface.co/papers/2604.01973)

研究人员开发了一个新颖的框架，利用“近乎身份”（Near-identity）的干扰项来提高以身份为中心的视觉任务的性能。该框架创建了一个数据集和评估协议，能够更好地将身份与背景上下文分离开来，从而获得更可靠的表示和度量。

## 10. VOID: Video Object and Interaction Deletion

[Read the paper](https://huggingface.co/papers/2604.02296)

VOID 是一个视频对象移除框架，它利用视觉-语言模型和视频扩散模型，通过因果推理和反事实推理来生成物理上合理的场景。
