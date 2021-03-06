---
layout: post
title: 海量日志数据Mysql导入Hive
category: 项目
tags: 
  - mysql
  - sqoop
  - join
imagefeature: null
mathjax: false
chart: false
comments: true
featured: false
published: false
---


研究僧：Project 2
=================

## 基本信息
*	start: 2015.11.22
*	end: 2015.12.20
*	coding: 3-5 days
*	明确需求: about 20 days
*	吐槽：程序员做怕的事情，就是需求变来变去变化不停……

## 需求
> * 为了这个需求，真是揪心了好久好久……

Linux系统有各种类型的系统日志，比如`dmegs`, `message`,大部分都在`/var/log/`下。需求者需要定时的收集这些日志信息，后期对这些日志进行离线分析。我的任务则是「数据接入」，通俗来说，就是「导数据」。

*	收集台数：「5000台」
*	日志量：「0.2 MB/台/h」
*	每台每小时0.2M，每天合计 0.2M * 24 * 5000 = 30G(约30G每天)

说到这里，不得不吐槽一句，「需求」这个事情，「不应该」变来变去。

当时为了导这一批数据，变更了「2」次需求，「3」次方案：

1. 直接从文本导入
	*	日志全是文件，分布在「5000」台机器上，需要自己去取
	*	收集到的数据放入hadoop集群的数据仓库中。数据需要进行简单的结构化处理
2. 从Mysql导入
	*	日志文件收集到Mysql关系型数据库(需求方自行收集)
		*	再次吐槽，都导入mysql了，还差导入数据仓库？
		*	这么大的数据量，肯定需要考虑「建索引」、「分区」，不然查查询肯定特费劲
		*	当然，过个一个月半个月，「分表」估计也得做吧……当然，数据也可以删掉
	*	将数据从Mysql中取出来，导入hadoop集群中的数据仓库

## 开工
- 了解表结构设计，查看索引，分区等
- 设计查询语句
- 优化查询语句（尤其是这里涉及到join部分）
- 写crontab，每天定时执行
- 定时导出，然后定时写入hive的分区表中

由于项目问题，不能细写……

