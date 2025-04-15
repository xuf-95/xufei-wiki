---
aliases:
  - RPC
  - 远程过程调用
  - Remote Procedure Call
tags:
  - concepts
  - system
  - todo
date: 2022-02-08
publish: true
---

## 定义

[分布式计算](https://zh.wikipedia.org/wiki/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%A1%E7%AE%97 "分布式计算")中，**远程过程调用**（英语：**R**emote **P**rocedure **C**all，**RPC**）是一个计算机通信[协议](https://zh.wikipedia.org/wiki/%E7%B6%B2%E7%B5%A1%E5%82%B3%E8%BC%B8%E5%8D%94%E8%AD%B0 "网络传输协议")。该协议允许运行于一台计算机的程序调用另一个地址空间通常为一个开放网络的一台计算机）的子程序，而程序员就像调用本地程序一样，无需额外地为这个交互作用编程（无需关注细节）。RPC是一种服务器-客户端（Client/Server）模式，经典实现是一个通过**发送请求-接受回应**进行信息交互的系统。

RPC可以分为两部分：用户调用接口 + 具体网络协议。前者为开发者需要关心的，后者由框架来实现。

### RPC有什么

我们可以从SRPC的架构层次上来看，RPC框架有哪些层，以及SRPC目前所横向支持的功能是什么：

- **用户代码**（client的发送函数/server的函数实现）
- **IDL序列化**（protobuf/thrift serialization）
- **数据组织** （protobuf/thrift/json）
- **压缩**（none/gzip/zlib/snappy/lz4）
- **协议** （Sogou-std/Baidu-std/Thrift-framed/TRPC）
- **通信** （TCP/HTTP）

![[RPC（Remote Procedure Call）.png]]

## Reference

- [远程过程调用 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-cn/%E9%81%A0%E7%A8%8B%E9%81%8E%E7%A8%8B%E8%AA%BF%E7%94%A8)
- [一文带你搞懂 RPC 到底是个啥 - 万俊峰Kevin - 博客园](https://www.cnblogs.com/kevinwan/p/14830073.html)

