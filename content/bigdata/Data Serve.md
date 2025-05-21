---
title: Data Serve
aliases:
  - Server Script
tags:
  - bigdata
  - script
  - shell
date: 2023-04-11
draft: false
---
## Cluster Start Snippets
### 启动zookeeper服务

```shell
#!/bin/bash

case $1 in
"start"){
    for i in bigdata101 bigdata102 bigdata103
    do
        echo "------------- $i -------------"
        ssh $i "/opt/apps/zookeeper/bin/zkServer.sh start"
    done
};;
"stop"){
    for i in bigdata101 bigdata102 bigdata103
    do
        echo "------------- $i -------------"
        ssh $i "/opt/apps/zookeeper/bin/zkServer.sh stop"
    done
};;
"status"){
    for i in bigdata101 bigdata102 bigdata103
    do
        echo "------------- $i -------------"
        ssh $i "/opt/apps/zookeeper/bin/zkServer.sh status"
    done
};;
esac
```

### 启动Flume

```shell
#!/bin/bash
FLUME_HOME=/opt/apps/flume

case $1 in
"stop"){
  echo " --------停止 $2 agent-------"
  ps -ef | grep agent-$2 | grep -v grep |awk  '{print $2}' | xargs -n1 kill -9
}
;;
"restart"){
echo " --------停止 $2 agent-------"
  ps -ef | grep agent-$2 | grep -v grep |awk  '{print $2}' | xargs -n1 kill -9
  echo " --------开始 $2 agent-------"
  nohup $FLUME_HOME/bin/flume-ng agent --name agent-$2 --conf-file $FLUME_HOME/conf/vehicle/$2.conf -Dflume.bigdata.logger=INFO >$FLUME_HOME/logs/$2.log 2>&1  &
}
;;
"startAll"){
for file_name in tz-vehicle-alarm tz-vehicle-drivemotor tz-vehicle-extreme tz-vehicle-location tz-vehicle-realtime tz-vehicle-subsystemtemperature tz-vehicle-subsystemvoltage tz-vehicle-vehicle
     do
     echo " --------开始 $file_name agent-------"
     nohup $FLUME_HOME/bin/flume-ng agent --name agent-${file_name} --conf-file $FLUME_HOME/conf/vehicle/${file_name}.conf -Dflume.bigdata.logger=INFO >$FLUME_HOME/logs/${file_name}.log 2>&1  &
     done
}
;;
"stopAll"){
for file_name in tz-vehicle-alarm tz-vehicle-drivemotor tz-vehicle-extreme tz-vehicle-location tz-vehicle-realtime tz-vehicle-subsystemtemperature tz-vehicle-subsystemvoltage tz-vehicle-vehicle
     do
     echo " --------关闭 $file_name agent-------"
     ps -ef | grep agent-$file_name | grep -v grep |awk  '{print $2}' | xargs -n1 kill -9
     done
}
;;
"status"){
     ps -ef|grep agent-$2|grep -v grep |awk '{print $2}'
}
;;
"statusAll"){
echo "process      PID     n"
i=1
for file_name in tz-vehicle-alarm tz-vehicle-drivemotor tz-vehicle-extreme tz-vehicle-location tz-vehicle-realtime tz-vehicle-subsystemtemperature tz-vehicle-subsystemvoltage tz-vehicle-vehicle
        do
     cmd=` ps -ef|grep agent-$file_name|grep -v grep |awk '{print $2}'`
     echo "${file_name}  $cmd   $i"
     i=$[$i+1]
     done
}
;;

*)
     echo Invalid Args!
    echo 'Usage:stop tz-vehicle-alarm |restart tz-vehicle-alarm | status tz-vehicle-alarm | startAll | stopAll| statusAll'
;;
esac
```


### 启动kafka集群

```shell
#! /bin/bash

case $1 in
"start"){
    for i in bigdata101 bigdata102 bigdata103
    do
        echo " --------启动 $i Kafka-------"
        ssh $i "/opt/apps/kafka/bin/kafka-server-start.sh -daemon /opt/apps/kafka/config/server.properties "
    done
};;
"stop"){
    for i in bigdata101 bigdata102 bigdata103
    do
        echo " --------停止 $i Kafka-------"
        ssh $i "/opt/apps/kafka/bin/kafka-server-stop.sh stop"
    done
};;
esac
```