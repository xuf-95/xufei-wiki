---
tags:
  - script
  - shell
date: 2022-02-20
draft:
---
### 1. install_jdk.sh

```bash
#!/bin/bash

tar -zxvf /export/softwares/jdk-8u141-linux-x64.tar.gz -C /export/servers/

cd /export/servers/jdk1.8.0_141
home=`pwd`

echo $home

echo "export JAVA_HOME=${home}"  >> /etc/profile
echo "export PATH=:\$PATH:\$JAVA_HOME/bin" >> /etc/profile


for m in  2 3
do
scp -r /export/servers/jdk1.8.0_141 node0$m:/export/servers/
ssh node0$m "echo 'export JAVA_HOME=/export/servers/jdk1.8.0_141' >> /etc/profile; echo 'export PATH=:\$PATH:\$JAVA_HOME/bin' >> /etc/profile"

done

```