---
layout: post
title: "Daily Papers - 2026-04-09"
permalink: /daily-papers-2026-04-09
category: papers
tags: [papers, ai]
paper_source: huggingface
---

This daily digest collects the top 10 papers from the Hugging Face papers feed for 2026-04-09.

[Browse the daily feed](https://huggingface.co/papers/date/2026-04-09)

## 1. RAGEN-2: Reasoning Collapse in Agentic RL

[Read the paper](https://huggingface.co/papers/2604.06268)

研究发现，多轮 LLM Agent 中存在一种“模板崩溃”的隐藏故障模式，该模式无法通过熵来检测。研究提出了一种互信息代理和信噪比（SNR）感知过滤方法，以提高推理质量和任务性能。

## 2. Think in Strokes, Not Pixels: Process-Driven Image Generation via Interleaved Reasoning

[Read the paper](https://huggingface.co/papers/2604.04746)

“按笔触思考，而非像素”的生成方法，通过交错推理驱动图像生成过程。该方法将图像合成分解为迭代步骤，包括文本规划、视觉草图绘制、文本反思和视觉精炼。分步监督确保了生成过程的一致性和可解释性。

## 3. MARS: Enabling Autoregressive Models Multi-Token Generation

[Read the paper](https://huggingface.co/papers/2604.07023)

MARS 是一种微调方法，使自回归语言模型能够在不改变架构的情况下，单次前向传播预测多个 token。该方法在提高吞吐量和支持动态速度调整的同时，保持了准确性。

## 4. TC-AE: Unlocking Token Capacity for Deep Compression Autoencoders

[Read the paper](https://huggingface.co/papers/2604.07340)

TC-AE 是一种基于 Vision Transformer 的架构，通过解决 token 空间限制并增强语义结构，改进了深度压缩自编码器。该方法采用了联合自监督训练。

## 5. INSPATIO-WORLD: A Real-Time 4D World Simulator via Spatiotemporal Autoregressive Modeling

[Read the paper](https://huggingface.co/papers/2604.07209)

INSPATIO-WORLD 提供了一个实时框架，能够从单个视频生成高保真的动态场景。该框架利用了时空自回归建模和联合分布匹配蒸馏技术。

## 6. Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization

[Read the paper](https://huggingface.co/papers/2604.07343)

Personalized RewardBench 旨在评估奖励模型捕捉个体用户偏好的能力。研究揭示了当前模型存在的显著挑战，并表明其与下游性能的相关性优于现有基准。

## 7. Neural Computers

[Read the paper](https://huggingface.co/papers/2604.06425)

Neural Computers 代表了一种新的计算范式，其中模型作为运行时系统运行，通过 I/O 轨迹而非显式编程来学习执行任务。

## 8. DeonticBench: A Benchmark for Reasoning over Rules

[Read the paper](https://huggingface.co/papers/2604.04443)

DEONTICBENCH 是一个基准测试，用于评估大型语言模型在复杂、特定上下文的义务推理任务上的表现。这些任务来源于真实的法律和政策领域，支持基于规则的符号和非符号方法。

## 9. FP4 Explore, BF16 Train: Diffusion Reinforcement Learning via Efficient Rollout Scaling

[Read the paper](https://huggingface.co/papers/2604.06916)

一种名为 Sol-RL 的新颖两阶段强化学习框架，集成了 FP4 量化和扩散模型对齐，以加速训练同时保持高保真性能。

## 10. The Depth Ceiling: On the Limits of Large Language Models in Discovering Latent Planning

[Read the paper](https://huggingface.co/papers/2604.06427)

研究表明，大型语言模型能够执行不同深度的潜在推理，但在发现和执行多步规划策略之间存在差距，这表明了链式思考（chain-of-thought）监控的局限性。
