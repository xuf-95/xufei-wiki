---
aliases:
  - StarRocks
tags:
  - bigdata
date: 
draft: false
---

![[starrocks-banner.png]]

## What's StarRocks

> StarRocks is a **next-gen**, high-performance analytical data warehouse that enables real-time, multi-dimensional, and highly concurrent data analysis. StarRocks has an MPP architecture and is equipped with a fully vectorized execution engine, a columnar storage engine that supports real-time updates, and is powered by a rich set of features including a fully-customized cost-based optimizer (CBO), intelligent materialized view and more. StarRocks supports real-time and batch data ingestion from a variety of data sources. It also allows you to directly analyze data stored in data lakes with zero data migration.

  StarRocks 是 **新一代极速全场景 [[MMP（Massively Parallel Processing）]] 数据库**，兼容 MySQL 协议。采用了全面向量化引擎架构，并配备全新设计的 CBO (Cost Based Optimizer) 优化器、支持智能化物化视图

  
## StarRocks Architecture

> 前端( **FE**) + 后端(**BE** 和 **CN**<计算节点>)

- 水平可扩展
- 具有元数据和服务数据副本机制，提高了数据可靠性，有效防止单点故障 (SPOF)

![[StarRocks Shard-nothing.png|存算一体]]

- FE 节点负责元数据管理、客户端连接管理、查询计划和查询调度。每个 FE 在其内存中存储和维护完整的元数据副本，确保每个 FE 都能提供无差别的服务
- CN 节点在**存算分离**或**存算一体**集群中负责执行查询
- BE 节点在**存算一体**集群中负责数据存储和执行查询

![存算分离架构](<StarRocks Shard-data.png>)

## StarRocks 特性

- SR 采用 [[MMP（Massively Parallel Processing）]] 分布式执行框架。在 MPP 执行框架中，一条查询请求会被拆分成多个物理计算单元，在多机并行执行。每个执行节点拥有独享的资源（CPU、内存）。MPP 执行框架能够使得单个查询请求可以充分利用所有执行节点的资源，所以单个查询的性能可以随着集群的水平扩展而不断提升。

![StarRocks MPP](<StarRocks MPP.png>)

- 全面向量化执行引擎

  - 使用全面向量化引擎按照列式的方式组织和处理数据
  - 通过向量化算法充分的利用 CPU 提供的 SIMD（Single Instruction Multiple Data）指令，将执行算子的性能，整体提升 3~10 倍
  - 实现了 Operation on Encoded Data 的技术，针对复杂算子的计算，极大的降低了SQL在执行过程中的负责度。此优化将查询速度提升了2倍

- 3.0版本实现的存算分离架构模式

- CBO 优化器

- 可实时更新的列式存储引擎

- 智能的物化视图


## 应用场景

- [[Online Analytical Processing|OLAP]] 多维数据分析：用户行为分析、用户画像、跨主题业务分析、系统监控分析
- 针对数据仓库、数据湖分析进行实时数据分析：电商大促分析、直播质量分析、广告投放、智能驾驶舱
- Ad-hoc 高并发查询：广告主报表分析、零售行业渠道分析、Dashboard 多页面分析

***

## 表设计

|                     | 主键表 (Primary Key table)                                                      | 明细表 (Duplicate Key table)                                                     | 聚合表 (Aggregate table)                                                                        | 更新表 (Unique Key table)                                                                    |
| ------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Key 列和唯一约束          | 主键PRIMARY KEY具有唯一约束和非空约束。                                                    | DUPLICATE KEY不具有唯一约束。                                                         | 聚合键AGGREGATE KEY具有唯一约束。                                                                      | 唯一键UNIQUE KEY具有唯一约束。                                                                      |
| Key 列和数据变更的关系（逻辑关系） | 如果新数据的主键值与表中原数据的主键值相同，则存在唯一约束冲突，此时新数据会替代原数据。 与更新表相比，主键表增强了其底层存储引擎，已经可以取代更新表。 | Duplicate Key不具有唯一约束，因此如果新数据的 Duplicate Key 与表中原数据相同，则新旧数据都会存在表中。             | 如果新数据与表中原数据存在唯一约束冲突，则会根据聚合键和 Value 列的聚合函数聚合新旧数据。                                             | 如果新数据与表中原数据存在唯一约束冲突，则新数据会替代原数据。 更新表实际可以视为聚合函数为 replace 的聚合表。                              |
| Key 列和排序键的关系        | 自 3.0.0 起，主键表中两者解耦。主键表支持使用ORDER BY指定排序键和使用PRIMARY KEY指定主键。                   | 自 3.3.0 起，明细表支持使用ORDER BY指定排序键，如果同时使用ORDER BY和DUPLICATE KEY，则DUPLICATE KEY无效。 | 自 3.3.0 起，聚合表中两者解耦。聚合表支持使用ORDER BY指定排序键和使用AGGREGATE KEY指定聚合键。排序键和聚合键中的列需要保持一致，但是列的顺序不需要保持一致。 | 自 3.3.0 起，更新表中两者解耦。更新表支持使用ORDER BY指定排序键和使用UNIQUE KEY指定唯一键。排序键和唯一键中的列需要保持一致，但是列的顺序不需要保持一致。 |

## Reference

- [StarRocks - 新一代极速全场景MPP数据库](https://starrocks.io/zh/blog)

## FAQ