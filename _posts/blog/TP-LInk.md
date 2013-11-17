---
layout: post
title: TP-link面试
description: 很简单的题目啦，大家不要见笑～也记录一下。
category: blog
---
#####1.基本题目

	char str[] = "string";  //7
	    int num = 0;       //4
	    char *pstr = str;  //4
	    void *p = NULL;    //4

#####2.git与svn的差别
<ul>
	<li>Git最大的优势在于两点：易于本地增加分支和分布式的特性</li>
	<li>GIT是分布式的，SVN不是</li>
	<li>GIT把内容按元数据方式存储，而SVN是按文件</li>
	<li>GIT分支和SVN的分支不同：</li>
	<li>GIT没有一个全局的版本号，而SVN有</li>
	<li>GIT的内容完整性要优于SVN</li>
</ul>

#####3.awk，sed的用法

awk是一个强大的文本分析工具，相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时，显得尤为强大。简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。
[网上找到一个](http://www.cnblogs.com/ggjucheng/archive/2013/01/13/2858470.html/)

sed 是一种在线编辑器，它一次处理一行内容。处理时，把当前处理的行存储在临时缓冲区中，称为“模式空间”（pattern space），接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有 改变，除非你使用重定向存储输出。Sed主要用来自动编辑一个或多个文件；简化对文件的反复操作；编写转换程序等。
[点击这里](http://www.cnblogs.com/shineshqw/articles/1978122.html/)

#####4.单链表的反转
