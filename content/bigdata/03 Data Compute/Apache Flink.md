---
title: Apache Flink
tags:
  - bigdata
  - datastore
  - flink
date: 2023-06-07
---
### 1. 简介

 > Apache Flink 是一个框架和分布式处理引擎，用于在无界和有界数据流上进行有状态的计算。Flink被设计为在所有常见的集群环境中运行，以内存中的速度和任何规模执行计算
 
 Apache Flink 是一个开源的流处理框架，具有强大的流处理和批处理功能。
 Apache Flink 是一个'框架'和'分布式'处理引擎，用于对`无界和有界数据流`进行`状态计算`
 

#### Flink核心

- 状态 + 时间(水位线) + 事件驱动
   - 有状态 : 输入值 + 初始值 = 输出值
   - 无状态 : 输入值 = 输出值

### 1.1 Flink 分层架构

![](https://cdn.nlark.com/yuque/0/2021/webp/5365885/1609856070468-5501670f-a85f-40bc-b1d0-b6ca03ee5b6b.webp)

- Deployment层  
    涉及Flink的部署模式，本地模式. 集群模式（Standalone/YARN）. 云。生产环境中主要为YARN模式。
- RunTime层  
    提供了支持Flink计算的全部核心实现，例如：支持分布式的Stream处理. 调度策略等，为上层API服务。
- API层  
    实现面向无界Stream的流处理和面向Batch的批处理API，分别为DataStream API和DataSet API。
- Libaries层  
    在API层之上构建的满足特定应用的实现计算框架，分别用于面向流处理和批处理。  
    CEP面向事件，Table用于类SQL，FlinkML用于机器学习，Gelly为图处理。

### 1.2 **流与批的世界观**？

- 批处理的特点是有界. 持久. 大量，非常适合需要访问全套记录才能完成的计算工作，一般用于离线统计。
- 流处理的特点是无界. 实时, 无需针对整个数据集执行操作，而是对通过系统传输的每个数据项执行操作，一般用于实时统计。
- 在 spark 的世界观中，一切都是由批次组成的，离线数据是一个大批次，而实时数据是由一个一个无限的小批次组成的。
- 而在 flink 的世界观中，一切都是由流组成的，离线数据是有界限的流，实时数据是一个没有界限的流，这就是所谓的有界流和无界流。
- 无界数据流：无界数据流有一个开始但是没有结束，它们不会在生成时终止并提供数据，必须连续处理无界流，也就是说必须在获取后立即处理 event。对于无界数据流我们无法等待所有数据都到达，因为输入是无界的，并且在任何时间点都不会完成。**处理无界数据通常要求以特定顺序（例如事件发生的顺序）获取 event**，以便能够推断结果完整性。
- 有界数据流：有界数据流有明确定义的开始和结束，可以在执行任何计算之前通过获取所有数据来处理有界流，处理有界流不需要有序获取，因为可以始终对有界数据集进行排序，有界流的处理也称为批处理。
- **流处理一般支持低延迟. Exactly-once保证（仅用一次）**
- **批处理则是需要支持高吞吐. 高效处理。**
- Flink完全支持流处理，作为流处理看待时输入数据流是无界的；批处理被作为一种特殊的流处理，其输入数据流有界。

![](https://cdn.nlark.com/yuque/0/2021/png/5365885/1609855791068-8123de66-0eac-4e02-93ea-91a742170c51.png)

### 1.3 基本概念和基本架构

#### 1.3.1基本概念

**Flink程序的基础构建模块是流（Streams）和转换（transformations）。流就是数据的输入，转换是对数据的操作。****每个流都起始于一个或多个source，并终止于一个sink**

![](https://cdn.nlark.com/yuque/0/2021/png/5365885/1609856231542-35806e01-e721-40c2-b01d-3b572d8f54c1.png)

**_Flink程序映射为Streaming Dataflow_**

- 流上的聚合需要由窗口来划定范围，比如时间区间和数量的序号范围等
- 窗口分为多个类型
- **滚动窗口**（没有数据重叠）
- 滑动窗口（有数据重叠）
- 会话窗口（由不活动的间隙打断）

![](https://cdn.nlark.com/yuque/0/2021/png/5365885/1609856444234-829d01d8-856c-47e6-8f2e-a293cb9a282f.png)

**_窗口类型示意图_**

上图中的sliding size 是滑动窗口在滑动过程中的时间间隔。

滚动窗口有滚动时间窗口和滚动数据窗口，前者划定一段时间内的数据，后者等待数据规模到达阈值。

#### 1.3.2 基本架构

Flink是基于Master-Slave风格的架构, 其启动时会启动JobManager进程和至少一个TaskManager进程

![](https://cdn.nlark.com/yuque/0/2021/png/5365885/1609857020207-280b469a-617d-4a6e-995c-3748cad1ebff.png)

- JobManager  
    系统的协调者，负责接收Job，调度组成Job的多个Task的执行。  
    收集Job的状态信息，管理从节点TaskManager。
- TaskManager  
    实际负责执行计算的工作节点，在其上执行Task。  
    TaskManager负责管理其所在节点上的资源信息，并在启动时将这些信息向JobManager汇报。
- Client  
    用户提交Flink程序的时候，会先创建一个Client，该Client对提交的程序进行预处理后在提交到Flink集群。  
    Client会将用户提交的Flink程序组成一个JobGraph，并以这种形式提交。

### 数据模型

1. Spark 采用`RDD`模型，Spark Streaming 的 DStream 实际上是一组组小批数据RDD的集合
2. Flink `基本数据模型`是数据流，以及事件（Event）序列（Integer. String. Long. POJO Class）

![](https://cdn.nlark.com/yuque/0/2024/jpeg/5365885/1721721876645-f4a3a8bd-cba2-4edd-908a-aef3558868c7.jpeg)

## ![](https://cdn.nlark.com/yuque/0/2023/png/5365885/1673366504595-428e9b64-bb81-4e22-86df-304af1c8c825.png)

## 简介

Apache Flink 是一个开源的流处理框架，具有强大的流处理和批处理功能。

Apache Flink 是一个'框架'和'分布式'处理引擎，用于对`无界和有界数据流`进行`状态计算`。

### Apache Flink 的定义

Apache Flink是一个框架和分布式处理引擎，用于在无界和有界数据流上进行有状态计算。Flink被设计为可以在所有常见的集群环境中运行，以内存中的速度和任意规模执行计算。

### Flink核心

- 状态 + 时间(水位线) + 事件驱动
	- 有状态 : 输入值 + 初始值 = 输出值
	- 无状态 : 输入值 = 输出值

### Flink 主要特点

1. `流数据`更真实地反映了我们的生活方式
2. 低延迟（Spark Streaming 的延迟是秒级，Flink 延迟是毫秒级）
3. 高吞吐（阿里每秒钟使用Flink 处理4.6PB，双十一大屏）
4. 结果的准确性和良好的容错性（exactly-once）

### Flink 其他特点

1. 支持事件时间（event-time）和处理时间（processing-time）语义
2. 精确一次（exactly-once）的状态一致性保证
3. 低延迟，每秒处理数百万个事件，毫秒级延迟（实际上就是没有延迟）
4. 与众多常用存储系统的连接（ES，HBase，MySQL，Redis⋯）
5. 高可用（zookeeper），动态扩展，实现7*24 小时全天候运行

### Flink vs Spark Streaming区别

#### 数据模型

1. Spark 采用'RDD'模型，Spark Streaming 的DStream 实际上是一组组小批数据RDD的集合
2. Flink '基本数据模型'是数据流，以及事件（Event）序列（Integer. String. Long. POJO Class）

#### 运行时架构

1. Spark 是'批计算'，将DAG 划分为不同的Stage，一个Stage完成后才可以计算下一个Stage
2. Flink 是'流计算'，一个事件在一个节点处理完后可以直接发往下一个节点进行处理

#### Flink 应用场景

- 电商和市场营销 # 数据报表. 广告投放. 业务流程需要
- 物联网（IOT）# 传感器实时数据采集和显示. 实时报警，交通运输业（自动驾驶）
- 电信业 # 基站流量调配
- 银行和金融业 # 实时结算和通知推送，实时检测异常行为（信用卡盗卡）

#### 数据架构演变

**事务处理 OLTP**
![[Pasted image 20241007221530.png]]

- 分析处理 OLAP ： 将数据从业务数据库复制到数仓，再进行分析和查询
![[Pasted image 20241007221726.png]]

- lambda 架构 :  用两套系统，同时保证低延迟和结果准确
![[Pasted image 20241007221747.png]]

- 有状态的流式处理流程
![[Pasted image 20241007221802.png]]

- 流处理的演变
![[Pasted image 20241007221829.png]]


- 本质 : 事件驱动（Event-driven）
![[Pasted image 20241007221844.png]]


- 基于流的世界观 : 一切都是由流组成的，离线数据是有界的流；实时数据是一个没有界限的流：这就是所谓的有界流和无界流
![[Pasted image 20241007221904.png]]

- Flink 分层API
![[Pasted image 20241007221915.png]]

- 有状态 与 无状态
![[Pasted image 20241007221935.png]]

## WordCount IDEA例子

## 运行架构

### Flink 运行时的组件

1. 作业管理器 JobManager
2. 资源管理器 ResourceManager
3. 任务管理器 TaskManager
4. 分发器 Dispatcher

### 数据流

1. Source # 负责读取数据源
2. Transformation # 利用各种算子进行处理加工
3. Sink # 负责输出

### 网络IO通信底层

1. erlang
2. akka
3. netty

#### 典型的Master-Slave 架构

![[Pasted image 20241007221952.png]]

#### 任务提交流程

![[Pasted image 20241007222013.png]]

#### 任务调度原理

![[Pasted image 20241007222021.png]]

#### 任务管理器和插槽

![[Pasted image 20241007222033.png]]

#### 并行度 Parallelism

![[Pasted image 20241007222055.png]]


#### 并行子任务分配

![[Pasted image 20241007222150.png]]

#### 数据流

![[Pasted image 20241007222202.png]]

![[Pasted image 20241007222211.png]]

#### 任务链
![[Pasted image 20241007222219.png]]

## DataSteam API

- 流处理 API

![[Pasted image 20241007222249.png]]

Flink中的算子是将'一个或多个DataStream'转换为'新的DataStream'，可以将多个转换组合成复杂的数据流拓扑。

- 源算子 Source # 数据读取，从集合. 文件. kafka. 自定义...
- 转换算子 Transformation
- 输出算子 Sink # 数据输出，写入文件. kafka. redis. Elasticsearch. JDBC...

#### 转换算子 Transformation

- map # 理解为映射，对每个元素进行一定的变换后，映射为另一个元素。

- flatmap # 理解为将元素摊平，每个元素可以变为0个. 1个. 或者多个元素。

- filter # 进行筛选。

- keyBy # 将Stream根据指定的Key进行分区，是根据key的散列值进行分区的。

- 滚动聚合算子（ Rolling Aggregation ) : sum() min() max() minBy() maxBy()

- reduce # 归并操作，它可以将KeyedStream 转变为 DataStream。

- split 和 select # 将一个流拆分为多个流

- connect 和 CoMap # 将两个流纵向地连接起来，数据类型可不同

- union # 多个流合并到一个流中，以便对合并的流进行统一处理。是对多个流的水平拼接。参与合并的流必须是同一种类型。

- fold # 给定一个初始值，将各个元素逐个归并计算。它将KeyedStream转变为DataStream。

- join # 指定的Key将两个流进行关联。

#### map 和 flatMap 区别:

map：map方法返回的是一个object，map将流中的当前元素替换为此返回值；

flatMap：flatMap方法返回的是一个stream，flatMap将流中的当前元素替换为此返回流拆解的流元素；

##### 例子 : 有二箱鸡蛋，每箱5个，现在要把鸡蛋加工成煎蛋，然后分给学生。

map做的事情：把二箱鸡蛋分别加工成煎蛋，还是放成原来的两箱，分给2组学生；

flatMap做的事情：把二箱鸡蛋分别加工成煎蛋，然后放到一起【10个煎蛋】，分给10个学生

**基础数据类型**

- 支持所有的 Java 和 Scala 基础数据类型， Int, Double, Long, String, …

- Java 和 Scala 元组（ Tuples ）

- Scala样例类（ case classes ）

- Java简单对象（ POJOs ）

- 其它（ Arrays, Lists, Maps , Enums, 等等）

**实现 UDF 函数 更细粒度的控制流**

- **函数类**（ Function Classes ）

- **匿名函数**（ Lambda Functions ）

- **富函数**（ Rich Functions ） # 可以获取运行环境的上下文，并拥有一些生命周期方法，所以可以实现更复杂的功能。

- open()

- getRuntimeContext().getState();

- close()

```scala
Flink RichFunction & state
class flatMap_rich extends RichFlatMapFunction<In,Out>{
  override def open(configuration:Confuration) : kic  Unit = {} 
  //创建初始话函数，例如创建和外部系统的连接
  override def flatMap(in : In,out:Collector<Out>)() :Unit = {} 
  //做一些操作
  override def close : Unit = {} 
  //做一些清理工作，例如关闭和外部系统的连接
}
```

- DataStream
![[Pasted image 20241007222635.png]]


## Window API

窗口（Window）: "[ ) 左闭右开"  : 将无限流切割为有限流的一种方式，它会将流数据分发到有限大小的桶（bucket）中进行分析
             
#### 窗口分类

1. 滚动窗口 Tumbling Windows
    1. 将数据依据固定的窗口长度对数据进行切分
    2. 时间对齐，窗口长度固定，没有重叠
    
2. 滑动窗口 Sliding Windows
    1. 滑动窗口是固定窗口的更广义的一种形式，滑动窗口由固定的窗口长度和滑动间隔组成
    2. 窗口长度固定，可以有重叠
    
3. 会话窗口 Session Windows
    1. 由一系列事件组合一个指定时间长度的timeout 间隙组成，也就是一段时间没有接收到新数据就会生成新的窗口
    2. 时间无对齐
    3. 只有Flink 支持会话窗口
     
#### 窗口分类

1. 时间窗口（Time Window）
    1. 滚动时间窗口
    2. 滑动时间窗口
    3. 会话窗口（只有Flink 支持）
2. 计数窗口（Count Window）
    1. 滚动计数窗口
    2. 滑动计数窗口
    

- 有界的流 => 窗口
![[Pasted image 20241007222957.png]]


- 滚动窗口 Tumbling Windows
![[Pasted image 20241007223158.png]]

- 滑动窗口 : 存在重叠 Sliding Windows
![[Pasted image 20241007223230.png]]

- 会话窗口 Session Windows
![[Pasted image 20241007223246.png]]

## Wartermark

在Flink中，水位线（watermark）是一种'衡量Event Time进展'的机制，用来'处理实时数据中的乱序'问题的，通常是'水位线'和'窗口'结合使用来实现。 # 由于网络. 分布式等原因，会导致乱序数据的产生

    1. 水位线是一种逻辑时钟
    2. 水位线由程序员编程插入到数据流中
    3. 水位线是一种特殊的事件
    4. 在事件时间的世界里，水位线就是时间
    5. 水位线 = 观察到的最大时间戳 - 最大延迟时间 - 1 毫秒
    6. 水位线超过窗口结束时间，窗口闭合，默认情况下，迟到元素被抛弃
    7. Flink 会在流的最开始插入一个时间戳为负无穷大的水位线
    8. Flink 会在流的最末尾插入一个时间戳为正无穷大的水位线
    
1. Event Time（事件时间）：事件创建的时间（必须包含在数据源中的元素里面）
2. Ingestion Time（摄入时间）：数据进入Flink 的source 算子的时间，与机器相关
3. Processing Time（处理时间）：执行操作算子的本地系统时间，与机器相关
    
迟到数据处理 # 原因 ： 由于网络. 分布式等原因，会导致乱序数据的产生
	1. 直接抛弃迟到的元素
	2. 将迟到的元素发送到另一条流中去
	3. 可以更新窗口已经计算完的结果，并发出计算结果

- **时间定义**

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406154428961.png)

- 事件时间更重要

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220404170327102.png)

- 水位线特点

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220404172743400.png)

- [Flink详解系列之五--水位线（watermark） - 简书 (jianshu.com)](https://www.jianshu.com/p/c52ad3f284ee)

## 状态管理

```
Flink 中的状态 # 类似本地变量
	1. 算子状态 Operatior State # 算子状态的作用范围限定为算子任务
		1. 列表状态 List state
		2. 联合列表状态 Union list state
		3. 广播状态 Broadcast state
	2. 键控状态 Keyed State # 根据输入数据流中定义的键（ key ）来维护和 访问
		1. 值状态（ValueState）：将状态表示为单个的值
        2. 列表状态（List State）：将状态表示为一组数据的列表
        3. 字典状态（MapState）：将状态表示为一组Key-Value 对
        4. 聚合状态：将状态表示为一个用于聚合操作的列表
	3. 状态后端 State Backends # 状态的存储 . 访问以及维护
```

- 状态流

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406160217475.png)

- Flink 的状态

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406160054122.png)

- 算子状态

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406160334115.png)

