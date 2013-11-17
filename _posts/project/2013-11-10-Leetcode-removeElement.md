---
layout: post
title: Leetcode-Remove Duplicates from Sorted Array 
description: http://oj.leetcode.com/problems/remove-duplicates-from-sorted-array/
category: project
---
###题目描述
Given an array and a value, remove all instances of that value in place and return the new length.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

###AC代码
		class Solution {
		public:
		    int removeElement(int A[], int n, int elem) {
			// IMPORTANT: Please reset any member data you declared, as
			// the same Solution instance will be reused for each test case.
			int x = 0;
			for(int i = 0; i < n; i++)
			{
			    if(A[i] != elem)
				A[x++] = A[i];
			}
			return x;
		    }
		    
		};
