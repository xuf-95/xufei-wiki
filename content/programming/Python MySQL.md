---
title: 
aliases: 
tags:
  - Python
  - mysql
date: 
draft:
---

![[Python MySQL.png]]

## Install MySQL Driver

```shell
 pip install mysql-connector-python 
```

## Create Connection

```python
import mysql.connector  
  
mydb = mysql.connector.connect(  
  host="localhost",  
  user="_yourusername_",  
  password="_yourpassword_"  
)  
  
print(mydb)


mycursor = mydb.cursor() 

### create databases
mycursor.execute("CREATE DATABASE mydatabase")

### create table
mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")

```

## Insert Into Table

```python
import mysql.connector  
  
mydb = mysql.connector.connect(  
  host="localhost",  
  user="_yourusername_",  
  password="_yourpassword_",  
  database="mydatabase"  
)  
  
mycursor = mydb.cursor()  
  
sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"  
val = ("John", "Highway 21")  
mycursor.execute(sql, val)  
**  
mydb.commit()  
**  
print(mycursor.rowcount, "record inserted.")
```

## Select From a Table

```python
import mysql.connector  
  
mydb = mysql.connector.connect(  
  host="localhost",  
  user="_yourusername_",  
  password="_yourpassword_",  
  database="mydatabase"  
)  
  
mycursor = mydb.cursor()  
  
mycursor.execute("SELECT * FROM customers")  
  
myresult = mycursor.fetchall()  
  
for x in myresult:  
  print(x)
```

## Select With a Filter

```python
import mysql.connector  
  
mydb = mysql.connector.connect(  
  host="localhost",  
  user="_yourusername_",  
  password="_yourpassword_",  
  database="mydatabase"  
)  
  
mycursor = mydb.cursor()  
  
sql = "SELECT * FROM customers WHERE address LIKE '%way%'"  
  
mycursor.execute(sql)  
  
myresult = mycursor.fetchall()  
  
for x in myresult:  
  print(x)
```

***
### Reference

- [There are many options for connecting MySQL from Python, but let's use PyMySQL or mysql-connector-python for now. - DEV Community](https://dev.to/miyachin/there-are-many-options-for-connecting-mysql-from-python-but-lets-use-pymysql-or-mysql-connector-python-for-now-epe)
- [GitHub - duerhong/py-mysql-easy: mysql crud](https://github.com/duerhong/py-mysql-easy)
