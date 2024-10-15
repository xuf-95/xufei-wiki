---
title: 函数依赖（Functional Dependency）
tags:
  - concepts
  - system
publish: false
draft: false
date: 
aliases:
  - Functional Dependency
  - 函数依赖
---

## 概述

### 定义

在[关系数据库](https://zh.wikipedia.org/wiki/%E5%85%B3%E7%B3%BB%E6%95%B0%E6%8D%AE%E5%BA%93 "关系数据库")理论中，**函数依赖**（functional dependency）是数据库的[关系](https://zh.wikipedia.org/wiki/%E5%85%B3%E7%B3%BB_(%E6%95%B0%E6%8D%AE%E5%BA%93) "关系 (数据库)")的两个属性集合之间的一种约束。给定关系_R_，_R_上的属性集_X_是**函数确定**（functionally determine）_R_上的另一个属性集_Y_，(记作 _X_ → _Y_)，当且仅当_R_上的每一个_X_值精确地关联_R_上的一个_Y_值；因而_R_被说成_满足_函数依赖_X_ → _Y_。等价的说，[投影](https://zh.wikipedia.org/wiki/%E6%8A%95%E5%BD%B1_(%E5%85%B3%E7%B3%BB%E4%BB%A3%E6%95%B0) "投影 (关系代数)") ΠX,YR![{\displaystyle \Pi _{X,Y}R}](https://wikimedia.org/api/rest_v1/media/math/render/svg/9939dab405205d83014915201d1afc236242ec7e)是一个函数，即_Y_是_X_的函数。简单说，如果属性集_X_的值是已知的（记作_x_），那么属性集_Y_的对应于_x_的值可以查表（_R_中任何包含_x_的元组）确定。一个函数依赖FD: _X_ → _Y_是平凡的，如果_Y_是_X_的子集。
### 原理 & 功能


## 资源链接

[部分函数依赖，传递函数依赖，完全函数依赖 和三种范式的区别](https://xiaoxiyouran.github.io/blogger/docs/%E6%95%B0%E6%8D%AE%E5%BA%93/%E9%9D%A2%E8%AF%95%E5%B8%B8%E9%97%AE/%E9%83%A8%E5%88%86%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96-%E5%AE%8C%E5%85%A8%E4%BE%9D%E8%B5%96-%E4%BC%A0%E9%80%92%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96/%E9%83%A8%E5%88%86%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96%EF%BC%8C%E4%BC%A0%E9%80%92%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96%EF%BC%8C%E5%AE%8C%E5%85%A8%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96%20%E5%92%8C%E4%B8%89%E7%A7%8D%E8%8C%83%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%AB.html#%E9%83%A8%E5%88%86%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96%EF%BC%8C%E4%BC%A0%E9%80%92%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96%EF%BC%8C%E5%AE%8C%E5%85%A8%E5%87%BD%E6%95%B0%E4%BE%9D%E8%B5%96%20%E5%92%8C%E4%B8%89%E7%A7%8D%E8%8C%83%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%AB)

## 参考文献 