- 键控状态

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406160359475.png)

## 容错机制

```
1. Flink 故障恢复机制的核心 : 应用状态的一致性检查点
2. 应用状态的一致性检查点 : 所有任务的状态，在某个时间点的一份的快照 ( 时间点 ： 是所有任务都恰好处理完一个相同的输入数据的时候)

3. 从检查点恢复状态
	1. 重启应用
	2. 从 checkpoint 中读取状态，将状态重置
	3. 开始消费并处理检查点到发生故障之间的所有数据 # 精确一次
	
保存点
```

- 一致性检查点 Checkpoints

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406161530008.png)

## 状态一致性

```
状态一致性分类
1. AT-MOST-ONCE（最多一次）
	当任务故障时，最简单的做法是什么都不干，既不恢复丢失的状态，也不重播丢失的数据。At-most-once 语义的含义是最多处理一次事件。例如：UDP，不提供任何一致性保障
2. AT-LEAST-ONCE（至少一次）
	在大多数的真实应用场景，我们希望不丢失事件。这种类型的保障称为at-least-once，意思是所有的事件都得到了处理，而一些事件还可能被处理多次。
3. EXACTLY-ONCE（精确一次）
	恰好处理一次是最严格的保证，也是最难实现的。恰好处理一次语义不仅仅意味着没有事件丢失，还意味着针对每一个数据，内部状态仅仅更新一次。


端到端 exactly once
    1. 内部保证——checkpoint（分布式异步快照算法）
    2. Source 端——可重设数据的读取位置（Kafka，FileSystem）
    3. Sink 端——从故障恢复时，数据不会重复写入外部系统
        幂等写入
        事务写入
 
1. 幂等写入 ： 是说一个操作，可以重复执行很多次，但只导致一次结果更改，也就是说，后面再重复执行就不起作用了 
2. 事务写入 ： 应用程序中一系列严密的操作，所有操作必须成功完成，否则在每个操作中所作的所有更改都会被撤消（ACID）；具有原子性：一个事务中的一系列的操作要么全部成功，要么一个都不做
	实现： 1. 预写日志	2. 两阶段提交
```

