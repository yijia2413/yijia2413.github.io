---
layout: post
title: centos下的一些操作记录
category: 博客
tags: 语法
description: 
---
## 关于ssh的scp复制
这个只是简单的mark了，因为用了几次，就简单的记录一下。

本地文件拷贝到远程：

    scp /local_dir/local_file_name root@remote_ip:/remote_dir/
    
    scp -r /local_dir/ root@remote_ip:/remote_dir/ 
    
远程文件拷贝到本地：

    scp root@remote_ip:/remote_dir/remote_file_name /local_dir/
    
    scp -r root@remote_ip:/remote_dir/ /local_dir/
    
##mysql-devel
这个东西在mysql连接c的时候需要用到，而且要注意编译参数。

rpm格式的真的不好下载……那么备份一下～

##彻底卸载mysql
具体操作如下：

    yum remove mysql mysql-server mysql-client mysql-devel
    rm -rf /var/lib/mysql
    rm /etc/my.cnf
然后查看是否存在：

    rpm -qa|grep mysql
找到之后rm -rf 

