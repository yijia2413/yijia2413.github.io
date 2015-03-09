---
layout: post
title: Leetcode-Decode Ways 
description: http://oj.leetcode.com/problems/decode-ways/
category: 代码
tags: Leetcode
---
恩哼，看完图片记得看正文啊～
![images](http://media-cache-ak0.pinimg.com/736x/03/51/f8/0351f885936b7d1b71e36a9b22d24336.jpg)
## 题目描述

A message containing letters from `A-Z` is being encoded to numbers using the following mapping:

*   `'A' -> 1`
*   `'B' -> 2`
*   ...
*   `'Z' -> 26`

Given an encoded message containing digits, determine the total number of ways to decode it.

For example,

Given encoded message `"12"`, it could be decoded as `"AB"` (1 2) or `"L"` (12).

The number of ways decoding `"12"` is `2`.


##思路
每次对于当前的字符判断是否属于`1-9`（0肯定不行，因为0不在1-26中），如果属于，那么当前的字符可以被decode，并且和`f[n-1]`组合，`f[n] += f[n-1]`.

然后对于当前字符和前一个字符组成的字符串判断是否属于10-26，如果属于，那么这两个字符可以被decode，并且和`f[n-2]`组合，`f[n] += f[n-2]`

[参考1](http://blog.csdn.net/xshalk/article/details/8186146),[参考2](http://blog.csdn.net/nandawys/article/details/9260107).


## AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    #include <vector>
    
    using namespace std;
    
    int numDecodings(string s)
    {
        	if(s == "")
        		return 0;
        	vector<int> f;
        	f.resize(s.length());
        	int i = 0;
        	for(; i < s.length(); i++)
        	{
        		f[i] = 0;
        		if(i >= 1)
        		{
        			string tmp(s, i-1, 2);
        			if("10" <= tmp && tmp <= "26")
        			{
        				if(i > 1)
        					f[i] += f[i - 2];
        				else
        					f[i] += 1;
        			}
        
        			if('1' <= s[i] && s[i] <= '9')
        				f[i] += f[i-1];
        		}
        		else
        		{
        			if('1' <= s[i] && s[i] <= '9')
        				f[i] = 1;
        		}
        	}
        	return f[i-1];
    }
    
    int main()
    {
        	string s;
        
        #ifndef ok
        	freopen("in1.in", "r", stdin);
        	freopen("std1.out","w",stdout);
        #endif
        
        	while(cin>>s)
        	{
        		cout<<numDecodings(s)<<endl;
        	}
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    