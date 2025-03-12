---
aliases:
  - Wide Tables
  - OBT
tags:
  - seedling
  - to-trans
draft: true
---

The main idea behind one big table (OBT) is to join all of the data necessary for analytics into wide [[Denormalization|denormalized]] tables. One big table is a popular approach to serving analytics at larger scales and takes advantage of the benefits of [[Column-oriented Database|columnar databases]]. It's usually combined with/built on top of other techniques such as a [[Dimensional Modeling|Dimensional Model]] or [[Data Vault Modeling|Data Vault]].

> [!tip]
> You can use OBT when starting new data warehouse to provide value immediately while another longer-term approach is worked on like a [[Dimensional Modeling|Dimensional Model]] or a [[Data Vault Modeling|Data Vault]].

## One Big Table Advantages

- Increases query performance by removing the need for joins.
- Simple to query.

## One Big Table Disadvantages

- Very wide tables can get messy to read and maintain.
- Does not adapt to changes well. Adding new data sources will require rebuilding the table.

