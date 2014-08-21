---
layout: post
title: Leetcode-Unique Paths 
description: http://oj.leetcode.com/problems/unique-paths/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/48/28/8b/48288b123e08fe4f7969f569131d50b4.jpg)
## 题目描述
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

__Note:__ m and n will be at most 100.

## AC代码
    #include <iostream>
    #include <cstdio>
    #include <vector>
    
    using namespace std;
    
    int uniquePaths(int m, int n)
    {
        	vector<int> f(n, 0);
        	f[0] = 1;
        	for(int i = 0; i < m; i++)
        	{
        		for(int j = 1; j < n; j++)
        		{
        			//初始状体f[i][j], (1,1)->(i,j),f[i][j] = f[i-1][j] + f[i][j-1]
        			f[j] = f[j - 1] + f[j];
        		}
        	}
        	return f[n - 1];
    }
    
    int main()
    {
        	int m, n;
        
        #ifndef ok
        	freopen("in3.in", "r", stdin);
        	freopen("std3.out", "w", stdout);
        #endif
        
        	while(cin>>m>>n)
        		cout<<uniquePaths(m,n)<<endl;
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    