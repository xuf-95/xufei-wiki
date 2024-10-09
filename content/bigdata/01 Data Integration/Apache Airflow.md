---
title: Apache Airflow
tags:
  - data-integration
  - apache
  - pipeline
  - etl
date: 2023-07-06
---

##  Airflow 概述


> Airflow is an open-source platform for **developing**, **scheduling**, and **monitoring batch-oriented workflows**. Airflow’s extensible Python framework enables you to build workflows connecting with virtually any technology. A web interface helps manage the state of your workflows. Airflow is deployable in many ways, varying from a single process on your laptop to a distributed setup to support even the biggest workflows.

[Apache Airflow®](https://github.com/apache/airflow)是一个开源平台，用于开发、调度和监控面向批量的工作流程。 Airflow 的可扩展 Python 框架使您能够构建与几乎任何技术连接的工作流程。 Web 界面有助于管理工作流程的状态。 Airflow 可以通过多种方式进行部署，从笔记本电脑上的单个进程到支持最大工作流程的分布式设置。


Airflow 是一个**批量工作流程编排平台**，使用Python代码去创建Airflow DAG数据流图。

- 支持版本控制（回滚）
- 多人协作开发
- 支持测试来验证功能
- 组件可扩展，提供 [公共的接口](https://airflow.apache.org/docs/apache-airflow/stable/public-airflow-interface.html) ，进行二次开发
- 更改逻辑后对历史数据（重新）运行管道

***代码语法事例：***

```python
from datetime import datetime

from airflow import DAG
from airflow.decorators import task
from airflow.operators.bash import BashOperator

# 一个名为“demo”的 DAG，从 2022 年 1 月 1 日开始，每天运行一次。 DAG 是 Airflow 工作流的表示形式。
with DAG(dag_id="demo", start_date=datetime(2022, 1, 1), schedule="0 0 * * *") as dag:
    # Tasks are represented as operators
    hello = BashOperator(task_id="hello", bash_command="echo hello")

	# 两个任务，一个运行 Bash 脚本的 BashOperator 和一个使用`@task`装饰器定义的 Python 函数
    @task()
    def airflow():
        print("airflow")

    # 任务之间定义了依赖关系并控制任务的执行顺序
    hello >> airflow()
```

![[Apache Airflow.png]]

## 架构概述

#### 必须组件

- **调度器**：处理触发计划的工作流程以及将[任务](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html)提交给执行程序运行
- **网络服务器**：它提供了一个方便的用户界面来检查、触发和调试 DAG 和任务的行为
- **DAG 文件的文件夹**：由_调度程序_读取以找出要运行的任务以及何时运行它们
- **元数据数据库**：存储工作流和任务的状态

#### 可选组件

- _worker_
- 可选的_触发器_
- 可选的_dag 处理器_
- 可选的_插件文件_夹

### 架构图
##### 分布式架构

在分布式部署的情况下，考虑组件的安全性非常重要。 _Web 服务器_无法直接访问_DAG 文件_。 UI 的“代码”选项`Code`中的代码是从_元数据数据库_中读取的。_网络服务器_无法执行**DAG 作者**提交的任何代码。它只能执行由**部署管理器**作为_安装包_或_插件_安装的代码。**操作用户**只能访问 UI，并且只能触发 DAG 和任务，但无法创作 DAG。

![[airflow 分布式架构.png]]

#### 独立的 DAG 处理架构

在安全性和隔离很重要的更复杂的安装中，您还将看到独立的_dag 处理器_组件，该组件允许将_调度程序_与访问_DAG 文件_分开。如果部署重点是解析的任务之间的隔离，那么这是合适的。虽然 Airflow 尚不支持完整的多租户功能，但它可用于确保**DAG 作者**提供的代码永远不会在调度程序的上下文中执行。

![[airflow 独立DAG.png]]


## DAGs 有向无环图

_DAG_ （有向无环图）是 Airflow 的核心概念，它将[任务](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html)收集在一起，通过依赖关系和关系进行组织来说明它们应该如何运行。

#### 创建一个 DAG


```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

# 使用`with`语句（上下文管理器），会将其中的任何内容隐式添加到 DAG 中
 with DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 ):
     EmptyOperator(task_id="task")
```
### Resource

- [Documents & quick start](https://airflow.apache.org/docs/apache-airflow/stable/start.html) documents
- [Blogs](https://airflow.apache.org/blog/)
- 
