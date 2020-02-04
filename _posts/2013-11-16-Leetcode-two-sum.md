---
layout: post
title: Leetcode-Two Sum
description: http://oj.leetcode.com/problems/two-sum/
category: 代码
tags: Leetcode
---
## 题目描述

Given an array of integers, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution.

Input: `numbers={2, 7, 11, 15}`, `target=9`

Output: `index1=1`, `index2=2`

## AC代码
```cpp
class Solution {
public:
	vector<int> twoSum(vector<int> &numbers, int target)
		{
			int index1 = 0, index2 = 0;
			int len = numbers.size();
			vector<int> result(2, 0);
			for(int i = 0; i < len; i++)
			{
				for(int j = i + 1; j < len; j++)
				{
					if(numbers[i] + numbers[j] == target)
					{
						result[0] = i + 1;
						result[1] = j + 1;
					}
				}
			}
	
			return result;
		}
};
```
