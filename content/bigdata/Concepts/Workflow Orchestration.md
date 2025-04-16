---
aliases:
  - data orchestration
  - 工作流编排
tags:
  - incubating
  - to-trans
date: 2022-11-12
draft: true
---

In the context of Data Engineering, workflow orchestration refers to the process of scheduling and arranging tasks that form your [[Data Pipeline|data pipeline]]. A workflow orchestration tool allows you to schedule, run, and observe the entire process.

## Popular Workflow Orchestration Tools

[[Apache Airflow]]
[[Dagster]]
[[Prefect]]

## Workflow Orchestration Advantages

- Create complex custom workflows
- Makes it easier to create [[Idempotence|idempotent]] workflows
- Alert you if something fails
- Allows you to gracefully retry and recover from failures

## Workflow Orchestration Disadvantages

- Adds complexity in scheduling
- Requires additional infrastructure and maintenance costs

