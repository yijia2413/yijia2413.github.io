---
layout: post
title: Leetcode-First Missing Positive
description: http://oj.leetcode.com/problems/first-missing-positive/
category: Project
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/fe/f1/52/fef1527eca10c51614588e70d98f79dd.jpg)
## 题目描述

Given an unsorted integer array, find the first missing positive integer.

*   For example,
*   Given `[1,2,0]` return `3`,
*   and `[3,4,-1,1]` return `2`.

Your algorithm should run in `O(n)` time and uses constant space.


##思路
假设数组长度是n。那么第一个missing的正数肯定不会超过n。

如果把所有正数都放在正确的位置上，`数字1（如果有的话）在A[0]`, `数字2（如果有的话）在A[1]`，`数字i + 1在A[i]`，那么我们只要扫描A，遇到第一个A[i]不等于i+1的，就知道这个missing的正数（i+1）了。

具体方法是，扫描数组A，如果当前的正数A[i]不在其该在的位置，那和A[A[i]-1]交换（这样交换过后A[i]-1的正数就in postion了。继续，直到i位置上的正数是正确的。然后继续下一个交换。

这样总能把所有正数in position。

## AC代码

    #include <iostream>
    #include <cstdio>
    
    using namespace std;
    
    int firstMissingPositive(int A[], int n)
    {
        	for(int i = 0; i < n; i++)
        	{
        		int cur = A[i];
        		while(cur >= 1 && cur <= n && A[cur-1] != cur)
        		{
        			int temp = A[cur -1];
        			A[cur - 1] = cur;
        			cur = temp;
        		}
        	}
        
        	int j;
        	for(j = 0; j < n; j++)
        	{
        		if(A[j] != j + 1)
        			break;
        	}
        	return j + 1;
        	
    }
    
    int main()
    {
        	int n;
        	cin>>n;
        	int A[n];
        	for(int i = 0; i < n; i++)
        		cin>>A[i];
        	cout<<firstMissingPositive(A,n)<<endl;
        	return 0;
    }
    