---
title: Faker
tags:
  - Python
  - library
date: 2022-02-09
---
## 概述

### 定义

> _Faker_ is a Python package that generates fake data for you.


## 开发文档

### Install Faker

```python
pip install Faker
```

### 案例

##### Demo01

```python
from faker import Faker  
fake = Faker()  
  
print(fake.name())  
  
print(fake.address())  
  
fake.text()
```

## Reference

- [Welcome to Faker’s documentation! — Faker 30.3.0 documentation](https://faker.readthedocs.io/en/master/)
- 