- Flink 与 Kafka  端到端状态一致性的保证

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406163826892.png)

# Flink Table API & SQL

[Apache Flink Documentation | Apache Flink](https://nightlies.apache.org/flink/flink-docs-release-1.14/)

```
Flink 本身是批流统一的处理框架，所以Table API 和SQL，就是批流统一的上层处理API
  
1. 基本结构 # 与流式处理的程序结构十分相似
2. 创建 TableEnvironment
3. 配置 TableEnvironment
4. 创建表 # 配置水位线
5. 表的查询 Table API
5. 表的查询 SQL
6. 输出表 # 输出到文件. kafka. ES. mysql

概念
	1. 动态表 Dynamic table
	2. 时间特性 Time Attributes
	3. 处理时间特性 Processing Time
	4. 事件时间特性 Event Time
	5. 窗口   	
		1. 分组窗口 Group Windows # 根据时间或行计数间隔，将行聚合到有限的组（ Group ）中，并对每个组的数据执行一次聚合函数 
			1. 滚动窗口
			2. 滑动窗口
			3. 会话窗口
		2. Over Windows  # 针对每个输入行，计算相邻行范围内的聚合
			1. 有界
			2. 无界
	6. 函数
	7. 用户自定义函数 UDF
	8. 标量函数 Scalar Functions
	9. 表函数 Table Functions
	10. 聚合函数 Aggregate Functions
	11. 表聚合函数 Table Aggregate Functions
	12. 更新模式
		1. 追加（ Append ）模式
		2. 撤回（ Retract ）模式
		3. 更新插入（ Upsert ）模式
```

- 传统的数据库SQL和实时SQL概念

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406165923778.png)

