[Apache InLong（应龙）](https://inlong.apache.org/)是一站式、全场景的海量数据集成框架，同时支持数据接入、数据同步和数据订阅，提供自动、安全、可靠和高性能的数据传输能力，方便业务构建基于流式的数据分析、建模和应用。 InLong 项目原名 TubeMQ ，专注于高性能、低成本的消息队列服务。为了进一步释放 TubeMQ 周边的生态能力，我们将项目升级为 InLong，专注打造一站式、全场景海量数据集成框架。 Apache InLong 依托 10 万亿级别的数据接入和处理能力，整合了数据采集、汇聚、存储、分拣数据处理全流程，拥有简单易用、灵活扩展、稳定可靠等特性。 该项目最初于 2019 年 11 月由腾讯大数据团队捐献到 Apache 孵化器，2022 年 6 月正式毕业成为 Apache 顶级项目。目前 InLong 正广泛应用于广告、支付、社交、游戏、人工智能等各个行业领域，为多领域客户提供高效化便捷化服务。

### Architecture

## 模块[​](https://inlong.apache.org/zh-CN/docs/introduction/#%E6%A8%A1%E5%9D%97 "Direct link to heading")

Apache InLong 服务于数据采集到落地的整个生命周期，按数据的不同阶段提供不同的处理模块，主要包括：

- **inlong-agent**，数据采集服务，包括文件采集、DB 采集等。
- **inlong-dataproxy**，一个基于 Flume-ng 的 Proxy 组件，支持数据发送阻塞和落盘重发，拥有将接收到的数据转发到不同 MQ（消息队列）的能力。
- **inlong-tubemq**，腾讯自研的消息队列服务，专注于大数据场景下海量数据的高性能存储和传输，在海量实践和低成本方面有着良好的核心优势。
- **inlong-sort**，对从不同的 MQ 消费到的数据进行 ETL 处理，然后汇聚并写入 Hive、ClickHouse、HBase、Iceberg、Hudi 等存储系统。
- **inlong-manager**，提供完整的数据服务管控能力，包括元数据、任务流、权限，OpenAPI 等。
- **inlong-dashboard**，用于管理数据集成任务的前端页面，简化整个 InLong 管控平台的使用。
- **inlong-audit**，对 InLong 系统的 Agent、DataProxy、Sort 模块的入流量、出流量进行实时审计对账。

![Airflow](content/Big%20Data/01%20Data%20Integration/airfolw.png)
