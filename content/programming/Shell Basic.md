---
title: Shell Basic
tags:
  - shell
  - snippets 
date: 2022-07-08
draft:
---
![[Shell Basic.png]]
### Variables

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

>[!tldr]- Output
>BIRTHDATE is correct, it is Jan 1, 2000
>
>I have received 10 presents
>
>BIRTHDAY is incorrect - please retry 

## Function

```bash
#!/bin/bash

demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
```

```bash
#!/bin/bash

funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"

函数返回值在调用该函数后通过 $? 来获得
```

```bash
#!/bin/bash

funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73

i=1
while ((i<=3))
do
echo $i
let i++
done

```
## Loop

```bash

# 1.if

if condition
then
    command1 
    command2
    ...
    commandN 
fi

写成一行：if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi


# 2.if else

if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi

# 3.if else-if else

if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```

**Example**

```bash
#!/bin/bash

a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

> [!example]- Example
> a 小于 b 

```bash
#!/bin/bash
# case语句

echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

## Operation

### 算术运算符

```bash
#!/bin/bash

a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"

val=`expr $a - $b`
echo "a - b : $val"

val=`expr $a \* $b`
echo "a * b : $val"

val=`expr $b / $a`
echo "b / a : $val"

val=`expr $b % $a`
echo "b % a : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
```

### 关系运算符

> 关系运算符只支持数字，不支持字符串，除非字符串的值是数字

- EQ 就是 EQUAL等于
- NQ 就是 NOT EQUAL不等于 
- GT 就是 GREATER THAN大于　 
- LT 就是 LESS THAN小于 
- GE 就是 GREATER THAN OR EQUAL 大于等于 
- LE 就是 LESS THAN OR EQUAL 小于等

```bash
#!/bin/bash

a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi
```

### 布尔运算符

```bash
#!/bin/bash

a=10
b=20

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
   echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
if [ $a -lt 100 -o $b -gt 100 ]
then
   echo "$a 小于 100 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 100 或 $b 大于 100 : 返回 false"
fi
if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi

```

### 逻辑运算符

```bash
#!/bin/bash

a=10
b=20

if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi

if [[ $a -lt 100 || $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi
```

### 字符串运算符

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

```bash
#!/bin/bash

a="abc"
b="efg"

if [ $a = $b ]
then
   echo "$a = $b : a 等于 b"
else
   echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ -n $a ]
then
   echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi
if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
```

### 文件测试运算符

文件测试运算符用于检测 Unix 文件的各种属性。属性检测描述如下：

```bash
#!/bin/bash

file="/var/www/itcast/test.sh"
if [ -r $file ]
then
   echo "文件可读"
else
   echo "文件不可读"
fi
if [ -w $file ]
then
   echo "文件可写"
else
   echo "文件不可写"
fi
if [ -x $file ]
then
   echo "文件可执行"
else
   echo "文件不可执行"
fi
if [ -f $file ]
then
   echo "文件为普通文件"
else
   echo "文件为特殊文件"
fi
if [ -d $file ]
then
   echo "文件是个目录"
else
   echo "文件不是个目录"
fi
if [ -s $file ]
then
   echo "文件不为空"
else
   echo "文件为空"
fi
if [ -e $file ]
then
   echo "文件存在"
else
   echo "文件不存在"
fi
```
