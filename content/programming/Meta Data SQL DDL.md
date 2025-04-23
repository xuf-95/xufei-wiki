---
title: Meta Data SQL DDL
tags:
  - mysql
  - snippets
date: 2023-06-03
draft: false
---

### 元数据血缘明细表

```sql
CREATE TABLE `dim_xx_meta_quality` (
  `table_name` varchar(255) DEFAULT NULL COMMENT '表名',
  `table_comment` varchar(255) DEFAULT NULL COMMENT '表备注',
  `col_name` varchar(255) DEFAULT NULL COMMENT '字段名',
  `col_comment` varchar(255) DEFAULT NULL COMMENT '字段备注',
  `distinct_count` varchar(255) DEFAULT NULL COMMENT '去重记录数',
  `total_count` varchar(255) DEFAULT NULL COMMENT '总记录数(最近的分区)',
  `max_len` varchar(255) DEFAULT NULL COMMENT '最大长度',
  `min_len` varchar(255) DEFAULT NULL COMMENT '最小长度',
  `max_value` varchar(255) DEFAULT NULL COMMENT '最大值',
  `min_value` varchar(255) DEFAULT NULL COMMENT '最小值',
  `null_count` varchar(255) DEFAULT NULL COMMENT '空值数',
  `null_rate` varchar(255) DEFAULT NULL COMMENT '空值率',
  `spend_time` varchar(255) DEFAULT NULL COMMENT '读取记录数花费的时间单位:秒',
  `etl_tm` varchar(255) DEFAULT NULL COMMENT 'ETL时间',
  `dt` varchar(255) DEFAULT NULL COMMENT '分区'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='xx_元数据血缘明细表';
```


### 元数据宽表

```sql
CREATE TABLE `dim_xx_meta_detail_outline` (
  `pro_name` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `tbl_level` varchar(255) DEFAULT NULL COMMENT '表层级',
  `tbl_name` varchar(255) DEFAULT NULL COMMENT '表英文名',
  `tbl_comment` varchar(255) DEFAULT NULL COMMENT '表中文名',
  `col_name` varchar(255) DEFAULT NULL COMMENT '字段名',
  `col_type` varchar(255) DEFAULT NULL COMMENT '字段类型',
  `col_comment` varchar(255) DEFAULT NULL COMMENT '字段备注',
  `tbl_col_num` varchar(255) DEFAULT NULL COMMENT '字段数',
  `all_row_count` varchar(255) DEFAULT NULL COMMENT '总行数',
  `row_count` varchar(255) DEFAULT NULL COMMENT '最新分区总行数',
  `index1_name` varchar(255) DEFAULT NULL COMMENT '表一级明细',
  `index2_name` varchar(255) DEFAULT NULL COMMENT '表二级明细',
  `index3_name` varchar(255) DEFAULT NULL COMMENT '表三级明细',
  `is_pt` varchar(255) DEFAULT NULL COMMENT '是否是分区表',
  `pt_last` varchar(255) DEFAULT NULL COMMENT '最新分区',
  `tbl_create_time` varchar(255) DEFAULT NULL COMMENT '表创建时间',
  `tbl_update_time` varchar(255) DEFAULT NULL COMMENT '表更新时间',
  `tbl_lifecycle` varchar(255) DEFAULT NULL COMMENT '表生命周期',
  `tbl_type` varchar(255) DEFAULT NULL COMMENT '表类型 内部表/外部表',
  `tbl_size` varchar(255) DEFAULT NULL COMMENT '表大小 单位:MB',
  `etl_tm` varchar(255) DEFAULT NULL COMMENT 'ETL时间',
  `dt` varchar(255) DEFAULT NULL COMMENT '分区'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='xx_元数据宽表';
```

### 元数据数据质量

```sql
CREATE TABLE `dim_xx_meta_blood_relation_detail` (
  `ins_name` varchar(255) DEFAULT NULL COMMENT '调度节点名称',
  `tbl_out_en` varchar(255) DEFAULT NULL COMMENT '输出表英文名',
  `tbl_out_zh` varchar(255) DEFAULT NULL COMMENT '输出表中文名',
  `tbl_in_en` varchar(255) DEFAULT NULL COMMENT '输入表英文名',
  `tbl_in_zh` varchar(255) DEFAULT NULL COMMENT '输入表中文名',
  `etl_tm` varchar(255) DEFAULT NULL COMMENT 'ETL时间',
  `dt` varchar(255) DEFAULT NULL COMMENT '分区'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='xx_元数据数据质量';
```
***
## Reference