- 动态表与持续查询

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406165501355.png)

- 流数据转换成动态表

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406165537828.png)

- 持续查询

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406165820284.png)

- 将动态表转换成 DataStream

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406170101199.png)

- 函数

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406171102730.png)

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406171118743.png)

- 例子

```Java
package com.atguigu.apitest.tableapi;

import com.atguigu.apitest.beans.SensorReading;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.table.api.Table;
import org.apache.flink.table.api.java.StreamTableEnvironment;
import org.apache.flink.types.Row;


public class TableTest1_Example {
    public static void main(String[] args) throws Exception{
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.setParallelism(1);

        // 1. 读取数据
        DataStreamSource<String> inputStream = env.readTextFile("D:\\Projects\\BigData\\FlinkTutorial\\src\\main\\resources\\sensor.txt");

        // 2. 转换成POJO
        DataStream<SensorReading> dataStream = inputStream.map(line -> {
            String[] fields = line.split(",");
            return new SensorReading(fields[0], new Long(fields[1]), new Double(fields[2]));
        });

        // 3. 创建表环境
        StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

        // 4. 基于流创建一张表
        Table dataTable = tableEnv.fromDataStream(dataStream);

        // 5. 调用table API进行转换操作
        Table resultTable = dataTable.select("id, temperature")
                .where("id = 'sensor_1'");

        // 6. 执行SQL
        tableEnv.createTemporaryView("sensor", dataTable);
        String sql = "select id, temperature from sensor where id = 'sensor_1'";
        Table resultSqlTable = tableEnv.sqlQuery(sql);

        tableEnv.toAppendStream(resultTable, Row.class).print("result");
        tableEnv.toAppendStream(resultSqlTable, Row.class).print("sql");

        env.execute();
    }
}

----------------------------------------------
    
1. 启动flink-sql-client
    ./bin/start-cluster.sh

2. 启动 sql-client
   	./bin/sql-client.sh embedded
    
CREATE TABLE stock_plate (
  plate_type String,
  plate_name String ,
  blockcode String ,
  jycode String ,
  child_plate_name String,
  child_blockcode String,
  child_jycode String,
  market String,
  code String,
  PRIMARY KEY (code) NOT ENFORCED
) WITH (
  'connector.type' = 'jdbc',
  'connector.url' = 'jdbc:mysql://hadoop102:3306/level1_stock',
  'connector.table' = 'stock_plate',                                         
  'connector.username' = 'root',
  'connector.password' = '123456'
);

CREATE TABLE CustomerStatusChangedEvent(customerId int,
oStatus int,
nStatus int)with('connector.type' = 'kafka',
'connector.version' = 'universal',
'connector.properties.group.id' = 'g2.group1',
'connector.properties.bootstrap.servers' = 'hadoop102:9092,hadoop103:9092',
'connector.properties.zookeeper.connect' = 'hadoop102:2181',
'connector.topic' = 'customer_statusChangedEvent',
'connector.startup-mode' = 'earliest-offset',
'format.type' = 'json');
```

