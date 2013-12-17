---
date: 2013-11-28 16:54:12+00:00
layout: post
title: Leetcode-addBinary
thread: 201
categories: Leetcode
tags: Leetcode
---
## 题目描述
Given two binary strings, return their sum (also a binary string).

For example,

*   a = `"11"`
*   b = `"1"`
*   Return `"100".`

## 思路
将位数补齐，类似于10进制的加法，按位进行加法运算。难点是进行进位的时候处理～

切不可转换成10进制计算，因为当数很大的时候肯定会溢出的。`每次处理输入输出的时候都会遇到引号转义的问题。`

[好方法介绍](http://fisherlei.blogspot.com/2013/01/leetcode-add-binary.html)

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    #include <cstdlib>
    #include <cstring>
    
    
    using namespace std;
    
    string addBinary(string a, string b)
    {
        	string c;
        	int flag=0;
        	int lena = a.size();
        	int lenb = b.size();
        	int len = abs(lena-lenb);
        	string append(len,'0');
        	if(lena>lenb)
        	{
        		b = append + b;
        		c.resize(lena,'0');
        	}
        	else
        	{
        		a = append + a;
        		c.resize(lenb,'0');
        	}
        	for(int j=c.size()-1;j>=0;j--)
        	{
        		int current = (a[j]-'0') ^(b[j]-'0') ^flag;
        		if((a[j]-'0') +(b[j]-'0') +flag >1)
        			flag = 1;
        		else 
        			flag = 0;
        		c[j] = current+'0';
        	}
        	if(flag == 1)
        	c = '1'+ c;
        			
        	return c;
    }
    
    int main()
    {
        	string a, b;
        #ifndef add
        	freopen("in1.in","r",stdin);
        	freopen("std1.out","w",stdout);
        #endif
        	while(cin>>a>>b)
        	{
        		cout<<addBinary(a,b)<<endl;
        	}
        #ifndef add
        	fclose(stdin);
        	fclose(stdout);
        #endif
        	return 0;
    
    }
    