---
aliases:
  - database denormalization
  - data denormalization
tags:
  - incubating
  - to-trans
draft: true
---

Denormalization is the process of combining data into a "wide" tables that are optimized for read workloads. Denormalized tables are best suited for [[Online Analytical Processing|OLAP]] systems where you need to analyze historical data, as updates are not required and data redundancy is not an issue.

## Denormalization Advantages

- Faster reads of historical/analytical data because fewer joins needed

## Denormalization Disadvantages

- Duplicate data


