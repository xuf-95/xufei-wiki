---
aliases:
  - correlated subquery
  - synchronized subquery
tags:
  - incubating
  - to-trans
draft: true
---

A [[SQL]] query nested inside another query that uses the values from the outer/parent query. Because the correlated subquery can be evaluated once for each row in the outer query, it can be slow.

Example

```sql
 SELECT employee_number, name
   FROM employees emp
   WHERE salary > (
     SELECT AVG(salary)
       FROM employees
       WHERE department = emp.department);
```

Outer query

```sql
 SELECT employee_number, name
   FROM employees emp
   WHERE salary > ...
```

Correlated Subquery

```sql
 SELECT AVG(salary)
   FROM employees
   WHERE department = emp.department
```

