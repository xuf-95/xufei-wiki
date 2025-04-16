---
aliases:
  - scaling out
tags:
  - seedling
  - to-trans
publish: true
date: 2023-02-23
---

A horizontally scalable system is one that can increase capacity by adding more computers to the system.

```mermaid
%%{init: { "flowchart": { "useMaxWidth": true } } }%%
flowchart LR

subgraph Before
A[(Computer 1)]
end

subgraph After
B[(Computer 1)]
C[(Computer 2)]
D[(Computer 3)]
end

Before --> After
```

## Horizontal Scaling Advantages

- Allows for parallel execution of workloads
- Increased fault tolerance
- Cheaper compared to [[Vertical Scaling|vertical scaling]]

## Horizontal Scaling Disadvantages

- Decreased consistency
- Joining data between nodes is more time consuming

