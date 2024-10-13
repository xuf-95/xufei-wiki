---
title: Apache Kafka
tags:
  - data-integration
  - kafka
  - MQ
---
## Kafka 概述

> **Apache Kafka 是一款开源的`消息引擎系统`，也是一个`分布式流计算平台`（ Event Streaming Platform）<存储和分析> ，此外，还可以作为`数据存储`**。

![[Pasted image 20241010000841.png]]

### Kafka 版本信息

#### 发行版本

|                   | 来源             | 优势                               | 缺失                          |
| ----------------- | -------------- | -------------------------------- | --------------------------- |
| **Apache Kafka**  | 社区版 Kafka      | 优势在于迭代速度快，社区响应度高，使用它可以让你有更高的把控度； | 仅提供基础核心组件，缺失一些高级的特性         |
| Confluent Kafka   | Confluent 公司提供 | 集成了很多高级特性且由 Kafka 原班人马打造，质量上有保证  | 相关文档资料不全，普及率较低，没有太多可供参考的范例。 |
| **CDH/HDP Kafka** | 大数据云公司提供       | 操作简单，节省运维成本；                     | 把控度低，演进速度较慢                 |
### Apache Kafka 版本日志

| 版本    | 更新日志                                                   | 更新时间     | 文档链接                                              |
| ----- | :----------------------------------------------------- | -------- | ------------------------------------------------- |
| 3.5.0 | Kafka Streams API的增强，增加对 KIP-847（兼容性优化）的支持；添加更强大的监控工具。 | 2023年6月  | [文档链接](https://kafka.apache.org/35/documentation) |
| 3.4.0 | 引入了可伸缩的 Kafka Connect，并增加了 Kafka Streams 中容错处理的功能。     | 2023年2月  | [文档链接](https://kafka.apache.org/34/documentation) |
| 3.3.0 | 新的 Streams API 改进，如交叉分区流的处理；新的分区分配策略。                  | 2022年9月  | [文档链接](https://kafka.apache.org/33/documentation) |
| 2.8.0 | 支持多租户，改进了 Kafka Connect 的任务分布和恢复。                      | 2021年4月  | [文档链接](https://kafka.apache.org/28/documentation) |
| 2.7.0 | 增加了对动态配置更改的支持，并显著改进了流处理性能。                             | 2020年12月 | [文档链接](https://kafka.apache.org/27/documentation) |

其他更新：流处理和连接器等子系统引入了新的功能
- [oai_citation:2,Apache Kafka](https://kafka.apache.org/downloads)
- [oai_citation:1,Apache Kafka](https://kafka.apache.org/20/documentation/streams/upgrade-guide)
- [Apache Kafka Upgrade Guide and API Changes](https://kafka.apache.org/20/documentation/streams/upgrade-guide)
### Kafka 功能特性（设计目标）

**高性能**：
- **分区、分段、索引**
- **零拷贝**
- **顺序读写**
- **页缓存**
- **批量读写**
- **pull 模式**
- **数据压缩**

**高可用**：
- **持久化**
- **副本机制**
- **选举 Leader**

**扩展性**：
- **分区**



Kafka 由`Scala`和`Java`编写,Kafka是一种`高吞吐量`的分布式`发布-订阅`消息系统.

- `消息队列（mq）` : 消息的传输过程中保存消息的容器 ， 把要传输的数据放在队列中

- `发布/订阅`：消息的发布者不会将消息直接发送给特定的订阅者，而是将发布的消息分为不同的类别，订阅者只接收感兴趣的消息

 - 默认端口: 9092

###


Apache Kafka有4个主要的API：
    1、生产者接口
    2、消费者接口
    3、流接口
    4、连接器接口

Kafka拥有三个非常重要的角色特性：  
- 消息系统。与传统的消息队列或者消息系统类似。  
- 存储系统。可以把消息持久化到磁盘，有较好的容错性。  
- 流式处理平台。可以在流式记录产生时就进行处理。


#### 消息队列的两种模式

两种类型的消息传递模式可用：

点对点模式 : 一个生产者+一个消费者+一个topic，会删除数据 `不常用` # 一对一
> 消费者主动拉取数据，消息收到后清除消息

![[Pasted image 20241010000458.png]]

发布-订阅模式 : 多个生产者+多个消费者+多个topic/相互独立，不会删除数据 # 多对多

![[Pasted image 20241010000541.png]]
## 基础架构

```python
1、生产者 # 发送数据 100T
2、broker
	2-1: 服务器 hadoop102 
	2-2: topic 主题
	2-3: 分区
	2-4: 可靠性: 副本
	2-5: leader follower
	2-6: 生产者和消费者，只针对leader节点操作
3、消费者
	3-1: 消费者和消费者相互独立
	3-2: 消费者组 : 每个分区的数据只能由消费者组中的一个消费者消费
	4-1: broker.ids 0 1 2 
	4-2: leader leader 
```


### **Kafka支持的主要应用场景**

1）“**削峰填谷**”。所谓的“削峰填谷”就是指缓冲上下游瞬时突发流量，使其更平滑
2）**解耦**，即允许独立的扩展或修改两边的处理过程，只要确保它们遵守同样的接口约束
3）**异步通信**，即允许把一个消息放入队列，但并不立即处理它们，然后再需要的时候才去处理它们。



---

## Resource  

#### Books List
- [2170922-EB-I\_Heart\_Logs.pdf](https://assets.confluent.io/m/48c5ed8540ec1f7e/original/2170922-EB-I_Heart_Logs.pdf?_gl=1*rzw9o1*_gcl_au*MTA0NTQwODY3OC4xNzI4NjE2MDMzLjIwNDM1MDgzMjEuMTcyODYxNjUyNi4xNzI4NjE2NTI1*_ga*MTgxMDc0MjE0Ni4xNzI4NjE2MDM3*_ga_D2D3EGKSGD*MTcyODYxNjAzNi4xLjEuMTcyODYxNjUyNy41OC4wLjA.&_ga=2.264712591.1058057393.1728616037-1810742146.1728616037)

#### Paper List

- [KSQL: Streaming SQL Engine for Apache Kafka](https://openproceedings.org/2019/conf/edbt/EDBT19_paper_329.pdf) 

#### Projects

- [Apache Projects Directory](https://projects.apache.org/)

#### Presentation

[Keynote Session | Kafka Summit London 2024](https://www.confluent.io/events/kafka-summit-london-2024/keynote-session/)
## Reference

- [Apache Kafka](https://kafka.apache.org/)
- [1. 入门 - 【布客】kafka 中文翻译](https://kafka.apachecn.org/1/)
- [Kafka入门实战教程（1）基础概念与术语 - EdisonZhou - 博客园](https://www.cnblogs.com/edisonchou/p/kafka_study_notes_part1.html)
- [Kafka 快速入门 | BIGDATA-TUTORIAL](https://dunwu.github.io/bigdata-tutorial/kafka/Kafka%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8.html#_1-1-kafka-%E7%9A%84%E5%8A%9F%E8%83%BD)
- [Apache Kafka](https://kafka.apache.org/books-and-papers)  Books and Papers
- [What is Apache Kafka](https://bell-sw.com/blog/a-guide-to-event-streaming-with-apache-kafka/)