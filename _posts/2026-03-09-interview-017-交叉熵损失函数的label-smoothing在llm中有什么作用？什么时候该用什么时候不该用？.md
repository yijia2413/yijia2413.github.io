---
layout: post
title: "Interview: 交叉熵损失函数的label smoothing在LLM中有什么作用？什么时候该用什么时候不该用？"
category: interviews
tags: [损失函数, label smoothing, 正则化, 过拟合]
difficulty: "中级"
question_id: 17
permalink: /interviews/2026-03-09-017
---

## 题目解析

Label smoothing是一种简单但有效的正则化技术，将hard label（one-hot）替换为soft label。在LLM预训练中是否使用label smoothing是一个有争议的话题。这道题考察候选人对损失函数设计的理解，以及在不同场景下做出合理选择的能力。


## 解答思路

标准交叉熵的目标是让模型输出的概率分布尽可能接近one-hot分布。Label smoothing将目标分布从[0,...,1,...,0]变为[ε/V,...,1-ε,...,ε/V]，其中ε通常为0.1，V是词表大小。这使得模型不需要输出极端的logits值就能最小化loss，起到正则化效果。它防止模型对训练数据过度自信，改善泛化能力。


## 关键要点

该用的场景：(1)模型容易过拟合时（小数据集、大模型）；(2)标签存在噪声时（网络爬取的预训练数据本身有质量问题）；(3)需要更平滑的输出概率分布时（如用于知识蒸馏的教师模型）。不该用的场景：(1)大规模预训练时——数据量足够大时过拟合不是主要问题，label smoothing可能损害模型的区分能力；(2)下游需要精确概率校准时；(3)与某些解码策略（如nucleus sampling）配合不佳时——过于平滑的分布降低生成质量。


## 加分回答

深入分析：label smoothing等价于在交叉熵loss上加了一个KL散度正则项，鼓励模型的输出分布接近均匀分布。这在数学上等价于对logits施加了L2惩罚。可以提到GPT系列和LLaMA等主流LLM通常不使用label smoothing，而T5使用了ε=0.1的label smoothing。选择需要根据具体场景和数据量决定。


## 常见踩坑

常见错误是笼统地说label smoothing总是有益的——在大规模预训练中它的效果存疑。另一个坑是不知道label smoothing的数学形式或混淆它与temperature scaling。也有人无法解释label smoothing为什么能改善泛化——核心在于防止模型logits值趋向无穷大，保持输出概率分布的信息熵。
