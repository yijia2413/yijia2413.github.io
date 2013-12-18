---
layout: post
title: Leetcode-Search Insert Position 
description: http://oj.leetcode.com/problems/search-insert-position/
category: project
---
###题目描述
Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

Here are few examples.

[1,3,5,6], 5 → 2

[1,3,5,6], 2 → 1

[1,3,5,6], 7 → 4

[1,3,5,6], 0 → 0

###AC代码
		class Solution {
		public:
		    int searchInsert(int A[], int n, int target) {
			// IMPORTANT: Please reset any member data you declared, as
			// the same Solution instance will be reused for each test case.
		     for(int i = 0; i < n; i++)
		     {
			  if(target <= A[i])
			    return i;
		     }
		    return n;
		    }
		};
