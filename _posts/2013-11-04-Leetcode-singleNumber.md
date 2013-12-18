---
date: 2013-11-04 16:54:12+00:00
layout: post
title: Leetcode-singleNumber
thread: 163
categories: Leetcode
tags: Leetcode
---

###题目描述
Given an array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
###代码
<pre class="prettyprint linenums">
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
</pre>