---
layout: post
title: Leetcode-Palindrome Number 
description: http://oj.leetcode.com/problems/palindrome-number/
category: 代码
tags: Leetcode
---
## 题目描述
Determine whether an integer is a palindrome. Do this without extra space.

click to show spoilers.

Some hints:
Could negative integers be palindromes? (ie, -1)

If you are thinking of converting the integer to string, note the restriction of using extra space.

You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?

There is a more generic way of solving this problem.

## 思路
取首位和末位比较，然后去掉。循环即可。

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    
    using namespace std;
    
    //取首部和尾部的数字比较，相同即为真。
    bool isPalindrome(int x)
    {
        	if(x < 0)
        		return false;
        	int div = 1;
        	while(x / div >= 10) //确保能够取到首位
        		div *= 10;
        	while(x)
        	{
        		int left = x / div;
        		int right = x % 10;
        		if(left != right)
        			return false;
        		x = (x % div) / 10;  //比较之后去掉首位和末位
        		div /= 100;    //数字少了两位，所以除以100
        	}
        	return true;
    }
    
    int main()
    {
        	int x;
        
        #ifndef ok
        	freopen("in3.in","r",stdin);
        	freopen("std3.out","w",stdout);
        #endif
        
        	while(cin>>x)
        	{
        		if(isPalindrome(x))
        			cout<<"true"<<endl;
        		else
        			cout<<"false"<<endl;
        	}
        	return 0;
    
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
    
    }
