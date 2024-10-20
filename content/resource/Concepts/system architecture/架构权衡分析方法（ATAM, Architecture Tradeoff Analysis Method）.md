---
aliases:
  - 架构权衡分析方法
  - ATAM
  - Architecture Tradeoff Analysis Method
tags:
  - concepts
  - system
  - theory
  - architecture
date: 2022-07-14
publish: true
---

## 概述

### 定义

> ATAM是在[[软件架构分析方法 ( SAAM, Software Architecture Analysis Method)|SAAM]]的基础上发展起来的，是一种系统架构评估方法

架构权衡分析方法（Architecture Tradeoff Analysis Method,ATAM)是一种系统架构评估方法，主要在系统开发之前，针对`性能`、`可用性`、`安全性`和`可修改性`等质量属性进行评价和折中。

ATAM可以分为4个主要的活动阶段，包括`需求收集`、`架构视图描述`、`属性模型构造和分析`、`架构决策与折中`，整个评估过程强调以`属性`作为架构评估的核心概念。

在识别出质量属性描述后，通常采用`效用树`对质量属性的描述进行刻画与排序

在评估过程中，`权衡点`是一个会影响多个质量属性的架构设计决策


- `**特定目标**`：ATAM的目标是在考虑多个相互影响的质量属性的情况下，从原则上提供一种理解软件体系结构的能力的方法。对于特定的软件体系结构，在系统开发之前，可以使用ATAM方法确定在多个质量属性之间折中的必要性

- `**质量属性**`：ATAM方法分析多个相互竞争的质量属性。开始时考虑的是系统的可修改性、安全性、性能和可用性

- `**风险承担者**`：在场景、需求收集有关的活动中，ATAM方法需要所有系统相关人员的参与

- `**体系结构描述**`：体系结构空间受到历史遗留系统、互操作性和以前失败的项目约束

- 在五个基本结构的基础上进行体系结构描述，这五个结构是从Kruchten的4+1视图派生而来的。其中逻辑视图被分为功能结构和代码结构。这些结构加上它们之间适当的映射可以完整地描述─个体系结构

## Reference


