---
title: Apache Flume
tags:
  - data-integration
  - flume
---
## Flume 概述

> Apache Flume is a distributed, reliable, and available system for efficiently collecting, aggregating and moving large amounts of log data from many different sources to a centralized data store.

Flume是一个分布式的. 可靠的. 可用的服务，用于高效地收集. 聚合和移动大量的日志数据。它具有基于流数据流的简单灵活的架构。它具有健壮性和容错性，具有可调的可靠性机制和许多故障转移和恢复机制。它使用一个简单的可扩展数据模型，允许在线分析应用程序

Flume 是 "Cloudera" 提供的一个高可用的，高可靠的，分布式的海量日志采集. 聚合和传输的系统。由 "JAVA" 编写， 基于流式架构，灵活简单，侧重点是 "日志数据"

### Data flow model
![[content/bigdata/01 Data Integration/img/flume.png]]

Agent : 是一个JVM进程，它以事件的形式将数据从源头送至目的。

	1. Source : 发送数据地
	2. Channel : 管道(缓冲区)
	3. Sink : 接收数据地
	4. Event : 传输单元，Flume数据传输的基本单元 （ 由 Header + Body 两部分组成 ）

Flume的Source，Sink，Channel的作用
	1. Source组件是专门用来收集数据的，可以处理各种类型. 各种格式的日志数据，常用Source类型
		- 监控后台日志：exec
		- 控后台产生日志的端口：netcat
	2. Channel组件对采集到的数据进行缓存，可以存放在Memory或File中
	3. Sink组件是用于把数据发送到目的地的组件

#### Flume Channel Selectors ( Channel 选择器 )

Channel Selectors，可以让不同的项目日志通过不同的Channel到不同的Sink中去。
	1、Replicating Channel Selector (default)
	2、Multiplexing Channel Selector

这两种Selector的区别是:
	1、Replicating 会将source过来的events发往所有channel,
	2、Multiplexing 可以选择该发往哪些Channel。

Flume不会丢失数据，但是有可能造成数据的重复，
	1、File Channel # 数据不会丢
	2、Memory Channel # 数据可能丢失

> 例如数据已经成功由Sink发出，但是没有接收到响应，Sink会再次发送数据，此时可能会导致数据的重复。

```python
1、监控端口数据，将数据打印到控制台
# 安装nc
yum install -y nc

# 监听本地ip端口6666服务
nc -l localhost 6666

# 连接本地ip端口6666通信，发送数据
nc localhost 6666

# 创建conf 使用docker cdh版本
cd /usr/lib/flume-ng
mkdir job 
cd job
vim flume-netcat-logger.conf
添加内容如下：
# Name the components on this agent
a1.sources = r1
a1.sinks = k1
a1.channels = c1

# Describe/configure the source
a1.sources.r1.type = netcat
a1.sources.r1.bind = localhost
a1.sources.r1.port = 6666

# Describe the sink
a1.sinks.k1.type = logger

# Use a channel which buffers events in memory
a1.channels.c1.type = memory
a1.channels.c1.capacity = 1000
a1.channels.c1.transactionCapacity = 100

# Bind the source and sink to the channel
a1.sources.r1.channels = c1
a1.sinks.k1.channel = c1

cd /usr/lib/flume-ng # 路径回退

### 启动命令
flume-ng agent --conf conf/ --name a1 --conf-file job/flume-netcat-logger.conf -Dflume.root.logger=INFO,console


### 参数讲解
参数说明：
	--conf/-c	：表示配置文件存储在conf/目录，flume.conf 使用这个为主配置文件
	--name/-n	：表示给agent起名为a1
	--conf-file/-f	：flume本次启动读取的配置文件是在job文件夹下的flume-telnet.conf文件。
	-Dflume.root.logger=INFO,console ：-D表示flume运行时动态修改flume.root.logger参数属性值，并将控制台日志打印级别设置为INFO级别。日志级别包括:log、info、warn、error。

```





## 资源

Github Open Source：[logging-flume](https://github.com/apache/logging-flume). [logging-flume-spring-boot](https://github.com/apache/logging-flume-spring-boot)
Wiki：[Apache Flume wiki!](https://cwiki.apache.org/confluence/display/FLUME)
UserGuide：[FlumeUserGuide](https://flume.apache.org/releases/content/1.11.0/FlumeUserGuide.html)


