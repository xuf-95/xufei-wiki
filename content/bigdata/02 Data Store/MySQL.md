---
title: MySQL
tags:
  - Databases
---

## 架构
![[mysql.png]]
### MySQL运行机制

- 建立连接
- 查询缓存（V8.0中被删除）
	```mysql
	// 查询缓存是否启用、空间大小、限制等
	select variables like '%query_cache%';
	
	// 查询更详细的缓存参数，可用缓存空间、缓存块、缓存使用大小
	show status like 'Qcache%';
	```
- 解析器
- 查询优化器
- 查询执行引擎负责执行 SQL 语句

#### MySQL开发
### 系统文件
#### 配置文件

- my.cnf
- my.ini
#### 数据文件

- dp.opt：记录整个数据库的默认字符集及排序规则。
- frm文件：存储与表相关的元数据信息，包括表结构的定义信息等；每张表都会有一个自己的frm文件。
- myd文件：MyISAM存储引擎专用。存储MyISAM表的数据，每张表都会有一个MYD文件。
- myi文件：MyISAM存储引擎专用。存储MyISAM表的索引相关信息，每一张表对应一个MYI文件。
- ibd和ibdata文件：存储InnoDB的数据文件（包括索引）
- InnoDB存储引擎有两种表空间方式：独享表空间和共享表空间。独享表空间使用ibd文件存储，每张表对应一个ibd文件。共享表空间使用ibdata文件存储，所有表共用一个（或多个，可修改配置）ibdata文件。
- ibdata1文件：系统表空间数据文件，存储表元数据、Undo日志等 。
- ib_logﬁle0、ib_logﬁle1 文件：Redo log 日志文件。


## MySQL 优化

## 数据模型

## 衍生分支产品




### Resource

- [mysql 8.0 document ](https://dev.mysql.com/doc/)
- [HeatWave Getting Started](https://docs.oracle.com/en-us/iaas/mysql-database/doc/getting-started.html)


### Article

- [深入理解 MySQL 事务 MVCC 的核心概念以及底层原理](https://xie.infoq.cn/article/9d109dd4e2304f6a217c08363) By jiangxl

- 