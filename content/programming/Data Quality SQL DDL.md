---
title: Data Quality SQl DDL
tags:
  - mysql
  - snippets
date: 2022-03-01
draft: false
---


```mysql
/*
 Navicat Premium Data Transfer

 Source Server         : yt37
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : 127.0.0.1:3306
 Source Schema         : bigdata-backstage

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 24/03/2023 15:06:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for met_quality_task
-- ----------------------------
CREATE TABLE `met_quality_task` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `dw_id` int DEFAULT NULL COMMENT '数仓id',
  `task_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '任务名称',
  `task_comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '任务描述',
  `monitor_num` int DEFAULT '0' COMMENT '监测次数',
  `warn_num` int DEFAULT '0' COMMENT '预警次数',
  `rule_id` int DEFAULT NULL COMMENT '绑定规则',
  `bind_tbl` int DEFAULT NULL COMMENT '绑定表',
  `bind_col` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '绑定字段',
  `target_begin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '目标范围起',
  `target_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '目标范围始',
  `monitor_freq` int DEFAULT '0' COMMENT '监测频率',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL  COMMENT '更新时间',
  `status` int DEFAULT '1' COMMENT '状态 1-上线 0-下线',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '是否删除 1-是 0-否',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='数据质量-质检任务';
```


