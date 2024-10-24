---
aliases:
  - 设计模式
  - DP
  - Design Pattern
tags:
  - concepts
  - system
  - design
date: 
publish: false
---

## 概述

### 定义

> 设计模式（DP, Design Patterns）是指在软件设计中，被反复使用的一种代码设计经验

设计模式的目的：是为了可重用代码，提高代码的可扩展性和可维护性，并且降低代码的耦合度

### 核心概念

按设计模式的`目的`划分，可分为

- 创建型：是对对象实例化过程的抽象
	- `Singleton`模式确保一个类只有一个实例，并提供了全局访问入口
	- `Prototype`模式允许对象在不了解要创建对象的确切类以及如何创建等细节的情况下创建自定义对象
	- `Builder`模式将复杂对象的构建与其表分离

- 结构型：主要用于如何组合已有的类和对象以获得更大的结构，一般借鉴封装、代理、继承等概念将一个或多个类或对象进行组合、封装，以提供统一的外部视图或新的功能

- 行为型：主要用奢对象之间的职责及其提供的服务的分配，它不仅描述对象或类的模式，还描述它们之间的通信模式，特别是描述一组对等的对象怎样相互协作以完成其中任一对象都无法单独完成的任务

### 遵守的原则

- 开闭原则
- 里氏替换原则

***
## Reference

- [设计模式目录：22种设计模式](https://refactoringguru.cn/design-patterns/catalog)
-  [Design Patterns - Wikipedia](https://en.wikipedia.org/wiki/Design_Patterns)
