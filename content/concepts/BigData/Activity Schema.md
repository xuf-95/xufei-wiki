---
aliases: 
tags:
  - schema
  - to-trans
draft: true
---

Created by [Ahmed Elsamadisi](https://www.activityschema.com/mission), the activity schema is a standard that is designed to make data modeling and analysis substantially simpler, faster, and more reliable by modeling all data as a single time series table, which makes it easier to answer any data question using a single query pattern.

Business concepts are represented as **entity** doing an **activity** (`a customer completed an order`) instead of facts or nouns (orders, products). Activities are built directly from source tables, store only their own data, and are the single source of truth for each concept.

All queries run against an activity stream table to assemble data for analysis, BI, and reporting. Instead of traditional foreign key joins, queries combine activities using relationships in time (e.g. all customers who _completed an order_ and _submitted a support ticket_ before their next _completed order_).

![[Activity Schema.png]]

## Activity Schema Advantages

- Simple to build, query, and maintain (only one table).
- Can improve query performance because no joins are required.

## Activity Schema Disadvantages

- Requires data platform to support JSON columns and for data analysts to be comfortable with SQL/JSON.
- Keeping all data in one table (even PII or financial data) may not be desirable for security reasons.
- Some BI tools might not be able to load a large activity schema table.

***
## Reference

- https://www.activityschema.com/
- https://github.com/ActivitySchema/ActivitySchema