# Flink CEP

```
复杂事件处理 Complex Event Processing CEP
    
Pattern API # 处理事件的规则，被叫做“模式” Pattern
	1. 个体模式 Individual Patterns # 单例. 循环
	2. 组合模式 Combining Patterns ，也叫模式序列
	3. 模式组 Groups of patterns

模式序列
	1. 严格近邻 Strict Contiguity
	2. 宽松近邻 Relaxed Contiguity
	3. 非确定性宽松近邻 Non Deterministic Relaxed Contiguity
	
步骤
	1. 定义pattern
	2. 将pattern应用到流上
	3. 从流中提取数据
```

- CEP 特点

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406172902379.png)

- 模式序列

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406173023769.png)

# Flink CDC

```
CDC是 Change Data Capture "变更数据获取"的简称。
	核心思想是，监测并捕获'数据库的变动'（包括数据或数据表的插入 .  更新 以及 删除等），将这些变更按发生的顺序完整记录下来，写入到消息中间件中以供其他服务进行订阅及消费。
	
Flink-CDC ： 可以直接从 MySQL. PostgreSQL 等数据库直接"读取全量数据"和"增量变更数据"的 source 组件。 基于"Binlog"

CDC技术应用场景:
	1. 数据同步，用于备份，容灾
	2. 数据分发，一个数据源发送到多个下游
	3. 数据采集(E)，面向数据仓库/数据湖的ETL数据集成
```

