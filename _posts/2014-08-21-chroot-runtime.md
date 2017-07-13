---
layout:     post
title:      创建chroot环境
category: 博客
tags: 
description: 毕业了
---
# 创建chroot环境

首先看一段代码

	#include<iostream>
	#include<stdio.h>
	#include<unistd.h>
	#include<stdlib.h>
	
	using namespace std;
	const int SIZE = 512;
	
	int main()
	{
	//chroot之前这段代码是可以运行的
	//	printf("%d\n", execl("/bin/ls", "ls", (char*) NULL));
	
		char python_path[SIZE];
		sprintf(python_path, "/home/xxx/test/python/a.py");
		//execl("/usr/bin/python", "python",python_path, (char*) NULL);
		char root_path[SIZE];
		sprintf(root_path, "/home/xxx/test/python/");
		chroot(root_path);
		chdir("/");
	
	//	char str[SIZE];
	//	getcwd(str, 100);
		
	//	printf("current directory is :%s\n", str);
	//此处返回-1，也就是execl没有执行
		printf("%d\n", execl("/python", "python", "./a.py", (char*) NULL));
	
		return 0;
	}

为什么没有执行呢？

因为需要拷贝chroot之后的运行环境，如果此处要执行python，则需要找到所有的动态链接库。

# 动态链接库
首先，执行：
	
	ldd /usr/bin/python
出来的结果，拷贝到相应的目录。

然后，执行：

	strace python
得到带`open`的部分，同样拷贝。

如果需要重定向到文件，则执行：

	strace -o python.txt python

拷贝之后就可以再chroot环境中执行python了，注意拷贝一定要完整。

# 拷贝脚本

	#!/bin/bash
	
	CHROOT='/chroot'
	mkdir $CHROOT
	
	for i in $( ldd $* | grep -v dynamic | cut -d " " -f 3 | sed 's/://' | sort | uniq )
	  do
	    cp --parents $i $CHROOT
	  done
	
	# ARCH amd64
	if [ -f /lib64/ld-linux-x86-64.so.2 ]; then
	   cp --parents /lib64/ld-linux-x86-64.so.2 /$CHROOT
	fi
	
	# ARCH i386
	if [ -f  /lib/ld-linux.so.2 ]; then
	   cp --parents /lib/ld-linux.so.2 /$CHROOT
	fi
	
	echo "Chroot jail is ready. To access it execute: chroot $CHROOT"

执行之后，能自动拷贝相应文件的动态链接库到相应的chroot目录。

比如，执行：

	./chroot.sh /bin/ls 