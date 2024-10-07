---
title: Apache Spark
tags:
  - bigdata
  - spark
  - apache
  - comput
---
### spark概述

#### 什么是spark？

> **Apache Spark™** is a unified analytics engine for large-scale data processing.

Apache Spark是一个针对于大规模数据处理的统一分析引擎


> [!NOTE] 只计算
> spark是基于内存的计算框架，计算速度非常快，但是这里仅仅只涉及到数据的计算，并没有涉及到数据的存储

#### Spark的四大特性

- **速度快**
	- 与MR对比：spark比mapreduce在内存中快100倍，比mapreduce在磁盘中快10倍
	- 原因：
		- MR 中间Job输出的结果需要落盘到磁盘中，又因为Job的依赖性，需进行大量磁盘IO
		- Spark中间Job输出的结果直接保存在内存中，大大减少了磁盘IO
- **易用性**
	- 可以快速写一个spark应用程序，通过java、scala、python、R、sql等不同的语言进行代码开发。
- **通用性**
	- Spark生态的不断发展，包括了SparkSQL、SparkStreaming、Mlib、GraphX不同的子项目
	- 一站式解决所有应用场景:  离线 & 实时 & 机器学习算法库 & 图计算
- **兼容性**
	- Spark任务可提交到多个计算资源环境中，如：StandAlone；Yarn；Apache Mesos


### Spark RDD

#### RDD 概述

> RDD（Resilient Distributed Dataset）叫做弹性分布式数据集，是Spark中最基本的数据抽象，它代表一个不可变、可分区、里面的元素可并行计算的集合

- Dataset：它就是一个集合，集合中存放大量的元素
- Distributed：它内部的数据是进行了分布式存储，后期方便于进行分布式计算
- Resilient：弹性 它表示的含义：rdd的数据可以保存在内存中或者是磁盘中

####  RDD的五大属性

- 一个分区列表（A list of partitions）
- 作用在每一个分区中函数（A function for computing each split）
- 一个RDD会依赖于其他多个RDD（A list of dependencies on other RDDs）
- **（可选项）** 对于KV类型的RDD才会有分区函数这个概念（必须要产生shuffle），不是KV类型的RDD分区函数是None（没有）（Optionally, a Partitioner for key-value RDDs (e.g. to say that the RDD is hash-partitioned)）
- **（可选项）** 一组最优的分区位置，这里就涉及到数据的本地性和数据块位置最优（Optionally, a list of preferred locations to compute each split on (e.g. block locations for an HDFS file)）
#### RDD的依赖关系

##### 窄依赖

> 窄依赖指的是每一个父RDD的Partition最多被子RDD的一个Partition使用

##### 宽依赖

 > 宽依赖指的是多个子RDD的Partition会依赖同一个父RDD的Partition

| 对比      | 是否产生Shuffle | 常用算子                      | 形象比喻成 |
| ------- | ----------- | ------------------------- | ----- |
| 窄依赖     | 不会          | flatMap<br>map<br>filter  | 独生子女  |
| **宽依赖** | 会           | reduceByKey<br>groupByKey | 超生    |


#### RDD的缓存机制

 
### Spark SQL

#### Spark SQL 概述

> **Spark SQL** is Apache Spark's module for working with structured data.

SparkSQL是Apache Spark的一个处理结构化数据的模块
    
它提供了一个编程抽象叫做DataFrame并且作为分布式SQL查询引擎的作用


#### Spark SQL四大特性

- 易整合
- 统一的数据源访问
- 兼容Hive
- 支持标准的数据库连接

#### DataFrame 概述


> [!WARNING] 版本
> Spark1.3.0之后把schema改为dataFrame，自己实现了RDD的一些方法

> 定义：DataFrame是一种以RDD为基础的分布式数据集，类似于传统数据库的二维表格

DataFrame带有Schema元信息，即DataFrame所表示的二维表数据集的每一列都带有名称和类型，但底层做了更多的优化

#### DataSet 概述

- DataSet是分布式的数据集合，提供了强类型支持，也是在RDD的每行数据加了类型约束
- DataSet是在Spark1.6中添加的新的接口，它集中了RDD的优点（强类型和可以用强大lambda函数）以及使用了Spark SQL优化的执行引擎


### Spark Streaming

#### SparkStreaming概述

> **Spark Streaming** makes it easy to build scalable fault-tolerant streaming applications.
> 
> SparkStreaming 是一个可以非常容易的构建可扩展、具有容错机制的流式应用程序

它就是一个实时处理的程序，数据源源不断的来，然后它就进行实时不断的处理

#### SparkStreaming原理

Spark Streaming 是基于Spark的流式批处理引擎，其基本原理是把输入数据以某一时间间隔批量的处理，当批处理间隔缩短到**秒级**时，便可以用于处理实时数据流

#### SparkStreaming特性

- **易用性**
	- 多语言开发（Java & Scala & Python）
- **容错性**
	- SparkStreaming可以实现恰好一次语义，数据被处理且只被处理一次，避免了数据丢失和数据的重复处理
- **可以融合到Spark生态系统**
	- SparkStreaming流式处理可以与批处理和交互式查询进行结合使用

#### SparkStreaming计算流程

SparkStreaming是某一个时间间隔的批处理，在时间维度上就划分成了很多job，每一个job都有大量的Dstream，对Dstream做大量的transformation转换操作，其本质是作用在它内部的RDD上。也就是说Dstream内部是封装了RDD，RDD内部又有很多个分区，分区里面才是真正的数据。

#### SparkStreaming容错性

- DStream 封装了RDD
	- RDD自身是具有容错机制，就是通过lineage血统来实现某些rdd的分区数据丢失之后，然后进行重新计算恢复得到
- 同时对于网络数据的处理
	- SparkStreaming在接受到数据之后它会把网络中的数据保留多份到其他机器，保证数据源端的安全性
- 某个RDD的数据丢失之后恢复逻辑：血统+数据源

#### SparkStreaming实时性

SparkStreaming是以某一时间间隔的批量处理，它的实时性就比较低，延迟就比较高。如果对数据的实时性非常高，就考虑Storm

### DStream 概述

> DStream (Discretized Stream) 是SparkStreaming的基础抽象，代表持续性的数据流和经过各种Spark算子操作后的结果数据流。在内部实现上，DStream 是一系列连续的RDD来表示。每个RDD含有一段时间间隔内的数据

#### DStream 操作上的分类

##### 转换 (Transformation)

可以把一个DStream转换生成一个新的Dstream，它也是延迟加载，不会立即触发任务的运行。类似于RDD中Transformation操作

##### 输出（Output Operation）

它会触发任务的真正运行，类似于RDD中action操作