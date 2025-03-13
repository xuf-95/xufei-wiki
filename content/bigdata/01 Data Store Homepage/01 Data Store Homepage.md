---
title: Data Store Homepage
tags:
  - store
  - database
  - home
draft: 
date: 2023-02-11
aliases:
  - 数据存储
  - 数据库
  - DB
  - Data Store
---


<!DOCTYPE html>
<html>
<head>
    <title>Wiki Contents</title>
    <style>
        table {
            margin-left: auto;
            margin-right: auto;
            width: 80%;
            border-collapse: collapse;
            font-size: 14px;
        }
        th, td {
            text-align: left;
            padding: 5px;
        }
        caption {
            caption-side: top; /* Caption position: top or bottom */
            font-size: 18px; /* Adjust caption font size as needed */
            font-weight: bold; /* Optional: makes the caption text bold */
            padding: 5px; /* Optional: adds padding around the caption */
        }
    </style>
</head>
<body>

<table border="1">
  <caption>Big Data Area Contents</caption>
  <colgroup>
    <col style="width: 20%;">
    <col style="width: 80%;">
  </colgroup>
  <tr>
    <th>Area</th>
    <th>Include</th>
  </tr>
   <tr>
    <td>[[Relational Database Management System|RDBMS]]</td>
    <td>[[MySQL]] | [[PostgreSQL]] | [[ClickHouse]] </td>
  </tr>
  <tr>
    <td>[[Non-relational Database]]</td>
    <td>[[Apache Cassandra]]</td>
  </tr>
   <tr>
    <td>MMP Database</td>
    <td>[[StarRocks]] </td>
  </tr>
  <tr>
    <td>Column Database</td>
    <td>[[Apache Hive]] ｜[[ClickHouse]] ｜[[Data Lake]] | [[Apache HBase|Hbase]] | [[Apache Doris]] </td>
  </tr>
   <tr>
    <td>[[Key-Value Database]]</td>
    <td>[[Redis]]</td>
  </tr>
 <tr>
    <td>[[Document Database]]</td>
    <td>[[MongoDB]]</td>
  </tr>
  <tr>
    <td>[[Graph Database]]</td>
    <td>[ ] Neo4j</td>
  </tr>
  <tr>
    <td>[[Timeseries Database]]</td>
    <td>[ ] InfluxDB</td>
  </tr>
    <tr>
    <td>Vector Database</td>
    <td> [ ] </td>
  </tr>
  
</table>

</body></html>

## 数据存储分类

### OLAP

- [TiDB](https://docs.pingcap.com/zh/tidb/stable/overview) 是 [PingCAP](https://pingcap.com/about-cn/) 公司自主设计、研发的开源分布式关系型数据库，是一款同时支持在线 HTAP 的融合型分布式数据库产品，具备水平扩容或者缩容、金融级高可用、实时 HTAP、云原生的分布式数据库、兼容 MySQL 协议和 MySQL 生态等重要特性
-  [[ClickHouse]]
### HATP

>   Hybrid Transactional and Analytical Processing 
>   在线事务处理与在线分析处理 

### Type

- Data Process：OLAP ｜ OLTP｜HATP
- Data Model： Relational ｜Key-value｜Time Series｜Graph｜Document｜Vector｜Columnar｜Search｜Object-oriented｜Spatial｜RDF｜Multivalue｜Multivalue｜Event Store
- Deployment Model: Distributed | Centralized | Cloud-native 

## Product & Resource & Tools

- [DB-Engines](https://db-engines.com/en/) is an initiative to collect and present information on database management systems (DBMS). In addition to established relational DBMS, systems and concepts of the growing NoSQL area are emphasized. #knowledge
	- [DB-Engines Ranking](https://db-engines.com/en/ranking)

- [teable](https://teable.io/) Super fast, Real-time, Professional, Developer-friendly, No-code database #product 
	- > Built on PostgresQL, it offers seamless ecosystem integration with 2 single connection, making interfacing simple.  Easily expands with Bl, low-code, and ETL tools.
- [Hex](https://hex.tech/) is a modern, collaborative workspace for data science and analytics. #product #tools 