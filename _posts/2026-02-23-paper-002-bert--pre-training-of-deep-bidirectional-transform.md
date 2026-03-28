---
layout: post
title: "Paper: BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
category: papers
tags: [BERT, 预训练, 双向, MLM, NLU]
authors: "Devlin et al., 2018"
paper_id: 2
permalink: /papers/2026-02-23-002
arxiv: '1810.04805'
---

> **Authors**: Devlin et al., 2018



> **arxiv**: [1810.04805](https://arxiv.org/abs/1810.04805)



---



## 一句话概括

通过掩码语言模型（MLM）和下一句预测（NSP）任务，实现了深度双向Transformer预训练，开启了NLP的预训练微调范式。


## 核心思想

不同于GPT的单向从左到右建模，BERT通过随机掩码输入中15%的token，迫使模型同时利用左右上下文来预测被掩码的词，从而实现真正的深度双向语言理解。配合下一句预测（NSP）任务学习句子间的逻辑关系。预训练完成后，只需添加一个简单的输出层并微调，即可适配情感分析、命名实体识别、问答等各种下游任务。


## 关键创新

掩码语言模型实现了深度双向预训练，每一层都能同时看到完整上下文；统一的预训练-微调框架适配多种NLU任务；WordPiece分词配合[CLS]和[SEP]特殊标记的灵活输入设计；在大规模无监督文本上的预训练证明了自监督学习的巨大价值。


## 深远影响

在11项NLP基准任务上全面刷新纪录，确立了预训练-微调的主流范式。催生了RoBERTa、ALBERT、ELECTRA、DeBERTa等大量后续工作。至今仍是许多NLU任务的重要基线，其核心思想深刻影响了整个NLP领域的研究方向和工程实践。


## 启发与思考

双向上下文理解是语言理解的关键能力。预训练任务的设计直接决定了模型学到什么能力——MLM教会理解，自回归教会生成。BERT的巨大成功证明了海量无标注文本中蕴含着丰富的语言知识，无监督学习的潜力远超之前的预期。