[基于 Flink SQL CDC的实时数据同步方案 (dreamwu.com)](http://www.dreamwu.com/post-1594.html)

- 常见 CDC 开源

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406195030273.png)

- CDC 分类

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406173302767.png)

- 传统 CDC ETL 分析 ![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220409162353549.png)

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406194405019.png)

- 基于Flink CDC 的ETL 分析

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220409162226119.png)

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406202303813.png)

- 基于Flink CDC 的数据打宽

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406202332433.png)

- 基于Flink CDC 的聚合分析

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406202356159.png)

- 基础环境

```
#################################################
# mysql 开启 binlog
vim /etc/my.cnf

server-id=1
log-bin=mysql-bin
binlog_format=row
binlog-do-db=cdc_test

systemctl restart mysqld # 重启mysql

create database cdc_test;

CREATE TABLE cdc_test.user_info(
id VARCHAR(200) PRIMARY KEY,
NAME VARCHAR(200),
sex VARCHAR(200));

INSERT INTO cdc_test.user_info VALUES ('1001','AA','0');
INSERT INTO cdc_test.user_info VALUES ('1002','BB','0');
INSERT INTO cdc_test.user_info VALUES ('1003','CC','0');

#################################################
cd /opt/module/flink-1.13.1/lib
flink-shaded-hadoop-2-uber-2.8.3-10.0.jar
    
#################################################
bin/start-cluster.sh #  开启flink
#  运行
bin/flink run -m hadoop102:8081  -c com.atguigu.FlinkCDC /home/zhj/atguigu-flink-cdc-1.0-SNAPSHOT-jar-with-dependencies.jar
```

