---
tags:
  - dev
date: 
draft:
---

### today create

```dataview
list
where file.cday = date(today)
sort file.ctime asc
```

### today update
```dataview
list
where file.mday = date(today)
sort file.ctime asc
```