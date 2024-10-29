---
aliases:
  - RPC
  - Remote Procedure Call
  - 远程过程调用
tags:
  - concepts
  - system
  - architecture
  - remote
  - protocol
publish: false
draft: false
---

> Remote Procedure Call (RPC) is a protocol that provides the high-level communications paradigm used in the operating system. RPC presumes the existence of a low-level transport protocol, such as Transmission Control Protocol/Internet Protocol (TCP/IP) or User Datagram Protocol (UDP), for carrying the message data between communicating programs. RPC implements a logical client-to-server communications system designed specifically for the support of network applications.                                                 From [IBM Documentation](https://www.ibm.com/docs/en/aix/7.3?topic=concepts-remote-procedure-call)

远程过程调用（RPC）是一种协议，它提供了操作系统中使用的高级通信范例。RPC假定存在低级传输协议，例如传输控制协议/互联网协议（TCP/IP）或用户数据报协议（UDP），用于在通信程序之间传输消息数据。RPC实现了一个专门为支持网络应用程序而设计的逻辑客户机到服务器通信系统。

需要提供某种形式提供服务调用相关信息，接口定义，数据格式等 - 远程代理对象 - 通信 - 序列化：将对象转成二进制码流进行网络传输