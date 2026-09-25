---
layout: post
title: "Paper: ReAct: Synergizing Reasoning and Acting in Language Models"
category: papers
tags: [Agent, 推理与行动, 工具使用, 提示工程]
authors: "Yao et al., 2022"
paper_id: 76
permalink: /papers/2026-05-14-076
arxiv: '2210.03629'
---
## 一句话概括

ReAct将推理(Reasoning)和行动(Acting)交织在一起，让语言模型在思考的同时与外部环境交互，开创了LLM Agent的基本范式。


## 核心思想

传统方法将推理和行动分离处理。ReAct提出在生成过程中交替产生思维链(Thought)和行动(Action)，模型先推理当前状态和下一步计划，再执行具体操作（如搜索、查询），然后根据观察结果(Observation)继续推理。这种Thought-Action-Observation循环让模型能够动态调整策略。


## 关键创新

1) 将推理trace和行动决策统一在同一个生成序列中；2) 推理为行动提供高层指导，行动为推理提供外部信息；3) 思维过程可解释可追溯；4) 仅需少量示例即可通过提示实现，无需专门训练。


## 深远影响

ReAct成为几乎所有LLM Agent框架的基础范式。LangChain、AutoGPT等工具都以ReAct模式为核心。它证明了LLM不仅能思考，还能通过工具与真实世界交互，开启了Agent时代。


## 启发与思考

ReAct的优雅之处在于简单而通用。将内部推理和外部行动统一到文本生成中，是一种非常自然的设计。未来的挑战在于如何让Agent在更复杂的长期任务中保持推理的连贯性和行动的有效性。
