---
title: Faker
tags:
  - python
  - package 
date: 2022-02-09
draft: false
---
## 概述

### 定义

> _Faker_ is a Python package that generates fake data for you.

Faker 是一个用于生成伪造数据的 Python 库，特别适用于测试和开发环境。它可以生成诸如姓名、地址、电子邮件、电话号码等多种类型的随机数据

## 开发文档
### Install Faker

```python
pip install Faker
```

### 案例

##### Demo 01

```python
from faker import Faker

# 创建一个 Faker 实例
fake = Faker()

# 生成随机数据
print(fake.name())        # 生成随机姓名
print(fake.address())     # 生成随机地址
print(fake.email())       # 生成随机电子邮件
print(fake.phone_number())  # 生成随机电话号码
```

```python
# 创建一个中文生成器
fake_cn = Faker('zh_CN')

print(fake_cn.name())     # 生成随机中文姓名
print(fake_cn.address())  # 生成随机中文地址
```

```python
print(fake.first_name())     # 生成随机名字
print(fake.last_name())      # 生成随机姓氏
print(fake.date_of_birth())  # 生成随机出生日期
print(fake.ssn())            # 生成随机社会安全号码
```


```python
print(fake.city())           # 生成随机城市
print(fake.state())          # 生成随机州
print(fake.country())        # 生成随机国家
print(fake.zipcode())        # 生成随机邮政编码
```

```python
print(fake.email())          # 生成随机电子邮件
print(fake.ipv4())           # 生成随机 IPv4 地址
print(fake.url())            # 生成随机 URL
print(fake.user_agent())     # 生成随机用户代理
```

```python
print(fake.date())           # 生成随机日期
print(fake.time())           # 生成随机时间
print(fake.date_time())      # 生成随机日期和时间
print(fake.date_this_year()) # 生成今年内的随机日期
```

```python
print(fake.color_name())     # 生成随机颜色名称
print(fake.currency_name())  # 生成随机货币名称
print(fake.file_name())      # 生成随机文件名
print(fake.paragraph())      # 生成随机段落
```

```python
# 使用自定义的 Provider 扩展 Faker，以支持生成特定类型的数据

from faker import Faker
from faker.providers import BaseProvider

# 自定义 Provider
class MyProvider(BaseProvider):
    def foo(self):
        return 'bar'

# 添加自定义 Provider
fake = Faker()
fake.add_provider(MyProvider)

print(fake.foo())  # 输出: 'bar'
```

```python
# 设置种子以生成可预测的结果
Faker.seed(0)
fake = Faker()

# 生成 5 组随机姓名和地址
for _ in range(5):
    print(fake.name(), fake.address())
```

```python
# 生成一个简单的用户资料
print(fake.simple_profile())

# 生成一个详细的用户资料
print(fake.profile())
```

```python
# 使用 seed() 方法确保每次生成的数据是可预测和可重复的

from faker import Faker

fake = Faker()
fake.seed_instance(123)  # 设置种子

```

```python
# 生成 10 组随机姓名

for _ in range(10):

    print(fake.name())

```


## 生成用户测试数据

```python
from odps import ODPS
from faker import Faker

# 配置 ODPS 连接
odps = ODPS(
    access_id='your_access_id',
    secret_access_key='your_secret_access_key',
    project='your_project',
    endpoint='your_endpoint'
)

# 定义表名
table_name = 'mall_user_info'

# 创建用户信息表
create_table_sql = f"""
CREATE TABLE IF NOT EXISTS {table_name} (
    user_id STRING COMMENT '用户ID',
    first_name STRING COMMENT '名字',
    last_name STRING COMMENT '姓氏',
    gender STRING COMMENT '性别',
    age INT COMMENT '年龄',
    email STRING COMMENT '电子邮件',
    phone_number STRING COMMENT '电话号码',
    address STRING COMMENT '地址',
    city STRING COMMENT '城市',
    state STRING COMMENT '省/州',
    country STRING COMMENT '国家',
    postal_code STRING COMMENT '邮政编码',
    credit_card STRING COMMENT '信用卡号码',
    join_date STRING COMMENT '注册日期',
    occupation STRING COMMENT '职业'
);
"""

# 执行创建表操作
odps.execute_sql(create_table_sql)
print(f"Table '{table_name}' created successfully.")

# 创建 Faker 实例
fake = Faker()

# 插入测试数据
for _ in range(100):
    insert_sql = f"""
    INSERT INTO {table_name} VALUES (
        '{fake.uuid4()}',
        '{fake.first_name()}',
        '{fake.last_name()}',
        '{fake.random_element(elements=["Male", "Female"])}',
        {fake.random_int(min=18, max=70)},
        '{fake.email()}',
        '{fake.phone_number()}',
        '{fake.address()}',
        '{fake.city()}',
        '{fake.state()}',
        '{fake.country()}',
        '{fake.postcode()}',
        '{fake.credit_card_number()}',
        '{fake.date_this_decade()}',
        '{fake.job()}'
    );
    """
    odps.execute_sql(insert_sql)

print("100 rows of test data inserted successfully.")
```

## Reference

- [Welcome to Faker’s documentation! — Faker 30.3.0 documentation](https://faker.readthedocs.io/en/master/)