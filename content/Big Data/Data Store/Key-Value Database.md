---
title: Key-Value Database
aliases:
  - 键值对数据库
tags:
  - concepts
  - database
  - KV
publish: true
---
A Key/Value database is a type of [[Non-relational Database|NoSQL]] database that stores data as a table where you have a unique key for each data value.


## 常见的 Key-Value Databases

- [[Redis]]
- [[Amazon DynamoDB|DynamoDB]]

- [Riak](http://docs.basho.com/riak/kv/)
- [IonDB](https://github.com/iondbproject/iondb)

## Key-Value Database Advantages

- Optimized for simple lookups using the key or a range of keys on a single table.
- Can be very scalable because data can be distributed across multiple machines.

## Key-Value Database Disadvantages

- Not great if you need to query or filter by non-key values.
- Often more expensive than other kinds of databases because they tend to run in-memory.

## When to use a Key-Value Database

A key-value database is mostly used when you need to cache data because it is very fast and doesn't require complex querying.

## Key-Value Database Use Cases

- Saving user session attributes
- Shopping cart

