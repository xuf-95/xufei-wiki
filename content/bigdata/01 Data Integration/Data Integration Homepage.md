---
title: 01 Data Integration Homepage
tags:
  - bigdata
  - Sync
  - home
draft: 
date: 2022-01-11
aliases:
  - 数据集成
  - 数据同步
---

### 数据集成概述


> [!NOTE] 数据集成价值
> 对异构数据源数据进行整合，消除企业信息**孤岛**，实现数据集中共享，进而实现数据治理和数据应用的重要手段


#### 应用场景

- 主数据应用：
- 大数据迁移
- 数据入仓入湖
- 数据平台/数据工程


### 数据集成技术方案

#### 数据同步

| 方案    | Datax | Canal | Debezium | FlinkCDC | ChunJun | Sqoop |
| ----- | ----- | ----- | -------- | -------- | ------- | ----- |
| 采集机制  | 查询    | 日志    | 日志       |          |         | 查询    |
| 增量同步  | x     |       |          |          |         |       |
| 断点续传  | x     |       |          |          |         |       |
| 全量同步  | 1     |       |          |          |         |       |
| 全量+增量 |       |       |          |          |         |       |
| 生态    |       |       |          |          |         |       |
![[Pasted image 20241001164413.png]]
#### 数据建模



#### 消息队列


### 数据集成商业应用

#### 商业模式

#### 商业案例
##### 全链路数据中台
- 离线数仓与数据同步
- 离线数据开发与调度
- 元数据、数据资产管理与治理



#### 数据集成市场



## Data Integration include


### Structure Data（Databases）

- [[Apache Sqoop]]
- [[DataX]]
- [[chunjun]]
- [[Apache DolphinScheduler]]
- [[Apache Inlong]]
### Collection Logger 

- [[Apache Flume]]
- [[Apache Kafka]]

### Web Spider

- Python 
- 数据埋点

### 实时数据采集


