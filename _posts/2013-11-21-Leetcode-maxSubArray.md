---
layout: post
title: Leetcode-Maximum Subarray  
description: http://oj.leetcode.com/problems/maximum-subarray/
category: 代码
tags: Leetcode
---
## 题目描述
*   Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
*   For example, given the array `[−2,1,−3,4,−1,2,1,−5,4]`,the contiguous subarray `[4,−1,2,1]` has the largest `sum = 6`.
*   click to show more practice.
*   More practice:
>If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

## 思路
*   扫描就行，记录下当前最大值与加上下一个之后的大小关系即可。
*   话说，我还真的很想知道后台的判题程序是怎么跑的。研究下哈~

## AC代码

    #include <iostream>
    #include <cstdio>
    
    using namespace std;
    
    int maxSubArray(int A[], int n)
    {
        	if(n == 0)
        		return 0;
        	int curSum = A[0];
        	int maxSum = curSum;
        	for(int i = 1; i < n; ++i)
        	{
        		if(curSum + A[i] > A[i])
        			curSum = curSum + A[i];
        		else
        			curSum = A[i];
        		maxSum = (maxSum > curSum ? maxSum : curSum);
        	}
        	return maxSum;
    }
    
    int main()
    {
        	int n;
        	cin>>n;
        	int A[n];
        	for(int i = 0; i < n; i++)
        		cin>>A[i];
        	cout<<maxSubArray(A,n)<<endl;
        	return 0;
    }
    
