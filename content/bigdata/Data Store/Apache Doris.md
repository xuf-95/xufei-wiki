---
aliases:
  - doris
tags:
  - apache
  - data-warehouse
  - data-lake
  - mmp
date: 2024-02-13
draft: false
---
## What's Apache Doris

> [!quote] from doris official definition
> Apache Doris is an MPP-based real-time data warehouse known for its high query speed. For queries on large datasets, it returns results in sub-seconds. It supports both high-concurrent point queries and high-throughput complex analysis. It can be used for report analysis, ad-hoc queries, unified data warehouse, and data lake query acceleration. Based on Apache Doris, users can build applications for user behavior analysis, A/B testing platform, log analysis, user profile analysis, and e-commerce order analysis.

[Apache Doris](https://doris.apache.org/) 是一个基于 MPP 支持多种数据源（数据仓库和数据湖）的可高并发快速查询、复杂分析、报表分析、即席查询、用户行为分析、A/B测试的实时数据库。too Fast，too like

![[Apache Doris.png]]


## Technical overview

![[Apache Doris-1.png]]

前端和后端进程都是可扩展的，在单个集群中支持多达数百台机器和数十 PB 的存储容量。两种流程都通过一致性协议保证高服务可用性和高数据可靠性。这种高度集成的架构设计大大降低了分布式系统的运维成本

- **前端（FE）** ：用户请求处理、查询解析和规划、元数据管理、节点管理
- **后端（BE）** ：数据存储和查询执行

Apache Doris采用MySQL协议，支持标准SQL，与MySQL语法高度兼容

## Query 

![[Apache Doris-2.png]]

- [ ] Quick Start 
- [ ] Coding 

## Reference

- [Apache Doris - Blog | Latest news and events - Apache Doris](https://doris.apache.org/blog?currentPage=1&currentCategory=All#blog)
