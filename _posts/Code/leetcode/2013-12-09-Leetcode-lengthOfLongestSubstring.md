---
layout: post
title: Leetcode-Longest Substring
description: http://oj.leetcode.com/problems/longest-substring-without-repeating-characters/
category: project
---
![images](http://media-cache-cd0.pinimg.com/736x/a9/fe/80/a9fe8055ad1f51763dfac85ed4241b64.jpg)
## 题目描述

Given a string, find the length of the longest substring without repeating characters. For example, the longest substring without repeating letters for `"abcabcbb"` is `"abc"`, which the length is `3`. For `"bbbbb"` the longest substring is `"b"`, with the length of `1`.

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <cstring>
    #include <string>
    
    using namespace std;
    
    int lengthOfLongestSubstring(string s)
    {
        	int max = 0;
        	int index = -1;  //子串开始前的前一个位置，initial as -1
        	int local[256];
        	memset(local,-1,sizeof(int)*256);
        	for(int i = 0; i < s.size(); i++)
        	{
        		if(local[s[i]] > index)
        		{
        			index = local[s[i]];
        		}
        
        		if(i - index > max)
        		{
        			max = i - index;
        		}
        
        		local[s[i]] = i;
        	}
        	return max;
    }
    
    int main()
    {
        	string s;
        
        #ifndef ok
        	freopen("in1.in", "r", stdin);
        	freopen("std1.out","w",stdout);
        #endif
        
        	while(cin>>s)
        		cout<<lengthOfLongestSubstring(s)<<endl;
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    