---
layout: post
title: Leetcode-Regular Expression Matching 
description: http://oj.leetcode.com/problems/regular-expression-matching/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/41/ce/85/41ce858bbb5481f89e2c0bad1dbad4c3.jpg)
## 题目描述

Implement regular expression matching with support for '.' and '*'.

*   '.' Matches any single character.
*   '*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

The function prototype should be:`bool isMatch(const char *s, const char *p)`

Some examples:

    isMatch("aa","a") → false
    isMatch("aa","aa") → true
    isMatch("aaa","aa") → false
    isMatch("aa", "a*") → true
    isMatch("aa", ".*") → true
    isMatch("ab", ".*") → true
    isMatch("aab", "c*a*b") → true

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    
    using namespace std;
    
    const int N = 10000;
    
    bool isMatch(const char *s, const char *p)
    {
        	if(*p == '\0')
        		return *s == '\0';
        	if(*(p+1) != '*')
        	{
        		if(*p == *s || (*p == '.' && *s != '\0'))
        			return isMatch(s+1, p+1);
        		else
        			return false;
        	}
        	else
        	{
        		while(*p == *s || (*p == '.' && *s != '\0'))
        		{
        			if(isMatch(s, p+2))
        				return true;
        			s++;
        		}
        		return isMatch(s, p+2);
        	}
    }
    
    int main()
    {
        	char s[N], p[N];
        
        #ifndef ok
        	freopen("in3.in", "r", stdin);
        	freopen("std3.out", "w", stdout);
        #endif
        
        	while(cin>>s>>p)
        	{
        		if(isMatch(s, p))
        			cout<<"true"<<endl;
        		else
        			cout<<"false"<<endl;
        	}
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    