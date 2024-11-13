---
title: 
aliases: 
tags:
  - script
date: 
draft:
---
## Basic

>[!note] 选择解析器
#!/bin/bash


### variable


```bash
# 定义变量
variable=value
variable='value'
variable="value"

# 取消定义变量
unset variable_name【变量名】

# 单引号和双引号的区别  双引号解析 单引号不解析直接为字符串
url="http://c.biancheng.net"
website1='C语言中文网：${url}'
website2="C语言中文网：${url}"
echo $website1
echo $website2
===>>> C语言中文网：${url}
===>>> C语言中文网：http://c.biancheng.net

# 引用变量v
skill="严长生"
echo $skill
echo ${skill}
echo "I am good at ${skill}Script"
echo "I am good at $skillScript"

##### 将命令的结果赋值给变量
 log=`cat log.txt`   ===>>> 容易混淆，不推荐
 log=`echo $aa | cut -f1 -d '_'`  ===>>> 容易混淆，不推荐
 log=$(cat log.txt)
 log=$(echo $aa | cut -f1 -d '_')
 echo $log
 
# 显示脚本参数（$0、$?、$*、$@、$#、$$、$!）（本质上属于变量替换）
$0	shell命令本身，bash的文件名
$1-9	shell第几个参数 10个以上参数 用${11}...
$?  0=>成功 非0=>失败 上一个指令的返回值

$*	以一个单字符串显示所有向脚本传递的参数 (参数间用空格分隔) ===>>>  "a b c "
$@	以多个字符串返回参数 ===>>> "a" "b" "c"
$#	获取传递参数的个数

# $[]  $() ` ` ${} 区分
$[ ]	命令计算赋值   例 ： $[n%3] ， $((rows-1)) <- 推荐
$[ ] <=> $(()) 等价 <推荐>
$()  <=>  `` 等价  命令输出赋值
${}  获取变量的值
```

### 条件判断```
```bash
#  条件判断
#（1）两个整数之间比较
== 字符串比较
-lt 小于（less than）			-le 小于等于（less equal）
-eq 等于（equal）				-gt 大于（greater than）
-ge 大于等于（greater equal）	-ne 不等于（Not equal）
#（2）按照文件权限进行判断
-r 有读的权限（read）			-w 有写的权限（write）
-x 有执行的权限（execute）
#（3）按照文件类型进行判断
-f 文件存在并且是一个常规的文件（file）
-e 文件存在（existence）		-d 文件存在并是一个目录（directory）

多条件判断
if [ c1 ] || [  c2 ]; then
…
fi

三元条件逻辑 :  [[ 条件表达式 ]] && ... || ...
```

```bash
#!/bin/bash
# Change this code
BIRTHDATE="Jan 1, 2000"
Presents=10
BIRTHDAY="Monday"


# Testing code - do not change it

if [ "$BIRTHDATE" == "Jan 1, 2000" ] ; then
    echo "BIRTHDATE is correct, it is $BIRTHDATE"
else
    echo "BIRTHDATE is incorrect - please retry"
fi
if [ $Presents == 10 ] ; then
    echo "I have received $Presents presents"
else
    echo "Presents is incorrect - please retry"
fi
if [ "$BIRTHDAY" == "Saturday" ] ; then
    echo "I was born on a $BIRTHDAY"
else
    echo "BIRTHDAY is incorrect - please retry"
fi
```



## Reference

