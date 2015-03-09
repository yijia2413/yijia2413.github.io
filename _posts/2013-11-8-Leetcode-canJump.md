---
layout: post
title: Leetcode-Jump Game
description: http://oj.leetcode.com/problems/jump-game/
category: 代码
tags: Leetcode
---
火箭队的高副帅是不会失业的，哈哈～
![images](http://media-cache-ec0.pinimg.com/736x/06/a3/2b/06a32bfb68a74d7302efc8a1a6397422.jpg)
###题目描述
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

For example:

`A = [2,3,1,1,4]`, return `true`.

`A = [3,2,1,0,4]`, return `false`.

###AC代码
		class Solution {
				public:
				    bool canJump(int A[], int n) {
					// IMPORTANT: Please reset any member data you declared, as
					// the same Solution instance will be reused for each test case.
				    int max = 0;
					for(int i = 0; i < n-1; i++)
					{
						if(i <= max)
							max = max > (A[i] + i) ? max : (A[i] + i);
						if(max >= n - 1)
							return true;
					}
					return max >= n - 1;    
				    }
				};

