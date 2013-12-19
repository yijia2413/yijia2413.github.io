---
layout: post
title: Leetcode-Divide Two Integers
description: http://oj.leetcode.com/problems/divide-two-integers/
category: Project
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/ba/2b/80/ba2b8086d38b4eb02b15dca8cfff03ae.jpg)
## 题目描述

Divide two integers without using multiplication, division and mod operator.

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <cstdlib>
    #include <stdlib.h>
    #include <limits.h>
    
    using namespace std;
    
    int divide(int dividend, int divisor)
    {
        	if(divisor == 0)
        		return INT_MAX;
        
        	double a = dividend;
        	double b = divisor;
        	long long absDividend;
        	long long  absDivisor;
        	//这里很蛋疼的就是用abs的时候，gcc，g++编译不通过，我去……
        	if(a >= 0)
        		absDividend = a;
        	else
        		absDividend = -a;
        	if(b >= 0)
        		absDivisor = b;
        	else
        		absDivisor = -b;
        
        	long long result = 0;
        	long long maxExpOf2=absDivisor;
        	long long curResult=1;
        	while(absDividend>=absDivisor)
        	{
        		while(absDividend>=(maxExpOf2<<1))
        		{
        			maxExpOf2 <<= 1;
        			curResult <<= 1;
        		}
        
        		absDividend-=maxExpOf2;
        		result+=curResult;
        		maxExpOf2=absDivisor;
        		curResult=1;
        	}
        
        	if((dividend>0&&divisor>0)||(dividend<0&&divisor<0))
        		return result;
        	else
        		return -result;
    }
    
    int main()
    {
        	int dividend, divisor;
        
        #ifndef ok
        	freopen("in1.in","r",stdin);
        	freopen("std1.out","w",stdout);
        #endif
        
        	while(cin>>dividend>>divisor)
        	{
        		cout<<divide(dividend, divisor)<<endl;
        	}
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    