- 案例 api

```
package com.atguigu;

import com.ververica.cdc.connectors.mysql.MySqlSource;
import com.ververica.cdc.connectors.mysql.table.StartupOptions;
import com.ververica.cdc.debezium.DebeziumSourceFunction;
import com.ververica.cdc.debezium.StringDebeziumDeserializationSchema;
import org.apache.flink.runtime.state.filesystem.FsStateBackend;
import org.apache.flink.streaming.api.CheckpointingMode;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class FlinkCDC {

    public static void main(String[] args) throws Exception {

        //1.获取Flink 执行环境
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.setParallelism(1);

        //1.1 开启CK
        env.enableCheckpointing(5000);
        env.getCheckpointConfig().setCheckpointTimeout(10000);
        env.getCheckpointConfig().setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);
        env.getCheckpointConfig().setMaxConcurrentCheckpoints(1);

        env.setStateBackend(new FsStateBackend("hdfs://hadoop102:9820/cdc-test/ck"));

        //2.通过FlinkCDC构建SourceFunction
        DebeziumSourceFunction<String> sourceFunction = MySqlSource.<String>builder()
                .hostname("hadoop3")
                .port(3306)
                .username("root")
                .password("123456")
                .databaseList("cdc_test")
                .tableList("cdc_test.user_info")
                .deserializer(new StringDebeziumDeserializationSchema())
                .startupOptions(StartupOptions.initial())
                .build();
        DataStreamSource<String> dataStreamSource = env.addSource(sourceFunction);

        //3.数据打印
        dataStreamSource.print();

        //4.启动任务
        env.execute("FlinkCDC");

    }
}
```

- 案例2  flinksql

