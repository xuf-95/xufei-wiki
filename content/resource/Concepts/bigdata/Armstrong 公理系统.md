---
title: 
tags:
  - concepts
  - database
  - rule
publish: true
draft: false
date:
---

## 概述

### 定义

Armstrong 公理系统是用于推导[[函数依赖（Functional Dependency）|函数依赖]]的一组基本规则，在数据库理论中非常重要。该公理系统由美国计算机科学家 William W. Armstrong 提出，旨在用以推导给定函数依赖集合中所有隐含的函数依赖。通过这些规则，数据库设计者可以推导出所有有效的依赖关系，确保数据库设计的规范化和一致性。

### 具备的特性

- 有效性
- 完备性

### 规则描述

Armstrong 公理系统由以下三条基本规则（也称为推理规则）构成：

1. 自反性（Reflexivity）

如果  Y ⊆ X ，则  X → Y 。

	•	如果 Y 是 X 的子集，那么 X 可以函数依赖于 Y。这条规则表明：一个属性集总是函数依赖于它的任意子集。

示例：
对于  X = \{A, B\}  和  Y = \{A\} ，因为 Y 是 X 的子集，所以  \{A, B\} → \{A\}  成立。

2. 增广性（Augmentation）

如果  X → Y ，则  XZ → YZ  对任意 Z 成立。

	•	如果 X 函数依赖于 Y，那么 X 和 Z 的联合也会函数依赖于 Y 和 Z 的联合。

示例：
如果  A → B ，那么  AC → BC 。

3. 传递性（Transitivity）

如果  X → Y  且  Y → Z ，则  X → Z 。

	•	这条规则类似于数学中的传递关系，如果 X 依赖于 Y，Y 依赖于 Z，那么可以推导出 X 依赖于 Z。

示例：
如果  A → B  且  B → C ，那么  A → C 。

**其他派生规则**

	•	合并律（Union Rule）：如果  X → Y  且  X → Z ，则  X → YZ 。(`合并律=增广+传递`)
	•	分解律（Decomposition Rule）：如果  X → YZ ，则  X → Y  且  X → Z 。
	•	伪传递律（Pseudo Transitivity Rule）：如果  X → Y  且  YZ → W ，则  XZ → W 。

Armstrong 公理系统的用途

- 推导隐含依赖：通过 Armstrong 公理系统，可以从已知的函数依赖推导出其他隐含的依赖关系
- 验证最小依赖集：通过推理，可以检查一个函数依赖集是否是最小的，即是否包含冗余的依赖
- 确保`无损分解`：在进行数据库表的分解时，利用函数依赖可以确保分解是无损连接的（lossless decomposition），保证数据完整性

## 资源链接

[Armstrong公理\_百度百科](https://baike.baidu.com/item/Armstrong%E5%85%AC%E7%90%86/1187858)



