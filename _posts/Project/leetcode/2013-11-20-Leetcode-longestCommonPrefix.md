---
layout: post
title: Leetcode-Longest Common Prefix 
description: http://oj.leetcode.com/problems/longest-common-prefix/
category: Project
tags: Leetcode
---
## 题目描述
*   Write a function to find the longest common prefix string amongst an array of strings.

## 思路
*   求所有串的最长公共前缀,枚举每个位置.danteng的是不知道如何设计输入和输出，之后一定补上。

## AC代码
<code>here</code>

    string longestCommonPrefix(vector<string> &strs)
    {
        if(strs.size()<=0)  return "";
        int min_len=strs[0].size();
        for(int i=1;i<strs.size();i++)
        {
            min_len=min(min_len,(int)strs[i].size());
        }
                //min_len已求出
        for(int i=0;i<min_len;i++)
        {
                    //
            bool flag=true;
            for(int j=1;j<strs.size();j++)
            {
                if(strs[j][i]!=strs[0][i])
                {
                    flag=false;
                    break;
                }
            }
            if(!flag)
            {
                return strs[0].substr(0,i);
                }
            }
        return strs[0].substr(0,min_len);
    }