```
package com.atguigu;

import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.table.api.Table;
import org.apache.flink.table.api.bridge.java.StreamTableEnvironment;
import org.apache.flink.types.Row;

public class FlinkSQLCDC {

    public static void main(String[] args) throws Exception {

        //1.获取执行环境
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        // 并行度
        env.setParallelism(1);
        // 创建表环境
        StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

        //2.使用FLINKSQL DDL模式构建CDC 表
        tableEnv.executeSql("CREATE TABLE user_info ( " +
                " id STRING primary key, " +
                " name STRING, " +
                " sex STRING " +
                ") WITH ( " +
                " 'connector' = 'mysql-cdc', " +
                " 'scan.startup.mode' = 'latest-offset', " +
                " 'hostname' = 'hadoop3', " +
                " 'port' = '3306', " +
                " 'username' = 'root', " +
                " 'password' = '123456', " +
                " 'database-name' = 'cdc_test', " +
                " 'table-name' = 'user_info' " +
                ")");

        //3.查询数据并转换为流输出
        Table table = tableEnv.sqlQuery("select * from user_info");
        DataStream<Tuple2<Boolean, Row>> retractStream = tableEnv.toRetractStream(table, Row.class);
        retractStream.print();
        // 另一种输出格式
        tableEnv.sqlQuery("select * from user_info").print();

        //4.启动
        env.execute("FlinkSQLCDC");

    }
}
```

pom.xml

```
<dependencies>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-java</artifactId>
        <version>1.12.0</version>
    </dependency>

    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-streaming-java_2.12</artifactId>
        <version>1.12.0</version>
    </dependency>

    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-clients_2.12</artifactId>
        <version>1.12.0</version>
    </dependency>

    <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-client</artifactId>
        <version>3.1.3</version>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.48</version>
    </dependency>

    <dependency>
        <groupId>com.alibaba.ververica</groupId>
        <artifactId>flink-connector-mysql-cdc</artifactId>
        <version>1.2.0</version>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.75</version>
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-assembly-plugin</artifactId>
            <version>3.0.0</version>
            <configuration>
                <descriptorRefs>
                    <descriptorRef>jar-with-dependencies</descriptorRef>
                </descriptorRefs>
            </configuration>
            <executions>
                <execution>
                    <id>make-assembly</id>
                    <phase>package</phase>
                    <goals>
                        <goal>single</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

---

```
CDC设计实现:

    1. Chunk切分
    2. Chunk读取
    3. Chunk分配
    4. Chunk汇报
    5. Chunk分配
```

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406202605911.png)

# -----✂-----

# Flink 安装

```
🔰🔰🔰🔰🔰🔰🔰🔰	伪集群安装
# 环境配置 java1.8
cd /opt/software/ && \
tar -xzf flink-1.12.7-bin-scala_2.12.tgz -C /opt/module && \
cd /opt/module/flink-1.12.7

bin/start-cluster.sh # 启动
bin/stop-cluster.sh # 关闭

# Flink web
    http://hadoop102:8081/
    
# 启动jar
bin/flink run -c 入口类 examples/streaming/SocketWindowWordCount.jar 
bin/flink run -c 入口类 -p 3 examples/streaming/SocketWindowWordCount.jar # 并行度 3
bin/flink run examples/streaming/SocketWindowWordCount.jar 
bin/flink run examples/streaming/SocketWindowWordCount.jar --host had3 --port 7777

# 查看日志
tail -f log/*.out


🔰🔰🔰🔰🔰🔰🔰🔰	hadoop-yarn 集群模式
1. 开启 hadoop 集群
myhadoop.sh start

2. 启动 yarn-session
./yarn-session.sh -n 2 -s 2 -jm 1024 -tm 1024 -nm test -d

3. 执行任务
./flink run -c com.atguigu.wc.StreamWordCount FlinkTutorial-1.0-SNAPSHOT-jar-with-dependencies.jar --host lcoalhost –port 7777

4. 关闭 yarn-session
yarn application --kill application_1577588252906_0001


🔰🔰🔰🔰🔰🔰🔰🔰	k8s 集群模式
1. 搭建 Kubernetes 集群（略）
2. 配置各组件的 yaml 文件
3. 启动 Flink Session Cluster
```

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220403223558247.png)

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406135251818.png)

![](https://homjay.oss-cn-shanghai.aliyuncs.com/image-20220406140516806.png)

# -----✂-----

- 超链接

- [(72条消息) Flink 常用 API 详解_宝哥大数据的博客-CSDN博客_flink的api](https://blog.csdn.net/wuxintdrh/article/details/106487880)

- [Flink 双流 Join 的3种操作示例 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/309315334)

![](https://cdn.nlark.com/yuque/0/2023/png/5365885/1673367878243-92da6d8e-abf0-4502-bc03-0d324adea5ce.png)