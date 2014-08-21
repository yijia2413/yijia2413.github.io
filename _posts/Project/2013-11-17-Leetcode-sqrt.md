---
layout: post
title: Leetcode-sqrt(x)
description: 利用二分搜索求解题目，是简单的做法。但是还有更简单的哦～
category: 代码
tags: Leetcode
---
![img](http://media-cache-ak0.pinimg.com/736x/5c/49/37/5c4937dc8b6b615d080b8727990d6555.jpg)
##题目描述
<ul>
<li>Implement int sqrt(int x).</li>
<li>Compute and return the square root of x.</li>
</ul>

##代码

最早想到的当然是二分法了……直接上代码……

	 #include <iostream>
	 #include <cstdio>

	 using namespace std;

	 int sqrt(int x)
	 {
		if(x < 1)
			return 0;
		if(x == 1)
			return 1;
		int start = 1;
		int end = x;
		int mid;
		while(start <= end)
		{
			mid = (start + end) / 2;
			if(x / mid == mid)
				return mid;
			if(mid < x / mid)
				start = mid + 1;
			else
			end = mid – 1;
		}
		return (start + end) / 2;
	 }
	 int main()
	 {
		int x;

		#ifndef judge
		freopen("in2.in","r",stdin);
		freopen("std2.out","w",stdout);
		#endif

		while(cin>>x)
		{
			cout<<sqrt(x)<<endl;
		}

		#ifndef judge
		fclose(stdin);
		fclose(stdout);
		#endif

		return 0;
	 }
 
好像还有更简单的办法,`end`直接取`x/2+1`即可，因为一个数的平方根不会比一半大……

##代码二 
	 int sqrt(int x) {
	    long long i = 0;
	    long long j = x / 2 + 1;
	    while (i <= j)
	    {
		long long mid = (i + j) / 2;
		long long sq = mid * mid;
		if (sq == x) return mid;
		else if (sq < x) i = mid + 1;
		else j = mid – 1;
	    }
	    return j;
	 }
	 

 
##牛顿迭代法

   为了方便理解，就先以本题为例：

   计算x2 = n的解，令`f(x)=x2-n`，相当于求解f(x)=0的解，如左图所示。

   首先取x0，如果x0不是解，做一个经过`(x0,f(x0))`这个点的切线，与x轴的交点为x1。

   同样的道理，如果x1不是解，做一个经过`(x1,f(x1))`这个点的切线，与x轴的交点为x2。

   以此类推。

   以这样的方式得到的xi会无限趋近于f(x)=0的解。

   判断xi是否是f(x)=0的解有两种方法：

   一是直接计算f(xi)的值判断是否为0，二是判断前后两个解xi和xi-1是否无限接近。

 

经过(xi, f(xi))这个点的切线方程为`f(x) = f(xi) + f’(xi)(x – xi)`，其中f'(x)为f(x)的导数，本题中为2x。令切线方程等于0，即可求出`xi+1=xi - f(xi) / f'(xi)`。

继续化简，`xi+1=xi - (xi2 - n) / (2xi) = xi - xi / 2 + n / (2xi) = xi / 2 + n / 2xi = (xi + n/xi) / 2`。


有了迭代公式，程序就好写了。关于牛顿迭代法，可以参考`wikipedia`以及百度百科。

	int sqrt(int x) {
	    if (x == 0) return 0;
	    double last = 0;
	    double res = 1;
	    while (res != last)
	    {
		last = res;
		res = (res + x / res) / 2;
	    }
	    return int(res);
	}
	 
 
同样，`double`也适用



