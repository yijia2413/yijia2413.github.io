---
layout: post
title: 基于流日志的SQL查询
category: 项目
tags: 
  - spark streaming
  - kafka
  - flume
imagefeature: null
mathjax: false
chart: false
comments: true
featured: false
published: false
---
__研究生阶段正式项目一__

由于项目原因，不能记载太详细

## 基本信息
start: 2015.10.11

end: 2015.11.12

coding: 3 days

debug and tuning: 26 days......

documents: 2 days

## 需求
*	基于spark streaming的SQL语句查询
	* 流量: `100` GB/s
	* 处理速度： 达到上百 GB/s
	* 各种语句类型，包括join, group by, limit, concat
	* 每一条查询语句需要执行`几天`的时间，每一次查询结果需要保存到HDFS
	
*	基于kafka的benchmark测试
	* 生产者生产峰值：数据加载到kafka broker的速度
	* 消费者消费峰值：数据发送给streaming程序消费的速度
	
* 	基于flume的kafka sink测试
	* flume用kafka sink，模拟生产者，效率如何
	
*	时间
	* 开发到测试完成，形成文档，合计`30天`
	
## 测试环境
1. `30台`机器
	* CM 5.4 集群
	* spark 1.3.0
	* kafka 0.8.11
	* flume 1.6.0
	* 其它如hive、impala、hadoop为默认
2. 单台机器配置如下：
	* 双口 Intel 万兆光口网卡
	* `10块` `4T` `7200rpm` `3.5寸` 热拔插硬盘
	* `128G` 内存
	* Intel Xeon E5-2630v2(2.6GHz/6C/15M cache)*2
	* `24`核心，超线程
3. 测试数据量：
	* 主表：7.3 TB, 400亿+ 条
	* 辅表：500 M， 100万+ 条
	
## 解决思路
### 1.自身实现sql解析器，在streaming程序中调用并处理
较之开源的代码，自身实现会存在很多瓶颈，如果只是为了某几个特定的查询语句，简单的实现过滤或者分组操作，可以考虑在实现的时候单独优化。

但是在语句本身不确定而且时间很赶的情况下，这不是一个好的解决思路

### 2.利用spark sql对sql的支持，基于RDD做查询处理
这是一个很容易上手的尝试。官方文档非常齐全，所以选择了基于RDD做SQL查询操作。

__整体流程为__：

1. flume 监测flume pool，发送数据到kafka，相当于生产者
2. kafka 设定好 topic 和 broker，负责接收来自flume的数据
3. streaming程序启动 receiver，对接收来自kafka的数据进行SQL查询操作，并对查询结果进行保存，相当于消费者

## 实现过程
### 1.flume 配置
__遇到的问题__:

flume可以利用kafka sink往kafka中写数据，但是一开始我仿照官网的设置的时候，发现数据__并不是均匀的__写道每一个kafka的分区。

这将会导致spark streaming处理的时候，接收数据不均匀，从而出现处理速度过慢的问题

__解决方案__:

flume可以直接写到kafka，需要增加如下配置：

	a1.sources.r1.interceptors = i1
	a1.sources.r1.interceptors.i1.type = org.apache.flume.sink.solr.morphline.UUIDInterceptor$Builder
	a1.sources.r1.interceptors.i1.headerName = key
	a1.sources.r1.interceptors.i1.preserveExisting=false

__优点__:

可以将数据均匀的发送到kafka，每一个分区数据量基本大小基本一致


__缺点__：

往header中添加`UUID`会导致flume每一次发送的数据量增加。

原本的数据每一条大小为`200字节`，而`UUID`就有可能需要几十字节，相对占比比较大，使得整体的flume加载速度变慢很多。


__测试结果对比__:

不添加UUID：单flume agent，单kafka sink，`17 M/s`
添加UUID： 单flume agent，单kafka sink，`11 M/s`

果然整体会减慢，当增加agent数量的时候，单个agent的效率会进一步减慢，但能保证数据是均匀的

__选择方案__：

考虑到测试的时候先提前添加离线数据，再利用spark streaming进行处理，所以采用均匀发送的策略

### 2.flume监测方案

flume模拟生产者，产生数据的效率瓶颈无非在两个方面：`I/O` 和 `网卡`，对于单台机器，万兆网卡的传输极限为`1250`，当然实际过程中是达不到这个值的，一般传输速率对比：

* 千兆： 100 M/s
* 万兆： 300 - 400 M/s
* 磁盘： 50 - 100 M/s, 10块盘

于是，设计了初步的加载方案(kafka broker 3台)：

1. 单agent，单节点，单盘，单kafka sink
	* 主要是想看一下单agent的极限效率
	* 利用CM自带的flume测试，速度为： 20+ M/s
	* 自身从apache下载的flume，自己配置，配置文件一模一样，速度为: 11 M/s
	* 这个有点见鬼……
	* 往上走，开始添加flume agent，看看提高多少

