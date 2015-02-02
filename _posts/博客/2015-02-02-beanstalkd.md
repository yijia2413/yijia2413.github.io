---
layout:     post
title:      初学beanstalkd
category: 博客
tags: 
description: beanstalkd
---
#基础
##概念
*	job：一个需要异步处理的任务，是Beanstalkd中的基本单元，需要放在一个tube中。
*	tube：一个有名的任务队列，用来存储统一类型的job，是producer和consumer操作的对象。
*	producer：Job的生产者，通过put命令来将一个job放到一个tube中。
*	consumer：Job的消费者，通过reserve/release/bury/delete命令来获取job或改变job的状态。

##生命周期
一个job有READY, RESERVED, DELAYED, BURIED四种状态。

当producer直接put一个job时，job就处于READY状态，等待consumer来处理，如果选择延迟put，job就先到DELAYED状态，等待时间过后才迁移到READY状态。consumer获取了当前READY的job后，该job的状态就迁移到RESERVED，这样其他的consumer就不能再操作该job。当consumer完成该job后，可以选择delete, release或者bury操作；delete之后，job从系统消亡，之后不能再获取；release操作可以重新把该job状态迁移回READY（也可以延迟该状态迁移操作），使其他的consumer可以继续获取和执行该job；有意思的是bury操作，可以把该job休眠，等到需要的时候，再将休眠的job kick回READY状态，也可以delete BURIED状态的job。正是有这些有趣的操作和状态，才可以基于此做出很多意思的应用，比如要实现一个循环队列，就可以将RESERVED状态的job休眠掉，等没有READY状态的job时再将BURIED状态的job一次性kick回READY状态。

![img](http://csrd.aliapp.com/wp-content/plugins/beanstalkd-job-lifetime.png)

##缺点
*	和 memcached 类似, Beanstalkd 依赖 libevent 的单线程事件分发机制, 不能有效利用多核 cpu 的性能。这一点可以通过单机部署多个实例克服。
*	Beanstalkd 没有提供主备同步 + 故障切换机制, 在应用中有成为单点的风险。实际应用中，可以用数据库为任务 (job) 提供持久化存储。

##安装和使用
[github地址](https://github.com/kr/beanstalkd)

[需要的库文件](https://github.com/kr/beanstalkd/wiki/client-libraries)

[C++](https://github.com/deepfryed/beanstalk-client)



