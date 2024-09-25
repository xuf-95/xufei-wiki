---
title: Apache Pulsar
tags:
  - data-integration
  - apache
  - pulsar
---

## What's  Apache Pulsar?

> Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud, a multi-tenant, high-performance solution for server-to-server messaging. Originally developed by Yahoo


## Key features

- Native support for multiple clusters in a Pulsar instance, with seamless [geo-replication](https://pulsar.apache.org/docs/3.3.x/administration-geo/) of messages across clusters.
- Very low publish and end-to-end latency.
- Seamless scalability to over a million topics.
- A simple [client API](https://pulsar.apache.org/docs/3.3.x/concepts-clients/) with bindings for [Java](https://pulsar.apache.org/docs/3.3.x/client-libraries-java/), [Go](https://pulsar.apache.org/docs/3.3.x/client-libraries-go/), [Python](https://pulsar.apache.org/docs/3.3.x/client-libraries-python/) and [C++](https://pulsar.apache.org/docs/3.3.x/client-libraries-cpp/).
- Multiple [subscription types](https://pulsar.apache.org/docs/3.3.x/concepts-messaging/#subscription-types) ([exclusive](https://pulsar.apache.org/docs/3.3.x/concepts-messaging/#exclusive), [shared](https://pulsar.apache.org/docs/3.3.x/concepts-messaging/#shared), and [failover](https://pulsar.apache.org/docs/3.3.x/concepts-messaging/#failover)) for topics.
- Guaranteed message delivery with [persistent message storage](https://pulsar.apache.org/docs/3.3.x/concepts-architecture-overview/#persistent-storage) provided by [Apache BookKeeper](http://bookkeeper.apache.org/). A serverless lightweight computing framework [Pulsar Functions](https://pulsar.apache.org/docs/3.3.x/functions-overview/) offers the capability for stream-native data processing.
- A serverless connector framework [Pulsar IO](https://pulsar.apache.org/docs/3.3.x/io-overview/), which is built on Pulsar Functions, makes it easier to move data in and out of Apache Pulsar.
- [Tiered Storage](https://pulsar.apache.org/docs/3.3.x/tiered-storage-overview/) offloads data from hot/warm storage to cold/long-term storage (such as S3 and GCS) when the data is aging out.
![[Apache Pulsar Architecture.png]]