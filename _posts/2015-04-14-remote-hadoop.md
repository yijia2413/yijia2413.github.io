---
layout: post
title: mac下eclipse调试vagrant hadoop
category: 代码
tags: 
  - 其他
imagefeature: null
mathjax: false
chart: false
comments: true
featured: false
published: true
---

## 情况简介
mac下不想装图形界面虚拟机，所以用`vagrant`+`virtual box`虚拟了ubuntu环境，在ubuntu下配置好`hadoop`环境，然后利用eclipse远程调试

## 准备
*	vagrant环境
*	virtual box
*	hadoop环境，我的是`hadoop 2.5.2` + `hbase 0.98.11`

一切部署都在这里弄好了，配一次，以后可以直接用了，不要因为换机器而烦恼了……：

[vagrant-cascading-hadoop-cluster](https://github.com/yijia2413/vagrant-cascading-hadoop-cluster)

## 配置步骤
*	__step1:__ 假设hadoop + hbase都配置好了，在远程(或者vagrant里面)
*	__step2:__ 下载安装eclipse，官网解决即可，for os x
*	__step3:__ 下载[hadoop2x-eclipse-plugin](https://github.com/winghc/hadoop2x-eclipse-plugin),放入ecipse插件下

在release目录下，没想到2.6.0的插件居然也做好了，2.6.0可以兼容2.5.2，可以放心使用,执行以下操作
```bash
cp hadoop-eclipse-kepler-plugin-2.2.0.jar /your_path/eclipse/plugins
/your_path/eclipse/ -clean
```
*	__step4:__ 下载hadoop源码包，在本地，`无需配置，解压即可`，eclipse要用到里面的lib文件,在`preference`里面,添加hadoop的location即可。比如：~/hadoop-2.5.2/

*	__step5:__ eclipse->window->Open Perspective->others->mapreduce,下方mapreduce location，右键添加location



接下来要配置location的一些参数，我的配置如下：
```
location name: Namenode
map/reduce(v2) Master:
host:192.168.7.10
port:9001

dfs master:
host:192.168.7.10
port:9000

username:vagrant
```

IP为远程IP，此处为vagrant的master节点对应的ip(`伪分布式`)

*	__step6:__ 新建mapreduce项目，新建一个class，就可以开始写程序了

可以用官方的程序做一个验证

*	__step7:__ 配置参数：

下面是我的运行参数配置，ip地址也可以改为master.local，当然修改了hosts

	hdfs://192.168.7.10:9000/tmp/pg20417.txt hdfs://192.168.7.10:9000/tmp/pg20417.out
	
*	__step8:__ 运行，检测，搞定

*	__step9:__ 添加log，在eclipse的控制台，在src里面加入log4j.properties即可

## 完成
此时，可以在eclipse里面尽情的远程调试hadoop程序了




	
