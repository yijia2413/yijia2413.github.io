---
layout: post
title: "Paper: GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
category: papers
tags: [GPTQ, 训练后量化, 权重量化, LLM压缩]
authors: "Frantar et al., 2022"
paper_id: 106
permalink: /papers/2026-06-13-106
arxiv: '2210.17323'
---
## 一句话概括

提出高效的训练后量化方法GPTQ，首次实现将1750亿参数GPT模型量化到3-4bit且几乎无精度损失。


## 核心思想

GPTQ基于最优脑量化(OBQ)框架，通过逐层量化权重并利用Hessian信息来补偿量化误差。核心思路是：当一个权重被量化引入误差时，调整同层其余未量化权重来最小化输出误差。通过巧妙的矩阵分解和分组处理，GPTQ将OBQ的计算成本从不可接受降低到可以在数小时内完成175B模型的量化。


## 关键创新

三大关键技术：(1)逐列量化而非逐行，允许使用高效的批量更新；(2)延迟批量更新——累积多列的补偿再一次性更新，提升数值稳定性和计算效率；(3)Cholesky重排序——基于量化难度对列进行排序，优先处理敏感权重。整个量化过程只需少量校准数据。


## 深远影响

GPTQ开创了LLM后训练量化的先河，使大模型在消费级硬件上运行成为现实。AutoGPTQ等工具让非专业用户也能轻松量化模型。GPTQ与后续的AWQ、QuIP等共同构成了LLM量化的技术基石。


## 启发与思考

GPTQ证明了大语言模型中存在大量可以用低精度表示的冗余信息。更重要的是，基于二阶信息的误差补偿策略远优于简单的四舍五入，这为后续更先进的量化方法提供了重要启示。