2. 每一个节点部署10个flume agent，每一个flume agent监测一块硬盘下的一个目录
	* 使得硬盘之间的I/O不会出现相互影响
	* 这里都是自己配置的flume agent
	* 差不多速率呈线性倍数增加，11 M/s * 10
	* 此时，每一块盘，远没有达到磁盘的I/O瓶颈
	* 当然，此时，远没有达到网卡瓶颈
	
3. 每一个节点30个flume agent，每3个agent，监测一块磁盘下的3个目录
	* 能不能多用一些I/O，瓶颈还没到
	* 30个agent，就会有30个flume进程
	* 速度会有提升，单节点，30个agent，能达到 180+ M/s
	
4. 每一个节点60个flume agent，每6个agent，监测一块磁盘下的6个目录
	* 继续增加，看能否再次提速
	* 速度： 200+ M/s
	* 速度有提升，但同时进程数量有点多，flume 启动耗时增长，初始化连接时间增长
	
5. 每一个节点90个flume agent，每9个agent，监测一块磁盘下的9个目录
	* 纯粹只是为了试试是否可行
	* 速度有提升，flume启动需要更长的时间
	* 有时候flume进程会挂掉，开始需要写守护进程
	* 进程太多，开始不太好管理了
	
	
所以，以30个agent为基本策略，开始__横向扩展__，扩充机器台数

__理论上来讲：单纯的横向扩展，由于每一个节点之间互不影响，flume加载速度应该是整数倍的增长，但实际上不是整数倍增长，机器增多，倍率会降低__

6. 6台机器，每台30个flume agent，每3个agent监测一块硬盘下的3个目录
	* 579M/s

7. 9台机器，每台30个flume agent，每3个agent监测一块硬盘下的3个目录
	* 882 M/s	
	

### 3.flume加载速度原因分析
1. flume加载速度本来就不快(好吧，看了网上的benchmark，以及问了一些有经验的人，权当是速度慢的借口吧)
2. 单独用来做加载的flume机器没有与集群隔离，测试的时候yarn上的一些任务可能会对速度有影响
3. 可能单节点比较靠谱的agent数量不是30，可能是50左右
4. 添加了UUID使得本来就很慢的加载速率会更慢
5. __网卡瓶颈和磁盘瓶颈都没有达到，但是开启过多的agent不好控制__，所以，这里需要做一个权衡


### 4.kafka设置

作为一个中间件，kafka在整个系统的过程中有至关重要的作用

1. 分区
	* 分区多，接收数据的能力会强，但不是越多越好
	* 分区与磁盘的数量需要做一个控制，最好让每一个分区的数据落到不同的磁盘
	* 分区还需要考虑spark streaming接收的时候，启动的receiver的数量，而每个receiver需要一个cpu核心
2. broker
	* 这里简单的理解为kafka节点好了
	* 集群中应该部署多少台节点用于kafka，也需要考量
3. 负载均衡
	* kafka的同时连接数量
	* 有时候会出现 connection reset by peer，这时就要考虑数据会不会丢失了
4. 副本数
	* 用于测试，有时候就一个副本，不过一般创建topic的时候会创建2个副本
	* 副本数应该不多于broker的数量
	
### 5.kafka测试
生产者部分的测试，从flume往kafka加数据已经测了，接下来是消费者消费kafka里面的数据测试了。

kafka里面有一个自带的kafka-pref-test，需要从网上下载jar包，然后用命令行模拟消费者测试，我测试了以下，感觉相当不准确，就放弃了。(当然，很有可能是我测试的方式不对，这个可以以后研究下)

这里，选取的测试方式是用spark streaming程序，模拟消费者，使得__消费的速率远远大于接收的速率__，这样得出的速率基本上就是__kafka往外发的速率__。

__基本kafka测试方案如下：__

1. 单broker，10分区，增加订阅者，测试极限速度
	* 1 consumer, 390 M/s
	* 2 consumer, 476 M/s
	* 3 consumer, 585 M/s
	* 4 consumer, 879 M/s
	* 5 consumer, 816 M/s
	* 随着consumer数量的增加，基本能达到单节点，网卡的瓶颈
	* 但是，consumer增加，会让spark streaming receiver的接收达到稳定的时间越来越长
	
2. 3 brokers，18 partitions
	* 测试的极限速度为 2G/s, 大概10个订阅者的时候
	* 稳定时间需要特别久，大概48min达到稳定
	* 集群开始不够用了，因为每一个分区需要一个receiver，每一个receiver需要一个cpu核心，18 * 10 就是180个核心，差不多占了1/3了，而spark streaming本身还需要核心和内存
	* 稳定时间太长，结果也不太稳定，2G/s只能是一个参考值，并不准确
	
3. 5 brokers，50 partitions
	* 5个消费者的时候，测到了2.4G/s
	* 集群cpu不够了……就没测了
	
> 看网上测试kafka的benchmark，完全没有我这么多机器……可能真的是我的方式不对


### spark streaming
这里需要调整的参数太多了，这也是为什么写代码只花了3天，而调优大概用了25天的原因。


当然，其实到写这篇日志，还有一些spark的参数，没能够比较透彻的理解，整个代码调整的参数，我先记录下来

