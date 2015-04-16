---
layout: post
title: 彻底理解'\r'和'\n'
category: 代码
tags: 
  - 回车换行
imagefeature: null
mathjax: false
chart: false
comments: true
featured: false
published: true
---

##\r
*	`return`的第一个字母，回到当前行的最左边。

可参考如下程序：

	#include<stdio.h>
	int main()
	{
		printf("helloworld\n");
		printf("helloworld1\r");
		getchar();
		return 0;
	}
	
看截图可知：

![img](/images/post/return/return.png)

光标回到了`第一行`

##\n
*	`newline`的第一个字母，向下移动一行，并不移动左右

参考如下的程序：

	#include<stdio.h>
	int main()
	{
		printf("helloworld\r");
		printf("world2\n"); 
		//你会发现，由于第一个print后，跳到最左边，第二个print中得“world2”将“hellow”覆盖了！
		getchar();
		return 0;
	}
	
看截图如下：

![img](/images/post/return/newline.png)

会发现，由于第一个print后，跳到最左边，第二个print中得“world2”将“hellow”`覆盖`了！

而且，光标确实换行了！

此时，`\n`表示`回车+换行`<return:回到行首，newline:切换了一行>

>>以上均在centos环境下测试

========

>>以下是在mac环境下测试

在mac下做了一个小测试，得到的结果与centos下的一致，这让我有点怀疑下面的观点：

*	Linux中\n表示回车+换行(上面已验证)
*	Windows中\r\n表示回车+换行(win下可直接使用\n来匹配换行符，但是`\r\n`与`\n\r`是有明显区别的)
*	Mac中\r表示回车+换行（我的结果是与linux下一样）

##历史及其它
`Unix` 系统里，每行结尾只有“<换行>”，即“\n”；Windows系统里面，每行结尾是“<回车><换行>”，即“ \r\n”；

`Mac`系统里，每行结尾是“<回车>”。一个直接后果是，Unix/Mac系统下的文件在Windows里打开的话，所有文字会变成一行；

`Windows`里的文件在Unix/Mac下打开的话，在每行的结尾可能会多出一个^M符号。

在计算机还没有出现之 前，有一种叫做电传打字机（Teletype Model 33，Linux/Unix下的tty概念也来自于此）的玩意，每秒钟可以打10个字符。但是它有一个问题，就是打完一行换行的时候，要用去0.2秒，正 好可以打两个字符。要是在这0.2秒里面，又有新的字符传过来，那么这个字符将丢失。

于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做“回车(return)”，告诉打字机把打印头定位在左边界；另一个叫做“换行(newline)”，告诉打字机把纸向下移一行。这就是“换行”和“回车”的来历


'\r'是回车，'\n'是换行，前者使光标到行首，后者使光标下移一格，通常敲一个回车键，即是回车，又是换行（\r\n）。Unix中每行结尾只有“<换行>”，即“\n”；Windows中每行结尾是“<换行><回车>”，即“\n\r”；Mac中每行结尾是“<回车>”。

##摘抄
*	\n  LF或ASCII中的0x0A(10)
*	\r  CR或ASCII中的0x0D(13)
*	\n 软回车
*	\r 软空格


>>the end....