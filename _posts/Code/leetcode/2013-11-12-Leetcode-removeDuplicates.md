---
layout: post
title: Leetcode-Remove Duplicates
description: http://oj.leetcode.com/problems/remove-duplicates-from-sorted-array/
category: project
---
###题目描述
Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this in place with constant memory.

For example,

Given input array `A = [1,1,2]`,

Your function should return `length = 2`, and A is now `[1,2]`.

###AC代码
		class Solution {
		public:
		    int removeDuplicates(int A[], int n) {
			// IMPORTANT: Please reset any member data you declared, as
			// the same Solution instance will be reused for each test case.
			if(n == 0)
			    return 0;
			int num = 1;
			for(int i = 1; i < n; i++)
			{
			    if(A[i] != A[i-1])
			    {
				A[num] = A[i];
				num++;
			    }
			}
			return num;
		    }
		};