* spark 作业



一个spark作业一般包含一个到多个多个stage，一个stage包含一个到多个task，DAGSheduler，将spark作业生成一个或者多个spark，每个stage根据RDD的partition的个数决定task的个数，生成相应的Task set放在TaksScheduler中

TaskScheduler，实现task在executor上的分配和执行


* driver_memory
* driver_cores

这是用于启动spark streaming程序的节点分配的内存和cpu核心，负责整体的调度，一般不需要太多，12G和10cores是一个比较好的参数

Driver进程是应用的主控进程，负责应用的解析、切分Stage并调度Task到Executor执行，包含DAGScheduler等重要对象。

* num_executors
* executor_memory
* executor_cores

代表executor的数量，每一个executor需要的核心数量，每个executor占用的内存数量

设置这些参数的时候，首先需要考虑整体内存和整体cpu核心数量不要超过整个集群的数量

而且，并不是数量越多越好，这个调优的时候真是一把辛酸一把泪啊

executor 是运行在一个work node上的进程，每个executor拥有固定个数的cores和固定个数的memory

一个work node运行一个或多个executor

executor core 控制executor中task的并发数量， —executor-cores 5 表示每个executor最多同时执行5个task，大概估计每个executor中最多并行多少个task就能够占满带宽，这是需要设置的executor core数量

executor 执行时配置过大的memory会导致过长的GC延时，64G为申请上限


* block_interval

块大小，如果块大，task数量少，一个core处理一个task，一个task就是一个block，如果在相应的时间内处理不过来呢？ 就应该稍微调小

一般默认的200ms会比较好，有时候任务太小，就需要增大


* receive_max_rate

当sprak streaming处理不过来的时候，需要限制接收速度，不然延迟会很多

* num_input_dstreams

这个应该设置成分区的数量，kafka只允许一个线程去消费一个分区的数据，多了也没用

`Dstream`是一组连续的RDD序列，DStream是一个时间上连续接收数据但是接受到的数据按照指定的时间（batchInterval）间隔切片，每个batchInterval都会构造一个RDD，因此，Spark Streaming实质上是根据batchInterval切分出来的RDD串，DStream中的每个RDD的数据是一个时间窗口的累计。

* intervalBatch
* windowDuration
* slideDruation

windowDuration表示的是对过去的一个windowDuration时间间隔的数据进行统计计算， windowDuration是intervalBatch的整数倍，也就是说，假如windowDuration=n*intervalBatch， 那么window操作就是对过去的n个RDD进行统计计算

Spark Streaming也提供了窗口计算(window computations)的功能，允许我们每隔一段时间(sliding duration)对过去一个时间段内(window duration)的数据进行转换操作(tranformation).

slideDruation控制着窗口计算的频度，windowDuration控制着窗口计算的时间跨度。slideDruation和windowDuration都必须是batchInterval的整数倍。假想如下一种场景：

windowDuration=3*batchInterval，

slideDuration=10*batchInterval,

表示的含义是每个10个时间间隔对之前的3个RDD进行统计计算，也意味着有7个RDD没在window窗口的统计范围内。slideDuration的默认值是batchInterval


* GC
* spark.sql.shuffle.partitions
* spark.shuffle.consolidateFiles
* spark.shuffle.io.numConnectionsPerPeer

需要详细的阅读下spark的配置文档，根据处理速度来配置


__整体而言，spark streaming的调优是一个比较蛋疼的过程，但是当深入了解每一个参数之后，就能比较得心应手的调节整个程序了。调试过程用文字很难记录下来，明白每一个参数是干什么，以及参数与参数之间是如何关联的，能更好的、更快的调试出比较理想的结果。__


由于项目性质，具体的测试语句就不贴出来了。我大概用了8台机器的资源，对于速度较快的语句，稳定处理速度能达到700+ M/s，对于比较慢的查询语句，同样的资源，稳定的处理速度也能达到 100+ M/s速度

## 项目总结

1. 整个项目核心代码`160`行，但配置文件一大堆，包括数据预处理的脚本、集群之间拷贝的脚本、如何快速添加数据、快速创建分区、快速检查数据、跨节点拷贝、跨节点收集结果等，比实际写代码的时间要长很多
2. 第一次接触30台机器的集群，当然，最后说这个需要应用到1000+台机器的集群，部署和维护就是一个大问题
3. 第一次接触spark 项目，第一次写scala代码，很多特性其实都不是很了解，很大部分只能参照文档来写，没什么经验可言。可能几个月后，细致的了解spark、kafka、flume、scala之后，能够让整个程序得到一个质的进步。但时间有限，做到这个地步就需要交付了，这也是无能为力的地方。
4. 整个开发和调试过程中没有网，其实也是挺蛋疼的，手机流量哗哗哗的没了，而且，想想也是醉了，用手机google，看个代码还得翻好久，也算克服了很多困难吧
5. 整体而言，对于大数据，对于spark，也算是一个入门吧。我知道上面的测试和总结都不太完善，有些词语的表述也不是很专业。但我相信这是一个好的开始。加油吧！












	