---
aliases:
  - Kafka
  - 卡夫卡
title: Apache Kafka
tags:
  - data-integration
  - mq
date: 2023-10-04
---
## Kafka 概述

### 定义

Kafka 由`Scala`和`Java`编写,Kafka是一种`高吞吐量`的分布式`发布-订阅`消息系统.

- `消息队列（mq）` : 消息的传输过程中保存消息的容器 ， 把要传输的数据放在队列中

- `发布/订阅`：消息的发布者不会将消息直接发送给特定的订阅者，而是将发布的消息分为不同的类别，订阅者只接收感兴趣的消息

- 默认端口: 9092

### API

Kafka拥有三个非常重要的角色特性

- 消息系统。与传统的消息队列或者消息系统类似。  
- 存储系统。可以把消息持久化到磁盘，有较好的容错性。  
- 流式处理平台。可以在流式记录产生时就进行处理。

#### 消息队列的两种模式

两种类型的消息传递模式可用：

- 点、对点模式 : 一个生产者+一个消费者+一个topic，会删除数据 `不常用` # 一对一
> 消费者主动拉取数据，消息收到后清除消息
- 发布-订阅模式 : 多个生产者+多个消费者+多个topic/相互独立，不会删除数据 # 多对多

### 基础架构

### **Kafka支持的主要应用场景**

- “**削峰填谷**”：所谓的“削峰填谷”就是指缓冲上下游瞬时突发流量，使其更平滑
- **解耦** ：即允许独立的扩展或修改两边的处理过程，只要确保它们遵守同样的接口约束
- **异步通信**：即允许把一个消息放入队列，但并不立即处理它们，然后再需要的时候才去处理它们。

---

### Resource  

### Books List
- [2170922-EB-I\_Heart\_Logs.pdf](https://assets.confluent.io/m/48c5ed8540ec1f7e/original/2170922-EB-I_Heart_Logs.pdf?_gl=1*rzw9o1*_gcl_au*MTA0NTQwODY3OC4xNzI4NjE2MDMzLjIwNDM1MDgzMjEuMTcyODYxNjUyNi4xNzI4NjE2NTI1*_ga*MTgxMDc0MjE0Ni4xNzI4NjE2MDM3*_ga_D2D3EGKSGD*MTcyODYxNjAzNi4xLjEuMTcyODYxNjUyNy41OC4wLjA.&_ga=2.264712591.1058057393.1728616037-1810742146.1728616037)

### Paper List

- [KSQL: Streaming SQL Engine for Apache Kafka](https://openproceedings.org/2019/conf/edbt/EDBT19_paper_329.pdf) 

#### Projects

- [Apache Projects Directory](https://projects.apache.org/)

#### Presentation

[Keynote Session | Kafka Summit London 2024](https://www.confluent.io/events/kafka-summit-london-2024/keynote-session/)

### Question

> [面试|Kafka常见面试问题总结 | Jmx's Blog](https://jiamaoxiang.top/2020/09/08/%E9%9D%A2%E8%AF%95-Kafka%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95%E9%97%AE%E9%A2%98%E6%80%BB%E7%BB%93/)

- Kafka是如何保障数据不丢失的？
    
- 如何解决Kafka数据丢失问题？
    
- Kafka可以保障永久不丢失数据吗？
    
- 如何保障Kafka中的消息是有序的？
    
- 如何确定Kafka主题的分区数量？
    
- 如何调整生产环境中Kafka主题的分区数量？
    
- 如何重平衡Kafka集群？
    
- 如何查看消费者组是否存在滞后消费？


### Business Example

- Kafka at LinkedIn
	- ![[Apache Kafka.png]]
- 2019-05-17 [快手万亿级别Kafka集群应用实践与技术演进之路](https://www.infoq.cn/article/Q0o*QzLQiay31MWiOBJH)
	- 快手 Kafka 使用场景
	- Kafka 的 5 点重要改进：平滑扩容、Mirror 集群化、资源隔离、cache 改造以及消费智能限速
### Reference
- [The Log](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying) : What every software engineer should know about real-time data's unifying abstraction - By Jay PKreps 201311
- [Bufstream](https://medium.com/data-engineer-things/bufstream-stream-kafka-messages-to-iceberg-tables-in-minutes-6c60c470e67f) 几分钟内将 Kafka 消息传输到 Iceberg
- [Monitoring Kafka Performance Metrics | Datadog](https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/)
- [Kafka入门实战教程（1）基础概念与术语 ](https://www.cnblogs.com/edisonchou/p/kafka_study_notes_part1.html)
- [Kafka 快速入门 | BIGDATA-TUTORIAL](https://dunwu.github.io/bigdata-tutorial/kafka/Kafka%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8.html#_1-1-kafka-%E7%9A%84%E5%8A%9F%E8%83%BD)
- [Apache Kafka](https://kafka.apache.org/books-and-papers) include Books and Papers
- [What is Apache Kafka](https://bell-sw.com/blog/a-guide-to-event-streaming-with-apache-kafka/)
- [Know Streaming](https://knowstreaming.com/) Kafka实时流运行平台，提供运维管控、监控告警、资源治理、多活容灾等核心场景
- [Apache Kafka ](https://medium.com/data-engineer-things/apache-kafka-overview-b04c4ab8ef49) Overview. The terminology and the architecture. | by Vu Trinh | Data Engineer Things
- [源码的一些介绍](http://www.heartthinkdo.com/?p=2006#12)

