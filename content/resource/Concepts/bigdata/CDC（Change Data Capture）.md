---
title: CDC（Change Data Capture）
aliases:
  - CDC
  - Change Data Capture
  - 数据捕获
tags:
  - CDC
  - database
  - concepts
publish: true
---
## 概述

### 定义

> Change data capture describes the process of recording the change of data in a database. Typically, this means tracking when records are inserted, updated, and deleted along with the data itself.

捕获追踪数据库中数据的变化（CRUD操作），一般是分析数据库日志中的数据。
 ![[cdc.png]]
> [Image Source](https://www.striim.com/blog/change-data-capture-cdc-what-it-is-and-how-it-works/)


## 案例

- 在[[Apache Kafka]] 中的项目案例 [How To Implement Change Data Capture With Apache Kafka  | Estuary](https://estuary.dev/change-data-capture-kafka/)
- 

## When to use change data capture

Change data capture is typically used to replicate data that is overwritten to another database. For example, replicating data from an operational database to a data warehouse. While the operational database may not need to store historical changes, it might be useful for analysis.

A few situations where you might use change data capture:

- Replicate changes into a [[content/resource/Concepts/bigdata/Data Warehouse|data warehouse]] or [[content/resource/Concepts/bigdata/Data Lake|data lake]]
- Replicate changes into [[Apache Kafka|Kafka]] (or other streaming tool) in a microservices architecture
- Upgrade a database to a higher version with minimal downtime
- Migrate data from database X to database Y with minimal downtime

## Popular Change Data Capture Tools

- [[Debezium]]
- Confluent
- [[Amazon DMS]]
- Qlik
- Striim
- Matillion Data Loader
- [Estuary | Real-Time Data Integration, CDC & ETL Platform](https://estuary.dev/)


## Resourc

- [Change Data Capture (CDC): What it is and How it Works - Striim](https://www.striim.com/blog/change-data-capture-cdc-what-it-is-and-how-it-works/)
- [How To Implement Change Data Capture With Apache Kafka  | Estuary](https://estuary.dev/change-data-capture-kafka/)
