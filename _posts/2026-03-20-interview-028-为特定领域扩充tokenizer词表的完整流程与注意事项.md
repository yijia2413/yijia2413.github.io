---
layout: post
title: "Interview: 为特定领域扩充Tokenizer词表的完整流程与注意事项"
category: interviews
tags: [Tokenizer, 词表扩充, 领域适配, BPE]
difficulty: "高级"
question_id: 28
permalink: /interviews/2026-03-20-028
---

## 题目解析

扩充词表是领域适配的第一步，直接影响模型对领域术语的编码效率和理解能力。但操作不当会破坏预训练模型已有的知识表示。


## 解答思路

具体步骤：1. 在领域语料上训练新的Tokenizer，提取高频领域词汇；2. 筛选出原词表中不存在或被过度切分的领域词(如"心肌梗死"被切成"心/肌/梗/死")；3. 将新词添加到词表末尾，扩展Embedding层和LM Head层；4. 新增token的Embedding可用其子词Embedding的均值初始化；5. 进行持续预训练，让新Embedding与模型对齐。需要特别注意保持原有special token不受影响，并验证旧文本经过新Tokenizer编码后结果与原来完全一致。


## 关键要点

1. 词表大小增加会增大Embedding和LM Head的参数量，影响推理速度；2. 新增词汇不宜过多，通常控制在原词表的5%-20%；3. 初始化策略至关重要，随机初始化会导致训练初期loss剧烈波动；4. 需要充足的领域数据来训练新token的Embedding。


## 加分回答

可以使用FOCUS等方法，通过token频率加权来做更精确的Embedding初始化。另外需注意special token不能被影响。如果是中文医疗场景，还需要处理好中西医术语、药品名等的分词边界问题。


## 常见踩坑

最严重的错误是修改词表后不做持续预训练直接微调，新token的表示完全没对齐。另一个坑是忽略了LM Head也需要扩展，导致新增token永远无法被生成。
