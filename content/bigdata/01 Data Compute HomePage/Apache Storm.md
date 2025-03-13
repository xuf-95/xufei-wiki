---
title: Storm
tags:
  - bigdata
  - datastore
draft: false
date: 2024-07-24
---
![[Apache Storm.png]]

### Why use Apache Storm?

Apache Storm is a free and open source distributed realtime computation system. Apache Storm makes it easy to reliably process unbounded streams of data, doing for realtime processing what Hadoop did for batch processing. Apache Storm is simple, can be used with any programming language, and is a lot of fun to use!

Apache Storm has many use cases: realtime analytics, online machine learning, continuous computation, distributed RPC, ETL, and more. Apache Storm is fast: a benchmark clocked it at over **a million tuples processed per second per node**. It is scalable, fault-tolerant, guarantees your data will be processed, and is easy to set up and operate.

Apache Storm integrates with the queueing and database technologies you already use. An Apache Storm topology consumes streams of data and processes those streams in arbitrarily complex ways, repartitioning the streams between each stage of the computation however needed. Read more in the tutorial.

#### Stream groupings

A stream grouping tells a topology how to send tuples between two components. Remember, spouts and bolts execute in parallel as many tasks across the cluster. If you look at how a topology is executing at the task level, it looks something like this

![[Apache Storm 1.png]]


***

- [Apache Storm ](https://storm.apache.org/)
- [History of Apache Storm and lessons learned - thoughts from the red planet - thoughts from the red planet](http://nathanmarz.com/blog/history-of-apache-storm-and-lessons-learned.html)
- [About Me - thoughts from the red planet](http://nathanmarz.com/about/) In 2011 created open-sourced Apache Storm Project