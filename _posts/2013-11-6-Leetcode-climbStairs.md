---
layout: post
title: Leetcode-Climbing Stairs 
description: http://oj.leetcode.com/problems/climbing-stairs/
category: 代码
tags: Leetcode
---
## 题目描述
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## 代码
```cpp
class Solution {
	public:
		int climbStairs(int n) {
		// IMPORTANT: Please reset any member data you declared, as
		// the same Solution instance will be reused for each test case.
		if(n <= 2)
			return n;
		int step[n];
		step[0] = 1;
		step[1] = 2;
		for(int i = 2; i < n; i++)
		{
			step[i] = step[i-1] + step[i-2];
		}
		return step[n-1];
		}
	};
```