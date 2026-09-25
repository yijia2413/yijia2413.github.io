---
layout: post
title: "Paper: Voyager: An Open-Ended Embodied Agent with Large Language Models"
category: papers
tags: [Agent, 具身智能, 代码生成, 终身学习]
authors: "Wang et al., 2023"
paper_id: 82
permalink: /papers/2026-05-20-082
arxiv: '2305.16291'
---
## 一句话概括

Voyager是第一个在Minecraft中实现持续自主探索和技能学习的LLM驱动具身Agent，通过代码生成和技能库实现终身学习。


## 核心思想

Voyager由三个关键组件构成：自动课程根据当前状态和探索进度提出越来越难的任务目标；迭代提示机制让GPT-4生成可执行代码来完成任务，失败后根据环境反馈和错误信息迭代修改；技能库将成功的代码程序存储为可复用的技能，供未来任务检索调用。


## 关键创新

1) 用代码而非低级动作作为Agent的行动空间；2) 技能库实现了知识的持久积累和复用；3) 自动课程驱动持续探索，无需人工指导；4) 在开放世界中展示了真正的终身学习能力。


## 深远影响

Voyager展示了LLM Agent在开放世界环境中的巨大潜力。代码作为行动空间和技能库的设计思想被广泛借鉴，影响了后续的具身智能和Agent工具使用研究。


## 启发与思考

Voyager的核心启示是：程序化技能比参数化记忆更适合作为Agent的长期知识表示。代码天然可组合、可复用、可解释，这为Agent的终身学习提供了优雅的解决方案。
