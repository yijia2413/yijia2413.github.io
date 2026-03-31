---
layout: post
title: "Paper: StarCoder: May the Source Be with You"
category: papers
tags: [代码模型, 代码数据, 开源]
authors: "Li et al., 2023"
paper_id: 39
permalink: /papers/2026-03-31-039
arxiv: '2305.06161'
---
## 一句话概括

StarCoder基于精心构建的The Stack代码数据集训练，是一个15.5B参数的开源代码大模型，在代码生成任务上匹配甚至超越了闭源的Codex模型。


## 核心思想

StarCoder的成功建立在两大支柱之上：高质量的代码数据和精心设计的训练策略。数据方面，The Stack从GitHub收集了遵循宽松许可证的代码，经过严格的去重和质量过滤处理。训练方面，StarCoder采用了Fill-in-the-Middle（FIM）训练目标，使模型不仅能从左到右连续生成代码，还能灵活地填充中间缺失的代码片段。此外还使用了8K的长上下文窗口来处理完整的代码文件。


## 关键创新

1) The Stack数据集建立了大规模、合规性优先的代码数据收集和处理流程；2) FIM训练目标使模型天然支持代码补全这一最重要的实际使用场景；3) 覆盖80多种编程语言，并对Git commit和Jupyter notebook进行了专门处理。


## 深远影响

StarCoder有力证明了开源代码模型完全可以匹敌商业闭源模型的性能水平。它为后续的StarCoder2、DeepSeek-Coder等重要工作奠定了坚实基础，也为代码数据的合规使用建立了行业标准和最佳实践。


## 启发与思考

代码是一种极其特殊的语言——它有严格的语法规则、丰富的结构信息、以及可执行验证的独特优势。StarCoder的FIM训练目标正是针对代码的结构特点量身设计的。这深刻提醒我们，领域特定的训练策略比通用方法更能充分释放数据的潜力。
