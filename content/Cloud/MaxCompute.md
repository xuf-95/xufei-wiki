---
aliases:
  - ODPS
  - MaxCompute
tags:
  - cloud
  - aliyun
date: 2023-03-11
draft: false
---

### 概述

MaxCompute（原名ODPS，Open Data Processing Service）是阿里云提供的企业级云原生大数据计算服务，定位于PB/EB级数据仓库解决方案，采用Serverless架构，资源弹性扩展，提供全托管、高扩展的分布式存储与计算能力。同时还提供离线和实时的数据接入，支持大规模数据计算及查询加速能力，为您提供面向多种计算场景的数据仓库解决方案及分析建模服务。

### 特性

- 集成AI能力：与人工智能平台 PAI无缝集成，提供强大的机器学习处理能力，可使用Spark-ML开展智能分，可以使用Python机器学习三方库
- 深度集成[[Apache Spark]]引擎：内建Apache Spark引擎，提供完整的Spark功能
- 湖仓一体：集成对数据湖（OSS或[[HDFS]]）的访问分析，支持通过外部表映射、Spark直接访问方式开展数据湖分析 
- 离线实时一体：与实时数仓Hologres深度融合，支持外部表关联查询，支持存储层直读，查询效率相比其他类型外部表高5倍以上。Hologres针对MaxCompute支持查询加速，数据无需移动，查询加速10倍以上。支持MaxCompute元数据的批量导入，无需手工创建外表
- 列式存储：存储引擎主要采用列压缩存储格式，通常情况下可达到5倍压缩比

### 架构
![[MaxCompute 架构.png]]

#### 分布式计算
![[MaxCompute计算架构.png]]

### 原理 & 功能
![[MaxCompute.png]]

