---
aliases:
  - Data Governance
tags:
  - home
  - governance
date: 2023-09-11
draft: false
---
###  What is Data Governance?

> [!obsidian] Wikipedia
> [Data Governance](https://en.wikipedia.org/wiki/Data_governance#Micro_level) is a term used to describe the set of policies and procedures that ensure the data used in an organization is of high quality throughout its lifecycle (input, storage, transformation, access, and deletion).                                 

数据治理是一个术语，用于描述确保组织中使用的数据在其整个生命周期（输入、存储、转换、访问和删除）中具有高质量的一组策略和过程


### 数据分类管理框架

> **华为数据之道**

| 分类维度        | 数据分类名称                  | 定义               | 特征                   | 举例          |
| ----------- | ----------------------- | ---------------- | -------------------- | ----------- |
| 按照数据所属权进行分类 | 外部数据                    | 企业通过公共领域获取的数据    | 客观存在的、产生和修改等行为不受我司影响 | 国家、币种、省市地区  |
| 内部数据        | 企业经营产生的数据               | 受企业经营影响          | 合同、组织                |             |
| 数据存储特征      | 结构化数据                   | 可存储在关系型数据库的数据    |                      | 国家、币种、合同、组织 |
| 非结构化数据      | 形式不固定，不能用关系型数据概述        |                  | 网页、图片、视频、音频、xml      |             |
| 基础数据（参考数据）  | 用于分类或目录整编的数据            |                  | 合同类型、职位、商品类型         |             |
| 主数据         | 具有高价值、可共享、唯一、有权威性的数据    |                  | 客户信息、人员信息、组织信息       |             |
| 事务数据        | 用来记录企业经营过程中的业务事件        |                  | 生成订单                 |             |
| 观测数据        | 通过观测工具获取的观测对象行为或过程的记录数据 |                  | 系统日志、传感器日志、gps数据     |             |
| 规则数据        | 描述规则的数据                 | 不可实例化、只以逻辑实体形式存在 | 评分规则、xx规则等           |             |
| 报告数据        | 指对数据进行处理加工后，用作业务决策依据的数据 |                  | 收入情况、成本情况            |             |
|             |                         |                  |                      |             |

### 基础数据治理

基础数据=参考数据=维度数据  
是静态的、预先定义、且可选值数据有限，用于对其他数据进行分类。  
一般基础数据的取值都很少更改，如果要更改，关联影响很大，需要对流程和it系统进行修改，因此基础数据的管理重点在于变更管理和统一标准管控。  
**该类型的数据的主要作用是用来增强对数据的可读性和解释性，** 比如[状态编码](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E7%8A%B6%E6%80%81%E7%BC%96%E7%A0%81&zhida_source=entity)、性别、产品维表、地理信息等维度数据。由此可见，参数数据的来源可能是内部产生或者外部手动采集获取到的（比如[国际标准编码](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E5%9B%BD%E9%99%85%E6%A0%87%E5%87%86%E7%BC%96%E7%A0%81&zhida_source=entity)、行业标准）  
  
缺少治理前的问题：  

1. 标准不规范，是产生分类错误导致合规性问题。
2. 业务语义不同，数据定义不同意，业务难协同
3. [点对点](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E7%82%B9%E5%AF%B9%E7%82%B9&zhida_source=entity)接口，业务间确认数据定义成本很高

  
治理点：  

1. 统一平台基础数据[元数据管理](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E5%85%83%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86&zhida_source=entity)，在一个平台统一维护基础数据，方便业务查看、使用
2. 数据质量，要确保基础数据的质量问题，需要对数据进行规范化
3. 数据安全，确保数据使用的隐私安全性

  
**主数据治理**  
主数据是具有高业务价值、跨业务系统、可重复利用的数据。这些数据也是预先定义好的，主数据由于会和多个系统有关联，所以一旦出错影响就会很大，所以要确保数据的准确性。  
[主数据管理](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E4%B8%BB%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86&zhida_source=entity)策略：  

1. 保障唯一性，主数据是代表公司业务某个业务对象的唯一实例，对应真实世界的对象。要确保其唯一性。
2. 联邦管控，联邦管控表示在中央制定政策、标准、模型，在地方由数据管家和用户一起在流程的各个层级中实施。
3. [单一数据源](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E5%8D%95%E4%B8%80%E6%95%B0%E6%8D%AE%E6%BA%90&zhida_source=entity)，为确保数据跨系统、跨流程的唯一性和一致性，需要为每个属性的创建、更新、读取确定一个应用系统作为数据源
4. 流程规范化，正确的数据要在正确的流程中创建、更新、使用，并在正确的应用系统中落地。
5. 数据质量保障，在创建初期就要对数据质量管控起来。

  
主数据管理架构：  
管控层：由专家团队组成，负责主数据规则的制定与发布  
主数据服务设计层：对需要集成主数据的团队提供咨询和方案服务，负责受理主数据管理需求，维护主数据的[数据模型](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B&zhida_source=entity)  
[主数据](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=13&q=%E4%B8%BB%E6%95%B0%E6%8D%AE&zhida_source=entity)服务实施层：负责主[数据集成](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E6%95%B0%E6%8D%AE%E9%9B%86%E6%88%90&zhida_source=entity)的落地，以及主数据管理的落地  
数据消费层：使用主数据的一层，确保在安全可控的条件下使用主数据

主数据治理价值：  

1. 实现“数出一孔”，提高数据质量，保障一致性、准确性
2. 实现“一点录入，多点调用”
3. 主数据打通，实现价值挖掘。多系统打通主数据，实现数据价值最大化
4. 主数据维度，从全局视角查看整体情况，对全局有个把控

**事务数据治理**  
事务数据在业务和流程中产生，是业务事件的记录，是具有强时效性的一次性业务事件，在事件结束后不再更新。  
事务数据治理的重点是管理好事务数据对主数据和基础数据的调用，以及事务之间的关联关系，确保上下游信息传递顺畅。在事务数据的[信息架构](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E4%BF%A1%E6%81%AF%E6%9E%B6%E6%9E%84&zhida_source=entity)中需明确哪些属性是引用其他业务对象，哪些是自身特有的。其实事务数据可以理解成事实表。  
  
**报告数据治理**  
报告数据指的是对数据进行处理加工后，用作业务决策依据的数据，支持报告和报表的生成。这个覆盖的范围很广，可以理解一般的元数据管理普遍的表数据都是报告数据，属于[数仓](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E6%95%B0%E4%BB%93&zhida_source=entity)里的表数据。  
  
观测数据治理  
观测数据通常数据量较大且是过程性的，由机器自动采集生成。  
特征：  

1. 数据量较大，且是过程性的，主要是做监控分析；例如[视频监控器](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E8%A7%86%E9%A2%91%E7%9B%91%E6%8E%A7%E5%99%A8&zhida_source=entity)产生的视频数据、操作系统的日志数据
2. 观测数据是由机器自动采集生成的，例如传感器产生数据
3. 是通过工具采集回来的原始数据，不做任何[业务规则](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E4%B8%9A%E5%8A%A1%E8%A7%84%E5%88%99&zhida_source=entity)的解析

  
### **[元数据治理](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E5%85%83%E6%95%B0%E6%8D%AE%E6%B2%BB%E7%90%86&zhida_source=entity)**  

元数据就是[描述数据](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E6%8F%8F%E8%BF%B0%E6%95%B0%E6%8D%AE&zhida_source=entity)的数据  
当前元数据遇到的问题：数据找不到、读不懂、不可信。对应的问题就是集成管理、标准化、数据质量问题。  
[业务元数据](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E4%B8%9A%E5%8A%A1%E5%85%83%E6%95%B0%E6%8D%AE&zhida_source=entity)：指资产目录、owner、数据密级  
技术元数据：数据模型的表和字段、etl规则、集成关系  
操作元数据：调度频度、访问记录  
  
元数据价值：  

1. 数据消费侧：元数据能支持企业指标、报表的动态构建
2. 数据服务侧：元数据支持数据服务的统一管理和运营，并实现利用元数据驱动it[敏捷开发](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E6%95%8F%E6%8D%B7%E5%BC%80%E5%8F%91&zhida_source=entity)
3. 数据主题侧：元数据统一管理[分析模型](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E5%88%86%E6%9E%90%E6%A8%A1%E5%9E%8B&zhida_source=entity)
4. 数据湖侧：实现对[暗数据](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E6%9A%97%E6%95%B0%E6%8D%AE&zhida_source=entity)的透明化
5. 数据源侧：支持业务管理规则有效落地，保障数据内容合格、合规

元数据架构：  
产生元数据：指定元数据管理相关流程与规范的落地方案，实现业务元数据和技术元数据的连接  
采集元数据：通过统一的元数据模型从各类it系统中自动采集元数据  
注册元数据：基于增量和存量的两种常见，制作元数据注册方法  
[运维](https://zhida.zhihu.com/search?content_id=200030776&content_type=Article&match_order=1&q=%E8%BF%90%E7%BB%B4&zhida_source=entity)元数据：打造公司元数据中心，管理元数据产生、采集、注册的全过程，实现元数据运维  
元数据管理方案：通过制定元数据标准、规范、平台和管控机制，建立企业级元数据管理体系，推动各领域落地，支撑数据底座建设与数字化运营。

## 数据治理平台 & 产品
### Dataman 

- [DataMan-美团旅行数据质量监管平台实践 - 美团技术团队](https://tech.meituan.com/2018/03/21/mtdp-dataman.html)
- [美团配送数据治理实践 - 美团技术团队](https://tech.meituan.com/2020/03/12/delivery-data-governance.html)

![[content/bigdata/Data Governance/images/dataman-center-01.png]]


