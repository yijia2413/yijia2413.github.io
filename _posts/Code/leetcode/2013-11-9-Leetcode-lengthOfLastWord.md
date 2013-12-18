---
layout: post
title: Leetcode-Length of Last Word 
description: http://oj.leetcode.com/problems/length-of-last-word/
category: project
---
###题目描述
Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.

If the last word does not exist, return 0.

Note: A word is defined as a character sequence consists of non-space characters only.

For example, 

Given `s` = `"Hello World"`,

return `5`.

###AC代码
请看：
		class Solution {
				public:
				    bool ischar(char p)
				    {
				    	return (p >= 'a' && p <= 'z') || (p >= 'A' && p <= 'Z');
				    }
				    int lengthOfLastWord(const char *s)
				    {
					// IMPORTANT: Please reset any member data you declared, as
					// the same Solution instance will be reused for each test case.
				    	int len = strlen(s);
				    	if(len < 1)
				    		return 0;
				    	int end = len - 1;
				    	while((end >= 0) && (s[end] == ' '))
				    		end--;
				    	int begin = end;
				    	while((begin >= 0) && ischar(s[begin]))
				    		begin--;    
				    	return end - begin;
				    }
				};		
