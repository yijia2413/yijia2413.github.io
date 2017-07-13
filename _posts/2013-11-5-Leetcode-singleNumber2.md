---
layout: post
title: Leetcode-Single Number II 
description: http://oj.leetcode.com/problems/single-number-ii/
category: 代码
tags: Leetcode
---
## 题目描述
Given an array of integers, every element appears three times except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

## 代码
		class Solution {
				public:
				    int singleNumber(int A[], int n) {
					// IMPORTANT: Please reset any member data you declared, as
					// the same Solution instance will be reused for each test case.
				    int once = 0;//记录%3余1的bit
					int twice = 0;//记录%3余2的bit
					for(int i = 0; i < n; i++)
					{
						twice |= once & A[i];   //或运算
						once ^= A[i];
						int not_three = ~(once & twice);
						once = not_three & once;
						twice = not_three & twice;
					}
					return once;    
				    }
				};		
