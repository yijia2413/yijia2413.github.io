---
layout: post
title: Leetcode-single Number
description: http://oj.leetcode.com/problems/single-number/
category: 代码
tags: Leetcode
---

###题目描述
Given an array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
###代码
		class Solution {
				public:
				    int singleNumber(int A[], int n) {
					// IMPORTANT: Please reset any member data you declared, as
					// the same Solution instance will be reused for each test case.
					if(A == NULL || n == 0)
					    return 0;
					int result = A[0];
					for(int i = 1; i < n; i++)
					    result = result ^ A[i];
					return result;
				    }
				};
