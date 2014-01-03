---
layout: post
title: Leetcode-Valid Parentheses
description: http://oj.leetcode.com/problems/valid-parentheses/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/a8/9d/57/a89d57dbdc09db246bca21d13b8f5d11.jpg)
## 题目描述

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

## AC代码

    #include <iostream>
    #include <stack>
    #include <cstdio>
    #include <string>
    #include <cstring>
    
    using namespace std;
    
    bool isValid(string s)
    {
        	stack<char> lefts;
        	for(int i = 0; i < s.size(); ++i)
        	{
        		char c = s[i];
        		if(c == '(' || c == '[' || c == '{')
        			lefts.push(c);
        		else
        		{
        			if(lefts.size() == 0)
        				return false;
        			char top = lefts.top();
        			if(c == ')')
        			{
        				if(top != '(')
        					return false;
        			}
        			else if(c == ']')
        			{
        				if(top != '[')
        					return false;
        			}
        			else if(c == '}')
        			{
        				if(top != '{')
        					return false;
        			}
        			lefts.pop();
        		}
        	}
        	return lefts.size() == 0;
    }
    
    int main()
    {
        	string s;
        
        #ifndef ok
        	freopen("in3.in", "r", stdin);
        	freopen("std3.out","w", stdout);
        #endif
        
        	while(cin>>s)
        	{
        		if(isValid(s))
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
    