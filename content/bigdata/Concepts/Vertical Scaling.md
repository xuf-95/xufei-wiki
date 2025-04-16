---
aliases:
  - 垂直扩展
tags:
  - architecture
date: 2023-02-05
draft: true
---

Vertical scaling is when you increase the capacity of a system by increasing the compute size.

```mermaid
%%{init: { "flowchart": { "useMaxWidth": true } } }%%
flowchart LR

subgraph Before
A[(Computer 1)]
end

subgraph After
B[(Computer 1 \n\n\n\n\n)]
end

Before --> After
```

## Vertical Scaling Advantages

- Very simple and straight forward
- No code or design changes needed

## Vertical Scaling Disadvantages

- Becomes more expensive (compared to [[Horizontal Scaling|horizontal scaling]]) as more specialized hardware is needed to achieve higher levels of performance
- Increased risk of a single point of failure


