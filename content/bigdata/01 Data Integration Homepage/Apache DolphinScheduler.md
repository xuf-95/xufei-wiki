---
title: Apache DolphinScheduler
tags:
  - data-integration
  - apache
  - sync
date: 2023-11-18
draft:
---
## Apache DolphinScheduler ？

Apache DolphinScheduler 是一个分布式易扩展的可视化[[DAG（Directed Acyclic Graph，DAG）]]工作流任务调度开源系统。适用于企业级场景，提供了一个可视化操作任务、工作流和全生命周期数据处理过程的解决方案。

Apache DolphinScheduler 旨在解决复杂的大数据任务依赖关系，并为应用程序提供数据和各种 OPS 编排中的关系。 解决数据研发ETL依赖错综复杂，无法监控任务健康状态的问题。 DolphinScheduler 以[[DAG（Directed Acyclic Graph，DAG）]]流式方式组装任务，可以及时监控任务的执行状态，支持重试、指定节点恢复失败、暂停、恢复、终止任务等操作。

## 特性

- 简单易用
- 丰富的使用场景
- High Reliability
	- **高可靠性**: 去中心化设计，确保稳定性。 原生 HA 任务队列支持，提供过载容错能力。 DolphinScheduler 能提供高度稳健的环境。
- High Scalability
	- **高扩展性**: 支持多租户和在线资源管理。支持每天10万个数据任务的稳定运行。

![[Apache DolphinScheduler.png]]



---
## Refer Resource

- [dolphinscheduler office](https://dolphinscheduler.apache.org/zh-cn)
- [dolphinscheduler blog](https://dolphinscheduler.apache.org/zh-cn/blog)

- [Apache DolphinScheduler 中 ZooKeeper与CDH 不兼容问题的解决方案](https://dolphinscheduler.apache.org/zh-cn/blog/Solution_to_the_incompatibility_problem_between_ZooKeeper_and_CDH_in_Apache_DolphinScheduler)
- [Apache DolphinScheduler 在 360 数科的实践](https://dolphinscheduler.apache.org/zh-cn/blog/How_Does_360_DIGITECH_process_10_000+_workflow_instances_per_day)
- [企业级应用如何用 Apache DolphinScheduler 有针对性地进行告警插件开发？](https://dolphinscheduler.apache.org/zh-cn/blog/How_to_use_Apache_DolphinScheduler_for_targeted_alarm_plugin_development_for_enterprise_applications)
- [Apache DolphinScheduler 在联想作为统一调度中心的落地实践](https://dolphinscheduler.apache.org/zh-cn/blog/The_implementation_practice_of_Apache_DolphinScheduler_as_a_unified_scheduling_center_in_Lenovo)