---
layout: post
title: Leetcode-Remove Duplicates II 
description: http://oj.leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
category: 代码
tags: Leetcode
---
![img](http://media-cache-ak0.pinimg.com/236x/cb/33/f2/cb33f21c71d3198990878e9326569d0f.jpg)
## 题目描述
*   Follow up for "Remove Duplicates":
*   What if duplicates are allowed at most twice?
*   For example,
*   Given sorted array `A = [1,1,1,2,2,3]`,
*   Your function should return `length = 5`, and `A` is now `[1,1,2,2,3]`.

## 思路
*   跟这个题目大同小异。[Remove Duplicates from Sorted Array](http://oj.leetcode.com/problems/remove-duplicates-from-sorted-array/)
*   判断`A[i] == A[num - 1] && A[i] == A[num -2])`就不难了。

## AC代码

    #include <iostream>
    #include <cstdio>
    
    using namespace std;
    
    int removeDuplicates(int A[],int n)
    {
        	if(n <= 2)
        		return n;
        	int num = 2;
        	for(int i = num; i < n; i++)
        	{
        		if(!(A[i] == A[num - 1] && A[i] == A[num -2]))
        		{
        			A[num] = A[i];
        			num++;
        		}
        	}
        	return num;
    }
    
    int main()
    {
        	int n;
        	cin>>n;
        	int A[n];
        	for(int i = 0; i < n; i++)
        		cin>>A[i];
        	cout<<removeDuplicates(A,n)<<endl;
        	return 0;
    }