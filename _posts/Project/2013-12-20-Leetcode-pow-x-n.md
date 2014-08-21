---
layout: post
title: Leetcode-Pow(x, n)
description: http://oj.leetcode.com/problems/powx-n/
category: 代码
tags: Leetcode
---
![images](http://media-cache-cd0.pinimg.com/736x/56/50/16/5650160a965d88219ad9833eda67dd37.jpg)
## 题目描述

Implement pow(x, n).

## AC代码
    #include <iostream>
    #include <cstdio>
    
    using namespace std;
    
    double pow(double x, int n)
    {
        	if(n == 0)
        		return 1;
        	double half = pow(x, n / 2);
        	if(n % 2 == 0)
        		return half * half;
        	else if(n > 0)
        		return half * half * x;
        	else
        		return half * half / x;
    }
    
    int main()
    {
        	double x;
        	int n;
        
        #ifndef ok
        	freopen("in1.in", "r", stdin);
        	freopen("std1.out", "w", stdout);
        #endif
        
        	while(cin>>x>>n)
        		printf("%.5f\n", pow(x,n));
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    