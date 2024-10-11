---
title: Data Store Homepage
tags:
  - store
  - database
  - home
---
## 数据存储分类

### OLAP
- [TiDB](https://docs.pingcap.com/zh/tidb/stable/overview) 是 [PingCAP](https://pingcap.com/about-cn/) 公司自主设计、研发的开源分布式关系型数据库，是一款同时支持在线 HTAP 的融合型分布式数据库产品，具备水平扩容或者缩容、金融级高可用、实时 HTAP、云原生的分布式数据库、兼容 MySQL 协议和 MySQL 生态等重要特性
- 
### OLTP 


### HATP
>   Hybrid Transactional and Analytical Processing 
>   
>   在线事务处理与在线分析处理 

- [PingCAP](https://docs.pingcap.com/zh/)
- Complete ranking
- Key-value stores
	- [Aerospike](http://www.aerospike.com/) - NoSQL flash-optimized, in-memory. Open source and "Server code in 'C' (not Java or Erlang) precisely tuned to avoid context switching and memory copies."
	- [Redis](https://redis.io/) - in memory key value datastore.
	- [TiKV](https://github.com/pingcap/tikv) - a distributed key-value database powered by Rust and inspired by Google Spanner and HBase.
	- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) - distributed key/value store, implementation of Dynamo paper.
	- [Badger](https://open.dgraph.io/post/badger/) - a fast, simple, efficient, and persistent key-value store written natively in Go.
	- [Bolt](https://github.com/boltdb/bolt) - an embedded key-value database for Go.
	- [BTDB](https://github.com/Bobris/BTDB) - Key Value Database in .Net with Object DB Layer, RPC, dynamic IL and much more

- Document stores
	- [Actian Versant](https://www.actian.com/data-management/ingres-sql-rdbms/) - commercial object-oriented database management systems .
	- [MongoDB](https://www.mongodb.com/) - Document-oriented database system.
	- [Crate Data](https://crate.io/) - is an open source massively scalable data store. It requires zero administration.
	- [Facebook Apollo](http://www.infoq.com/news/2014/06/facebook-apollo) - Facebook’s Paxos-like NoSQL database.
	- [jumboDB](http://comsysto.github.io/jumbodb/) - document oriented datastore over Hadoop.
	- [LinkedIn Espresso](https://engineering.linkedin.com/data) - horizontally scalable document-oriented NoSQL data store.
	- [MarkLogic](http://www.marklogic.com/) - Schema-agnostic Enterprise NoSQL database technology.
	- [Microsoft Azure DocumentDB](https://azure.microsoft.com/en-us/services/cosmos-db/) - NoSQL cloud database service with protocol support for MongoDB
	- [RavenDB](https://ravendb.net/) - A transactional, open-source Document Database.
	- [RethinkDB](https://rethinkdb.com/) - document database that supports queries like table joins and group by.
- RDF stores
- Wide column stores
- Event Stores
- Content stores
- Columnar
- Search engines
### DBMS
- Relational DBMS
	- [[MySQL]]
	- [[PostgreSQL]]
	- Oracle
- Object oriented DBMS
- Graph DBMS
	- [Neo4j](https://neo4j.com/) - graph database written entirely in Java
- Time Series DBMS
	- [InfluxDB](https://www.influxdata.com/) - a time series database with optimised IO and queries, supports pgsql and influx wire protocols.
	- [Druid](https://github.com/druid-io/druid/) Column oriented distributed data store ideal for powering interactive applications
- Vector DBMS
- Navigational DBMS
- Multivalue DBMS
- Spatial DBMS
- Native XML DBMS


### Type
- Data Process：OLAP ｜ OLTP｜HATP
- Data Model： Relational ｜Key-value｜Time Series｜Graph｜Document｜Vector｜Columnar｜Search｜Object-oriented｜Spatial｜RDF｜Multivalue｜Multivalue｜Event Store
- Deployment Model: Distributed | Centralized | Cloud-native 
- View：
- Index Type：
- Compress

## Open Source Dataset

- 


## Product & Resource & Tools


- [DB-Engines](https://db-engines.com/en/) is an initiative to collect and present information on database management systems (DBMS). In addition to established relational DBMS, systems and concepts of the growing NoSQL area are emphasized. #knowledge
	- [DB-Engines Ranking](https://db-engines.com/en/ranking)

- [teable](https://teable.io/) Super fast, Real-time, Professional, Developer-friendly, No-code database #product 
	- > Built on PostgresQL, it offers seamless ecosystem integration with 2 single connection, making interfacing simple.  Easily expands with Bl, low-code, and ETL tools.
	- [teable-en-quick-view](https://static.teable.io/teable-en-quick-view-01.mp4)
- [SQL Father](http://sqlfather.yupi.icu/) SQL GUI #tools
- [Hex](https://hex.tech/) is a modern, collaborative workspace for data science and analytics. #product #tools 