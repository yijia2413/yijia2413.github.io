---
layout: post
title: Leetcode-Merge Sorted Array 
description: http://oj.leetcode.com/problems/merge-sorted-array/
category: 代码
tags: Leetcode
---

###题目描述
Given two sorted integer arrays A and B, merge B into A as one sorted array.

Note:

You may assume that A has enough space to hold additional elements from B. The number of elements initialized in A and B are m and n respectively.

###代码
		class Solution {
		public:
		    void merge(int A[], int m, int B[], int n) {
			// IMPORTANT: Please reset any member data you declared, as
			// the same Solution instance will be reused for each test case.
			int cur = m - 1;
		    	for(int i = 0; i < n; i++)
		    	{
		    		while(cur >= 0 && A[cur] >= B[n-1-i])
		    			A[cur+n-i] = A[cur--];
		    		A[cur+n-i] = B[n-1-i];
		    	}
		    }
		};

