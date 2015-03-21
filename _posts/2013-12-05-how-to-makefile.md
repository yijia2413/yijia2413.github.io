---
layout: post
title: 简单学习makefile
category: 博客
tags: 语法
description: 
---
##什么是makefile
不拉不啦，这个明白很重要，重要性啥的就不写了，简单记录如何操作～

对了，在 Makefile 中的命令,必须要以Tab键开始

##makefile自动推导写法

    objects = client.o server.o isk.h
    edit : $(objects)
        cc -o edit $(objects)
    client.o :isk.h
    server.o :
    .PHONY : clean
    clean :
        rm edit $(objects)
这种方法，也就是make的“隐晦规则”。上面文件内容中，“.PHONY”表示，clean是个伪目标文件。

##清空目标文件的规则
每个 Makefile 中都应该写一个清空目标文件(.o 和执行文件)的规则,这不仅便于重编译,也很利于保持文件的清洁。

一般的风格都是:

    clean:
        rm edit $(objects)
更为稳健的做法是:

    .PHONY : clean
    clean :
        -rm edit $(objects)
`.PHONY` 意思表示 clean 是一个“伪目标”,而在rm命令前面加了一个小减号的意思就是,也许某些文件出现问题,但不要管,继续做后面的事。当然,clean 的规则不要放在文件的开头,不然,这就会变成 make 的默认目标,相信谁也不愿意这样。不成文的规矩是——`clean 从来都是放在文件的最后`

##make 的工作方式
*   读入所有的 Makefile。
*   读入被 include 的其它 Makefile。
*   初始化文件中的变量。
*   推导隐晦规则,并分析所有规则。
*   为所有的目标文件创建依赖关系链。
*   根据依赖关系,决定哪些目标要重新生成。
*   执行生成命令。

在 Makefile 中,规则的顺序是很重要的,因为,Makefile 中只应该有一个最终目标,其它的目标都是被这个目标所连带出来的,所以一定要让 make 知道你的最终目标是什么。

##静态模式
看一个例子:

    objects = foo.o bar.o
    all: $(objects)
    $(objects): %.o: %.c
        $(CC) -c $(CFLAGS) $< -o $@

上面的例子中,指明了我们的目标从`$object` 中获取,“%.o”表明要所有以“.o”结尾的目标,也就是“foo.o bar.o”,也就是变量$object 集合的模式,而依赖模式“%.c”则取模式“%.o”的“%”,也就是“foo bar”,并为其加下“.c”的后缀,于是,我们的依赖目标就是“foo.c bar.c”。而命令中的“$<”和“$@”则是自动化变量,“$<”表示所有的依赖目标集(也就是“foo.c bar.c”),“$@”表示目标集(也就是“foo.o bar.o”)

##书写命令
1.@echo 正在编译 XXX 模块......

2.执行

    exec:
    cd /home/hchen; pwd
    

