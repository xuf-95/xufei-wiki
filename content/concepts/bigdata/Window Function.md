---
aliases:
  - SQL window function
tags:
  - seedling
publish: false
---

A [[SQL]] window function is a special syntax that allows aggregate functions to be performed over a set of rows that are related to the current row in the query. It's similar to using an aggregate function but, unlike regular aggregations, it doesn't collapse the result into one value; instead, each row retains its identity and the calculated result is returned for every row. Window functions are commonly used when creating running totals or ranking values within datasets.

![[Assets/sql-window-function.png|500]]

## Window Function Examples

```sql
SELECT Name, 
       SUM(Sales) OVER(PARTITION BY Name) AS TotalSales
  FROM my_table;
```

This statement will calculate a running total for each name listed in `my_table`.

## Window Function Advantages

- Perform complex calculations with less code than would otherwise be required

## Window Function Disadvantages

- Can be more complicated to understand and debug


