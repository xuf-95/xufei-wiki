---
title: CAP 定理
tags:
  - concepts
  - system
  - cpa
publish: true
draft: false
date: 2021-02-13
---

## 概述

**CAP定理**（CAP theorem），又被称作**布鲁尔定理**（Brewer's theorem），它指出对于一个[分布式计算系统](https://zh.wikipedia.org/wiki/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%A1%E7%AE%97 "分布式计算")来说，[不可能同时满足以下三点](https://zh.wikipedia.org/wiki/%E4%B8%89%E9%9A%BE%E5%9B%B0%E5%A2%83 "三难困境")

- 一致性（**C**onsistency） （等同于所有节点访问同一份最新的数据副本）
- 可用性（**A**vailability）（每次请求都能获取到非错的响应——但是不保证获取的数据为最新数据）
- 分区容错性（**P**artition tolerance）（以实际效果而言，分区相当于对通信的时限要求。系统如果不能在时限内达成数据一致性，就意味着发生了分区的情况，必须就当前操作在C和A之间做出选择


## 资源链接

[CAP定理 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/CAP%E5%AE%9A%E7%90%86)
 

