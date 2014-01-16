---
layout: post
title: Leetcode-ZigZag Conversion
description: http://oj.leetcode.com/problems/zigzag-conversion/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/236x/67/98/6c/67986cc162a48ffa1ab4649ed1c2a994.jpg)
## 题目描述
The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N

A P L S I I G

Y   I   R

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

`string convert(string text, int nRows);`

`convert("PAYPALISHIRING", 3)` should return `"PAHNAPLSIIGYIR"`.

## AC代码

    #include <iostream>
    #include <cstring>
    #include <string.h>
    #include <cstdio>
    #include <cstdlib>
    #include <vector>
    
    using namespace std;
    
    string convert(string s, int nRows)
    {
        	if(nRows <= 1 || s.length() < 2)
        		return s;
        	string *arr = new string[nRows];
        	int nCount = 2 * (nRows - 1);
        
        	for(int i = 0; i < s.length(); ++i)
        		arr[nRows - 1 - abs(nRows - 1 - (i % nCount))].push_back(s[i]);
        	string result;
        
        	for(int i = 0; i < nRows; ++i)
        		result.append(arr[i]);
        
        	return result;
    }
    
    int main()
    {
        	string s;
        	int nRows;
        	while(cin>>s>>nRows)
        		cout<<convert(s, nRows)<<endl;
        	return 0;
    }
    