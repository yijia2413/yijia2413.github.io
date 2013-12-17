---
date: 2013-11-23 16:54:12+00:00
layout: post
title: Leetcode-count-and-say
thread: 196
categories: Leetcode
tags: Leetcode
---
## 题目描述
*   The count-and-say sequence is the sequence of integers beginning as follows:
`1, 11, 21, 1211, 111221, ...`
*   1 is read off as `"one 1"` or `11`.
*   11 is read off as `"two 1s"` or `21`.
*   21 is read off as `"one 2, then one 1"` or `1211`.
*   Given an integer `n`, generate the nth sequence.
*   Note: The sequence of integers will be represented as a string.

## 题意
n=1时输出字符串1；n=2时，数上次字符串中的数值个数，因为上次字符串有1个1，所以输出11；n=3时，由于上次字符是11，有2个1，所以输出21；n=4时，由于上次字符串是21，有1个2和1个1，所以输出1211。依次类推.

## 思路
1.  Base case: n = 0 print "1" 
2.  for n = 1, look at previous string and write number of times a digit is seen and the digit itself. In this case, digit 1 is seen 1 time in a row... so print "1 1" 
3.  for n = 2, digit 1 is seen two times in a row, so print "2 1" 
4.  for n = 3, digit 2 is seen 1 time and then digit 1 is seen 1 so print "1 2 1 1" 
5.  for n = 4 you will print "1 1 1 2 2 1" 
6.  Consider the numbers as integers for simplicity. e.g. if previous string is "10 1" then the next will be "1 10 1 1" and the next one will be "1 1 1 10 2 1"

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    
    using namespace std;
    
    string countAndSay(int n)
    {
        	string s = "1";
        	string next;
        	if(n == 1)
        		return s;
        
        	for(int i = 1; i <n; i++)
        	{
        		int j = 0;
        		while(j < s.size())
        		{
        			int k = j + 1;
        			while(k < s.size() && s[k] == s[j])
        				k++;
        			next += (k - j + '0');
        			next += s[j];
        			j = k;
        		}
        		s = next;
        		next = "";
        	}
        	return s;
    }
    
    int main()
    {
        	int n;
        
        #ifndef cout
        	freopen("in3.in", "r", stdin);
        	freopen("std3.out","w",stdout);
        #endif
        
        	while(cin>>n)
        		cout<<countAndSay(n)<<endl;
        
        #ifndef cout
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }