---
layout: post
title: Leetcode-Longest Valid Parentheses 
description: http://oj.leetcode.com/problems/longest-valid-parentheses/
category: 代码
tags: Leetcode
---
## 题目描述

Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

For `"(()"`, the longest valid parentheses substring is `"()"`, which has `length = 2`.

Another example is `")()())"`, where the longest valid parentheses substring is `"()()"`, which has `length = 4`.

## AC代码

    #include <iostream>
    #include <stack>
    #include <cstdio>
    
    using namespace std;
    
    int longestValidParentheses(string s)
    {
        	int maxlen = 0, last = -1; //last )'s position
        	stack<int> lefts;
        	for(int i = 0; i < s.size(); i++)
        	{
        		if(s[i] == '(')
        			lefts.push(i);
        		else
        		{
        			if(lefts.empty())
        				last = i;
        				//return 0;
        			else
        			{
        				lefts.pop();
        				if(lefts.empty())
        					maxlen = max(maxlen, i - last);
        				else
        					maxlen = max(maxlen, i- lefts.top());
        			}
        		}
        	}
        	return maxlen;
    }
    
    int main()
    {
        	string s;
        
        #ifndef ok
        	freopen("in4.in", "r", stdin);
        	freopen("std4.out", "w", stdout);
        #endif
        
        	while(cin>>s)
        		cout<<longestValidParentheses(s)<<endl;
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    