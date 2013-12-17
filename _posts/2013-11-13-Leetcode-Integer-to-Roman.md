---
date: 2013-11-13 16:54:12+00:00
layout: post
title: Leetcode-Integer-to-Roman
thread: 172
categories: Leetcode
tags: Leetcode
---
###题目描述
Given an integer, convert it to a roman numeral.

Input is guaranteed to be within the range from 1 to 3999.

###AC代码
		class Solution {
		public:
		    int romanToInt(string s) {
			// IMPORTANT: Please reset any member data you declared, as
			// the same Solution instance will be reused for each test case.
			int result=0;  
			  
			map<char,int> roman;  
			roman['I']=1;  
			roman['V']=5;  
			roman['X']=10;  
			roman['L']=50;  
			roman['C']=100;  
			roman['D']=500;  
			roman['M']=1000;  
			  
			for(int i=s.length()-1;i>=0;i--)  
			{  
			    if(i==s.length()-1)  
			    {  
				result=roman[s[i]];  
				continue;  
			    }  
			    if(roman[s[i]] >= roman[s[i+1]])  
				result+=roman[s[i]];  
			    else  
				result-=roman[s[i]];  
			}  
			return result;  
		    }
		};
