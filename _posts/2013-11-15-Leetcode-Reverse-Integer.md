---
date: 2013-11-15 16:54:12+00:00
layout: post
title: Leetcode-Reverse-Integer
thread: 173
categories: Leetcode
tags: Leetcode
---
###题目描述
Reverse digits of an integer.

Example1: `x = 123`, `return 321`

Example2: `x = -123`, `return -321`

click to show spoilers.

Have you thought about this?

Here are some good questions to ask before coding. Bonus points for you if you have already thought through this!

If the integer's last digit is 0, what should the output be? ie, cases such as 10, 100.

Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows. How should you handle such cases?

Throw an exception? Good, but what if throwing an exception is not an option? You would then have to re-design the function (ie, add an extra parameter).

###AC代码
		class Solution {
		    public: int reverse(int x) {
			// Note: The Solution object is instantiated only once and is reused by each test case.
			bool positive = (x > 0) ? true : false;
			int result = 0;
			x = abs(x);
			while(x > 0){
			    result = result * 10 + x % 10;
			    x = x / 10;
			}
			if(result < 0){
			    return -1;
			}
			if(!positive){
			    result *= -1;
			}
			return result;
		    }
		};

