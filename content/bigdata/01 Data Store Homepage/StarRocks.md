---
aliases:
  - StarRocks
tags:
  - bigdata
date: 
draft: false
---
## 概述

### 定义

StarRocks 是 **新一代极速全场景 [[MMP（Massively Parallel Processing）]] 数据库**

 StarRocks 是Linux 基金会项目，采用 Apache 2.0 许可证
### 架构

> 前端( **FE**) + 后端(**BE** 和 **CN**<计算节点>)

- 水平可扩展
- 具有元数据和服务数据副本机制，提高了数据可靠性，有效防止单点故障 (SPOF)

![[content/bigdata/01 Data Store Homepage/image/StarRocks.png|存算一体(左) & 存算分离(右边)]]


- FE 节点负责元数据管理、客户端连接管理、查询计划和查询调度。每个 FE 在其内存中存储和维护完整的元数据副本，确保每个 FE 都能提供无差别的服务
- CN 节点在**存算分离**或**存算一体**集群中负责执行查询
- BE 节点在**存算一体**集群中负责数据存储和执行查询

### 应用场景

- [[Online Analytical Processing|OLAP]] 
- 实时数仓
- 高并发查询

***
## Reference

- [StarRocks - 新一代极速全场景MPP数据库](https://starrocks.io/zh/blog)

