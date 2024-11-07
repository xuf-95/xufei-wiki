---
title: Flink SQL
tags:
  - bigdata
  - datastore
  - flink
  - sql
  - demo
date: 2024-02-11
draft: true
---
# Flink Table API & SQL

[Apache Flink Documentation | Apache Flink](https://nightlies.apache.org/flink/flink-docs-release-1.14/)


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

```


```


```shell
1. 启动flink-sql-client
    ./bin/start-cluster.sh

2. 启动 sql-client
   	./bin/sql-client.sh embedded
```

```sql

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

